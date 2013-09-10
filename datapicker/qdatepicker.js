var DATEPICKER_CONFIG = {
    "months": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    "yearprofix": "年",
    "weekdays": ["日", "一", "二", "三", "四", "五", "六"],
    'longwdays': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    "weekstart": 0, //1为星期一 ，0为星期天
    "format": "Y-m-d",
    "showOnStart": false
}

    function DatePicker(target) {
        this.target = target;
        this.datePicker;
        this.dayContainer;
        this.dayContent;
        this.init();
    }

DatePicker.prototype.init = function(date) {
    var today = this.resetTime(new Date()),
        selectedDate = new Date(today);
    date = date ? this.resetTime(date) : new Date(selectedDate);
    var firstDate = this.getFirstDate(date)
    this.getHtml(date, firstDate, selectedDate);
    this.bindEvent();
}
DatePicker.prototype.getFirstDate = function(date) {
    var firstDate = new Date(date);
    firstDate.setDate(1);
    firstDate.setDate(1 - (7 + firstDate.getDay() - DATEPICKER_CONFIG.weekstart) % 7);
    return firstDate;
}
DatePicker.prototype.getHtml = function(date, currentDate, today) {
    var cal_container = document.createElement("div");
    cal_container.className = "cal_container";
    var cal_header = document.createElement("div");
    cal_header.className = "cal_header";
    cal_container.appendChild(cal_header);
    var date_block = document.createElement("div");
    date_block.className = "date_block";
    cal_header.appendChild(date_block);


    date_block.innerHTML = '<span class="date_array double_left prevYear"></span>\
                                <span class="date_array single_left prevMonth"></span>\
                                <span class="date_content" data-date="' + this.getFormatDate(date) + '">' + date.getFullYear() + DATEPICKER_CONFIG.yearprofix + DATEPICKER_CONFIG.months[date.getMonth()] + '</span>\
                                <span class="date_array single_right nextMonth"></span>\
                                <span class="date_array double_right nextYear"></span>';
    var cal_weekBar = document.createElement("div");
    cal_weekBar.className = "cal_weekBar";
    var ultmp = "<ul>";
    for (var i = 0; i < 7; i++) {
        ultmp += "<li>" + DATEPICKER_CONFIG.weekdays[i] + "</li>";
    }
    ultmp += "</ul>";
    cal_weekBar.innerHTML = ultmp;
    cal_container.appendChild(cal_weekBar);


    var cal_day_container = document.createElement("div");
    cal_day_container.className = "cal_day_container";
    cal_container.appendChild(cal_day_container);

    cal_day_container.innerHTML = this.generalDay(date, currentDate, today);

    var cal_footer = document.createElement("div");
    cal_footer.className = "cal_footer";
    cal_container.appendChild(cal_footer);

    this.dayContainer = cal_day_container;
    this.datePicker = cal_container;
    this.dayContent = date_block.querySelector(".date_content");
    this.attachDatePicker(this.datePicker);
}

DatePicker.prototype.attachDatePicker = function(datePicker) {
    var offsetLeft = this.target.offsetLeft,
        offsetTop = this.target.offsetTop,
        height = this.target.offsetHeight + 2;
        datePicker.style.top = offsetTop + height + "px";
        datePicker.style.left = offsetLeft + "px";
        document.body.appendChild(datePicker);
    this.target.addEventListener("click", function() {
        this.toggleDatePicker();
    }.bind(this), false);
}
DatePicker.prototype.toggleDatePicker = function() {
    if (this.datePicker.classList.contains("cal_container_fadeIn")) {
        this.datePicker.classList.remove("cal_container_fadeIn");
        this.datePicker.classList.add("cal_container_fadeOut");
    } else {
        this.datePicker.classList.remove("cal_container_fadeOut");
        this.datePicker.classList.add("cal_container_fadeIn");
    }
}

DatePicker.prototype.generalDay = function(date, currentDate, today) {
    var ultmp = "<ul>";
    for (var i = 0; i < 42; i++) {
        //console.log(currentDate.getMonth() == date.getMonth());
        if (currentDate.getMonth() != date.getMonth()) {
            ultmp += "<li class='diffMonthDate' data-date='" + this.getFormatDate(currentDate) + "'>" + currentDate.getDate() + "</li>";
        } else if (currentDate.getTime() == today.getTime()) {
            ultmp += "<li class='todayDate' data-date='" + this.getFormatDate(currentDate) + "'>" + currentDate.getDate() + "</li>";
        } else {
            ultmp += "<li  data-date='" + this.getFormatDate(currentDate) + "'>" + currentDate.getDate() + "</li>";
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    ultmp += "</ul>";
    return ultmp;
}

DatePicker.prototype.bindEvent = function() {
    this.bindDayContainerEvent();
    this.bindDayContentEvent();

}
DatePicker.prototype.bindDayContainerEvent = function() {
    var daySet = document.querySelector(".cal_day_container").querySelectorAll("li");
    for (var i = 0, node; node = daySet[i]; ++i) {
        node.addEventListener("click", function(event) {
            var target = event.target;
            this.target.value = target.getAttribute("data-date");
            this.toggleDatePicker();
        }.bind(this), false);
    }
}
DatePicker.prototype.bindDayContentEvent = function() {
    var arraySet = document.querySelectorAll(".date_array");
    for (var i = 0, node; node = arraySet[i]; ++i) {
        if (node.classList.contains("prevYear")) {

            node.addEventListener("click", function() {
                this.rebuild(this.getDayContent(), "prevYear");
            }.bind(this), false);
        } else if (node.classList.contains("prevMonth")) {
            node.addEventListener("click", function() {
                this.rebuild(this.getDayContent(), "prevMonth");
            }.bind(this), false);
        } else if (node.classList.contains("nextYear")) {
            node.addEventListener("click", function() {
                this.rebuild(this.getDayContent(), "nextYear");
            }.bind(this), false);
        } else if (node.classList.contains("nextMonth")) {
            node.addEventListener("click", function() {
                this.rebuild(this.getDayContent(), "nextMonth");
            }.bind(this), false);
        }
    }
}
DatePicker.prototype.rebuild = function(date, type) {
    switch (type) {
        case "prevYear":
            date.setFullYear(date.getFullYear() - 1);
            break;
        case "prevMonth":
            date.setMonth(date.getMonth() - 1);
            break;
        case "nextYear":
            date.setFullYear(date.getFullYear() + 1);
            break;
        case "nextMonth":
            date.setMonth(date.getMonth() + 1);
            break;
    }
    var ultmp = this.generalDay(date, this.getFirstDate(date), this.resetTime(new Date()));
    this.setDayContent(date);
    this.dayContainer.querySelector("ul").classList.add("cal_day_fadeLeft");
    this.dayContainer.innerHTML = ultmp;
    this.bindDayContainerEvent();
}
DatePicker.prototype.setDayContent = function(date) {
    this.dayContent.setAttribute("data-date", this.getFormatDate(date));
    this.dayContent.innerHTML = date.getFullYear() + DATEPICKER_CONFIG.yearprofix + DATEPICKER_CONFIG.months[date.getMonth()];
}

DatePicker.prototype.getDayContent = function() {
    var date = this.dayContent.getAttribute("data-date");
    return this.resetTime(new Date(date));
}

DatePicker.prototype.getFormatDate = function(date) {
    var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    var formatDate = DATEPICKER_CONFIG.format.replace("Y", year).replace("m", month).replace("d", day);
    return formatDate;
}
DatePicker.prototype.resetTime = function(date) {
    date.setMilliseconds(0);
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(12);
    return date;
}
window.addEventListener("load", function() {
    var datePicker = new DatePicker(document.getElementById("datePicker"));
})