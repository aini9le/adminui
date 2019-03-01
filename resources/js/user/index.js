/**
 * 基础用户
 */
var User = function() {
	var obj = new Object();
	obj.options = {
		tableName : "#dataTable",
		openId : "userEditForm",
		dataUrl : baseUrl + "/user/dataGrid",
		editUrl : baseUrl + "/user/editIndex",
		editFormIndex : "../../pages/user/editIndex.html"

	}; //参数对象

	obj.initIndex = function() {
		obj.loadGrid().init();
		obj.buttonInit();
	};
	obj.loadGrid = function() {
		var loadGrid = new Object();
		loadGrid.init = function() {
			$(obj.options.tableName).bootstrapTable({
				url : obj.options.dataUrl, //请求后台的URL（*）
				method : 'get', //请求方式（*）
				toolbar : '#toolbar', //工具按钮用哪个容器
				striped : true, //是否显示行间隔色
				cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
				pagination : true, //是否显示分页（*）
				sortable : false, //是否启用排序
				sortOrder : "desc", //排序方式
				sort : "name",
				queryParams : loadGrid.queryParams,//传递参数（*）
				sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
				pageNumber : 1, //初始化加载第一页，默认第一页
				pageSize : 10, //每页的记录行数（*）
				pageList : [ 10, 25, 50, 100 ], //可供选择的每页的行数（*）
				search : false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
				strictSearch : false,
				showColumns : true, //是否显示所有的列
				showRefresh : true, //是否显示刷新按钮
				minimumCountColumns : 2, //最少允许的列数
				clickToSelect : false, //是否启用点击选中行
				height : 480, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
				uniqueId : "id", //每一行的唯一标识，一般为主键列
				showToggle : false, //是否显示详细视图和列表视图的切换按钮
				cardView : false, //是否显示详细视图
				detailView : false, //是否显示父子表
				undefinedText : '',
				responseHandler : obj.responseHandler,//请求数据成功后，渲染表格前的方法
				dataField : "data",
				columns : [ {
					checkbox : true
				}, {
					field : "userid",
					title : "帐号"
				}, {
					field : "name",
					title : "名称"
				}, {
					field : "mobile",
					title : "手机号码"
				}, {
					field : "position",
					title : "职位信息"
				}, {
					field : "gender",
					title : "性别",
					formatter : function(value, row, index) {
						if (value == "0") {
							return "未定义";
						}
						if (value == "1") {
							return "男性";
						}
						if (value == "2") {
							return "女性";
						}
					}
				}, {
					field : "email",
					title : "邮箱"
				}, {
					field : "isleader",
					title : "否为上级",
					formatter : function(value, row, index) {
						if (value == "0") {
							return "否";
						}
						if (value == "1") {
							return "是";
						}
					}
				}, {
					field : "telephone",
					title : "座机"
				}, {
					field : "englishName",
					title : "英文名"
				}, {
					field : "status",
					title : "激活状态",
					formatter : function(value, row, index) {
						if (value == "1") {
							return "已激活";
						}
						if (value == "2") {
							return "已禁用";
						}
						if (value == "4") {
							return "未激活";
						}
					}
				}, {
					title : "操作",
					formatter : function(value, row, index) {
						var html = "";

						return html;
					}
				} ],
				onLoadSuccess : function() {
				}
			});
		}

		//得到查询的参数	
		loadGrid.queryParams = function(params) {
			var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
				pageSize : this.pageSize, //页面大小
				pageNumber : this.pageNumber, //页码
				sort : params.sort, //排序列名
				sortOrder : params.order
			//排位命令（desc，asc）
			};
			return temp;

		};

		return loadGrid;
	}

	/**
	 * 绑定按钮事件
	 */
	obj.buttonInit = function() {
		$("#btn_query").on("click", function() {//查询
			var files = {
				"columns[userid]" : $("input[name='userid']").val().trim(),
				"columns[name_like]" : $("input[name='name']").val().trim()
			}
			var par = {
				url : obj.options.dataUrl, //重设数据来源
				query : files
			//传到后台的参数
			}
			$(obj.options.tableName).bootstrapTable("refresh", par);
		});

		$("#btn_add").on("click", function() {//新增
			obj.modalOpen(obj.options.openId, null);
		});

		$("#btn_edit").on(
				"click",
				function() {//修改
					var ids = $(user.options.tableName).bootstrapTable(
							"getSelections");
					console.log(ids);
					if (ids.length == 1) {
						obj.modalOpen(user.options.openId, ids[0].id);
					} else {
						$.fn.modalMsg("请选择一条需要修改的信息", "error");
					}
				});

		$("#btn_delete").on(
				"click",
				function() {//删除
					var idsObj = $(obj.options.tableName).bootstrapTable(
							"getSelections");
					var ids = new Array();
					if (idsObj.length > 0) {
						$.each(idsObj, function(i, value) {
							ids.push(value.id);
						});
						var param = {
							"ids" : ids
						};
						$.fn.modalConfirm("确定删除吗？", function(index, bool) {
							if (bool) {
								obj.removesByIds(JSON.stringify(param));
								layer.close(index);
							}
						});
					} else {
						$.fn.modalMsg("请选择需要删除的信息", "error");
					}
				});
	};

	obj.removesByIds = function(ids) {
		$.fn.submitForm({
			url : "/user/removesByIds",
			param : ids,
			success : function(result) {
				$.fn.modalMsg("删除成功", "success");
				window.location.reload();
			}
		});
	}

	obj.modalOpen = function(openId, id) {//修改或新曾弹出框
		$.fn.modalNotFooterOpen({
			title : "编辑管理员信息",
			url : 'editIndex.html?id=' + id,
			width : "800px",
			height : "500px"
		});

	}

	obj.responseHandler = function(result) {//数据解析
		var code = result.code;
		if (code != 200) {
			alert("错误代码" + result.message);
			return;
		}
		return {
			total : result.info.total,
			data : result.info.rows
		};
	}

	return obj;

}
