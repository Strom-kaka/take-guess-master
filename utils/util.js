var URL = 'http://route.showapi.com/151-4';//接口地址 
var APPID = '26940'; //应用appidid
var SERECT = 'ce33102dbb2546a9bdc57ad6421bbb76';//密钥


function formatterDateTime() {
	var date=new Date()
	var month=date.getMonth() + 1
        var datetime = date.getFullYear()
                + ""// "年"
                + (month >= 10 ? month : "0"+ month)
                + ""// "月"
                + (date.getDate() < 10 ? "0" + date.getDate() : date
                        .getDate())
                + ""
                + (date.getHours() < 10 ? "0" + date.getHours() : date
                        .getHours())
                + ""
                + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                        .getMinutes())
                + ""
                + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                        .getSeconds());
        return datetime;
   	}


function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//HUD 
//成功提示
function showSuccess(title = "成功啦", duration = 2000){
  wx.showToast({
      title: title ,
      icon: 'success',
      duration:(duration <= 0) ? 5000 : duration
  });
}
//loading提示
function showLoading(title = "请稍后", duration = 2000) {
  wx.showToast({
      title: title ,
      icon: 'loading',
      duration:(duration <= 0) ? 2000 : duration
  });
}
//隐藏提示框
function hideToast(){
  wx.hideToast();
}


module.exports = {
  formatterDateTime: formatterDateTime,
  showSuccess: showSuccess,
  showLoading: showLoading,
  hideToast: hideToast,
  URL:URL,
  APPID:APPID,
  SERECT:SERECT
}
