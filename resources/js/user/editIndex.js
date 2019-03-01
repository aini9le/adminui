var User = function() {

	var user = new Object();
	user.options = {}
	//初始化
	user.initIndex = function() {
		user.initFormControl(true);
		user.buttonInit();
	};

	user.buttonInit = function() {
		//保存表单
		$("#btn_save").on("click", function() {
			if (!$('#commitForm').Validform()) {//表单验证
				return false;
			}
			var postData = $("#commitForm").GetWebControls();
			console.log("postData:" + JSON.stringify(postData))
			$.fn.submitForm({
				url : "/user/saveOrUpdate",
				param : JSON.stringify(postData),
				success : function(result) {
					$.fn.modalMsg("保存成功", "success");
					$.fn.modalCloseAndRefreshByIndex();
				}
			});
		})
	}

	//初始化表单赋值
	user.initFormControl = function(readonly) {
		var id = $.fn.request("id");
		$.fn.setForm({
			url : "/user/findById?id=" + id,
			param : {},
			success : function(data) {
				$("#editForm").SetWebControls(data.info.data);
			}
		});
	}

	return user;
}