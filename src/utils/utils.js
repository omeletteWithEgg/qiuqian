import wepy from 'wepy'
import Tips from './tip'
import Auth from './auth'
import Config from './config'

export default class Http {
	static async request(method,url,data){
		Tips.loading();
		try{

			method = method.toUpperCase();
			let methodHeader={};
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
	
			const res = await wepy.request(parm)
			console.log('parm-----'+JSON.stringify(parm))
			Tips.loaded();
			console.log('res===='+JSON.stringify(res))
			if(this.isSuccess(res)){
				if(res.data.Message=='已拒绝为此请求授权。'){
					let param={
						OpenID:Auth.getConfig('openId')
					}
					let loginToken = await Config.getToken(param);//token过期重新获取
					Auth.getConfig('loginToken');	
					Auth.setConfig('loginToken',loginToken.token);	
				}
				
				return res.data
			}else {
				// const code = res.statusCode;
				// const serverData = res.data||res.Message;
				// const error={};
				// if (serverData) {
				// 	error.serverCode = code;
				// 	error.message = serverData;
				// }
				console.log('requestException===='+JSON.stringify(res.data.Message))
				Tips.toast(res.data.Message||res.data.statusCode,'none')
				return false
				// return error;
			}
	}catch(error){
		console.log(JSON.stringify('出错了==='+JSON.stringify(error)))
		Tips.toast('网络不给力','none')
		Tips.loaded();
		
		}
	}
	 /**
   * 判断请求是否成功
   */
	static isSuccess(res){
		const resCode = res.statusCode;
		if (resCode === 200) {
			const wxData = res.data||res;
		
			return (wxData && wxData.code !== 0);
		}
	}

	static async get(url,data){
		return this.request('GET',url,data)
	}

	static post(url,data){
		return this.request('POST',url,data)
	}



}