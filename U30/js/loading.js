$(document).ready(function(){
	//var loading = $(".loading");
	//$(window).scroll(function () {
		//滚动了多少距离
	 //    var scrollTop = $(this).scrollTop();
	 //    var contactHeight = $(".contact").height(),
	 //    	footerHeight = $("footer").height();
	 //    //整个文件的高度
	 //    var scrollHeight = $(document).height();
	 //    var certain = scrollHeight-contactHeight-footerHeight;
	 //    //窗口高度
	 //    var windowHeight = $(this).height();
	 //    if (scrollTop + windowHeight >= certain) {
	 //    loading.css("display","block");
	 //  //此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作

	 //    }
	 //    //监听加载状态改变
		// document.onreadystatechange = completeLoading;

		// //加载状态为complete时移除loading效果
		// function completeLoading() {
		//     if (document.readyState == "complete") {
		//         loading.css("display","none");
		//     }
		// }
		// if(($(window).scrollTop() + $(window).height()) == $(document).height())
		// {
		// 	$("#fluid").gridalicious('append', makeboxes());
		// }
	//});
	//主要部分
	$("#fluid").gridalicious({
        gutter: 15,
        width: 260,
        animate: true,
        animationOptions: {
                speed: 50,
                duration: 200,
        },
    });
})



