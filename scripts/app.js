
(function() {
  'use strict';

  var app = {
    isLoading: true,
    visibleCards: {},
    selectedCities: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    addDialog: document.querySelector('.dialog-container'),
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };


  document.getElementById('butRefresh').addEventListener('click', function() {
    // Refresh all of the forecasts
    app.updateForecasts();
  });

  document.getElementById('butAdd').addEventListener('click', function() {
    // Open/show the add new city dialog
    app.toggleAddDialog(true);
  });

  document.getElementById('butAddCity').addEventListener('click', function() {
    // Add the newly selected city
    var select = document.getElementById('selectCityToAdd');
    var selected = select.options[select.selectedIndex];
    var key = selected.value;
    var label = selected.textContent;
    // TODO init the app.selectedCities array here
    app.getForecast(key, label);
    // TODO push the selected city to the array and save here
    app.toggleAddDialog(false);
  });

  document.getElementById('butAddCancel').addEventListener('click', function() {
    // Close the add new city dialog
    app.toggleAddDialog(false);
  });

  // Toggles the visibility of the add new city dialog.
  app.toggleAddDialog = function(visible) {
    if (visible) {
      app.addDialog.classList.add('dialog-container--visible');
    } else {
      app.addDialog.classList.remove('dialog-container--visible');
    }
  };

  // Updates a weather card with the latest weather forecast. If the card
  // doesn't already exist, it's cloned from the template.
  app.updateForecastCard = function(data) {
    var dataLastUpdated = new Date(data.created);
    var sunrise = data.channel.astronomy.sunrise;
    var sunset = data.channel.astronomy.sunset;
    var current = data.channel.item.condition;
    var humidity = data.channel.atmosphere.humidity;
    var wind = data.channel.wind;

    var card = app.visibleCards[data.key];
    if (!card) {
      card = app.cardTemplate.cloneNode(true);
      card.classList.remove('cardTemplate');
      card.querySelector('.location').textContent = data.label;
      card.removeAttribute('hidden');
      app.container.appendChild(card);
      app.visibleCards[data.key] = card;
    }

    // Verifies the data provide is newer than what's already visible
    // on the card, if it's not bail, if it is, continue and update the
    // time saved in the card
    var cardLastUpdatedElem = card.querySelector('.card-last-updated');
    var cardLastUpdated = cardLastUpdatedElem.textContent;
    if (cardLastUpdated) {
      cardLastUpdated = new Date(cardLastUpdated);
      // Bail if the card has more recent data then the data
      if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
        return;
      }
    }
    cardLastUpdatedElem.textContent = data.created;

    card.querySelector('.description').textContent = current.text;
    card.querySelector('.date').textContent = current.date;
    card.querySelector('.current .icon').classList.add(app.getIconClass(current.code));
    card.querySelector('.current .temperature .value').textContent =
      Math.round(current.temp);
    card.querySelector('.current .sunrise').textContent = sunrise;
    card.querySelector('.current .sunset').textContent = sunset;
    card.querySelector('.current .humidity').textContent =
      Math.round(humidity) + '%';
    card.querySelector('.current .wind .value').textContent =
      Math.round(wind.speed);
    card.querySelector('.current .wind .direction').textContent = wind.direction;
    var nextDays = card.querySelectorAll('.future .oneday');
    var today = new Date();
    today = today.getDay();
    for (var i = 0; i < 7; i++) {
      var nextDay = nextDays[i];
      var daily = data.channel.item.forecast[i];
      if (daily && nextDay) {
        nextDay.querySelector('.date').textContent =
          app.daysOfWeek[(i + today) % 7];
        nextDay.querySelector('.icon').classList.add(app.getIconClass(daily.code));
        nextDay.querySelector('.temp-high .value').textContent =
          Math.round(daily.high);
        nextDay.querySelector('.temp-low .value').textContent =
          Math.round(daily.low);
      }
    }
    if (app.isLoading) {
      app.spinner.setAttribute('hidden', true);
      app.container.removeAttribute('hidden');
      app.isLoading = false;
    }
  };


  app.getForecast = function(key, label) {
    var statement = 'select * from weather.forecast where woeid=' + key;
    var url = 'https://query.yahooapis.com/v1/public/yql?format=json&q=' +
        statement;
    // TODO add cache logic here

    // Fetch the latest data.
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          var response = JSON.parse(request.response);
          var results = response.query.results;
          results.key = key;
          results.label = label;
          results.created = response.query.created;
          app.updateForecastCard(results);
        }
      } else {
        // Return the initial weather forecast since no data is available.
        app.updateForecastCard(initialWeatherForecast);
      }
    };
    request.open('GET', url);
    request.send();
  };

  // Iterate all of the cards and attempt to get the latest forecast data
  app.updateForecasts = function() {
    var keys = Object.keys(app.visibleCards);
    keys.forEach(function(key) {
      app.getForecast(key);
    });
  };

  
  $(document).ready(function(){ 
<<<<<<< HEAD
  
	initStartPage();
  
=======


//parsing dimon api and output set of catrgory;
    $.ajax({
      url: 'https://museapp.herokuapp.com/api/v1/categories',
      dataType: 'json',
      type: 'get',
      cache: false,
      success: function(data){
        $(data).each(function(index, value){
          var name = 'Название';
          var oldHtml = $('#category').html();
          var category = $('#category').html('<div class="category" id="'+ value.id +'"><div class="image_block" '+
            'style="background: url('+value.photo_url+');'+
            'background-size: cover;background-position: center center;"></div>'+
            '<div class="description_block center"> <h3>'+ 
             name +'</h3> <p class="fs_12">' + value.short_description + '</p></div></div>' + oldHtml);
        });
      }
    });

      $('#1').click(function(){
        console.log('!!!');
      $('#listHistory').show();
      $('#main_page').hide();
    });



>>>>>>> a63c966629c2942afaa3ff0573b81f3b6fc21bf6
  });

  function initStartPage(){
	  //parsing dimon api and output set of catrgory;
		$.ajax({
		  url: 'https://museapp.herokuapp.com/api/v1/categories',
		  dataType: 'json',
		  type: 'get',
		  cache: false,
		  success: function(data){
			$(data).each(function(index, value){
			  var name = value.name;
			  var oldHtml = $('#category').html();
			  var category = $('#category').html('<div class="category" id="category_'+ value.id +'"><div id="image_block_'+ value.id +'"class="image_block" '+
				'style="background: url('+value.photo_url+');'+
				'background-size: cover;background-position: center center;"></div>'+
				'<div class="description_block center"> <h3>'+ 
				 name +'</h3> <p class="fs_12">' + value.short_description + '</p></div></div>' + oldHtml);
				
			});
		  }
		});
  }
  
  $("#category_1").click(function(){
		//history museums
		 $.ajax({
		  url: 'https://museapp.herokuapp.com/api/v1/categories/1/museums',
		  dataType: 'json',
		  type: 'get',
		  cache: false,
		  success: function(data){
		  $("#museumsListHistory").prepend('<h2 class=\"main_category\">Исторические:</h2>');
			$(data).each(function(index, value){
			  var museum = "<div class=\"card_museams\" id=\"itemHistory_"+value.id+"\"><div class=\"museums animated fadeInUp\"><div class=\"image_block_museums first_categ\" style=\"background: url("+value.photo_url+");background-size: cover;background-position: center;\"></div><div class=\"description_block_museums center\"><h3>"+value.name+"</h3><p class=\"fs_12\">"+value.short_description+"</p></div></div></div>";
			  $("#museumsListHistory").append(museum);
			});
		  }
		});
	
		$('#categoryContainer').addClass('hidden');
		$('#museumsListHistory').removeClass('hidden');
	});
	  
	  $("#category_2").click(function(){
		//art museums
		$.ajax({
		  url: 'https://museapp.herokuapp.com/api/v1/categories/2/museums',
		  dataType: 'json',
		  type: 'get',
		  cache: false,
		  success: function(data){
		  $("#museumsListArt").prepend('<h2 class=\"main_category\">Художественные:</h2>');
			$(data).each(function(index, value){
			  var museum = "<div class=\"card_museams\" id=\"itemHistory_"+value.id+"\"><div class=\"museums animated fadeInUp\"><div class=\"image_block_museums first_categ\" style=\"background: url("+value.photo_url+");background-size: cover;background-position: center;\"></div><div class=\"description_block_museums center\"><h3>"+value.name+"</h3><p class=\"fs_12\">"+value.short_description+"</p></div></div></div>";
			  $("#museumsListArt").append(museum);
			});
		  }
		});
	
		$('#categoryContainer').addClass('hidden');
		$('#museumsListArt').removeClass('hidden');
	});
	  
	  $("#category_3").click(function(){
		//techniq museums
		$.ajax({
		  url: 'https://museapp.herokuapp.com/api/v1/categories/3/museums',
		  dataType: 'json',
		  type: 'get',
		  cache: false,
		  success: function(data){
		  $("#museumsListTechniq").prepend('<h2 class=\"main_category\">Научно-технические:</h2>');
			$(data).each(function(index, value){
			  var museum = "<div class=\"card_museams\" id=\"itemHistory_"+value.id+"\"><div class=\"museums animated fadeInUp\"><div class=\"image_block_museums first_categ\" style=\"background: url("+value.photo_url+");background-size: cover;background-position: center;\"></div><div class=\"description_block_museums center\"><h3>"+value.name+"</h3><p class=\"fs_12\">"+value.short_description+"</p></div></div></div>";
			  $("#museumsListTechniq").append(museum);
			});
		  }
		});
		
		$('#categoryContainer').addClass('hidden');
		$('#museumsListTechniq').removeClass('hidden');
	});
  
  

})();
