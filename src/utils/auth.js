import wepy from 'wepy'
import Config from './config'
import Tips from './tip'

export default class Auth {
	 /**
   * 设置权限值
   */
   static getConfig(key) {
	 try {
		return wepy.getStorageSync(key)
	  } catch (e) {
		  console.log('getConfig---error'+e)
	   }
   }
   static setConfig(key,value) {
      try {
		wepy.setStorageSync(key, value)
	  } catch (e) {
		  console.log('setConfig---error'+e)
	   }
   }
   	/* 返回上一页刷新 */
	static backOpener(data,callback){
		let pages = getCurrentPages();
		let prevPage = pages[pages.length - 2]; 
		prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
			params:data
		});
		
		wx.navigateBack({
			delta: 1,
			success: function (e) {
				  if (prevPage == undefined || prevPage == null) return;
				  if(callback){
					callback()
				}
			 }
	   }); 
	}

	static getImageInfo(url){
		return new Promise((resolve, reject) => {
			wx.getImageInfo({
			  src: url,
		      success: function(res){
				resolve(res)
			  },
		      fail: function(res){
				  console.log('getImageInfo==='+JSON.stringify(res));
				  reject(res)
			  }
			})
		})
	}
	static subscribeMessage(tmplIds=[],MessageType){
			if (wx.requestSubscribeMessage) {
				return new Promise( (resolve, reject) => {
					wx.requestSubscribeMessage({
					  tmplIds:tmplIds,
					  async success(res){
						console.log("订阅消息成功回调==="+JSON.stringify(res))
						
						 let Authority=[];
						
						tmplIds.forEach((item,index)=>{
							console.log(res[item]=='accept')
							let obj={
								'Authority':''
							 }
						   res[item]=='accept'? obj.Authority = '1':obj.Authority = '-1';
						   Authority.push(obj);
						 })
						 console.log('MessageType=========='+MessageType)
							MessageType.forEach((item,index)=>{
								Authority[index] = Object.assign({},Authority[index],{'messageType':item})
							 })
						
						const param={
							'OpenID':Auth.getConfig('openId'),
							'SubscribeGroupStr':JSON.stringify({'SubscribeGroup':Authority})
						}
						const result = await Config.messageSubscribe(param);
						console.log("订阅消息回调==="+JSON.stringify(result))
					  },
					  fail(res){
			  			console.log("订阅消息失败==="+JSON.stringify(res))
					  },
					})
				})
			  } else {
				// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
				wx.showModal({
				  title: '提示',
				  content: '当前微信版本过低，无法使用消息订阅功能，请升级到最新微信版本后重试。'
				})
			  }
	 }
	
	static saveImage(tempFilePath){
		return new Promise((resolve, reject) => {
			wx.saveImageToPhotosAlbum({
                filePath: tempFilePath,
                success (res) {
                    wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                   })
                },
                fail (res) {
					console.log(res)
                    wx.showToast({
                    title: '保存失败',
                    icon: 'none',
                    duration: 2000
                  })
                }
            })
		})
	}
	static promisy(api){
		return (options, ...params)=>{
			return new Promise((resolve, reject)=>{
				api(Object.assign({}, options, { success: resolve, fail: reject }),...params)
			})
		}
	}
    static submitFiles(groupId,files,type,signID,ifNotice) {
    	let formData={};
    	let url='';
    	if(ifNotice=='sign'){
    		formData={
	          'type':type,
	          'total':files.length,
	          'SignID':signID
	       };
       		url=Config.baseUrl+'user/signIn/upload?OpenID='+Auth.getConfig('openId')+'&GroupID='+groupId;

    	}
    	if(ifNotice=='notice'){
    		formData={
	          'type':'img',
	          'total':files.length,
	          'NoticeID':signID
	       };
       		url=Config.baseUrl+'notice/create/upload?OpenID='+Auth.getConfig('openId')+'&GroupID='+groupId;
    	}
     
      //将选择的图片组成一个Promise数组，准备进行并行上传
      let promiseList = files.map((item,index) => {
	    return new Promise(resolve => {
	    	let data = Object.assign({},formData,{'index':index+1});
		    if(type=='mp3'){
		    	data = Object.assign({},data,{'time':item.duration});
		    }
	      console.log('上传如图片=='+JSON.stringify(item))
	      wx.uploadFile({
	        url,
	        filePath: item.tempFilePath?item.tempFilePath:item,
	        formData:data,
	        name: 'files[]',
	        success: (res) => {
				console.log('图片上传成功'+JSON.stringify(res))
				if(res.statusCode!='200'){
					Tips.toast(res.data,'none');
					return 
				}
				resolve(res)
			},
			fail:(res)=>{
				wx.hideLoading();
				console.log('图片上传失败'+JSON.stringify(res))
				reject(res)
				// Tips.toast(">第"+index+ '张图片上传失败,请重试','none');
				if(ifNotice=='notice'){
					 Config.deleteNotice(signID);
				}else if(ifNotice=='sign'){
					 Config.deleteMessage('?SignID='+SignID+'&GroupID='+groupID+'&OpenID='+this.getConfig('openId'));
				}
			},
			complete:(res)=>{
				console.log('图片上传完成'+JSON.stringify(res))
			}
	      });
	    });
	  })

      wx.showLoading({
        title: '正在上传...',
        mask: true
      });
      // 开始并行上传图片
      return Promise.all(promiseList).then(res => {
		  console.log('promiseList======'+JSON.stringify(res))
		// 上传成功，获取这些图片在服务器上的地址，组成一个数组
		
      }).catch(err => {
		console.log('err======'+JSON.stringify(res))

				Tips.toast(">>>> upload error:",'none');
				wx.hideLoading()
      }).then(res=>{
		wx.hideLoading()
	  })
  }

  //设置消息未读数量
  static async setMessageCount () {
	const count= await Config.getMessageCount({'OpenID':Auth.getConfig('openId')});
	if(!count) return;
	Auth.setConfig('messageCount',count.Total)//未读消息数量
	if(count.Total>0){
	  wx.setTabBarBadge({
		index: 2,
		text:JSON.stringify(Auth.getConfig('messageCount'))
	  });
	}else{
	   wx.removeTabBarBadge({
		index: 2
	  });
	}
	return count
  }
   //点赞方法
   static async favoriteFunc(groupId,e,myMomentsList,callback){
	  let result = await Config.praise(`?OpenID=${wepy.getStorageSync('openId')}&GroupID=${groupId}&SignID=${e.id}`);
	  let current = myMomentsList.findIndex((item)=>item.SignID==e.id);
	  if(result){
		myMomentsList[current].PraisedTimes=parseInt(myMomentsList[current].PraisedTimes);
		if( myMomentsList[current].IsPraised==false){
		  myMomentsList[current].PraisedTimes+=1;
		  myMomentsList[current].IsPraised=true;
		}else{
		  myMomentsList[current].PraisedTimes-=1;
		  myMomentsList[current].IsPraised=false;
		}
		callback()
	  }
  }

  /* 播放录音 */

  static audioPlay(innerAudioContext,e,myMomentsList,callback){
	let currentMsg=myMomentsList.findIndex((item)=>item.SignID==e.id);

	innerAudioContext.autoplay = false;
	innerAudioContext.src = e.url;
	innerAudioContext.play();
	innerAudioContext.onPlay(() => {
	  
	  myMomentsList.forEach((item)=>{
		if(item.SoundRecordingsList){
			console.log(JSON.stringify(item.SoundRecordingsList))
		  item.SoundRecordingsList.forEach((sbItem)=>{
			sbItem.animation='';
		  })
		}
	  });
	  myMomentsList[currentMsg].SoundRecordingsList[e.index].animation='animation';
	  callback()
	  console.log('开始播放')
	});
	innerAudioContext.onError((res) => {
	});
	innerAudioContext.onEnded((res) => {
	  console.log('结束播放');
	  myMomentsList[currentMsg].SoundRecordingsList[e.index].animation=''
	  callback()
	});
  }
  static createRpx2px() {
	const { windowWidth } = wx.getSystemInfoSync()
	return function(rpx) {
	  return windowWidth / 750 * rpx
	}
  }
  /* canvas绘制文字自动换行 */
//   绘制文字自动换行
  static dealWords(options) {
	options.ctx.setFontSize(options.fontSize);//设置字体大小
	const rpx=Auth.createRpx2px();
	const canvasWidth=rpx(320*2);
console.log('canvasWidth--'+canvasWidth)
    var allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth);//实际总共能分多少行
    var count = allRow >= options.maxLine ? options.maxLine : allRow;//实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数
    var endPos = 0;//当前字符串的截断点
    for (var j = 0; j < count; j++) {
      var nowStr = options.word.slice(endPos);//当前剩余的字符串
      var rowWid = 0;//每一行当前宽度  
      if (options.ctx.measureText(nowStr).width > options.maxWidth) {//如果当前的字符串宽度大于最大宽度，然后开始截取
        for (var m = 0; m < nowStr.length; m++) {
          rowWid += options.ctx.measureText(nowStr[m]).width;//当前字符串总宽度
          if (rowWid > options.maxWidth) {            
            if (j === options.maxLine - 1) { //如果是最后一行
              options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, options.y + (j + 1) * 18);  //(j+1)*18这是每一行的高度    
            } else {
              options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * 18);
            }
            endPos += m;//下次截断点
            break;
          }
        }
	  } else {//如果当前的字符串宽度小于最大宽度就直接输出
console.log('options.ctx.measureText(nowStr).width--'+options.ctx.measureText(nowStr).width)
		
        options.ctx.fillText(nowStr.slice(0), (canvasWidth - options.ctx.measureText(nowStr).width)/2, options.y + (j + 1) * 18);
	  }
    }
  }
}