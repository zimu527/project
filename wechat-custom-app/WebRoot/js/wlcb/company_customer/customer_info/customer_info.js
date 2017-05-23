/**
 * Created by Administrator on 2017/5/18.
 */
//
var vm = new Vue({
  el: '#list_manager',
  data: {
    csmlist: ''
  },
  methods: {
    adddata(data){
      this.csmlist = data;
      $('.list-manager').show();
    },
    addClick(e){
      $(e.target).siblings().toggle();
      if ($(e.target).hasClass('dt-selected')) {
        $(e.target).removeClass('dt-selected').removeClass('border-bottom');
      } else {
        $(e.target).addClass('dt-selected').addClass('border-bottom');
      }
    },
    alertTest(){
      alert('kk');
    }
  },
  mounted(){

  }
});

if(vm.csmlist.length<=0){
  vm.adddata(csmlistTestData);
}
//客户经理列表
function ulamCSMList(keywords){
  if(vm.csmlist.length<=0){
    _showPopBoxById('loadingToast');
    var onResult = ulamCSMListOnResult;
    var resultProcessor = {
      'onResult':onResult
    };
    BWFRI.UlamCSMListService({'openid':openid , 'accountid':accountid, 'phone':phone, 'keywords':keywords} , resultProcessor);
  }
}
function ulamCSMListOnResult(result) {
  //hiddenBox('loadingToast');
  if (result.code != 0) {
    if(result.result !==0 ){
      alert('网络不给力，请刷新重试~')
    }else{
      vm.adddata(result.data.csmlist);
      //vm.adddata(testData);
    }
  } else {
    alert('网络不给力，请刷新重试~')
  }
}
//-公司列表
function ulamCSMList(keywords){
  if(vm.csmlist.length<=0){
    _showPopBoxById('loadingToast');
    var onResult = ulamCSMListOnResult;
    var resultProcessor = {
      'onResult':onResult
    };
    BWFRI.UlamCSMListService({'openid':openid , 'accountid':accountid, 'phone':phone, 'keywords':keywords} , resultProcessor);
  }
}
function ulamCSMListOnResult(result) {
  //hiddenBox('loadingToast');
  if (result.code != 0) {
    if(result.result !==0 ){
      alert('网络不给力，请刷新重试~')
    }else{
      //vm.adddata(result.data.csmlist);
      vm.adddata(testData);
    }
  } else {
    alert('网络不给力，请刷新重试~')
  }
}
//-企业用户列表查询
function ulamCSMList(keywords){
  if(vm.csmlist.length<=0){
    _showPopBoxById('loadingToast');
    var onResult = ulamCSMListOnResult;
    var resultProcessor = {
      'onResult':onResult
    };
    BWFRI.UlamCSMListService({'openid':openid , 'accountid':accountid, 'phone':phone, 'keywords':keywords} , resultProcessor);
  }
}
function ulamCSMListOnResult(result) {
  //hiddenBox('loadingToast');
  if (result.code != 0) {
    if(result.result !==0 ){
      alert('网络不给力，请刷新重试~')
    }else{
      //vm.adddata(result.data.csmlist);
      vm.adddata(testData);
    }
  } else {
    alert('网络不给力，请刷新重试~')
  }
}


