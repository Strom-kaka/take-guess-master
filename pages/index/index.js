//index.js
//获取应用实例
const util = require("../../utils/util.js");
const DATATYPE =require("../../utils/config.js");
const dataType =DATATYPE.dataType;
var app = getApp()
Page({
  data: {
    array: [],
    typeIndex: 0,
    typeInt:['gxmy'],
    inputValue:'',
    isResult:false,
    page:0,
    typeId:'',
    keywords:'',
    isError:true
  },
  //事件处理函数
  onLoad: function () {
      //this.array = dataType;
     // console.log(dataType);
     this.getDataType();
     // this.refreshNewData();
  },
begin:function(){

    var _num = this.data.typeIndex;
    var TYPEID = this.data.typeInt[_num];
    var _keywords = this.data.inputValue;
    var typeName = this.data.array[_num];
   wx.setStorageSync('typeId',TYPEID);
   wx.setStorageSync('keywords',_keywords);
   wx.setStorageSync('typeName',typeName);

     this.setData({
      typeId: TYPEID,
      keywords: _keywords,
    });

   this.checkHaveResult();
          
},
checkHaveResult:function(){
    var _self = this;
    wx.request({
      url: util.URL, 
      data: {
        showapi_appid:util.APPID,
        showapi_sign:util.SERECT,
        showapi_timestamp:util.formatterDateTime(),
        keyword:_self.data.keywords,
        page:_self.data.page,
        typeId:_self.data.typeId
      },
      header: {
          'content-type': 'application/json'
      },
      jsonp: 'jsonpcallback', //这个方法名很重要,不能改变
      success: function(data) {
        
        var code = data.data.showapi_res_code;

        if(!data){
          console.log('获取超时');
          _self.setData({
            isError: false
          });
          return false;
        }else if(code !=0){
          return false;
          console.log('获取严重超时');
        }else{

          var nums = data.data.showapi_res_body.pagebean.allPages;//获取结果数量
          if(nums<1){
              console.log('获取失败');    
              _self.setData({
                isError: false
              });
              return false;
          }else{
              console.log('有个题目');
          }
          

            wx.navigateTo({
              url: 'detail'
            })

        }

        console.log(data);
      },
      fail:function(){
        wx.showToast({
          title: '获取失败，请稍后再试',
          icon: 'loading',
          duration: 2000
        })        
      }
    })
  },
  bindKeyInput:function(e){
      this.setData({
        inputValue: e.detail.value
      });
      console.log(e.detail.value);
  },
  hideMask:function(){
    this.setData({
      isError:true,
    });
  },
  getDataType:function(){

    var TYPEINT = [];
    var TYPEARRAY = [];

    for(var i=0;i<dataType.length;i++){
      var types = dataType[i].type;
      TYPEARRAY[i] = types
    }

    for(var i=0;i<dataType.length;i++){
      var ID = dataType[i].id;
      TYPEINT[i] = ID
    }     
    //console.log(TYPEARRAY);
     this.setData({
      array: TYPEARRAY,
      typeInt: TYPEINT
    })   
  } 
  ,
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      typeIndex: e.detail.value,
      typeInt:e.detail.value
    })
  }
})
