// pages/index/detail.js
const util = require("../../utils/util.js");

const DATATYPE =require("../../utils/config.js");
const dataType =DATATYPE.dataType;

var app = getApp()

Page({
  data:{
    array:[],
    typeIndex: 0,
    typeInt:['gxmy'],
    page:1,
    typeId:'',
    keywords:'',
    dataArray:[],
    allNum:0,
    curNum:0,
    answer:'',
    greenColor:false,
    allPages:1,
    userInput:'',
    title:'',
    typeName:'',
    isNext:false,
    isError:true,
    isTips:true,
  },
  onLoad:function(){
    // 页面初始化 options为页面跳转所带来的参数
    this.getStorageSync();
    this.getDataType();
  },
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    var num = e.detail.value;
    var typeId = this.data.typeInt[num];
    var typeName = this.data.array[num];
    this.setData({
      typeIndex: num,
      typeName:typeName,
      typeId:typeId,
      page:0,
      dataArray:[],
      allNum:0,
      curNum:0,
    });  
    this.getDataInfo();
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
  }, 
  getStorageSync:function(){
    var keywords = wx.getStorageSync('keywords');
    var typeId = wx.getStorageSync('typeId');
    var typeName = wx.getStorageSync('typeName');
    var pageNum = wx.getStorageSync('pageNum') || 1;


    console.log(keywords);
    console.log(typeId);
    console.log(typeName);

    this.setData({
      keywords: keywords,
      typeId:typeId,
      typeName:typeName,
      page:pageNum
    });

     this.getDataInfo();
  },
  getDataInfo:function(){
    util.showLoading();
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
       
        var DataInfo = data.data.showapi_res_body.pagebean;
        _self.analysis(DataInfo);

        //console.log(data);
      }
    })
  },
  analysis:function(data){
    var _data = data;
    var _num = this.data.curNum;
    var _arraylist = _data.contentlist;
    var _allNum = _data.allNum;
    var _allPages = _data.allPages;
    var _title = _data.contentlist[_num].title;
    _title = (_title.split("："))[1];
    this.setData({
      dataArray: _arraylist,
      allNum:_allNum>20?20:_allNum,
      allPages:_allPages,
      title:_title
    });

    console.log(_arraylist);   
  },
  helpUser:function(){  
    this.setData({
      isTips: false,
    });  

  },
  randomPage:function(){
    var _AllPages = this.data.allPages;
    var page = this.data.page;
    var ran = Math.floor(Math.random()*_AllPages+1);

    if(ran == page){
      ran = Math.floor(Math.random()*_AllPages+1);
    }

    return ran;
  },
  bindKeyInput:function(e){
    this.setData({
      userInput: e.detail.value
    });
  },
  showAnswer:function(){ //告诉我答案
    var ANSWER = this.getAnswer();    
    this.setData({
      answer: ANSWER,
      greenColor:true,
      isNext:true
    });
  },
  changeGroup:function(){ //换一组试试
    var _self = this;
    var PAGE = _self.randomPage();
    if(_self.data.allPages<2){
      console.log('没有更多类型了');

        // wx.showToast({
        //   title: '没有其他题目了',
        //   icon: 'loading',
        //   duration: 2000
        // })

        var objTitle = _self.data.typeName;
        var objData = _self.data.dataArray;
        var len = objData.length;
        var Data = [];
        for(var i=0;i<len;i++){
          Data[i] = {title:'',answer:''};
        }
        for(var i=0;i<len;i++){
          Data[i].title = ((objData[i].title).split("："))[1]
          Data[i].answer = ((objData[i].answer).split("："))[1]
        }
        // for(var i=0;i<objData.length;i++){  
        //   Data[i].title = objData[i].title;
        //   //Data[i].answer = objData[i].answer;
        // }

        
       wx.setStorageSync('Data',Data);
       wx.setStorageSync('Name',objTitle);

       wx.navigateTo({
         url: 'nomore'
       })

    }else{
      console.log('好的');
      _self.setData({
          page:PAGE,
          dataArray:[],
          allNum:0,
          curNum:0,
      });   
      _self.getDataInfo();
    }
  },
  hideMask:function(){
    this.setData({
      isError:true,
      isTips:true
    });
  },
  nextQuestion:function(){
    var _self = this;
    var _answer = this.getAnswer();
    var _userinput = this.data.userInput;
    var _curNum = this.data.curNum+1;
    var _allNum = this.data.allNum;
    var _isNext =  this.data.isNext;
    console.log(_answer);

    if(_isNext){
        if(_curNum == _allNum){

          if(_self.data.allPages<2){
              var noMore = true;
              wx.setStorageSync('noMore',noMore);
          }else{
              var pageNum = _self.randomPage();
              wx.setStorageSync('pageNum',pageNum);
          }

        var objTitle = _self.data.typeName;
        var objData = _self.data.dataArray;
        var len = objData.length;
        var Data = [];
        for(var i=0;i<len;i++){
          Data[i] = {title:'',answer:''};
        }
        for(var i=0;i<len;i++){
          Data[i].title = ((objData[i].title).split("："))[1]
          Data[i].answer = ((objData[i].answer).split("："))[1]
        }
        // for(var i=0;i<objData.length;i++){  
        //   Data[i].title = objData[i].title;
        //   //Data[i].answer = objData[i].answer;
        // }

        
       wx.setStorageSync('Data',Data);
       wx.setStorageSync('Name',objTitle);

      wx.navigateTo({
         url: 'finish'
       }) 




        }else{
          var _title = _self.getTitle(_curNum);
          _self.setData({
            curNum:_curNum,
            title:_title,
            isNext:false,
            greenColor:false
          })          
        }

    }else{
      if(_userinput !='' && _userinput == _answer){
        console.log('你好厉害呀');
        //console.log(this.data.dataArray) 还可以用来骂人
        var _title = _self.getTitle(_curNum);
        _self.setData({
          curNum:_curNum,
          title:_title,
          clear:true
        })
      }else{
        console.log('你好笨')
        _self.setData({
          isError:false
        })
      }

    }
  },
  getAnswer:function(){
    var ANSWER = this.data.dataArray[this.data.curNum].answer;
    // var pos=ANSWER.indexOf("：");
    // ANSWER = ANSWER.substring(pos+1,ANSWER.length); 
    // console.log(pos+1) ; 
    ANSWER = (ANSWER.split("："))[1]
    return  ANSWER;
  },
  getTitle:function(num){
    var _title = this.data.dataArray[num].title;
   _title = (_title.split("："))[1]

    return  _title;   

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