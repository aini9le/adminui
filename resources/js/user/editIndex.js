$(function() {
	var module = new UserEdit();
	module.initIndex();
	window.AcceptClick = module.AcceptClick;
})
var UserEdit = function(){	
	var user = new Object();
	user.options = {
			
	}
	user.initIndex = function () {
		user.initFormControl(true);
	};
	//保存表单
	user.AcceptClick = function() {
		console.log("--");
        if (!$('#form1').Validform()) {
            return false;
        }
        var postData = $("#form1").GetWebControls(exports.options.KeyValue);
        console.log("postData:"+postData)
        $.fn.submitForm({
            url: "/SysMgr/SchedulerMgr/Save?keyValue=" + exports.options.KeyValue,
            param: postData,
            loading: "正在保存数据...",
            success: function() {
                $.currentIframe().$("#gridTable").resetSelection();
                $.currentIframe().$("#gridTable").trigger("reloadGrid");
            }
        });
    };
	
	//初始化表单
	user.initFormControl = function (readonly) {
//		user.options.KeyValue = $.fn.request("keyValue");
	        $("#gender").ComboBox({
	            description: "==请选择=="
	        });
	        //获取表单
//	        if (!!exports.options.KeyValue) {
	            $.fn.setForm({
	                url: "http://localhost:8888/admin/user/findById?id=1011525769814718007",
	                param: {},
	                success: function (data) {
	                	console.log("data11111:"+JSON.stringify(data.info.data));
	                    $("#form1").SetWebControls(data.info.data);
	                }
	            });
//	        }
	    }
	
	return user;
}