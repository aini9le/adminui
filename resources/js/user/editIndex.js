$(function() {
	var module = new UserEdit();
	module.initIndex();
})
var UserEdit = function(){	
	var user = new Object();
	user.options = {
			
	}
	user.initIndex = function () {
		user.buttonInit();
	};
	user.buttonInit = function (){
		$("#btn_save").on("click",function(){
			
			if (!$('#userEditForm').Validform()) {//表单验证
	            return false;
	        }
			
			formAjaxAction({
				formUrl: MainConfig.getContextPath() + "/sysUser/save",
				dataJson:$('#userEditForm').serialize(),
				async:false,
				callBlack:function(result){
					if (result.status == "SUCCESS") {
                        $.fn.modalAlert("保存成功", "success");
                        $.fn.modalCloseAndRefreshByIndex();
                    }else{
                    	$.fn.modalAlert("保存失败", "warning");
                    	$.fn.modalCloseAndRefreshByIndex();
                    	
                    }
			    }
			});
        });
		
		$("#btn_cancel").on("click",function(){
			$.fn.modalCloseByIndex();
        });
	}
	return user;
}