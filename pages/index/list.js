// pages/index/list.js
Page({
  data:{
    subject:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var Data = wx.getStorageSync('Data');
    this.setData({
      subject:Data
    })    
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