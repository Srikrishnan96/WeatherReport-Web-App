function timeUpdate() {
    var date = new Date();
    var time = `Time ${date.getHours()<10?'0':''}${date.getHours()}:${(new Date()).getMinutes()<10?'0':''}${date.getMinutes()}`
    $('#info1').html(time);
}

$(document).ready(function() {
    $('.weather-head').hide();
    $('.weather-message').hide();
    $('.weather-info').hide();
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            setTimeout(function() {
                var weatherMessage = '';
                var { coords: { latitude, longitude } } = position;

                var url = `https://api.apixu.com/v1/current.json?key=1421ec9a50f742c9bf104309192807&q=${latitude},${longitude}`;
                
                $.getJSON(url, function(data) {
                    var date = new Date();
                    var day = date.toString().split(' ')[0];
                    const month = date.toLocaleString('default', { month: 'long' });

                    var { current: { cloud, humidity, temp_c, temp_f, wind_mph  }, location: { localtime, name, region } } = data;
                    var time = data.location.localtime.split(' ')[1];
                    console.log(date.getHours()<10?0:1)
                    $('#weather').html(`${name}, ${region}`);
                    $('.date-day').html(`${day}day, ${month} ${date.getDate()}`);
                    $('#info1').html(`Time ${date.getHours()<10?'0':''}${date.getHours()}:${date.getMinutes()<10?'0':''}${date.getMinutes()}`);
                    $('#info2').html(`${wind_mph} mph<br/>Wind Speed`);
                    $('#info3').html(`${temp_c} &#8451`);
                    $('#switch').show();
                    $('#info4').html(time);

                    var celcius = true;
                    $('#switch').on('click', function() {
                        if(celcius) {
                            $('#switch').html('Fahrenheit');
                            $('#info3').html(`${temp_f} &#8457`);
                            celcius = false;
                        }
                        else {
                            $('#switch').html('Celcius');
                            $('#info3').html(`${temp_c} &#8451`);
                            celcius = true;
                        }
                    });

                    if(cloud<=30) {
                        $('#info5').html('Clear Sky')
                    } else {
                        $('#info5').html('Cloudy')
                    }

                    $('#info6').html(`${humidity}% Humidity`);
                    if(temp_c < 20) {
                        $('.grey-jumbo').css({
                            backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/08/01/02/03/trees-2562807_960_720.jpg)'
                        })
                        weatherMessage = `Pleasant Weather`
                    } else if(temp_c <= 28) {
                        $('.loading-page').css({
                            backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/03/22/17/40/hill-2165759_960_720.jpg)'
                        });
                        weatherMessage = `Moderate Weather`
                    } else {
                        $('.loading-page').css({
                            backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/09/22/09/48/desert-2774945_1280.jpg)'
                        });
                        weatherMessage = 'Sunny Weather'
                    }
                    $('.weather-content').show();
                });
                $('.spinner').hide();
                setInterval(timeUpdate, 30000);
                setTimeout(() => {
                    $('.weather-message-text').html(weatherMessage);
                    $('.weather-message').show().addClass('animated fadeIn');
                }, 1000);
                setTimeout(() => {
                    $('.weather-info').show().addClass('animated fadeIn');
                }, 1000);
            }, 1000);
        });
    }
});