var ElementCount = 1;
var DesignHeight = 0;
var args = new Array();
const xArrow = $('#x-arrow');
const yArrow = $('#y-arrow');
let pagePropsActive = false,
	currentElement,
	currenElementId = 0,
	currentElementName = '',
	ctrlPressed = false,
	elementFocus = false,
	ctrlKey = 17,
	leftArrow = 37,
	upArrow = 38,
	rightArrow = 39,
	downArrow = 40,
	deleteKey = 46,
	cKey = 67,
	vKey = 86;

let notNull = /[a-zA-Z0-9]/;

//Page Input, Selects and Etc.. => When you add new input, select or etc... declare variable as 'const', then add this item in array named 'allElements' inside of elementAction() function.
// => Page Properties
const pageTitle = $('#txtPageName'),
	pageBackground = $('#page-background'),
	pageReset = $('#reset-time'),
	pauseDesign = $('#pause-design'),

	// => Common Properties
	elementType = $('#element-type'),
	elementId = $('#element-id'),
	elementName = $('#element-name'),
	positionX = $('#position-x'),
	positionY = $('#position-y'),
	sizeX = $('#size-x'),
	sizeY = $('#size-y'),

	// => Special Properties
	background = $('#element-background'),
	caption = $('#caption'),
	dataBind = $('#data-bind'),
	textBoxAction = $('#textbox-action'),
	ticketDesignList = $('#ticket-design-list'),
	copyCount = $('#copy-count'),
	textBoxes = $('#text-boxes'),
	buttonDataBind = $('#button-data-bind'),
	atrList = $('#atr-list'),
	goToScreenSelect = $('#go-to-screen-select'),
	successPageSelect = $('#success-page-select'),
	failPageSelect = $('#fail-page-select'),
	serviceSegment = $('#service-segment-select'),
	ticketDesign = $('#ticket-design'),
	playList = $('#play-list'),

	// => Font Properties
	fontStyle = $('#font-style'),
	fontSize = $('#font-size'),
	fontColour = $('#font-colour'),
	align = $('#align'),
	valign = $('#valign'),
	fontBold = $('#font-bold'),
	fontItalic = $('#font-italic'),
	fontUnderline = $('#font-underline'),

	// => Data Integrator Properties
	serviceType = $('#ServiceType'),
	serviceUrl = $('#ServiceUrl'),
	methodBox = $('#MethodBox'),
	addArgument = $('#AddArgument'),
	argumentName = $('#argumentName'),
	textBoxList = $('#TextBoxes'),
	argumentList = $('#argument-list'),
	addReturn = $('#AddReturns'),
	returnName = $('#returnName'),
	returnTypes = $('#ReturnTypes'),
	returnList = $('#return-list'),

	// => Return Trigger Properties
	integratorName = $('#DataIntegratorName'),
	parameterList = $('#ReturnList'),
	triggerType = $('#Trigger'),
	triggerArgument = $('#TriggerArgument'),
	errorPage = $('#ErrorPages'),
	succesPage = $('#SuccesPages'),

	// => Validation Properties
	//	-Page Property Validation
	pageBackgroundValidation = $('#page-background-validation'),
	pageResetValidation = $('#page-reset-validation'),
	pauseDesignValidation = $('#pause-design-validation'),

	//	-Common Properties
	elementTypeValidation = $('#type-validation'),
	elementIdValidation = $('#identifier-validation'),
	elementNameValidation = $('#name-validation'),
	positionxValidation = $('#posx-validation'),
	positionyValidation = $('#posy-validation'),
	sizexValidation = $('#sizex-validation'),
	sizeyValidation = $('#sizey-validation'),

	//	-Special Properties
	backgroundValidation = $('#background-validation'),
	captionValidation = $('#caption-validation'),
	dataBindValidation = $('#data-bind-validation'),
	textBoxActionValidation = $('#textbox-action-validation'),
	ticketDesignListValidation = $('#ticket-design-list-validation'),
	copyCountValidation = $('#copy-count-validation'),
	textBoxesValidation = $('#text-boxes-validation'),
	buttonDataBindValidation = $('#button-data-bind-validation'),
	goToScreenSelectValidation = $('#go-to-screen-select-validation'),
	successPageValidation = $('#success-page-select-validation'),
	failPageValidation = $('#fail-page-select-validation'),
	serviceSegmentSelectValidation = $('#service-segment-select-validation'),
	ticketDesignValidation = $('#ticket-design-validation'),
	playListValidation = $('#play-list-validation'),

	//	-Font Properties
	fontStyleValidation = $('#font-style-validation'),
	fontSizeValidation = $('#font-size-validation'),
	fontColourValidation = $('#font-colour-validation'),
	alignValidation = $('#align-validation'),
	valignValidation = $('#valign-validation'),

	//Data Integrator Properties
	serviceTypeValidation = $('#service-type-validation'),
	serviceUrlValidation = $('#service-url-validation'),
	methodBoxValidation = $('#method-box-validation'),
	argumentNameValidation = $('#argument-name-validation'),
	argumentListValidation = $('#argument-list-validation'),
	atrListValidation = $('#atr-select-validation'),
	returnNameValidation = $('#return-name-validation'),
	returnTypeValidation = $('#return-type-validation'),
	returnListValidation = $('#return-list-validation'),

	//Return Trigger Properties
	integratorValidation = $('#integrator-validation'),
	parameterValidation = $('#parameter-validation'),
	triggerTypeValidation = $('#trigger-type-validation'),
	argumentValidation = $('#argument-validation'),
	errorPageValidation = $('#error-validation'),
	successValidation = $('#succes-validation'),

	// => Title Properties
	pagePropertiesTitle = $('#title-of-page-properties'),
	commonPropertiesTitle = $('#title-of-common-properties'),
	specialPropertiesTitle = $('#title-of-special-properties'),
	fontPropertiesTitle = $('#title-of-font-properties'),
	dataIntegratorProperties = $('#title-of-data-integrator'),
	argumentsTitle = $('#title-of-arguments'),
	returnTypeTitle = $('#title-of-return-types'),
	returnTriggerTitle = $('#title-of-return-trigger'),

	endProperty = null;

$(document).ready(function () {
	var browser_height = $(document).height();

	var area_width = $("#DesignArea").width();
	var area_height = (area_width * 16) / 9;

	$("#DesignArea").height(area_height);
	$("#DesignArea").parent().height(area_height);
	$("#DesignTab").height(area_height);

	var legend_height = area_height + 200;
	legend_height = Math.round(legend_height);

	$("#MainLegend").css("min-height", legend_height);

	function textBoxAppend() {
		let textBoxElements = $('.uiElement[type="TextBox"]');
		for (var i = 0; i < textBoxElements.length; i++) {
			let text = '<option value="' + $(textBoxElements[i]).attr('name') + '">' + $(textBoxElements[i]).attr('name') + '</option>';

			//Append Text Box Into TextBox List
			textBoxes.append(text);
		}

	}

	textBoxAppend();

	//Trigger Type Change Function
	$(() => {
		$('#Trigger').on('change',
			() => {
				switch ($('#Trigger').val()) {
					case 'LOWER_THAN':
					case 'LOWER_OR_EQUAL':
					case 'EQUAL':
					case 'HIGHER_THAN':
					case 'HIGHER_OR_EQUAL':
						//If input type text. Clear data inside
						if ($('#TriggerArgument').attr('type') !== "number")
							$('#TriggerArgument').val('');

						//Change input type
						$('#TriggerArgument').attr('type', 'number');
						break;
					default:
						$('#TriggerArgument').attr('type', 'text');
						break;
				}

			});
	});

	if (!jQuery.ui) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.async = true;
		script.src = "/assets/jquery-ui/jquery-ui.js";
		var oScripts = document.getElementsByTagName("script");
		var s = oScripts[0];
		s.parentNode.insertBefore(script, s);
	}

	//Button Data Bind Change Event (GoToScreen,PrintTicket,LoginCustomer,RunIntegrator)
	$('#' + buttonDataBind.attr('id') + '').on("change", function () {
		//Action Value
		let action = buttonDataBind.val();

		//Close Data Bind Properties
		elementAction(goToScreenSelect, serviceSegment, ticketDesign, copyCount, successPageSelect, failPageSelect, textBoxes, 'close');

		if (action === 'GoToScreen') {
			//Open Properties
			elementAction(goToScreenSelect, 'open');

			//Close Properties
			elementAction(atrList, 'close');
		}
		else if (action === 'PrintTicket') {
			//Open Properties
			elementAction(serviceSegment, ticketDesign, copyCount, atrList, 'open');

		}
		else if (action === 'LoginCustomer') {
			//Open Properties
			elementAction(successPageSelect, failPageSelect, textBoxes, 'open');

			//Close Properties
			elementAction(atrList, 'close');
		}
		else if (action === 'RunIntegrator') {
			//Open Properties
			'';

			//Close Properties
			elementAction(atrList, 'close');
		}
	});

	$('#data-bind').on("change", function () {
		//Action Value
		let action = dataBind.val();

		//Close Data Bind Properties
		elementAction(serviceSegment, 'close');

		if (action === 'ServiceLoad') {
			//Open Properties
			elementAction(serviceSegment, 'open');
		}
	});

	$('#txtPageName').on('keypress',
		(event) => {
			if (event.which === 13 && event.target.id === "txtPageName") {
				var process = SaveScreen();

				if (process !== undefined) {
					event.preventDefault();
					return false;
				}

			}
		});

	//Copy + Paste Item, Move Item With Arrow Keys Function 
	$(document).keydown((e) => {
		//Ctrl Press Controll
		if (e.keyCode === ctrlKey) ctrlPressed = true;

		//Arrow Left => Move Element to Left
		if (e.keyCode === leftArrow && !elementFocus && currentElement.length > 0) {
			if (currentElement !== null && typeof currentElement === 'object' || currentElement !== undefined && typeof currentElement === 'object') {
				let positionLeft;

				if (elementLeft() !== $(currentElement).attr('element-left'))
					positionLeft = (parseFloat(elementLeft()) - 0.050).toFixed(2);
				else
					positionLeft = (parseFloat($(currentElement).attr('element-left')) - 0.050).toFixed(2);

				if (elementLeft() >= 0.1) {
					currentElement.css('left', '' + positionLeft + '%');
					currentElement.attr('element-left', positionLeft);
				}

				GetProperties(currentElement);
			}
		}

		//Arrow Up => Move Element to Top
		if (e.keyCode === upArrow && !elementFocus && currentElement.length > 0) {
			if (currentElement !== null && typeof currentElement === 'object' || currentElement !== undefined && typeof currentElement === 'object') {
				let positionTop;

				if (currentElement.length === 1) {
					e.preventDefault();

					if (elementTop() !== $(currentElement).attr('element-top'))
						positionTop = (parseFloat(elementTop()) - 0.050).toFixed(2);
					else
						positionTop = (parseFloat($(currentElement).attr('element-top')) - 0.050).toFixed(2);

					if (elementTop() >= 0.1) {
						currentElement.css('top', '' + positionTop + '%');
						currentElement.attr('element-top', positionTop);
					}

					GetProperties(currentElement);
				}
			}
		}

		//Arrow Right => Move Element to Right
		if (e.keyCode === rightArrow && !elementFocus && currentElement.length > 0) {
			if (currentElement !== null && typeof currentElement === 'object' || currentElement !== undefined && typeof currentElement === 'object') {
				let positionRight;

				if (elementLeft() !== $(currentElement).attr('element-left'))
					positionRight = (parseFloat(elementLeft()) + 0.050).toFixed(2);
				else
					positionRight = (parseFloat($(currentElement).attr('element-left')) + 0.050).toFixed(2);

				if (parseFloat(elementWidth()) + parseFloat(elementLeft()) < 100) {
					currentElement.css('left', '' + positionRight + '%');
					currentElement.attr('element-left', positionRight);
				}

				GetProperties(currentElement);
			}
		}

		//Arrow Down => Move Element to Down
		if (e.keyCode === downArrow && !elementFocus && currentElement.length > 0) {
			if (currentElement !== null && typeof currentElement === 'object' || currentElement !== undefined && typeof currentElement === 'object') {
				let positionDown;

				if (currentElement.length === 1) {
					e.preventDefault();

					if (elementTop() !== $(currentElement).attr('element-top'))
						positionDown = (parseFloat(elementTop()) + 0.050).toFixed(2);
					else
						positionDown = (parseFloat($(currentElement).attr('element-top')) + 0.050).toFixed(2);

					if (parseFloat(elementHeight()) + parseFloat(elementTop()) < 100) {
						currentElement.css('top', '' + positionDown + '%');
						currentElement.attr('element-top', positionDown);
					}

					GetProperties(currentElement);
				}
			}
		}

		//Ctrl + C => Copy Element
		if (ctrlPressed && e.keyCode === cKey && !elementFocus && currentElement.length > 0) {
			if (currentElement !== null) {
				copyElement = $(currentElement).clone();
			}
		}

		//Ctrl + V => Paste Element
		else if (ctrlPressed && e.keyCode === vKey && !elementFocus && currentElement.length > 0) {
			ElementCount++;

			//Control Element
			let elementControl = $('#' + ElementCount + '');

			//If This Id Assign to Another Element.
			if (elementControl.length > 0)
				controlElement();

			//Change Element Id and Element Name
			$(copyElement).attr('id', '' + ElementCount + '');
			$(copyElement).attr('name', '' + $(copyElement).attr('Type') + '' + ElementCount + '');

			//Append Element to Design Area
			$('#DesignArea').append(copyElement);

			copyElement = $(copyElement).clone();

			draggable();
			droppable();
			resizable();
		}

		//Delete => Delete Element
		if (e.keyCode === deleteKey && !elementFocus && currentElement.length > 0) {
			RemoveItem($(currentElement));
		}

	}).keyup((e) => {
		if (e.keyCode === ctrlKey) ctrlPressed = false;
	});

	//Select CurrentElement
	$('#DesignArea').on('click', (e) => {
		let target = e.target;
		//Set Current Element By Click

		if (!target.classList.contains('uiElement') && currentElement === null || !target.classList.contains('uiElement') && currentElement === undefined || !target.classList.contains('uiElement'))
			currentElement = $(target).closest('.uiElement');
		else
			$(target).hasClass('uiElement') ? currentElement = $(target) : '';

		//Clear All Elements
		elementAction('all', 'clear');

		//Close All Elements
		elementAction('all', 'close');

		if (currentElement.length > 0) {
			$('.uiElement').removeClass('selected');

			currentElement.addClass('selected');
			currentElementId = currentElement.attr('id');
			currentElementName = currentElement.attr('name');
		}
		else {
			$('.uiElement').removeClass('selected');

			currenElementId = 0;
			currentElementName = '';
		}

		if (currentElement !== undefined && currentElement.length !== 0 || currentElement !== null && currentElement.length !== 0) {
			//Set CurrentElementId and CurrentElementName
			currentElementId = currentElement.attr('id');
			currentElementName = currentElement.attr('name');

			//Close Previous Properties
			elementAction('all', 'close');



			//Open Properties and Get Values
			GetProperties(currentElement);

		}
	});

	elementAction('all', 'close');

	ElementCount = $('.uiElement').length;

	$('input, textarea, select, span').focus(() => {
		elementFocus = true;
	}).blur(() => {
		elementFocus = false;
	});
});

//Draggable Function and Settings
function draggable() {
	$(".uiElement").draggable({
		containment: "#DesignArea",
		start: (event, ui) => {
			currentElement = $(ui.helper);

			currentElementId = currentElement.attr('id');
			currentElementName = currentElement.attr('name');

			//Clear All Elements
			elementAction('all', 'clear');

			//Close All Elements
			elementAction('all', 'close');


			//Remove 'Selected' Class From All Draggable Objects
			$('.uiElement').removeClass('selected');

			//Add 'Selected' Class to Current Dragging Object
			currentElement.addClass('selected');

			//Declare Element Positions to Global Variables
			currentElementX = currentElement.attr('element-left');
			currentElementY = currentElement.attr('element-top');
		},
		stop: () => {
			//Declare Element Positions to Global Variables
			currentElementX = currentElement.attr('element-left');
			currentElementY = currentElement.attr('element-top');

			$('.side-arrows').removeClass('arrow-enabled');

		},
		drag: (event, ui) => {
			GetProperties($(ui.helper));

			//Nearest Side
			let middleX = parseFloat(elementLeft()) + parseFloat(elementWidth() / 2);
			let middleY = parseFloat(elementTop()) + parseFloat(elementHeight() / 2);

			//Enable Arrows
			xArrow.addClass('arrow-enabled');
			yArrow.addClass('arrow-enabled');

			//X Arrow
			if (middleX <= 49.99) {
				xArrow.css('width', '' + middleX + '%');
				xArrow.css('left', 0);
				xArrow.css('top', '' + middleY + '%');
			}
			else {
				xArrow.css('width', '' + (100 - middleX) + '%');
				xArrow.css('left', '' + middleX + '%');
				xArrow.css('top', '' + middleY + '%');
			}

			//Y Arrow
			if (middleY <= 49.99) {
				yArrow.css('left', '' + middleX + '%');
				yArrow.css('top', 0);
				yArrow.css('height', '' + middleY + '%');
			}
			else {
				yArrow.css('left', '' + middleX + '%');
				yArrow.css('top', '' + middleY + '%');
				yArrow.css('height', '' + (100 - middleY) + '%');
			}

			//Update Current Element's X and Y Value
			currentElement.attr('element-left', '' + elementLeft() + '');
			currentElement.attr('element-top', '' + elementTop() + '');

			//Side Arrows
			$('#upper-left').css('left', parseFloat(currentElement.css('left')) - 1);
			$('#upper-right').css('left', parseFloat(currentElement.css('left')) + parseFloat(currentElement.css('width')) - 1);
			$('#bottom-left').css('top', parseFloat(currentElement.css('top')) - 1);
			$('#bottom-right').css('top', parseFloat(currentElement.css('top')) + parseFloat(currentElement.css('height')));

			$('.side-arrows').addClass('arrow-enabled');

			draggableSelector();
		}
	});
}

//CallBack Draggable Function
draggable();

//Draggable Selector 
function draggableSelector() {
	if (ctrlPressed) {
		$(currentElement).draggable({
			containment: "#DesignArea",
			stack: ".uiElement",
			snap: ".uiElement",
			snapMode: "inner",
			snapTolerance: 20,
			zIndex: 100
		});
	}
	else {
		$(currentElement).draggable({
			containment: "#DesignArea",
			stack: false,
			snap: false,
			zIndex: 100
		});
	}
}

//Make Element Resizable
function resizable() {
	$(".uiElement").resizable({
		containment: "#DesignArea",
		start: (event, ui) => {
			currentElement = $(ui.helper);

			currentElementId = currentElement.attr('id');
			currentElementName = currentElement.attr('name');

			//Clear All Elements
			elementAction('all', 'clear');

			//Close All Elements
			elementAction('all', 'close');

			//Remove 'Selected' Class From All Draggable Objects
			$('.uiElement').removeClass('selected');

			//Add 'Selected' Class to Current Dragging Object
			currentElement.addClass('selected');
		},
		resize: (event, ui) => {
			//Get Element Properties
			GetProperties($(currentElement));

			//Update Current Element's X and Y Value
			currentElement.attr('element-width', '' + elementWidth() + '');
			currentElement.attr('element-height', '' + elementHeight() + '');
		}
	});
}

resizable();

//Make Design Area Droppable
function droppable() {
	$('#DesignArea').droppable({
		drop: () => {
			//Disable Arrows
			xArrow.removeClass('arrow-enabled');
			yArrow.removeClass('arrow-enabled');
		}
	});
}

//CallBack Droppable Function
droppable();

//Elements Open/Close/Clear Action Function => When you add new elemet, element must be declare into 'allElement' array if you want to use Open/Close function
function elementAction(...args) {
	//Elements array
	const allElements = [
		//Common Properties
		elementType,
		elementId,
		elementName,
		positionX,
		positionY,
		sizeX,
		sizeY,

		//Special Properties
		background,
		caption,
		dataBind,
		textBoxAction,
		ticketDesignList,
		copyCount,
		textBoxes,
		buttonDataBind,
		atrList,
		goToScreenSelect,
		successPageSelect,
		failPageSelect,
		serviceSegment,
		ticketDesign,
		playList,

		//Font Properties
		fontStyle,
		fontSize,
		fontColour,
		align,
		valign,
		fontBold,
		fontItalic,
		fontUnderline,

		//Data Integrator Properties
		serviceType,
		serviceUrl,
		methodBox,
		addArgument,
		argumentName,
		textBoxList,
		argumentList,
		addReturn,
		returnName,
		returnTypes,
		returnList,

		//Return Trigger Properties
		integratorName,
		parameterList,
		triggerType,
		triggerArgument,
		errorPage,
		succesPage,

		// => Validation Properties
		// Page ValidationProperties
		pageBackgroundValidation,
		pageResetValidation,
		pauseDesignValidation,

		//Common Validation Properties
		elementTypeValidation,
		elementIdValidation,
		elementNameValidation,
		positionxValidation,
		positionyValidation,
		sizexValidation,
		sizeyValidation,

		//Special Validation Properties
		backgroundValidation,
		captionValidation,
		dataBindValidation,
		textBoxActionValidation,
		ticketDesignListValidation,
		copyCountValidation,
		textBoxesValidation,
		buttonDataBindValidation,
		goToScreenSelectValidation,
		successPageValidation,
		failPageValidation,
		serviceSegmentSelectValidation,
		atrListValidation,
		ticketDesignValidation,
		playListValidation,

		//Font Validation Properties
		fontStyleValidation,
		fontSizeValidation,
		fontColourValidation,
		alignValidation,
		valignValidation,

		//Data Integrator Validation Properties
		serviceTypeValidation,
		serviceUrlValidation,
		methodBoxValidation,
		argumentNameValidation,
		argumentListValidation,
		returnNameValidation,
		returnTypeValidation,
		returnListValidation,

		//Return Trigger Validation Properties
		integratorValidation,
		parameterValidation,
		triggerTypeValidation,
		argumentValidation,
		errorPageValidation,
		successValidation,

		// => Title Properties
		commonPropertiesTitle,
		specialPropertiesTitle,
		fontPropertiesTitle,
		dataIntegratorProperties,
		argumentsTitle,
		returnTypeTitle,
		returnTriggerTitle
	];

	//Open-Close Single Element
	if (typeof args[0] === 'object' && args[args.length - 1] !== 'clear') {
		for (let i = 0; i < args.length; i++) {
			if (args[args.length - 2] === 'validate') {
				if (args[args.length - 1] === "open" && typeof args[i] === 'object') {
					args[i].addClass('validate-for-active');

				}
				else if (args[args.length - 1] === "close" && typeof args[i] === 'object')
					args[i].removeClass('validate-for-active');
			}
			else if (typeof args[i] === 'object' && args[i].hasClass('panel-body')) {
				//Open
				if (args[args.length - 1] === "open" && args.length >= 2)
					args[i].parentsUntil('div.panel-group').parent().css('display', 'block');
				else if (args[args.length - 1] === "close" && args.length >= 2)
					args[i].parentsUntil('div.panel-group').parent().css('display', 'none');

			}
			else {
				//Get Parent Element of Element
				let parentElement;

				if (typeof args[i] === 'object')
					parentElement = args[i].parent();

				if (typeof args[i] === 'object' && args[i][0].outerHTML.indexOf('<h') >= 0)
					args[args.length - 1] === "open" && parentElement !== undefined ? parentElement.css('display', 'block') : i !== args.length - 1 ? parentElement.css('display', 'none') : '';
				else
					args[args.length - 1] === "open" && parentElement !== undefined ? parentElement.css('display', 'table') : i !== args.length - 1 ? parentElement.css('display', 'none') : '';
			}
		}

	}
	//Open-Close All Element
	else if (args[0] === 'all' && args[1] !== 'clear') {

		for (let i = 0; i < allElements.length; i++) {
			if (allElements[i][0].nodeName === 'SPAN' && allElements[i].hasClass('validate-for')) {

				args[args.length - 1] === "open" ?
					allElements[i].addClass('validate-for-active')
					: allElements[i].removeClass('validate-for-active');
			}
			else if (allElements[i].hasClass('panel-body')) {
				if (args[1] === "open" && args.length >= 2)
					allElements[i].parentsUntil('div.panel-group').parent().css('display', 'block');
				else if (args[1] === "close" && args.length >= 2)
					allElements[i].parentsUntil('div.panel-group').parent().css('display', 'none');
			}
			else {
				args[1] === "open" && args.length >= 2 ?
					allElements[i].parent().css('display', 'table') :
					args.length >= 2 && args[1] === 'close' ?
						allElements[i].parent().css('display', 'none') : '';
			}
		}

	}
	//Clear Single Element
	else if (typeof args[0] === 'object' && args[args.length - 1] === 'clear') {

		//Check Every Item in Array and Clear Them
		for (let i = 0; i < args.length; i++) {

			//Element Tag is Input
			if (args[i][0].nodeName === 'INPUT') {

				if (args[i].attr('type') === "checkbox")
					args[i].prop('checked', false);
				else
					args[i].val('');

			}
			//Element Tag is Ul
			else if (allElements[i][0].nodeName === 'UL') {
				args[i].html('');
			}
			//Element Tag is Select
			else if (args[i][0].nodeName === 'SELECT') {
				args[i].val($('#' + args[i].attr('id') + ' > option').eq(0).val());

				if (args[i].hasClass('select2')) {
					$('#select2-' + args[i].attr('id') + '-container').html($('#' + args[i].attr('id') + ' > option').eq(0).text());
				}
			}
			//Element Tag is Select
			else if (args[i][0].nodeName === 'SPAN' && args[i].hasClass('validate-for')) {
				args[i].html('');

			}

		}

	}
	//Clear All Element
	else if (args[0] === 'all' && args[1] === 'clear') {

		for (let i = 0; i < allElements.length; i++) {

			//Element Tag is Input
			if (allElements[i][0].nodeName === 'INPUT') {

				if (allElements[i].attr('type') === "checkbox")
					allElements[i].prop('checked', false);
				else
					allElements[i].val('');

			}
			//Element Tag is Ul
			else if (allElements[i][0].nodeName === 'UL') {
				allElements[i].html('');
			}
			//Element Tag is Select
			else if (allElements[i][0].nodeName === 'SELECT') {
				allElements[i].val($('#' + allElements[i].attr('id') + ' > option').eq(0).val());

				if (allElements[i].hasClass('select2')) {
					$('#select2-' + allElements[i].attr('id') + '-container').html($('#' + allElements[i].attr('id') + ' > option').eq(0).text());
				}
			}
			//Element Tag is Select
			else if (allElements[i][0].nodeName === 'SPAN' && allElements[i].hasClass('validate-for')) {
				allElements[i].html('');

			}

		}

	}

}

//Get Element's Properties
function GetProperties(element) {
	//Set currentElement
	currentElement = $(element);
	//Set currentElementType
	currentElementType = currentElement.attr('Type');

	//Open Common Properties for All Elements
	elementAction(commonPropertiesTitle, elementType, elementName, elementId, positionX, positionY, sizeX, sizeY, 'open');

	//Fill That Common Property Inputs
	elementType.val(currentElement.attr('type'));
	elementId.val(currentElement.attr('id'));
	elementName.val(currentElement.attr('name'));
	positionX.val(currentElement.attr('element-left'));
	positionY.val(currentElement.attr('element-top'));
	sizeX.val(currentElement.attr('element-width'));
	sizeY.val(currentElement.attr('element-height'));

	$("#btnBackgroundBrowser").attr("onclick", "window.open('/KioskDesigner/ImageBrowser?reff=element-background', 'Browser', 'width=1100,height=750');");

	if (currentElementType === "Label") {
		//Enable Properties
		elementAction(specialPropertiesTitle, caption, serviceSegment, dataBind, fontPropertiesTitle, fontStyle, fontSize, fontColour, align, valign, fontPropertiesTitle, fontBold, fontItalic, fontUnderline, 'open');

		//Fill Element Properties
		//Special Properties
		caption.val(currentElement.children('label').eq(0)[0].innerHTML);

		dataBind.val(currentElement.attr('data-bind'));
		$('#select2-' + dataBind.attr('id') + '-container').html($('#' + dataBind.attr('id') + ' > option[value="' + currentElement.attr('data-bind') + '"]').text());

		//Font Properties
		fontStyle.val(currentElement.css('font-family'));
		$('#select2-' + fontStyle.attr('id') + '-container').html($('#' + fontStyle.attr('id') + ' > option[value="' + currentElement.css('font-family') + '"]').text());

		fontSize.val(currentElement.css('font-size').replace('px', ''));
		$('#select2-' + fontSize.attr('id') + '-container').html($('#' + fontSize.attr('id') + ' > option[value="' + currentElement.css('font-size').replace('px', '') + '"]').text());

		fontColour.val(currentElement.css('color'));
		$('#select2-' + fontColour.attr('id') + '-container').html($('#' + fontColour.attr('id') + ' > option[value="' + currentElement.css('color') + '"]').text());

		if (notNull.test(currentElement.attr('align')) && currentElement.attr('align') !== undefined) {
			align.val(currentElement.attr('align'));
			$('#select2-' + align.attr('id') + '-container').html($('#' + align.attr('id') + ' > option[value="' + currentElement.attr('align') + '"]').text());
		}

		if (notNull.test(currentElement.attr('valign')) && currentElement.attr('valign') !== undefined) {
			valign.val(currentElement.attr('valign'));
			$('#select2-' + valign.attr('id') + '-container').html($('#' + valign.attr('id') + ' > option[value="' + currentElement.attr('valign') + '"]').text());
		}
		let propertyArray = currentElement.attr('parameter');
		

		if (notNull.test(propertyArray) && propertyArray !== undefined) {
			propertyArray = propertyArray.split(' ');
			let action = dataBind.val();
			if (action === "ServiceLoad") {
				elementAction(serviceSegment, 'open');
				serviceSegment.val('' + propertyArray[0] + ' ' + propertyArray[1] + '');
				$('#select2-' + serviceSegment.attr('id') + '-container').html($('#' + serviceSegment.attr('id') + ' > option[value="' + propertyArray[0] + ' ' + propertyArray[1] + '"]').text());
			}
			else {
				elementAction(serviceSegment, 'close');
            }
        }

		//Font Actions (Bold, Italic, Underline)
		fontActions('check');

	}
	else if (currentElementType === "Button") {
		//Enable Properties
		elementAction(specialPropertiesTitle, buttonDataBind, background, caption, 'open');

		caption.val(currentElement.children('label').eq(0)[0].innerHTML);

		let propertyArray = currentElement.attr('parameter');

		//Fill Element Properties
		if (notNull.test(propertyArray) && propertyArray !== undefined) {
			//Special Properties
			//Background
			background.val(currentElement.attr('title'));

			//Button Data Bind
			buttonDataBind.val(currentElement.attr('action'));
			$('#select2-' + buttonDataBind.attr('id') + '-container').html($('#' + buttonDataBind.attr('id') + ' > option[value="' + currentElement.attr('action') + '"]').text());

			//Property Array
			propertyArray = propertyArray.split(' ');

			//Action Value
			let action = buttonDataBind.val();

			//Close Data Bind Properties
			elementAction(goToScreenSelect, serviceSegment, ticketDesign, copyCount, successPageSelect, failPageSelect, textBoxes, 'close');

			if (action === 'GoToScreen') {
				//Open Properties
				elementAction(goToScreenSelect, 'open');

				if (notNull.test(propertyArray) && propertyArray !== undefined) {
					//Screen
					goToScreenSelect.val('' + currentElement.attr('parameter') + '');
					$('#select2-' + goToScreenSelect.attr('id') + '-container').html($('#' + goToScreenSelect.attr('id') + ' > option[value="' + currentElement.attr('parameter') + '"]').text());
				}
			}
			else if (action === 'PrintTicket') {
				//Open Properties
				elementAction(atrList, serviceSegment, ticketDesign, copyCount, 'open');

				//Service Segment Select
				serviceSegment.val('' + propertyArray[0] + ' ' + propertyArray[1] + '');
				$('#select2-' + serviceSegment.attr('id') + '-container').html($('#' + serviceSegment.attr('id') + ' > option[value="' + propertyArray[0] + ' ' + propertyArray[1] + '"]').text());

				//Copy Count
				copyCount.val(propertyArray[2]);

				//Ticket Design
				ticketDesign.val(propertyArray[3]);
				$('#select2-' + ticketDesign.attr('id') + '-container').html($('#' + ticketDesign.attr('id') + ' > option[value="' + propertyArray[3] + '"]').text());

				//ATR
				atrList.val(propertyArray[4]);
				$('#select2-' + atrList.attr('id') + '-container').html($('#' + atrList.attr('id') + ' > option[value="' + propertyArray[4] + '"]').text());
			}
			else if (action === 'LoginCustomer') {
				//Open Properties
				elementAction(successPageSelect, failPageSelect, textBoxes, 'open');

				//Success Page Select
				successPageSelect.val('' + propertyArray[0] + '');
				$('#select2-' + successPageSelect.attr('id') + '-container').html($('#' + successPageSelect.attr('id') + ' > option[value="' + propertyArray[0] + '"]').text());

				//Fail Page Select
				failPageSelect.val('' + propertyArray[1] + '');
				$('#select2-' + failPageSelect.attr('id') + '-container').html($('#' + failPageSelect.attr('id') + ' > option[value="' + propertyArray[1] + '"]').text());

				//Text Box Select
				textBoxes.val('' + propertyArray[2] + '');
				$('#select2-' + textBoxes.attr('id') + '-container').html($('#' + textBoxes.attr('id') + ' > option[value="' + propertyArray[2] + '"]').text());
			}
			else if (action === 'RunIntegrator') {
				//Open Properties
				'';
			}
		}
		else if (propertyArray === undefined) {
			//Open Default Select Requirement
			elementAction(goToScreenSelect, 'open');
		}
	}
	else if (currentElementType === "MediaElement") {
		//Enable Properties
		elementAction(specialPropertiesTitle, playList, 'open');

		//Fill Element Properties
		//Special Properties
		//Playlist
		playList.val(currentElement.attr('playlist'));
	}
	else if (currentElementType === "TextBox") {
		//Element Properties
		elementAction(specialPropertiesTitle, textBoxAction, caption, fontPropertiesTitle, fontStyle, fontSize, fontColour, fontBold, fontItalic, fontUnderline, 'open');

		//Fill Element Properties
		//Special Properties
		//Text Boxes
		textBoxAction.val(currentElement.attr('action'));
		$('#select2-' + textBoxAction.attr('id') + '-container').html($('#' + textBoxAction.attr('id') + ' > option[value="' + currentElement.attr('action') + '"]').text());

		//Caption
		caption.val(currentElement.children('label').eq(0)[0].innerHTML);

		//Font Properties
		//Font Style
		fontStyle.val(currentElement.css('font-family'));
		$('#select2-' + fontStyle.attr('id') + '-container').html($('#' + fontStyle.attr('id') + ' > option[value="' + currentElement.css('font-family') + '"]').text());

		//Font Size
		fontSize.val(currentElement.css('font-size').replace('px', ''));
		$('#select2-' + fontSize.attr('id') + '-container').html($('#' + fontSize.attr('id') + ' > option[value="' + currentElement.css('font-size').replace('px', '') + '"]').text());

		//Font Colour
		fontColour.val(currentElement.css('color'));
		$('#select2-' + fontColour.attr('id') + '-container').html($('#' + fontColour.attr('id') + ' > option[value="' + currentElement.css('color') + '"]').text());

		//Align
		if (notNull.test(currentElement.attr('align')) && currentElement.attr('align') !== undefined) {
			align.val(currentElement.attr('align'));
			$('#select2-' + align.attr('id') + '-container').html($('#' + align.attr('id') + ' > option[value="' + currentElement.attr('align') + '"]').text());
		}

		//Valign
		if (notNull.test(currentElement.attr('valign')) && currentElement.attr('valign') !== undefined) {
			valign.val(currentElement.attr('valign'));
			$('#select2-' + valign.attr('id') + '-container').html($('#' + valign.attr('id') + ' > option[value="' + currentElement.attr('valign') + '"]').text());
		}

		//Font Actions (Bold, Italic, Underline)
		fontActions('check');

	}
	else if (currentElementType === "QRCode") {
		//Element Propeties
		elementAction(caption, 'open');

		caption.val(currentElement.children('label').eq(0)[0].innerHTML);
	}
	else if (currentElementType === "NumPad") {
		//Element Properties
		elementAction(specialPropertiesTitle, textBoxes, background, 'open');

		//Fill Element Properties
		//Special Properties
		background.val(currentElement.attr('background'));

		if (currentElement.attr('parameter') !== '') {
			textBoxes.val(currentElement.attr('parameter'));
			$('#select2-' + textBoxes.attr('id') + '-container').html($('#' + textBoxes.attr('id') + ' > option[value="' + currentElement.attr('parameter') + '"]').text());
		}

		$("#btnBackgroundBrowser").attr("onclick", "window.open('/KioskDesigner/DirectoryBrowser?reff=element-background', 'Browser', 'width=1100,height=750');");
	}
	else if (currentElementType === "DataIntegrator") {
		//Element Properties
		elementAction(dataIntegratorProperties, serviceType, serviceUrl, methodBox, addArgument, textBoxList, argumentsTitle, argumentList, returnTypeTitle, addReturn, returnList, returnName, returnTypes, 'open');

		//Getting element properties
		serviceUrl.val($(currentElement).attr('serviceurl'));

		methodBox.val($(currentElement).attr('method'));

		serviceType.val(currentElement.attr('servicetype'));
		$('#select2-' + serviceType.attr('id') + '-container').html($('#' + serviceType.attr('id') + ' > option[value="' + currentElement.attr('servicetype') + '"]').text());

		//TextBox Fill
		//Getting avaible text boxes
		const textBoxs = $('[type*="TextBox"]');
		//Clearing List of Checkboxes
		$('#TextBoxes').html("");
		$(textBoxs).each((v, i) => {
			const textBoxName = $(i).attr('name');
			methodBox.val($(currentElement).attr('method'));

			const text = "<option value='" + textBoxName + "'>" + textBoxName + "</option>";
			$('#TextBoxes').append(text);
		});

		//Getting exist arguments, if any argument exist, clear list for selected data integrator's arguments
		const args = $('#' + currentElementId + ' > [type*="Argument"]');
		if (args.length > 0)
			argumentList.html('');

		args.each((i, v) => {
			let text = "";
			text += '<div class="input-group" type="Argument" name="' + $(v).attr('name') + '" integrator="' + $(v).attr('Integrator') + '" textbox="' + $(v).attr('textbox') + '">';
			text += '<span class="input-group-addon arg-name" id="basic-addon3" style="width: 40%;">' +
				$(v).attr('name') +
				'</span>';
			text += '<span class="input-group-addon txt-name" id="basic-addon3" style="width: 40%;">' +
				$(v).attr('textbox') +
				'</span>';
			text += '<button type="button" onClick="DeleteItem($(this))" class="btn btn-danger delete-element" style="float:right; margin-right: 10px; margin-top:5px;"> <i class="fa fa-times"></i> </button>';
			text += '</div>';

			argumentList.append(text);

		});

		//Getting exist returns, if any return exist, clear list for selected data integrator's returns
		const returns = $('#' + currentElementId + ' > [type*="Return"]');
		if (returns.length > 0)
			returnList.html('');

		returns.each((i, v) => {
			let text = "";
			text += '<div class="input-group" type="Return" name="' +
				$(v).attr('name') +
				'" integrator="' +
				$(v).attr('Integrator') +
				'" returntype="' +
				$(v).attr('returntype') +
				'">';
			text += '<span class="input-group-addon arg-name" id="basic-addon3" style="width: 40%;">' +
				$(v).attr('name') +
				'</span>';
			text += '<span class="input-group-addon txt-name" id="basic-addon3" style="width: 40%;">' +
				$(v).attr('returntype') +
				'</span>';
			text += '<button type="button" onClick="DeleteItem($(this))" class="btn btn-danger delete-element" style="float:right; margin-right: 10px; margin-top:5px;"> <i class="fa fa-times"></i> </button>';
			text += '</div>';

			returnList.append(text);
		});
	}
	else if (currentElementType === "ReturnTrigger") {
		//Element Properties
		elementAction(returnTriggerTitle, integratorName, parameterList, triggerType, triggerArgument, errorPage, succesPage, 'open');

		//Clear Return List
		parameterList.html('');

		//Filling required fields
		$('[type="DataIntegrator"]').children('[type="Return"]').each((i, v) => {
			let text = '<option value=' + $(v).attr('name') + '>' + $(v).attr('name') + '</option>';

			parameterList.append(text);
		});

		//Getting element Properties
		integratorName.val($('[type="DataIntegrator"]').attr('name'));

		if (currentElement.attr('paramater') !== '') {
			parameterList.val(currentElement.attr('paramater'));
			$('#select2-' + parameterList.attr('id') + '-container').html($('#' + parameterList.attr('id') + ' > option[value="' + currentElement.attr('paramater') + '"]').text());
		}

		if (currentElement.attr('trigger') !== '') {
			triggerType.val(currentElement.attr('trigger'));
			$('#select2-' + triggerType.attr('id') + '-container').html($('#' + triggerType.attr('id') + ' > option[value="' + currentElement.attr('trigger') + '"]').text());
		}

		triggerArgument.val(currentElement.attr('argument'));

		if (currentElement.attr('errorpage') !== '') {
			errorPage.val(currentElement.attr('errorpage'));
			$('#select2-' + errorPage.attr('id') + '-container').html($('#' + errorPage.attr('id') + ' > option[value="' + currentElement.attr('errorpage') + '"]').text());
		}

		if (succesPage.attr('successpage') !== '') {
			succesPage.val(currentElement.attr('successpage'));
			$('#select2-' + succesPage.attr('id') + '-container').html($('#' + succesPage.attr('id') + ' > option[value="' + currentElement.attr('successpage') + '"]').text());
		}

		//Get Trigger
		if (triggerType.val() !== "") {
			switch (triggerType.val()) {
				case 'LOWER_THAN':
				case 'LOWER_OR_EQUAL':
				case 'EQUAL':
				case 'HIGHER_THAN':
				case 'HIGHER_OR_EQUAL':
					$('#TriggerArgument').attr('type', 'number');
					break;
			}
		}

	}
	else if (currentElementType === "AppointmentList") {
		//Element Propeties
		elementAction(specialPropertiesTitle, background, ticketDesignList, copyCount, fontPropertiesTitle, fontStyle, fontSize, fontColour, 'open');

		//Fill Element Properties
		//Special Properties
		background.val(currentElement.attr('title'));

		ticketDesignList.val(currentElement.attr('ticketdesignid'));
		$('#select2-' + ticketDesignList.attr('id') + '-container').html($('#' + ticketDesignList.attr('id') + ' > option[value="' + currentElement.attr('ticketdesignid') + '"]').text());

		copyCount.val(currentElement.attr('copycount'));

		$("#btnBackgroundBrowser").attr("onclick", "window.open('/KioskDesigner/ImageBrowser?reff=element-background', 'Browser', 'width=1100,height=750');");

		//Font Properties
		fontStyle.val(currentElement.css('font-family'));
		$('#select2-' + fontStyle.attr('id') + '-container').html($('#' + fontStyle.attr('id') + ' > option[value="' + currentElement.css('font-family') + '"]').text());

		fontSize.val(currentElement.css('font-size').replace('px', ''));
		$('#select2-' + fontSize.attr('id') + '-container').html($('#' + fontSize.attr('id') + ' > option[value="' + currentElement.css('font-size').replace('px', '') + '"]').text());

		fontColour.val(currentElement.css('color').replace('px', ''));
		$('#select2-' + fontColour.attr('id') + '-container').html($('#' + fontColour.attr('id') + ' > option[value="' + currentElement.css('color') + '"]').text());
	}
}

//Set Element's Properties
function SetProperties() {
	//Set Page Properties
	$("#DesignArea").css("background-image", "url(" + pageBackground.val() + ")");

	if (currentElement.length > 0) {

		let commonValidation = validateElement('common');
		let elementValidation = validateElement(currentElement);

		//Validate Common Properties
		if (commonValidation && elementValidation) {
			//Check Manual Size Changes
			if (currentElement.attr('element-left') !== positionX.val()) {
				currentElement.css('left', '' + positionX.val() + '%');
			}
			if (currentElement.attr('element-top') !== positionY.val()) {
				currentElement.css('top', '' + positionY.val() + '%');
			}
			if (currentElement.attr('element-width') !== sizeX.val()) {
				currentElement.css('width', '' + sizeX.val() + '%');
			}
			if (currentElement.attr('element-height') !== sizeY.val()) {
				currentElement.css('height', '' + sizeY.val() + '%');
			}

			//Set if Common Properties Valid
			currentElement.attr({
				'id': elementId.val(),
				'name': elementName.val(),
				'element-left': positionX.val(),
				'element-top': positionY.val(),
				'element-width': sizeX.val(),
				'element-height': sizeY.val()
			});

			currentElementId = currentElement.attr('id');
			currentElementName = currentElement.attr('name');
		}

		//Validate Element Properties
		if (!elementValidation)
			return;

		if (elementType.val() === "Label") {
			//Assign Properties to Element
			//Data Bind Assign
			currentElement.attr({
				'data-bind': dataBind.val()
			});

			//Caption Assign
			currentElement.children('label').text(caption.val());

			//Font Properties
			currentElement.css({
				'font-family': fontStyle.val(),
				'font-size': '' + fontSize.val() + 'px',
				'color': fontColour.val(),
				'text-align': align.val(),
				'vertical-align': 'middle !important'
			});

			currentElement.attr({
				'align': align.val(),
				'valign': valign.val()
			});

			//Note: Bold, Italic and Underline Properties, will be` assigned on Click Action

			//Label Vertical Align Settings
			if (valign.val() === "Middle") {
				currentElement.css('line-height', currentElement.css('height'));
			}
			else if (valign.val() === "Top") {
				currentElement.css('line-height', 1.5);
			}

			const action = dataBind.val();
			if (action === "ServiceLoad") {
				currentElement.attr('parameter', serviceSegment.val());
            }

		}
		else if (elementType.val() === "Button") {
			//Action Value
			const action = buttonDataBind.val();

			//Caption Assign
			currentElement.children('label').text(caption.val());

			//Element Background
			currentElement.attr('title', background.val());
			currentElement.css('background-image', 'url("' + background.val() + '")');

			//Assign Properties to Element
			//Data Bind
			currentElement.attr('action', action);

			//Global Parameter String
			let parameterString = '';

			if (action === 'GoToScreen') {
				//Special Properties
				currentElement.attr({
					parameter: goToScreenSelect.val()
				});
			}
			else if (action === 'PrintTicket') {
				//Service Segment Ids
				parameterString += '' + serviceSegment.val() + ' ';

				//Copy Count
				parameterString += '' + copyCount.val() + ' ';

				//Ticket Design Id
				parameterString += '' + ticketDesign.val() + ' ';

				//ATR Id
				parameterString += '' + atrList.val() + '';

				currentElement.attr('parameter', parameterString);
			}
			else if (action === 'LoginCustomer') {
				//Success Page
				parameterString += '' + successPageSelect.val() + ' ';

				//Fail Page
				parameterString += '' + failPageSelect.val() + ' ';

				//TextBox List
				parameterString += '' + textBoxes.val() + ' ';

				currentElement.attr('parameter', parameterString);
			}
			else if (action === 'RunIntegrator') {
				parameterString += $('[type="DataIntegrator"]').attr('name');

				currentElement.attr('parameter', parameterString);
			}
		}
		else if (elementType.val() === "MediaElement") {

			//Assign Properties to Element
			//Play List
			currentElement.attr("playlist", playList.val());

			//Video Source	
			currentElement.children('video').children('source').attr("src", playList.val());
		}
		else if (elementType.val() === "TextBox") {
			//Caption Assign
			currentElement.children('label').text(caption.val());

			//Font Properties
			currentElement.css({
				'font-family': fontStyle.val(),
				'font-size': '' + fontSize.val() + 'px',
				'color': fontColour.val(),
				'text-align': align.val(),
				'vertical-align': 'middle !important'
			});

			//Action, align & valign
			currentElement.attr({
				'action': textBoxAction.val(),
				'align': align.val(),
				'valign': valign.val()
			});

			//Note: Bold, Italic and Underline Properties, will be` assigned on Click Action

			//Label Vertical Align Settings
			if (valign.val() === "Middle") {
				currentElement.css('line-height', currentElement.css('height'));
			}
			else if (valign.val() === "Top") {
				currentElement.css('line-height', 1.5);
			}

		}
		else if (elementType.val() === "QRCode") {
			//Caption Assign
			currentElement.children('label').text(caption.val());
		}
		else if (elementType.val() === "NumPad") {
			//Assign Properties
			//Background Image
			currentElement.attr("background", background.val());

			//Action
			currentElement.attr("action", "TextBox");

			//Text Box
			currentElement.attr("parameter", textBoxes.val());
		}
		else if (elementType.val() === "DataIntegrator") {
			//Assign Properties
			//Apply attr settings
			currentElement.attr({
				'name': elementName.val(),
				'text': caption.val(),
				'servicetype': serviceType.val(),
				'serviceurl': serviceUrl.val(),
				'method': methodBox.val(),
			});

			//Getting all arguments
			const applyArguments = $('#argument-list > [type*="Argument"]');
			const applyReturns = $('#return-list > [type*="Return"]');
			var text = "";

			//If any arguments or returns, delete innerHTML and create new HTML
			currentElement.html('');
			text += '<span class="fa fa-connectdevelop cntr">&nbsp;</span>';
			currentElement.append(text);

			//Append arguments to designer
			applyArguments.each((i, v) => {
				text = '';
				text += '<div style="display: none;" class="input-group" type="Argument" name="' + $(v).attr('name') + '" integrator="' + elementName.val() + '" textbox="' + $(v).attr('textbox') + '"> </div>';
				currentElement.append(text);
			});

			//Append returns to designer
			applyReturns.each((i, v) => {
				text = '';
				text += '<div style="display: none;" class="input-group" type="Return" name="' + $(v).attr('name') + '" integrator="' + elementName.val() + '" returntype="' + $(v).attr('returntype') + '"> </div>';
				currentElement.append(text);
			});


		}
		else if (elementType.val() === "ReturnTrigger") {

			//Set element attributes
			currentElement.attr({
				'integrator': $('[type="DataIntegrator"]').attr('name'),
				'paramater': parameterList.val(),
				'trigger': triggerType.val(),
				'argument': triggerArgument.val(),
				'errorpage': errorPage.val(),
				'successpage': succesPage.val()
			});

		}
		else if (elementType.val() === "AppointmentList") {

			//Apply Properties
			//Name
			currentElement.attr({
				'title': background.val(),
				'copycount': copyCount.val(),
				'ticketdesignid': ticketDesignList.val()
			});

			//Font Properties
			currentElement.css({
				'font-family': fontStyle.val(),
				'font-size': '' + fontSize.val() + 'px',
				'color': fontColour.val(),
			});

		}
	}
}

//Validation
function validateElement(element) {
	let ElementType,
		bool = true;

	if (element !== 'common') {
		element = $(element);
		ElementType = element.attr('type');
	}

	function validatePage() {
		//Page Reset Time Validate
		if (!notNull.test(pageReset.val())) {
			bool = false;

			elementAction(pageResetValidation, 'validate', 'open');
			pageResetValidation.html('Please ensure to enter page reset time.');
		}
		else {
			elementAction(pageResetValidation, 'validate', 'close');
			elementAction(pageResetValidation, 'clear');
		}

		//Kiosk Not Serving Validate
		if (!notNull.test(pauseDesign.val())) {
			bool = false;

			elementAction(pauseDesignValidation, 'validate', 'open');
			pauseDesignValidation.html('Please ensure to select a pause design.');
		}
		else {
			elementAction(pauseDesignValidation, 'validate', 'close');
			elementAction(pauseDesignValidation, 'clear');
		}
	}

	function validateCommonProperties() {
		if (currentElement === undefined || currentElement === null || currentElement === '') {
			currentElementId = $(element).attr('id');
			//Identifier Validate
			if (!notNull.test(currentElementId))
				bool = false;

			//Name Validate
			if (element.attr('name') === undefined || !notNull.test($(element).attr('name')))
				bool = false;

			//Left Validate
			if (element.attr('element-left') === undefined || !notNull.test(element.attr('element-left')))
				bool = false;

			//Top Validate
			if (element.attr('element-top') === undefined || !notNull.test(element.attr('element-top')))
				bool = false;

			//Width Validate
			if (element.attr('element-width') === undefined || !notNull.test(element.attr('element-width')))
				bool = false;

			//Height Validate
			if (element.attr('element-height') === undefined || !notNull.test(element.attr('element-height')))
				bool = false;

		}
		else {
			//Identifier Validate
			if (!notNull.test(elementId.val())) {
				bool = false;

				elementAction(elementIdValidation, 'validate', 'open');
				elementIdValidation.html('Element must have identifier, ensure to enter a identifier to element.');
			}
			else if (currentElementId !== elementId.val()) {
				let controlElement = $('#' + elementId.val() + '');
				if (controlElement.length >= 1) {
					bool = false;

					elementAction(elementIdValidation, 'validate', 'open');
					elementIdValidation.html('This identifeir already defined for another element. Please define diffrent identifier.');
				}
			}
			else {
				elementAction(elementIdValidation, 'validate', 'close');
				elementAction(elementIdValidation, 'clear');
			}

			//Name Validate
			if (!notNull.test(elementName.val())) {
				bool = false;

				elementAction(elementNameValidation, 'validate', 'open');
				elementNameValidation.html('Element must have name, ensure to enter a name to element.');
			}
			else if (currentElementName !== elementName.val()) {
				let controlElement = $('[name="' + elementName.val() + '"]');
				if (controlElement.length >= 1) {
					bool = false;

					elementAction(elementNameValidation, 'validate', 'open');
					elementNameValidation.html('This name already defined for another element. Please define diffrent name.');
				}
			}
			else {
				elementAction(elementNameValidation, 'validate', 'close');
				elementAction(elementNameValidation, 'clear');

			}

			//Left Validate
			if (positionX.val() !== undefined && !notNull.test(positionX.val())) {
				bool = false;

				elementAction(positionxValidation, 'validate', 'open');
				positionxValidation.html('You have must set \'left\' coordinate to element');
			} else {
				elementAction(positionxValidation, 'validate', 'close');
				elementAction(positionxValidation, 'clear');
			}

			//Top Validate
			if (positionY.val() !== undefined && !notNull.test(positionY.val())) {
				bool = false;

				elementAction(positionyValidation, 'validate', 'open');
				positionyValidation.html('You have must set \'right\' coordinate to element');
			} else {
				elementAction(positionyValidation, 'validate', 'close');
				elementAction(positionyValidation, 'clear');
			}

			//Width Validate
			if (sizeX.val() !== undefined && !notNull.test(sizeX.val())) {
				bool = false;

				elementAction(sizexValidation, 'validate', 'open');
				sizexValidation.html('You have must set \'width\' to element');
			} else {
				elementAction(sizexValidation, 'validate', 'close');
				elementAction(sizexValidation, 'clear');
			}

			//Height Validate
			if (sizeY.val() !== undefined && !notNull.test(sizeY.val())) {
				bool = false;

				elementAction(sizeyValidation, 'validate', 'open');
				sizeyValidation.html('You have must set \'height\' to element');
			} else {
				elementAction(sizeyValidation, 'validate', 'close');
				elementAction(sizeyValidation, 'clear');
			}

		}

		return bool;
	}

	function validateLabel() {
		if (currentElement === undefined || currentElement === null || currentElement === '') {

			//Caption Validate
			if (element.children('label').html() === undefined || !notNull.test(element.children('label').html()))
				bool = false;

			//Data Bind Validate
			if (element.attr('data-bind') === undefined || !notNull.test(element.attr('data-bind')))
				bool = false;

			//Parameter Validate
			if (element.attr('parameter') === undefined || !notNull.test(element.attr('parameter')))
				bool = false;

			//Font Style Validate
			if (element.css('font-family') === undefined || !notNull.test(element.css('font-family')))
				bool = false;

			//Font Size Validate
			if (element.css('font-size') === undefined || !notNull.test(element.css('font-size')))
				bool = false;

			//Colour Validate
			if (element.css('color') === undefined || !notNull.test(element.css('color')))
				bool = false;

			//Align Validate
			if (element.attr('align') === undefined || !notNull.test(element.attr('align')))
				bool = false;

			//Vertical Align Validate
			if (element.attr('valign') === undefined || !notNull.test(element.attr('valign')))
				bool = false;
		}
		else {
			//Caption Validate
			if (caption.val() === undefined || !notNull.test(caption.val())) {
				bool = false;

				elementAction(captionValidation, 'validate', 'open');
				captionValidation.html('Caption can\'t be empty. Please ensure to enter value correct.');
			} else {
				elementAction(captionValidation, 'validate', 'close');
				elementAction(captionValidation, 'clear');
			}

			//Data Bind Validate
			if (dataBind.val() === undefined || !notNull.test(dataBind.val()) || dataBind.val() === null) {
				bool = false;

				elementAction(dataBindValidation, 'validate', 'open');
				dataBindValidation.html('Please ensure to enter value correct.');
			} else {
				elementAction(dataBindValidation, 'validate', 'close');
				elementAction(dataBindValidation, 'clear');
			}

			//Font Style Validate
			if (fontStyle.val() === undefined || !notNull.test(fontStyle.val()) || fontStyle.val() === null) {
				bool = false;

				elementAction(fontStyleValidation, 'validate', 'open');
				fontStyleValidation.html('Please ensure to enter value correct.');
			} else {
				elementAction(fontStyleValidation, 'validate', 'close');
				elementAction(fontStyleValidation, 'clear');
			}

			//Font Size Validate
			if (fontSize.val() === undefined || !notNull.test(fontSize.val()) || fontSize.val() === null) {
				bool = false;

				elementAction(fontSizeValidation, 'validate', 'open');
				fontSizeValidation.html('Please ensure to enter value correct.');
			} else {
				elementAction(fontSizeValidation, 'validate', 'close');
				elementAction(fontSizeValidation, 'clear');
			}

			//Colour Validate
			if (fontColour.val() === undefined || !notNull.test(fontColour.val()) || fontColour.val() === null) {
				bool = false;

				elementAction(fontColourValidation, 'validate', 'open');
				fontColourValidation.html('Please ensure to enter value correct.');
			} else {
				elementAction(fontColourValidation, 'validate', 'close');
				elementAction(fontColourValidation, 'clear');
			}

			//Align Validate
			if (align.val() === undefined || !notNull.test(align.val()) || align.val() === null) {
				bool = false;

				elementAction(alignValidation, 'validate', 'open');
				alignValidation.html('Please ensure to enter value correct.');
			} else {
				elementAction(alignValidation, 'validate', 'close');
				elementAction(alignValidation, 'clear');
			}

			//vAlign Validate
			if (valign.val() === undefined || !notNull.test(valign.val()) || valign.val() === null) {
				bool = false;

				elementAction(valignValidation, 'validate', 'open');
				valignValidation.html('Please ensure to enter value correct.');
			} else {
				elementAction(valignValidation, 'validate', 'close');
				elementAction(valignValidation, 'clear');
			}

		}

	}

	function validateButton() {
		if (currentElement === undefined || currentElement === null || currentElement === '') {
			//Data Bind Validate
			if (element.attr('action') === undefined || !notNull.test(element.attr('action')))
				bool = false;

			if (element.attr('action') !== undefined || notNull.test(element.attr('action'))) {
				let action = element.attr('action');

				if (action === 'GoToScreen') {
					if (element.attr('parameter') === undefined || !notNull.test(element.attr('parameter')) || element.attr('parameter') === '0')
						bool = false;
				}
				else if (action === 'PrintTicket') {
					let parameterCount = element.attr('parameter').split(' ');

					if (element.attr('parameter') === undefined || !notNull.test(element.attr('parameter')) || element.attr('parameter') === '0')
						bool = false;

					//Element Parameter Control
					if (parameterCount.length < 5)
						bool = false;

				}
				else if (action === 'LoginCustomer') {
					let parameterCount = element.attr('parameter').split(' ');

					if (element.attr('parameter') === undefined || !notNull.test(element.attr('parameter')) || element.attr('parameter') === '0')
						bool = false;

					//Element Parameter Control
					if (parameterCount.length < 3)
						bool = false;
				}
				else if (action === 'RunIntegrator') {
					if (element.attr('parameter') === undefined || !notNull.test(element.attr('parameter')) || element.attr('parameter') === '0')
						bool = false;
				}
			}

		}
		else {
			//Data Bind Validate
			if (buttonDataBind.val() === undefined || !notNull.test(buttonDataBind.val()) || buttonDataBind.val() === null) {
				bool = false;

				elementAction(buttonDataBindValidation, 'validate', 'open');
				buttonDataBindValidation.html('Please ensure to select button action.');
			}
			else {

				elementAction(buttonDataBindValidation, 'validate', 'close');
				elementAction(buttonDataBindValidation, 'clear');
			}

			//Validate By Diffrent Options
			if (buttonDataBind.val() !== undefined && notNull.test(buttonDataBind.val()) && buttonDataBind.val() !== null) {
				let action = buttonDataBind.val();

				//Go To Screen Action Validations
				if (action === 'GoToScreen') {

					//Screen Validation
					if (goToScreenSelect.val() === undefined || !notNull.test(goToScreenSelect.val()) || goToScreenSelect.val() === 0 || goToScreenSelect.val() === null) {
						bool = false;

						elementAction(goToScreenSelectValidation, 'validate', 'open');
						goToScreenSelectValidation.html('Please ensure to select redirect screen.');
					} else {
						elementAction(goToScreenSelectValidation, 'validate', 'close');
						elementAction(goToScreenSelectValidation, 'clear');
					}


				}
				//Print Ticket Action Validations
				else if (action === 'PrintTicket') {
					//ATR List Validation
					if (atrList.val() === undefined || !notNull.test(atrList.val()) || atrList.val() === null) {
						bool = false;

						elementAction(atrListValidation, 'validate', 'open');
						atrListValidation.html('Please ensure to select ATR.');
					} else {
						elementAction(atrListValidation, 'validate', 'close');
						elementAction(atrListValidation, 'clear');
					}

					//Service - Segment List Validation
					if (serviceSegment.val() === undefined || serviceSegment.val() === '0' || !notNull.test(serviceSegment.val()) || serviceSegment.val() === null) {
						bool = false;

						elementAction(serviceSegmentSelectValidation, 'validate', 'open');
						serviceSegmentSelectValidation.html('Please ensure to select Service - Segment.');
					} else {
						elementAction(serviceSegmentSelectValidation, 'validate', 'close');
						elementAction(serviceSegmentSelectValidation, 'clear');
					}

					//Ticket Design List Validation
					if (ticketDesign.val() === undefined || ticketDesign.val() === '0' || !notNull.test(ticketDesign.val()) || ticketDesign.val() === null) {
						bool = false;

						elementAction(ticketDesignValidation, 'validate', 'open');
						ticketDesignValidation.html('Please ensure to select Ticket Design.');
					} else {
						elementAction(ticketDesignValidation, 'validate', 'close');
						elementAction(ticketDesignValidation, 'clear');
					}

					//Copy Count Validation
					if (copyCount.val() === undefined || copyCount.val() === '0' || !notNull.test(copyCount.val()) || copyCount.val() === null) {
						bool = false;

						elementAction(copyCountValidation, 'validate', 'open');

						if (copyCount.val() === '0')
							copyCountValidation.html('Copy count value must be higher than 0.');
						else
							copyCountValidation.html('Copy Count can\'t be null or empty. Please ensure to enter a correct number.');

					} else {
						elementAction(copyCountValidation, 'validate', 'close');
						elementAction(copyCountValidation, 'clear');
					}
				}
				//Login Customer Action Validations
				else if (action === 'LoginCustomer') {
					//Text Box List Validation
					if (textBoxes.children().length === 0) {
						bool = false;

						elementAction(textBoxesValidation, 'validate', 'open');
						textBoxesValidation.html('Login Customer action required a textbox, please ensure to add textbox(es) before use this action.');
					}
					else if (textBoxes.val() === undefined || !notNull.test(textBoxes.val()) || textBoxes.val() === null) {
						bool = false;

						elementAction(textBoxesValidation, 'validate', 'open');
						textBoxesValidation.html('Please ensure to select textbox.');
					} else {
						elementAction(textBoxesValidation, 'validate', 'close');
						elementAction(textBoxesValidation, 'clear');
					}

					//Success Page Validation
					if (succesPage.val() === undefined || !notNull.test(succesPage.val()) || succesPage.val() === null) {
						bool = false;

						elementAction(successPageValidation, 'validate', 'open');
						successPageValidation.html('Please ensure to select success page.');
					} else {
						elementAction(successPageValidation, 'validate', 'close');
						elementAction(successPageValidation, 'clear');
					}

					//Error Page Validation
					if (errorPage.val() === undefined || !notNull.test(errorPage.val()) || errorPage.val() === null) {
						bool = false;

						elementAction(errorPageValidation, 'validate', 'open');
						errorPageValidation.html('Please ensure to select error page.');
					} else {
						elementAction(errorPageValidation, 'validate', 'close');
						elementAction(errorPageValidation, 'clear');
					}
				}
				//Run Intergrator Action Validations
				else if (action === 'RunIntegrator') {
					//Data Integrator Existence Validation
					let integratorObject = $('[type="DataIntegrator"]');

					if (integratorObject.length === 0) {
						bool = false;

						elementAction(buttonDataBindValidation, 'validate', 'open');
						buttonDataBindValidation.html('Data Integrator not exist in design. Before using this action data integrator must add.');
					} else {
						elementAction(buttonDataBindValidation, 'validate', 'close');
						elementAction(buttonDataBindValidation, 'clear');
					}
				}

			}
		}
	}

	function validateMediaElement() {
		if (currentElement === undefined || currentElement === null || currentElement === '') {

			//Playlist Validate
			if (element.attr('playlist') === undefined || !notNull.test(element.attr('playlist')))
				bool = false;

		}
		else {
			//Playlist Validate
			if (playList.val() === undefined || !notNull.test(playList.val()) || playList.val() === null) {
				bool = false;

				elementAction(playListValidation, 'validate', 'open');
				playListValidation.html('Please ensure to select a video from file browser or type a correct video link.');
			} else {
				elementAction(playListValidation, 'validate', 'close');
				elementAction(playListValidation, 'clear');
			}

		}
	}

	function validateTextBox() {
		if (currentElement === undefined || currentElement === null || currentElement === '') {

			//Action Validate
			if (element.attr('action') === undefined || !notNull.test(element.attr('action')))
				bool = false;

		}
		else {
			//Action Validate
			if (textBoxAction.val() === undefined || !notNull.test(textBoxAction.val()) || textBoxAction.val() === null) {
				bool = false;

				elementAction(textBoxActionValidation, 'validate', 'open');
				textBoxActionValidation.html('Please ensure to select an action.');
			} else {
				elementAction(textBoxActionValidation, 'validate', 'close');
				elementAction(textBoxActionValidation, 'clear');
			}

		}
	}

	function validateNumpad() {
		if (currentElement === undefined || currentElement === null || currentElement === '') {

			//Action Validate
			if (element.attr('parameter') === undefined || !notNull.test(element.attr('parameter')))
				bool = false;

		}
		else {
			//Text Box List Validation
			if (textBoxes.children().length === 0) {
				bool = false;

				elementAction(textBoxesValidation, 'validate', 'open');
				textBoxesValidation.html('To use numpad, at least one textbox must be added in design.');
			}
			else if (textBoxes.val() === undefined || !notNull.test(textBoxes.val()) || textBoxes.val() === null) {
				bool = false;

				elementAction(textBoxesValidation, 'validate', 'open');
				textBoxesValidation.html('Please ensure to select textbox.');
			} else {
				elementAction(textBoxesValidation, 'validate', 'close');
				elementAction(textBoxesValidation, 'clear');
			}

		}
	}

	function validateDataIntegrator() {
		if (currentElement === undefined || currentElement === null || currentElement === '') {

			//Service Type Validate
			if (element.attr('servicetype') === undefined || !notNull.test(element.attr('servicetype')) || element.attr('servicetype') === null)
				bool = false;

			//Service URL Validate
			if (element.attr('serviceurl') === undefined || !notNull.test(element.attr('serviceurl')) || element.attr('serviceurl') === null)
				bool = false;

			//Service URL Validate
			if (element.attr('method') === undefined || !notNull.test(element.attr('method')) || element.attr('method') === null)
				bool = false;

			//Argument Validate
			if (element.children('[type="Argument"]').length === 0)
				bool = false;

			//Return Type Validate
			if (element.children('[type="Return"]').length === 0)
				bool = false;
		}
		else {
			//Service Types Validation
			if (serviceType.val() === undefined || !notNull.test(serviceType.val()) || serviceType.val() === null) {
				bool = false;

				elementAction(serviceTypeValidation, 'validate', 'open');
				serviceTypeValidation.html('Please ensure to select service type.');
			} else {
				elementAction(serviceTypeValidation, 'validate', 'close');
				elementAction(serviceTypeValidation, 'clear');
			}

			//Service URL Validation
			if (serviceUrl.val() === undefined || !notNull.test(serviceUrl.val()) || serviceUrl.val() === null) {
				bool = false;

				elementAction(serviceUrlValidation, 'validate', 'open');
				serviceUrlValidation.html('Please ensure to enter service URL.');
			} else {
				elementAction(serviceUrlValidation, 'validate', 'close');
				elementAction(serviceUrlValidation, 'clear');
			}

			//Method Validation
			if (methodBox.val() === undefined || !notNull.test(methodBox.val()) || methodBox.val() === null) {
				bool = false;

				elementAction(methodBoxValidation, 'validate', 'open');
				methodBoxValidation.html('Please ensure to enter a correct method.');
			} else {
				elementAction(methodBoxValidation, 'validate', 'close');
				elementAction(methodBoxValidation, 'clear');
			}

			//Argument List Validation
			if (argumentList.children('[type="Argument"]').length === 0) {
				bool = false;

				elementAction(argumentListValidation, 'validate', 'open');
				argumentListValidation.html('Data Integrator needed arguments to work. Argument List is empty, please ensure to add one argument at least.');
			} else {
				elementAction(argumentListValidation, 'validate', 'close');
				elementAction(argumentListValidation, 'clear');
			}

			//Return List Validation
			if (returnList.children('[type="Return"]').length === 0) {
				bool = false;

				elementAction(returnListValidation, 'validate', 'open');
				returnListValidation.html('Data Integrator needed return types to work. Return Type List is empty, please ensure to add one return type at least.');
			} else {
				elementAction(returnListValidation, 'validate', 'close');
				elementAction(returnListValidation, 'clear');
			}
		}
	}

	function validateReturnTrigger() {
		if (currentElement === undefined || currentElement === null || currentElement === '') {
			//Integrator Validate
			if (element.attr('integrator') === undefined || !notNull.test(element.attr('integrator')))
				bool = false;

			//Parameter Validate
			if (element.attr('paramater') === undefined || !notNull.test(element.attr('paramater')))
				bool = false;

			//Trigger Validate
			if (element.attr('trigger') === undefined || !notNull.test(element.attr('trigger')))
				bool = false;

			//Argument Validate
			if (element.attr('argument') === undefined || !notNull.test(element.attr('argument')))
				bool = false;

			//Error Page Validate
			if (element.attr('errorpage') === undefined || !notNull.test(element.attr('errorpage')))
				bool = false;

			//Success Page Validate
			if (element.attr('successpage') === undefined || !notNull.test(element.attr('successpage')))
				bool = false;

		}
		else {
			//Parameter Validate
			if (parameterList.val() === undefined || !notNull.test(parameterList.val()) || parameterList.val() === null) {
				bool = false;

				elementAction(parameterValidation, 'validate', 'open');
				parameterValidation.html('Please ensure to select parameter.');
			} else {
				elementAction(parameterValidation, 'validate', 'close');
				elementAction(parameterValidation, 'clear');
			}

			//Trigger Type Validate
			if (triggerType.val() === undefined || !notNull.test(triggerType.val()) || triggerType.val() === null) {
				bool = false;

				elementAction(triggerTypeValidation, 'validate', 'open');
				triggerTypeValidation.html('Please ensure to select trigger type.');
			} else {
				elementAction(triggerTypeValidation, 'validate', 'close');
				elementAction(triggerTypeValidation, 'clear');
			}

			//Trigger Argument Validate
			if (triggerArgument.val() === undefined || !notNull.test(triggerArgument.val())) {
				bool = false;

				elementAction(argumentValidation, 'validate', 'open');
				triggerArgument.html('Please ensure to enter a correct argument format.');
			} else {
				elementAction(argumentValidation, 'validate', 'close');
				elementAction(argumentValidation, 'clear');
			}

			//Trigger Argument Validate
			if (triggerArgument.val() === undefined || !notNull.test(triggerArgument.val())) {
				bool = false;

				elementAction(argumentValidation, 'validate', 'open');
				triggerArgument.html('Please ensure to enter a correct argument format.');
			} else {
				elementAction(argumentValidation, 'validate', 'close');
				elementAction(argumentValidation, 'clear');
			}

			//Success Page Validation
			if (succesPage.val() === undefined || !notNull.test(succesPage.val()) || succesPage.val() === null) {
				bool = false;

				elementAction(successPageValidation, 'validate', 'open');
				successPageValidation.html('Please ensure to select success page.');
			} else {
				elementAction(successPageValidation, 'validate', 'close');
				elementAction(successPageValidation, 'clear');
			}

			//Error Page Validation
			if (errorPage.val() === undefined || !notNull.test(errorPage.val()) || errorPage.val() === null) {
				bool = false;

				elementAction(errorPageValidation, 'validate', 'open');
				errorPageValidation.html('Please ensure to select error page.');
			} else {
				elementAction(errorPageValidation, 'validate', 'close');
				elementAction(errorPageValidation, 'clear');
			}

		}
	}

	function validateAppointmentList() {
		if (currentElement === undefined || currentElement === null || currentElement === '') {
			//Ticket Design Validate
			if (element.attr('ticketdesignid') === undefined || !notNull.test(element.attr('ticketdesignid')))
				bool = false;

			//Action Validate
			if (element.attr('copycount') === undefined || !notNull.test(element.attr('copycount')))
				bool = false;
		}
		else {
			//Ticket Design Validate
			if (ticketDesignList.val() === undefined || !notNull.test(ticketDesignList.val()) || ticketDesignList.val() === null) {
				bool = false;

				elementAction(ticketDesignListValidation, 'validate', 'open');
				ticketDesignListValidation.html('Please ensure to select ticket design.');
			} else {
				elementAction(ticketDesignListValidation, 'validate', 'close');
				elementAction(ticketDesignListValidation, 'clear');
			}

			//Ticket Design Validate
			if (copyCount.val() === undefined || !notNull.test(copyCount.val()) || copyCount.val() === '0') {
				bool = false;

				elementAction(copyCountValidation, 'validate', 'open');
				copyCountValidation.html('Please ensure to enter copy count.');
			} else {
				elementAction(copyCountValidation, 'validate', 'close');
				elementAction(copyCountValidation, 'clear');
			}
		}
	}

	//Validate Common Properties if Element Selected
	if (element === 'common')
		validateCommonProperties();

	if (element === 'validatePage')
		validatePage();
	else if (ElementType === 'Label')
		validateLabel();
	else if (ElementType === 'Button')
		validateButton();
	else if (ElementType === 'MediaElement')
		validateMediaElement();
	else if (ElementType === 'TextBox')
		validateTextBox();
	else if (ElementType === 'NumPad')
		validateNumpad();
	else if (ElementType === 'DataIntegrator')
		validateDataIntegrator();
	else if (ElementType === 'ReturnTrigger')
		validateReturnTrigger();
	else if (ElementType === 'AppointmentList')
		validateAppointmentList();

	return bool;
}

//Delete Item
function RemoveItem(element) {
	if (notNull.test(elementId.val()))
		$("#" + elementId.val()).remove();
	else if (typeof element === 'object')
		$(element).remove();
	else
		alert('Opps');

	//Delete Return Triggers from design if deleted item is Data Integrator
	if ($(currentElement).attr('type') === "DataIntegrator") {
		$('[type*="ReturnTrigger"]').remove();
	}
	else if ($(currentElement).attr('type') === "TextBox") {
		//Delete textbox from textbox lists
		$('#' + textBoxes.attr('id') + ' > option[value="' + $(currentElement).attr('name') + '"]').remove();
		$('#' + textBoxList.attr('id') + ' > option[value="' + $(currentElement).attr('name') + '"]').remove();

	}
	elementAction('all', 'clear');
	elementAction('all', 'close');
}

//Create New Item
function createElement(elementtype) {
	//Increase Total Element Count
	ElementCount++;

	//Control Element
	let elementControl = $('#' + ElementCount + '');

	//If This Id Assign to Another Element.
	if (elementControl.length > 0)
		controlElement();

	let element;

	if (elementtype === "Label") {
		element = $('<div class="uiElement" data-bind="Static" bold="false" italic="false" underline="false"  parameter="0" style="width:50px; height:50px; left:5px; top:5px; border:dotted 2px #CCC; cursor:pointer; color:rgb(0,0,0); font-family: Arial; font-size:16px;" type="Label" name="Label' + ElementCount + '" id="' + ElementCount + '" element-left="0.13" element-top="0.22" element-width="32.00" element-height="3.00"><label>Label Item</label></div>');
	}
	else if (elementtype === "WMV") {
		element = $('<div class="uiElement rw" playlist="" type="MediaElement" id="' + ElementCount + '" name="MediaElement' + ElementCount + '" style="width:350px; height:200px; left:5px; top:5px;" element-left="0.13" element-top="0.22" element-width="38.00" element-height="12.50"><video style="width:100%; height:100%;" controls> <source src= "#" type= "video/mp4" > <source src="#" type="video/ogg" ></video><span class="fa fa-play cntr" style="position: absolute;">&nbsp;</span></div>');
	}
	else if (elementtype === "Button") {
		element = $('<div class="uiElement rw" title="noBackground" style="width:300px; height:50px; left:5px; top:5px; background-size:100% 100%;" type="Button" name="Button' + ElementCount + '" id="' + ElementCount + '" element-left="0.54" element-top="0.30" element-width="32.44" element-height="3.04" action="GoToScreen"> <label style="display:none;"></label> <span class="fa fa-square-o cntr">&nbsp;</span></div>');
	}
	else if (elementtype === "TextBox") {
		element = $('<div class="uiElement rw" style="width:300px; height:50px; left:5px; top:5px;" type="TextBox" text="" bold="false" italic="false" underline="false" action="Text" name = "TextBox' + ElementCount + '" id = "' + ElementCount + '" element-left="0.13" element-top="0.22" element-width="32" element-height="3"> <label></label> <span class="fa fa-font cntr">&nbsp;</span></div>');

		//After Adding Text Box will update requirements lists
		textBoxes.append('<option value="TextBox' + ElementCount + '">TextBox' + ElementCount + '</option>');
	}
	else if (elementtype === "QRCode") {
		element = $('<div class="uiElement rw" style="width:300px; height:300px; left:5px; top:5px;" type="QRCode" text="" action="QR" name = "QRCode' + ElementCount + '" id = "' + ElementCount + '" element-left="0.13" element-top="0.22" element-width="32" element-height="3"> <label style="display:none;"></label> <span class="fa fa-barcode cntr">&nbsp;</span></div>');
	}
	else if (elementtype === "NumPad") {
		element = $('<div class="uiElement rw" style="width:300px; height:400px; left:5px; top:5px;" type="NumPad" action="" parameter="" background="" name="NumPad' + ElementCount + '" id="' + ElementCount + '" element-left="0.13" element-top="0.22" element-width="32" element-height="24"><span class="fa fa-keyboard-o cntr">&nbsp;</span></div>');

	}
	else if (elementtype === "DataIntegrator") {
		//To controll there is any data integrator exist
		const anyIntagrator = $('[type*=DataIntegrator]');
		//If there's integrator swal will pop up
		if (anyIntagrator.length > 0) {
			swal({
				icon: "warning",
				title: 'Data Integrator already exist in current design!',
				text: 'You can\'t  create another data integrator but you can modify it.'
			});
		}
		//If there is no integrator exist can add integrator.
		else {
			element = $('<div class="uiElement rw" style="width:300px; height:50px; left:5px; top:5px;" type="DataIntegrator" servicetype="WCF" serviceurl="" method="" name="DataIntegrator' + ElementCount + '" id = "' + ElementCount + '" element-left="0.13" element-top="0.22" element-width="32" element-height="3"> <span class="fa fa-connectdevelop cntr">&nbsp;</span></div>');

		}
	}
	else if (elementtype === "ReturnTrigger") {
		//To controll there is any data integrator exist
		const anyIntagrator = $('[type*=DataIntegrator]');
		//If there's no integrator swal will pop up
		if (anyIntagrator.length === 0) {
			return swal({
				icon: 'warning',
				title: 'Data Intergrator is not exist in current design!',
				text: 'Before you create a new Return Trigger, you must create Data Integrator'
			});
		}

		//If any integrator exist can add return trigger.
		element = $('<div class="uiElement rw" style="width:300px; height:50px; left:5px; top:5px;" onclick="GetProperties($(this));" name="ReturnTrigger' + ElementCount + '" id="' + ElementCount + '" type="ReturnTrigger" integrator="" paramater="" trigger="" argument="" errorpage="" successpage="" element-left="0.13" element-top="0.22" element-width="32" element-height="3"><i class="fa fa-undo cntr"></i></div>');
	}
	else if (elementtype === "AppointmentList") {
		element = $('<div class="uiElement rw" type="AppointmentList" title="" style="width:300px; height:400px; left:5px; top:5px;"  action=""  parameter="" background="" name="AppointmentList' + ElementCount + '" id="' + ElementCount + '" element-left="0.13" element-top="0.22" element-width="32" element-height="24"><span class="fa fa-list cntr">&nbsp;</span></div>');
	}

	//Appent
	$("#DesignArea").append(element);

	//After creating new element, giving this element draggable and resizable options
	draggable();
	droppable();
	resizable();

}

//Control Element Id
function controlElement() {
	let elements = $('.uiElement');
	let biggestId = 0;
	for (var i = 0; i < elements.length; i++) {
		if (parseFloat($(elements[i]).attr('id')) > biggestId)
			biggestId = parseFloat($(elements[i]).attr('id'));
	}

	if (biggestId > 0) {
		//Element Count
		ElementCount = biggestId;

		ElementCount++;
	}

}

//Add Argument Function
function AddArgument(dIntagratorName, argumentName, textBoxName) {
	if (dIntagratorName !== "" && argumentName !== "" && textBoxName !== "" && dIntagratorName !== " " && argumentName !== " " && textBoxName !== " ") {

		//Show new css element to show argument
		let text = "";
		text += '<div class="input-group" type="Argument" name="' + argumentName + '" integrator="' + dIntagratorName + '" textbox="' + textBoxName + '">';
		text += '<span class="input-group-addon arg-name" id="basic-addon3" style="width: 40%;">' +
			argumentName +
			'</span>';
		text += '<span class="input-group-addon txt-name" id="basic-addon3" style="width: 40%;">' +
			textBoxName +
			'</span>';
		text += '<button type="button"  onClick="DeleteItem($(this))" class="btn btn-danger delete-element" style="float:right; margin-right: 10px; margin-top:5px;"> <i class="fa fa-times"></i> </button>';
		text += '</div>';

		//Append Argument to under Data Integrator
		$('#argument-list').append(text);
		text = "";

		//Then clear Argument Name Input for Next Entry
		$('#argumentName').val("");
	} else {
		//If controls fail swall will pop-up.
		swal({
			icon: "warning",
			title: 'Are you missing something ?',
			text: 'Please ensure you fill a required fields'
		});
	}

}

//Add Return Function
function AddReturns(dIntagratorName, returnName, returnType) {

	if (dIntagratorName !== "" && returnName !== "" && returnType !== "" && dIntagratorName !== " " && returnName !== " " && returnType !== " ") {
		//Show new css element to show argument
		let text = "";
		text += '<div class="input-group" type="Return" name="' + returnName + '" integrator="' + dIntagratorName + '" returntype="' + returnType + '">';
		text += '<span class="input-group-addon arg-name" id="basic-addon3" style="width: 40%;">' +
			returnName +
			'</span>';
		text += '<span class="input-group-addon txt-name" id="basic-addon3" style="width: 40%;">' +
			returnType +
			'</span>';
		text += '<button type="button" onClick="DeleteItem($(this))" class="btn btn-danger delete-element" style="float:right; margin-right: 10px; margin-top:5px;"> <i class="fa fa-times"></i> </button>';
		text += '</div>';

		//Append Argument to under Data Integrator
		$('#return-list').append(text);
		text = "";

		//Then clear Argument Name Input for Next Entry
		$('#returnName').val("");
	} else {
		//If controls fail swall will pop-up.
		swal({
			icon: "warning",
			title: 'Are you missing something ?',
			text: 'Please ensure you fill a required fields'
		});
	}
}

//Delete Argument and Return Function
function DeleteItem(element) {
	element.parent().remove();

}

//Convert To XML
function ConvertToMagic() {
	if (pageReset.val() === "") {
		return "reset";
	}
	else if (pauseDesign.val() === "") {
		pausedesign = 0;
	}

	var TheCode = "<Design>\n";
	TheCode = TheCode + '\t<Page type="KioskPage" name="' + pageTitle.val() + '" BackgroundImage="' + pageBackground.val() + '"  ResetTime="' + pageReset.val() + '" PauseScreen="' + pauseDesign.val() + '">\n\n';

	$("#DesignArea").children().each(function () {
		var element = $(this);

		var element_type = element.attr("type");
		var element_id = element.attr("id");
		var element_name = element.attr("name");
		var element_positionx = element.attr('element-left');
		var element_positiony = element.attr('element-top');
		var element_width = element.attr('element-width');
		var element_height = element.attr('element-height');

		if (element_type === "Label") {
			var element_text = element.children('label').text();
			var element_action = element.attr("data-bind");
			var element_parameter = element.attr("parameter");
			var element_font = element.css("font-family");
			var element_fontsize = element.css("font-size");
			var element_color = element.css("color");

			var element_bold = element.attr("bold");
			var element_italic = element.attr("italic");
			var element_underline = element.attr("underline");

			var element_align = element.attr("align");
			var element_valign = element.attr("valign");

			TheCode += '\t<Control type="Label">\n';
			TheCode += '\t\t<Type>Label</Type>\n';
			TheCode += '\t\t<Identifier>' + element_id + '</Identifier>\n';
			TheCode += '\t\t<Name>' + element_name + '</Name>\n';
			TheCode += '\t\t<Text>' + element_text + '</Text>\n';
			TheCode += '\t\t<PositionX>' + element_positionx + '</PositionX>\n';
			TheCode += '\t\t<PositionY>' + element_positiony + '</PositionY>\n';
			TheCode += '\t\t<Width>' + element_width + '</Width>\n';
			TheCode += '\t\t<Height>' + element_height + '</Height>\n';
			TheCode += '\t\t<Action>' + element_action + '</Action>\n';
			TheCode += '\t\t<Parameter>' + element_parameter + '</Parameter>\n';
			TheCode += '\t\t<Font>' + element_font + '</Font>\n';
			TheCode += '\t\t<Size>' + element_fontsize + '</Size>\n';
			TheCode += '\t\t<Color>' + element_color + '</Color>\n';
			TheCode += '\t\t<Bold>' + element_bold + '</Bold>\n';
			TheCode += '\t\t<Italic>' + element_italic + '</Italic>\n';
			TheCode += '\t\t<Underline>' + element_underline + '</Underline>\n';
			TheCode += '\t\t<Align>' + element_align + '</Align>\n';
			TheCode += '\t\t<Valign>' + element_valign + '</Valign>\n';
			TheCode += "\t</Control>\n\n";
		}
		else if (element_type === "MediaElement") {
			var element_playlist = element.attr("playlist");

			TheCode += '\t<Control type="MediaElement">\n';
			TheCode += '\t\t<Type>MediaElement</Type>\n';
			TheCode += '\t\t<Identifier>' + element_id + '</Identifier>\n';
			TheCode += '\t\t<Name>' + element_name + '</Name>\n';
			TheCode += '\t\t<PositionX>' + element_positionx + '</PositionX>\n';
			TheCode += '\t\t<PositionY>' + element_positiony + '</PositionY>\n';
			TheCode += '\t\t<Width>' + element_width + '</Width>\n';
			TheCode += '\t\t<Height>' + element_height + '</Height>\n';
			TheCode += '\t\t<BackgroundImage>' + element_playlist + '</BackgroundImage>\n';
			TheCode += "\t</Control>\n\n";
		}
		else if (element_type === "Button") {
			var btnbg = element.attr("title");
			var btnaction = element.attr("action");
			var btnparameter = element.attr("parameter");
			let btn_text = element.children('label').text();

			TheCode += '\t<Control type="Button">\n';
			TheCode += "\t\t<Identifier>" + element_id + "</Identifier>\n";
			TheCode += "\t\t<Name>" + element_name + "</Name>\n";
			TheCode += "\t\t<Text>" + btn_text + "</Text>\n";
			TheCode += "\t\t<BackgroundImage>" + btnbg + "</BackgroundImage>\n";
			TheCode += "\t\t<PositionX>" + element_positionx + "</PositionX>\n";
			TheCode += "\t\t<PositionY>" + element_positiony + "</PositionY>\n";
			TheCode += "\t\t<Width>" + element_width + "</Width>\n";
			TheCode += "\t\t<Height>" + element_height + "</Height>\n";
			TheCode += "\t\t<Action>" + btnaction + "</Action>\n";
			TheCode += "\t\t<Parameter>" + btnparameter + "</Parameter>\n";
			TheCode += "\t</Control>\n\n";
		}
		else if (element_type === "TextBox") {
			let txt_text = element.children('label').text();
			let txt_font = element.css("font-family");
			let txt_fontsize = element.css("font-size");
			let txt_color = element.css("color");
			let action = element.attr('action');

			let txt_bold = element.attr("bold");
			let txt_italic = element.attr("italic");
			let txt_underline = element.attr("underline");

			TheCode += '\t<Control type="TextBox">\n';
			TheCode += '\t\t<Identifier>' + element_id + '</Identifier>\n';
			TheCode += '\t\t<Name>' + element_name + '</Name>\n';
			TheCode += '\t\t<Text>' + txt_text + '</Text>\n';
			TheCode += '\t\t<Action>' + action + '</Action>\n';
			TheCode += '\t\t<PositionX>' + element_positionx + '</PositionX>\n';
			TheCode += '\t\t<PositionY>' + element_positiony + '</PositionY>\n';
			TheCode += '\t\t<Width>' + element_width + '</Width>\n';
			TheCode += '\t\t<Height>' + element_height + '</Height>\n';
			TheCode += '\t\t<Font>' + txt_font + '</Font>\n';
			TheCode += '\t\t<Size>' + txt_fontsize + '</Size>\n';
			TheCode += '\t\t<Color>' + txt_color + '</Color>\n';
			TheCode += '\t\t<Bold>' + txt_bold + '</Bold>\n';
			TheCode += '\t\t<Italic>' + txt_italic + '</Italic>\n';
			TheCode += '\t\t<Underline>' + txt_underline + '</Underline>\n';
			TheCode += "\t</Control>\n\n";
		}
		else if (element_type === "QRCode") {
			let txt_text = element.children('label').text();

			TheCode += '\t<Control type="QRCode">\n';
			TheCode += '\t\t<Identifier>' + element_id + '</Identifier>\n';
			TheCode += '\t\t<Name>' + element_name + '</Name>\n';
			TheCode += '\t\t<Text>' + txt_text + '</Text>\n';
			TheCode += '\t\t<PositionX>' + element_positionx + '</PositionX>\n';
			TheCode += '\t\t<PositionY>' + element_positiony + '</PositionY>\n';
			TheCode += '\t\t<Width>' + element_width + '</Width>\n';
			TheCode += '\t\t<Height>' + element_height + '</Height>\n';
			TheCode += "\t</Control>\n\n";
		}
		else if (element_type === "NumPad") {

			var numbg = element.attr("background");
			var parm = element.attr("parameter");

			TheCode += '\t<Control type="NumPad">\n';
			TheCode += "\t\t<Identifier>" + element_id + "</Identifier>\n";
			TheCode += "\t\t<Name>" + element_name + "</Name>\n";
			TheCode += "\t\t<BackgroundImage>" + numbg + "</BackgroundImage>\n";
			TheCode += "\t\t<PositionX>" + element_positionx + "</PositionX>\n";
			TheCode += "\t\t<PositionY>" + element_positiony + "</PositionY>\n";
			TheCode += "\t\t<Width>" + element_width + "</Width>\n";
			TheCode += "\t\t<Height>" + element_height + "</Height>\n";
			TheCode += "\t\t<Action>TextBox</Action>\n";
			TheCode += "\t\t<Parameter>" + parm + "</Parameter>\n";
			TheCode += "\t</Control>\n\n";
		}
		else if (element_type === "DataIntegrator") {
			//Detect Any Arguments
			const args = $('#' + $(element).attr('id') + ' > [type*="Argument"]');
			const returns = $('#' + $(element).attr('id') + ' > [type*="Return"]');
			const serviceType = $(element).attr('servicetype');
			const serviceUrl = $(element).attr('serviceurl');
			const method = $(element).attr('method');


			TheCode += '\t<Control type="DataIntegrator">\n';
			TheCode += '\t\t<Identifier>' + element_id + '</Identifier>\n';
			TheCode += '\t\t<Name>' + element_name + '</Name>\n';
			TheCode += '\t\t<ServiceType>' + serviceType + '</ServiceType>\n';
			TheCode += '\t\t<ServiceURL>' + serviceUrl + '</ServiceURL>\n';
			TheCode += '\t\t<PositionX>' + element_positionx + '</PositionX>\n';
			TheCode += '\t\t<PositionY>' + element_positiony + '</PositionY>\n';
			TheCode += '\t\t<Width>' + element_width + '</Width>\n';
			TheCode += '\t\t<Height>' + element_height + '</Height>\n';

			//If any arguement type element exist, create sub elements
			if (args.length > 0) {
				TheCode += '\t\t<Arguments>\n';
				args.each((i, v) => {
					TheCode += '\t\t\t <Argument>\n';
					TheCode += '\t\t\t\t  <Name>' + $(v).attr('name') + '</Name>\n';
					TheCode += '\t\t\t\t  <Value>' + $(v).attr('textbox') + '</Value>\n';
					TheCode += '\t\t\t </Argument>\n';
				});
				TheCode += '\t\t</Arguments>\n';
			} else {
				TheCode += '\t\t<Arguments></Arguments>\n';
			}
			TheCode += '\t\t<Method>' + method + '</Method>\n';
			//If any return type element exist, create sub elements
			if (returns.length > 0) {
				TheCode += '\t\t<Returns>\n';
				returns.each((i, v) => {
					TheCode += '\t\t <Return>\n';
					TheCode += '\t\t  <Name>' + $(v).attr('name') + '</Name>\n';
					TheCode += '\t\t  <Type>' + $(v).attr('returntype') + '</Type>\n';
					TheCode += '\t\t </Return>\n';
				});
				TheCode += '\t\t</Returns>\n';
			} else {
				TheCode += '\t\t<Returns></Returns>\n';
			}

			TheCode += "\t</Control>\n\n";

		}
		else if (element_type === "ReturnTrigger") {
			const integrator = $(element).attr('integrator');
			const parameter = $(element).attr('paramater');
			const trigger = $(element).attr('trigger');
			const argument = $(element).attr('argument');
			const errorPage = $(element).attr('errorpage');
			const successPage = $(element).attr('successpage');

			TheCode += '\t<Control type="ReturnTrigger">\n';
			TheCode += "\t\t<Identifier>" + element_id + "</Identifier>\n";
			TheCode += "\t\t<Name>" + element_name + "</Name>\n";
			TheCode += "\t\t<Integrator>" + integrator + "</Integrator>\n";
			TheCode += "\t\t<Parameter>" + parameter + "</Parameter>\n";
			TheCode += "\t\t<Trigger>" + trigger + "</Trigger>\n";
			TheCode += "\t\t<Argument>" + argument + "</Argument>\n";
			TheCode += "\t\t<ErrorPage>" + errorPage + "</ErrorPage>\n";
			TheCode += "\t\t<SuccessPage>" + successPage + "</SuccessPage>\n";
			TheCode += "\t\t<PositionX>" + element_positionx + "</PositionX>\n";
			TheCode += "\t\t<PositionY>" + element_positiony + "</PositionY>\n";
			TheCode += "\t\t<Width>" + element_width + "</Width>\n";
			TheCode += "\t\t<Height>" + element_height + "</Height>\n";
			TheCode += "\t</Control>\n\n";
		}
		else if (element_type === "AppointmentList") {

			const fontFamily = element.css("font-family");
			const fontSize = element.css("font-size");
			const fontColor = element.css("color");
			const copyCount = element.attr('copycount');
			const design = element.attr('ticketdesignid');
			let backgroundImage = '';

			if (element.attr('title').indexOf('url') === -1)
				backgroundImage = 'url("' + element.attr("title") + '")';
			else
				backgroundImage = '' + element.attr('title') + '';

			TheCode += '\t<Control type="AppointmentList">\n';
			TheCode += '\t\t<Identifier>' + element_id + '</Identifier>\n';
			TheCode += '\t\t<Name>' + element_name + '</Name>\n';
			TheCode += '\t\t<BackgroundImage>' + backgroundImage + '</BackgroundImage>\n';
			TheCode += '\t\t<PositionX>' + element_positionx + '</PositionX>\n';
			TheCode += '\t\t<PositionY>' + element_positiony + '</PositionY>\n';
			TheCode += '\t\t<Width>' + element_width + '</Width>\n';
			TheCode += '\t\t<Height>' + element_height + '</Height>\n';
			TheCode += '\t\t<Font>' + fontFamily + '</Font>\n';
			TheCode += '\t\t<Size>' + fontSize + '</Size>\n';
			TheCode += '\t\t<Color>' + fontColor + '</Color>\n';
			TheCode += '\t\t<CopyCount>' + copyCount + '</CopyCount>\n';
			TheCode += '\t\t<TicketDesign>' + design + '</TicketDesign>\n';
			TheCode += "\t</Control>\n\n";

		}
	});

	TheCode = TheCode + '\t</Page>\n</Design>';

	$("#txtSourceCode").val(TheCode);
}

function GoDesigner() {
	$("#DesignTab").show();
	$("#CodeTab").hide();

	$("#btnGoDesigner").addClass("active");
	$("#btnGoSourceCode").removeClass("active");
}

function GoSourceCode() {
	ConvertToMagic();
	$("#CodeTab").show();
	$("#DesignTab").hide();

	$("#btnGoSourceCode").addClass("active");
	$("#btnGoDesigner").removeClass("active");
}

function SaveScreen() {
	//Active Back Designer Page
	GoDesigner();

	var process = ConvertToMagic();

	if (process === "reset") {
		swal({
			title: "Opps... Something Wrong",
			text: "Please ensure you enter Page Reset time correctly.",
			icon: "warning"
		});

		return process;
	}
	else if (process === "pausedesign") {
		return process;
	}
	else {

		//Validate Each Item
		let items = $('.uiElement');
		let isValid = true;
		currentElement = null;
		for (var i = 0; i < items.length; i++) {
			if (!validateElement(items[i]))
				isValid = false;
		}

		if (!isValid) {
			swal({
				icon: 'error',
				title: 'Empty Element',
				text: 'Element added but didn\'t edited or one property missing.'
			});

			return;
		}

		$("form").submit();
	}

}

//Font Bold, Font Italic, Font Underline
function fontActions(value) {
	if (value === 'check') {
		if (currentElement.attr('bold') === 'true')
			$("#font-bold").addClass("btn-primary").removeClass("btn-default");
		else
			$("#font-bold").removeClass("btn-primary").addClass("btn-default");

		if (currentElement.attr('italic') === 'true')
			$("#font-italic").addClass("btn-primary").removeClass("btn-default");
		else
			$("#font-italic").removeClass("btn-primary").addClass("btn-default");

		if (currentElement.attr('underline') === 'true')
			$("#font-underline").addClass("btn-primary").removeClass("btn-default");
		else
			$("#font-underline").removeClass("btn-primary").addClass("btn-default");

	}
	else if (value === 'bold') {
		if (currentElement.attr("bold") === 'true') {

			currentElement.attr("bold", "false");
			$("#font-bold").removeClass("btn-primary").addClass("btn-default");
		}
		else {
			currentElement.attr('bold', 'true');
			$("#font-bold").removeClass("btn-default").addClass("btn-primary");
		}
	}
	else if (value === 'italic') {
		if (currentElement.attr("italic") === "true") {

			currentElement.attr("italic", "false");
			$("#font-italic").removeClass("btn-primary").addClass("btn-default");
		}
		else {
			currentElement.attr("italic", "true");
			$("#font-italic").removeClass("btn-default").addClass("btn-primary");
		}
	}
	else if (value === 'underline') {
		if (currentElement.attr("underline") === "true") {

			currentElement.attr("underline", "false");
			$("#font-underline").removeClass("btn-primary").addClass("btn-default");
		}
		else {
			currentElement.attr("underline", "true");
			$("#font-underline").removeClass("btn-default").addClass("btn-primary");
		}
	}

}

//Calculate Element Left or Top and Width or Height
function elementLeft() {
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

function elementTop() {
	let globalTop = currentElement.get(0).style.top;

	if (globalTop.indexOf('px') >= 0) {
		let top = parseFloat(globalTop.replace("px", ""));

		let result = (top / currentElement.parent().height() * 100).toFixed(2);

		return globalTop = currentElement.attr('element-top') !== result ? result : currentElement.attr('element-top');
	}
	else {
		return globalTop = currentElement.attr('element-top');
	}
}

function elementWidth() {
	let globalWitdh = currentElement.get(0).style.width;

	if (globalWitdh.indexOf('px') >= 0) {
		let top = parseFloat(globalWitdh.replace("px", ""));

		let result = (top / currentElement.parent().width() * 100).toFixed(2);

		return globalWitdh = currentElement.attr('element-width') !== result ? result : currentElement.attr('element-width');
	}
	else {
		return globalWitdh = currentElement.attr('element-width');
	}
}

function elementHeight() {
	let globalHeight = currentElement.get(0).style.height;

	if (globalHeight.indexOf('px') >= 0) {
		let top = parseFloat(globalHeight.replace("px", ""));

		let result = (top / currentElement.parent().height() * 100).toFixed(2);

		return globalHeight = currentElement.attr('element-height') !== result ? result : currentElement.attr('element-height');
	}
	else {
		return globalHeight = currentElement.attr('element-height');
	}
}