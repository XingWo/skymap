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
	}else{
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
	// 鼠标按下或触摸开始时的事件处理
	$(".action").on("mousedown touchstart", function(e) {
	    e.preventDefault(); // 阻止默认行为，例如滚动或链接跳转
	
	    // 设置isResizing标志
	    isResizing = true;
	
	    // 获取原始事件对象，以兼容触摸和鼠标事件
	    var originalEvent = e.originalEvent || e;
	    var touchEvent = originalEvent.touches || originalEvent.changedTouches;
	    var event = touchEvent ? touchEvent[0] : e;
	
	    // 初始化startY和originalHeight
	    startY = event.clientY;
	    originalHeight = $(".starwostrategy").height();
	
	    // 禁用过渡效果，以便在调整大小时立即看到变化
	    $(".starwostrategy").css({
	        "transition":"all ease-in 0s",
	    });
	    $(".stariframe").css({
	        "pointer-events":"none",
	    });
	});
	
	// 鼠标移动或触摸移动时的事件处理
	$(document).on("mousemove touchmove", function(e) {
	    e.preventDefault(); // 阻止默认行为，例如页面滚动
	
	    if (isResizing) {
	        // 获取原始事件对象
	        var originalEvent = e.originalEvent || e;
	        var touchEvent = originalEvent.touches || originalEvent.changedTouches;
	        var event = touchEvent ? touchEvent[0] : e;
	
	        elIsMove = true;
	        starwostrategyzt = 1;
	        // 计算新的deltaY和新的高度
	        const deltaY = event.clientY - startY;
	        newHeight = originalHeight + deltaY;
	
	        // 更新.starwostrategy的高度和边框圆角
	        $('.starwostrategy').css({
	            "height": newHeight,
	            "border-radius": "0 0 22px 22px"
	        });
	    }
	});
	
	// 鼠标释放或触摸结束时的事件处理
	$(".action").on("mouseup touchend", function() {
	    // 重置isResizing标志
	    isResizing = false;
	
	    // 恢复过渡效果
	    $(".starwostrategy").css({
	        "transition": "all ease-in 0.26s"
	    });
	
	  
	
	    // 根据newHeight的值执行相应的逻辑
	    if (newHeight <= 38) {
	        // 假设starwostrategyUrlzt用于控制是否显示某些内容
	        if (starwostrategyUrlzt == 1) {
	            starwostrategyUrlzt = 0; // 更新状态
	            back(); // 执行回退操作，例如隐藏元素
	            starwostrategyUrlzt = 1; // 重置状态
	        } else {
	            back(); // 执行回退操作
	        }
	    }
	      // 恢复iframe的指针事件
	    $(".stariframe").css({
	        "pointer-events": "auto"
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
				$('.components').html('');
				starstrategying();
				$('.markButton'+key).prop("disabled", false);
			});
		}else{
			$('.components').html('');
		}
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
$(document).ready(function() {
	var keystarwo = "starwo";
	var newValue = localStorage.getItem(keystarwo);
	localStorage.setItem(keystarwo, newValue ? "1" : "");
	if (newValue){
		console.log('你点这里干啥，没给一个关注的嘛——哔哩哔哩"星沃"');
	}else{
		$('.starwostrategy').css({
			"height":"38vh",
			"width":"100%",
		});
		starwostrategyzt2 = 0;
		strategyzt = 1;
		localStorage.setItem(keystarwo, newValue ? "" : "1");
	};
});