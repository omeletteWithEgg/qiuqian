import wepy from 'wepy'

export default class Http {
	static async request(method,url,data){
	
		// const loginCode=wepy.$instance.globalData.auth;
		let header={};
		method = method.toUpperCase();
		let methodHeader = {};
		if(method == "POST"){
		  methodHeader = { "content-type": "application/x-www-form-urlencoded" }
		} else if (method == "GET") {
		  methodHeader = { 'content-type': 'application/json' }
		};
		const parm = {
			url:url,
			method:method,
			header: methodHeader,
			data:data
		};
		const res = await wepy.request(parm);
		console.log(!this.isSuccess(res))
		if(!this.isSuccess(res)){
			return res.data
		}else {
	      console.error(method, url, data, res);
	      throw this.requestException(res);
	    }

	}

	 /**
   * 判断请求是否成功
   */
	static isSuccess(res){
		const resCode = res.statusCode;
		if (resCode !== 200) {
	      return false;
	    }
		console.log(wxData && wxData.code !== 0)
		const wxData = res.data;
    	return !(wxData && wxData.code !== 0);
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

	static get(url,data){
		return this.request('GET',url,data)
	}

	static post(url,data){
		return this.request('POST',url,data)
	}
}