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
		      success: resolve,
		      fail: reject
			})
		})
	}
	static drawImage(option, context){
		return new Promise((resolve, reject) => {
			wx.canvasToTempFilePath({
		      ...option,
		      success: resolve,
		      fail: reject,
		    }, context)
		})
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
	          const data = JSON.parse(res.data);
	          resolve(data);
			},
			fail:(res)=>{
				wx.hideLoading();
				Tips.toast(">第"+index+ '张图片上传失败,请重试','none');
				if(ifNotice=='notice'){
					 Config.deleteNotice(signID);
				}else if(ifNotice=='sign'){
					 Config.deleteMessage('?SignID='+SignID+'&GroupID='+groupID+'&OpenID='+this.getConfig('openId'));
				}
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
        // 上传成功，获取这些图片在服务器上的地址，组成一个数组
        return res
      }).catch(err => {
				Tips.toast(">>>> upload error:", err);
				wx.hideLoading()
      }).then(() => {
        wx.hideLoading()
      })
  }

  //设置消息未读数量
  static async setMessageCount (count) {
	count= await Config.getMessageCount({'OpenID':Auth.getConfig('openId')});
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
	  let result = await Config.praise(`?OpenID=${getConfig('openId')}&GroupID=${groupId}&SignID=${e.id}`);
	  let current = myMomentsList.findIndex(item=>item.SignID==e.id);
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
}