import Http from './utils'
  
const baseUrl="https://www.easy-mock.com/mock/5c10d39505fd4b199bfe62a5/example/";
// const baseUrl="http://www.qct-qiuqian.com:9999/qiuqian";

// const registerUrl='user/register';//前端申请用户授权，如果用户允许，则调用接口注册
const registerUrl='login';//前端申请用户授权，如果用户允许，则调用接口注册
// const getTokenUrl='user/getToken?OpenID=';//获取用户token
const getTokenUrl='user/session';//获取用户token
const getUserInfoUrl='user/?OpenID=';//获取用户信息
const inGroupUrl='user/inGroup?GroupID=';//用户加入签到小组
const myGroupUrl='user/myGroups?OpenID=';//获取用户已加入的所有小组id
// const register='groupState?OpenID=&GroupID=';
const isExistUrl='group/isExist?GroupTitle=';//新建、更新签到小组信息时判断小组名称是否已存在
const userPropertiesUrl='group/userProperties';//新建签到小组时，可选的用户报名字段
const deleteGroupUrl='group/delete?GroupID=';//删除签到小组
const groupInfoUrl='group?GroupID=';//获取签到小组信息
const updateGroupBgUrl='group/img?GroupID=';//修改签到小组背景图
const updateGroupUrl='group/update';//修改签到小组
const createGroupUrl='group/create';//新建签到小组

const register = (params) => Http.get(baseUrl +registerUrl,params );
const getToken = (params) => Http.get(baseUrl +getTokenUrl,params );
const getUserInfo = (params) => Http.get(baseUrl +getUserInfoUrl,params );
const inGroup = (params) => Http.post(baseUrl +inGroupUrl,params );
const myGroup = (params) => Http.get(baseUrl +myGroupUrl,params );
const isExist = (params) => Http.get(baseUrl +isExistUrl,params );
const createGroup = (params) => Http.post(baseUrl +createGroupUrl,params );
const signIn = (params,url) => Http.post(baseUrl +url,params );//签到
const deleteGroup = (params) => Http.post(baseUrl +deleteGroupUrl,params );
const updateGroup = (params) => Http.post(baseUrl +updateGroupUrl,params );
const groupInfo = (params) => Http.get(baseUrl +groupInfoUrl,params );
const updateGroupBg = (params) => Http.post(baseUrl +updateGroupBgUrl,params );
const rangkingList = (params,url) => Http.get(baseUrl +url,params );//获取签到排行
const onePageInfo = (params,url) => Http.get(baseUrl +url,params );//获取一页签到数据
const score = (params,url) => Http.post(baseUrl +url,params );//管理员对签到评分
const toTop = (params,url) => Http.post(baseUrl +url,params );//管理员对签到置顶
const groupState = (params,url) => Http.get(baseUrl +url,params );//获取用户在小组的今日签到情况
const postComment = (params,url) => Http.post(baseUrl +url,params );//用户留言
const delMessage = (params,url) => Http.post(baseUrl +url,params );//删除签到或评论数据
const praise = (params,url) => Http.post(baseUrl +url,params );//点赞或者取消点赞
const signedRecord = (params,url) => Http.get(baseUrl +url,params );//获取用户签到记录
const userProperties = (params) => Http.get(baseUrl +userPropertiesUrl,params );//获取用户签到记录

export default {
    register,
    getToken,
    getUserInfo,
    inGroup,
    isExist,
    createGroup,
    deleteGroup,
    updateGroup,
    groupInfo,
    updateGroupBg,
    rangkingList,
    onePageInfo,
    score,
    toTop,
    groupState,
    postComment,
    delMessage,
    praise,
    signIn,
    userProperties,
    signedRecord
  }
  
