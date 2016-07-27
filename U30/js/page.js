var Page = (function() {

	var $LB_container = $( '#LB_container' ),
		$bookBlock = $( '#bb-bookblock' ),
		$items = $bookBlock.children(),
		itemsCount = $items.length,
		current = 0,
		bb = $( '#bb-bookblock' ).bookblock( {
			speed : 800,
			perspective : 2000,
			shadowSides	: 0.8,
			shadowFlip	: 0.4,
			onEndFlip : function(old, page, isLimit) {
				
				current = page;
				// update TOC current
				updateTOC();
				// updateNavigation
				updateNavigation( isLimit );
				// initialize jScrollPane on the content div for the new item
				setJSP( 'init' );
				// destroy jScrollPane on the content div for the old item
				setJSP( 'destroy', old );

			}
		} ),
		$navNext = $( '#bb-nav-next' ),
		$navPrev = $( '#bb-nav-prev' ).hide(),
		$menuItems = $LB_container.find( 'ul.menu-toc > li' ),
		$PM_tblcontents = $( '#PM_tblcontents' ),
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		supportTransitions = Modernizr.csstransitions;

	function init() {

		// initialize jScrollPane on the content div of the first item
		setJSP( 'init' );
		initEvents();

	}
	
	function initEvents() {

		// add navigation events
		$navNext.on( 'click', function() {
			bb.next();
			return false;
		} );

		$navPrev.on( 'click', function() {
			bb.prev();
			return false;
		} );
		
		// add swipe events
		$items.on( {
			'swipeleft'		: function( event ) {
				if( $LB_container.data( 'opened' ) ) {
					return false;
				}
				bb.next();
				return false;
			},
			'swiperight'	: function( event ) {
				if( $LB_container.data( 'opened' ) ) {
					return false;
				}
				bb.prev();
				return false;
			}
		} );

		// show table of contents
		$PM_tblcontents.on( 'click', toggleTOC );

		// click a menu item
		// $menuItems.on( 'click', function() {

		// 	var $el = $( this ),
		// 		idx = $el.index(),
		// 		jump = function() {
		// 			bb.jump( idx + 1 );
		// 		};
			
		// 	current !== idx ? closeTOC( jump ) : closeTOC();

		// 	return false;
			
		// } );

		// reinit jScrollPane on window resize
		$( window ).on( 'debouncedresize', function() {
			// reinitialise jScrollPane on the content div
			setJSP( 'reinit' );
		} );

	}

	function setJSP( action, idx ) {
		
		var idx = idx === undefined ? current : idx,
			$content = $items.eq( idx ).children( 'div.content' ),
			apiJSP = $content.data( 'jsp' );
		
		if( action === 'init' && apiJSP === undefined ) {
			$content.jScrollPane({verticalGutter : 0, hideFocus : true });
		}
		else if( action === 'reinit' && apiJSP !== undefined ) {
			apiJSP.reinitialise();
		}
		else if( action === 'destroy' && apiJSP !== undefined ) {
			apiJSP.destroy();
		}

	}

	function updateTOC() {
		$menuItems.removeClass( 'menu-toc-current' ).eq( current ).addClass( 'menu-toc-current' );
	}

	function updateNavigation( isLastPage ) {
		
		if( current === 0 ) {
			$navNext.show();
			$navPrev.hide();
		}
		else if( isLastPage ) {
			$navNext.hide();
			$navPrev.show();
		}
		else {
			$navNext.show();
			$navPrev.show();
		}

	}

	function toggleTOC() {
		var opened = $LB_container.data( 'opened' );
		opened ? closeTOC() : openTOC();
	}

	function openTOC() {
		$navNext.hide();
		$navPrev.hide();
		$LB_container.addClass( 'slideRight' ).data( 'opened', true );
	}

	function closeTOC( callback ) {

		updateNavigation( current === itemsCount - 1 );
		$LB_container.removeClass( 'slideRight' ).data( 'opened', false );
		if( callback ) {
			if( supportTransitions ) {
				$LB_container.on( transEndEventName, function() {
					$( this ).off( transEndEventName );
					callback.call();
				} );
			}
			else {
				callback.call();
			}
		}

	}

	return { init : init };

})();

$(function() {

    Page.init();

});

$('.special-button').click(function(){
  
  if($('.special-button_bottom').hasClass('active')){
    $(".st0").attr("class", "st0");
  }else{
    $(".st0").attr("class", "st0 active");
  }
  $('.special-button_top').toggleClass("active");
  $('.special-button_bottom').toggleClass("active");

  if($('body').hasClass('oy')){
    $("body").removeClass("oy");
  }else{
    $("body").addClass("oy");
  }
});
//只在header区域内显示汉堡菜单，滚动出了就看不到了
$(document).ready(function(){	
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop(),
			menu_btn = $("#PM_tblcontents"),
			header = $(".h_content");
		var height = parseInt(header.css("height"));
		if(scrollTop>=height){
			menu_btn.css("display","none");
		}else{
			menu_btn.css("display","block");
		}
	})
})
