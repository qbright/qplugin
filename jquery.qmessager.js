;(function($){
	var messagerDiv = "<div class='qmessager'></div>"
	/**
	 * content 显示内容
	   type 信息类型,有三种：error ，success，info
	   position 信息框位置 left right top bottom 分别表示为  l，r ，t，b，
	   			如果想让信息在右下角出现，则将position设置为 r-b
	   width height  信息框的宽和高
	   delay 设置多少毫秒后信息框自动关闭
	   left top ：指定任意百分比的位置  百分之50 就是 0.5
	 **/
	$.qMessager = function(options){
		var opts =  $.extend({}, $.qMessager._default, $.qMessager.defaults);
	        opts = $.extend({}, opts, options);  
		$('body').append(messagerDiv);
		var _messager = $(".qmessager");
		_messager.css({'width':opts.width,'height':opts.height});
		var positionLeft ;
		var positionTop ;
		//判断位置参数
		if(opts.left&&opts.top && (opts.left >= 0 && opts.left <=1 && opts.top >= 0 && opts.top <= 1)){
			positionLeft = opts.left;
			positionTop = opts.top;
		}else {
			var positionSet = opts.position.split("-");
			if(positionSet.length != 2 || !positionParamVaild(positionSet)){
				positionSet = ["r","b"];
			}
			positionLeft = getPosition(positionSet[0]);
			positionTop = getPosition(positionSet[1]);
		}
		setPosition(_messager,positionLeft,positionTop);
		$(".qmessager").addClass('qmessager-' + opts.type).html(opts.content).fadeIn();

		setTimeout("$('.qmessager').fadeOut();$('.qmessager').remove();",opts.delay);
			
	};
 $.qMessager._default = {
	 	content:"content",
	 	type:"info",
	 	position:'r-b',
	 	width:'200px',
	 	height:'70px',
	 	delay:2000,
	 	left:0,
	 	top:0
	 }
function getPosition(position){
	var positionMap = [] ;
	positionMap["l"] = 0;
	positionMap["r"] = 1;
	positionMap["t"] = 0;
	positionMap["b"] = 1;
	return positionMap[position];
}

function setPosition(obj,left,top) {
		var objFixwidth =  obj.width();
		var objFixHeight = obj.height();

		if(left <= 0.5){
			objFixwidth /= 2;
		}
		if(top <= 0.5){
			objFixHeight /= 2;
		}
		rePosition(obj,left,top,objFixwidth,objFixHeight);
		// 浏览器窗口大小改变时
		$(window).resize(function() {
			rePosition(obj,left,top,objFixwidth,objFixHeight);
		});
		// 浏览器有滚动条时的操作、
		$(window).scroll(function() {
			rePosition(obj,left,top,objFixwidth,objFixHeight);
		});
	}

	function rePosition(obj,left,top,objFixwidth,objFixHeight){
		var screenWidth = $(window).width(), screenHeight = $(window).height(); // 当前浏览器窗口的
		var scrolltop = $(document).scrollTop();// 获取当前窗口距离页面顶部高度
		var scrollleft = $(document).scrollLeft();
		var objLeft = scrollleft + screenWidth* left - objFixwidth;
		var objTop = scrolltop + screenHeight* top - objFixHeight;
		obj.css({
			left : objLeft + 'px',
			top : objTop + 'px'
		});
	}
	function positionParamVaild(positionSet){
		var left = positionSet[0];
		var top = positionSet[1];
		var paramSet = ["r","l","t","b"];
		var flagLeft = false,flagTop = false;
		while(paramSet.length){
			if(paramSet.length >2 &&paramSet.pop() == top){
				flagTop = true;
			}else if( paramSet.length <= 2 && paramSet.pop() == left){
				flagLeft = true;
			}
		}

		return (flagLeft && flagTop);
	}
})(jQuery);