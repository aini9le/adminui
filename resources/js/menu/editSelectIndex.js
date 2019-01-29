/**
 * 
 */
var SelectMenuinfo = function(){
	var menu = new Object();
	menu.options = {
			id:parent.$("input[name='supId']").val(),
			tableName:"#selectTable",
	    	dataUrl :MainConfig.getContextPath() + "/sysMenu/dataGrid"  // 表格查询路径
	}; //参数对象
	
	// 加载表格数据
	menu.selectLoadGrid = function () {
    	var loadGrid = new Object();
    	
	    loadGrid.init = function(){
	    	$(menu.options.tableName).bootstrapTable({
	            url: menu.options.dataUrl,         //请求后台的URL（*）
	            method: 'get',                      //请求方式（*）
//	            toolbar: '#toolbar',                //工具按钮用哪个容器
	            striped: true,                      //是否显示行间隔色
	            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	            pagination: true,                   //是否显示分页（*）
	            sortable: false,                     //是否启用排序
	            sortOrder: "asc",                   //排序方式
	            queryParams: loadGrid.queryParams,//传递参数（*）
	            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
	            pageNumber:1,                       //初始化加载第一页，默认第一页
	            pageSize: 10,                       //每页的记录行数（*）
	            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
	            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
	            strictSearch: false,
	            showColumns: false,                  //是否显示所有的列
	            showRefresh: false,                  //是否显示刷新按钮
	            minimumCountColumns: 2,             //最少允许的列数
	            clickToSelect: true,                //是否启用点击选中行
	            height: 300,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
	            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
	            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
	            cardView: false,                    //是否显示详细视图
	            detailView: false,                 //是否显示父子表
	            selectItemName:"id",                //radio or checkbox 的字段名
	            singleSelect:true,                  //设置True 将禁止多选
	            columns: [{
    				checkbox: true,
    				formatter : function(value, row, index) {
    					if(menu.options.id == row.id){
    						return {
        			           // disabled : true,//设置是否可用
        			            checked : true//设置选中
        			        };
    					}
    				}
    			}, {
    				field: 'id',
    				title: 'ID'
    			}, {
    				field: 'menuName',
    				title: '菜单名称'
    			}]
	        });
	    }
	    
	    //得到查询的参数
    	loadGrid.queryParams = function (params) {
	    	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	    			pageSize: this.pageSize,   //页面大小
	    			pageNumber: this.pageNumber,  //页码
	    			sort: params.sort,  //排序列名
	    			sortOrder: params.order//排序命令（desc，asc）
	    			,"columns[menuType_in]":"D,U"
	    		};
	        return temp;
	    };
	    
    	return loadGrid;
    };
    
    
    // 查找带回加载
    menu.initSelect = function (){
    	$("#btn_query").on("click",function(){
    		var key = $("input[name='menuName']").val().trim();
    		if(!key){
    			$.fn.modalMsg("请输入菜单名称", "error");
    			$("input[name='menuName']").val("");
    			return false;
    		}
    		$("input[name='processDefinitionKey']").val(key);
    		var files = {
    			"columns[menuName_like]":key
    		}
    		var par = {
    	      url: menu.options.dataUrl, //重设数据来源
    	      query: files//传到后台的参数
    	     }
    		$(menu.options.tableName).bootstrapTable("refresh",par);
    	});
    	
    	$("#select_btn_finish").on("click",function(){
    		var index = parent.layer.getFrameIndex("selectParentMenu1"); //先得到当前iframe层的索引
    		var se = $("#select_input").val();
    		
    		var ids = $('#selectTable').bootstrapTable("getSelections");
        	if(ids.length==1){
        		parent.$("input[name='supId']").val(ids[0].id);
        	}
//    	    parent.layer.tips("参数被带回了", "input[name='parentid']", {time: 5000});
    	    parent.layer.close(index); //再执行关闭  
    	});
    }
    
	return menu;
}