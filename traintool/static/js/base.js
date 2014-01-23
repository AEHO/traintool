$(document).ready(function(){
    //Jquery selectors
    var $loginToggle = $('#login_toggle');
    var $loginNavForm = $('#login_nav_form');

    //Functions
    slideDownElementCreator = function(element, alwaysFunction){
        return function(e){
            e.preventDefault();
            element.removeClass('hide');
            element.hide();
            element.slideDown(slideTime);
            alwaysFunction();
        }
    }

    hideElementCreator = function(element){
        return function(){
            element.hide();
        }
    }

    doOnClick = function(clickableElement, func){
        clickableElement.on('click',
            func
        );
    }

    showOnClick = function(clickableElement, hiddenElement, alwaysFunction){
        doOnClick(clickableElement, slideDownElementCreator(hiddenElement, alwaysFunction));
    };

    slideToFocus = function($element){
        $('html, body').animate({
            scrollTop: $element.offset().top
        }, 700);
    }

    //Misc vars
    slideTime = 300;
    var hideLoginBtn = hideElementCreator($loginToggle);

    //Events handlers
    showOnClick($loginToggle, $loginNavForm, hideLoginBtn);
});