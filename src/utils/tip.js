import wepy from 'wepy'
export default class Tips {
  constructor() {
    this.isLoading = false;
  }

	static chooseImage(count,sourceType){
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: count,
        sizeType: [ 'compressed'],
        sourceType: sourceType,
        success: res => {
            resolve(res)
        },
        fail: res => {
          reject(res);
        }
      });
    });

  }
    /**
 
   * 弹出确认窗口
 
   */
 
  static confirm (text, title = '提示') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: true,
        success: res => {
          if (res.confirm) {
            resolve()
          } else if (res.cancel) {
            reject()
          }
        },
 
        fail: res => {
          reject()
        }
 
      })
 
    })
 
  }
 
  static actionSheet(list){
    return new Promise((resolve, reject) => {
      wx.showActionSheet({
        itemList: list,
        success(res) {
          console.log(res)
          resolve(res)
        },
        fail(res) {
          console.log("actionSheet--error"+res.errMsg);
          return
        }
      })
    });
	}
	static toast(title,iconClass){
    wx.showToast({
      title: title,
      icon: iconClass,
      duration: 2500
    })
	}

  /**
   * 弹出加载提示
   */
  static loading(title = "加载中") {
    if (Tips.isLoading) {
      return;
    }
    Tips.isLoading = true;
    wx.showLoading({
      title: title,
      mask: true
    });
  }

  /**
   * 加载完毕
   */
  static loaded() {
    if (Tips.isLoading) {
      Tips.isLoading = false;
      wx.hideLoading();
    } 
  }

}



/**
 * 静态变量，是否加载中
 */
Tips.isLoading = false;