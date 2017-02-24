// pages/index/finish.js
Page({
  data:{
    typeName:'',
    noMore:false,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var typeName = wx.getStorageSync('Name');
    var noMore = wx.getStorageSync('noMore') || false;
    this.setData({
      typeName:typeName,
      noMore:noMore,
    })    
  },
  changeGroup:function(){
    var no = this.data.noMore;
      console.log(no);
    if(no){
        wx.showToast({
          title: '没其他题目了',
          icon: 'loading',
          duration: 2000
        })      
    }else{
      wx.redirectTo({
        url:'detail'
      });
    }
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})