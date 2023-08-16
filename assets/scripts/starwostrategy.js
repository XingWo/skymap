var starwostrategyzt = 0;
var elIsMove = false;
var starwostrategyzt2 = 0;
var strategyzt = 0;
var starwostrategyUrlzt = 0;
var oldkey;
function back(){
	if (starwostrategyUrlzt == 1) {
		$('.components').html('');
		starwostrategyUrlzt = 0;
	} else{
		if (starwostrategyzt == 0) {
			$('.starwostrategy').css({
				"width":"0%",
				"height":"38vh",
				"border-radius":"0 0 22px 22px",
			})
		} else{
			$('.starwostrategy').css({
				"width":"100%",
				"height":"0",
				"border-radius":"0 0 22px 22px",
			})
			starwostrategyzt2 = 1;
		}
		starwostrategyzt = 0;
		strategyzt = 0;
		$(".strategycontent").animate({scrollTop:0},300);
	}
}//返回按钮
$(document).on('keydown', function(e) {
    if (e.key === "Escape" && starwostrategyzt2 === 0) {
        back();
    }
});//esc键
function action(){
	if (elIsMove) {
		elIsMove = false;    //如果状态是true，则证明元素被移动过，不触发click调用的方法
		return;
	} else{
		$('.starwostrategy').css({
			"height":"100%",
			"border-radius":"0 0",
		})
		starwostrategyzt = 1;
	}
};//展开按钮
let isResizing = false;
let startY = 0;
let originalHeight;
let newHeight;
$(document).ready(function() {
	$(".action").on("mousedown", function(e) {
		isResizing = true;
		startY = e.clientY;
		originalHeight = $(".starwostrategy").height();
		$(".starwostrategy").css({
			"transition":"all ease-in 0s",
		});
		$(".stariframe").css({
			"pointer-events":"none",
		});
	});
	$(document).on("mousemove", function(e) {
		if (isResizing) {
			elIsMove = true;
			starwostrategyzt = 1;
			const deltaY = e.clientY - startY;
			newHeight = originalHeight + deltaY;
			$('.starwostrategy').css({
				"height":newHeight + "px",
				"border-radius":"0 0 22px 22px",
			})
		}
	});
	$(".action").on("mouseup", function() {
		isResizing = false;
		$(".starwostrategy").css({
			"transition":"all ease-in 0.26s",
		});
		if (newHeight <= 23) {
			back();
		}
		$(".stariframe").css({
			"pointer-events":"auto",
		});
	});
});
function strategy(element) {
	var that = $(element);
	var key = that.attr("data-key");
	var targetTitle;
	var thisstrategy;
	function starstrategying(){
		if (strategyzt == 0) //默认情况下展开攻略
		{
			$('.starwostrategy').css({
				"height":"38vh",
				"width":"100%",
			})
			starwostrategyzt2 = 0;
			strategyzt = 1;
			$.each(starwostrategyData, function () {
				if(this.id === key) {
				  targetTitle = this.title;
				  thisstrategy = this.strategy;
				  return false; // 结束循环
				}
			});//从starwostrategyData里遍历查找id对应的其他内容
			$('#titleh1').text(targetTitle);
			$('.content').html(thisstrategy);
			oldkey = key;
		} else if (oldkey !== key) //已经展开过要展开新的不同的攻略
		{
			starwostrategyUrlzt = 0;
			back();
			$('.markButton'+key).prop("disabled", true);
			$('.starwostrategy').fadeOut(300, function() {
			    $('.starwostrategy').fadeIn(0);//似乎并不能淡入淡出
				starstrategying();
				$('.markButton'+key).prop("disabled", false);
			});
		}
		$('.components').html('');
		starwostrategyUrlzt = 0;
	}
	starstrategying();
}



function starwourl(element) {
	var that = $(element);
	var key = that.attr("data-key");
	var starthisurl;
	$.each(starwostrategyUrl, function () {
		if(this.id === key) {
		  starthisurl = this.url;
		  return false; // 结束循环
		}
	});
	var starHtml = '<iframe class="stariframe" src="' + starthisurl + '" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>';
	$('.components').html(starHtml);
	starwostrategyUrlzt = 1;
}