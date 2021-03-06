
function readyIndex() {
    $(".main_menu li div").click(function () {
        $(".main_menu li div").removeClass('main_menu leftselected');
        $(this).addClass('main_menu leftselected');
    }).hover(function () {
        $(this).addClass("hoverleftselected");
    }, function () {
        $(this).removeClass("hoverleftselected");
    });
}
//返回到登录界面
function LoadLoinPage() {
    window.parent.location.href = RootPath() + "/Login.html?Data=" + new Date();
    return false;
}
function CheckIfLogin() {
    var xh = GetQuery("userXh");
    if (IsNullOrEmpty(xh) == false) {
        setInterval(LoadLoinPage, 1000);
        return false;
    }
}
/**
加载布局
**/
function Loadlayout() {
    if ($('.layout').length > 0) {
        $("#layout").splitter({
            type: "v",
            outline: true,
            minLeft: 150, sizeLeft: 200, maxLeft: 350,
            anchorToWindow: true,
            accessKey: "L"
        });
    }
}
//Tab标签切换
function Tabchange(id) {
    $('.ScrollBar').find('.tabPanel').hide();
    $('.ScrollBar').find("#" + id).show();
    $(".tab_list_top div").removeClass("actived");
    $(".tab_list_top").find("#Tab" + id).addClass("actived"); //添加选中样式  
}
function thisTabchange(e, id) {
    $(e).parent().find('div').removeClass("actived");
    $(e).addClass("actived");
    $('.tabPanel').hide();
    $("#" + id).show();
}
function standTabchange(e, id) {
    $(e).parent().find('div').removeClass("standtabactived");
    $(e).addClass("standtabactived");
    $(e).parent().next().children('div').hide();
    $("#" + id).show();
}
/********
接收地址栏参数
**********/
function GetQuery(key) {
    var paramsRet = "";

    var search = location.search.slice(1); //得到get方式提交的查询字符串
    if (!IsNullOrEmpty(search)) {
        search = window.parent.location.search.slice(1);
    }

    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split("=");
        if (ar[0] == key) {
            if (unescape(ar[1]) == 'undefined') {
                paramsRet = "";
            } else {
                paramsRet = unescape(ar[1]);
            }
        }
    }
    if (!IsNullOrEmpty(paramsRet) && key.toLowerCase() == "userxh" || key.toLowerCase() == "t") {
        search = window.parent.location.search.slice(1);
        arr = search.split("&");
        for (var i = 0; i < arr.length; i++) {
            var ar = arr[i].split("=");
            if (ar[0].toLowerCase() == key.toLowerCase()) {
                if (unescape(ar[1]) == 'undefined') {
                    paramsRet = "";
                } else {
                    paramsRet = unescape(ar[1]);
                }
            }
        }
    }
    return paramsRet;
}

function GetCurrentFromUserXh(key) {
    var search = window.parent.location.search.slice(1); //得到get方式提交的查询字符串
    var arr = search.split("&");
    try {
        for (var i = 0; i < arr.length; i++) {
            var ar = arr[i].split("=");
            if (ar[0] == key) {
                if (unescape(ar[1]) == 'undefined') {
                    return "";
                } else {
                    return unescape(ar[1]);
                }
            }
        }
    } catch (ex) {
    }
    return "";
}

function GetQueryiframe(key) {
    var search =window.location.search.slice(1); //得到get方式提交的查询字符串
    var arr = search.split("&");
    try {
        for (var i = 0; i < arr.length; i++) {
            var ar = arr[i].split("=");
            if (ar[0] == key) {
                if (unescape(ar[1]) == 'undefined') {
                    return "";
                } else {
                    return unescape(ar[1]);
                }
            }
        }
    } catch (ex) {
    }
    return "";
}
/*
获取动态tab标签当前iframeID
*/
function tabiframeId() {
    var tabs_container = $("#tabs_container");
    var ret = "tabs_iframe_" + tabs_container.find('.selected').attr('id').substr(5);
    return ret;
}
//关闭当前tab
function btn_back() {
    ThisCloseTab();
}
/*
中间加载对话窗
*/
function Loading(bool, text) {
    try {
        var ajaxbg = $("#loading_background,#loading");
        if (!!text) {
            $("#loading").css("left", ($('body').width() - $("#loading").width()) / 2);
            $("#loading span").html(text);
        } else {
            $("#loading").css("left", ($('body').width() - $("#loading").width()) / 2);
            $("#loading span").html("正在加载数据，请稍后…");
        }
        if (bool) {
            ajaxbg.show();
        } else {
            ajaxbg.hide();
        }
    } catch (ex) {
    }
}
/*
中间加载对话窗
*/
function Loading_top(bool, text) {
    try {
        var ajaxbg = top.$("#loading_background,#loading");
        if (!!text) {
            top.$("#loading").css("left", (top.$('body').width() - top.$("#loading").width()) / 2);
            top.$("#loading span").html(text);
        } else {
            top.$("#loading").css("left", (top.$('body').width() - top.$("#loading").width()) / 2);
            top.$("#loading span").html("正在加载数据，请稍后…");
        }
        if (bool) {
            ajaxbg.show();
        } else {
            ajaxbg.hide();
        }
    } catch (ex) {
        
    }
}
/* 
请求Ajax 带返回值
*/
function getAjax(url, postData, callBack) {
    $.ajax({
        type: 'post',
        dataType: "text",
        url: RootPath() + url,
        data: postData,
        cache: false,
        //async: false,
        success: function (data) {
            callBack(data);
            //Loading(false);
        },
        error: function (data) {
            //alert("error:" + JSON.stringify(data));
            Loading(false);
        }
    });
}

/* 
请求Ajax 带返回值
*/
function getAjax_notloading(url, postData, callBack) {
    $.ajax({
        type: 'post',
        dataType: "text",
        url: RootPath() + url,
        data: postData,
        cache: false,
        //async: false,
        success: function (data) {
            callBack(data);
        },
        error: function (data) {
            
        }
    });
}

function getAjax_DialogTips(url, postData, callBack) {
    $.ajax({
        type: 'post',
        dataType: "text",
        url: RootPath() + url,
        data: postData,
        cache: false,
        //async: false,
        beforeSend: function () {
            try {
                $.dialog.tips('请稍候，正在读取数据...', 600, 'loading.gif');
            } catch (e) {
                top.$.dialog.tips('请稍候，正在读取数据...', 600, 'loading.gif');
            } 
        },
        success: function (data) {
            try {
                $.dialog.tips('数据读取完成', 1, 'succ.png');
            } catch (e) {
                top.$.dialog.tips('数据读取完成', 1, 'succ.png');
            } 
            callBack(data);
        },
        error: function (data) {
            try {
                $.dialog.tips(data.responseText, 1, 'i.png');
            } catch (e) {
                top.$.dialog.tips(data.responseText, 1, 'i.png');
            } 
            callBack(data);
        }
    });
}

function getAjax_Json(url, postData, callBack) {
    try {
        $.ajax({
            url: RootPath() + url,
            type: "post",
            data: postData,
            dataType: "json",
            //contentType: "application/json; charset=utf-8",
            //async: false,
            success: function (data) {
                Loading(false);
                callBack(data);
            },
            error: function (data) {
                Loading(false);
                if (IsNullOrEmpty(data.responseText) && data.responseText.length < 50) {
                    alertDialog(data.responseText, -1);
                }
                //alertDialog("error:" + data.responseText, -1);
            }
        });
    } catch (e) {

    }
}
function getAjax_Json_url(url, postData, callBack) {
    try {
        $.ajax({
            url: url,
            type: "post",
            data: postData,
            dataType: "json",
            //contentType: "application/json; charset=utf-8",
            //async: false,
            success: function (data) {
                Loading(false);
                callBack(data);
            },
            error: function (data) {
                Loading(false);
                if (IsNullOrEmpty(data.responseText) && data.responseText.length < 50) {
                    alertDialog(data.responseText, -1);
                }
                //alertDialog("error:" + data.responseText, -1);
            }
        });
    } catch (e) {

    }
}
function AjaxJson(url, postData, callBack) {
    try {
        $.ajax({
            url: RootPath() + url,
            type: "post",
            data: postData,
            dataType: "json",
            //async: false,
            success: function (data) {
                try {
                    if (data.Code == "-1") {
                        Loading(false);
                        alertDialog(data.Message, -1);
                    } else {
                        Loading(false);
                        callBack(data);
                    }
                }
                catch (ex) {
                    Loading(false);
                    callBack(data);
                }
            },
            error: function (data) {
                Loading(false);
                if (IsNullOrEmpty(data.responseText) && data.responseText.length < 50) {
                    alertDialog(data.responseText, -1);
                }
            }
        });
    } catch (e) {
        Loading(false);
    }
}

function AjaxJson_DialogTips(url, postData, callBack) {
    try {
        $.ajax({
            url: RootPath() + url,
            type: "post",
            data: postData,
            dataType: "json",
            async: true,
            // async: false,
            beforeSend: function () {
                try {
                    $.dialog.tips('请稍候，正在读取数据...', 600, 'loading.gif');
                } catch (e) {
                    top.$.dialog.tips('请稍候，正在读取数据...', 600, 'loading.gif');
                }
            },
            success: function (data) {
                try {
                    $.dialog.tips('数据读取完成', 1, 'succ.png');
                } catch (e) {
                    top.$.dialog.tips('数据读取完成', 1, 'succ.png');
                }
                callBack(data);
            },
            error: function (data) {
                if (IsNullOrEmpty(data.responseText) && data.responseText.length < 50) {
                    //alertDialog(data.responseText, -1);
                    try {
                        $.dialog.tips(data.responseText, 1, 'i.png');
                    } catch (e) {
                        top.$.dialog.tips(data.responseText, 1, 'i.png');
                    }
                }
            }
        });
    } catch (e) {
    }
}
/*
刷新当前页面
*/
function Replace() {
    location.reload();
    return false;
}
/*
href跳转页面
*/
function Urlhref(url) {
    location.href = url;
    return false;
}
/*
iframe同步连接
*/
function iframe_src(iframe, src) {
    Loading(true);
    $("#" + iframe).attr('src', RootPath() + src);
    $("#" + iframe).load(function () {
        Loading(false);
    });
}
/*
grid表格扩展Begin
*/

/**获取表格选择行
**/
function GetJqGridRowIndx(jgrid) {
    return $(jgrid).jqGrid('getGridParam', 'selrow');
}
/**获取JqGrid表格列值
jgrid：ID，code：列字段
**/
function GetJqGridRowValue(jgrid, code) {
    var KeyValue = "";
    var selectedRowIds = $(jgrid).jqGrid("getGridParam", "selarrrow");
    if (selectedRowIds != "") {
        var len = selectedRowIds.length;
        for (var i = 0; i < len ; i++) {
            var rowData = $(jgrid).jqGrid('getRowData', selectedRowIds[i]);
            KeyValue += rowData[code] + ",";
        }
        KeyValue = KeyValue.substr(0, KeyValue.length - 1);
    } else {
        var rowData = $(jgrid).jqGrid('getRowData', $(jgrid).jqGrid('getGridParam', 'selrow'));
        KeyValue = rowData[code];
    }
    return KeyValue;
}
/**获取JqGrid表格列值
jgrid：ID，RowIndx:行ID,code：列字段
**/
function GetJqGridValue(jgrid, RowIndx, code) {
    var rowData = $(jgrid).jqGrid('getRowData', RowIndx);
    return rowData[code];
}

/**grid表格扩展end**/


/**
格式化时间显示方式、用法:format="yyyy-MM-dd hh:mm:ss";
*/
formatDate = function (v, format) {
    if (!v) return "";
    var d = v;
    if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
    }
    var o = {
        "M+": d.getMonth() + 1,  //month
        "d+": d.getDate(),       //day
        "h+": d.getHours(),      //hour
        "m+": d.getMinutes(),    //minute
        "s+": d.getSeconds(),    //second
        "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
        "S": d.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
/**
当前时间 格式：yyyy-MM-dd HH:mm
*/
function CurrentTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}
/**
当前时间 格式：yyyy-MM-dd
*/
function CurrentTime_yyyy_MM_dd() {
    var date = new Date();
    var year = date.getFullYear();
    var month = parseInt(date.getMonth()) + 1;
    var day = date.getDate();
    if (parseInt(month) < 10) {
        month = "0" + month;
    }
    if (parseInt(day) < 10) {
        day = "0" + day;
    }
    return year + '-' + month + '-' + day;
}
function CurrentTime_yyy_mm_dd_00_00() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + '-' + month + '-' + day + ' 00:00';
}

function fun_date(aa) {
    var date1 = new Date();
        time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(); //time1表示当前时间
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + aa);
    var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate()+'';
    return time2;
}
/*
自动获取页面控件值
*/
function GetWebControls(element) {
    var reVal = "";
    $(element).find('input,select,textarea').each(function (r) {
        var id = $(this).attr('id');
        var value = $(this).val();
        var type = $(this).attr('type');
        switch (type) {
            case "checkbox":
                if ($(this).attr("checked")) {
                    reVal += '"' + id + '"' + ':' + '"1",';
                } else {
                    reVal += '"' + id + '"' + ':' + '"0",';
                }
                break;
            default:
                if (value == "") {
                    value = "&nbsp;";
                }
                reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",';
                break;
        }
    });
    reVal = reVal.substr(0, reVal.length - 1);
    return jQuery.parseJSON('{' + reVal + '}');
}
/*
自动给控件赋值
*/
function SetWebControls(data) {
    try {
        for (var key in data) {
            var id = $('#' + key);
            if (id.attr('id')) {
                var value = $.trim(data[key]).replace("&nbsp;", "").replace(/</g, "<").replace(/>/, ">");
                var type = id.attr('type');
                switch (type) {
                    case "checkbox":
                        if (value == 1) {
                            id.attr("checked", 'checked');
                        } else {
                            id.removeAttr("checked");
                        }
                        break;
                    default:
                        id.val(value);
                        break;
                }
            }
        }
    } catch (e) {
        //alert(e)
    }
}
/*
自动给控件赋值、对Lable
*/
function SetWebLable(data) {
    for (var key in data) {
        var id = $('#' + key);
        if (id.attr('id')) {
            var value = $.trim(data[key]).replace("&nbsp;", "");
            id.text(value);
        }
    }
}
/**
* 获取搜索条件：返回JSON
* var parameter = GetParameterJson("搜索区域table的ID");
*/
function GetParameterJson(tableId) {
    var parameter = "";
    $("#" + tableId + " tr").find('td').find('input,select').each(function () {
        var pk_id = $(this).attr('id');
        var pk_value = $("#" + pk_id).val();
        parameter += '"' + pk_id + '"' + ':' + '"' + $.trim(pk_value) + '",';
    });
    parameter = parameter.substr(0, parameter.length - 1);
    return '{' + parameter + '}';
}
/**
* 获取动态table：键、值，返回JSON
* var GetTableData = GetTableDataJson("table的ID");
*/
function GetTableDataJson(tableId) {
    var item_Key_Value = "";
    var index = 1;
    var trjson = "";
    if ($(tableId + " tbody tr").length > 0) {
        $(tableId + " tbody tr").each(function () {
            var tdjson = "";
            $(this)
                .find('td')
                .find('input,select,textarea')
                .each(function() {
                    var pk_id = $(this).attr('id');
                    var pk_value = "";
                    if ($("#" + pk_id).attr('type') == "checkbox") {
                        if ($("#" + pk_id).attr("checked")) {
                            pk_value = "1";
                        } else {
                            pk_value = "0";
                        }
                    } else {
                        pk_value = $("#" + pk_id).val();
                    }
                    var array = new Array();
                    array = pk_id.split("➩"); //字符分割
                    tdjson += '"' + array[0] + '"' + ':' + '"' + $.trim(pk_value) + '",';
                });
            tdjson = tdjson.substr(0, tdjson.length - 1);
            trjson += '{' + tdjson + '},';
        });
    } else {
        $(tableId + " tr").each(function () {
            var tdjson = "";
            $(this).find('td').find('input,select,textarea').each(function () {
                var pk_id = $(this).attr('id');
                var pk_value = "";
                if ($("#" + pk_id).attr('type') == "checkbox") {
                    if ($("#" + pk_id).attr("checked")) {
                        pk_value = "1";
                    } else {
                        pk_value = "0";
                    }
                } else {
                    pk_value = $("#" + pk_id).val();
                }
                var array = new Array();
                array = pk_id.split("➩"); //字符分割
                tdjson += '"' + array[0] + '"' + ':' + '"' + $.trim(pk_value) + '",';
            })
            tdjson = tdjson.substr(0, tdjson.length - 1);
            trjson += '{' + tdjson + '},';
        });
    }
    trjson = trjson.substr(0, trjson.length - 1);
    if (trjson == '{}') {
        trjson = "";
    }
    return '[' + trjson + ']';
}
/**
获取选中复选框值
值：1,2,3,4
**/
function CheckboxValue() {
    var reVal = '';
    $('[type = checkbox]').each(function () {
        if ($(this).attr("checked")) {
            reVal += $(this).val() + ",";
        }
    });
    reVal = reVal.substr(0, reVal.length - 1);
    return reVal;
}
/**
文本框只允许输入数字
**/
function IsNumber(obj) {
    $("#" + obj).bind("contextmenu", function () {
        return false;
    });
    $("#" + obj).css('ime-mode', 'disabled');
    $("#" + obj).keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
}
/**
只能输入数字和小数点
**/
function IsMoney(obj) {
    $("#" + obj).bind("contextmenu", function () {
        return false;
    });
    $("#" + obj).css('ime-mode', 'disabled');
    $("#" + obj).bind("keydown", function (e) {
        var key = window.event ? e.keyCode : e.which;
        if (isFullStop(key)) {
            return $(this).val().indexOf('.') < 0;
        }
        return (isSpecialKey(key)) || ((isNumber(key) && !e.shiftKey));
    });
    function isNumber(key) {
        return key >= 48 && key <= 57;
    }
    function isSpecialKey(key) {
        return key == 8 || key == 46 || (key >= 37 && key <= 40) || key == 35 || key == 36 || key == 9 || key == 13;
    }
    function isFullStop(key) {
        return key == 190 || key == 110;
    }
}
function SettingValueKeydown() {
    var valueInput = parent.document.getElementById("txtVarVal");
    var $valueInput = $(valueInput);
    $valueInput.bind("contextmenu", function () {
        return false;
    });
    $valueInput.css('ime-mode', 'disabled');
    $valueInput.bind("keyup", function (e) {
        var key = window.event ? e.keyCode : e.which;
        if (isFullStop1(key)) {
            var is_FullStop = false;
            isFullStop = $(this).val().indexOf('.') < 0;           
            return is_FullStop;
        }
        return (isSpecialKey1(key)) || ((isNumber1(key) && !e.shiftKey));
    });
    function isNumber1(key) {
        return key >= 48 && key <= 57
    }
    function isSpecialKey1(key) {
        return key == 8 || key == 46 || (key >= 37 && key <= 40) || key == 35 || key == 36 || key == 9 || key == 13
    }
    function isFullStop1(key) {
        return key == 190 || key == 110;
    }
}
function clearNoNum() {
    var objobj = parent.document.getElementById("txtVarVal");
    objobj.value = objobj.value.replace(/[^\d.]/g, '');
}

function IsNumberOrderBy() {
    var orderByInpt = $(parent.document.getElementById("txtOrderBy"));
    $(orderByInpt).bind("contextmenu", function () {
        return false;
    });
    $(orderByInpt).css('ime-mode', 'disabled');
    $(orderByInpt).keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
}
/**
* 金额格式(保留2位小数)后格式化成金额形式
*/
function FormatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '' +
                num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}
//保留两位小数    
//功能：将浮点数四舍五入，取小数点后2位   
function ToDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return 0;
    }
    f = Math.round(x * 100) / 100;
    return f;
}
/**
查找数组中是否存在某个值
arr:数组
val:对象值
**/
function ArrayExists(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val)
            return true;
    }
    return false;
}
/**
删除数组中否存在的某个值
arr:数组
val:对象值
**/
function RemoveExists(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, val);
            return arr;
        }
    }
    return arr;
}
/*
删除数组
*  方法:Array.remove(dx) 通过遍历,重构数组 
*  功能:删除数组元素. 
*  参数:dx删除元素的下标. 
*/
Array.prototype.removeElement = function (dx) {
    if (isNaN(dx) || dx >= this.length) { return false; }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i];
        }
    }
    this.length -= 1;
}

/*
获取两个时间时间的小时差值
*  参数:startTime 开始时间,endTime结束时间. 
*/
function GetBetweenHour(startTime,endTime) {
    //var dt1 = "2015-12-20 10:30";
    //var dt2 = "2015-12-20 14:30";
    var dt1 = startTime;
    var dt2 = endTime;
    var regTime = /(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2})/g;
    //alert(dt1.replace(regTime, "$2-$3-$1$4"));
    var interval = Math.abs(Date.parse(dt1.replace(regTime, "$2-$3-$1$4")) - Date.parse(dt2.replace(regTime, "$2-$3-$1$4"))) / 1000;
    var diffHour = Math.floor(interval / 3600);
    return diffHour;
}

/*弹出对话框begin========================================*/
/*关闭对话框*/
function closeDialog() {
    var api = frameElement.api, W = api.opener;
    api.close();
    return true;
}
/*
弹出对话框（带：确认按钮、取消按钮）
*/
function openDialog(url, _id, _title, _width, _height, callBack) {
    Loading(true);
    try {
        $.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            lock: true,
            title: _title,
            resize: false,
            extendDrag: true,
            content: 'url:' + RootPath() + url,
            ok: function () {
                callBack(_id);
                return false;
            },
            cancel: true
        });
    } catch (e) {
        top.$.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            lock: true,
            title: _title,
            resize: false,
            extendDrag: true,
            content: 'url:' + RootPath() + url,
            ok: function () {
                callBack(_id);
                return false;
            },
            cancel: true
        });
    }
}
function openDialog_current(url, _id, _title, _width, _height,_boolLoading, callBack) {
    if (_boolLoading) {
        Loading(true);
    }
     try {
        top.$.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            lock: true,
            title: _title,
            resize: false,
            extendDrag: true,
            content: 'url:' + RootPath() + url,
            cancel: true
        });
    } catch (e) {
        $.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            lock: true,
            title: _title,
            resize: false,
            extendDrag: true,
            content: 'url:' + RootPath() + url,
            cancel: true
        });
    } 
}
/*
弹出对话框（带：确认按钮、取消按钮 ,是否最大化）:员工状态调用到
*/
function openDialog_max(url, _id, _title, _width, _height, _boolMax, _boolLock, _boolFixed, _boolLoading,_boolResize, callBack) {
    if (_boolLoading) {
        Loading(true);
    }
    try {
        $.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: _boolMax,
            lock: _boolLock,
            title: _title,
            resize: _boolResize,
            fixed: _boolFixed,
            drag: true,
            extendDrag: true,
            content: 'url:' + RootPath() + url,
            /*ok: function () 
            {
            callBack(_id);
            return false;
            },*/
            cancelVal: '关闭',
            cancel: true
        });
    } catch (ex) {
        top.$.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: _boolMax,
            lock: _boolLock,
            title: _title,
            resize: _boolResize,
            fixed: _boolFixed,
            drag: true,
            extendDrag: true,
            content: 'url:' + RootPath() + url,
            /*ok: function () 
            {
            callBack(_id);
            return false;
            },*/
            cancelVal: '关闭',
            cancel: true
        });
    }
}
//不含按钮
function openDialog_max_not_button(url, _id, _title, _width, _height, _boolMax, _boolLock, _boolFixed, _boolLoading, _boolResize, callBack) {
    if (_boolLoading) {
        Loading(true);
    }
    try {
        $.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: _boolMax,
            lock: _boolLock,
            title: _title,
            resize: _boolResize,
            fixed: _boolFixed,
            drag: true,
            extendDrag: true,
            content: 'url:' + RootPath() + url
            /*ok: function () 
            {
            callBack(_id);
            return false;
            },*/
            //cancelVal: '关闭',
            //cancel: true
        });
    } catch (e) {
        top.$.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: _boolMax,
            lock: _boolLock,
            title: _title,
            resize: _boolResize,
            fixed: _boolFixed,
            drag: true,
            extendDrag: true,
            content: 'url:' + RootPath() + url
            /*ok: function () 
            {
            callBack(_id);
            return false;
            },*/
            //cancelVal: '关闭',
            //cancel: true
        });
    } 
}
//不含按钮 右下角 底部弹出
function openDialog_max_not_button_bottom_right(url, _id, _title, _width, _height, _boolMax, _boolLock, _boolFixed, _boolLoading, _boolResize, callBack) {
    if (_boolLoading) {
        Loading(true);
    }
    try {
        $.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: _boolMax,
            left: '100%',
            top: '100%',
            lock: _boolLock,
            title: _title,
            resize: _boolResize,
            fixed: _boolFixed,
            drag: true,
            extendDrag: true,
            content: 'url:' + RootPath() + url
            /*ok: function () 
            {
            callBack(_id);
            return false;
            },*/
            //cancelVal: '关闭',
            //cancel: true
        });
    } catch (e) {
        top.$.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: _boolMax,
            left: '100%',
            top: '100%',
            lock: _boolLock,
            title: _title,
            resize: _boolResize,
            fixed: _boolFixed,
            drag: true,
            extendDrag: true,
            content: 'url:' + RootPath() + url
            /*ok: function () 
            {
            callBack(_id);
            return false;
            },*/
            //cancelVal: '关闭',
            //cancel: true
        });
    } 
}


/*
弹出对话框（带：确认按钮、取消按钮 ,是否最大化）
*/
function openDialog_max_width_sure(url, _id, _title, _width, _height, _boolMax, _boolLock, _boolFixed, _boolLoading, _boolResize, callBack) {
    if (_boolLoading) {
        Loading(true);
    }
    $.dialog({
        id: _id,
        width: _width,
        height: _height,
        max: _boolMax,
        lock: _boolLock,
        title: _title,
        resize: _boolResize,
        fixed: _boolFixed,
        drag:true,
        extendDrag: true,
        content: 'url:' + RootPath() + url,
        ok: function () {
            callBack(_id);
            return false;
        },
        cancelVal: '取消',
        cancel: true
    });
}
/*
弹出对话框（带：确认按钮、取消按钮 ,是否最大化）
*/
function openDialog_max_min_width_sure(url, _id, _title, _width, _height, _boolMax,_boolMin, _boolLock, _boolFixed, _boolLoading, _boolResize, _boolDrag,callBack) {
    if (_boolLoading) {
        Loading(true);
    }
    $.dialog({
        id: _id,
        width: _width,
        height: _height,
        max: _boolMax,
        min:_boolMin,
        lock: _boolLock,
        title: _title,
        resize: _boolResize,
        fixed: _boolFixed,
        drag: _boolDrag,
        extendDrag: true,
        content: 'url:' + RootPath() + url,
        ok: function () {
            callBack(_id);
            return false;
        },
        cancelVal: '取消',
        cancel: true
    });
}
function openDialog_max_min_width_sure_parent(url, _id, _title, _width, _height, _boolMax, _boolMin, _boolLock, _boolFixed, _boolLoading, _boolResize, _boolDrag, callBack) {
    if (_boolLoading) {
        Loading(true);
    }
    $.dialog({
        id: _id,
        width: _width,
        height: _height,
        max: _boolMax,
        min: _boolMin,
        lock: _boolLock,
        title: _title,
        resize: _boolResize,
        fixed: _boolFixed,
        drag: _boolDrag,
        extendDrag: true,
        parent:this,
        content: 'url:' + RootPath() + url,
        ok: function () {
            callBack(_id);
            return false;
        },
        cancelVal: '取消',
        cancel: true
    });
}

function openDialog_max_min_width_notsure_parent(url, _id, _title, _width, _height, _boolMax, _boolMin, _boolLock, _boolFixed, _boolLoading, _boolResize, _boolDrag, callBack) {
    if (_boolLoading) {
        Loading(true);
    }
    $.dialog({
        id: _id,
        width: _width,
        height: _height,
        max: _boolMax,
        min: _boolMin,
        lock: _boolLock,
        title: _title,
        resize: _boolResize,
        fixed: _boolFixed,
        drag: _boolDrag,
        extendDrag: true,
        parent: this,
        content: 'url:' + RootPath() + url,
        cancelVal: '取消',
        cancel: true
    });
}
//底部右下角 弹出  不含确认按钮
function openDialog_max_not_button_bottom_right_width_button_index(url, _id, _title, _width, _height, _boolMax, _boolLock, _boolFixed, _boolLoading, _boolResize, callBack) {
    if (_boolLoading) {
        Loading(true);
    }
    try {
        $.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: _boolMax,
            left: '100%',
            top: '100%',
            lock: _boolLock,
            title: _title,
            resize: _boolResize,
            fixed: _boolFixed,
            drag: true,
            extendDrag: true,
            content: 'url:' + RootPath() + url,
            ok: function () {
                callBack(_id);
                return false;
            },
            cancelVal: '关闭',
            cancel: true
        });
    } catch (e) {
        top.$.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: _boolMax,
            left: '100%',
            top: '100%',
            lock: _boolLock,
            title: _title,
            resize: _boolResize,
            fixed: _boolFixed,
            drag: true,
            extendDrag: true,
            content: 'url:' + RootPath() + url,
            ok: function () {
                callBack(_id);
                return false;
            },
            cancelVal: '关闭',
            cancel: true
        });
    }
}
//首页报警弹窗
function openDialogIndexAlarm(url, _id, _title, _width, _height, _boolMax, _boolLock, _boolFixed, _boolLoading, _boolResize, callBack) {
    if (_boolLoading) {
        Loading(true);
    }
    try {
        $.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: _boolMax,
            left: '100%',
            top: '100%',
            lock: _boolLock,
            title: _title,
            resize: _boolResize,
            fixed: _boolFixed,
            drag: true,
            extendDrag: true,
            content: 'url:' + RootPath() + url,
            button: [
        {
            name: '确定',
            callback: function () {
                callBack(_id);
                return false;
            },
            focus: false
        },
        {
            name: '停止播报',
            callback: function () {
                $("#audio-container").html("");
                return false;
            }
        },
        {
            name: '关闭',
            focus: false
        }
    ]
        });
    } catch (e) {
        top.$.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: _boolMax,
            left: '100%',
            top: '100%',
            lock: _boolLock,
            title: _title,
            resize: _boolResize,
            fixed: _boolFixed,
            drag: true,
            extendDrag: true,
            content: 'url:' + RootPath() + url,
            button: [
        {
            name: '确定',
            callback: function () {
                callBack(_id);
                return false;
            },
            focus: false
        },
        {
            name: '停止播报',
            callback: function () {
                callBack2(_id);
                return false;
            }
        },
        {
            name: '关闭',
            focus: false
        }
    ]
        });
    }
}
/*
最大化弹出对话框（带：确认按钮、取消按钮）
*/
function FullopenDialog(url, _id, _title, callBack) {
    Loading(true);
    try {
        $.dialog({
            id: _id,
            lock: true,
            title: _title,
            max: false,
            min: false,
            width: $(window).width() - 40,
            height: $('body').height() - 100,
            content: 'url:' + RootPath() + url,
            ok: function () {
                callBack(_id);
                return false;
            },
            cancel: true
        });
    } catch (e) {
        top.$.dialog({
            id: _id,
            lock: true,
            title: _title,
            max: false,
            min: false,
            width: $(window).width() - 40,
            height: $('body').height() - 100,
            content: 'url:' + RootPath() + url,
            ok: function () {
                callBack(_id);
                return false;
            },
            cancel: true
        });
    } 
}
/*
弹出对话框（没按钮）
*/
function Dialog(url, _id, _title, _width, _height) {
    Loading(true);
    try {
        $.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            lock: true,
            title: _title,
            content: 'url:' + RootPath() + url
        });
    } catch (ex) {
        top.$.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            lock: true,
            title: _title,
            content: 'url:' + RootPath() + url
        });
    }
}
function Dialog_NoLoading(url, _id, _title, _width, _height) {
    try {
        $.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            lock: true,
            title: _title,
            content: 'url:' + RootPath() + url
        });
    } catch (e) {
        top.$.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            lock: true,
            title: _title,
            content: 'url:' + RootPath() + url
        });
    } 
}
/*
弹出对话框（含确定按钮）
*/
function Dialog_WidthSure(url, _id, _title, _width, _height) {
    Loading(true);
    try {
        $.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            lock: true,
            title: _title,
            cancelVal: '关闭',
            cancel: true,
            content: 'url:' + RootPath() + url
        });
    } catch (e) {
        top.$.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            lock: true,
            title: _title,
            cancelVal: '关闭',
            cancel: true,
            content: 'url:' + RootPath() + url
        });
    } 
}

/*function Dialog_NoLoading(url, _id, _title, _width, _height) {
    $.dialog({
        id: _id,
        width: _width,
        height: _height,
        max: false,
        lock: true,
        title: _title,
        content: 'url:' + RootPath() + url


    });
}*/
/*
最大化弹出对话框（没按钮）
*/
function FullDialog(url, _id, _title) {
    Loading(true);
    try {
        $.dialog({
            id: _id,
            lock: true,
            title: _title,
            max: false,
            min: false,
            width: $(window).width() - 40,
            height: $('body').height() - 100,
            content: 'url:' + RootPath() + url
        });
    } catch (e) {
        top.$.dialog({
            id: _id,
            lock: true,
            title: _title,
            max: false,
            min: false,
            width: $(window).width() - 40,
            height: $('body').height() - 100,
            content: 'url:' + RootPath() + url
        });
    } 
}
/*
弹出查询
*/
function QueryDialog(url, _id, _title, _width, _height, _callBack) {
    Loading(true);
    try {
        $.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            lock: true,
            title: _title,
            content: 'url:' + RootPath() + url,
            button: [
            {
                name: '查 询',
                callback: function () {
                    _callBack(_id);
                    return false;
                }
            },
            {
                name: '取 消'
            }
        ]
        });
    } catch (e) {
        top.$.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            lock: true,
            title: _title,
            content: 'url:' + RootPath() + url,
            button: [
            {
                name: '查 询',
                callback: function () {
                    _callBack(_id);
                    return false;
                }
            },
            {
                name: '取 消'
            }
        ]
        });
    } 
}
/*
弹出对话框
*/
function MessageDialog(_html, _id, _title, _width, _height, _callBack) {
    try {
        $.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            min: false,
            title: _title,
            content: _html,
            ok: function () {
                var data = eval("(" + GetParameterJson(_id) + ")"); ;
                _callBack(data);
                return false;
            },
            cancel: true
        });
    } catch (e) {
        top.$.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            min: false,
            title: _title,
            content: _html,
            ok: function () {
                var data = eval("(" + GetParameterJson(_id) + ")"); ;
                _callBack(data);
                return false;
            },
            cancel: true
        });
    } 
}
/*
弹出打印网页
*/
function PrintDialog(url, _id, _title, _width, _height, _callBack) {
    Loading(true);
    try {
        $.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            lock: true,
            title: _title,
            content: 'url:' + RootPath() + url,
            button: [
            {
                name: '打 印',
                callback: function () {
                    _callBack(_id);
                    return false;
                }
            },
            {
                name: '取 消'
            }
        ]
        });
    } catch (e) {
        top.$.dialog({
            id: _id,
            width: _width,
            height: _height,
            max: false,
            lock: true,
            title: _title,
            content: 'url:' + RootPath() + url,
            button: [
            {
                name: '打 印',
                callback: function () {
                    _callBack(_id);
                    return false;
                }
            },
            {
                name: '取 消'
            }
        ]
        });
    } 
}

/*打开网页 window.open
/*url:          表示请求路径
/*windowname:   定义页名称
/*width:        宽度
/*height:       高度
---------------------------------------------------*/
function OpenWindow(url, title, w, h) {
    var width = w;
    var height = h;
    var left = ($(window).width() - width) / 2;
    var top = ($(window).height() - height) / 2;
    window.open(RootPath() + url, title, 'height=' + height + ', width=' + width + ', top=' + top + ', left=' + left + ', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no, titlebar=yes, alwaysRaised=yes');
}

function OpenWindow_width_resizable(url, title, w, h) {
    var width = w;
    var height = h;
    var left = ($(window).width() - width) / 2;
    var top = ($(window).height() - height) / 2;
    window.open(RootPath() + url, title, 'height=' + height + ', width=' + width + ', top=' + top + ', left=' + left + ', toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no, titlebar=yes, alwaysRaised=yes');
}

/**
短暂提示
msg: 显示消息
time：停留时间
type：类型 >=1：成功，-1 ,0：失败，其他：警告
**/
function tipDialog(msgSource, time, type) {
    var msg = "<div class='ui_alert_tip'>" + msgSource + "</div>";
    if (type >= 1) {
        try {
            $.dialog.tips(msg, time, 'succ.png');
        } catch (e) {
            top.$.dialog.tips(msg, time, 'succ.png');
        } 
    } else if (type == -1) {
        try {
            $.dialog.tips(msg, time, 'fail.png');
        } catch (e) {
            top.$.dialog.tips(msg, time, 'fail.png');
        } 
    } else if (type == 0) {
        try {
            $.dialog.tips(msg, time, 'fail.png');
        } catch (e) {
            top.$.dialog.tips(msg, time, 'fail.png');
        } 
    } else {
        try {
            $.dialog.tips(msg, time, 'i.png');
        } catch (e) {
            top.$.dialog.tips(msg, time, 'i.png');
        } 
    }
}
/*
警告消息
msg: 显示消息
type：类型 >1：成功，<1：失败，其他：警告
*/
function alertDialog(msgSource, type) {
    var msg = "<div class='ui_alert'>" + msgSource + "</div>";
    var icon = "";
    if (type >= 1) {
        icon = "succ.png";
    } else if (type == -1) {
        icon = "fail.png";
    } else {
        icon = "i.png";
    }
    try {
        top.$.dialog({
            id: "alertDialog",
            icon: icon,
            content: msg,
            title: "系统提示",
            ok: function () {
                return true;
            }
        });
    }
    catch (ex) {
        try {
            $.dialog({
                id: "alertDialog",
                icon: icon,
                content: msg,
                title: "系统提示",
                ok: function () {
                    return true;
                }
            });
        }
        catch (ex) {
        }
    }
    
}
/*
确认对话框
*/
function confirmDialog(_title, msg, callBack) {
    var msg = "<div class='ui_alert'>" + msg + "</div>";
    try {
        top.$.dialog({
            id: "confirmDialog",
            lock: true,
            icon: "hits.png",
            content: msg,
            title: _title,
            ok: function() {
                callBack(true);
                return true;
            },
            cancel: function() {
                callBack(false);
                return true;
            }
        });
    } catch (e) {
        $.dialog({
            id: "confirmDialog",
            lock: true,
            icon: "hits.png",
            content: msg,
            title: _title,
            ok: function() {
                callBack(true);
                return true;
            },
            cancel: function() {
                callBack(false);
                return true;
            }
        });
    }
}

function confirmDialogTop(_title, msg, callBack) {
    var msg = "<div class='ui_alert'>" + msg + "</div>";
    top.$.dialog({
        id: "confirmDialog",
        lock: true,
        icon: "hits.png",
        content: msg,
        title: _title,
        ok: function () {
            callBack(true);
            return true;
        },
        cancel: function () {
            callBack(false);
            return true;
        }
    });
}
/*弹出对话框end========================================*/
/***
 * 自动关闭弹出内容提示
timeOut : 4000,				//提示层显示的时间
msg : "恭喜你!你已成功操作此插件，谢谢使用！",			//显示的消息
type : "success"//提示类型（1、success 2、error 3、warning）
***/
function TipMsg(msg, timeOut, type) {
    $(".tip_container").remove();
    var bid = parseInt(Math.random() * 100000);
    $("body").prepend('<div id="tip_container' + bid + '" class="container tip_container"><div id="tip' + bid + '" class="mtip"><span id="tsc' + bid + '"></span></div></div>');
    var $this = $(this);
    var $tip_container = $("#tip_container" + bid);
    var $tip = $("#tip" + bid);
    var $tipSpan = $("#tsc" + bid);
    //先清楚定时器
    clearTimeout(window.timer);
    //主体元素绑定事件
    $tip.attr("class", type).addClass("mtip");
    $tipSpan.html(msg);
    $tip_container.slideDown(300);
    //提示层隐藏定时器
    window.timer = setTimeout(function () {
        $tip_container.slideUp(300);
        $(".tip_container").remove();
    }, timeOut);
    //鼠标移到提示层时清除定时器
    $tip_container.live("mouseover", function () {
        clearTimeout(window.timer);
    });
    //鼠标移出提示层时启动定时器
    $tip_container.live("mouseout", function () {
        window.timer = setTimeout(function () {
            $tip_container.slideUp(300);
            $(".tip_container").remove();
        }, timeOut);
    });
    $("#tip_container" + bid).css("left", ($(window).width() - $("#tip_container" + bid).width()) / 2);
}


/*
验证是否为空
*/
function IsNullOrEmpty(str) {
    var isOK = true;
    if (str == undefined || str == "" || str == 'null' || str == null) {
        isOK = false;
    }
    return isOK;
}
function IsDelData(id) {
    var isOK = true;
    if (id == undefined || id == "" || id == 'null' || id == 'undefined') {
        isOK = false;
        tipDialog('您没有选中任何项,请您选中后再操作。', 4, 'warning');
    }
    return isOK;
}
function IsChecked(id) {
    var isOK = true;
    if (id == undefined || id == "" || id == 'null' || id == 'undefined') {
        isOK = false;
        tipDialog('您没有选中任何项,请您选中后再操作。', 4, 'warning');
    } else if (id.split(",").length > 1) {
        isOK = false;
        tipDialog('很抱歉,一次只能选择一条记录。', 4, 'warning');
    }
    return isOK;
}
function IsChecked_Mulit_TaskEmployee(id) {
    var isOK = true;
    if (id == undefined || id == "" || id == 'null' || id == 'undefined') {
        isOK = false;
        tipDialog('请选择接单人员！', 4, 'warning');
    }
    return isOK;
}
/*鼠标右击菜单begin========================================*/
var getOffset = {
    top: function (obj) {
        return obj.offsetTop + (obj.offsetParent ? arguments.callee(obj.offsetParent) : 0)
    },
    left: function (obj) {
        return obj.offsetLeft + (obj.offsetParent ? arguments.callee(obj.offsetParent) : 0)
    }
};
function LoadrightMenu(element) {
    var oMenu = $('.rightMenu');
    $(document).click(function () {
        oMenu.hide();
    });
    $(document).mousedown(function (e) {
        if (3 == e.which) {
            oMenu.hide();
        }
    })
    var aUl = oMenu.find("ul");
    var aLi = oMenu.find("li");
    var showTimer = hideTimer = null;
    var i = 0;
    var maxWidth = maxHeight = 0;
    var aDoc = [document.documentElement.offsetWidth, document.documentElement.offsetHeight];
    oMenu.hide();
    for (i = 0; i < aLi.length; i++) {
        //为含有子菜单的li加上箭头
        aLi[i].getElementsByTagName("ul")[0] && (aLi[i].className = "sub");
        //鼠标移入
        aLi[i].onmouseover = function () {
            var oThis = this;
            var oUl = oThis.getElementsByTagName("ul");
            //鼠标移入样式
            oThis.className += " active";
            //显示子菜单
            if (oUl[0]) {
                clearTimeout(hideTimer);
                showTimer = setTimeout(function () {
                    for (i = 0; i < oThis.parentNode.children.length; i++) {
                        oThis.parentNode.children[i].getElementsByTagName("ul")[0] &&
						(oThis.parentNode.children[i].getElementsByTagName("ul")[0].style.display = "none");
                    }
                    oUl[0].style.display = "block";
                    oUl[0].style.top = oThis.offsetTop + "px";
                    oUl[0].style.left = oThis.offsetWidth + "px";

                    //最大显示范围					
                    maxWidth = aDoc[0] - oUl[0].offsetWidth;
                    maxHeight = aDoc[1] - oUl[0].offsetHeight;

                    //防止溢出
                    maxWidth < getOffset.left(oUl[0]) && (oUl[0].style.left = -oUl[0].clientWidth + "px");
                    maxHeight < getOffset.top(oUl[0]) && (oUl[0].style.top = -oUl[0].clientHeight + oThis.offsetTop + oThis.clientHeight + "px")
                }, 300);
            }
        };
        //鼠标移出	
        aLi[i].onmouseout = function () {
            var oThis = this;
            var oUl = oThis.getElementsByTagName("ul");
            //鼠标移出样式
            oThis.className = oThis.className.replace(/\s?active/, "");

            clearTimeout(showTimer);
            hideTimer = setTimeout(function () {
                for (i = 0; i < oThis.parentNode.children.length; i++) {
                    oThis.parentNode.children[i].getElementsByTagName("ul")[0] &&
					(oThis.parentNode.children[i].getElementsByTagName("ul")[0].style.display = "none");
                }
            }, 300);
        };
    }
    //自定义右键菜单
    $(element).bind("contextmenu", function () {
        var event = event || window.event;
        oMenu.show();
        oMenu.css('top', event.clientY + "px");
        oMenu.css('left', event.clientX + "px");
        //最大显示范围
        maxWidth = aDoc[0] - oMenu.width();
        maxHeight = aDoc[1] - oMenu.height();
        //防止菜单溢出
        if (oMenu.offset().top > maxHeight) {
            oMenu.css('top', maxHeight + "px");
        }
        if (oMenu.offset().left > maxWidth) {
            oMenu.css('left', maxWidth + "px");
        }
        return false;
    }).bind("click", function () {
        oMenu.hide();
    });
}
/*鼠标右击菜单end========================================*/

//自动补全表格
var IndetableRow_autocomplete = 0;
var scrollTopheight = 0;
function autocomplete(Objkey, width, height, data, callBack) {
    if ($('#' + Objkey).attr('readonly') == 'readonly') {
        return false;
    }
    if ($('#' + Objkey).attr('disabled') == 'disabled') {
        return false;
    }
    IndetableRow_autocomplete = 0;
    scrollTopheight = 0;
    var X = $("#" + Objkey).offset().top;
    var Y = $("#" + Objkey).offset().left;
    $("#div_gridshow").html("");
    if ($("#div_gridshow").attr("id") == undefined) {
        $('body').append('<div id="div_gridshow" style="overflow: auto;z-index: 1000;border: 1px solid #A8A8A8;width:' + width + ';height:' + height + ';position: absolute; background-color: #fff; display: none;"></div>');
    } else {
        $("#div_gridshow").height(height);
        $("#div_gridshow").width(width);
    }
    var sbhtml = '<table class="grid" style="width: 100%;">';
    if (data != "") {
        sbhtml += '<tbody>' + data + '</tbody>';
    } else {
        sbhtml += '<tbody><tr><td style="color:red;text-align:center;width:' + width + ';">没有找到您要的相关数据！</td></tr></tbody>';
    }
    sbhtml += '</table>';
    $("#div_gridshow").html(sbhtml);
    $("#div_gridshow").css("left", Y).css("top", X + $('#' + Objkey).height()).show();
    $("#div_gridshow .grid td").css("border-left", "none").css("padding-left", "2px");
    if (data != "") {
        $("#div_gridshow").find('tbody tr').each(function (r) {
            if (r == 0) {
                $(this).addClass('selected');
            }
        });
    }
    $("#div_gridshow").find('tbody tr').click(function () {
        var parameter = "";
        $(this).find('td').each(function (i) {
            parameter += '"' + $(this).attr('id') + '"' + ':' + '"' + $.trim($(this).text()) + '",'
        });
        if ($('#' + Objkey).attr('readonly') == 'readonly') {
            return false;
        }
        if ($('#' + Objkey).attr('disabled') == 'disabled') {
            return false;
        }
        callBack(JSON.parse('{' + parameter.substr(0, parameter.length - 1) + '}'));
        $("#div_gridshow").hide();
    });
    $("#div_gridshow").find('tbody tr').hover(function () {
        $(this).addClass("selected");
    }, function () {
        $(this).removeClass("selected");
    });
    //任意键关闭
    document.onclick = function (eSource) {
        var e = eSource ? eSource : window.event;
        var tar = e.srcElement || e.target;
        if (tar.id != 'div_gridshow') {
            if ($(tar).attr("id") == 'div_gridshow' || $(tar).attr("id") == Objkey) {
                $("#div_gridshow").show();
            } else {
                $("#div_gridshow").hide();
            }
        }
    }
}
//方向键上,方向键下,回车键
function autocompletekeydown(Objkey, callBack) {
    $("#" + Objkey)
        .keydown(function(e) {
            switch (e.keyCode) {
            case 38: // 方向键上
                if (IndetableRow_autocomplete > 0) {
                    IndetableRow_autocomplete--
                    $("#div_gridshow").find('tbody tr').removeClass('selected');
                    $("#div_gridshow")
                        .find('tbody tr')
                        .each(function(r) {
                            if (r == IndetableRow_autocomplete) {
                                scrollTopheight -= 22;
                                $("#div_gridshow").scrollTop(scrollTopheight);
                                $(this).addClass('selected');
                            }
                        });
                }
                break;
            case 40: // 方向键下
                var tindex = $("#div_gridshow").find('tbody tr').length - 1;
                if (IndetableRow_autocomplete < tindex) {
                    IndetableRow_autocomplete++;
                    $("#div_gridshow").find('tbody tr').removeClass('selected');
                    $("#div_gridshow")
                        .find('tbody tr')
                        .each(function(r) {
                            if (r == IndetableRow_autocomplete) {
                                scrollTopheight += 22;
                                $("#div_gridshow").scrollTop(scrollTopheight);
                                $(this).addClass('selected');
                            }
                        });
                }
                break;
            case 13: //回车键
                var parameter = "";
                $("#div_gridshow")
                    .find('tbody tr')
                    .each(function(r) {
                        if (r == IndetableRow_autocomplete) {
                            $(this)
                                .find('td')
                                .each(function(i) {
                                    parameter += '"' +
                                        $(this).attr('id') +
                                        '"' +
                                        ':' +
                                        '"' +
                                        $.trim($(this).text()) +
                                        '",'
                                });
                        }
                    });
                if ($('#' + Objkey).attr('readonly') == 'readonly') {
                    return false;
                }
                if ($('#' + Objkey).attr('disabled') == 'disabled') {
                    return false;
                }
                callBack(JSON.parse('{' + parameter.substr(0, parameter.length - 1) + '}'));
                $("#div_gridshow").hide();
                break;
            default:
                break;
            }
        });
}
/**
树下拉框
Objkey:          ID
width：          宽度
height：         高度
data：           数据
**/
function comboBoxTree(Objkey, height) {
    $(".ui_state_highlight").focus();
    var width = $("#" + Objkey).width();
    $("#" + Objkey).css('ime-mode', 'disabled');
    $("#" + Objkey).bind("contextmenu", function () { return false; });
    $("#" + Objkey).keypress(function (e) { return false; });
    if ($('#' + Objkey).attr('readonly') == 'readonly') { return false; }
    if ($('#' + Objkey).attr('disabled') == 'disabled') { return false; }
    var X = $("#" + Objkey).offset().top - 1;
    var Y = $("#" + Objkey).offset().left - 1;
    var comboBoxTree = "comboBoxTree" + Objkey;
    if ($("#" + comboBoxTree).attr("id") == undefined) {
        $('body').append('<div id="' + comboBoxTree + '" style="overflow: auto;border: 1px solid #ccc;border-top:none;width:' + width + 'px;height:' + height + ';position: absolute; background-color: #fff; display: none;"></div>');
    }
    $("#" + comboBoxTree).css("left", Y).css("top", X + $("#" + Objkey).height() + 2).css("z-index", "99").slideDown(100);
    //任意键关闭
    document.onclick = function (eSource) {
        var e = eSource ? eSource : window.event;
        var tar = e.srcElement || e.target;
        if (tar.id != '' + comboBoxTree + '') {
            if ($(tar).hasClass("bbit-tree-ec-icon")) {
                return false;
            }
            if ($(tar).attr("id") == Objkey) {
                return false;
            } else {
                $("#" + comboBoxTree).slideUp(100);
            }
        }
    }
}
/*删除数据
/*url:        表示请求路径
/*parm：      条件参数
--------------------------------------------------*/
function delConfirm(url, parm, msg) {
    confirmDialog("系统提示", msg, function (r) {
        if (r) {
            Loading(true, "正在删除数据...");
            window.setTimeout(function () {
                AjaxJson(url, parm, function (data) {
                    tipDialog(data.Message, 3, data.Code);
                    if (data.Code > 0) {
                        windowload();
                    }
                });
            }, 200);
        }
    });
}
function delConfig(url, parm, count) {
    if (count == undefined) {
        count = 1;
    }
    confirmDialog("系统提示", "注：您确定要删除 " + count + " 笔记录？", function (r) {
        if (r) {
            Loading(true, "正在删除数据...");
            window.setTimeout(function () {
                AjaxJson(url, parm, function (data) {
                    tipDialog(data.Message, 3, data.Code);
                    if (data.Code > 0) {
                        windowload();
                    }
                });
            }, 200);
        }
    });
}
/*绑定数据字典下拉框
ControlId:控件ID
Code:分类编码
Memo:默认显示
*/
function BindDropItem(ControlId, Code, Memo) {
    $(ControlId).html("");
    if (IsNullOrEmpty(Memo)) {
        $(ControlId).append("<option value=''>" + Memo + "</option>");
    }
    getAjax('/CommonModule/DataDictionary/BinDingItemsJson', { Code: Code }, function (data) {
        var itemjson = eval("(" + data + ")");
        $.each(itemjson, function (i) {
            $(ControlId).append($("<option></option>").val(itemjson[i].Code).html(itemjson[i].FullName));
        });
        Loading(false);
    });
}
/*绑定下拉框
ControlId:控件ID
Memo:默认显示
*/
function JsonBindDrop(ControlId, Memo, DataJsonSource) {
    $(ControlId).html("");
    if (IsNullOrEmpty(Memo)) {
        $(ControlId).append("<option value=''>" + Memo + "</option>");
    }
    var DataJson = eval("(" + DataJsonSource + ")");
    $.each(DataJson, function (i) {
        $(ControlId).append($("<option></option>").val(DataJson[i].Code).html(DataJson[i].FullName));
    });
}
/*
验证对象值不能重复 
id:字段ID、
tablename：表名、
keyfield：主键Id、
Msg：提示消息
*/
function FieldExist(id, tablename, keyfield, Msg) {
    var $ObjFiel = $("#" + id);
    var postData = {
        tablename: tablename,
        fieldname: id,
        fieldvalue: $ObjFiel.val(),
        keyfield: GetQuery('KeyValue'),
        keyvalue: keyfield
    }
    getAjax('/Utility/FieldExist', postData, function (data) {
        if (data.toLocaleLowerCase() == 'false') {
            tipCss("#" + id, Msg + "已存在,请重新输入");
        }
        Loading(false);
    });
}
/*公共导出Excel，将表格数据取出来。在导出Excel
obj:表格对象ID
fileName：导出Excel文件名
*/
function SetDeriveExcel(obj, fileName) {
    var columnModel = $(obj).jqGrid('getGridParam', 'colModel');
    var dataModel = $(obj).jqGrid("getRowData");
    var footerData = $(obj).jqGrid("footerData");
    var JsonData = {
        JsonColumn: JSON.stringify(columnModel),
        JsonData: JSON.stringify(dataModel),
        JsonFooter: JSON.stringify(footerData),
        FileName: fileName
    }
    getAjax("/Utility/SetDeriveExcel", JsonData, function(data) {});
}
/*
表格视图列名
*/
function columnModelData(jgrid) {
    AjaxJson("/Utility/LoadViewColumn", {}, function (data) {
        $.each(data, function (i) {
            $(jgrid).hideCol(data[i].FieldName);
        });
    });
}
//加载权限按钮
function PartialButton() {
    var JsonData = "";
    var toolbar_html = "";
    var toolbar_Children_Count = 0;
    AjaxJson("/Utility/LoadButton", {}, function (Data) {
        JsonData = Data;
        $.each(Data, function (i) {
            if (Data[i].ParentId == '0' && Data[i].Category == '1') {
                var toolbar_Children_List = Toolbar_Children(Data[i].ButtonId, Data)
                if (toolbar_Children_Count > 0) {
                    toolbar_html += "<a id=\"" + Data[i].Code + "\" ids=\"" + Data[i].ButtonId + "\" class=\"tools_btn dropdown\">";
                    toolbar_html += "<div style=\"float: left;\"><div class=\"icon\"><img src=\"../../Content/Images/Icon16/" + Data[i].Icon + "\" /></div><div class=\"text\">" + Data[i].FullName + "</div></div>";
                    toolbar_html += "<div class=\"dropdown-icon\"><img src=\"../../Content/Images/dropdown-icon.png\" /></div>";
                    toolbar_html += "<div class=\"dropdown-data\"><i></i><span></span>";
                    toolbar_html += "    <ul>";
                    toolbar_html += toolbar_Children_List;
                    toolbar_html += "    </ul>";
                    toolbar_html += "</div>";
                    toolbar_html += "</a>";
                } else {
                    var title = "title=\"" + Data[i].Remark + "\"";
                    if (Data[i].Remark == "") { title = ""; }
                    toolbar_html += "<a id=\"" + Data[i].Code + "\" ids=\"" + Data[i].ButtonId + "\" " + title + " onclick=\"" + Data[i].JsEvent + "\" class=\"tools_btn\"><span><b style=\"background: url('../../Content/Images/Icon16/" + Data[i].Icon + "') 50% 4px no-repeat;\">" + Data[i].FullName + "</b></span></a>";
                }
                if (Data[i].Split == '1') {
                    toolbar_html += "<div class=\"tools_separator\"></div>";
                }
            }
        });
    });
    $('.tools_bar .PartialButton').html(toolbar_html);
    function Toolbar_Children(ButtonId, Data) {
        var _toolbar_Children = "";
        toolbar_Children_Count = 0;
        $.each(Data, function (i) {
            if (Data[i].ParentId == ButtonId) {
                var title = "title=\"" + Data[i].Remark + "\"";
                if (Data[i].Remark == "") { title = ""; }
                _toolbar_Children += "<li id=\"" + Data[i].Code + "\" ids=\"" + Data[i].ButtonId + "\" " + title + " onclick=\"" + Data[i].JsEvent + "\"><img src=\"../../Content/Images/Icon16/" + Data[i].Icon + "\" />" + Data[i].FullName + "</li>";
                toolbar_Children_Count++;
            }
        });
        return _toolbar_Children;
    }
    $(".tools_btn").hover(function () {
        $(this).addClass("tools_btn_hover");
    }, function () {
        $(this).removeClass("tools_btn_hover");
    });
    $(".tools_bar .dropdown").hover(function () {
        var left = $(this).offset().left - ($(this).find('.dropdown-data').width() / 2) + ($(this).width() / 2 + 9);
        $(this).find('.dropdown-data').show().css('top', ($(this).offset().top + 50)).css('left', left);
        $(this).find('.dropdown-icon').addClass('dropdown-icon-hover');
        $(this).addClass('dropdown-selected');
    }, function () {
        if (!$(this).hasClass("_click")) {
            $(this).removeClass('dropdown-selected');
            $(this).find('.dropdown-data').hide();
            $(this).find('.dropdown-icon').removeClass('dropdown-icon-hover');
        }
    });
    $('.tools_bar .dropdown').toggle(function () {
        $(this).addClass('_click');
        var left = $(this).offset().left - ($(this).find('.dropdown-data').width() / 2) + ($(this).width() / 2 + 9);
        $(this).find('.dropdown-data').show().css('top', ($(this).offset().top + 50)).css('left', left);
        $(this).find('.dropdown-icon').addClass('dropdown-icon-hover');
        $(this).addClass('dropdown-selected');
    }, function () {
        $(this).removeClass('dropdown-selected');
        $(this).find('.dropdown-data').hide();
        $(this).find('.dropdown-icon').removeClass('dropdown-icon-hover');
        $('.dropdown').removeClass('_click');
    });
    $(".dropdown-data li").click(function () {
        $('.dropdown').removeClass('dropdown-selected');
        $('.dropdown').find('.dropdown-data').hide();
        $('.dropdown').find('.dropdown-icon').removeClass('dropdown-icon-hover');
        $('.dropdown').removeClass('_click');
    });
    //右击菜单
    var right_toolbar_Count = 0;
    var right_toolbar_html = "";
    right_toolbar_html += '<div class="rightMenu"><ul>';
    $.each(JsonData, function (i) {
        if (JsonData[i].ParentId == '0' && JsonData[i].Category == '2') {
            var title = "title=\"" + JsonData[i].Remark + "\"";
            if (JsonData[i].Remark == "") { title = ""; }
            var righttoolbar_Children_List = right_toolbar_Children(JsonData[i].ButtonId, JsonData)
            if (right_toolbar_Count > 0) {
                right_toolbar_html += "<li id=\"right_" + JsonData[i].Code + "\" ids=\"" + JsonData[i].ButtonId + "\" " + title + " onclick=\"" + JsonData[i].JsEvent + "\" ><img src=\"../../Content/Images/Icon16/" + JsonData[i].Icon + "\" />" + JsonData[i].FullName + righttoolbar_Children_List + "</li>";
            } else {
                right_toolbar_html += "<li id=\"right_" + JsonData[i].Code + "\"  ids=\"" + JsonData[i].ButtonId + "\" " + title + " onclick=\"" + JsonData[i].JsEvent + "\" ><img src=\"../../Content/Images/Icon16/" + JsonData[i].Icon + "\" />" + JsonData[i].FullName + "</li>";
            }
            if (JsonData[i].Split == '1') {
                right_toolbar_html += "<div class=\"m-split\"></div>";
            }
        }
    });
    right_toolbar_html += '</ul></div>';
    function right_toolbar_Children(ButtonId, JsonData) {
        var _right_toolbar = "<ul>";
        right_toolbar_Count = 0;
        $.each(JsonData, function (i) {
            if (JsonData[i].ParentId == ButtonId) {
                var title = "title=\"" + JsonData[i].Remark + "\"";
                if (JsonData[i].Remark == "") { title = ""; }
                _right_toolbar += "<li id=\"right_" + JsonData[i].Code + "\"  ids=\"" + JsonData[i].ButtonId + "\" " + title + " onclick=\"" + JsonData[i].JsEvent + "\" ><img src=\"../../Content/Images/Icon16/" + JsonData[i].Icon + "\" />" + JsonData[i].FullName + "</li>";
                if (JsonData[i].Split == '1') {
                    _right_toolbar += "<div class=\"m-split\"></div>";
                }
                right_toolbar_Count++;
            }
        });
        return _right_toolbar + "</ul>";
    }
    $("body").append(right_toolbar_html);
    if ($('.rightMenu').find('li').length > 0) {
        LoadrightMenu("#grid_List");
    } else {
        $('.rightMenu').remove();
    }
}

//加载按钮
function PartialButton2(Data) {
    var JsonData = "";
    var toolbar_html = "";
    var toolbar_Children_Count = 0;
    JsonData = Data;
    $.each(Data, function (i) {
        if (Data[i].ParentId == '0' && Data[i].Category == '1') {
            var toolbar_Children_List = Toolbar_Children(Data[i].ButtonId, Data)
            if (toolbar_Children_Count > 0) {
                toolbar_html += "<a id=\"" + Data[i].Code + "\" ids=\"" + Data[i].ButtonId + "\" class=\"tools_btn dropdown\">";
                toolbar_html += "<div style=\"float: left;\"><div class=\"icon\"><img src=\"../../Content/Images/Icon16/" + Data[i].Icon + "\" /></div><div class=\"text\">" + Data[i].FullName + "</div></div>";
                toolbar_html += "<div class=\"dropdown-icon\"><img src=\"../../Content/Images/dropdown-icon.png\" /></div>";
                toolbar_html += "<div class=\"dropdown-data\"><i></i><span></span>";
                toolbar_html += "    <ul>";
                toolbar_html += toolbar_Children_List;
                toolbar_html += "    </ul>";
                toolbar_html += "</div>";
                toolbar_html += "</a>";
            } else {
                var title = "title=\"" + Data[i].Remark + "\"";
                if (Data[i].Remark == "") { title = ""; }
                toolbar_html += "<a id=\"" + Data[i].Code + "\" ids=\"" + Data[i].ButtonId + "\" " + title + " onclick=\"" + Data[i].JsEvent + "\" class=\"tools_btn\"><span><b style=\"background: url('../../Content/Images/Icon16/" + Data[i].Icon + "') 50% 4px no-repeat;\">" + Data[i].FullName + "</b></span></a>";
            }
            if (Data[i].Split == '1') {
                toolbar_html += "<div class=\"tools_separator\"></div>";
            }
        }
    });
    $('.tools_bar .PartialButton').html(toolbar_html);
    function Toolbar_Children(ButtonId, Data) {
        var _toolbar_Children = "";
        toolbar_Children_Count = 0;
        $.each(Data, function (i) {
            if (Data[i].ParentId == ButtonId) {
                var title = "title=\"" + Data[i].Remark + "\"";
                if (Data[i].Remark == "") { title = ""; }
                _toolbar_Children += "<li id=\"" + Data[i].Code + "\" ids=\"" + Data[i].ButtonId + "\" " + title + " onclick=\"" + Data[i].JsEvent + "\"><img src=\"../../Content/Images/Icon16/" + Data[i].Icon + "\" />" + Data[i].FullName + "</li>";
                toolbar_Children_Count++;
            }
        });
        return _toolbar_Children;
    }
    $(".tools_btn").hover(function () {
        $(this).addClass("tools_btn_hover");
    }, function () {
        $(this).removeClass("tools_btn_hover");
    });
    $(".tools_bar .dropdown").hover(function () {
        var left = $(this).offset().left - ($(this).find('.dropdown-data').width() / 2) + ($(this).width() / 2 + 9);
        $(this).find('.dropdown-data').show().css('top', ($(this).offset().top + 50)).css('left', left);
        $(this).find('.dropdown-icon').addClass('dropdown-icon-hover');
        $(this).addClass('dropdown-selected');
    }, function () {
        if (!$(this).hasClass("_click")) {
            $(this).removeClass('dropdown-selected');
            $(this).find('.dropdown-data').hide();
            $(this).find('.dropdown-icon').removeClass('dropdown-icon-hover');
        }
    });
    $('.tools_bar .dropdown').toggle(function () {
        $(this).addClass('_click');
        var left = $(this).offset().left - ($(this).find('.dropdown-data').width() / 2) + ($(this).width() / 2 + 9);
        $(this).find('.dropdown-data').show().css('top', ($(this).offset().top + 50)).css('left', left);
        $(this).find('.dropdown-icon').addClass('dropdown-icon-hover');
        $(this).addClass('dropdown-selected');
    }, function () {
        $(this).removeClass('dropdown-selected');
        $(this).find('.dropdown-data').hide();
        $(this).find('.dropdown-icon').removeClass('dropdown-icon-hover');
        $('.dropdown').removeClass('_click');
    });
    $(".dropdown-data li").click(function () {
        $('.dropdown').removeClass('dropdown-selected');
        $('.dropdown').find('.dropdown-data').hide();
        $('.dropdown').find('.dropdown-icon').removeClass('dropdown-icon-hover');
        $('.dropdown').removeClass('_click');
    });
    //右击菜单
    var right_toolbar_Count = 0;
    var right_toolbar_html = "";
    right_toolbar_html += '<div class="rightMenu"><ul>';
    $.each(JsonData, function (i) {
        if (JsonData[i].ParentId == '0' && JsonData[i].Category == '2') {
            var title = "title=\"" + JsonData[i].Remark + "\"";
            if (JsonData[i].Remark == "") { title = ""; }
            var righttoolbar_Children_List = right_toolbar_Children(JsonData[i].ButtonId, JsonData)
            if (right_toolbar_Count > 0) {
                right_toolbar_html += "<li id=\"right_" + JsonData[i].Code + "\" ids=\"" + JsonData[i].ButtonId + "\" " + title + " onclick=\"" + JsonData[i].JsEvent + "\" ><img src=\"../../Content/Images/Icon16/" + JsonData[i].Icon + "\" />" + JsonData[i].FullName + righttoolbar_Children_List + "</li>";
            } else {
                right_toolbar_html += "<li id=\"right_" + JsonData[i].Code + "\"  ids=\"" + JsonData[i].ButtonId + "\" " + title + " onclick=\"" + JsonData[i].JsEvent + "\" ><img src=\"../../Content/Images/Icon16/" + JsonData[i].Icon + "\" />" + JsonData[i].FullName + "</li>";
            }
            if (JsonData[i].Split == '1') {
                right_toolbar_html += "<div class=\"m-split\"></div>";
            }
        }
    });
    right_toolbar_html += '</ul></div>';
    function right_toolbar_Children(ButtonId, JsonData) {
        var _right_toolbar = "<ul>";
        right_toolbar_Count = 0;
        $.each(JsonData, function (i) {
            if (JsonData[i].ParentId == ButtonId) {
                var title = "title=\"" + JsonData[i].Remark + "\"";
                if (JsonData[i].Remark == "") { title = ""; }
                _right_toolbar += "<li id=\"right_" + JsonData[i].Code + "\"  ids=\"" + JsonData[i].ButtonId + "\" " + title + " onclick=\"" + JsonData[i].JsEvent + "\" ><img src=\"../../Content/Images/Icon16/" + JsonData[i].Icon + "\" />" + JsonData[i].FullName + "</li>";
                if (JsonData[i].Split == '1') {
                    _right_toolbar += "<div class=\"m-split\"></div>";
                }
                right_toolbar_Count++;
            }
        });
        return _right_toolbar + "</ul>";
    }
    $("body").append(right_toolbar_html);
    if ($('.rightMenu').find('li').length > 0) {
        LoadrightMenu("#grid_List");
    } else {
        $('.rightMenu').remove();
    }
}
//=================动态菜单tab标签========================
function AddTabMenu(tabid, url, name, img, Isclose, IsReplace, IsVisitorModule) {
    $('#overlay_startmenu').hide(); 
    $('#start_menu_panel').hide();
    $('#start_menu_panel .nicescroll-rails').show();
    $('.nicescroll-rails').hide();

    if (url == "" || url == "#" || url == RootPath()) {
        url = RootPath() + "/Error/Error404/Index.html";

    }
    var tabs_container = $("#tabs_container");
    var ContentPannel = $("#ContentPannel");
    if (IsReplace == 'true' || IsReplace == true) {
        RemoveDiv(tabid);
    }
    if (document.getElementById("tabs_" + tabid) == null) { //如果当前tabid存在直接显示已经打开的tab
        Loading(true);
        if (!IsVisitorModule) {
            VisitorModule(tabid, name);
        }
        if (tabs_container.find('li').length >= 10) {
            Loading(false);
            alertDialog("为保证系统效率,只允许同时运行10个功能窗口,请关闭一些窗口后重试！", 0);
            return false;
        }
        tabs_container.find('li').removeClass('selected');
        ContentPannel.find('iframe').hide();
        if (Isclose != 'false') { //判断是否带关闭tab
            tabs_container.append("<li id=\"tabs_" + tabid + "\" class='selected' win_close='true'><span title='" + name + "' onclick=\"AddTabMenu('" + tabid + "','" + url + "','" + name + "','true')\"><a><img src='../Content/Images/Icon16/" + img + "' width='16' height='16'>" + name + "</a></span><a class=\"win_close\" title=\"关闭当前窗口\" onclick=\"RemoveDiv('" + tabid + "')\"></a></li>");
        } else {
            tabs_container.append("<li id=\"tabs_" + tabid + "\" class=\"selected\" onclick=\"AddTabMenu('" + tabid + "','" + url + "','" + name + "','false')\"><a><img src='../Content/Images/Icon16/" + img + "' width='16' height='16'>" + name + "</a></li>");
        }
        ContentPannel.append("<iframe id=\"tabs_iframe_" + tabid + "\" name=\"tabs_iframe_" + tabid + "\" height=\"100%\" width=\"100%\" src=\"" + url + "\" frameBorder=\"0\"></iframe>");
    } else {
        if (!IsVisitorModule) {
            VisitorModule(tabid, name);
        }
        tabs_container.find('li').removeClass('selected');
        ContentPannel.find('iframe').hide();
        tabs_container.find('#tabs_' + tabid).addClass('selected');
        document.getElementById("tabs_iframe_" + tabid).style.display = 'block';
    }
    $('iframe#' + tabiframeId()).load(function () {
        Loading(false);
    });
    LoadrightMenu(".tab-nav li");
    if (tabid == "Imain") {
        
    }

}
function VisitorModule(id) {
    
}
//关闭当前tab
function ThisCloseTab() {
    var tabs_container = $("#tabs_container");
    RemoveDiv(tabs_container.find('.selected').attr('id').substr(5));
}
//全部关闭tab
function AllcloseTab() {
    $(".tab-nav").find("[win_close=true]").each(function () {
        RemoveDiv($(this).attr('id').substr(5));
    });
}
function Refresh() {
    var currentIframeTableName = tabiframeId();
    frames[currentIframeTableName].window.location.reload();
    return false;
}
//关闭除当前之外的tab
function othercloseTab() {
    var tabs_container = $("#tabs_container");
    var id = tabs_container.find('.selected').attr('id').substr(5);
    $(".tab-nav").find("[win_close=true]").each(function () {
        if ($(this).attr('id').substr(5) != id) {
            RemoveDiv($(this).attr('id').substr(5));
        }
    });
}
//关闭事件
function RemoveDiv(obj) {
    try {
        Loading(false);
        var tabs_container = $("#tabs_container");
        var ContentPannel = $("#ContentPannel");
        var ModuleId = tabs_container.find('.selected').attr('id').substr(5); //原来ID
        var ModuleName = tabs_container.find('.selected').find('span').attr('title'); //原来名称
        SetLeave(ModuleId, ModuleName);
        tabs_container.find("#tabs_" + obj).remove();
        ContentPannel.find("#tabs_iframe_" + obj).remove();
        var tablist = tabs_container.find('li');
        var pannellist = ContentPannel.find('iframe');
        if (tablist.length > 0) {
            tablist[tablist.length - 1].className = 'selected';
            pannellist[tablist.length - 1].style.display = 'block';
            var id = tabs_container.find('.selected').attr('id').substr(5);
            VisitorModule(id);
        }
    }
    catch (ex) {
    }
}


//=================动态菜单tab标签========================
//js获取网站根路径(站点及虚拟目录)
function RootPath() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    //return (prePath + postPath);//如果发布IIS，有虚假目录用用这句
    return (prePath);
}

//写Cookie
function addCookie(objName, objValue, objHours) {
    try {
        var str = objName + "=" + escape(objValue);
        if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
            var date = new Date();
            var ms = objHours * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
        }
        document.cookie = str;
    } catch (ex) {
        //alert(ex);
    }
}

//读Cookie
function getCookie(objName) {//获取指定名称的cookie的值
    try {
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == objName) return unescape(temp[1]);
        }
    }
    catch (ex) {
        return "";
    }
    return "";
}

function GetSecondLevelMenu(objTargetId) {
    var userxh = GetCurrentFromUserXh("userXh");
    var parentId = GetQuery("ParentId");

    var postMenuData = {
        UserXh: userxh,
        ParentId: parentId
    };
    //GetSecondLevelMeunJson(string UserXh, string ParentId)
    getAjax_Json("/Webservice/MenuService.asmx/GetSecondLevelMeunJson", postMenuData, function (res) {
        try {
            if (IsNullOrEmpty(res)) {
                var json = eval(res);
                var strMenu = "";
                var currentMenu = "";
                var spanNoborder = "";
                var index = -1;
                var strFullPath = window.document.location.href.toLowerCase();
                var isExist = 0; //一级菜单点击时，是否有其一存在级菜单里面，如果没有说明没有一级菜单TARGET权限
                var currentMODULEID = "";
                var clickUrl = "";
                for (var i = 0; i < json.length; i++) {
                    currentMenu = "";
                    spanNoborder = "";
                    index = -1;

                    if (IsNullOrEmpty(json[i].LOCATION_NAME)) {
                        index = strFullPath.indexOf(json[i].LOCATION_NAME.toLowerCase());
                        if (index > -1) {
                            currentMenu = 'class="hover"';
                            isExist = 1;
                        }
                    }

                    if (i == json.length - 1) {
                        spanNoborder = 'class="no-border"';
                    }
                    var url = json[i].LOCATION + "?ParentId=" + parentId + "&CurrentModuleId=" + json[i].MODULE_ID;
                    if (i == 0) {
                        clickUrl = url;
                    }
                    //strMenu += '<a id="' + json[i].MODULE_ID + '" onclick="SetCurrentHover(\'' + json[i].MODULE_ID + '\')" href="' + json[i].LOCATION + '" target="' + json[i].TARGET + '" ' + currentMenu + '>' + json[i].FULL_NAME + '</a>'
                    strMenu += '<a id="' +
                        json[i].MODULE_ID +
                        '" href="' +
                        url +
                        '" ' +
                        currentMenu +
                        '><span ' +
                        spanNoborder +
                        '>' +
                        json[i].FULL_NAME +
                        '</span><i class="iconfont">&#xe73a;</i></a>';
                }
                $("#" + objTargetId).html(strMenu);
                if (isExist == 0) {
                    window.location.href = clickUrl;
                }
            }
            else {
                //alert("未获取到菜单信息!");
            }
        } catch (ex) {
        }
    });
}

function getCurrentDate() {
    var d = new Date();
    var years = d.getFullYear();
    var month = add_zero(d.getMonth() + 1);
    var days = add_zero(d.getDate());
    var hours = add_zero(d.getHours());
    var minutes = add_zero(d.getMinutes());
    var seconds = add_zero(d.getSeconds());
    var currentDate = years + "-" + month + "-" + days + " " + hours + ":" + minutes;
    return currentDate;
}
function getCurrentDate_YYMMDD() {
    var d = new Date();
    var years = d.getFullYear();
    var month = add_zero(d.getMonth() + 1);
    var days = add_zero(d.getDate());
    var hours = add_zero(d.getHours());
    var minutes = add_zero(d.getMinutes());
    var seconds = add_zero(d.getSeconds());
    var currentDate = years + "-" + month + "-" + days;
    return currentDate;
}
function getCurrentDate_YYMMDD0000() {
    var d = new Date();
    var years = d.getFullYear();
    var month = add_zero(d.getMonth() + 1);
    var days = add_zero(d.getDate());
    var hours = add_zero(d.getHours());
    var minutes = add_zero(d.getMinutes());
    var seconds = add_zero(d.getSeconds());
    var currentDate = years + "-" + month + "-" + days + " 00:00";
    return currentDate;
}

function getCurrentDate_YYMMDD2359() {
    var d = new Date();
    var years = d.getFullYear();
    var month = add_zero(d.getMonth() + 1);
    var days = add_zero(d.getDate());
    var hours = add_zero(d.getHours());
    var minutes = add_zero(d.getMinutes());
    var seconds = add_zero(d.getSeconds());
    var currentDate = years + "-" + month + "-" + days + " 23:59";
    return currentDate;
}
function getCurrentDate_YYMMDDHHMM() {
    var d = new Date();
    var years = d.getFullYear();
    var month = add_zero(d.getMonth() + 1);
    var days = add_zero(d.getDate());
    var hours = add_zero(d.getHours());
    var minutes = add_zero(d.getMinutes());
    var seconds = add_zero(d.getSeconds());
    var currentDate = years + "-" + month + "-" + days + " " + hours + ":" + minutes;
    return currentDate;
}

function add_zero(temp) {
    if (temp < 10) return "0" + temp;
    else return temp;
}

function GetDateAdd(objDate, strInterval, Number) {
    //y年 q季度 m月 d日 w周 h小时 n分钟 s秒 ms毫秒
    var dtTmp = objDate;
    switch (strInterval) {
        case 's': return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n': return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h': return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd': return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y': return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}
Date.prototype.DateAdd = function (strInterval, Number) {
    //y年 q季度 m月 d日 w周 h小时 n分钟 s秒 ms毫秒
    var dtTmp = this;
    switch (strInterval) {
        case 's': return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n': return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h': return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd': return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y': return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}

function getDaysInMonth(year, month) {
    month = parseInt(month, 10) + 1;
    var temp = new Date(year + "/" + month + "/0");
    return temp.getDate();
}

function getMonthLastDay(year, month) {
    var day = new Date(year, (month + 1), 0);
    return day.getDate();
}
function AddOperateLog(userXh, SOURCE_CONTENTJSON, CATEGORYID, MODULE, OPERATE_TYPEID, EXECUTERESULT, EXECUTERESULTJSON) {
    //CATEGORYID 分类Id 1-登录2-访问3-操作4-异常
    var url = "/Webservice/BaseLogService.asmx/AddOperateLog";
    var postData = {};
    try {
        getAjax_notloading(url, { userXh: userXh, SOURCE_CONTENTJSON: SOURCE_CONTENTJSON, CATEGORYID: CATEGORYID, MODULE: MODULE, OPERATE_TYPEID: OPERATE_TYPEID, EXECUTERESULT: EXECUTERESULT, EXECUTERESULTJSON: EXECUTERESULTJSON }, function (data) {

        });
    }
    catch (ex) {

    }
}