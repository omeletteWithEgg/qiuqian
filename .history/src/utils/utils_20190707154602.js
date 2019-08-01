import wepy from 'wepy'
import Tips from './tip'
import Auth from './auth'
import Config from './config'

export default class Http {
	static async request(method,url,data){
		Tips.loading();
		method = method.toUpperCase();
		let methodHeader={};
		// console.log(url.indexOf('user/getToken'))
		if(url.indexOf('user/getToken')<0&&url.indexOf('user/getOpenID')<0){
			 methodHeader = {
				"auth":Auth.getConfig('loginToken')
			};
		}
		if(method == "POST"){
		  methodHeader["content-type"]= "application/x-www-form-urlencoded" 
		} else if (method == "GET") {
		  methodHeader["content-type"]= 'application/json' 
		};

		const parm = {
			url:url,
			method:method,
			header: methodHeader,
			data:data
		};

		const res = await wepy.request(parm).catch(error=>{
			Promise.reject(error)
		});
		console.log('parm-----'+JSON.stringify(parm))
		Tips.loaded();
		if(this.isSuccess(res)){
			if(res.data.Message=='已拒绝为此请求授权。'){
				let param={
					OpenID:Auth.getConfig('openId')
				}
				let loginToken = await Config.getToken(param);//token过期重新获取
				Auth.getConfig('loginToken');	
				Auth.setConfig('loginToken',loginToken.token);	
			}
			console.log(res.data||res)
			return res.data||res
		}else {
			wx.showModal({
				title: '提示',
				content:this.requestException(res),
				showCancel:false
			  })
	      throw this.requestException(res);
	    }
	}
	 /**
   * 判断请求是否成功
   */
	static isSuccess(res){
		const resCode = res.statusCode;
		if (resCode !== 200) {
		  Tips.toast(res.data.Message||res.data ,'none');
		  
	      return false;
	    }else{
			const wxData = res.data||res;
		
			return (wxData && wxData.code !== 0);
		}
	}
	 /**
   * 判断请求异常
   */
	static requestException (res){
		const code = res.statusCode;
	    const wxData = res.data;
		const serverData = wxData.data;
		const error={};
	    if (serverData) {
	      error.serverCode = wxData.code;
	      error.message = serverData.message;
	      error.serverData = serverData;
	    }
	    return error;

	}

	static async get(url,data){
		return this.request('GET',url,data)
	}

	static post(url,data){
		return this.request('POST',url,data)
	}



}