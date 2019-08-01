import wepy from 'wepy'
export default class Tips {
  constructor() {
    this.isLoading = false;
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