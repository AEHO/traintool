$(document).ready(function(){
	//Selectors
	var $addExercicio = $("#addExercicio");
	var $daysDiv = $("#daysDiv");
	var $exerciciosDiv = $("#exerciciosDiv");
	var $openExerciciosMenus = $(".list-group-item.clickable");
	var $open_panel = $(".open-panel");

	var daysContracted = false;
	var listOptions = {
		valueNames: ['name']
	};
	var exList = new List('exerciciosDiv', listOptions);
	$exerciciosDiv.hide();

	//Functions
	var toggleExerciciosDiv = function(){
		if(daysContracted){
			setTimeout(function(){
				$exerciciosDiv.toggle();
				slideToFocus($exerciciosDiv);
			}, slideTime + 10);
		}else{
			$exerciciosDiv.toggle();
			slideToFocus($exerciciosDiv);
		}
	}

	var toggleContractionDiv = function($element, state0, state1, always){
		$element.toggleClass('col-lg-'+state0);
		$element.toggleClass('col-lg-'+state1);
		if(always)
			always();
	}

	var toggleExerciciosList = function(){
		daysContracted = !daysContracted;
		toggleContractionDiv($daysDiv, 12, 8);
		toggleContractionDiv($exerciciosDiv, 1, 4, toggleExerciciosDiv);
	}

	doOnClick($addExercicio, toggleExerciciosList);

	$openExerciciosMenus.each(function(){
		var openNext = function(){
			$(this).next().find("div").fadeToggle();
		}

		$this = $(this);
		doOnClick($this, openNext);
	});

	$open_panel.each(function(){
		$(this).find("div").hide();
	})
});