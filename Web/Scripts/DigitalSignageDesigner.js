let ElementCount = 0;
let DesignHeight = 0;
let currentElement;
let currentElementId;
let currentElementName;
let currentElementX;
let currentElementY;
let copyElement;
const xArrow = $('#x-arrow');
const yArrow = $('#y-arrow');
let isModalActive = false;
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

//Page Input, Selects and Etc.. => When you add new input, select or etc... declare variable as 'const', then add this item in array named 'allElements' inside of elementAction() function.
// => Container Properties
const pagePropertiesContainer = $('#content-container'),
	commonPropertiesContainer = $('#common-props-container'),
	specialPropertiesContainer = $('#special-props-container'),
	fontPropertiesContainer = $('#font-props-container'),
	setupOption = $('#setup-options'),

	// => Page Properties
	pageTitle = $('#txtPageName'),
	pageBackground = $('#page-background'),
	dingDong = $('#ding-dong'),
	readTicket = $('#read-ticket'),
	readFloor = $('#read-floor'),
	language1 = $('#language-1'),
	language2 = $('#language-2'),
	arabicTranslation = $('#arabic-translation'),
	displayOrientation = $('#display-orientation');


// => Common Properties
elementType = $('#element-type'),
	elementId = $('#element-id'),
	elementName = $('#element-name'),
	elementBackground = $('#element-background'),
	elementCaption = $('#element-caption'),
	positionX = $('#position-x'),
	positionY = $('#position-y'),
	sizeX = $('#size-x'),
	sizeY = $('#size-y'),

	// => Special Properties
	dataBind = $('#data-bind'),
	parameter = $('#parameter'),
	terminal = $('#terminal'),
	rightToLeft = $('#right-to-left'),
	tickRate = $('#tick-rate'),
	tickPercentage = $('#tick-percentage'),
	autoScroll = $('#auto-scroll'),
	dataSource = $('#data-source'),
	rowCount = $('#row-count'),
	rowName = $('#row-name'),
	rowMap = $('#row-map'),
	refreshTime = $('#refresh-time'),
	showDate = $('#show-date'),
	showTime = $('#show-time'),
	playList = $('#play-list'),
	rowAccordion = $('#row-accordion'),
	rowList = $('#row-list'),
	waitingList = $('#waiting-list-multi-select'),
	lengthInput = $('#length'),
	borderThickness = $('#border-thickness'),
	showBorder = $('#show-border'),
	macroList = $('#macro-list'),
	branchList = $('#branch-list'),

	// => Font Properties
	fontStyle = $('#font-list'),
	fontSize = $('#font-size'),
	fontColour = $('#font-colour'),
	align = $('#align'),
	vAlign = $('#valign'),
	bold = $('#font-bold'),
	italic = $('#font-italic'),
	underline = $('#font-underline'),

	// => Validation Properties
	//	-Page Property Validation
	language1Validate = $('#language1-validation'),
	language2Validate = $('#language2-validation'),
	arabicTranslationValidate = $('#arabic-translation-validation'),

	//	-Common Props Area
	idValidate = $('#id-validation'),
	nameValidate = $('#name-validation'),
	captionValidate = $('#caption-validation'),
	posXValidate = $('#posx-validation'),
	posYValidate = $('#posy-validation'),
	sizeXValidate = $('#sizex-validation'),
	sizeYValidate = $('#sizey-validation'),

	//	-Special Properties
	dataBindValidate = $('#data-bind-validation'),
	parameterValidate = $('#parameter-validation'),
	terminalValidate = $('#terminal-validation'),
	rightToLeftValidate = $('#right-to-left-validation'),
	tickRateValidate = $('#tick-rate-validation'),
	tickPercecntageValidate = $('#tick-percentage-validation'),
	autoScrollValidate = $('#auto-scroll-validation'),
	dataSourceValidate = $('#data-source-validation'),
	rowCountValidate = $('#row-count-validation'),
	rowNameValidate = $('#row-name-validation'),
	rowMapValidate = $('#row-map-validation'),
	rowAccordionValidate = $('#row-accordion-validation'),
	refresTimeValidate = $('#refresh-time-validation'),
	showDateValidate = $('#show-date-validation'),
	showTimeValidate = $('#show-time-validation'),
	playListValidate = $('#play-list-validation'),
	waitingListValidate = $('#waiting-list-validation'),
	lengthValidate = $('#length-validation'),
	borderThicknessValidate = $('#border-thickness-validation'),
	showBorderValidate = $('#show-border-validation'),
	macroValidate = $('#macro-validation'),
	branchValidate = $('#branch-validation'),

	//	-Font Properties
	fontStyleValidate = $('#font-style-validation'),
	fontSizeValidate = $('#font-size-validation'),
	fontColourValidate = $('#font-colour-validation'),
	alignValidate = $('#align-validation'),
	vAlignValidate = $('#valign-validation'),
	fontTypeValidate = $('#font-type-validation');

$(document).ready(function () {
	var browser_height = $(document).height();
	var legend_height = browser_height - 600;
	$("#MainLegend").css("max-height", 1280 + "px");
	$("#MainLegend").height(1280);

	var area_width = $("#DesignArea").width();
	var area_height = (area_width * 9) / 16;

	DesignHeight = area_height;

	$('#DesignTab').height(area_height);
	$("#DesignArea").height(area_height);

	if (!jQuery.ui) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.async = true;
		script.src = "/assets/jquery-ui/jquery-ui.js";
		var oScripts = document.getElementsByTagName("script");
		var s = oScripts[0];
		s.parentNode.insertBefore(script, s);
	}

	//Control Enter Press
	$('#txtPageName').on('keypress',
		(event) => {
			if (event.which === 13 && event.target.id === "txtPageName") {
				//Callback SaveScreen Method
				SaveScreen();
			}
		});

	//Get Element Count
	ElementCount = $('.uiElement').length;
	
	//When Page Load Close All Element and Clear All Element
	elementAction('all', 'close');

	//Close Page Properties
	elementAction(pageBackground, dingDong, readTicket, readFloor, language1, language2, 'close');
	pagePropertiesContainer.css('display', 'none');

	//Close Common Properties
	commonPropertiesContainer.css('display', 'none');

	//Open Setup Options
	setupOption.css('display', 'none');

	//Reset Model Elements (input, select and etc..)
	$('.bd-example-modal-lg').on('hide.bs.modal', function (e) {
		//Close Page Properties
		elementAction(pageBackground, dingDong, readTicket, readFloor, language1, language2, 'close');
		pagePropertiesContainer.css('display', 'none');

		//Close Common Properties
		commonPropertiesContainer.css('display', 'none');

		//Open Setup Options
		setupOption.css('display', 'none');
		
		//Clear All
		elementAction('all', 'close');
		elementAction('all', 'clear');

		currentElement = null;
		isModalActive = false;
		pagePropsActive = false;

		changeSetting('quick');
	});

	//Open/Close Terminal or Parameter Areas on Data Bind Change
	dataBind.on('change', () => {
		if (dataBind.val().indexOf('Static') >= 0) {
			elementAction(terminal, 'open');
			elementAction(parameter, 'close');
		}
		else {
			elementAction(terminal, 'close');
			elementAction(parameter, 'open');
		}

		elementAction(terminal, parameter, 'clear');
	});

	//Accordion 
	$('#accordion-button').on('click', () => {

		rowAccordion.css('display') === 'block' ?
			rowAccordion.css('display', 'none') :
			rowAccordion.css('display', 'block');

	});

	//Add Map Item
	$('#add-map-item').on('click', () => {
		let item = rowMap.val();
		let validateInput = /^[a-zA-Z0-9]/;

		//Error Label
		$('#row-map-error-label').text('');
		$('#row-map-error-label').css('display', 'none');

		//Validate Input
		if (!validateInput.test(item)) {
			$('#row-map-error-label').css('display', 'block');
			$('#row-map-error-label').text('Please ensure to enter data in a correct format');
		}
		else {
			if (rowList.children().length === 0) {
				elementAction(rowMapValidate, 'validate', 'clear');
				elementAction(rowMapValidate, 'validate', 'close');
			}
			rowAccordion.css('display', 'block');
			rowList.append('<li>' + item + ' <span onclick="" class="delete-item">X</span></li>');
			$('#row-map-error-label').css('display', 'none');
			rowMap.val('');
		}
	});

	//Delete Map Item
	$('#row-list').on('click', '.delete-item', (event) => {
		event.target.parentElement.remove();

		if (rowList.children().length === 0)
			rowAccordion.css('display', 'none');
	});

	//DataSource RSS Control Function
	dataSource.on('keyup', () => {
		dsControll();
	});

	//Waiting List Click Function
	$('#waiting-list-label').on('click', () => {
		waitingList.css('display') === 'block' ? waitingList.css('display', 'none') : waitingList.css('display', 'block');
	});

	//Multi Select Counter
	$('.list-checkbox').on('click', () => {
		multiCounter();
	});

	//Select CurrentElement
	$('#DesignArea').on('click', (e) => {
		let target = e.target;
		//Set Current Element By Click

		if (!target.classList.contains('uiElement') && currentElement === null || !target.classList.contains('uiElement') && currentElement === undefined || !target.classList.contains('uiElement'))
			currentElement = $(target).closest('.uiElement');
		else
			$(target).hasClass('uiElement') ? currentElement = $(target) : '';

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
	});

	//Document Click
	$(document).on('click', (e) => {
		let target = e.target;

		//Close Multi Select List When Click out Div
		if (waitingList.css('display') === 'block' && !$(target).parents().is(waitingList) && $(target).attr('id') !== 'waiting-list-label') {

			//Close and Clear Action
			waitingList.css('display', 'none');

			//Callback Multi Counter Function
			multiCounter();
		}

	});

	//Copy + Paste Item, Move Item With Arrow Keys Function 
	$(document).keydown((e) => {
		//Ctrl Press Controll
		if (e.keyCode === ctrlKey) ctrlPressed = true;

		//Arrow Left => Move Element to Left
		if (e.keyCode === leftArrow) {
			if (currentElement !== null && typeof currentElement === 'object' || currentElement !== undefined && typeof currentElement === 'object') {
				let positionLeft;

				if (elementLeft() !== $(currentElement).attr('element-left'))
					positionLeft = parseFloat(elementLeft()) - 0.050;
				else
					positionLeft = parseFloat($(currentElement).attr('element-left')) - 0.050;

				if (elementLeft() >= 0.1) {
					currentElement.css('left', '' + positionLeft + '%');
					currentElement.attr('element-left', positionLeft);
				}

			}
		}

		//Arrow Up => Move Element to Top
		if (e.keyCode === upArrow) {
			if (currentElement !== null && typeof currentElement === 'object' || currentElement !== undefined && typeof currentElement === 'object') {
				let positionTop;

				if (currentElement.length === 1) {
					e.preventDefault();

					if (elementTop() !== $(currentElement).attr('element-top'))
						positionTop = parseFloat(elementTop()) - 0.050;
					else
						positionTop = parseFloat($(currentElement).attr('element-top')) - 0.050;

					if (elementTop() >= 0.1) {
						currentElement.css('top', '' + positionTop + '%');
						currentElement.attr('element-top', positionTop);
					}

				}
			}
		}

		//Arrow Right => Move Element to Right
		if (e.keyCode === rightArrow) {
			if (currentElement !== null && typeof currentElement === 'object' || currentElement !== undefined && typeof currentElement === 'object') {
				let positionRight;

				if (elementLeft() !== $(currentElement).attr('element-left'))
					positionRight = parseFloat(elementLeft()) + 0.050;
				else
					positionRight = parseFloat($(currentElement).attr('element-left')) + 0.050;

				if (parseFloat(elementWidth()) + parseFloat(elementLeft()) < 100) {
					currentElement.css('left', '' + positionRight + '%');
					currentElement.attr('element-left', positionRight);
				}

			}
		}

		//Arrow Down => Move Element to Down
		if (e.keyCode === downArrow) {
			if (currentElement !== null && typeof currentElement === 'object' || currentElement !== undefined && typeof currentElement === 'object') {
				let positionDown;

				if (currentElement.length === 1) {
					e.preventDefault();

					if (elementTop() !== $(currentElement).attr('element-top'))
						positionDown = parseFloat(elementTop()) + 0.050;
					else
						positionDown = parseFloat($(currentElement).attr('element-top')) + 0.050;

					if (parseFloat(elementHeight()) + parseFloat(elementTop()) < 100) {
						currentElement.css('top', '' + positionDown + '%');
						currentElement.attr('element-top', positionDown);
					}

				}
			}
		}

		//Ctrl + C => Copy Element
		if (ctrlPressed && e.keyCode === cKey) {
			if (currentElement !== null) {
				copyElement = $(currentElement).clone();
			}
		}

		//Ctrl + V => Paste Element
		else if (ctrlPressed && e.keyCode === vKey) {
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

		if (!isModalActive && e.keyCode === deleteKey && currentElement.length > 0) {
			$(currentElement).remove();
		}


	}).keyup((e) => {
		if (e.keyCode === ctrlKey) ctrlPressed = false;
	});

	//Nav Bar Design Element Hover Change Function
	$('.nav-tab > li').on('mouseover', (e) => {
		let target = $(e.target).parentsUntil('.design-tool-element').parent();

		if ($(target).hasClass('design-tool-element') || $(target).hasClass('list-group-item-heading')) {
			$('.design-tool-element').each((i, v) => {
				if ($(v) !== $(target))
					$(v).removeClass('active');
			});

			target.addClass('active');
		}
	}).on('mouseout', () => {
		$('.design-tool-element').each((i, v) => {
			$(v).removeClass('active');
		});
	});

	//Navbar Height Increase
	let navBarHeight = $('.nav-tab').height();
	$('.nav-tab').height(navBarHeight + 5);

	$(fontSize).on('change', () => {
		let size = parseInt(fontSize.val());

		if (size < 8) {
			//Validate Error
			elementAction(fontSizeValidate, 'validate', 'open');
			fontSizeValidate.html('Font size can\'t be smaller than 8px. Please ensure to value higher than 8px');
		}
		else {
			//Validate Error Clear
			elementAction(fontSizeValidate, 'validate', 'close');
			elementAction(fontSizeValidate, 'validate', 'clear');
		}
	});

	orientationChange();
});

//RSS Feed Control
function dsControll() {
	let feed = dataSource.val();

	$.ajax(feed, {
		accepts: {
			xml: 'application/rss+xml'
		},
		dataType: 'xml',
		success: (result) => {

			result.all.length > 0 ? $('#ds-icon').addClass('ds-success').addClass('fa-check-circle').removeClass('ds-failed').removeClass('fa-times') : '';

		},
		error: () => {
			$('#ds-icon').addClass('ds-failed').addClass('fa-times').removeClass('fa-check-circle').removeClass('ds-success');
		}
	});
}

//Make Element Draggble
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

droppable();


//Elements Open/Close/Clear Action Function => When you add new elemet, element must be declare into 'allElement' array if you want to use Open/Close function
function elementAction(...args) {

	//Elements array
	const allElements = [
		//Element Properties
		elementType,
		elementId,
		elementName,
		elementBackground,
		elementCaption,
		positionX,
		positionY,
		sizeX,
		sizeY,
		dataBind,
		parameter,
		terminal,
		rightToLeft,
		tickRate,
		tickPercentage,
		autoScroll,
		dataSource,
		rowCount,
		rowName,
		rowMap,
		rowList,
		refreshTime,
		showDate,
		showTime,
		playList,
		fontStyle,
		fontSize,
		fontColour,
		align,
		vAlign,
		bold,
		italic,
		underline,
		waitingList,
		lengthInput,
		borderThickness,
		showBorder,
		macroList,
		branchList,

		//Validate Properties
		language1Validate,
		language2Validate,
		idValidate,
		nameValidate,
		captionValidate,
		posXValidate,
		posYValidate,
		sizeXValidate,
		sizeYValidate,
		dataBindValidate,
		parameterValidate,
		terminalValidate,
		rightToLeftValidate,
		tickRateValidate,
		tickPercecntageValidate,
		autoScrollValidate,
		dataSourceValidate,
		rowCountValidate,
		rowNameValidate,
		rowMapValidate,
		rowAccordionValidate,
		refresTimeValidate,
		showDateValidate,
		showTimeValidate,
		playListValidate,
		waitingListValidate,
		lengthValidate,
		borderThicknessValidate,
		showBorderValidate,
		macroValidate,
		fontStyleValidate,
		fontSizeValidate,
		alignValidate,
		vAlignValidate
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
			else {
				//Get Parent Element of Element
				let parentElement;

				if (typeof args[i] === 'object')
					parentElement = args[i].parent();

				args[args.length - 1] === "open" && parentElement !== undefined ?
					parentElement.css('display', 'table') :
					i !== args.length - 1 ? parentElement.css('display', 'none') : '';
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
			}
			//Element Tag is Div
			else if (args[i][0].nodeName === 'DIV') {
				$('.list-checkbox').prop('checked', false);
				waitingList.css('display', 'none');
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
			else if (allElements[i][0].nodeName === 'SELECT')
				allElements[i].val($('#' + allElements[i].attr('id') + ' > option').eq(0).val());
			//Element Tag is Div
			else if (allElements[i][0].nodeName === 'DIV') {
				$('.list-checkbox').prop('checked', false);
				waitingList.css('display', 'none');
			}
			//Element Tag is Select
			else if (allElements[i][0].nodeName === 'SPAN' && allElements[i].hasClass('validate-for')) {
				allElements[i].html('');

			}

		}

	}

}

//Modal Active
function modalActive(element) {
	//Set Element as Current Element and Set Current Element Id
	let typeOfElement;

	if (element !== 'PageProperties') {
		isModalActive = true;
		currentElement = element;
		currentElementId = currentElement.attr('id');
		currentElementName = currentElement.attr('name');
		typeOfElement = $(currentElement).attr('type');

		let notNull = /[a-zA-Z0-9]/;

		//Open Common Properties
		elementAction(elementType, elementId, elementName, elementBackground, positionX, positionY, sizeX, sizeY, 'open');

		//Fill Areas
		//Common Properties
		elementType.val(currentElement.attr('type'));
		elementId.val(currentElement.attr('id'));
		elementName.val(currentElement.attr('name'));

		//Calculate Element Left or Top and Width or Height
		positionX.val(elementLeft());
		currentElement.attr('element-left', positionX.val());
		positionY.val(elementTop());
		currentElement.attr('element-top', positionY.val());
		sizeX.val(elementWidth());
		currentElement.attr('element-width', sizeX.val());
		sizeY.val(elementHeight());
		currentElement.attr('element-height', sizeY.val());

		fontActions('check');

		//Open Titles
		specialPropertiesContainer.css('display', 'block');
		fontPropertiesContainer.css('display', 'block');

		//Open Setup Options
		setupOption.css('display', 'flex');
	}

	if (typeOfElement === 'Label') {
		//Opening Elements
		elementAction(dataBind, elementCaption, terminal, fontSize, fontStyle, fontColour, align, vAlign, bold, italic, underline, 'open');

		//Closing Elements
		elementAction(elementBackground, 'close');
		$('#font-properties-header').css('display', 'block');

		//Fill Element Properties
		//Special Props
		elementCaption.val(currentElement.children().eq(2)[0].innerHTML);
		dataBind.val(currentElement.attr('data-bind'));

		let dataBindValue = currentElement.attr('data-bind');
		let parameterValue = currentElement.attr('parameter');

		if (dataBindValue.indexOf('Static') >= 0) {
			elementAction(terminal, 'open');
			elementAction(parameter, 'close');

			terminal.val(parameterValue);
		}
		else {
			elementAction(parameter, 'open');
			elementAction(terminal, 'close');

			parameter.val(parameterValue);
		}

		//Font Props
		fontStyle.val(currentElement.css('font-family').replace(/"/g, ''));
		fontSize.val(parseInt(currentElement.css('font-size').replace('px', '')));
		fontColour.val(currentElement.css('color'));
		align.val(currentElement.attr('align'));
		vAlign.val(currentElement.attr('valign'));

	}
	else if (typeOfElement === 'ScrollText') {
		//Opening Elements
		elementAction(elementCaption, fontSize, fontStyle, fontColour, rightToLeft, tickRate, tickPercentage, bold, italic, underline, 'open');

		//Closing Elements
		elementAction(elementBackground, 'close');
		$('#font-properties-header').css('display', 'block');

		//Fill Element Properties
		//Special Props
		elementCaption.val(currentElement.children().eq(0)[0].innerText);

		let bool;
		if (currentElement.attr('righttoleft') !== "false")
			bool = true;
		else
			bool = false;

		rightToLeft.prop('checked', bool);
		tickRate.val(currentElement.attr('tickrate'));
		tickPercentage.val(currentElement.attr('tickpercentage'));

		//Font Props
		fontStyle.val(currentElement.css('font-family'));
		fontSize.val(parseInt(currentElement.css('font-size').replace('px', '')));
		fontColour.val(currentElement.css('color'));
	}
	else if (typeOfElement === 'MediaElement') {
		//Opening Elements
		elementAction(playList, 'open');

		//Closing Elements
		elementAction(elementBackground, 'close');
		$('#font-properties-header').css('display', 'none');

		playList.val((currentElement.attr('playlist')));
	}
	else if (typeOfElement === 'DateTime') {
		//Opening Elements
		elementAction(showDate, showTime, fontSize, fontStyle, fontColour, align, vAlign, bold, italic, underline, 'open');

		//Closing Elements
		elementAction(elementBackground, 'close');
		$('#font-properties-header').css('display', 'block');

		//Fill Element Properties
		//Special Props
		let bool;

		currentElement.attr('showdate').indexOf('False') >= 0 ? bool = false : bool = true;
		showDate.prop('checked', bool);

		currentElement.attr('showtime').indexOf('False') >= 0 ? bool = false : bool = true;
		showTime.prop('checked', bool);

		//Font Props
		fontStyle.val(currentElement.css('font-family').replace(/"/g, ''));
		fontSize.val(parseInt(currentElement.css('font-size').replace('px', '')));
		fontColour.val(currentElement.css('color'));
		align.val(currentElement.attr('align'));
		vAlign.val(currentElement.attr('valign'));
	}
	else if (typeOfElement === 'RSSFeed') {
		//Opening Elements
		elementAction(autoScroll, dataSource, rowCount, rowName, rowMap, refreshTime, fontSize, fontStyle, fontColour, align, vAlign, bold, italic, underline, 'open');

		//Closing Elements
		elementAction(elementBackground, 'close');
		$('#font-properties-header').css('display', 'block');

		//Fill Element Properties
		//Special Props
		let bool;

		currentElement.attr('autoscroll').indexOf('false') >= 0 ? bool = false : bool = true;
		autoScroll.prop('checked', bool);

		dataSource.val(currentElement.attr('datasource'));
		dsControll();

		rowCount.val(currentElement.attr('rowcount'));
		rowName.val(currentElement.attr('rowname'));

		let mapList = currentElement.attr('rowmap').split('>');
		$(mapList).each((i, v) => {
			rowList.append('<li> ' + v + ' <span class="delete-item">X</span></li>');
		});

		mapList.length > 0 ? rowAccordion.css('display', 'block') : '';

		refreshTime.val(currentElement.attr('refleshtime'));

		//Font Props
		fontStyle.val(currentElement.css('font-family').replace(/"/g, ''));
		fontSize.val(parseInt(currentElement.css('font-size').replace('px', '')));
		fontColour.val(currentElement.css('color'));
		align.val(currentElement.attr('align'));
		vAlign.val(currentElement.attr('valign'));
	}
	else if (typeOfElement === 'WaitingList') {
		//Opening Elements
		elementAction(fontSize, fontStyle, fontColour, align, vAlign, waitingList, branchList, lengthInput, borderThickness, showBorder, macroList, elementBackground, 'open');
		$('#font-properties-header').css('display', 'block');

		//Fill Element Properties
		//Special Props
		let multiSelect = $('.list-checkbox');
		let selectedCheckboxes;

		if ($(currentElement).attr('multi-selects') !== undefined) {
			selectedCheckboxes = currentElement.attr('multi-selects').split(',');

			multiSelect.each((i, v) => {
				for (let i = 0; i < selectedCheckboxes.length; i++) {
					$(v).attr('id') === selectedCheckboxes[i] ? $(v).prop('checked', true) : '';
				}
			});
		}

		multiCounter();

		lengthInput.val(currentElement.attr('length'));

		borderThickness.val(currentElement.attr('border-thickness'));

		showBorder.prop('checked', currentElement.attr('show-border'));

		if (currentElement.attr('macro') !== undefined)
			macroList.val(currentElement.attr('macro'));

		if (currentElement.attr('branch') !== undefined)
			branchList.val(currentElement.attr('branch'));

		//Font Props
		fontStyle.val(currentElement.css('font-family').replace(/"/g, ''));
		fontSize.val(parseInt(currentElement.css('font-size').replace('px', '')));
		fontColour.val(currentElement.css('color'));
		align.val(currentElement.attr('align'));
		vAlign.val(currentElement.attr('valign'));
	}
	else if (element === 'PageProperties') {
		//Open Page Properties
		elementAction(pageBackground, dingDong, readTicket, readFloor, language1, language2, 'open');
		pagePropertiesContainer.css('display', 'block');

		////Close Titles
		commonPropertiesContainer.css('display', 'none');
		specialPropertiesContainer.css('display', 'none');
		fontPropertiesContainer.css('display', 'none');

		pagePropsActive = true;
	}

	$('.bd-example-modal-lg').modal('show');
}

//Delete Item Function
function deleteItem(element) {
	if (typeof element === 'object')
		element.parent().remove();
}

//Apply Setting Function
function applySettings() {
	if (!pagePropsActive) {
		//Can use currentElement to Save props.
		let typeOfElement = $(currentElement).attr('type');

		//Validate Common Properties
		if (validateElement('common')) {
			//Set if Common Properties Valid
			currentElement.attr('id', elementId.val());
			currentElement.attr('name', elementName.val());
			let posX = positionX.val();
			let posY = positionY.val();
			let siX = sizeX.val();
			let siY = sizeY.val();

			// Left and Top Calculation and Process
			if (posX !== currentElement.attr('element-left')) {
				currentElement.css('left', '' + posX + '%');
				currentElement.attr('element-left', posX);
			}
			if (posY !== currentElement.attr('element-top')) {
				currentElement.css('top', '' + posY + '%');
				currentElement.attr('element-top', posY);
			}

			// Width and Height Calculation and Process
			if (siX !== currentElement.attr('element-width')) {
				currentElement.css('width', '' + siX + '%');
				currentElement.attr('element-width', siX);
			}
			if (siY !== currentElement.attr('element-height')) {
				currentElement.css('height', '' + siY + '%');
				currentElement.attr('element-height', siY);
			}
		}

		//Validate Element Properties
		if (!validateElement(currentElement))
			return;

		if (typeOfElement === 'Label') {
			//Special Properties
			currentElement.attr('data-bind', dataBind.val());
			currentElement.children().eq(2).html(elementCaption.val());

			if (dataBind.val().indexOf('Static') >= 0)
				currentElement.attr('parameter', terminal.val());
			else
				currentElement.attr('parameter', parameter.val());

			//Font Properties
			currentElement.css({
				'font-family': '' + fontStyle.val() + '',
				'font-size': '' + fontSize.val() + 'px',
				'color': fontColour.val()
			});

			currentElement.attr('align', align.val());
			currentElement.attr('valign', vAlign.val());
		}
		else if (typeOfElement === 'ScrollText') {
			//Special Properties
			currentElement.attr('righttoleft', rightToLeft.prop('checked'));
			currentElement.attr('tickrate', tickRate.val());
			currentElement.attr('tickpercentage', tickPercentage.val());
			currentElement.children().eq(0).html(elementCaption.val());

			//Font Properties
			currentElement.css({
				'font-family': '' + fontStyle.val() + '',
				'font-size': '' + fontSize.val() + 'px',
				'color': fontColour.val()
			});

		}
		else if (typeOfElement === 'MediaElement') {
			//Special Properties
			currentElement.attr('playlist', playList.val());
		}
		else if (typeOfElement === 'DateTime') {
			//Special Properties
			currentElement.attr('showdate', showDate.prop('checked'));
			currentElement.attr('showtime', showTime.prop('checked'));

			//Font Properties
			currentElement.css({
				'font-family': '' + fontStyle.val() + '',
				'font-size': '' + fontSize.val() + 'px',
				'color': fontColour.val()
			});

			currentElement.attr('align', align.val());
			currentElement.attr('valign', vAlign.val());
		}
		else if (typeOfElement === 'RSSFeed') {
			//Special Properties
			currentElement.attr('autoscroll', autoScroll.prop('checked'));
			currentElement.attr('datasource', dataSource.val());
			currentElement.attr('rowcount', rowCount.val());
			currentElement.attr('rowname', rowName.val());

			let rowMapString = '';
			for (let i = 0; i < rowList.children().length; i++) {

				if (i < rowList.children().length - 1) {
					rowMapString += '' + rowList.children()[i].innerText.replace(' X', '') + '>';
				}
				else if (rowList.children().length - 1 === i) {
					rowMapString += '' + rowList.children()[i].innerText.replace(' X', '') + '';
				}
			}
			currentElement.attr('rowmap', rowMapString);
			currentElement.attr('refleshtime', refreshTime.val());

			//Font Properties
			currentElement.css({
				'font-family': '' + fontStyle.val() + '',
				'font-size': '' + fontSize.val() + 'px',
				'color': fontColour.val()
			});

			currentElement.attr('align', align.val());
			currentElement.attr('valign', vAlign.val());
		}
		else if (typeOfElement === 'WaitingList') {
			//Special Properties
			//length="30" border-thickness="5" show-border="true" macro="97" multi-selects="item1,item2,item3,item4"
			const checkBoxes = $('.list-checkbox');

			let checkBoxString = '';
			for (let i = 0; i < checkBoxes.length; i++) {
				if (i < checkBoxes.length - 1) {
					checkBoxes.eq(i).prop('checked') === true ? checkBoxString += '' + checkBoxes.eq(i).attr('id') + ',' : '';
				}
				else if (i === checkBoxes.length - 1) {
					checkBoxes.eq(i).prop('checked') === true ? checkBoxString += '' + checkBoxes.eq(i).attr('id') + '' : '';
				}
			}

			currentElement.attr('multi-selects', checkBoxString);
			currentElement.attr('length', lengthInput.val());
			currentElement.attr('border-thickness', borderThickness.val());
			currentElement.attr('show-border', showBorder.prop('checked'));
			currentElement.attr('macro', macroList.val());
			currentElement.attr('branch', branchList.val());
			currentElement.attr('background-image', elementBackground.val());

			//Font Properties
			currentElement.css({
				'font-family': '' + fontStyle.val() + '',
				'font-size': '' + fontSize.val() + 'px',
				'color': fontColour.val()
			});

			currentElement.attr('align', align.val());
			currentElement.attr('valign', vAlign.val());
		}
	}
	else if (pagePropsActive) {
		//Validate Page Properties by using validatePageProperties() function
		if (!validateElement())
			return;

		//Page Properties
		$("#DesignArea").css("background-image", "url(" + pageBackground.val() + ")");

		orientationChange();
	}

	//Hide Modal
	$('.bd-example-modal-lg').modal('hide');

}

//Display Orientation Change
const orientationChange = () => {
	const orientation = displayOrientation.val();

	const designTab = $('#DesignTab'),
		designArea = $('#DesignArea');

	if (orientation === 'Landscape') {
		designTab.css({
			'width': '100%',
			'height': '900px'
		});

		designArea.css({
			'width': '100%',
			'height': '900px'
		});
	}
	else {
		designTab.css({
			'width': '1080px',
			'height': '1920px'
		});

		designArea.css({
			'width': '1080px',
			'height': '1920px'
		});
	}

	reApply();
};

//This method reapply all orientation properties to each added design item.
const reApply = () => {
	$('.uiElement').each((index, value) => {
		let element = $(value);

		element.css({
			'width': element.attr('element-width') + '%',
			'height': element.attr('element-height') + '%',
			'left': element.attr('element-left') + '%',
			'top': element.attr('element-top') + '%'
		});
	});
};

//Validation
function validateElement(element) {
	if (element !== 'common')
		element = $(element);

	let bool = true;
	let elementType;

	if (!pagePropsActive)
		elementType = $(element).attr('type');
	let notNull = /[a-zA-Z0-9]/;

	function validatePageProperties() {
		if (!notNull.test(arabicTranslation.val())) {
			bool = false;

			elementAction(arabicTranslationValidate, 'validate', 'open');
			arabicTranslationValidate.html('Arabic Translation can\'t be empty. Please ensure to enter correct value.');
		}
		else {
			elementAction(arabicTranslationValidate, 'validate', 'close');
			elementAction(arabicTranslationValidate, 'clear');
		}

	}

	function validateGeneral() {
		if (currentElement === undefined || currentElement === null || currentElement === '' || currentElement[0].nodeName === 'SCRIPT') {
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

				elementAction(idValidate, 'validate', 'open');
				idValidate.html('Element must have identifier, ensure to enter a identifier to element.');
			}
			else if (currentElementId !== elementId.val()) {
				let controlElement = $('#' + elementId.val() + '');
				if (controlElement.length >= 1) {
					bool = false;

					elementAction(idValidate, 'validate', 'open');
					idValidate.html('This identifeir already defined for another element. Please define diffrent identifier.');
				}
			}
			else {
				elementAction(idValidate, 'validate', 'close');
				elementAction(idValidate, 'clear');
			}

			//Name Validate
			if (!notNull.test(elementName.val())) {
				bool = false;

				elementAction(nameValidate, 'validate', 'open');
				nameValidate.html('This name already defined for another element. Please define diffrent name.');
			}
			else if (currentElementName !== elementName.val()) {
				let controlElement = $('[name="' + elementName.val() + '"]');
				if (controlElement.length >= 1) {
					bool = false;

					elementAction(nameValidate, 'validate', 'open');
					nameValidate.html('Element must have name, ensure to enter a name to element.');
				}
			}
			else {
				elementAction(nameValidate, 'validate', 'close');
				elementAction(nameValidate, 'clear');

			}

			//Left Validate
			if (positionX.val() !== undefined && !notNull.test(positionX.val())) {
				bool = false;

				elementAction(posXValidate, 'validate', 'open');
				posXValidate.html('You have must set \'left\' coordinate to element');
			} else {
				elementAction(posXValidate, 'validate', 'close');
				elementAction(posXValidate, 'clear');
			}

			//Top Validate
			if (positionY.val() !== undefined && !notNull.test(positionY.val())) {
				bool = false;

				elementAction(posYValidate, 'validate', 'open');
				posYValidate.html('You have must set \'right\' coordinate to element');
			} else {
				elementAction(posYValidate, 'validate', 'close');
				elementAction(posYValidate, 'clear');
			}

			//Width Validate
			if (sizeX.val() !== undefined && !notNull.test(sizeX.val())) {
				bool = false;

				elementAction(sizeXValidate, 'validate', 'open');
				sizeXValidate.html('You have must set \'width\' to element');
			} else {
				elementAction(sizeXValidate, 'validate', 'close');
				elementAction(sizeXValidate, 'clear');
			}

			//Height Validate
			if (sizeY.val() !== undefined && !notNull.test(sizeY.val())) {
				bool = false;

				elementAction(sizeYValidate, 'validate', 'open');
				sizeYValidate.html('You have must set \'height\' to element');
			} else {
				elementAction(sizeYValidate, 'validate', 'close');
				elementAction(sizeYValidate, 'clear');
			}

		}
	}

	function validateLabel() {
		if (currentElement === undefined || currentElement === null || currentElement === '' || currentElement[0].nodeName === 'SCRIPT') {

			//Caption Validate
			if (element.children('label').html() === undefined || !notNull.test(element.children('label').html()))
				bool = false;

			//Data Bind Validate
			if (element.attr('data-bind') === undefined || !notNull.test(element.attr('data-bind')))
				bool = false;

			//Parameter Validate
			if (element.attr('parameter') === undefined && element.attr('data-bind') !== 'Static' || !notNull.test(element.attr('parameter')) && element.attr('data-bind') !== 'Static')
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
			if (elementCaption.val() === undefined || !notNull.test(elementCaption.val())) {
				bool = false;

				elementAction(captionValidate, 'validate', 'open');
				captionValidate.html('Caption can\'t be empty. Please ensure to enter value correct.');
			} else {
				elementAction(captionValidate, 'validate', 'close');
				elementAction(captionValidate, 'clear');
			}

			//Data Bind Validate
			if (dataBind.val() === undefined || !notNull.test(dataBind.val()) || dataBind.val() === null) {
				bool = false;

				elementAction(dataBindValidate, 'validate', 'open');
				dataBindValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(dataBindValidate, 'validate', 'close');
				elementAction(dataBindValidate, 'clear');
			}

			//Parameter Validate
			if (parameter.val() === undefined && dataBind.val() === 'Static' || !notNull.test(parameter.val()) && dataBind.val() === 'Static' || parameter.val() === null && dataBind.val() === 'Static') {
				bool = false;

				elementAction(parameterValidate, 'validate', 'open');
				parameterValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(parameterValidate, 'validate', 'close');
				elementAction(parameterValidate, 'clear');
			}

			//Font Style Validate
			if (fontStyle.val() === undefined || !notNull.test(fontStyle.val()) || fontStyle.val() === null) {
				bool = false;

				elementAction(fontStyleValidate, 'validate', 'open');
				fontStyleValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(fontStyleValidate, 'validate', 'close');
				elementAction(fontStyleValidate, 'clear');
			}

			//Font Size Validate
			let size = parseInt(fontSize.val());

			if (fontSize.val() === undefined || !notNull.test(fontSize.val()) || fontSize.val() === null) {
				bool = false;

				elementAction(fontSizeValidate, 'validate', 'open');
				fontSizeValidate.html('Please ensure to enter value correct.');
			}
			else if (size < 8) {
				bool = false;

				//Validate Error
				elementAction(fontSizeValidate, 'validate', 'open');
				fontSizeValidate.html('Font size can\'t be smaller than 8px. Please ensure to value higher than 8px');
			}
			else {
				elementAction(fontSizeValidate, 'validate', 'close');
				elementAction(fontSizeValidate, 'clear');
			}

			//Colour Validate
			if (fontColour.val() === undefined || !notNull.test(fontColour.val()) || fontColour.val() === null) {
				bool = false;

				elementAction(fontColourValidate, 'validate', 'open');
				fontColourValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(fontColourValidate, 'validate', 'close');
				elementAction(fontColourValidate, 'clear');
			}

			//Align Validate
			if (align.val() === undefined || !notNull.test(align.val()) || align.val() === null) {
				bool = false;

				elementAction(alignValidate, 'validate', 'open');
				alignValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(alignValidate, 'validate', 'close');
				elementAction(alignValidate, 'clear');
			}

			//vAlign Validate
			if (vAlign.val() === undefined || !notNull.test(vAlign.val()) || vAlign.val() === null) {
				bool = false;

				elementAction(vAlignValidate, 'validate', 'open');
				vAlignValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(vAlignValidate, 'validate', 'close');
				elementAction(vAlignValidate, 'clear');
			}

		}
	}

	function validateMediaElement() {
		if (currentElement === undefined || currentElement === null || currentElement === '' || currentElement[0].nodeName === 'SCRIPT') {
			//Playlist Validate
			if (element.attr('playlist') === undefined || !notNull.test(element.attr('playlist')))
				bool = false;
		}
		else {
			if (playList.val() === undefined || !notNull.test(playList.val())) {
				bool = false;

				elementAction(playListValidate, 'validate', 'open');
				playListValidate.html('Playlist can\'t be empty. Please ensure to select a media or enter the media link.');
			} else {
				elementAction(playListValidate, 'validate', 'close');
				elementAction(playListValidate, 'clear');
			}
		}
	}

	function validateScrollText() {
		if (currentElement === undefined || currentElement === null || currentElement === '' || currentElement[0].nodeName === 'SCRIPT') {

			//Right to Left Validate
			if (element.attr('righttoleft') === undefined || !notNull.test(element.attr('righttoleft')))
				bool = false;

			//Tick Rate Validate
			if (element.attr('tickrate') === undefined || !notNull.test(element.attr('tickrate')))
				bool = false;

			//Tick Percentage Validate
			if (element.attr('tickpercentage') === undefined || !notNull.test(element.attr('tickpercentage')))
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
		}
		else {
			//Tick Rate Validate
			if (tickRate.val() === undefined || !notNull.test(tickRate.val())) {
				bool = false;

				elementAction(tickRateValidate, 'validate', 'open');
				tickRateValidate.html('Tick Rate can\'t be empty. Please ensure to enter correct value.');
			} else {
				elementAction(tickRateValidate, 'validate', 'close');
				elementAction(tickRateValidate, 'clear');
			}

			//Tick Percentage Validate
			if (tickPercentage.val() === undefined || !notNull.test(tickPercentage.val())) {
				bool = false;

				elementAction(tickPercecntageValidate, 'validate', 'open');
				tickPercecntageValidate.html('Tick Rate can\'t be empty. Please ensure to enter correct value.');
			} else {
				elementAction(tickPercecntageValidate, 'validate', 'close');
				elementAction(tickPercecntageValidate, 'clear');
			}

			//Font Style Validate
			if (fontStyle.val() === undefined || !notNull.test(fontStyle.val()) || fontStyle.val() === null) {
				bool = false;

				elementAction(fontStyleValidate, 'validate', 'open');
				fontStyleValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(fontStyleValidate, 'validate', 'close');
				elementAction(fontStyleValidate, 'clear');
			}

			//Font Size Validate
			if (fontSize.val() === undefined || !notNull.test(fontSize.val()) || fontSize.val() === null || parseInt(fontSize.val()) <= 0) {
				bool = false;

				elementAction(fontSizeValidate, 'validate', 'open');
				fontSizeValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(fontSizeValidate, 'validate', 'close');
				elementAction(fontSizeValidate, 'clear');
			}

			//Colour Validate
			if (fontColour.val() === undefined || !notNull.test(fontColour.val()) || fontColour.val() === null) {
				bool = false;

				elementAction(fontColourValidate, 'validate', 'open');
				fontColourValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(fontColourValidate, 'validate', 'close');
				elementAction(fontColourValidate, 'clear');
			}
		}
	}

	function validateRss() {
		if (currentElement === undefined || currentElement === null || currentElement === '' || currentElement[0].nodeName === 'SCRIPT') {
			//Data Source Validate
			if (element.attr('datasource') === undefined || !notNull.test(element.attr('datasource')))
				bool = false;

			//Row Count Validate
			if (element.attr('rowcount') === undefined || !notNull.test(element.attr('rowcount')))
				bool = false;

			//Row Name Validate
			if (element.attr('rowname') === undefined || !notNull.test(element.attr('rowname')))
				bool = false;

			//Row Map Validate
			if (element.attr('rowmap') === undefined || !notNull.test(element.attr('rowmap')))
				bool = false;

			//Refresh Validate
			if (element.attr('refleshtime') === undefined || !notNull.test(element.attr('refleshtime')))
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
			//Data Source Validate
			if (dataSource.val() === undefined || !notNull.test(dataSource.val())) {
				bool = false;

				elementAction(dataSourceValidate, 'validate', 'open');
				dataSourceValidate.html('Data Source can\'t be empty. Please ensure to enter a data source.');
			} else {
				elementAction(dataSourceValidate, 'validate', 'close');
				elementAction(dataSourceValidate, 'clear');
			}

			//Row Count Validate
			if (rowCount.val() === undefined || !notNull.test(rowCount.val())) {
				bool = false;

				elementAction(rowCountValidate, 'validate', 'open');
				rowCountValidate.html('Row Count can\'t be empty. Please ensure to enter a row count.');
			} else {
				elementAction(rowCountValidate, 'validate', 'close');
				elementAction(rowCountValidate, 'clear');
			}

			//Row Name Validate
			if (rowName.val() === undefined || !notNull.test(rowName.val())) {
				bool = false;

				elementAction(rowNameValidate, 'validate', 'open');
				rowNameValidate.html('Row Name can\'t be empty. Please ensure to enter a row name.');
			} else {
				elementAction(rowNameValidate, 'validate', 'close');
				elementAction(rowNameValidate, 'clear');
			}

			//Row Map Validate
			if (rowList.children().length === 0) {
				bool = false;

				elementAction(rowMapValidate, 'validate', 'open');
				rowMapValidate.html('Row Name can\'t be empty. Please ensure to add a row map.');
			} else {
				elementAction(rowMapValidate, 'validate', 'close');
				elementAction(rowMapValidate, 'clear');
			}

			//Refresh Time Validate
			if (refreshTime.val() === undefined || !notNull.test(refreshTime.val())) {
				bool = false;

				elementAction(refresTimeValidate, 'validate', 'open');
				refresTimeValidate.html('Row Name can\'t be empty. Please ensure to enter a refresh time.');
			} else {
				elementAction(refresTimeValidate, 'validate', 'close');
				elementAction(refresTimeValidate, 'clear');
			}

			//Font Style Validate
			if (fontStyle.val() === undefined || !notNull.test(fontStyle.val()) || fontStyle.val() === null) {
				bool = false;

				elementAction(fontStyleValidate, 'validate', 'open');
				fontStyleValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(fontStyleValidate, 'validate', 'close');
				elementAction(fontStyleValidate, 'clear');
			}

			//Font Size Validate
			let size = parseInt(fontSize.val());

			if (fontSize.val() === undefined || !notNull.test(fontSize.val()) || fontSize.val() === null) {
				bool = false;

				elementAction(fontSizeValidate, 'validate', 'open');
				fontSizeValidate.html('Please ensure to enter value correct.');
			}
			else if (size > 200) {
				bool = false;

				//Validate Error
				elementAction(fontSizeValidate, 'validate', 'open');
				fontSizeValidate.html('Font size can\'t be bigger than 200px. Please ensure to value between 8px and 200px.');
			}
			else if (size < 8) {
				bool = false;

				//Validate Error
				elementAction(fontSizeValidate, 'validate', 'open');
				fontSizeValidate.html('Font size can\'t be smaller than 8px. Please ensure to value between 8px and 200px.');
			}
			else {
				elementAction(fontSizeValidate, 'validate', 'close');
				elementAction(fontSizeValidate, 'clear');
			}

			//Colour Validate
			if (fontColour.val() === undefined || !notNull.test(fontColour.val()) || fontColour.val() === null) {
				bool = false;

				elementAction(fontColourValidate, 'validate', 'open');
				fontColourValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(fontColourValidate, 'validate', 'close');
				elementAction(fontColourValidate, 'clear');
			}

			//Align Validate
			if (align.val() === undefined || !notNull.test(align.val()) || align.val() === null) {
				bool = false;

				elementAction(alignValidate, 'validate', 'open');
				alignValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(alignValidate, 'validate', 'close');
				elementAction(alignValidate, 'clear');
			}

			//vAlign Validate
			if (vAlign.val() === undefined || !notNull.test(vAlign.val()) || vAlign.val() === null) {
				bool = false;

				elementAction(vAlignValidate, 'validate', 'open');
				vAlignValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(vAlignValidate, 'validate', 'close');
				elementAction(vAlignValidate, 'clear');
			}
		}
	}

	function validateDateTime() {
		if (currentElement === undefined || currentElement === null || currentElement === '' || currentElement[0].nodeName === 'SCRIPT') {
			//Show Date Validate
			if (element.attr('showdate') === undefined || !notNull.test(element.attr('showdate')))
				bool = false;

			//Show Time Validate
			if (element.attr('showtime') === undefined || !notNull.test(element.attr('showtime')))
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
			//Font Style Validate
			if (fontStyle.val() === undefined || !notNull.test(fontStyle.val()) || fontStyle.val() === null) {
				bool = false;

				elementAction(fontStyleValidate, 'validate', 'open');
				fontStyleValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(fontStyleValidate, 'validate', 'close');
				elementAction(fontStyleValidate, 'clear');
			}

			//Font Size Validate
			let size = parseInt(fontSize.val());

			if (fontSize.val() === undefined || !notNull.test(fontSize.val()) || fontSize.val() === null) {
				bool = false;

				elementAction(fontSizeValidate, 'validate', 'open');
				fontSizeValidate.html('Please ensure to enter value correct.');
			}
			else if (size > 200) {
				bool = false;

				//Validate Error
				elementAction(fontSizeValidate, 'validate', 'open');
				fontSizeValidate.html('Font size can\'t be bigger than 200px. Please ensure to value between 8px and 200px.');
			}
			else if (size < 8) {
				bool = false;

				//Validate Error
				elementAction(fontSizeValidate, 'validate', 'open');
				fontSizeValidate.html('Font size can\'t be smaller than 8px. Please ensure to value between 8px and 200px.');
			}
			else {
				elementAction(fontSizeValidate, 'validate', 'close');
				elementAction(fontSizeValidate, 'clear');
			}

			//Colour Validate
			if (fontColour.val() === undefined || !notNull.test(fontColour.val()) || fontColour.val() === null) {
				bool = false;

				elementAction(fontColourValidate, 'validate', 'open');
				fontColourValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(fontColourValidate, 'validate', 'close');
				elementAction(fontColourValidate, 'clear');
			}

			//Align Validate
			if (align.val() === undefined || !notNull.test(align.val()) || align.val() === null) {
				bool = false;

				elementAction(alignValidate, 'validate', 'open');
				alignValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(alignValidate, 'validate', 'close');
				elementAction(alignValidate, 'clear');
			}

			//vAlign Validate
			if (vAlign.val() === undefined || !notNull.test(vAlign.val()) || vAlign.val() === null) {
				bool = false;

				elementAction(vAlignValidate, 'validate', 'open');
				vAlignValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(vAlignValidate, 'validate', 'close');
				elementAction(vAlignValidate, 'clear');
			}
		}
	}

	function validateWaitingList() {
		if (currentElement === undefined || currentElement === null || currentElement === '' || currentElement[0].nodeName === 'SCRIPT') {
			//List Property Validate
			if (element.attr('multi-selects') === undefined || !notNull.test(element.attr('multi-selects')))
				bool = false;

			//Length Validate
			if (element.attr('length') === undefined || !notNull.test(element.attr('length')))
				bool = false;

			//Border Thickness Validate
			if (element.attr('border-thickness') === undefined || !notNull.test(element.attr('border-thickness')))
				bool = false;

			//Show Border Validate
			if (element.attr('show-border') === undefined || !notNull.test(element.attr('show-border')))
				bool = false;

			//Macro Validate
			if (element.attr('macro') === undefined || !notNull.test(element.attr('macro')))
				bool = false;

			//Branch Validate
			if (element.attr('branch') === undefined || !notNull.test(element.attr('branch')))
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
			//List Property Validate
			if ($('.list-checkbox:checked').length === 0) {
				bool = false;

				elementAction(waitingListValidate, 'validate', 'open');
				waitingListValidate.html('Please ensure to select atleast one property.');
			} else {
				elementAction(waitingListValidate, 'validate', 'close');
				elementAction(waitingListValidate, 'clear');
			}

			//Length Validate
			if (lengthInput.val() === undefined || !notNull.test(lengthInput.val())) {
				bool = false;

				elementAction(lengthValidate, 'validate', 'open');
				lengthValidate.html('Please ensure to enter a length value.');
			} else {
				elementAction(lengthValidate, 'validate', 'close');
				elementAction(lengthValidate, 'clear');
			}

			//Border Thickness Validate
			if (borderThickness.val() === undefined || !notNull.test(borderThickness.val())) {
				bool = false;

				elementAction(borderThicknessValidate, 'validate', 'open');
				borderThicknessValidate.html('Please ensure to enter a border thickness value.');
			} else {
				elementAction(borderThicknessValidate, 'validate', 'close');
				elementAction(borderThicknessValidate, 'clear');
			}

			//Macro List Validate
			if (macroList.val() === undefined || !notNull.test(macroList.val()) || macroList.val() === null) {
				bool = false;

				elementAction(macroValidate, 'validate', 'open');
				macroValidate.html('Please ensure to select a macro.');
			} else {
				elementAction(macroValidate, 'validate', 'close');
				elementAction(macroValidate, 'clear');
			}

			//Branch List Validate
			if (branchList.val() === undefined || !notNull.test(branchList.val()) || branchList.val() === null) {
				bool = false;

				elementAction(branchValidate, 'validate', 'open');
				branchValidate.html('Please ensure to select a branch.');
			} else {
				elementAction(branchValidate, 'validate', 'close');
				elementAction(branchValidate, 'clear');
			}

			//Font Style Validate
			if (fontStyle.val() === undefined || !notNull.test(fontStyle.val()) || fontStyle.val() === null) {
				bool = false;

				elementAction(fontStyleValidate, 'validate', 'open');
				fontStyleValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(fontStyleValidate, 'validate', 'close');
				elementAction(fontStyleValidate, 'clear');
			}

			//Font Size Validate
			let size = parseInt(fontSize.val());

			if (fontSize.val() === undefined || !notNull.test(fontSize.val()) || fontSize.val() === null) {
				bool = false;

				elementAction(fontSizeValidate, 'validate', 'open');
				fontSizeValidate.html('Please ensure to enter value correct.');
			}
			else if (size > 200) {
				bool = false;

				//Validate Error
				elementAction(fontSizeValidate, 'validate', 'open');
				fontSizeValidate.html('Font size can\'t be bigger than 200px. Please ensure to value between 8px and 200px.');
			}
			else if (size < 8) {
				bool = false;

				//Validate Error
				elementAction(fontSizeValidate, 'validate', 'open');
				fontSizeValidate.html('Font size can\'t be smaller than 8px. Please ensure to value between 8px and 200px.');
			}
			else {
				elementAction(fontSizeValidate, 'validate', 'close');
				elementAction(fontSizeValidate, 'clear');
			}

			//Colour Validate
			if (fontColour.val() === undefined || !notNull.test(fontColour.val()) || fontColour.val() === null) {
				bool = false;

				elementAction(fontColourValidate, 'validate', 'open');
				fontColourValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(fontColourValidate, 'validate', 'close');
				elementAction(fontColourValidate, 'clear');
			}

			//Align Validate
			if (align.val() === undefined || !notNull.test(align.val()) || align.val() === null) {
				bool = false;

				elementAction(alignValidate, 'validate', 'open');
				alignValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(alignValidate, 'validate', 'close');
				elementAction(alignValidate, 'clear');
			}

			//vAlign Validate
			if (vAlign.val() === undefined || !notNull.test(vAlign.val()) || vAlign.val() === null) {
				bool = false;

				elementAction(vAlignValidate, 'validate', 'open');
				vAlignValidate.html('Please ensure to enter value correct.');
			} else {
				elementAction(vAlignValidate, 'validate', 'close');
				elementAction(vAlignValidate, 'clear');
			}
		}
	}

	if (!pagePropsActive || element === 'common')
		validateGeneral();

	if (pagePropsActive)
		validatePageProperties();

	if (elementType === 'Label')
		validateLabel();
	else if (elementType === 'MediaElement')
		validateMediaElement();
	else if (elementType === 'ScrollText')
		validateScrollText();
	else if (elementType === 'RSSFeed')
		validateRss();
	else if (elementType === 'DateTime')
		validateDateTime();
	else if (elementType === 'WaitingList')
		validateWaitingList();

	return bool;
}

//Create Element Function
function createElement(elementtype) {
	//Increase Total Element Count
	ElementCount++;

	//Control Element
	let elementControl = $('#' + ElementCount + '');

	//If This Id Assign to Another Element.
	if (elementControl.length > 0)
		controlElement();

	let localElement;

	if (elementtype === "Label") {
		localElement = $('<div class="uiElement nonResize" data-bind="Static" parameter="0" style="width: 50px; height: 50px; left:0; top:0; font-size:48px; width:150px; height:75px; cursor:pointer; color:rgb(0,0,0); line-height:100%" type="Label"  name="Label' + ElementCount + '" id="' + ElementCount + '"><a onclick="modalActive($(this).parent())"><i class="fa fa-edit design-icons" ></i></a><span onclick="deleteItem($(this))" class="fa fa-trash design-icons text-danger"></span><label>A 888</label></div>');
	}
	else if (elementtype === "WMV") {
		localElement = $('<div class="uiElement" playlist="" type="MediaElement" id="' + ElementCount + '" name="MediaElement' + ElementCount + '" style="width: 50px; height: 50px; left:0; top:0; width:350px; height:200px; z-index:99; border:dotted 2px #CCC;"><i class="fa fa-file-video-o" style="font-size:64px; color:#FFF;"></i> <a onclick="modalActive($(this).parent())" class="media-element-icons"><i class="fa fa-edit design-icons" ></i></a><span onclick="deleteItem($(this))" class="fa fa-trash design-icons text-danger media-element-icons"></span></div>');
	}
	else if (elementtype === "ScrollText") {
		localElement = $('<div class="uiElement" righttoleft="false" tickrate="60" tickpercentage="60" style="width: 50px; height: 50px; left:0; top:0; border:dotted 2px #CCC; cursor:pointer; line-height:100%" type="ScrollText" name="ScrollText' + ElementCount + '" id="' + ElementCount + '"><marquee>Scroll Text Message</marquee><a onclick="modalActive($(this).parent())"><i class="fa fa-edit design-icons" ></i></a><span onclick="deleteItem($(this))" class="fa fa-trash design-icons text-danger"></span></div>');
	}
	else if (elementtype === "RSSFeed") {
		localElement = $('<div class="uiElement text-center" datasource="" autoscroll="true" rowcount="10" rowname="" rowmap="channel>item" refleshtime="30" style="width: 50px; height: 50px; left:0; top:0; border:dotted 2px #CCC; cursor:pointer;" type="RSSFeed" name="RSSFeed' + ElementCount + '" id="' + ElementCount + '"><a onclick="modalActive($(this).parent())"><i class="fa fa-edit design-icons" ></i></a><span class="fa fa-rss" style="font-size:128px;"></span><span onclick="deleteItem($(this))" class="fa fa-trash design-icons text-danger"></span></div>');
	}
	else if (elementtype === "DateTime") {
		localElement = $('<div class="uiElement" showdate="true" showtime="true" style="width: 50px height: 50px; left:0; top:0; border:dotted 2px #CCC; font-size:18px; cursor:pointer; line-height:100%" type="DateTime" name="DateTime' + ElementCount + '" id="' + ElementCount + '"><a onclick="modalActive($(this).parent())"><i class="fa fa-edit design-icons" ></i></a> 00.00.0000 00:00:00<span onclick="deleteItem($(this))" class="fa fa-trash design-icons text-danger"></span></div>');
	}
	else if (elementtype === 'WaitingList') {
		localElement = $('<div class="uiElement" style="left:0; top:0; width: 90px; height: 75px; border:dotted 2px #CCC; cursor:pointer; color:rgb(0,0,0);" type="WaitingList" name="WaitingList' + ElementCount + '" id="' + ElementCount + '"> <a onclick="modalActive($(this).parent())"><i class="fa fa-edit design-icons" ></i></a><span onclick="deleteItem($(this))" class="fa fa-trash design-icons text-danger"></span><span class="fa fa-list" style="font-size:64px;"></span></div>');
	}
	else if (elementtype === 'CallerImage') {
		localElement = $('<div class="uiElement" style="left:0; top:0; width: 90px; height: 75px; border:dotted 2px #CCC; cursor:pointer; color:rgb(0,0,0); text-align:center; vertical-align:middle;" type="CallerImage" name="CallerImage' + ElementCount + '" id="' + ElementCount + '"><span onclick="deleteItem($(this))" class="fa fa-trash design-icons text-danger"></span><span class="fa fa-user" style="font-size:64px; color:#C00;"></span></div>');
	}

	//Append into Design Area
	$("#DesignArea").append(localElement);

	//After creating new element, giving this element draggable and resizable options
	draggable();
	droppable();
	resizable();

	$('#DesignArea').droppable({
		drop: () => {
			//Disable Arrows
			xArrow.removeClass('arrow-enabled');
			yArrow.removeClass('arrow-enabled');
		}
	});

	$(localElement).resizable({
		containment: "#DesignArea"
	});
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

function ConvertToMagic() {
	let dingdong = "False";
	if ($(dingDong).prop('checked'))
		dingdong = "True";

	let readticket = "False";
	if ($(readTicket).prop('checked'))
		readticket = "True";

	let readfloor = "False";
	if ($(readFloor).prop('checked'))
		readfloor = "True";

	let arabicTranslation = $('#arabic-translation');

	var TheCode = "<Design>\n";
	TheCode = TheCode + '\t<Page type="DigitalSignagePage" name="' + pageTitle.val() + '" BackgroundImage="' + pageBackground.val() + '" DingDong="' + dingdong + '" ReadTicket="' + readticket + '" ReadFloor="' + readfloor + '" Language1="' + language1.val() + '" Language2="' + language2.val() + '" ArabicTranslation="' + arabicTranslation.val() + '" Orientation="' + displayOrientation.val() + '">\n\n';

	$("#DesignArea").children('.uiElement').each(function () {
		let element = $(this);
		currentElement = element;

		let element_type = element.attr("type");
		let element_id = element.attr("id");
		let element_name = element.attr("name");
		let element_positionx = elementLeft();
		let element_positiony = elementTop();
		let element_width = elementWidth();
		let element_height = elementHeight();

		if (element_type === "Label") {
			let element_text = element.children('label')[0].innerHTML;
			let element_action = element.attr("data-bind");
			let element_parameter = element.attr("parameter");
			let element_font = element.css("font-family").replace(/"/g, '');
			let element_fontsize = element.css("font-size");
			let element_color = element.css("color");

			let element_bold = element.attr("bold") === undefined ? false : element.attr("bold");
			let element_italic = element.attr("italic") === undefined ? false : element.attr("italic");
			let element_underline = element.attr("underline") === undefined ? false : element.attr("underline");

			let element_align = element.attr("align") === undefined ? false : element.attr("align");
			let element_valign = element.attr("valign") === undefined ? false : element.attr("valign");

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
			let element_playlist = element.attr("playlist");

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
		else if (element_type === "ScrollText") {
			let element_text = element.children("marquee").text();
			let element_righttoleft = element.attr("righttoleft");
			let element_tickrate = element.attr("tickrate");
			let element_tickpercentage = element.attr("tickpercentage");
			let element_font = element.css("font-family").replace(/"/g, '');
			let element_fontsize = element.css("font-size");
			let element_color = element.css("color");

			TheCode += '\t<Control type="ScrollText">\n';
			TheCode += '\t\t<Type>ScrollText</Type>\n';
			TheCode += '\t\t<Identifier>' + element_id + '</Identifier>\n';
			TheCode += '\t\t<Name>' + element_name + '</Name>\n';
			TheCode += '\t\t<Text>' + element_text + '</Text>\n';
			TheCode += '\t\t<PositionX>' + element_positionx + '</PositionX>\n';
			TheCode += '\t\t<PositionY>' + element_positiony + '</PositionY>\n';
			TheCode += '\t\t<Width>' + element_width + '</Width>\n';
			TheCode += '\t\t<Height>' + element_height + '</Height>\n';
			TheCode += '\t\t<Font>' + element_font + '</Font>\n';
			TheCode += '\t\t<Size>' + element_fontsize + '</Size>\n';
			TheCode += '\t\t<Color>' + element_color + '</Color>\n';
			TheCode += '\t\t<RightToLeft>' + element_righttoleft + '</RightToLeft>\n';
			TheCode += '\t\t<TickRate>' + element_tickrate + '</TickRate>\n';
			TheCode += '\t\t<TickPercentage>' + element_tickpercentage + '</TickPercentage>\n';
			TheCode += '\t</Control>\n\n';
		}
		else if (element_type === "RSSFeed") {
			let element_font = element.css("font-family").replace(/"/g, '');
			let element_fontsize = element.css("font-size");
			let element_color = element.css("color");
			let element_datasource = element.attr("datasource");
			let element_rowcount = element.attr("rowcount");
			let element_rowname = element.attr("rowname");
			let element_rowmap = element.attr("rowmap");
			let element_refleshtime = element.attr("refleshtime");
			let scrolldata = element.attr("autoscroll");

			let align = element.attr("align") === undefined ? false : element.attr("align");
			let valign = element.attr("valign") === undefined ? false : element.attr("valign");

			TheCode += '\t<Control type="RSSFeed">\n';
			TheCode += '\t\t<Type>RSSFeed</Type>\n';
			TheCode += '\t\t<AutoScroll>' + scrolldata + '</AutoScroll>\n';
			TheCode += '\t\t<Identifier>' + element_id + '</Identifier>\n';
			TheCode += '\t\t<Name>' + element_name + '</Name>\n';
			TheCode += '\t\t<PositionX>' + element_positionx + '</PositionX>\n';
			TheCode += '\t\t<PositionY>' + element_positiony + '</PositionY>\n';
			TheCode += '\t\t<Width>' + element_width + '</Width>\n';
			TheCode += '\t\t<Height>' + element_height + '</Height>\n';
			TheCode += '\t\t<Font>' + element_font + '</Font>\n';
			TheCode += '\t\t<Size>' + element_fontsize + '</Size>\n';
			TheCode += '\t\t<Color>' + element_color + '</Color>\n';
			TheCode += '\t\t<DataSource>' + element_datasource + '</DataSource>\n';
			TheCode += '\t\t<Align>' + align + '</Align>\n';
			TheCode += '\t\t<Valign>' + valign + '</Valign>\n';
			TheCode += '\t\t<RowCount>' + element_rowcount + '</RowCount>\n';
			TheCode += '\t\t<RowName>' + element_rowname + '</RowName>\n';
			TheCode += '\t\t<RowMap>' + element_rowmap + '</RowMap>\n';
			TheCode += '\t\t<RefleshTime>' + element_refleshtime + '</RefleshTime>\n';
			TheCode += '\t</Control>\n\n';
		}
		else if (element_type === "DateTime") {
			let element_font = element.css("font-family").replace(/"/g, '');
			let element_fontsize = element.css("font-size");
			let element_color = element.css("color");
			let element_showdate = element.attr("showdate");
			let element_showtime = element.attr("showtime");

			let align = element.attr("align") === undefined ? false : element.attr("align");
			let valign = element.attr("valign") === undefined ? false : element.attr("valign");

			TheCode += '\t<Control type="DateTime">\n';
			TheCode += '\t\t<Type>DateTime</Type>\n';
			TheCode += '\t\t<Identifier>' + element_id + '</Identifier>\n';
			TheCode += '\t\t<Name>' + element_name + '</Name>\n';
			TheCode += '\t\t<PositionX>' + element_positionx + '</PositionX>\n';
			TheCode += '\t\t<PositionY>' + element_positiony + '</PositionY>\n';
			TheCode += '\t\t<Width>' + element_width + '</Width>\n';
			TheCode += '\t\t<Height>' + element_height + '</Height>\n';
			TheCode += '\t\t<Font>' + element_font + '</Font>\n';
			TheCode += '\t\t<Size>' + element_fontsize + '</Size>\n';
			TheCode += '\t\t<Color>' + element_color + '</Color>\n';
			TheCode += '\t\t<Align>' + align + '</Align>\n';
			TheCode += '\t\t<Valign>' + valign + '</Valign>\n';
			TheCode += '\t\t<ShowDate>' + element_showdate + '</ShowDate>\n';
			TheCode += '\t\t<ShowTime>' + element_showtime + '</ShowTime>\n';

			TheCode += '\t</Control>\n\n';
		}
		else if (element_type === "WaitingList") {
			let waitingList = element.attr('multi-selects');
			let length = element.attr('length');
			let borderThickness = element.attr('border-thickness');
			let showBorder = element.attr('show-border');
			let macro = element.attr('macro');
			let branch = element.attr('branch');
			let element_background = element.attr('background-image');

			let element_font = element.css("font-family").replace(/"/g, '');
			let element_fontsize = element.css("font-size");
			let element_color = element.css("color");

			let element_align = element.attr("align") === undefined ? false : element.attr("align");
			let element_valign = element.attr("valign") === undefined ? false : element.attr("valign");

			TheCode += '\t<Control type="WaitingList">\n';
			TheCode += '\t\t<Type>WaitingList</Type>\n';
			TheCode += '\t\t<Identifier>' + element_id + '</Identifier>\n';
			TheCode += '\t\t<Name>' + element_name + '</Name>\n';
			TheCode += '\t\t<PositionX>' + element_positionx + '</PositionX>\n';
			TheCode += '\t\t<PositionY>' + element_positiony + '</PositionY>\n';
			TheCode += '\t\t<Width>' + element_width + '</Width>\n';
			TheCode += '\t\t<Height>' + element_height + '</Height>\n';
			TheCode += '\t\t<BackgroundImage>' + element_background + '</BackgroundImage>\n';
			TheCode += '\t\t<WaitingList>' + waitingList + '</WaitingList>\n';
			TheCode += '\t\t<Length>' + length + '</Length>\n';
			TheCode += '\t\t<BorderThickness>' + borderThickness + '</BorderThickness>\n';
			TheCode += '\t\t<ShowBorder>' + showBorder + '</ShowBorder>\n';
			TheCode += '\t\t<Macro>' + macro + '</Macro>\n';
			TheCode += '\t\t<BranchID>' + branch + '</BranchID>\n';
			TheCode += '\t\t<Font>' + element_font + '</Font>\n';
			TheCode += '\t\t<Size>' + element_fontsize + '</Size>\n';
			TheCode += '\t\t<Color>' + element_color + '</Color>\n';
			TheCode += '\t\t<Align>' + element_align + '</Align>\n';
			TheCode += '\t\t<Valign>' + element_valign + '</Valign>\n';
			TheCode += '\t</Control>\n\n';
		}
		else if (element_type === "CallerImage") {
			TheCode += '\t<Control type="CallerImage">\n';
			TheCode += '\t\t<Type>CallerImage</Type>\n';
			TheCode += '\t\t<Identifier>' + element_id + '</Identifier>\n';
			TheCode += '\t\t<Name>' + element_name + '</Name>\n';
			TheCode += '\t\t<PositionX>' + element_positionx + '</PositionX>\n';
			TheCode += '\t\t<PositionY>' + element_positiony + '</PositionY>\n';
			TheCode += '\t\t<Width>' + element_width + '</Width>\n';
			TheCode += '\t\t<Height>' + element_height + '</Height>\n';
			TheCode += '\t</Control>\n\n';
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

	//Convert Process
	ConvertToMagic();

	pagePropsActive = true;
	if (!validateElement()) {
		swal({
			icon: 'error',
			title: 'Control Page Properties',
			text: 'One of the page properties empty. Please ensure to fill all required inputs.'
		});

		return;
	}
	else
		pagePropsActive = false;

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

	//Submit Form
	$("form").submit();
}

//Change Setting Function
function changeSetting(value) {
	if (value === 'quick') {
		$('#quick-setting').addClass('select-option-active');
		$('#advanced-setting').removeClass('select-option-active');

		//Close Common Properties
		commonPropertiesContainer.css('display', 'none');
	}
	else if (value === 'advanced') {
		$('#quick-setting').removeClass('select-option-active');
		$('#advanced-setting').addClass('select-option-active');

		//Open Common Properties
		commonPropertiesContainer.css('display', 'block');
	}
}

//Multi Select Counter Function
function multiCounter() {
	let count = $('.list-checkbox:checked').length;

	count > 0 ? $('#waiting-list-label').html('' + count + ' of ' + $('.list-checkbox').length + ' Properties Selected') : $('#waiting-list-label').html('Please Select Properties');
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