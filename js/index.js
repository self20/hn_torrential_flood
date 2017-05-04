$(function(){
    
	resetPageHeight();
	//下拉框

	$(".select_box").click(function(event){  
		
		event.stopPropagation();

		if($(this).is(".disabled")){

			return false;

		}else{
			
			if(!$(this).find(".select_option").is(":visible")){
				$(".select_option").hide();
				$(".select_box").css({

					"z-index" : 1
				});
				$(".select_box").removeClass("open");
				$(".select_open").removeClass("active");
				$(this).find(".select_open").addClass("active");
				$(this).find(".select_option").show();
				$(this).addClass("open");
				if($(this).find(".select_option ul").length > 0){

					$(this).find(".select_option ul").show();
					$(this).find(".gray_arrow_b0").removeClass("gray_arrow_b0").addClass("gray_arrow_t0");
				}
			}else{

				$(this).find(".select_option").hide();
				$(this).removeClass("open");
				$(this).find(".select_open").removeClass("active");
			}
			$(this).css("z-index", "100");
		}

	});

	$(document).click(function(event){
		
		var eo=$(event.target);
			
		if($(".select_box").is(":visible") && eo.attr("class")!="select_option" && !eo.parent(".select_option").length){

			$(".select_option").hide();
			$(".select_box").css({

				"z-index" : 1
			});
			$(".select_box").removeClass("open");
			$(".select_open").removeClass("active");
		}								  
	});
			 
	$(".select_option a").click(function(){
		var value=$(this).text();
		$(this).parents(".select_option").find("a").removeClass("selected");
		$(this).parents(".select_option").siblings(".select_text").text(value);
		$(".select_value").val(value);
		$(this).addClass("selected");
		
	});

	//左则菜单

	$(".m_aside_nav_item:not(.open) h3").click(function(){

		if($(this).parent().hasClass("hover")){

			$(this).parent().removeClass("hover");

		}else{

			$(this).parent().addClass("hover");
			$(this).parent().siblings().removeClass("hover");
		}
	});


	//弹出框 关闭按钮
	$(document).on("click",".closed ,.close_btn ,.m_btn_cancel,.m_btn_close  ",function(){ 

		if(!$(this).parents(".dialog").siblings(".dialog").is(":visible")){
			$("body").css("overflow","visible");
			$("html").css("overflow","auto");
		}

		$(this).parents(".dialog").hide();
		
	});

	//弹出框绑定drag()

	$(".dialog_hd").hover(function(){

		$(this).css("cursor","move");
		drag();
	},function(){

		$(this).css("cursor","default");
	});
	
  	

  	// 图例 展开 收缩

  	$(".m_legend_hd a").click(function(){

  		if($(this).parents(".m_legend_box").hasClass("open")){

  			$(this).parents(".m_legend_box").removeClass("open");

  		}else{

  			$(this).parents(".m_legend_box").addClass("open")
  		}

  	});

  	//时间筛选

  	$('.m_search_time dd:eq(0) .select_option a').click(function(){

  		var _this = $(this);
  		var _index = $(this).index();
  		
  		switch(_index){

  			case 0:

  			_this.parents(".m_search_box").next().find(".m_select_tab .m_select_con").addClass("hidden");
  			_this.parents(".m_search_box").next().find(".m_select_tab .m_select_con:eq(0)").removeClass("hidden");
  			break;

  			case 1:

  			_this.parents(".m_search_box").next().find(".m_select_tab .m_select_con").addClass("hidden");
  			_this.parents(".m_search_box").next().find(".m_select_tab .m_select_con:eq(1)").removeClass("hidden");
  			break;

  			case 2:

  			_this.parents(".m_search_box").next().find(".m_select_tab .m_select_con").addClass("hidden");
  			_this.parents(".m_search_box").next().find(".m_select_tab .m_select_con:eq(2)").removeClass("hidden");
  			break;

  			case 3:

  			_this.parents(".m_search_box").next().find(".m_select_tab .m_select_con").addClass("hidden");
  			_this.parents(".m_search_box").next().find(".m_select_tab .m_select_con:eq(3)").removeClass("hidden");
  			break;

  		}
  	})
});


//重置页面高度

function resetPageHeight(){
	var _wH = $(window).height();
	var _pH = $("body").height();
	var _mH = $(".m_map_box").height();
	var _aH = $(".line_auto").height();
	var _asH = $(".m_aside_nav").height() || $(".vp_aside").height();
	var _mmH = $(".m_main").height() ||  $(".vp_main").height();
	if(_wH > _pH ){
		if(_asH < _wH - 140){

			$(".line_auto").css({
				minHeight : _wH - _pH + _aH +"px"
			});
		}else{

			$(".line_auto").css({
				minHeight : _asH +"px"
			});
		}
	}else{
		
		if(_asH > _mmH){
			$(".line_auto").css({
				minHeight : _asH - _mmH + _aH +"px"
			});
		}
	}

	$(".m_aside_nav ").css({

		minHeight : $(".m_main").height() +"px"
	});
	$(".vp_aside ").css({

		minHeight : $(".vp_main").height() +"px"
	});

	$(window).resize(function(){
		resetPageHeight();
	});
}

//拖动
function drag(){

	$(".dialog_hd").on("mousedown",function (ev){

		var ev = ev || event;
		var disX = ev.clientX - $(this).parent().offset().left;
        var disY = ev.clientY -$(this).parent().offset().top;

        var _$this = $(this);
		$(document).on('mousemove', function(ev){
			var ev = ev || event;
			var L = ev.clientX - disX;
			var T = ev.clientY - disY - $(document).scrollTop();
			if (L < -_$this.parent().width()*0.8){

				L = -_$this.parent().width()*0.8;
			}else if( L >$(window).width() - _$this.parent().width()*0.2){

				L = $(window).width() - _$this.parent().width()*0.2;
			};
			if (T < 0){

				T = 0;
			}else if( T >$(window).height() - _$this.parent().height()*0.2){

				T = $(window).height() - _$this.parent().height()*0.2;
			};
			_$this.parent().css({
				left	:	L,
				top		:	T,
				cursor	: "move"
			});
		});
		$(document).on("mouseup", function() {

			$(this).unbind("mousemove");
			_$this.parent().css("cursor","default");

		});
   		
		ev.preventDefault();
	});
}
// 取最小值--最大值之间的随机数
function GetRandomNum(Min,Max){   

	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}

//弹出框
function dialogPos(id){

		$("body").css("overflow","hidden");
		$("html").css("overflow","visible");
		$(id).css("display","block");
		var $dialog_main = $(id).find(".dialog_main") 
		var num = GetRandomNum(-100,100);  
		if($(id).siblings(".dialog").is(":visible")){

			if( $dialog_main.outerHeight() > $(window).height()){

				$dialog_main.css({
					top:0 ,
					left:($(window).width() -$dialog_main.outerWidth()) / 2 + num +"px"
				});

			}else{

				$dialog_main.css({
					top:($(window).height()- $dialog_main.outerHeight())/2+"px",
					left:($(window).width() -$dialog_main.outerWidth())/2 +num +"px"
				});
			};

		}else{

			if( $dialog_main.outerHeight() > $(window).height()){

				$dialog_main.css({
					top:0 ,
					left:($(window).width() -$dialog_main.outerWidth()) / 2 +"px"
				});

			}else{

				$dialog_main.css({
					top:($(window).height()- $dialog_main.outerHeight())/2+"px",
					left:($(window).width() -$dialog_main.outerWidth())/2 +"px"
				});
			};

		}
		
		$(window).resize(function(){
			if( $dialog_main.outerHeight() > $(window).height()){

				$dialog_main.css({
					top:0 ,
					left:($(window).width() -$dialog_main.outerWidth())/2 +"px"
				});

			}else{

				$dialog_main.css({
					top:($(window).height()- $dialog_main.outerHeight())/2+"px",
					left:($(window).width() -$dialog_main.outerWidth())/2 +"px"
				});
			};
			
		});

};

/*
 * 2016年11月4日 OR 2016-11-4
 *
*/

function fixNewDate(date){
	var date = date;
	var da =date.replace("年","-").replace("月","-").replace("日","").replace(/-/g,"/").split(/\/|\:|\ /); 
    var nDate= (new Date(da[0], da[1] - 1, da[2])).getTime(); 

    return nDate;
}


/**
 * 计算两个日期相差天数 sDate1>sDate2 yyyy-MM-dd
 * @param sDate1
 * @param sDate2
 * @returns
 */

function  DateDiff(sDate1,  sDate2){

   var iDays  =  parseInt(Math.abs(fixNewDate(sDate1)  -  fixNewDate(sDate2))  /  1000  /  60  /  60  /24) ;
   
   return iDays;
}  

/**
 * 日期加几天 yyyy-MM-dd
 */
function getDateAdd(date,i){

	var a = new Date(date);
	a = a.valueOf();
	a = a + i * 24 * 60 * 60 * 1000
	a = new Date(a);

	var m = a.getMonth() + 1;

	if(m.toString().length == 1){
	    m='0'+m;
	}
	var d = a.getDate();
	if(d.toString().length == 1){
	    d='0'+d;
	}
	console.log(a.getFullYear() + "-" + m + "-" + d);
	return a.getFullYear() + "-" + m + "-" + d;

}

/**
 * 根据日期算是年内第几天 yyyy-MM-dd
 */
function countDays(date) {

    var _date = date.split('-');

    var year  = parseInt(_date[0], 10);
    
    var ndate = (new Date(date)).getTime();

    var initial = fixNewDate(year + '-1-1');
    console.log(initial);
    var offset = ndate - initial;
    return Math.floor(offset / 24 / 3600 / 1e3) + 1;
};