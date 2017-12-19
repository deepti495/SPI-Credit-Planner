const handlebars = require('handlebars');
const moment = require('moment');

let helpers = {};

helpers['url-encode'] = (source) => {
  let tweetText = encodeURIComponent(source);
  return tweetText;
};

helpers['graduation-options'] = (defaultYear, defaultMonth, earlyGrad, lateGrad) => {

  let html = '<select  id="select--planned-graduation">\n';

  let defaultDate = parseInt(defaultYear);

  if (defaultMonth == 'May') {
    defaultDate += 0.5;
  }

  let earlyDate = defaultDate - (parseInt(earlyGrad) * 0.5);
  let lateDate = defaultDate + (parseInt(lateGrad) * 0.5);

  let currentDate = earlyDate;

  while (currentDate <= lateDate) {
    html += '\t<option data-extended="' + (2 + (currentDate - defaultDate)) + ' years';
    if (currentDate == defaultDate) {
      html += ' (On Time)';
    }
    html += '" data-label="';
    if ((currentDate % 1) == 0) {
      html += 'January '
    } else {
      html += 'May '
    }
    html += Math.floor(currentDate) + '" ';
//    html += "data-value='" + (2 + (currentDate - defaultDate)) + "' "
    html += 'value="';
    if ((currentDate % 1) == 0) {
      html += 'January '
    } else {
      html += 'May '
    }
    html += Math.floor(currentDate);
    html += '"';
    if (currentDate == defaultDate) {
      html += ' selected';
    }
    html += ">";
    if ((currentDate % 1) == 0) {
      html += 'January '
    } else {
      html += 'May '
    }
    html += Math.floor(currentDate) + " - " + (2 + (currentDate - defaultDate)) + " years";
    if (currentDate == defaultDate) {
      html += ' (On Time)';
    }
    html += '</option>\n';
    currentDate += 0.5;
  }

  html += '</select>';

  return html;
}


helpers['existing-credits'] = (min, max, defaultCredits) => {

  let html = '<select id="select--existing-credits">';

  let current = min;

  while (current <= max) {
    html += "<option value='" + current + "'";
    if (current == defaultCredits) {
      html += " selected"
    }
    html += ">"
    html += current;
    html += "</option>";
    current++;
  }

  html += "</select>";

  return html;
}


helpers['semester-sliders'] = (startSemester, splitSemester) => {

  let html = '';
  let semesters = ['Fall','Winter','Spring','Summer'];

  if (startSemester == 'Spring') {
    semesters = ['Spring','Summer','Fall','Winter'];
  }

  if (splitSemester) {
    semesters = ['Fall', 'Spring', 'Summer'];

    if (startSemester == 'Spring') {
      semesters = ['Spring', 'Summer', 'Fall'];
    }
  }

  for (var semester of semesters) {
    html += '<div  id="slider__boxes--' + semester + '" class="sliders__slider';
    if ((semester == 'Spring') || (semester == 'Fall')) {
      html += ' slider--primary';
    }
    html += '">';
    html += '<h4>' + semester
    if (splitSemester && ((semester == 'Spring') || (semester == 'Fall'))) {
      html += ' I & II';
    }
    html += '</h4>';

    html += "<div class='slider__boxes'>"
    var counter = 20;
    while (counter > 0) {
      html += "<div class='slider__box slider__box--" + counter;
      if (((semester == 'Spring') || (semester == 'Fall')) && counter <= 15) {
        html += " slider__box--filled' "
      }
      html += "' data-value='" + counter + "' data-semester='" + semester + "'>" + counter + "</div>";

      counter--;
    }
    html += '</div>'

    html += '<div class="slider--buttons"><button class="button--slider-controls button--slider-controls--add" data-for="' + semester + '">+</button>';
    html += '<button class="button--slider-controls button--slider-controls--remove" data-for="' + semester + '">&ndash;</button></div>';
    html += '<div class="slider__value"><input';
    if ((semester == 'Spring') || (semester == 'Fall')) {
      html += ' value="15" ';
    } else {
      html += ' value="0" ';
    }
    html += 'id="slider__value--' + semester + '" type="text"><br>Credit<span class="credits--s">s</span></div>'
    html += '</div>';
  }

  return html;
}

helpers['plan-chart'] = (startSemester, startYear, lateGrad, splitSemester) => {

  let html = '';
  let semesters = ['Fall','Winter','Spring','Summer'];

  if (startSemester == 'Spring') {
    semesters = ['Spring','Summer','Fall','Winter'];
  }

  if (splitSemester) {
    semesters = ['Fall', 'Spring', 'Summer'];

    if (startSemester == 'Spring') {
      semesters = ['Spring', 'Summer', 'Fall'];
    }
  }

  let totalYears = Math.ceil(2 + (parseInt(lateGrad) * 0.5));
  let currentYear = 0;

  while (currentYear < totalYears) {
    html += "<div class='plan__year' id='plan__year--" + (parseInt(startYear) + currentYear) + "'>";
    html += "<h4>";
    if(currentYear == 0) {
      html += "Planned";
    } else {
      html += "Potential"
    }
    html += " Year ";
    switch (currentYear) {
      case 0:
        html += "One";
        break;
      case 1:
        html += "Two";
        break;
      case 2:
        html += "Three";
        break;
      case 3:
        html += "Four";
        break;
      case 4:
        html += "Five";
        break;
      case 5:
        html += "Six";
        break;
    }
    html += " " + (parseInt(startYear) + currentYear)
    html += " &mdash; <span class='plan__year__total--" + (parseInt(startYear) + currentYear) +"'>30 credits</span></h4>"

    for (var semester of semesters) {
      html += '<div class="plan__semester" id="' + semester + "-" + (parseInt(startYear) + currentYear) + '">';
      html += '<h5>' + semester + '</h5>';
      html += '<div class="plan__semester__total">0 Credits</div>';
      html += '</div>';
    }

    html += '<div class="plan__planned-graduation">Planned<br>Graduation</div>';
    html += "</div>";
    currentYear++;
  }

  return html;
}

helpers['tag-generator'] = (source) => {
  let tag =  "<" + source.tagName;
  if (source.content) {
  	tag += ">" + source.content + "</" + source.tagName + ">";
  	return tag;
  }
  if (source.attributes) {
  	let i = 0;
  	for (attribute in source.attributes) {
  		if( Object.values(source.attributes)[0] != "twitter:card" ) {
	  		tag += " " + Object.keys(source.attributes)[i] + "='" + Object.values(source.attributes)[i] + "'"
	  		i++;
	  	}
	  }
	}
  tag += ">"
  return tag;
};

module.exports = helpers;