$(function() {

    $(".setup__skip").click(function() {
    	renderChart();
    });

    $(".button--setup").click(function() {
    	if ($(".setup__question--inactive").length) {
	    	$(".setup__question--active").addClass("setup__question--answered").removeClass("setup__question--active")
	    	$(".setup__question--inactive").first().addClass("setup__question--active").removeClass("setup__question--inactive");
    	} else {
    		renderChart();
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

});

function renderChart() {
	$('body').removeClass("configure").addClass("rendered");
}

function handleSlider(slider) {

	// this sets the gradient for one slider to the correct color stops
	// needs a prepared <style> tag created by initSliders()

}

