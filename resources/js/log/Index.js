/**
 * 日志业务 js
 */
$(function(){
	var log = LogInfo();
	log.initIndex();
});

var LogInfo = function(){
	var log = new Object();
	log.options = {
		tableName:"#logInfoTable",
    	dataUrl : "http://localhost:8888/admin/log/getLog",  // 表格查询路径
    	removeUrl : "http://localhost:8888/admin/log/remove"  // 清除数据路径
	}; //参数对象
	
	log.initIndex = function () {
		log.loadGrid().init();
		log.buttonInit();
	};
	
	log.loadGrid = function () {
		var loadGrid = new Object();
	    loadGrid.init = function(){
	    	$(log.options.tableName).bootstrapTable({
	            url: log.options.dataUrl,         //请求后台的URL（*）
	            method: 'get',                      //请求方式（*）
	            toolbar: '#toolbar',                //工具按钮用哪个容器
	            striped: true,                      //是否显示行间隔色
	            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	            pagination: true,                   //是否显示分页（*）
	            sortable: true,                     //是否启用排序
	            sortOrder: "desc",                   //排序方式
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
	            clickToSelect: false,                //是否启用点击选中行
//	            height: 480,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
	            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
	            showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
	            cardView: false,                    //是否显示详细视图
	            detailView: true,                 //是否显示父子表
	            columns: [{
            	    	field:"id",
               	    	title:"Id"
               	    },{
               	    	field:"browser",
               	    	title:"系统/浏览器",
               	    	formatter:function(value, row, index){
               	    		var system = row.system;
               	    		var html = "";
               	    		if(system){
               	    			html += system.name;
               	    		}
               	    		if(value){
               	    			html +="/"+value.name + "("+value.version+")";
               	    		}
               	    		return html;
               	    	}
               	    },{
	            		 field:"ip",
	            		 title:"请求ip"
	            	 }, {
		            	 field: "path",
		            	 title: "请求路径"
	            	 },{
	            		 field:"method",
	            		 title:"请求方式"
	            	 },{
	            		 field:"create",
//	            		 sortable:true,
	            		 title:"时间"
	            	 }
	    	    ],
	    	    onLoadSuccess:function(){
//	    	    	task.successButtonInit();//加载成功后初始化事件
	    	    },detailFormatter:function(index,row){
	    	    	var html = "<table class='preTable'>";
	    	    	var sys = row.system;
	    	    	
	    	    	var sh = "";
	    	    	if(sys){
	    	    		sh += sys.deviceType +"  --  " + sys.name; 
	    	    	}
	    	    	html += "<tr>";
	    	    	html += "<td>系统信息</td>";
	    	    	html += "<td><div>"+ sh + "</div></td>";
	    	    	html += "</td>";
	    	    	html += "</tr>";
	    	    	
	    	    	var browser = row.browser;
	    	    	var bh = "";
	    	    	if(browser){
	    	    		bh = browser.name +"("+browser.manufacturer+"/"+ browser.type +"/"+browser.version+")";
	    	    	}
	    	    	
	    	    	html += "<tr>";
	    	    	html += "<td>浏览器信息</td>";
	    	    	html += "<td><div>"+ bh;
	    	    	html +=	"</div></td>";
	    	    	html += "</td>";
	    	    	html += "</tr>";
	    	    	
	    	    	html += "<tr>";
	    	    	html += "<td>错误信息</td>";
	    	    	html += "<td><pre class='preClass'>"+row.message+"</pre></td>";
	    	    	html += "</td>";
	    	    	html += "</tr>";
	    	    	
	    	    	html += "<tr>";
	    	    	html += "<td>headers参数</td>";
	    	    	html += "<td><pre class='preClass'>"+JSON.stringify(row.headers,null,2)+"</pre></td>";
	    	    	html += "</td>";
	    	    	html += "</tr>";
	    	    	
	    	    	html += "<tr>";
	    	    	html += "<td>parameters参数</td>";
	    	    	html += "<td><pre class='preClass'>"+JSON.stringify(row.parameters,null,2)+"</pre></td>";
	    	    	html += "</td>";
	    	    	html += "</tr>";
	    	    	
	    	    	var bodyHtml = "{}";
	    	    	if(row.body != null){
	    	    		bodyHtml = row.body;
	    	    	}
	    	    	
	    	    	html += "<tr>";
	    	    	html += "<td>body参数</td>";
	    	    	html += "<td><pre class='preClass'>"+ bodyHtml +"</pre></td>";
	    	    	html += "</td>";
	    	    	html += "</tr>";
	    	    	
	    	    	html += "<tr>";
	    	    	html += "<td>报错日志</td>";
	    	    	html += "<td><pre class='preClass'>"+JSON.stringify(row.exceptionInfo,null,2)+"</pre></td>";
	    	    	html += "</td>";
	    	    	html += "</tr>";
	    	    	html += "</table>";
	    	    	return html;
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
	
	log.buttonInit = function (){
		$("#btn_query").click(function(){
			var _path = $("input[name='path']").val();
			var _ip = $("input[name='ip']").val();
			
			if(!_path && !_ip){
				$.fn.modalMsg("请至少传递一个参数", "error");
				return ;
			}
			
			if(_path){
				$("input[name='path']").val($.trim(_path));
			}
			if(_ip){
				$("input[name='ip']").val($.trim(_ip));
			}
			
			var files = {
	    			path:$.trim(_path),
	    			ip:$.trim(_ip)
	    		};
			var par = {
		    	      url: log.options.dataUrl, //重设数据来源
		    	      query: files//传到后台的参数
		    	     }
		    $(log.options.tableName).bootstrapTable("refresh",par);
		});
		
		// 清除错误日志
		$("#removeLog").click(function(){
			var _where = $("select[name='where']").val();
			if(!_where){
				$.fn.modalMsg("请选择清除的时间段", "error");
				return ;
			}
			var options = {
	                url: log.options.removeUrl,
	                type: "post",
	                dataType: "json",
	                data: {where : _where},
	                success: function (data) {
	                	if(data.status == "SUCCESS"){
	                		$(log.options.tableName).bootstrapTable("refresh");
	                	}else{
	                		$.fn.modalAlert(data.message, "error");
	                	}
	                }
	            };
	            $.ajax(options);
		});
	};
	
    return log;	
}

