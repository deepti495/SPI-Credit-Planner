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
    	renderChart();
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

	if (summer_winter_classes) {
		$("#sliders").addClass('summer-winter-classes')
	} else {
		$("#sliders").removeClass('summer-winter-classes')
	}

	console.log(planned_graduation);
	console.log(required_creidts);
	console.log(fall_credits);
	console.log(spring_credits);
	console.log(summer_credits);
	console.log(winter_credits);
	console.log(use_existing_credits);
	console.log(existing_credits);
	console.log(summer_winter_classes);
	console.log(split_semester);


}

function handleSlider(slider) {

	// this sets the gradient for one slider to the correct color stops
	// needs a prepared <style> tag created by initSliders()

}

