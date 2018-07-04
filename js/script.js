var btnAppearance = document.querySelector(".search-hotel-button");
var popup = document.querySelector(".search-hotel-form");
var dateFocus = document.querySelector(".date");

var plusAdults = document.querySelector(".adults-icon-plus");
var minusAdults = document.querySelector(".adults-icon-minus");
var outputAdults = document.getElementById("quantity-adults");

var plusChildren = document.querySelector(".children-icon-plus");
var minusChildren= document.querySelector(".children-icon-minus");
var outputChildren = document.getElementById("quantity-children");

var dateEntry = document.querySelector("[name=date-entry]");
var dateDeparture = document.querySelector("[name=date-departure]");

var isStorageSupport = true;
var storageAdults = "";
var storageChildren = "";

//проверка работы localStorage и присвоение значений переменным из памяти
try {
	storageAdults = localStorage.getItem("Adults");
	storageChildren = localStorage.getItem("Children");
	} catch (err) {
	isStorageSupport = false;
	}

//обработка счётчика количества взрослых и детей
plusAdults.addEventListener("click", function() {
	outputAdults.value = parseInt(outputAdults.value)+1;
});

minusAdults.addEventListener("click", function() {
	if (outputAdults.value>0) {
	outputAdults.value = parseInt(outputAdults.value)-1;
	}	
});

plusChildren.addEventListener("click", function() {
	outputChildren.value = parseInt(outputChildren.value)+1;
});


minusChildren.addEventListener("click", function() {
	if (outputChildren.value>0) {
		outputChildren.value = parseInt(outputChildren.value)-1;
	}
});

//настройка отображения карты
function mapmap () {
	var Sedona = {lat: 34.8697400, lng: -111.7609900};
	map = new google.maps.Map(document.getElementById('map'), {
	center: Sedona,
	zoom: 9,
	disableDefaultUI: true,
	zoomControl: true,
	zoomControlOptions: {position: google.maps.ControlPosition.LEFT_TOP},
	fullscreenControl: true
	});

	var marker = new google.maps.Marker({
	position: Sedona,
	map: map});
}

//обработка события вызова формы Поиска гостиницы в Седоне
btnAppearance.addEventListener("click", function(evt) {
	evt.preventDefault();
	popup.classList.toggle("show-hotel-form");
	if (!dateFocus.value) {
		dateFocus.focus();
	}

	if (storageAdults&&storageChildren) {
		outputAdults.value = storageAdults;
		outputChildren.value = storageChildren;
	}
});

//запись значений счётчиков количества взрослых и детей в localStorage 
popup.addEventListener("submit", function(evt) {
	if (!dateEntry.value||!dateDeparture.value) {
		evt.preventDefault();
		console.log("Необходимо ввести даты.");
	}

	if (!outputAdults.value||!outputChildren.value) {
		evt.preventDefault();
		console.log("Необходимо задать количество детей и взрослых.");
	} else {
		if (isStorageSupport) {
		storageAdults = localStorage.setItem("Adults", outputAdults.value);
		storageChildren = localStorage.setItem("Children", outputChildren.value)
		}
	}
});