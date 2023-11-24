$('.search-bar input').focus()

const API = '0e888dae44d1eff3855e3412514353e4'
const btn = $('.search-bar button')
function fetchWeather(city) {
	fetch(
		'http://api.openweathermap.org/data/2.5/weather?q=' +
			city +
			'&units=metric&appid=' +
			API
	)
		.then(response => response.json())
		.then(data => fetchDisplay(data))
}

function fetchDisplay(data) {
	if (data.cod == '404') {
		$('.temp').css('font-size', 35)
		$('.temp').css('position', 'relative')
		$('.temp').css('bottom', '150px')
		$('.humidity').css('visibility', 'hidden')
		$('.wind').css('visibility', 'hidden')
		$('img').css('visibility', 'hidden')
		$('.temp').text('Такого города нету, чупик')
	} else if ($('.search-bar input').val() == '') {
		return
	} else {
		document.querySelector('.weather').style.display = 'flex'
		document.querySelector('.weather-add').style.display = 'flex'
		$('.temp').css('font-size', 60)
		$('.temp').css('position', '')
		$('.temp').css('bottom', '0px')
		$('.humidity').css('visibility', 'visible')
		$('.wind').css('visibility', 'visible')
		$('img').css('visibility', 'visible')
	}

	if (data.weather[0].main == 'Clouds') {
		$('img').attr('src', 'cloud.png')
	} else if (data.weather[0].main == 'Rain') {
		$('img').attr('src', 'rain.png')
	} else if (data.weather[0].main == 'Snow') {
		$('img').attr('src', 'snow.png')
	} else if (data.weather[0].main == 'Haze') {
		$('img').attr('src', 'mist.png')
	} else if (data.weather[0].main == 'Clear') {
		$('img').attr('src', 'clear.png')
	}

	$('.temp').text(Math.round(data.main.temp) + '°C')
	$('.humidity span').text(data.main.humidity + '%')
	$('.wind span').text(data.wind.speed + ' КМ/Ч')
}

btn.click(() => {
	fetchWeather($('.search-bar input').val())
})

$('.search-bar input').keypress(btn => {
	if (btn.key == 'Enter') fetchWeather($('.search-bar input').val())
})
