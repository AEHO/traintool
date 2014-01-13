$(document).ready(function(){
	//Jquery selectors
	var $loginToggle = $('#login_toggle');
	var $loginNavForm = $('#login_nav_form');

	//Functions
	var slideDownElementCreator = function(element, alwaysFunction){
		return function(e){
			e.preventDefault();
			element.removeClass('hide');
			element.hide();
			element.slideDown(slideTime);
			alwaysFunction();
		}
	}

	var hideElementCreator = function(element){
		return function(){
			element.hide();
		}
	}

	var showOnClick = function(clickableElement, hiddenElement, alwaysFunction){
		clickableElement.on('click',
			slideDownElementCreator(hiddenElement, alwaysFunction)
		);
	};

	//Misc vars
	var slideTime = 300;
	var hideLoginBtn = hideElementCreator($loginToggle);

	//Events handlers
	showOnClick($loginToggle, $loginNavForm, hideLoginBtn);
});