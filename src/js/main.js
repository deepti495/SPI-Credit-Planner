$(function() {

    $(".setup__skip").click(function() {
    	renderChart();
    	$('body').removeClass("configure").addClass("rendered");
    });

    $(".button--setup").click(function() {
    	if ($(".setup__question--inactive").length) {
	    	$(".setup__question--active").addClass("setup__question--answered").removeClass("setup__question--active")
	    	$(".setup__question--inactive").first().addClass("setup__question--active").removeClass("setup__question--inactive");
    	} else {
    		renderChart();
    		$('body').removeClass("configure").addClass("rendered");
    	}
    });

    $('select').selectric({

			optionsItemBuilder: function(itemData, element, index) {

				if (itemData.element.data('label')) {
					var itemLabel = itemData.element.data('label');
				} else {
					var itemLabel = itemData.text;
				}

				if(itemData.element.data('extended')) {
					itemLabel += "<div class='extended-value'>" + itemData.element.data('extended') + "</div>"
				}
				return itemLabel;
			},
			labelBuilder: function(itemData, element, index) {
				if (itemData.element.data('label')) {
					var builtLabel = itemData.element.data('label');
				} else {
					var builtLabel = itemData.text;
				}
				return builtLabel;
			},
			responsive: false,
			disableOnMobile: false,
			maxHeight: 360,
	  	//	nativeOnMobile: false,
	  	//	inheritOriginalWidth: false

    });

    $("select").change(function() {

    	// check to see if we shoudl adjust credit/credits
    	if($("#select--existing-credits").val() == 1) {
    		$("#setup .credits--s").hide();
    	} else {
    		$("#setup .credits--s").show();
    	}

    	renderChart();
    });

    $(".slider__box").click(function() {

    	if (($(this).parents(".use-existing-credits").length == 0) || ($(this).parents(".sliders__slider:first-child").length == 0)) {
	    	var value = $(this).data('value');
	    	var semester = $(this).data('semester');

	    	var selector = "#slider__boxes--" + semester;

	    	if (($(this).data("semester") == 'Summer') || ($(this).data("semester") == 'Winter')) {
    			$("#select--summer-classes").val('summers-winters-yes');
    			$("#select--summer-classes").selectric('refresh');
    		}

	    	colorSlider(selector,value);
	    	renderChart();
    	}
    })

    $(".button--slider-controls--add").click(function() {
    	var semester = $(this).data('for');
    	var value = $("#slider__value--" + semester).val();
    	
    	if (value < 20) {
    		value++;
    	}

		if ((semester == 'Summer') || (semester == 'Winter')) {
			$("#select--summer-classes").val('summers-winters-yes');
			$("#select--summer-classes").selectric('refresh');
		}

    	var selector = "#slider__boxes--" + semester;
    	colorSlider(selector,value)
    	renderChart()

    })

    $(".button--slider-controls--remove").click(function() {
    	var semester = $(this).data('for');
    	var value = $("#slider__value--" + semester).val();
    	
    	if (value > 0) {
    		value--;
    	}

    	var selector = "#slider__boxes--" + semester;
    	colorSlider(selector,value)
    	renderChart()
    })

    $(".slider__value input").keyup(function () { 
    	var sliderID = $(this).attr('id');
    	var semester = sliderID.substr(sliderID.indexOf("--") + 2);

	    this.value = this.value.replace(/[^0-9\.]/g,'');
	    if (this.value == '') {
	    	$(this).val("0");
	    }

	    if (((semester == 'Summer') || (semester == 'Winter')) && this.value > 0) {
			$("#select--summer-classes").val('summers-winters-yes');
			$("#select--summer-classes").selectric('refresh');
		}

	    var selector = "#slider__boxes--" + semester;

	    colorSlider(selector,this.value)
    	renderChart()
	});

});

function renderChart() {

	// Get Current States
	var planned_graduation = $("#select--planned-graduation").val();
	var required_credits = $("#select--required-credits").val();
	var fall_credits = parseInt($("#slider__value--Fall").val());
	var spring_credits = parseInt($("#slider__value--Spring").val());
	var summer_credits = parseInt($("#slider__value--Summer").val());
	var winter_credits = parseInt($("#slider__value--Winter").val());

	var first_semester = $('.sliders__slider:first-child h4').html();

	var planned_graduation_month = planned_graduation.split(" ")[0];
	var planned_graduation_year = planned_graduation.split(" ")[1];

	// Figure out conditional states
	if ($("#select--existing-credits").length != 0) {
		var use_existing_credits = true;
		var existing_credits = $("#select--existing-credits").val();
		
		fall_credits = existing_credits;
	} else {
		var use_existing_credits = false;
	}
	if ($("#select--summer-classes").val() == 'summers-winters-no') {
		var summer_winter_classes = false;
	} else {
		var summer_winter_classes = true;
	}
	if ($(".sliders__slider").length == 3) {
		var split_semester = true;
	} else {
		var split_semester = false;
	}

	// calculate how many credits are planned for first year
	var first_year_credits = spring_credits + fall_credits;
	if (summer_winter_classes) {
		first_year_credits += summer_credits;
		first_year_credits += winter_credits;
	}

	// Disable summer and winter semsester UI if unplanned
	if (summer_winter_classes) {
		$("#sliders").addClass('summer-winter-classes');
		$("#plan").addClass('summer-winter-classes');
	} else {
		$("#sliders").removeClass('summer-winter-classes');
		$("#plan").removeClass('summer-winter-classes');
	}

	// Set existing number of credits for the 1st semester (if we're using those)
	if (use_existing_credits) {
		$("#sliders").addClass('use-existing-credits');
		$(".sliders__slider:first-child .slider__value input").val(existing_credits);
		$(".sliders__slider:first-child button").addClass('disabled');
		colorSlider(".sliders__slider:first-child",existing_credits);
	}

	// Update graduation date in UI
	$(".status__graduation-date").html(planned_graduation);

	// Adjust "Credit"/"Credits"
	$(".slider__value").each(function() {
		if ($(this).children('input').val() == 1) {
			$(this).children(".credits--s").hide()
		} else {
			$(this).children(".credits--s").show();
		}
	})

	// Highlight 30 credit warning if under
	if (first_year_credits < 30) {
		$(".rendered .note--recommended-credits").addClass("alerted");
		if ( $("body.second-warning").length == 0 ) {
			alert("Attention: You need to take 30 credits your first year to be on track to graduate by " + planned_graduation);

			if ( $("body.first-warning").length == 0 ) {
				$("body").addClass('first-warning');
			} else {
				$("body").addClass('second-warning');
			}
		}
	} else {
		$(".rendered .note--recommended-credits").removeClass("alerted");
	}

	// Highlight 12 credit warning if under
	if ((spring_credits < 12) || (fall_credits < 12)) {
		$(".rendered .note--full-time-status").addClass("alerted");
	} else {
		$(".rendered .note--full-time-status").removeClass("alerted");
	}

	// POPULATE THE CHART

	// Extrapolate year one
	$(".plan__semester--Spring .total__value").html(spring_credits);
	$(".plan__semester--Fall .total__value").html(fall_credits);

	if (use_existing_credits) {
		if (first_semester == 'Spring') {
			$(".plan__semester--Spring:not(:first) .total__value").html(fall_credits);
		} else {
			$(".plan__semester--Fall:not(:first) .total__value").html(spring_credits);
		}
	}

	// Extrapolate summer/winter classes only if that's part of the plan
	if (summer_winter_classes) {
		$(".plan__semester--Summer .total__value").html(summer_credits);

		// skip the winter session if we're building this for a split semester school
		if (!split_semester) {
			$(".plan__semester--Winter .total__value").html(winter_credits);
		}
	} else {
		$(".plan__semester--Summer .total__value").html("0");

		// skip the winter session if we're building this for a split semester school
		if (!split_semester) {
			$(".plan__semester--Winter .total__value").html("0");
		}		
	}

	// Remove extra semesters
	$(".plan__year").show();
	$(".plan__year").removeClass('graduation_year');
	$('.plan__semester--Fall').show();
	$('.plan__semester--Spring').show();
	$('.plan__semester--Summer').show();
	$('.plan__semester--Winter').show();

	$(".plan__year").each(function() {

		var year = $(this).attr('id').split("--")[1];

		// Zero out and hide extra semesters
		if (first_semester == 'Spring') {
			if (planned_graduation_month == 'January') {

				if (year > planned_graduation_year - 1) {
					$(this).find('.plan__semester .total__value').html("0");
					$(this).hide();
				}
				if (year == planned_graduation_year - 1) {
					$(this).addClass('graduation_year')
				}

			} else {

				if (year > planned_graduation_year) {
					$(this).find('.plan__semester .total__value').html("0");
					$(this).hide();
				}
				if (year == planned_graduation_year) {
					$(this).addClass('graduation_year')
					$(this).find('.plan__semester--Fall').hide();
					$(this).find('.plan__semester--Fall .total__value').html("0");
					$(this).find('.plan__semester--Winter').hide();
					$(this).find('.plan__semester--Winter .total__value').html("0");
					$(this).find('.plan__semester--Summer').hide();
					$(this).find('.plan__semester--Summer .total__value').html("0");
				}

			}
		} else {
			if (planned_graduation_month == 'January') {

				if (year > planned_graduation_year - 1) {
					$(this).find('.plan__semester .total__value').html("0");
					$(this).hide();
				}
				if (year == planned_graduation_year - 1) {
					$(this).addClass('graduation_year')
					$(this).find('.plan__semester--Spring').hide();
					$(this).find('.plan__semester--Spring .total__value').html("0");
					$(this).find('.plan__semester--Summer').hide();
					$(this).find('.plan__semester--Summer .total__value').html("0");
				}

			} else {

				if (year > planned_graduation_year - 1) {
					$(this).find('.plan__semester .total__value').html("0");
					$(this).hide();
				}
				if (year == planned_graduation_year - 1) {
					$(this).addClass('graduation_year')
					$(this).find('.plan__semester--Summer').hide();
					$(this).find('.plan__semester--Summer .total__value').html("0");
				}

			}
		}

	})

	// REMOVE EXTRA CREDITS
	var raw_total_credits = rawCount();

	if (raw_total_credits > required_credits) {
		$($(".plan__semester--Winter:not(:first)").get().reverse()).each(function() {
			var current_surplus = rawCount() - required_credits;
			var this_value = parseInt($(this).find('.total__value').html());
			if (current_surplus >= this_value) {
				$(this).find('.total__value').html("0")
			} else {
				$(this).find('.total__value').html(this_value - current_surplus)
			}
		});
	}
	if (raw_total_credits > required_credits) {
		$($(".plan__semester--Summer:not(:first)").get().reverse()).each(function() {
			var current_surplus = rawCount() - required_credits;
			var this_value = parseInt($(this).find('.total__value').html());
			if (current_surplus >= this_value) {
				$(this).find('.total__value').html("0")
			} else {
				$(this).find('.total__value').html(this_value - current_surplus)
			}
		});
	}
	if (raw_total_credits > required_credits) {
		$($(".plan__year:not(:first) .plan__semester").get().reverse()).each(function() {
			var current_surplus = rawCount() - required_credits;
			var this_value = parseInt($(this).find('.total__value').html());

			if (this_value > 11) {
				if (current_surplus >= (this_value - 12)) {
					$(this).find('.total__value').html("12")
				} else {
					$(this).find('.total__value').html(this_value - current_surplus)
				}
			}

		});
	}

	// Sum semesters by year
	var extrapolated_credits = 0;

	$(".plan__year").each(function() {

		var year_credits = 0;

		$(this).find('.total__value').each(function() {
			year_credits += parseInt($(this).html());
		})

		if (year_credits == 1) {
			$(this).find('.plan__year__total').html(year_credits + " Credit")
		} else {
			$(this).find('.plan__year__total').html(year_credits + " Credits")
		}

		extrapolated_credits += year_credits;

	});

	// Toggle on/offtrack message
	if(extrapolated_credits >= required_credits) {
		$('.status__ontrack').show();
		$('.status__offtrack').hide();
	} else {
		$('.status__ontrack').hide();
		$('.status__offtrack').show();
	}

	// Populate credit total & over/under messages
	$('.plan__total-credits__count').html(extrapolated_credits)

	var surplusCredits = 0;

	if (extrapolated_credits > required_credits) {
		surplusCredits = extrapolated_credits - required_credits;

		if (surplusCredits == 1) {
			$('.plan__total-credits__count').html(required_credits + " (Plus " + surplusCredits + " Extra Credit)")
		} else if (surplusCredits > 1) {
			$('.plan__total-credits__count').html(required_credits + " (Plus " + surplusCredits + " Extra Credits)")
		}
	}

	if (extrapolated_credits < required_credits) {
		underCredit = required_credits - extrapolated_credits;

		if (underCredit == 1) {
			$('.plan__total-credits__count').append(" (" + underCredit + " credit short)")
			$('.status__deficit').html(underCredit + " credit ")
		} else if (underCredit > 1) {
			$('.plan__total-credits__count').append(" (" + underCredit + " credits short)")
			$('.status__deficit').html(underCredit + " credits ")
		}
	}

}

function colorSlider(sliderSelector,value) {

	$(sliderSelector).find(".slider__box").removeClass("slider__box--filled")
	for (i = 0; i <= value; i++) {
		$(sliderSelector).find(".slider__box--"+i).addClass("slider__box--filled")
	}

	$(sliderSelector).find("input").val(value);

}

function rawCount() {
	var raw_total_credit_count = 0;
	$('.total__value').each(function() {
		raw_total_credit_count += parseInt($(this).html())
	})

	return raw_total_credit_count;
}
