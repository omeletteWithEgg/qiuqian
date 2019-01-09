import wepy from 'wepy'
import Http from './utils'
import Config from './config'

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

	static isLogin(){
		const userId = this.getConfig("auth");
		if(userId!=null&userId!=''){
			return true
		}else{
			return false
		}
	}

	static async login(){
		const param = {
			'OpenID':'',
			'NickName':'',
			'Gender':'',
			'Wechat':''
		};
		const url="https://www.easy-mock.com/mock/5c10d39505fd4b199bfe62a5/example/login";
		const data = await Config.register(param);
		return data.token
	}
	// static async register(phone,code){
	// 	const appCode = wepy.$instance.globalData.appCode;
	// 	const url = `${Http.baseUrl}/qiuqian/user/register`;


	
	// 	const dara = await Http.post(url);
	// 	return dara.code
	// }
}