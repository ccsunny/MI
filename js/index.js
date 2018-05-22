// 导航栏的切换
$(function () {
    $("#nav_t>li").mouseover(function () {
        var index = $(this).index();
        $("#box>.int_nav").eq(index).show().siblings('.int_nav').hide();
    }).mouseout(function () {
        $("#box>.int_nav").hide();
    });
});
// 轮播图的实现
$(function() {
	var imgArr = ['01.jpg', '02.jpg', '03.jpg','04.jpg','05.jpg','06.jpg']
	// 1.0 动态生成轮播图的结构
	for(var i = 1; i <= imgArr.length; i++) {
		// 根据图片数量动态产生ul和ol的页面结构
		$("<li><a href='javascript:;'><img src='./img/0"+ i +".jpg' /></a></li>").appendTo($("#container ul"))
		$("<li></li>").appendTo($("#container ol"))

	}
	$("#container ol li:eq(0)").addClass('cur');
	// 1.1 将最后一张复制到最开始的位置
	$("#container ul li:eq(" + (imgArr.length - 1) + ")").clone(true).prependTo($("#container ul"));
	// 1.2 将原始第一张复制到最后的位置
	$("#container ul li:eq(1)").clone(true).appendTo($("#container ul"))

	// 2.0 动态生成轮播图的样式
	// 2.1 得到总盒子的宽度
	var containerWidth = $("#container").width();
	// 2.2 设置ul的宽度和默认的偏移值等于一个图片的宽度
	$("#container ul").width($("#container ul li").length * containerWidth).css("transform", "translateX(-"+containerWidth+"px)");
	
	// 3.1 小点控制轮播图
	$("#container ol li").click(function() {
		var index = $(this).index() + 1;
		$(this).addClass('cur').siblings().removeAttr('class')
		$("#container ul").css("transform", "translateX(-"+ (index*containerWidth) +"px)");
		// 统一索引
		num = index;
	});

	// 鼠标经过大盒子切换左右箭头并且设置定时器
	$("#container").hover(function() {
		clearInterval(timer)
		$("#container #pageRight, #container #pageLeft").stop().fadeIn(200)
	}, function() {
		$("#container #pageRight, #container #pageLeft").stop().fadeOut(200)
		timer = setInterval(autoPlay, 2000)
	});

	var num = 1;
	var timer = null;
	// 4.1 点击右箭头实现轮播
	$("#container #pageRight").click(function() {
		autoPlay()
	});

	// 4.2 点击左箭头实现轮播
	$("#container #pageLeft").click(function() {
		num--;
		$("#container ul").css({
			"transition" : "transform .2s ease-in",
			"transform" : "translateX(-"+ (num*containerWidth) +"px)"
		});
		if(num <= 0) {
			num = $("#container ul li").length - 2;
			setTimeout(function() {
				$("#container ul").css({
					"transition" : "none",
					"transform" : "translateX(-"+ (num*containerWidth) +"px)"
				});
			}, 300)
		}
		$("#container ol li").eq(num - 1).addClass('cur').siblings().removeAttr('class')
	});

	// 4.3 实现自动轮播
	timer = setInterval(autoPlay, 5000)

	function autoPlay() {
		num++;
		$("#container ul").css({
			"transition" : "transform .2s ease-in",
			"transform" : "translateX(-"+ (num*containerWidth) +"px)"
		});
		if(num >= $("#container ul li").length - 1) {
			num = 1;
			setTimeout(function() {
				$("#container ul").css({
					"transition" : "none",
					"transform" : "translateX(-"+ (num*containerWidth) +"px)"
				});
			}, 300)
		}
		$("#container ol li").eq(num - 1).addClass('cur').siblings().removeAttr('class');
	}

});
// 侧边栏的切换
$(function () {
    $("#sitBar>li").mouseover(function () {
        var index = $(this).index();
        $("#sitRight>.s_cont").eq(index).show().siblings('.int_nav').hide();
    }).mouseout(function () {
        $("#sitRight>.s_cont").hide();
    });
});
