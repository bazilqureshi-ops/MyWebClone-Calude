var ToolBoxPosition = false;
var PropertiesPosition = false;
var TotalID = 0;
let currentElement;
let currentElementId;
let currentElementName;
let currentElementX;
let currentElementY;
let copyElement;
const xArrow = $('#x-arrow');
const yArrow = $('#y-arrow');
let pagePropsActive = false,
	ctrlPressed = false,
	ctrlKey = 17,
	leftArrow = 37,
	upArrow = 38,
	rightArrow = 39,
	downArrow = 40,
	deleteKey = 46,
	cKey = 67,
	vKey = 86;

$(document).ready(function () {
	$("#MainDesigner").click(function () {
		ToolBoxPosition = true;
		PropertiesPosition = true;
		ToggleProperties();
		ToggleToolBox();

		$(".uiElement").removeClass("selected");
	});

	$(".uiElement").click(function () {
		
		alert($(this).attr("name"));
		$(this).addClass("selected");
	});

	SetScaling();
});

function SetVitals() {
	let globalLeft = currentElement.get(0).style.left;

	if (globalLeft.indexOf('px') >= 0) {
		let left = parseFloat(globalLeft.replace("px", ""));

		let result = (left / currentElement.parent().width() * 100).toFixed(2);

		return globalLeft = currentElement.attr('element-left') !== result ? result : currentElement.attr('element-left');
	}
	else {
		return globalLeft = currentElement.attr('element-left');
	}
}


function draggable() {
	$(".uiElement").draggable({
		containment: "#MainDesigner",
		start: (event, ui) => {
			currentElement = $(ui.helper);

			currentElementId = currentElement.attr('id');
			currentElementName = currentElement.attr('name');

			currentElement.addClass("selected");

			SetVitals();
		},
		stop: () => {
			SetVitals();
		},
		drag: (event, ui) => {
			SetVitals();
		}
	});
}

//Draggable Selector 
function draggableSelector() {
	if (ctrlPressed) {
		$(currentElement).draggable({
			containment: "#MainDesigner",
			stack: ".uiElement",
			snap: ".uiElement",
			snapMode: "inner",
			snapTolerance: 20,
			zIndex: 100
		});
	}
	else {
		$(currentElement).draggable({
			containment: "#MainDesigner",
			stack: false,
			snap: false,
			zIndex: 100
		});
	}
}

//Make Element Resizable
function resizable() {

	$(".uiElement").resizable({
		containment: "#MainDesigner",
		start: (event, ui) => {
			currentElement = $(ui.helper);

			currentElementId = currentElement.attr('id');
			currentElementName = currentElement.attr('name');

			//Remove 'Selected' Class From All Draggable Objects
			$('.uiElement').removeClass('selected');

			//Add 'Selected' Class to Current Dragging Object
			currentElement.addClass('selected');
		},
	});
}

//Make Design Area Droppable
function droppable() {
	$('#MainDesigner').droppable({
		drop: () => {
			//Disable Arrows
			xArrow.removeClass('arrow-enabled');
			yArrow.removeClass('arrow-enabled');
		}
	});
}




function ToggleToolBox() {
    if (ToolBoxPosition) {
        $("#ToolBoxWindow").animate({
            opacity: 0.7,
            left: "-150px"
        }, 500, function () {
            ToolBoxPosition = false;
        });
    }
    else {
        $("#ToolBoxWindow").animate({
            opacity: 1,
            left: "0px"
        }, 500, function () {
            ToolBoxPosition = true;
        });
    }
}

function ToggleProperties() {
    if (PropertiesPosition) {
        $("#PropertiesWindow").animate({
            opacity: 0.7,
            right: "-350px"
        }, 500, function () {
            PropertiesPosition = false;
        });
    }
    else {
        $("#PropertiesWindow").animate({
            opacity: 1,
            right: "0px"
        }, 500, function () {
            PropertiesPosition = true;
        });
    }
}

function CreateQuestionArea() {
	var localElement = $("<div class='uiElement text-center' style='border:dotted 2px #CCC; background-color:#F5F5F5; vertical-align:center; zoom:100%;' element-left='0' element-top='0' element-width='20' element-height='5' id='element_" + TotalID + "' type='QuestionArea' align='center' font='Segoe UI' size='46px' color='#FFFFFF' font-bold='false'><i class='fa fa-question' style='font-size:48px;'></i></div>");
	$("#MainDesigner").append(localElement);

	//$(localElement).draggable({ containment:"#MainDesigner" });

	draggable();
	droppable();
	resizable();
	SetScaling();

	$(localElement).resizable({
		containment: "#MainDesigner"
	});
    
    TotalID++;
}

function CreateAnswerArea() {
	var localElement = $("<div class='uiElement text-center' style='border:dotted 2px #CCC; background-color:#F5F5F5; vertical-align:center; zoom:100%;' element-left='0' element-top='0' element-width='20' element-height='5' id='element_" + TotalID + "' type='QuestionArea' align='center' font='Segoe UI' size='46px' color='#FFFFFF' font-bold='false'><i class='fa fa-question' style='font-size:48px;'></i></div>");
	$("#MainDesigner").append(localElement);

	//$(localElement).draggable({ containment:"#MainDesigner" });

	draggable();
	droppable();
	resizable();
	SetScaling();

	$(localElement).resizable({
		containment: "#MainDesigner"
	});

	TotalID++;
}

function ApplyPageProperties() {
	$("#MainDesigner").attr("page-name", $("#page_name").val());
	$("#MainDesigner").attr("page-trigger", $("#page_trigger").val());
	$("#MainDesigner").attr("page-timeout", $("#page_timeout").val());
	$("#MainDesigner").css("background-image", "url("+$("#page_bg").val()+")");
}

function SetScaling() {
	var sceneWidth = $("#MainDesigner").width();
	var zoomFactor = ((sceneWidth / 1280) * 100).toFixed(0);
	$(".uiElement").css("zoom", zoomFactor + "%");
}