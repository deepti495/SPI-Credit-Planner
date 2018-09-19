function renderChart(){var e=$("#select--planned-graduation").val(),t=$("#select--required-credits").val(),s=parseInt($("#slider__value--Fall").val()),a=parseInt($("#slider__value--Spring").val()),l=parseInt($("#slider__value--Summer").val()),r=parseInt($("#slider__value--Winter").val()),i=$(".sliders__slider:first-child h4").data("semester"),n=e.split(" ")[0],d=e.split(" ")[1];if(0!=$("#select--existing-credits").length){var _=!0,u=parseInt($("#select--existing-credits").val()),o=$("#sliders").hasClass("hide-winter-slider");s=u}else var _=!1,o=!1;if("summers-winters-no"==$("#select--summer-classes").val())var m=!1;else var m=!0;if(3==$(".sliders__slider").length)var h=!0;else var h=!1;var c=a+s;m&&(c+=l,h||(c+=r)),m?($("#sliders").addClass("summer-winter-classes"),$("#plan").addClass("summer-winter-classes")):($("#sliders").removeClass("summer-winter-classes"),$("#plan").removeClass("summer-winter-classes")),_&&($(".sliders__slider:first-child .slider__value input").val(u),$(".sliders__slider:first-child button").addClass("disabled"),colorSlider(".sliders__slider:first-child",u)),$(".status__graduation-date").html(e),$(".slider__value").each(function(){1==$(this).children("input").val()?$(this).children(".credits--s").hide():$(this).children(".credits--s").show()}),c<30&&0==$("body.configure").length?($(".rendered .note--recommended-credits").addClass("alerted"),0==$("body.second-warning").length&&(alert("Attention: You need to take 30 credits your first year to be on track to graduate by "+e),0==$("body.first-warning").length?$("body").addClass("first-warning"):$("body").addClass("second-warning"))):$(".rendered .note--recommended-credits").removeClass("alerted"),a<12||s<12?$(".rendered .note--full-time-status").addClass("alerted"):$(".rendered .note--full-time-status").removeClass("alerted"),$(".plan__semester--Spring .total__value").html(a),$(".plan__semester--Fall .total__value").html(s),_&&("Spring"==i?$(".plan__semester--Spring:not(:first) .total__value").html(s):s<15&&$(".plan__semester--Fall:not(:first) .total__value").html(a),h||$("#Fall-2017 h5").html("Fall & Winter")),m?($(".plan__semester--Summer .total__value").html(l),h||$(".plan__semester--Winter .total__value").html(r)):($(".plan__semester--Summer .total__value").html("0"),h||$(".plan__semester--Winter .total__value").html("0")),$(".plan__year").show(),$(".plan__year").removeClass("graduation_year"),$(".plan__semester--Fall").show(),$(".plan__semester--Spring").show(),$(".plan__semester--Summer").show(),$(".plan__semester--Winter").show(),o&&$(".plan__semester--Winter").first().hide(),$(".plan__year").each(function(){var e=$(this).attr("id").split("--")[1];"Spring"==i?"January"==n?(e>d-1&&($(this).find(".plan__semester .total__value").html("0"),$(this).hide()),e==d-1&&$(this).addClass("graduation_year")):(e>d&&($(this).find(".plan__semester .total__value").html("0"),$(this).hide()),e==d&&($(this).addClass("graduation_year"),$(this).find(".plan__semester--Fall").hide(),$(this).find(".plan__semester--Fall .total__value").html("0"),$(this).find(".plan__semester--Winter").hide(),$(this).find(".plan__semester--Winter .total__value").html("0"),$(this).find(".plan__semester--Summer").hide(),$(this).find(".plan__semester--Summer .total__value").html("0"))):"January"==n?(e>d-1&&($(this).find(".plan__semester .total__value").html("0"),$(this).hide()),e==d-1&&($(this).addClass("graduation_year"),$(this).find(".plan__semester--Spring").hide(),$(this).find(".plan__semester--Spring .total__value").html("0"),$(this).find(".plan__semester--Summer").hide(),$(this).find(".plan__semester--Summer .total__value").html("0"))):(e>d-1&&($(this).find(".plan__semester .total__value").html("0"),$(this).hide()),e==d-1&&($(this).addClass("graduation_year"),$(this).find(".plan__semester--Summer").hide(),$(this).find(".plan__semester--Summer .total__value").html("0")))});var v=rawCount();v>t&&$($(".plan__semester--Winter:not(:first)").get().reverse()).each(function(){var e=rawCount()-t,s=parseInt($(this).find(".total__value").html());e>=s?$(this).find(".total__value").html("0"):$(this).find(".total__value").html(s-e)}),v>t&&$($(".plan__semester--Summer:not(:first)").get().reverse()).each(function(){var e=rawCount()-t,s=parseInt($(this).find(".total__value").html());e>=s?$(this).find(".total__value").html("0"):$(this).find(".total__value").html(s-e)}),v>t&&$($(".plan__year:not(:first) .plan__semester").get().reverse()).each(function(){var e=rawCount()-t,s=parseInt($(this).find(".total__value").html());s>11&&(e>=s-12?$(this).find(".total__value").html("12"):$(this).find(".total__value").html(s-e))});var p=0;$(".plan__year").each(function(){var e=0;$(this).find(".total__value").each(function(){e+=parseInt($(this).html())}),1==e?$(this).find(".plan__year__total").html(e+" Credit"):$(this).find(".plan__year__total").html(e+" Credits"),p+=e}),p>=t?($(".status__ontrack").show(),$(".status__offtrack").hide()):($(".status__ontrack").hide(),$(".status__offtrack").show()),$(".plan__total-credits__count").html(p);var f=0;$(".plan__planned-graduation").removeClass("under-credit"),p>t&&(f=p-t,1==f?$(".plan__total-credits__count").html(t+" (Plus "+f+" Extra Credit)"):f>1&&$(".plan__total-credits__count").html(t+" (Plus "+f+" Extra Credits)")),p<t&&(underCredit=t-p,1==underCredit?($(".plan__total-credits__count").append(" ("+underCredit+" credit short)"),$(".status__deficit").html(underCredit+" credit ")):underCredit>1&&($(".plan__total-credits__count").append(" ("+underCredit+" credits short)"),$(".status__deficit").html(underCredit+" credits ")),$(".plan__planned-graduation").addClass("under-credit"))}function colorSlider(e,t){for($(e).find(".slider__box").removeClass("slider__box--filled"),i=0;i<=t;i++)$(e).find(".slider__box--"+i).addClass("slider__box--filled");$(e).find("input").val(t)}function rawCount(){var e=0;return $(".total__value").each(function(){e+=parseInt($(this).html())}),e}$(function(){$(".setup__skip").click(function(){renderChart(),$("body").removeClass("configure").addClass("rendered"),gtag("event","skip_setup")}),$(".button--setup").click(function(){$(".setup__question--inactive").length?($(".setup__question--active").addClass("setup__question--answered").removeClass("setup__question--active"),$(".setup__question--inactive").first().addClass("setup__question--active").removeClass("setup__question--inactive"),gtag("event","question_answered")):(renderChart(),$("body").removeClass("configure").addClass("rendered"),gtag("event","all_questions_answered"))}),$("select").selectric({optionsItemBuilder:function(e,t,s){if(e.element.data("label"))var a=e.element.data("label");else var a=e.text;return e.element.data("extended")&&(a+="<div class='extended-value'>"+e.element.data("extended")+"</div>"),a},labelBuilder:function(e,t,s){if(e.element.data("label"))var a=e.element.data("label");else var a=e.text;return a},responsive:!1,disableOnMobile:!1,maxHeight:360}),$("select").change(function(){1==$("#select--existing-credits").val()?$("#setup .credits--s").hide():$("#setup .credits--s").show(),renderChart()}),$(".slider__box").click(function(){if(0==$(this).parents(".use-existing-credits").length||0==$(this).parents(".sliders__slider:first-child").length){var e=$(this).data("value"),t=$(this).data("semester"),s="#slider__boxes--"+t;gtag("event",t+"_semester_adjusted",{value:e}),"Summer"!=$(this).data("semester")&&"Winter"!=$(this).data("semester")||($("#select--summer-classes").val("summers-winters-yes"),$("#select--summer-classes").selectric("refresh")),colorSlider(s,e),renderChart()}}),$(".button--slider-controls--add").click(function(){var e=$(this).data("for"),t=$("#slider__value--"+e).val();t<20&&t++,"Summer"!=e&&"Winter"!=e||($("#select--summer-classes").val("summers-winters-yes"),$("#select--summer-classes").selectric("refresh"));var s="#slider__boxes--"+e;gtag("event",e+"_semester_adjusted",{value:t}),colorSlider(s,t),renderChart()}),$(".button--slider-controls--remove").click(function(){var e=$(this).data("for"),t=$("#slider__value--"+e).val();t>0&&t--,colorSlider("#slider__boxes--"+e,t),renderChart(),gtag("event",e+"_semester_adjusted",{value:t})}),$(".slider__value input").keyup(function(){var e=$(this).attr("id"),t=e.substr(e.indexOf("--")+2);this.value=this.value.replace(/[^0-9\.]/g,""),""==this.value&&$(this).val("0"),("Summer"==t||"Winter"==t)&&this.value>0&&($("#select--summer-classes").val("summers-winters-yes"),$("#select--summer-classes").selectric("refresh")),colorSlider("#slider__boxes--"+t,this.value),renderChart(),gtag("event",t+"_semester_adjusted",{value:value})}),$(".button--save-plan").click(function(){var e=parseInt($("#slider__value--Fall").val()),t=parseInt($("#slider__value--Spring").val()),s=parseInt($("#slider__value--Summer").val()),a=parseInt($("#slider__value--Winter").val()),l=t+e;"summers-winters-yes"==$("#select--summer-classes").val()&&(l+=s,a&&(l+=a)),gtag("event","save_plan",{value:l})})});