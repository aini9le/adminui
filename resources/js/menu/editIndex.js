/**
 * 
 */

var EditMenuInfo = function(){
	var menu = new Object();
	
	menu.options = {
			supTableName:"#menuInfoTable",  // 上级页面列表id
			openId:"MenuinfoEditForm",    // 当前窗口id
			formId: "#regForm",     //表单提交id
			formAction: MainConfig.getContextPath() + "/sysMenu/saveOrUpdate",  // 表单提交路径
	    	dataUrl : MainConfig.getContextPath() + "/sysMenu/dataGrid",  // 表格查询路径
	    	editUrl : MainConfig.getContextPath()+ "/sysMenuinfo/savesNotSuper",    //保存 路径
	    	removeUrl : MainConfig.getContextPath() + "/sysMenuinfo/removes",  //删除路径
	    	editFormIndex : MainConfig.getContextPath() + "/sysMenu/editIndex"   //跳转到编辑页面路径
	}; //参数对象
	
	//初始化加载编辑表单
	menu.initEditForm = function(){
    	// 绑定选择事件
    	$("#selectParentMenu").on("click",function(){
    		menu.modalSelectParentMenuOpen();
    	});
//    	exports.options.form = $("#regForm");
//    	console.info(exports.options.form);
    	$("#btn_finish").on("click",function(){
    		var bool = $(menu.options.formId).Validform();
    		var index = parent.layer.getFrameIndex(menu.options.openId); //先得到当前iframe层的索引
    		if(bool){
    			var options = {
	                url: menu.options.formAction,
	                type: "post",
	                dataType: "json",
	                data: $(menu.options.formId).serialize(),
	                success: function (data) {
	                	if(data.status == "SUCCESS"){
	                		$.fn.modalAlert(data.message, "success");
	                		$.currentIframe().$(menu.options.supTableName).bootstrapTable("refresh");
	                		parent.layer.close(index); //再执行关闭  
	                	}else{
	                		$.fn.modalAlert(data.message, "error");
	                	}
	                }
	            };
	            $.ajax(options);
    		}
    	});
    	
    }
    
	menu.modalSelectParentMenuOpen = function (){
    	$.fn.modalNotFooterOpen({
			id : "selectParentMenu1",
			title : '选择菜单',
			url : MainConfig.getContextPath() + '/sysMenu/editSelectIndex',
			width : "600px",
			height : "400px"
    	});
    }
	
	return menu;
}	