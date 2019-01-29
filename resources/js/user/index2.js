/**
 * 基础用户
 */
$(function() {
	var module = new Userinfo();
	module.initIndex();
})

var Userinfo = function(){
	var user = new Object();
	
	user.options = {
			tableName:"#dataTable",
			openId:"userInfoEditForm",
	    	dataUrl : "http://localhost:8888/admin/user/dataGrid",   // 表格查询路径
	    	editUrl : "http://localhost:8888/admin/user/editIndex",  //跳转到编辑页面路径
	    	removeUrl : "http://localhost:8888/admin/user/removes",  //删除路径
	    	editFormIndex : "http://localhost:8888/admin/user/editIndex"   //
	    		
	}; //参数对象
	
	user.initIndex = function () {
		user.loadGrid().init();
		user.buttonInit();
	};
	user.loadGrid = function () {
		var loadGrid = new Object();
	    loadGrid.init = function(){
	    	$(user.options.tableName).bootstrapTable({
	            url: user.options.dataUrl,         //请求后台的URL（*）
	            method: 'get',                      //请求方式（*）
	            toolbar: '#toolbar',                //工具按钮用哪个容器
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
	            showColumns: true,                  //是否显示所有的列
	            showRefresh: true,                  //是否显示刷新按钮
	            minimumCountColumns: 2,             //最少允许的列数
	            clickToSelect: false,                //是否启用点击选中行
	            height: 480,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
	            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
	            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
	            cardView: false,                    //是否显示详细视图
	            detailView: false,                 //是否显示父子表
	            undefinedText:'',
	            responseHandler:responseHandler,//请求数据成功后，渲染表格前的方法
	            dataField: "data",
	            columns: [{
	            	 checkbox: true
	            	 },{
	            		 field:"userid",
	            		 title:"帐号"
	            	 },{
	            		 field:"name",
	            		 title:"名称"
	            	 },{
	            		 field:"mobile",
	            		 title:"手机号码"
	            	 },{
	            		 field:"position",
	            		 title:"职位信息"
	            	 },{
	            		 field:"gender",
	            		 title:"性别",
	            		 formatter:function(value, row, index){
	            			 if(value == "0"){
	            				 return "未定义";
	            			 }
	            			 if(value == "1"){
	            				 return "男性";
	            			 }
	            			 if(value == "2"){
	            				 return "女性";
	            			 }
	            		 }
	            	 },{
	            		 field:"email",
	            		 title:"邮箱"
	            	 },{
	            		 field:"isleader",
	            		 title:"否为上级",
	            		 formatter:function(value, row, index){
	            			 if(value == "0"){
	            				 return "否";
	            			 }
	            			 if(value == "1"){
	            				 return "是";
	            			 }
	            		 }
	            	 },{
	            		 field:"telephone",
	            		 title:"座机"
	            	 },{
	            		 field:"englishName",
	            		 title:"英文名"
	            	 },{
	            		 field:"status",
	            		 title:"激活状态",
	            		 formatter:function(value, row, index){
	            			 if(value == "1"){
	            				 return "已激活";
	            			 }
	            			 if(value == "2"){
	            				 return "已禁用";
	            			 }
	            			 if(value == "4"){
	            				 return "未激活";
	            			 }
	            		 }
	            	 },{
	            		 title:"操作",
	            		 formatter:function(value, row, index){
	            			 var html = "";
	            			 
	            			 return html;
	            		 }
	            	 }
	    	    ],
	    	    onLoadSuccess:function(){
	    	    }
	        });
	    }
	    
	  //得到查询的参数
    	loadGrid.queryParams = function (params) {
	    	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	    			pageSize: this.pageSize,   //页面大小
	    			pageNumber: this.pageNumber,  //页码
	    			sort: params.sort,  //排序列名
	    			sortOrder: params.order//排位命令（desc，asc）
	    		};
	        return temp;
	    };
	    
    	return loadGrid;
		
	}

	/**
	 * 绑定按钮事件
	 */
	user.buttonInit = function (){
		
		//查询
    	$("#btn_query").on("click",function(){
    		var files = {
    				"columns[userid]":$("input[name='userid']").val().trim(),
    				"columns[name_like]":$("input[name='name']").val().trim()
    		}
    		var par = {
    	      url: user.options.dataUrl, //重设数据来源
    	      query: files//传到后台的参数
    	     }
    		$(user.options.tableName).bootstrapTable("refresh",par);
    	});
    	
    	//新增
    	$("#btn_add").on("click",function(){
    		user.modalOpen().editOpen(user.options.openId,null);
        });
    	
    	//修改
    	$("#btn_edit").on("click",function(){
            var ids = $(user.options.tableName).bootstrapTable("getSelections");
            console.log(ids);
            if(ids.length==1){
            	user.modalOpen().editOpen(user.options.openId,ids[0].id);
            }else{
        		$.fn.modalMsg("请选择一条需要修改的信息", "error");
        	}
    	});
    	
    	//删除
        $("#btn_delete").on("click",function(){
        	var ids = $(user.options.tableName).bootstrapTable("getSelections");
        	if(ids.length>0){
        		var id = "";
        		var len = ids.length;
        		$.each(ids,function(i,value){
        			id +=value.id;
        			if(i<len-1){
        				id +=",";
        			}
        		});
        		$.fn.modalConfirm("确定删除所选用户吗？",function(index,bool){
        			if(bool){
        				var opt = {ids:id};
        				user.requestGame(user.options.removeUrl,opt);
        				layer.close(index);
        			}
        		});
        	}else{
        		$.fn.modalMsg("请选择需要删除的信息", "error");
        	}
        });
    };
    
 // 表格加载成功后加载按钮事件
    user.successButtonInit = function (){
//	    	var url ="../advertis/saves.do";
    };
    
    user.requestGame = function(url,data){
    	var options = {
                url: url,
                type: "post",
                dataType: "json",
                data: data,
                success: function (msg) {
                	if(msg.status == "SUCCESS"){
                		$.fn.modalAlert("删除成功", "success");
                		window.location.reload();
                	}else{
                		$.fn.modalAlert("error", "error");
                	}
                }
            };
            $.ajax(options);
    } 
    
    /**
     * 修改或新曾弹出框
     */
    user.modalOpen = function (){
    	var open = new Object();
        open.options = {};  // 窗口参数
    	open.editOpen = function(openId,id){
    		$.fn.modalNotFooterOpen({
//    			id :openId,
    			title : "编辑管理员信息",
    			url : user.options.editFormIndex + ((id===undefined || id === null)?"":("?id="+id)),
    			width : "800px",
    			height : "500px"
    		});
    		
    	}
    	return open;
    }
    
	return user;
}

//请求成功方法
function responseHandler(result){
    var code = result.code;
    if(code != 200){
        alert("错误代码" + result.message);
        return;
    }
    return {
        total : result.info.total,
        data : result.info.rows 
    };
};
