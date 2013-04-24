/**
 * jQuery 弹出框插件 
 * @author qbright
 */

(function($) {
	var init = false;// 初始化标志位
	var shade = "<div class='shade_class'></div>";// 遮罩层
	var $shade = null;
	var methods = {
		show : function() {
			/*$shade.fadeIn();*/ 
			$shade.css("display","block");//兼容 IE7 IE8中 fadeIn和show不能使遮罩层半透明的情况
			this.fadeIn(500);
			return false;
		},
		hide : function() {
			this.fadeOut();
			$shade.fadeOut();
			init = false;
			return false;
		}

	};

	$.fn.dialog = function(method) {
		if (!init) {
			init_dialog(this);
		}
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(
					arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);

		} else {
			$.error('Method ' + method + ' does not exist on myPlugin');
		}
		return this.each(function() {
			var $this = $(this);
		});
	};
	var init_dialog = function($this) {

		if ($shade == null) { // 没有加载遮罩层，初始化遮罩层
			$("body").append(shade);
			$shade = $(".shade_class");
		}
		center($this);
		var select = "#" + $this.attr("id") + " .close";
		$(select).click(function() {
			$this.dialog("hide");
		});
		$(".cancel_btn").click(function() {
				$this.dialog("hide");
		});
		
	};

	function center(obj) {
		var screenWidth = $(window).width(), screenHeight = $(window).height(); // 当前浏览器窗口的
		var scrolltop = $(document).scrollTop();// 获取当前窗口距离页面顶部高度
		var objLeft = (screenWidth - obj.width()) / 2;
		var objTop = (screenHeight - obj.height()) / 2 + scrolltop;
		obj.css({
			left : objLeft + 'px',
			top : objTop + 'px'
		});
		// 浏览器窗口大小改变时
		$(window).resize(function() {
			screenWidth = $(window).width();
			screenHeight = $(window).height();
			scrolltop = $(document).scrollTop();
			objLeft = (screenWidth - obj.width()) / 2;
			objTop = (screenHeight - obj.height()) / 2 + scrolltop;
			obj.css({
				left : objLeft + 'px',
				top : objTop + 'px'
			});
		});
		// 浏览器有滚动条时的操作、
		$(window).scroll(function() {
			screenWidth = $(window).width();
			screenHeight = $(window).height();
			scrolltop = $(document).scrollTop();
			objLeft = (screenWidth - obj.width()) / 2;
			objTop = (screenHeight - obj.height()) / 2 + scrolltop;
			obj.css({
				left : objLeft + 'px',
				top : objTop + 'px'
			});
		});
	}

})(jQuery);