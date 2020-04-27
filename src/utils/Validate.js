export default class Validate {
  /**
   * 验证必填元素
   */
  static required(value) {
    if (typeof value === 'number') {
      value = value.toString()
    } else if (typeof value === 'boolean') {
      return !0
    }else if (value === '') {
      return false
    }

    return value && value.length > 0
  }


  /**
   * 验证手机格式
   */
  static tel(value) {
    return this.optional(value) || /^1[34578]\d{9}$/.test(value)
  }
  


  /**
   * 验证整数
   */
  static digits(value) {
    return this.optional(value) || /^\d+$/.test(value)
  }
  


  /**
   * 判断输入值是否为空
   */
  static optional(value) {
    return !this.required(value)
  }
 
}
