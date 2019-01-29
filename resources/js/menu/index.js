
var Menuinfo = function(){
	var menu = new Object();
	
	menu.options = {
			tableName:"#menuInfoTable",openId:"MenuinfoEditForm",
	    	dataUrl : "http://localhost:8888/admin/menu/dataGrid",  // 表格查询路径
	    	removeUrl : "http://localhost:8888/admin/menu/removesByIds",  //删除路径
	    	editFormIndex : "http://localhost:8888/admin/menu/editIndex",   //跳转到编辑页面路径
	    	isEnableUrl: "http://localhost:8888/admin/menu/isEnableUrl"   //启用/暂停路径
	}; //参数对象
	
	
	menu.initIndex = function () {
		menu.loadGrid().init();
		menu.buttonInit();
	};
	
	menu.loadGrid = function () {
		var loadGrid = new Object();
	    loadGrid.init = function(){
	    	$(menu.options.tableName).bootstrapTable({
	            url: menu.options.dataUrl,         //请求后台的URL（*）
	            method: 'get',                      //请求方式（*）
	            toolbar: '#toolbar',                //工具按钮用哪个容器
	            striped: true,                      //是否显示行间隔色
	            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	            pagination: true,                   //是否显示分页（*）
	            sortable: true,                     //是否启用排序
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
	            clickToSelect: true,                //是否启用点击选中行
	            height: 480,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
	            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
	            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
	            cardView: false,                    //是否显示详细视图
	            detailView: false,                 //是否显示父子表
	            columns: [{
	            	 checkbox: true
	            	 }, {
		            	 field: "menuName",
		            	 title: "菜单名称"
	            	 },{
	            		 field:"menuUrl",
	            		 title:"菜单路径"
	            	 },{
	            		 field:"menuAuthority",
	            		 title:"权限路径"
	            	 },{
	            		 field:"menuType",
	            		 title:"菜单类型",
	            		 formatter:function(value, row, index){
	            			 if(value == "D"){
	            				 return "D(文件夹)";
	            			 }
	            			 if(value == "U"){
	            				 return "U(链接)";
	            			 }
	            			 if(value == "B"){
	            				 return "B(按钮)";
	            			 }
	            		 }
	            	 },{
	            		 field:"isEnable",
	            		 title:"启用/暂停",
	            		 formatter:function(value, row, index){
	            			 if(value == "Y"){
	            				 var span = "<span class='label label-success'>已启用</span>";
    							 return span;
	            			 }
	            			 if(value == "N"){
	            				 var span = "<span class='label label-info'>已暂停</span>";
	            				 return span;
	            			 }
	            		 }
	            	 },{
	            		 field:"enableDate",
	            		 title:"启用/暂停时间"
	            	 },{
	            		 field:"createDate",
	            		 title:"添加时间"
	            	 },{
	            		 title:"操作",
	            		 formatter:function(value, row, index){
	            			 var html = "";
	            			 if(row.isEnable == "N"){
	            				 html = '<button data-id="'+row.id+'" data-isEnable="Y" type="button" class="isEnable btn_add btn btn-success">'
		                            +'<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>启用'
		                            +'</button>';
	            			 }
	            			 if(row.isEnable == "Y"){
	            				 html = '  <button data-id="'+row.id+'" data-isEnable="N" type="button" class="isEnable btn_delete btn btn-remove">'
		                            +'<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>暂停'
		                            +'</button>';
	            			 }
	            			 return html;
	            		 }
	            	 }
	    	    ],
	    	    onLoadSuccess:function(){
	    	    	menu.successButtonInit();//加载成功后初始化事件
	    	    }
	        });
	    }
	    
	  //得到查询的参数
    	loadGrid.queryParams = function (params) {
	    	var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
//		    			name:$("#txt_search_departmentname").val(),
	    			pageSize: this.pageSize,   //页面大小
	    			pageNumber: this.pageNumber,  //页码
	    			sort: params.sort,  //排序列名
	    			sortOrder: params.order//排位命令（desc，asc）
	    		};
	        return temp;
	    };
	    
    	return loadGrid;
		
	}
	
	
	menu.buttonInit = function (){
    	$("#btn_query").on("click",function(){
    		
    		var key = $("input[name='menuName']").val().trim();
    		if(!key){
    			$.fn.modalMsg("请输入菜单名称", "error");
    			$("input[name='menuName']").val("");
    			return false;
    		}
    		var files = {
    			"columns[menuName_like]":key
    		}
    		$("input[name='processDefinitionKey']").val(key);
    		
    		var par = {
    	      url: menu.options.dataUrl, //重设数据来源
    	      query: files//传到后台的参数
    	     }
    		$(menu.options.tableName).bootstrapTable("refresh",par);
    	});
    	
    	$("#btn_add").on("click",function(){
    		menu.modalOpen().editOpen(menu.options.openId,null);
        });
    	
    	$("#btn_edit").on("click",function(){
            var ids = $(menu.options.tableName).bootstrapTable("getSelections");
            if(ids.length==1){
            	menu.modalOpen().editOpen(menu.options.openId,ids[0].id);
            }else{
        		$.fn.modalMsg("请选择一条需要修改的信息", "error");
        	}
    	});
    	//绑定删除事件
        $("#btn_delete").on("click",function(){
        	var ids = $(menu.options.tableName).bootstrapTable("getSelections");
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
        				var opt = {id:id};
        				menu.requestGame(menu.options.removeUrl,opt);
        				layer.close(index);
        			}
        		});
        	}else{
        		$.fn.modalMsg("请选择需要删除的信息", "error");
        	}
        });
    };
    
    
 // 表格加载成功后加载按钮事件
    menu.successButtonInit = function (){
//	    	var url ="../advertis/saves.do";
    	$(".isEnable").on("click",function(){
    		var opt = {id:$(this).attr("data-id"),isEnable:$(this).attr("data-isEnable")};
    		$.fn.modalConfirm("确定启用/暂停菜单吗？",function(index,bool){
    			if(bool){
    				menu.requestGame(menu.options.isEnableUrl,opt);
    				layer.close(index);
    			}
    		});

    	});
    };
    
    
    menu.requestGame = function(url,data){
    	var options = {
                url: url,
                type: "post",
                dataType: "json",
                data: data,
                success: function (data) {
                	if(data.status == "SUCCESS"){
                		$.fn.modalAlert(data.message, "success");
                		$.currentIframe().$(menu.options.tableName).bootstrapTable("refresh");
//	                		parent.layer.close(index); //再执行关闭  
                	}else{
                		$.fn.modalAlert(data.message, "error");
                	}
                }
            };
            $.ajax(options);
    } 
    
    menu.modalOpen = function (){
    	var open = new Object();
        open.options = {};  // 窗口参数
    	open.editOpen = function(openId,id){
    		$.fn.modalNotFooterOpen({
    			id :openId,
    			title : "编辑菜单信息",
    			url : menu.options.editFormIndex + ((id===undefined || id === null)?"":("?id="+id)),
    			width : "800px",
    			height : "800px"
    		});
    	}
    	return open;
    }
    
	return menu;
}
