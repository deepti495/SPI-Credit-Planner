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
    	var semester = sliderID.substr(sliderID.indexOf("--") + 2);;

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
	var required_creidts = $("#select--required-credits").val();
	var fall_credits = parseInt($("#slider__value--Fall").val());
	var spring_credits = parseInt($("#slider__value--Spring").val());
	var summer_credits = parseInt($("#slider__value--Summer").val());
	var winter_credits = parseInt($("#slider__value--Winter").val());
	if ($("#select--existing-credits").length != 0) {
		var use_existing_credits = true;
		var existing_credits = $("#select--existing-credits").val();
	} else {
		var use_existing_credits = false;
	}
	if ($("#select--summer-classes").val() == 'summers-winters-yes') {
		var summer_winter_classes = true;
	} else {
		var summer_winter_classes = false;
	}
	if ($(".sliders__slider").length == 3) {
		var split_semester = true;
	} else {
		var split_semester = false;
	}

	// Disable summer and winter semsester UI
	if (summer_winter_classes) {
		$("#sliders").addClass('summer-winter-classes');
	} else {
		$("#sliders").removeClass('summer-winter-classes');
	}

	// Set existing number of credits for the 1st semester (if any)
	if (use_existing_credits) {
		$("#sliders").addClass('use-existing-credits');
		$(".sliders__slider:first-child .slider__value input").val(existing_credits);
		$(".sliders__slider:first-child .slider__value input").prop('disabled',true)
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

}

function colorSlider(sliderSelector,value) {

	$(sliderSelector).find(".slider__box").removeClass("slider__box--filled")
	for (i = 0; i <= value; i++) {
		$(sliderSelector).find(".slider__box--"+i).addClass("slider__box--filled")
	}

	$(sliderSelector).find("input").val(value);

}

