import Http from './utils'
  
const baseUrl="https://www.qct-qiuqian.com/qiuqian/";
// const baseUrl="http://www.qct-qiuqian.com:9999/qiuqian/";

const registerUrl='user/register';//前端申请用户授权，如果用户允许，则调用接口注册
const getOpenIdUrl='user/getOpenID?code=';//
const getTokenUrl='user/getToken';//获取用户token
const getUserInfoUrl='user?OpenID=';//获取用户信息
const inGroupUrl='user/inGroup?GroupID=';//用户加入签到小组
const myGroupUrl='user/myGroups';//获取用户已加入的所有小组id
const isExistUrl='group/isExist';//新建、更新签到小组信息时判断小组名称是否已存在
const userPropertiesUrl='group/userProperties';//新建签到小组时，可选的用户报名字段
const deleteGroupUrl='user/outGroup';//退出签到小组
const groupInfoUrl='group';//获取签到小组信息
const allGroupUrl='group/groups';//获取所有小组信息
const updateGroupBgUrl='group/img?groupID';//修改签到小组背景图
const updateGroupUrl='group/update';//修改签到小组
const createGroupUrl='group/create';//新建签到小组
const signedRecordUrl='user/group/signedRecord';//获取签到记录
const praiseUrl='user/group/sign/praise';//点赞
// const signInUrl='user/group/signIn?OpenID';//签到
const delMessageUrl='user/group/delMessage';//删除留言
const postCommentUrl='user/group/message?OpenID=';//留言
const groupStateUrl='user/groupState';//获取用户在小组的今日签到情况
const rangkingListUrl='group/rankingList';//获取签到排行
const onePageInfoUrl='group/messages';//获取一页签到数据
const messageUrl='user/typeMessages';//获取用户消息
const scoreUrl='group/score';//管理员对签到评分
const toTopUrl='group/toTop';//管理员对签到置顶
const getMessageCountUrl='user/messageCount';//获取用户消息
const createNoticeUrl='notice/create';//新建通知
const deleteNoticeUrl='notice/delete?NoticeID=';//删除通知
const allNoticeUrl='notice/allNotices';//获取小组的所有通知
const getUserSettingUrl='user/group/getUserSetting';//获取个人签到选项
const userSettingUrl='user/group/userSetting';//修改个人签到选项
const modifyHeaderUrl='user/img?OpenID=';//修改用户头像
const myUsersUrl='group/myUsers';//获取特定类型小组成员
const deleteUserUrl='user/delete';//删除成员
const verificationCodeUrl='group/verificationCode';//获取验证码
const clearMsgCountUrl='user/clearMessageCount';//
const getWXCodeUrl='group/getWXCode?GroupID=';//二维码

const getOpenId = (params) => Http.post(baseUrl +getOpenIdUrl+params );
const register = (params) => Http.post(baseUrl +registerUrl,params );
const getToken = (params) => Http.get(baseUrl +getTokenUrl,params );
const getUserInfo = (params) => Http.get(baseUrl +getUserInfoUrl+params );
const inGroup = (Id,params) => Http.post(baseUrl +inGroupUrl+Id,params );
const myGroup = (params) => Http.get(baseUrl +myGroupUrl,params );
const isExist = (params) => Http.get(baseUrl +isExistUrl,params );
const createGroup = (params) => Http.post(baseUrl +createGroupUrl,params );
const signIn = (signInUrl,params) => Http.post(baseUrl +signInUrl,params );//签到
const reSign = (url) => Http.post(baseUrl+url );//补签
const outGroup = (url) => Http.post(baseUrl+url );//退出签到小组
const updateGroup = (params) => Http.post(baseUrl +updateGroupUrl,params );
const groupInfo = (params) => Http.get(baseUrl +groupInfoUrl,params );
const allGroup = (params) => Http.get(baseUrl +allGroupUrl,params );
const setResign = (url) => Http.post(baseUrl +url );

const updateGroupBg = (url,params) => Http.post(baseUrl +url,params );
const rangkingList = (params) => Http.get(baseUrl +rangkingListUrl,params );//获取签到排行
const onePageInfo = (params) => Http.get(baseUrl +onePageInfoUrl,params );//获取一页签到数据
const score = (params) => Http.post(baseUrl +scoreUrl+params );//管理员对签到评分
const toTop = (params) => Http.post(baseUrl +toTopUrl+params );//管理员对签到置顶
const setManager = (url) => Http.post(baseUrl +url );//设置管理员
const deleteUser = (param) => Http.post(baseUrl+deleteUserUrl +param );//删除成员
const groupState = (params) => Http.get(baseUrl +groupStateUrl,params );//获取用户在小组的今日签到情况
const postComment = (url,params) => Http.post(url,params );//用户留言
const deleteGroup = (url) => Http.post(baseUrl +url );//删除签到小组
const deleteMessage = (params) => Http.post(baseUrl +delMessageUrl+params );//删除签到或评论数据
const praise = (params) => Http.post(baseUrl +praiseUrl+params );//点赞或者取消点赞
const signedRecord = (params) => Http.get(baseUrl +signedRecordUrl,params );//获取用户签到记录
const messageList = (params) => Http.get(baseUrl +messageUrl,params);//获取用户消息
const userProperties = (params) => Http.get(baseUrl +userPropertiesUrl,params );//获取用户签到记录
const blackList = (url) => Http.post(baseUrl +url );//加入黑名单
const allNotice = (params) => Http.get(baseUrl +allNoticeUrl,params );//获取所有通知
const createNotice = (params,url) => Http.post(baseUrl +url,params );//新建通知
const deleteNotice = (params) => Http.post(baseUrl +deleteNoticeUrl+params );//删除通知
const modifyHeader = (openId,params) => Http.post(baseUrl +modifyHeaderUrl+openId,params );//更改头像
const getUserSetting = (params) => Http.get(baseUrl +getUserSettingUrl,params );//获取个人签到选项
const userSetting = (params) => Http.post(baseUrl +userSettingUrl,params );//获取个人签到选项
const myUsers = (params) => Http.get(baseUrl +myUsersUrl,params );//获取所有成员
const verificationCode = (params) => Http.get(baseUrl +verificationCodeUrl,params );//获取验证码
const downLoad = (params) => Http.get(baseUrl +downLoad,params );
const postFiles = (url,params) => Http.get(url ,params );
const getWXCode = (params) => Http.get(baseUrl+getWXCodeUrl+params );
const getMessageCount = (param) => Http.get(baseUrl+getMessageCountUrl,param );
const clearMsgCount = (param) => Http.get(baseUrl+clearMsgCountUrl,param );

const nowDate =()=>{
    let year = new Date().getFullYear();
    let month = new Date().getMonth()+1;
    let day = new Date().getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return year+'-'+month+'-'+day
};
const today =()=>{

    let year = new Date().getTime();
    return year
};
const fiveYearsLater =()=>{
    let year = new Date().getFullYear()+5;
    let month = new Date().getMonth()+1;
    let day = new Date().getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return year+'-'+month+'-'+day
};
const now=()=>{
    let date= new Date().toString();
    let index=date.indexOf('GMT+0800');
    date= date.replace(/\s+/g,"");
    date = date.slice(-index+1,-index+9);
  
    return date
}
const nowTime=()=>{
    let date= new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    // let seconds = date.getSeconds();
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return hours+':'+minutes
}


export default {
    baseUrl,
    today,
    now,
    userSetting,
    register,
    getToken,
    getUserInfo,
    inGroup,
    myGroup,
    myUsers,
    allGroup,
    setResign,
    verificationCode,
    isExist,
    createGroup,
    deleteGroup,
    updateGroup,
    clearMsgCount,
    deleteUser,
    groupInfo,
    deleteMessage,
    updateGroupBg,
    rangkingList,
    reSign,
    onePageInfo,
    messageList,
    score,
    getMessageCount,
    downLoad,
    outGroup,
    getOpenId,
    getUserSetting,
    toTop,
    setManager,
    groupState,
    postComment,
    deleteGroup,
    praise,
    signIn,
    deleteNotice,
    createNotice,
    getWXCode,
    allNotice,
    postFiles,
    userProperties,
    blackList,
    signedRecord,
    modifyHeader,
    nowDate,
    nowTime,
    fiveYearsLater
  }
  
