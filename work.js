$("#getweather").click(function(){
    $('#resulttable').hide();
   console.log("button clicked");
   const cityname=$('#cityInput').val();
   console.log(cityname);

   $.ajax({
    type: 'GET',
    url: 'http://samples.openweathermap.org/data/2.5/weather?q=${cityname},uk&appid=b6907d289e10d714a6e88b30761fae22',
    
    success: function(resp) {
        const currenttemp=Math.round(resp.main.temp-273);
        const currenthumidiy=resp.main.humidity;
        const currentpressure=resp.main.pressure;
        $("#temp").html(currenttemp);
        $('#humidity').html(currenthumidiy);
        $('#pressure').html(currentpressure);
        $('#resulttable').show();
        
    },
    error: function() {
        console.log("unable to recover data");  
    }
  });

});

$("#getforecast").click(function(){
    $('#resulttable').hide();
   console.log("button clicked");
   const cityname=$('#cityInput').val();
   console.log(cityname);

   $.ajax({
    type: 'GET',
    url: 'http://samples.openweathermap.org/data/2.5/forecast?q=${cityname},us&appid=b6907d289e10d714a6e88b30761fae22',
    
    success: function(data) {
        console.log(data);
        listOfDates = data.list.map(function(ele){return new Date(ele.dt)});
        console.log(listOfDates);
        listofTemp =data.list.map(function(ele){ return Math.round(ele.main.temp-270)});
        console.log(listofTemp);
        plotchart(listOfDates,listofTemp)
        
    },
    error: function() {
        console.log("unable to recover data");  
    }
  });

});

function plotchart(listOfDates,listofTemp)
{

    Highcharts.chart('container', {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Monthly Average Temperature'
        },
        subtitle: {
          text: 'Source: WorldClimate.com'
        },
        xAxis: {
          categories: listOfDates
        },
        yAxis: {
          title: {
            text: 'Temperature (°C)'
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: false
          }
        },
        series: [{
          data: listofTemp
        }]
      });

}