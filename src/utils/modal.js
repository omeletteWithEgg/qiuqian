import wepy from 'wepy'
export default class Tips {
	static modal(text,callback,showCancel=true,title="提示"){
		wx.showModal({
			title: title,
			  content: 'text',
			  showCancel: showCancel,
			  success(res) {
			    if (res.confirm) {
			        callback()
			    } else if (res.cancel) {
			     return
			    }
			  }
		})
	}
}