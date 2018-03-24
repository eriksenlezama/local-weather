(function(){
   var bgLink = {
         ThunderStorm: "url(http://extrawall.net/images/wallpapers/529_1920x1080_thunderstorm_over_grand_canyon.jpg)",
         Drizzle: "url(https://www.gloucestercitizen.co.uk/images/localworld/ugc-images/276271/Article/images/21342065/6290248-large.jpg)",
         Rain: "url(http://runlifthavefun.com/wp-content/uploads/2014/11/A-Rainy-Day.jpg)",
         Snow: "url(https://iskin.co.uk/wallpapers/styles/1920x1080/public/snow_drifts.jpg)",
         Clear: "url(http://images.wisegeek.com/green-land-with-blue-skies.jpg)",
         Clouds: "url(http://images.intellicast.com/App_Images/Resources/Clouds/figure11.jpg)",
         Mist: "url(http://static5.businessinsider.com/image/5390bbeb6bb3f7407d6ba579/why-different-weather-apps-give-you-different-forecasts.jpg)",
       }
 
   // if there is location, getdata (API)
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getData);
   } else {
      document.getElementById('country').innerHTML = "Geolocation is not supported by this browser.";
   }
  
   function getData(position){
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
            var objWeather = JSON.parse(this.responseText);
            document.getElementById("name").innerHTML = objWeather.name;
            document.getElementById("country").innerHTML = objWeather.sys.country;
            document.getElementById("temp").innerHTML = Math.round(objWeather.main.temp);
            document.getElementById("weather-description").innerHTML = objWeather.weather[0].description;
            document.getElementById("icon").src = objWeather.weather[0].icon;
            document.body.style.backgroundImage = bgLink[objWeather.weather[0].main];
         }
      };
      var link = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
      xmlhttp.open("GET", link, true);
      xmlhttp.send();
   }

   var f = document.getElementById('far');
   var c = document.getElementById('cel');

   f.addEventListener('click', function(e){
      convert(e);
   });
   c.addEventListener('click', function(e){
      convert(e);
   });
   
   var estado = "c";
   
   function convert(e){
      var tempP = document.getElementById('temp');
      var temp = 0;
      
      if(e.target == f && estado == "c"){
         document.getElementById('mode').innerHTML = " ° F";
         temp = parseInt(tempP.innerHTML);
         temp = (temp * 9 / 5) + 32;
         tempP.innerHTML = Math.round(temp);
         estado = "f";
         
      }
      if(e.target == c && estado == "f"){
         document.getElementById('mode').innerHTML = " ° C";
         temp = parseInt(tempP.innerHTML);
         temp = (temp - 32) * 5 / 9;
         tempP.innerHTML = Math.round(temp);
         estado = "c";
      }
   }
    
})();
  
  