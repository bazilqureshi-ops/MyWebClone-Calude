//==========================
//=== Global Properties ====
//==========================
let firstPosition = 0,
	firstP = 0,
	currentElement,
	currentElementId,
	currentElementName,
	currentElementX,
	currentElementY,
	copyElement,
	isModalActive = false,
	pagePropsActive = false,
	ctrlPressed = false,
	ctrlKey = 17,
	leftArrow = 37,
	upArrow = 38,
	rightArrow = 39,
	downArrow = 40,
	deleteKey = 46,
	cKey = 67,
	vKey = 86;

//Basic Regx Control
const notNull = /[a-zA-Z0-9]/;

//Page Input, Selects and Etc.. => When you add new input, select or etc... declare variable as 'const', then add this item in array named 'allElements' inside of elementAction() function.
// => Field Items
const step1Li = $('#step-1-li'),
	step2Li = $('#step-2-li'),
	step3Li = $('#step-3-li'),
	step4Li = $('#step-4-li'),
	step2 = $('#step-2'),
	step1 = $('#step-1'),
	step3 = $('#step-3'),
	step4 = $('#step-4'),

	// => Step 1
	// ==> Branch Section
	branchSelectSection = $('#field-test'),
	chartTypeContainer = $('#chart-type'),
	chartTypeSelect = $('#chart-type-options'),
	branchSelect = $('#branch-select-item-container'),

	// => Text Section
	textSection = $('#text-field'),
	staticText = $('#static-text'),
	fontSize = $('#text-font-size'),
	fontWeight = $('#text-font-weights'),
	fontStyle = $('#text-font-style'),

	// => Step 2
	reportType = $('#select-type-options'),

	// => Step 3
	appointmentContainer = $('#appointment-checkbox-container'),
	appointmenSelect = $('#appointment-select-item-container'),
	appointmentItems = $('.appointment-boxes'),
	step3BranchContainer = $('#branch1-checkbox-container'),
	step3BranchSelect = $('#branch1-select-item-container'),
	step3BranchItems = $('.branch1-boxes'),
	serviceContainer = $('#service-checkbox-container'),
	serviceSelect = $('#service-select-item-container'),
	serviceItems = $('.service-boxes'),
	segmentContainer = $('#segment-checkbox-container'),
	segmentSelect = $('#segment-select-item-container'),
	segmentItems = $('.segment-boxes'),
	terminalContainer = $('#terminal-checkbox-container'),
	terminalSelect = $('#terminal-select-item-container'),
	terminalItems = $('.terminal-boxes'),
	macroContainer = $('#macro-checkbox-container'),
	macroSelect = $('#macro-select-item-container'),
	macroItems = $('.macro-boxes'),
	customerContainer = $('#customer-user-container'),
	customerSearch = $('#SearchInput'),
	customerList = $('#search-customer-user'),

	// => Step 4
	// ==> Multi Select
	multiSelectContainer = $('#step-4-multi-properties'),
	totalTicket = $('input[property="TotalTicket"]'),
	totalVisit = $('input[property="TotalVisit"]'),
	name = $('input[property="Name"]'),
	surname = $('input[property="Surname"]'),
	fullName = $('input[property="FullName"]'),
	calledTicket = $('input[property="CalledTicket"]'),
	noShowTicket = $('input[property="NoShowTicket"]'),
	performancePerc = $('input[property="PerformancePerc"]'),
	minWaitingTime = $('input[property="MinimumWaitingTime"]'),
	maxWaitingTime = $('input[property="MaximumWaitingTime"]'),
	avrgWaitingTime = $('input[property="AverageWaitingTime"]'),
	minOperationTime = $('input[property="MinimumOperationTime"]'),
	maxOperationTime = $('input[property="MaximumOperationTime"]'),
	avrgOperationTime = $('input[property="AverageOperationTime"]'),
	minProcessTime = $('input[property="MinimumProcessTime"]'),
	maxProcessTime = $('input[property="MaximumProcessTime"]'),
	avrgProcessTime = $('input[property="AverageProcessTime"]'),

	// ==> Single Select
	singleTotalTicket = $('option[value="TotalTicket"]'),
	singleTotalVisit = $('option[value="TotalVisit"]'),
	singleName = $('option[value="Name"]'),
	singleSurname = $('option[value="Surname"]'),
	singleFullName = $('option[value="FullName"]'),
	singleCalledTicket = $('option[value="CalledTicket"]'),
	singleNoShowTicket = $('option[value="NoShowTicket"]'),
	singlePerformancePerc = $('option[value="PerformancePerc"]'),
	singleMinWaitingTime = $('option[value="MinimumWaitingTime"]'),
	singleMaxWaitingTime = $('option[value="MaximumWaitingTime"]'),
	singleAvrgWaitingTime = $('option[value="AverageWaitingTime"]'),
	singleMinOperationTime = $('option[value="MinimumOperationTime"]'),
	singleMaxOperationTime = $('option[value="MaximumOperationTime"]'),
	singleAvrgOperationTime = $('option[value="AverageOperationTime"]'),
	singleMinProcessTime = $('option[value="MinimumProcessTime"]'),
	singleMaxProcessTime = $('option[value="MaximumProcessTime"]'),
	singleAvrgProcessTime = $('option[value="AverageProcessTime"]'),

	propertyTypeContainer = $('#step-4-single-property'),
	singleSelectProperty = $('#select-property'),
	propertyTypeHeader = $('#property-type-header'),
	numberTypeSelect = $('#select-property-type-number'),
	stringTypeSelect = $('#select-property-type-string'),

	// => Validation Items
	branchSelectValidation = $('#step-1-select-error'),
	staticTextValidation = $('#step-2-select-error'),
	detailOfTypeValidation = $('#step-3-select-error'),
	propertyValidation = $('#step-4-select-error'),

	silinecekBu = 0;

const xArrow = $('#x-arrow');
const yArrow = $('#y-arrow');
const searchboxID = $('#SearchInput');
let itemCount = 0;

//==========================
//===== General Setting ====
//==========================

$(document).ready(function () {
	if (!jQuery.ui) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.async = true;
		script.src = "/assets/jquery-ui/jquery-ui.js";
		var oScripts = document.getElementsByTagName("script");
		var s = oScripts[0];
		s.parentNode.insertBefore(script, s);
	}

	//Report Type
	reportTypeChange();

	//Get Element Count
	itemCount = $('.draggable').length;

	//Select CurrentElement
	$('#DesignArea').on('click', (e) => {
		let target = e.target;
		//Set Current Element By Click

		if (!target.classList.contains('draggable') && currentElement === null || !target.classList.contains('draggable') && currentElement === undefined || !target.classList.contains('draggable'))
			currentElement = $(target).closest('.draggable');
		else
			$(target).hasClass('draggable') ? currentElement = $(target) : '';

		if (currentElement.length > 0) {
			$('.draggable').removeClass('selected');

			currentElement.addClass('selected');
			currentElementId = currentElement.attr('id');
			currentElementName = currentElement.attr('name');
		}
		else {
			$('.draggable').removeClass('selected');

			currenElementId = 0;
			currentElementName = '';
		}
	});

	//Copy + Paste Item, Move Item With Arrow Keys Function 
	$(document).keydown((e) => {
		//Ctrl Press Controll
		if (e.keyCode === ctrlKey) ctrlPressed = true;

		//Arrow Left => Move Element to Left
		if (e.keyCode === leftArrow && !isModalActive) {
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
		if (e.keyCode === upArrow && !isModalActive) {
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
		if (e.keyCode === rightArrow && !isModalActive) {
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
		if (e.keyCode === downArrow && !isModalActive) {
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
		if (ctrlPressed && e.keyCode === cKey && !isModalActive) {
			if (currentElement !== null) {
				copyElement = $(currentElement).clone();
			}
		}

		//Ctrl + V => Paste Element
		else if (ctrlPressed && e.keyCode === vKey && !isModalActive) {
			itemCount++;

			//Control Element
			let elementControl = $('#' + itemCount + '');

			//If This Id Assign to Another Element.
			if (elementControl.length > 0)
				controlElement();

			//Change Element Id and Element Name
			$(copyElement).attr('id', '' + itemCount + '');
			$(copyElement).attr('name', '' + $(copyElement).attr('Type') + '' + itemCount + '');

			//Append Element to Design Area
			$('#DesignArea').append(copyElement);

			copyElement = $(copyElement).clone();

			draggable();
			resizable();
			$('.draggable').resizable("destroy");
			resizable();
		}

		if (!isModalActive && e.keyCode === deleteKey && currentElement.length > 0) {
			$(currentElement).remove();
		}

	}).keyup((e) => {
		if (e.keyCode === ctrlKey) ctrlPressed = false;
	});

	//Nav Bar Design Element Hover Change Function
	$('#nav-tab > li').on('mouseover', (e) => {
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
	let navBarHeight = $('#nav-tab').height();
	$('#nav-tab').height(navBarHeight + 5);

	//Reset Model Elements (input, select and etc..)
	$('.bd-example-modal-lg').on('hide.bs.modal', function (e) {
		currentElement = null;
		isModalActive = false;

		elementAction('all', 'close');
		elementAction('all', 'clear');
	});

	elementAction('all', 'close');
	elementAction('all', 'clear');
	elementAction(step2Li, step3Li, step4Li, 'disable');

});

//Document Click Events
$(document).click(function (e) {
	const target = e.target;

	//Appointment checkboxes container, out click function
	if ($('#appointment-select-item-container').css('display') === 'block' && !$(target).parents().is('.select-box')) {
		const appointmentCheckBoxes = $('#appointment-select-item-container');

		$(appointmentCheckBoxes).css('display', 'none');
		$('#select-appointments').removeClass('select-active');

	}

	//Branch 3rd Step checkboxes container, out click function
	if ($('#branch1-select-item-container').css('display') === 'block' && !$(target).parents().is('.select-box')) {
		const branchCheckBoxes = $('#branch1-select-item-container');

		$(branchCheckBoxes).css('display', 'none');
		$('#select-branch1s').removeClass('select-active');

	}

	//Branch checkboxes container, out click function
	if ($('#branch-select-item-container').css('display') === 'block' && !$(target).parents().is('.select-box')) {
		const branchCheckBoxes = $('#branch-select-item-container');

		$(branchCheckBoxes).css('display', 'none');
		$('#select-branch').removeClass('select-active');

	}

	//Service checkboxes container, out click function
	if ($('#service-select-item-container').css('display') === 'block' && !$(target).parents().is('.select-box')) {
		const serviceCheckBoxes = $('#service-select-item-container');

		$(serviceCheckBoxes).css('display', 'none');
		$('#select-services').removeClass('select-active');

	}

	//Segment checkboxes container, out click function
	if ($('#segment-select-item-container').css('display') === 'block' && !$(target).parents().is('.select-box')) {
		const segmentCheckBoxes = $('#segment-select-item-container');

		$(segmentCheckBoxes).css('display', 'none');
		$('#select-segments').removeClass('select-active');

	}

	//Terminal checkboxes container, out click function
	if ($('#terminal-select-item-container').css('display') === 'block' && !$(target).parents().is('.select-box')) {
		const terminalCheckBoxes = $('#terminal-select-item-container');

		$(terminalCheckBoxes).css('display', 'none');
		$('#select-terminals').removeClass('select-active');

	}

	//Macro checkboxes container, out click function
	if ($('#macro-select-item-container').css('display') === 'block' && !$(target).parents().is('.select-box')) {
		const macroCheckBoxes = $('#macro-select-item-container');

		$(macroCheckBoxes).css('display', 'none');
		$('#select-macros').removeClass('select-active');

	}

	//Customer or User checkboxes container, out click function
	if ($('#search-customer-user').css('display') === 'block' && !$(target).parents().is('.select-box')) {
		const csCheckBoxes = $('#search-customer-user');

		$(csCheckBoxes).css('display', 'none');
		ResetSearchInput();

	}

	//Property checkboxes container, out click function
	if ($('#multi-select-property-container').css('display') === 'block' && !$(target).parents().is('.select-box')) {
		const propertyCheckBoxes = $('#multi-select-property-container');

		$(propertyCheckBoxes).css('display', 'none');
		$('#select-properties').removeClass('select-active');
	}
});

//Make Element Draggble
function draggable() {
	$(".draggable").draggable({
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
			$('.draggable').removeClass('selected');

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

			//Disable Arrows
			$('.side-arrows').removeClass('arrow-enabled');
			xArrow.removeClass('arrow-enabled');
			yArrow.removeClass('arrow-enabled');

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

//Draggable Selector s
function draggableSelector() {
	if (ctrlPressed) {
		$(currentElement).draggable({
			containment: "#DesignArea",
			stack: ".draggable",
			snap: ".draggable",
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
	$(".draggable").resizable({
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
			//Update Current Element's X and Y Value
			currentElement.attr('element-width', '' + elementWidth() + '');
			currentElement.attr('element-height', '' + elementHeight() + '');
		}
	});
}

resizable();

//Create droppable area and create a copy of object in dropabble area.
function droppable() {
	$("#DesignArea").droppable({
		accept: ".draggable, .draggable-element",
		drop: function (event, ui) {
			const droppable = $(this);
			const dropped = ui.draggable;

			//Increase Item Count
			itemCount++;

			//When new element adding
			if (dropped.hasClass('draggable-element')) {
				const dragabbleClone = ui.draggable.clone();

				//Clearing html 
				dragabbleClone.html("");

				//Append in to Design Area
				if ($(dragabbleClone).attr('type') === "Field")
					dragabbleClone.append("<a onclick='modalActive($(this).parent())'><i  class='fa fa-edit report-icons'></i></a><span onclick='DeleteItem($(this))' class='fa fa-trash report-icons text-danger'></span> <i class='fa fa-paperclip cntr'></i>");
				else if ($(dragabbleClone).attr('type') === "List")
					dragabbleClone.append("<a onclick='modalActive($(this).parent())')><i  class='fa fa-edit report-icons'></i></a><span onclick='DeleteItem($(this))' class='fa fa-trash report-icons text-danger'></span> <i class='fa fa-list cntr'></i>");
				else if ($(dragabbleClone).attr('type') === "Text")
					dragabbleClone.append("<a onclick='modalActive($(this).parent())')><i  class='fa fa-edit report-icons' style='position:absolute;'></i></a><span onclick='DeleteItem($(this))' class='fa fa-trash report-icons text-danger'></span> <i class='fa fa-text-width cntr'></i>");
				else
					dragabbleClone.append("<a onclick='modalActive($(this).parent())')><i  class='fa fa-edit report-icons'></i></a><span onclick='DeleteItem($(this))' class='fa fa-trash report-icons text-danger'></span> <i class='fa fa-pie-chart cntr'></i>");

				//Control Element Ids, if there any element has id matching with itemCount value controlElement() function will deploy.
				let controlItem = document.getElementById(itemCount);
				if (controlItem !== null) {
					controlElement();
				}

				$(dragabbleClone).attr({
					'id': itemCount,
					'element-left': '0.01',
					'element-top': '0.01',
					'element-width': '7.90',
					'element-height': '5.70'
				});

				$(dragabbleClone).css({
					'height': '100px',
					'width': '100px'
				});

				$(dragabbleClone)
					.removeClass('draggable-element')
					.removeClass('design-tool-element')
					.addClass('draggable')
					.appendTo(droppable);

				//Increase Item Count When New Item Added
				itemCount++;


				draggable();
				resizable();
				$('.draggable').resizable("destroy");
				resizable();

			}
		},
		over: function (event, elem) {
			//What will happend after drop over
		},
		out: function (event, elem) {
			//$(this).removeClass("over");
		}
	});
}

droppable();

$(".draggable-element").draggable({
	containment: "#advanced-design-body",
	revert: true,
	helper: 'clone',
	cursor: "move",
	revertDuration: 0,
	stack: ".draggable",
	drag: function (event, ui) {

	}
});

//Element Action
const elementAction = (...args) => {

	//Elements array
	const allElements = [
		// => Step 1
		// ==> Branch Section
		branchSelectSection,
		chartTypeContainer,
		chartTypeSelect,
		branchSelect,

		// => Text Section
		textSection,
		staticText,
		fontSize,
		fontWeight,
		fontStyle,

		// => Step 2
		reportType,

		// => Step 3
		appointmentContainer,
		appointmenSelect,
		appointmentItems,
		step3BranchContainer,
		step3BranchSelect,
		step3BranchItems,
		serviceContainer,
		serviceSelect,
		serviceItems,
		segmentContainer,
		segmentSelect,
		segmentItems,
		terminalContainer,
		terminalSelect,
		terminalItems,
		macroContainer,
		macroSelect,
		macroItems,
		customerContainer,
		customerSearch,
		customerList,

		// => Step 4
		// ==> Multi Select
		multiSelectContainer,
		totalTicket,
		totalVisit,
		name,
		surname,
		fullName,
		calledTicket,
		noShowTicket,
		performancePerc,
		minWaitingTime,
		maxWaitingTime,
		avrgWaitingTime,
		minOperationTime,
		maxOperationTime,
		avrgOperationTime,
		minProcessTime,
		maxProcessTime,
		avrgProcessTime,

		// ==> Single Select
		singleTotalTicket,
		singleTotalVisit,
		singleName,
		singleSurname,
		singleFullName,
		singleCalledTicket,
		singleNoShowTicket,
		singlePerformancePerc,
		singleMinWaitingTime,
		singleMaxWaitingTime,
		singleAvrgWaitingTime,
		singleMinOperationTime,
		singleMaxOperationTime,
		singleAvrgOperationTime,
		singleMinProcessTime,
		singleMaxProcessTime,
		singleAvrgProcessTime,

		propertyTypeContainer,
		singleSelectProperty,
		propertyTypeHeader,
		numberTypeSelect,
		stringTypeSelect,

		// => Validation Items
		branchSelectValidation,
		staticTextValidation,
		detailOfTypeValidation,
		propertyValidation,

	];

	//If elements comes inside of array this method will deploy
	if (typeof args[0] === 'object' && args[0].length > 1) {
		args[0].forEach((v, i) => {
			args.push(v);
		});

		let action = args[1];
		args.splice(0, 2);
		args.push(action);
	}

	//Open-Close Single Element
	if (typeof args[0] === 'object' && args[args.length - 1] === 'open' || typeof args[0] === 'object' && args[args.length - 1] === 'close') {

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

				if (typeof args[i] === 'object') {
					parentElement = args[i].parent();

					if (args[args.length - 1] === "open" && parentElement !== undefined && args[i].attr('id').indexOf('container') <= 0) {

						//Open the element
						args[i].css('display', 'inline-block');
						//Also open parent element
						if (parentElement.css('display') === 'none')
							parentElement.css('display', 'block');
					}
					else if (args[args.length - 1] === "close" && parentElement !== undefined && args[i].attr('id').indexOf('container') <= 0) {

						//Open the element
						args[i].css('display', 'none');
						//Also open parent element
						parentElement.css('display', 'none');
					}
					else if (args[args.length - 1] === "open" && parentElement !== undefined) {
						parentElement.css('display', 'block');
					}
					else if (args[args.length - 1] === "close" && parentElement !== undefined) {
						parentElement.css('display', 'none');
					}
					else {
						i !== args.length - 1 ? parentElement.css('display', 'none') : '';
					}
				}
			}
		}

	}
	//Open-Close All Element
	else if (args[0] === 'all' && args[1] === 'open' || args[0] === 'all' && args[1] === 'close') {

		for (let i = 0; i < allElements.length; i++) {

			if (allElements[i][0].nodeName === 'SPAN' && allElements[i].hasClass('validate-for')) {
				args[args.length - 1] === "open" ?
					allElements[i].addClass('validate-for-active')
					: allElements[i].removeClass('validate-for-active');
			}
			else if (allElements[i].parent()[0].nodeName === 'LABEL' && allElements[i].parent().hasClass('select-item')) {

				if (args[1] === "open" && args.length >= 2) {
					allElements[i].css('display', 'block');

					//Close parent element
					allElements[i].parent().css('display', 'block');
				}

				else if (args[1] === "close" && args.length >= 2) {
					allElements[i].css('display', 'none');

					//Close parent element
					allElements[i].parent().css('display', 'none');
				}
			}
			else {

				if (args[1] === "open" && args.length >= 2)
					allElements[i].css('display', 'block');
				else if (args[1] === "close" && args.length >= 2)
					allElements[i].css('display', 'none');

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
			}
			//Element Tag is Select
			else if (allElements[i][0].nodeName === 'SPAN' && allElements[i].hasClass('validate-for')) {
				allElements[i].html('');

			}

		}

	}
	//Enable & Disabled Single Element
	else if (typeof args[0] === 'object' && args[args.length - 1] === 'disable' || typeof args[0] === 'object' && args[args.length - 1] === 'enable') {
		for (var i = 0; i < args.length - 1; i++) {

			if (args[args.length - 1] === 'disable') {
				args[i].addClass('disabled');
			}
			else if (args[args.length - 1] === 'enable') {
				args[i].removeClass('disabled');
			}

		}

	}

};

//Control Element Id
const controlElement = () => {
	let elements = $('.draggable');
	let biggestId = 0;
	for (var i = 0; i < elements.length; i++) {
		if (parseFloat($(elements[i]).attr('id')) > biggestId)
			biggestId = parseFloat($(elements[i]).attr('id'));
	}

	if (biggestId > 0) {
		//Element Count
		itemCount = biggestId;

		itemCount++;
	}

};

//Delete Element Function
const DeleteItem = (element) => {
	//Get Element
	const mainElement = element.parent();
	//Element id
	const elementId = $(mainElement).attr('id');


	if (mainElement.hasClass('table-item')) {
		swal({
			icon: 'warning',
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			buttons: true
		}).then((answer) => {
			if (answer) {
				$('a:contains(' + mainElement.text() + ')').css('border-color', 'unset');

				//Delete Element
				mainElement.remove();
			}
		});
	}
	else {
		//Delete Element
		mainElement.remove();

		//Decrease Item Count
		itemCount--;

		//Then Update Recent Item's Id's
		$('.draggable').each((i, v) => {
			let thisElementId = $(v).attr('id');

			if (thisElementId > elementId) {
				thisElementId--;
				$(v).attr('id', thisElementId);
			}
		});
	}
};

//Active Modal With Element Type
const modalActive = (element) => {
	const elementType = element.attr('type');
	currentElement = element;
	const currentElementId = currentElement.attr('id');
	isModalActive = true;

	//Controlling Element Type
	if (elementType === 'Text') {
		//Active needed elements
		elementAction(textSection, staticText, fontSize, fontStyle, fontWeight, 'open');

		//Disable steps
		elementAction(step2Li, step3Li, step4Li, 'disable');

		//Get element's values
		if (notNull.test(currentElement.attr('text')))
			staticText.val(currentElement.attr('text'));

		//Font Size
		if (notNull.test(currentElement.attr('fontsize')) && currentElement.attr('fontsize') !== undefined)
			fontSize.val(currentElement.attr('fontsize'));

		//Font Weight
		if (notNull.test(currentElement.attr('fontweight')) && currentElement.attr('fontweight') !== undefined) {
			fontWeight.val(currentElement.attr('fontweight'));
			fontWeight.css('font-weight', currentElement.attr('fontweight'));
		} else
			fontWeight.css('font-weight', 'normal');

		//Font Style
		if (notNull.test(currentElement.attr('fontstyle')) && currentElement.attr('fontstyle') !== undefined)
			fontStyle.val(currentElement.attr('fontstyle'));

	}
	else if (elementType === 'Field') {
		//Open required containers and properties
		elementAction(branchSelectSection, branchSelect, 'open');

		if (currentElement.children('branch').length > 0) {
			//Activating steps
			elementAction(step2Li, step3Li, step4Li, 'enable');

			// => Step 2
			// ==> Open report type
			elementAction(reportType, 'open');

			let typeOfReport = currentElement.attr('reporttype');
			reportType.val(typeOfReport);

			// => Step 3
			// ==> Activating detail of selected report type
			if (typeOfReport === 'Appointment') {
				elementAction(appointmentContainer, appointmenSelect, appointmentItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

				$('#' + currentElementId + ' > detail[appointmentid]').each((i, v) => {
					const appointmentId = $(v).attr('appointmentid');

					//Check Branch Box
					$('input.appointment-boxes[appointmentid=' + appointmentId + ']').prop('checked', true);
				});
			}
			else if (typeOfReport === 'Branch') {
				elementAction(step3BranchContainer, step3BranchSelect, step3BranchItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

				$('#' + currentElementId + ' > detail[branchid]').each((i, v) => {
					const branchId = $(v).attr('branchid');

					//Check Branch Box
					$('input.branch1-boxes[branchid=' + branchId + ']').prop('checked', true);
				});
			}
			else if (typeOfReport === 'Customer' || typeOfReport === 'User') {
				elementAction(customerContainer, customerSearch, customerSearch, singleName, singleSurname, singleFullName, singleTotalVisit, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

				$('#' + currentElementId + ' > detail[customerid]').each((i, v) => {
					const customerId = $(v).attr('customerid');
					const customerName = $(v).attr('customername');

					//Append User and Customer Datas into List
					let text = '<li class="select-branch customer-user-item" customerid="' + customerId + '" customername="' + customerName + '">' + customerName + '<i class="fa fa-times delete-li"></i></li>';

					customerList.append(text);

				});
			}
			else if (typeOfReport === 'Service') {
				elementAction(serviceContainer, serviceSelect, serviceItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

				$('#' + currentElementId + ' > detail[serviceid]').each((i, v) => {
					const serviceId = $(v).attr('serviceid');

					//Check Branch Box
					$('input.service-boxes[serviceid=' + serviceId + ']').prop('checked', true);
				});
			}
			else if (typeOfReport === 'Segment') {
				elementAction(segmentContainer, segmentSelect, segmentItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

				$('#' + currentElementId + ' > detail[segmentid]').each((i, v) => {
					const segmentId = $(v).attr('segmentid');

					//Check Branch Box
					$('input.segment-boxes[segmentid=' + segmentId + ']').prop('checked', true);
				});
			}
			else if (typeOfReport === 'Terminal') {
				elementAction(terminalContainer, terminalSelect, terminalItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

				$('#' + currentElementId + ' > detail[terminalid]').each((i, v) => {
					const terminalId = $(v).attr('terminalid');

					//Check Branch Box
					$('input.terminal-boxes[terminalid=' + terminalId + ']').prop('checked', true);
				});
			}
			else if (typeOfReport === 'Macro') {
				elementAction(macroContainer, macroSelect, macroItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

				$('#' + currentElementId + ' > detail[macroid]').each((i, v) => {
					const macroId = $(v).attr('macroid');

					//Check Branch Box
					$('input.macro-boxes[macroid=' + macroId + ']').prop('checked', true);
				});
			}

			// => Step 4
			// ==> Activating properties of type
			elementAction(singleSelectProperty, propertyTypeHeader, 'open');

			//Get element property type and set value to select list
			let detailOfProperty = currentElement.children('detail[property]').attr('property');
			singleSelectProperty.val(detailOfProperty);

			//Get element property detail and set value to select list
			let detailOfPropertyType = currentElement.children('detail[propertytype]').attr('propertytype');
			if (detailOfPropertyType === 'Normal' || detailOfPropertyType === 'CommaDelimited' || detailOfPropertyType === 'LineByLine') {
				elementAction(stringTypeSelect, 'open');
				stringTypeSelect.val(detailOfPropertyType);
			}
			else {
				elementAction(numberTypeSelect, 'open');
				numberTypeSelect.val(detailOfPropertyType);
			}
		}
	}
	else if (elementType === 'List') {
		//Open required containers and properties
		elementAction(branchSelectSection, branchSelect, multiSelectContainer, 'open');

		if (currentElement.children('branch').length > 0) {
			//Activating steps
			elementAction(step2Li, step4Li, 'enable');

			// => Step 2
			// ==> Open report type
			elementAction(reportType, 'open');
			elementAction(reportType, 'open');

			let typeOfReport = currentElement.attr('reporttype');
			reportType.val(typeOfReport);

			if (typeOfReport === "Appointment") {
				//Active Appointment List
				elementAction(fullName, totalTicket, calledTicket, noShowTicket, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');

			}
			else if (typeOfReport === "Branch") {
				//Active Branch List
				elementAction(fullName, totalTicket, calledTicket, noShowTicket, performancePerc, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');

			}
			else if (typeOfReport === "Customer") {
				//Active Branch List
				elementAction(name, surname, fullName, totalVisit, noShowTicket, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');

				customerContainer.attr('display', 'block');


				//Clearing if there any data in Customer List
				$('.customer-user-list').html('');

				//Change shared input placeholder in accordance with the customer
				$('#SearchInput').attr('placeholder', 'Type Customer Name');

				//Change search data type as customer
				$('#DataType').val('customer');
			}
			else if (typeOfReport === "Service") {
				//Active Service List
				elementAction(fullName, totalTicket, calledTicket, noShowTicket, performancePerc, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');

			}
			else if (typeOfReport === "Segment") {
				//Active Segment List
				elementAction(fullName, totalTicket, calledTicket, noShowTicket, performancePerc, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');

			}
			else if (typeOfReport === "Terminal") {
				//Active Terminal List
				elementAction(fullName, totalTicket, calledTicket, noShowTicket, performancePerc, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');

			}
			else if (typeOfReport === "User") {
				//Active Branch List
				elementAction(fullName, totalTicket, calledTicket, noShowTicket, performancePerc, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');
				customerContainer.attr('display', 'block');

				//Clearing if there any data in Customer List
				$('.customer-user-list').html('');

				//Change shared input placeholder in accordance with the user
				$('#SearchInput').attr('placeholder', 'Type User Name');

				//Change search data type as customer
				$('#DataType').val('user');

			}
			else if (typeOfReport === "Macro") {
				//Active Macro List
				elementAction(fullName, totalTicket, calledTicket, noShowTicket, performancePerc, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');
			}

			currentElement.children('detail[property]').each((i, v) => {
				$('input[property="' + $(v).attr('property') + '"]').prop('checked', true);
			});
		}
		else {
			elementAction(fullName, totalTicket, calledTicket, noShowTicket, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');
		}
	}
	else if (elementType === 'Chart') {
		//Open required containers and properties
		elementAction(chartTypeContainer, chartTypeSelect, branchSelectSection, branchSelect, 'open');

		if (currentElement.children('branch').length > 0) {
			//Activating steps
			elementAction(step2Li, step3Li, step4Li, 'enable');

			// => Step 1
			// ==> Chart Type
			chartTypeSelect.val(currentElement.attr('charttype'));

			// => Step 2
			// ==> Open report type
			elementAction(reportType, 'open');
			elementAction(reportType, 'open');

			let typeOfReport = currentElement.attr('reporttype');
			reportType.val(typeOfReport);

			// => Step 3
			// ==> Activating detail of selected report type
			if (typeOfReport === 'Appointment') {
				elementAction(appointmentContainer, appointmenSelect, appointmentItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

				$('#' + currentElementId + ' > detail[appointmentid]').each((i, v) => {
					const appointmentId = $(v).attr('appointmentid');

					//Check Branch Box
					$('input.appointment-boxes[appointmentid=' + appointmentId + ']').prop('checked', true);
				});
			}
			else if (typeOfReport === 'Branch') {
				elementAction(step3BranchContainer, step3BranchSelect, step3BranchItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

				$('#' + currentElementId + ' > detail[branchid]').each((i, v) => {
					const branchId = $(v).attr('branchid');

					//Check Branch Box
					$('input.branch1-boxes[branchid=' + branchId + ']').prop('checked', true);
				});
			}
			else if (typeOfReport === 'Customer' || typeOfReport === 'User') {
				elementAction(customerContainer, customerSearch, customerSearch, singleName, singleSurname, singleFullName, singleTotalVisit, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

				$('#' + currentElementId + ' > detail[customerid]').each((i, v) => {
					const customerId = $(v).attr('customerid');
					const customerName = $(v).attr('customername');

					//Append User and Customer Datas into List
					let text = '<li class="select-branch customer-user-item" customerid="' + customerId + '" customername="' + customerName + '">' + customerName + '<i class="fa fa-times delete-li"></i></li>';

					customerList.append(text);

				});
			}
			else if (typeOfReport === 'Service') {
				elementAction(serviceContainer, serviceSelect, serviceItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

				$('#' + currentElementId + ' > detail[serviceid]').each((i, v) => {
					const serviceId = $(v).attr('serviceid');

					//Check Branch Box
					$('input.service-boxes[serviceid=' + serviceId + ']').prop('checked', true);
				});
			}
			else if (typeOfReport === 'Segment') {
				elementAction(segmentContainer, segmentSelect, segmentItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

				$('#' + currentElementId + ' > detail[segmentid]').each((i, v) => {
					const segmentId = $(v).attr('segmentid');

					//Check Branch Box
					$('input.segment-boxes[segmentid=' + segmentId + ']').prop('checked', true);
				});
			}
			else if (typeOfReport === 'Terminal') {
				elementAction(terminalContainer, terminalSelect, terminalItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

				$('#' + currentElementId + ' > detail[terminalid]').each((i, v) => {
					const terminalId = $(v).attr('terminalid');

					//Check Branch Box
					$('input.terminal-boxes[terminalid=' + terminalId + ']').prop('checked', true);
				});
			}
			else if (typeOfReport === 'Macro') {
				elementAction(macroContainer, macroSelect, macroItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

				$('#' + currentElementId + ' > detail[macroid]').each((i, v) => {
					const macroId = $(v).attr('macroid');

					//Check Branch Box
					$('input.macro-boxes[macroid=' + macroId + ']').prop('checked', true);
				});
			}

			// => Step 4
			// ==> Activating properties of type
			elementAction(singleSelectProperty, propertyTypeHeader, 'open');

			//Get element property type and set value to select list
			let detailOfProperty = currentElement.children('detail[property]').attr('property');
			singleSelectProperty.val(detailOfProperty);

			//Get element property detail and set value to select list
			let detailOfPropertyType = currentElement.children('detail[propertytype]').attr('propertytype');
			if (detailOfPropertyType === 'Normal' || detailOfPropertyType === 'CommaDelimited' || detailOfPropertyType === 'LineByLine') {
				elementAction(stringTypeSelect, 'open');
				stringTypeSelect.val(detailOfPropertyType);
			}
			else {
				elementAction(numberTypeSelect, 'open');
				numberTypeSelect.val(detailOfPropertyType);
			}
		}

	}
	else {
		//If element type chart this select will show up
		$('#field-test').css('display', 'block');
		$('#chart-type').css('display', 'block');
		$('#property-type-header').css('display', 'block');
		$('#select-property-type-number').css('display', 'inline-block');
		$('#text-field').css('display', 'none');

		$('#step-1-text').text('Select Chart & Branch');
	}

	//Check Element's Report Type If They Match With Customer or User Append Search #DataType
	if (elementType === "Field" || elementType === "Chart") {
		if (currentElement.attr('reporttype') === "Customer") {
			$('#DataType').val('customer');
		}
		else if (currentElement.attr('reporttype') === "User") {
			$('#DataType').val('user');
		}
	}

	//Check Selected Branches
	currentElement.children('branch').each((i, v) => {
		const branchId = $(v).attr('branchid');

		//Check Branch Box
		$('input.branch-boxes[branchid=' + branchId + ']').prop('checked', true);
	});

	Option();

	$('.bd-example-modal-lg').modal('toggle');

};

//Checkboxes Type Counters
const Option = () => {
	let checked = 0;
	let total = 0;

	//Appointment Boxes
	total = $('.appointment-boxes').length;
	checked = $('.appointment-boxes:checked').length;

	if (checked > 0) {
		$('#select-appointments').text('' + checked + ' of ' + total + ' Appointment(s) Selected');
		$('#select-appointments').text('' + checked + ' of ' + total + ' Appointment(s) Selected');
	}
	else if (checked === 0) {
		$('#select-appointments').html('Select Appointment <i id="select-icon" class="fa fa-caret-down"></i>');
	}

	//Branch1 Checkboxes
	total = $('.branch1-boxes').length;
	checked = $('.branch1-boxes:checked').length;

	if (checked > 0) {
		$('#select-branch1s').text('' + checked + ' of ' + total + ' Branch(es) Selected');
		$('#select-branch1s').text('' + checked + ' of ' + total + ' Branch(es) Selected');
	}
	else if (checked === 0) {
		$('#select-branch1s').html('Select Branches <i id="select-icon" class="fa fa-caret-down"></i>');
	}

	//Branch Checkboxes
	total = $('.branch-boxes').length;
	checked = $('.branch-boxes:checked').length;

	if (checked > 0) {
		$('#select-branch').text('' + checked + ' of ' + total + ' Branch(es) Selected');
		$('#select-branch').text('' + checked + ' of ' + total + ' Branch(es) Selected');
	}
	else if (checked === 0) {
		$('#select-branch').html('Select Branches <i id="select-icon" class="fa fa-caret-down"></i>');
	}

	//Service Checkboxes
	total = $('.service-boxes').length;
	checked = $('.service-boxes:checked').length;

	if (checked > 0) {
		$('#select-services').text('' + checked + ' of ' + total + ' Service(es) Selected');
		$('#select-services').text('' + checked + ' of ' + total + ' Service(es) Selected');
	}
	else if (checked === 0) {
		$('#select-services').html('Select Service <i id="select-icon" class="fa fa-caret-down"></i>');
	}

	//Segment Checkboxes
	total = $('.segment-boxes').length;
	checked = $('.segment-boxes:checked').length;

	if (checked > 0) {
		$('#select-segments').text('' + checked + ' of ' + total + ' Segment(s) Selected');
		$('#select-segments').text('' + checked + ' of ' + total + ' Segment(s) Selected');
	}
	else if (checked === 0) {
		$('#select-segments').html('Select Segment <i id="select-icon" class="fa fa-caret-down"></i>');
	}

	//Terminals Checkboxes
	total = $('.terminal-boxes').length;
	checked = $('.terminal-boxes:checked').length;

	if (checked > 0) {
		$('#select-terminals').text('' + checked + ' of ' + total + ' Terminal(s) Selected');
		$('#select-terminals').text('' + checked + ' of ' + total + ' Terminal(s) Selected');
	}
	else if (checked === 0) {
		$('#select-terminals').html('Select Terminal <i id="select-icon" class="fa fa-caret-down"></i>');
	}

	//Macro Checkboxes
	total = $('.macro-boxes').length;
	checked = $('.macro-boxes:checked').length;

	if (checked > 0) {
		$('#select-macros').text('' + checked + ' of ' + total + ' Macro(s) Selected');
		$('#select-macros').text('' + checked + ' of ' + total + ' Macro(s) Selected');
	}
	else if (checked === 0) {
		$('#select-macros').html('Select Macro <i id="select-icon" class="fa fa-caret-down"></i>');
	}

	//Property Checkboxes
	total = $('.property-boxes').length;
	checked = $('.property-boxes:checked').length;

	if (checked > 0) {
		$('#select-properties').text('' + checked + ' of ' + total + ' Property(s) Selected');
		$('#select-properties').text('' + checked + ' of ' + total + ' Property(s) Selected');
	}
	else if (checked === 0) {
		$('#select-properties').html('Select Property <i id="select-icon" class="fa fa-caret-down"></i>');
	}
};

//Watch Any Changes on Page
$(() => {
	//Watch Select Item Changes
	$('.select-item').click(() => {
		Option();
	});

	//Watch Select Appointment is Active or Not
	$('#select-appointments').on('click',
		() => {
			//Properties
			const $select = $('#select-appointments');
			const $itemContainer = $('#appointment-select-item-container');

			if (!$select.hasClass('select-active')) {
				$select.addClass('select-active');
				$itemContainer.css('display', 'block');
			}
			else {
				$select.removeClass('select-active');
				$itemContainer.css('display', 'none');
			}
		});

	//Watch Select Branch 3rd Step is Active or Not
	$('#select-branch1s').on('click',
		() => {
			//Properties
			const $select = $('#select-branch1s');
			const $itemContainer = $('#branch1-select-item-container');

			if (!$select.hasClass('select-active')) {
				$select.addClass('select-active');
				$itemContainer.css('display', 'block');
			}
			else {
				$select.removeClass('select-active');
				$itemContainer.css('display', 'none');
			}
		});

	//Watch Select Branch is Active or Not
	$('#select-branch').on('click',
		() => {
			//Properties
			const $select = $('#select-branch');
			const $itemContainer = $('#branch-select-item-container');

			if (!$select.hasClass('select-active')) {
				$select.addClass('select-active');
				$itemContainer.css('display', 'block');
			}
			else {
				$select.removeClass('select-active');
				$itemContainer.css('display', 'none');
			}
		});

	//Watch Select Service is Active or Not
	$('#select-services').on('click',
		() => {
			//Properties
			const $select = $('#select-services');
			const $itemContainer = $('#service-select-item-container');

			if (!$select.hasClass('select-active')) {
				$select.addClass('select-active');
				$itemContainer.css('display', 'block');
			}
			else {
				$select.removeClass('select-active');
				$itemContainer.css('display', 'none');
			}
		});

	//Watch Select Segment is Active or Not
	$('#select-segments').on('click',
		() => {
			//Properties
			const $select = $('#select-segments');
			const $itemContainer = $('#segment-select-item-container');

			if (!$select.hasClass('select-active')) {
				$select.addClass('select-active');
				$itemContainer.css('display', 'block');
			}
			else {
				$select.removeClass('select-active');
				$itemContainer.css('display', 'none');
			}
		});

	//Watch Select Terminal is Active or Not
	$('#select-terminals').on('click',
		() => {
			//Properties
			const $select = $('#select-terminals');
			const $itemContainer = $('#terminal-select-item-container');

			if (!$select.hasClass('select-active')) {
				$select.addClass('select-active');
				$itemContainer.css('display', 'block');
			}
			else {
				$select.removeClass('select-active');
				$itemContainer.css('display', 'none');
			}
		});

	//Watch Select Macro is Active or Not
	$('#select-macros').on('click',
		() => {
			//Properties
			const $select = $('#select-macros');
			const $itemContainer = $('#macro-select-item-container');

			if (!$select.hasClass('select-active')) {
				$select.addClass('select-active');
				$itemContainer.css('display', 'block');
			}
			else {
				$select.removeClass('select-active');
				$itemContainer.css('display', 'none');
			}
		});

	//Watch Select Properties is Active or Not
	$('#select-properties').on('click',
		() => {
			//Properties
			const $select = $('#select-properties');
			const $itemContainer = $('#multi-select-property-container');

			if (!$select.hasClass('select-active')) {
				$select.addClass('select-active');
				$itemContainer.css('display', 'block');
			}
			else {
				$select.removeClass('select-active');
				$itemContainer.css('display', 'none');
			}
		});

	//Change Select Raport Type Function
	$('#select-type-options').on('change',
		() => {
			ResetLists();

			SelectTypeDetailChange();

		});

	//Reset Model Elements (input, select and etc..)
	$('.bd-example-modal-lg').on('hide.bs.modal',
		function (e) {
			//Restart Modal
			ResetModal();
		});

	//Search Box Keyup Function
	$(searchboxID).keyup(function (event) {

		if (event.keyCode !== 13 && event.keyCode !== 37 && event.keyCode !== 39) {
			let type = $('#DataType').val();
			let container = $('#search-customer-user');
			let text = "";

			if ($.trim($(searchboxID).val()).length > 0) {
				$.ajax({
					type: "POST",
					data: { key: $(searchboxID).val(), type: type },
					url: "/Reports/CustomerAndUser",
					dataType: "Json",
					success: function (result) {
						text = "";
						container.html('');

						//Converting result data to checkbox style
						for (let i = 0; i < result.length; i++) {
							text += '<label class="select-item">';
							text += '';
							text += '<input type="checkbox" class="customer-user check-box" customerid="' + result[i].Id + '" customername="' + result[i].Name + '" value="" />';
							text += '';
							text += '' + result[i].Name + '';
							text += '</label>';
						}

						$(container).append(text);
						if (result.length >= 1) {
							$('#SearchInput').addClass('select-active');
							$(container).css('display', 'block');
						}
					}

				});
			}
			else {
				ResetSearchInput();
			}

		}
	});

	//Single Select Type List Change Function
	$('#select-property').on('change',
		(i, v) => {
			const singleProperty = $('#select-property').val();
			elementAction(propertyTypeHeader, 'open');

			//String Select
			if (singleProperty === "Name" || singleProperty === "Surname" || singleProperty === "FullName") {
				elementAction(numberTypeSelect, 'close');
				elementAction(stringTypeSelect, 'open');

				//Reset List
				stringTypeSelect.val(stringTypeSelect.children().eq(0).val());
			}
			//Number Select
			else {
				elementAction(stringTypeSelect, 'close');
				elementAction(numberTypeSelect, 'open');

				//Reset List
				numberTypeSelect.val(numberTypeSelect.children().eq(0).val());
			}
		});

	//Delete User or Customer from Field
	$('.customer-user-list').on('click', '.delete-li', (e) => {
		let element = e.target;
		let elementP = $(element).parent();

		elementP.remove();
	});

	//Text Font Weight Select List Options Font-Weight Css
	$('#text-font-weights').on('change',
		() => {
			//Text Font Weight
			const selectFontWeight = $('#text-font-weights');

			//Value of Texf Font Weight
			const textFontWeight = $('#text-font-weights').val();

			//Change Select List Font-Weight Css
			if (textFontWeight === "100")
				selectFontWeight.css('font-weight', '100');
			else if (textFontWeight === "200")
				selectFontWeight.css('font-weight', '200');
			else if (textFontWeight === "300")
				selectFontWeight.css('font-weight', '300');
			else if (textFontWeight === "400")
				selectFontWeight.css('font-weight', '400');
			else if (textFontWeight === "500")
				selectFontWeight.css('font-weight', '500');
			else if (textFontWeight === "600")
				selectFontWeight.css('font-weight', '600');
			else if (textFontWeight === "700")
				selectFontWeight.css('font-weight', '700');
			else if (textFontWeight === "800")
				selectFontWeight.css('font-weight', '800');
			else if (textFontWeight === "900")
				selectFontWeight.css('font-weight', '900');
			else if (textFontWeight === "Bold")
				selectFontWeight.css('font-weight', 'bold');
			else if (textFontWeight === "Bolder")
				selectFontWeight.css('font-weight', 'bolder');

		});
});

//Next Step Functionse
function NextStep(step) {
	let elementType = '';
	if (currentElement !== undefined && currentElement.length > 0)
		elementType = currentElement.attr('type');
	quickStep = 0;

	//Step 1 Controls
	if (step === "step-1") {

		//Validate Datas
		const validate = ValidateSettings('step-1');

		if (!validate)
			return;

		//Active Report Type
		elementAction(reportType, 'open');

		//Then active Step 2
		elementAction(step2Li, 'enable');
		$('ul.setup-panel li a[href="#step-2"]').trigger('click');

	}
	//Step 2 Controls
	else if (step === 'step-2') {

		const validate = ValidateSettings('step-2');

		if (!validate)
			return;

		if (elementType !== "List") {
			//Then active Step 3s
			elementAction(step3Li, 'enable');
			$('ul.setup-panel li a[href="#step-3"]').trigger('click');
		}
		else {
			elementAction(step4Li, 'enable');
			$('ul.setup-panel li a[href="#step-4"]').trigger('click');
		}


	}
	//Step 3 Controls
	else if (step === "step-3") {

		const validate = ValidateSettings('step-3');

		if (!validate)
			return;

		//Detect Element Type and Show Required Area
		if (currentElement.attr('type') === "Field" || currentElement.attr('type') === "Chart") {
			$('#step-4-single-property').css('display', 'block');
			const currentElementId = currentElement.attr('id');

			let controlCount = 0;

			//Check It's Edit or Not
			$('#' + currentElementId + ' > detail').each((i, v) => {
				controlCount++;
			});

			elementAction(propertyTypeHeader, 'open');

			if (controlCount === 0)
				$('#select-property-type-number').css('display', 'inline-block');
		} else {
			$('#step-4-multi-properties').css('display', 'block');
		}

		//Then active Step 4
		$('ul.setup-panel li:eq(3)').removeClass('disabled');
		$('ul.setup-panel li a[href="#step-4"]').trigger('click');
	}
	//Quick Wizard Controls
	else if (step === 'quick-wizard-next') {
		let step1Active = false,
			step2Active = false,
			step3Active = false;

		if ($('#quick-step-1').css('display') === 'inline-table')
			step1Active = true;
		else if ($('#quick-step-2').css('display') === 'inline-table')
			step2Active = true;
		else if ($('#quick-step-3').css('display') === 'inline-table')
			step3Active = true;

		//Next step actions
		const quickStepTwo = () => {
			//Active second step
			$('#quick-step-1').css('display', 'none');
			$('#quick-step-2').css('display', 'inline-table');
			$('#step-item-2').addClass('step-item-active');

		};

		const quickStepThree = () => {
			//Active third step
			$('#quick-step-2').css('display', 'none');
			$('#quick-step-3').css('display', 'inline-table');
			$('#step-item-3').addClass('step-item-active');

			$('#next-button').html('');
			$('#next-button').append('Save <i class="fa fa-check-circle"></i>');
		};

		const quickStepSave = () => {
			if ($('.also-items').length <= 0) {
				swal({
					icon: 'error',
					title: 'Please ensure to select a property',
					text: 'Before you save a new report template you should select at least one property in step 3.'
				});
			}
			else {
				//Run save method and submit the form.
				let boolean = saveQuickReport();

				if (boolean) {
					$('#quick-form').submit();
				}
			}
		};

		//Detect active steps and validate before action
		if (step1Active) {
			//Validate first step
			if (!ValidateSettings('quick-step-1')) {
				return $('[validate-for="quick-step-1"]').html('At least one or more branch must be selected. Please ensure to select branches before trying to go for next step.');
			}
			else {
				$('[validate-for="quick-step-1"]').html('');
			}

			//Active second step
			quickStepTwo();
		}
		else if (step2Active) {
			let selectedServiceCount = $('.quick-service-boxes:checked').length;
			if (selectedServiceCount === 0) {
				$('.quick-service-boxes').prop('checked', true);
				$('#all-quick-service-boxes').prop('checked', true);
			}

			quickStepThree();
		}
		else if (step3Active) {
			quickStepSave();


		}

	}
}

//Previous Step Functions
function PreviousStep(step) {
	if (step === "step-1") {
		//Restart Modal
		ResetModal();

		//Close Modal
		$('.bd-example-modal-lg').modal('hide');
	}
	else if (step === 'step-2') {
		//Go Back to Step 1
		$('ul.setup-panel li a[href="#step-1"]').trigger('click');
	}
	else if (step === 'step-3') {
		//Go Back to Step 2
		$('ul.setup-panel li a[href="#step-2"]').trigger('click');
	}
	else if (step === 'step-4') {
		//If element type list or chart go back to step 2
		if (currentElement.attr('type') === "List" || currentElement.attr('type') === "Chart") {
			$('ul.setup-panel li a[href="#step-2"]').trigger('click');
		}
		//If element type feild go back to step 3
		else {
			$('ul.setup-panel li a[href="#step-3"]').trigger('click');

		}
	}
	else if (step === 'quick-wizard-previous') {
		let step1Active = false,
			step2Active = false,
			step3Active = false;

		//Detect active step
		if ($('#quick-step-1').css('display') === 'inline-table')
			step1Active = true;
		else if ($('#quick-step-2').css('display') === 'inline-table')
			step2Active = true;
		else if ($('#quick-step-3').css('display') === 'inline-table')
			step3Active = true;

		if (step1Active) {
			//Return warning to user
			swal({
				icon: 'warning',
				title: 'Are you sure?',
				text: 'Do you really want to go back to custom report selection page. You didn\'t save last changes on wizard.',
				buttons: true

			}).then((answer) => {
				//If user click on okey button redirect to custom report list page
				if (answer)
					window.location.href = "/Reports/CustomReports";
			});
		}
		else if (step2Active) {
			$('#quick-step-2').css('display', 'none');
			$('#quick-step-1').css('display', 'inline-table');
		}
		else if (step3Active) {
			$('#quick-step-3').css('display', 'none');
			$('#quick-step-2').css('display', 'inline-table');

			$('#next-button').text('');
			$('#next-button').append('Next Step <i class="fa fa-arrow-circle-o-right"></i>');

		}
	}
}

//Validations
function ValidateSettings(type = 'all') {
	//Declare Variable
	let bool = true;

	//Validate advanced wizard step 1
	let step1 = () => {
		$('#step-1-select-error').html('');

		let checked = 0;


		//Control checkboxes if any check 
		$('.branch-boxes').each((i, v) => {
			if ($(v).prop('checked')) {
				checked++;
			}
		});

		//If none of checkboxes checked this statment will work
		if (checked === 0) {
			ResetModal();

			//Type of Report List
			$('#select-type-options').val($('#select-type-options > option').eq(0).val());

			$('#step-1-select-error').html('Please ensure to select atleast one branch');
			bool = false;

		}
	};

	//Validate advanced wizard step 2
	let step2 = () => {
		//Check if there any report type available
		const data = $('#select-type-options').val();

		if (data === "" || data === null) {
			$('#step-2-select-error').text('Please ensure to select one report type');

			bool = false;

			return bool;
		}

		if (currentElement.attr('type') === "List") {
			//Then active Step 4
			$('ul.setup-panel li:eq(3)').removeClass('disabled');
			$('ul.setup-panel li a[href="#step-4"]').trigger('click');

			//Detect Element Type and Show Required Area
			if (currentElement.attr('type') === "Field" || currentElement.attr('type') === "Chart")
				$('#step-4-single-property').css('display', 'block');
			else
				$('#step-4-multi-properties').css('display', 'block');

			return;
		}

		if ($('ul.setup-panel li:eq(2)').hasClass('disabled')) {
			//Then Show Detail by Selected Type
			SelectTypeDetailChange();
		}
	};

	//Validate advanced wizard step 3
	let step3 = () => {
		$('#step-3-select-error').html('');

		if (currentElement.attr('Type') !== "List") {
			const typeOption = $('#select-type-options').val();
			let checkedCount = 0;

			//Validations
			if (typeOption === "Appointment") {
				checkedCount = $('.appointment-boxes:checked').length;

				//Validate
				if (checkedCount === 0)
					$('#step-3-select-error').html('Please ensure to select atleast one appointment');
			}
			else if (typeOption === "Branch") {
				checkedCount = $('.branch1-boxes:checked').length;

				//Validate
				if (checkedCount === 0)
					$('#step-3-select-error').html('Please ensure to select atleast one branch');
			}
			else if (typeOption === "Customer") {
				$('.customer-user-item').each((i, v) => {
					if ($(v).attr('customerid') !== 0 && $(v).attr('customername') !== 0) {
						checkedCount++;
					}
				});

				//Validate
				if (checkedCount === 0)
					$('#step-3-select-error').html('Please ensure to select atleast one Customer');
			}
			else if (typeOption === "Service") {
				checkedCount = $('.service-boxes:checked').length;

				//Validate
				if (checkedCount === 0)
					$('#step-3-select-error').html('Please ensure to select atleast one service');
			}
			else if (typeOption === "Segment") {
				checkedCount = $('.segment-boxes:checked').length;

				//Validate
				if (checkedCount === 0)
					$('#step-3-select-error').html('Please ensure to select atleast one segment');
			}
			else if (typeOption === "Terminal") {
				checkedCount = $('.terminal-boxes:checked').length;

				//Validate
				if (checkedCount === 0)
					$('#step-3-select-error').html('Please ensure to select atleast one terminal');
			}
			else if (typeOption === "User") {
				$('.customer-user-item').each((i, v) => {
					if ($(v).attr('customerid') !== 0 && $(v).attr('customername') !== 0) {
						checkedCount++;
					}
				});

				//Validate
				if (checkedCount === 0)
					$('#step-3-select-error').html('Please ensure to select atleast one User');
			} else {
				checkedCount = $('.macro-boxes:checked').length;

				//Validate
				if (checkedCount === 0)
					$('#step-3-select-error').html('Please ensure to select atleast one macro');
			}

			if (checkedCount === 0)
				bool = false;

			//If Validation Fail
			if (!bool) {
				//Disable Step 4
				$('ul.setup-panel li:eq(3)').removeClass('active');
				$('ul.setup-panel li:eq(3)').addClass('disabled');

				//Reset Multi Select Property Boxes
				$('.property-boxes').prop('checked', false);
				//Reset Single Select
				$('#select-property').val($('#select-property > option').eq(0).val());


				return bool;
			}
		}
		else {
			return true;
		}
	};

	//Validate advanced wizard text element
	let stepText = () => {
		const text = $('#static-text').val();
		let controlLatters = /^[a-zA-Z0-9]/;

		if (text === "" || text === " " || !controlLatters.test(text))
			bool = false;

		if (!bool)
			$('#step-text-select-error').html('Please ensure to type a text');
	};

	//Validate quick wizard first step branches
	let quickWizardStep1 = () => {
		let selectedCheckboxes = $('.quick-branch-boxes:checked').length;

		if (selectedCheckboxes === 0)
			return bool = false;
	};

	if (type === 'all') {
		step1();
		step2();
		step3();
	}
	else if (type === 'step-1') {
		step1();
	}
	else if (type === 'step-2') {
		step2();
	}
	else if (type === 'step-3') {
		step3();
	}
	else if (type === 'step-text') {
		stepText();
	}
	else if (type === 'quick-step-1') {
		quickWizardStep1();
	}

	return bool;
}

//Select Type of Report Change
function SelectTypeDetailChange() {
	const reportType = $('#select-type-options').val();
	const step3Arry = [
		appointmentContainer,
		appointmenSelect,
		appointmentItems,
		step3BranchContainer,
		step3BranchSelect,
		step3BranchItems,
		serviceContainer,
		serviceSelect,
		serviceItems,
		segmentContainer,
		segmentSelect,
		segmentItems,
		terminalContainer,
		terminalSelect,
		terminalItems,
		macroContainer,
		macroSelect,
		macroItems,
		customerContainer,
		customerSearch,
		customerList
	];
	const step4Arry = [
		totalTicket,
		totalVisit,
		name,
		surname,
		fullName,
		calledTicket,
		noShowTicket,
		performancePerc,
		minWaitingTime,
		maxWaitingTime,
		avrgWaitingTime,
		minOperationTime,
		maxOperationTime,
		avrgOperationTime,
		minProcessTime,
		maxProcessTime,
		avrgProcessTime,
		singleTotalTicket,
		singleTotalVisit,
		singleName,
		singleSurname,
		singleFullName,
		singleCalledTicket,
		singleNoShowTicket,
		singlePerformancePerc,
		singleMinWaitingTime,
		singleMaxWaitingTime,
		singleAvrgWaitingTime,
		singleMinOperationTime,
		singleMaxOperationTime,
		singleAvrgOperationTime,
		singleMinProcessTime,
		singleMaxProcessTime,
		singleAvrgProcessTime
	];

	elementAction(step3Arry, 'close');
	elementAction(step4Arry, 'close');

	if (currentElement.attr('type') === 'Field') {
		//Activate/Disable 3rd Step Options
		if (reportType === "Appointment") {
			//Active Appointment List
			elementAction(appointmentContainer, appointmenSelect, appointmentItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

		}
		else if (reportType === "Branch") {
			//Active Branch List
			elementAction(step3BranchContainer, step3BranchSelect, step3BranchItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

		}
		else if (reportType === "Customer") {
			//Active Branch List
			elementAction(customerContainer, customerSearch, customerSearch, singleName, singleSurname, singleFullName, singleTotalVisit, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

			customerContainer.attr('display', 'block');


			//Clearing if there any data in Customer List
			$('.customer-user-list').html('');

			//Change shared input placeholder in accordance with the customer
			$('#SearchInput').attr('placeholder', 'Type Customer Name');

			//Change search data type as customer
			$('#DataType').val('customer');
		}
		else if (reportType === "Service") {
			//Active Service List
			elementAction(serviceContainer, serviceSelect, serviceItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

		}
		else if (reportType === "Segment") {
			//Active Segment List
			elementAction(segmentContainer, segmentSelect, segmentItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

		}
		else if (reportType === "Terminal") {
			//Active Terminal List
			elementAction(terminalContainer, terminalSelect, terminalItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

		}
		else if (reportType === "User") {
			//Active Branch List
			elementAction(customerContainer, customerSearch, customerSearch, singleFullName, singleTotalTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');
			customerContainer.attr('display', 'block');

			//Clearing if there any data in Customer List
			$('.customer-user-list').html('');

			//Change shared input placeholder in accordance with the user
			$('#SearchInput').attr('placeholder', 'Type User Name');

			//Change search data type as customer
			$('#DataType').val('user');

		}
		else if (reportType === "Macro") {
			//Active Macro List
			elementAction(macroContainer, macroSelect, macroItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');
		}

		singleSelectProperty.css('display', 'inline-block');
	}
	else if (currentElement.attr('type') === 'List') {
		//Activate/Disable 4th Step Options
		if (reportType === "Appointment") {
			//Active Appointment List
			elementAction(fullName, totalTicket, calledTicket, noShowTicket, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');

		}
		else if (reportType === "Branch") {
			//Active Branch List
			elementAction(fullName, totalTicket, calledTicket, noShowTicket, performancePerc, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');

		}
		else if (reportType === "Customer") {
			//Active Branch List
			elementAction(name, surname, fullName, totalVisit, noShowTicket, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');

			customerContainer.attr('display', 'block');


			//Clearing if there any data in Customer List
			$('.customer-user-list').html('');

			//Change shared input placeholder in accordance with the customer
			$('#SearchInput').attr('placeholder', 'Type Customer Name');

			//Change search data type as customer
			$('#DataType').val('customer');
		}
		else if (reportType === "Service") {
			//Active Service List
			elementAction(fullName, totalTicket, calledTicket, noShowTicket, performancePerc, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');

		}
		else if (reportType === "Segment") {
			//Active Segment List
			elementAction(fullName, totalTicket, calledTicket, noShowTicket, performancePerc, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');

		}
		else if (reportType === "Terminal") {
			//Active Terminal List
			elementAction(fullName, totalTicket, calledTicket, noShowTicket, performancePerc, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');

		}
		else if (reportType === "User") {
			//Active Branch List
			elementAction(fullName, totalTicket, calledTicket, noShowTicket, performancePerc, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');
			customerContainer.attr('display', 'block');

			//Clearing if there any data in Customer List
			$('.customer-user-list').html('');

			//Change shared input placeholder in accordance with the user
			$('#SearchInput').attr('placeholder', 'Type User Name');

			//Change search data type as customer
			$('#DataType').val('user');

		}
		else if (reportType === "Macro") {
			//Active Macro List
			elementAction(fullName, totalTicket, calledTicket, noShowTicket, performancePerc, minWaitingTime, maxWaitingTime, avrgWaitingTime, minOperationTime, maxOperationTime, avrgOperationTime, minProcessTime, maxProcessTime, avrgProcessTime, 'open');
		}
	}
	else if (currentElement.attr('type') === 'Chart') {
		//Activate/Disable 3rd Step Options
		if (reportType === "Appointment") {
			//Active Appointment List
			elementAction(appointmentContainer, appointmenSelect, appointmentItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

		}
		else if (reportType === "Branch") {
			//Active Branch List
			elementAction(step3BranchContainer, step3BranchSelect, step3BranchItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

		}
		else if (reportType === "Customer") {
			//Active Branch List
			elementAction(customerContainer, customerSearch, customerSearch, singleName, singleSurname, singleFullName, singleTotalVisit, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

			customerContainer.attr('display', 'block');


			//Clearing if there any data in Customer List
			$('.customer-user-list').html('');

			//Change shared input placeholder in accordance with the customer
			$('#SearchInput').attr('placeholder', 'Type Customer Name');

			//Change search data type as customer
			$('#DataType').val('customer');
		}
		else if (reportType === "Service") {
			//Active Service List
			elementAction(serviceContainer, serviceSelect, serviceItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

		}
		else if (reportType === "Segment") {
			//Active Segment List
			elementAction(segmentContainer, segmentSelect, segmentItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

		}
		else if (reportType === "Terminal") {
			//Active Terminal List
			elementAction(terminalContainer, terminalSelect, terminalItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');

		}
		else if (reportType === "User") {
			//Active Branch List
			elementAction(customerContainer, customerSearch, customerSearch, singleFullName, singleTotalTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');
			customerContainer.attr('display', 'block');

			//Clearing if there any data in Customer List
			$('.customer-user-list').html('');

			//Change shared input placeholder in accordance with the user
			$('#SearchInput').attr('placeholder', 'Type User Name');

			//Change search data type as customer
			$('#DataType').val('user');

		}
		else if (reportType === "Macro") {
			//Active Macro List
			elementAction(macroContainer, macroSelect, macroItems, singleFullName, singleTotalTicket, singleCalledTicket, singleNoShowTicket, singlePerformancePerc, singleMinWaitingTime, singleMaxWaitingTime, singleAvrgWaitingTime, singleMinOperationTime, singleMaxOperationTime, singleAvrgOperationTime, singleMinProcessTime, singleMaxProcessTime, singleAvrgProcessTime, 'open');
		}

		singleSelectProperty.css('display', 'inline-block');
	}

	if (reportType !== 'Customer' && $('#performance-percentage-single').attr('disabled') ||
		reportType !== 'Customer' && $('#performance-percentage-multi').attr('disabled')) {
		$('#performance-percentage-single').removeAttr('disabled');
		$('#performance-percentage-multi').removeAttr('disabled');
	}

	//Callback ResetLists Function
	ResetLists();

	//Callback ResetErrorLabes Function
	ResetErrorLabes();

	//Reset 4th step
	elementAction(step3Li, step4Li, 'disable');

	//While Changing Property Type If Report Type List Disable Single Property Selection
	if (currentElement.attr('type') !== "List")
		$('#select-property-type-number').css('display', 'inline-block');
	$('#select-property-type-string').css('display', 'none');
}

//Apply Settings to Element
function ApplySettings() {
	let text = "";
	let propertyType = "";
	const currentId = currentElement.attr('id');

	//Validate StepText
	if (currentElement.attr('type') === "Text") {
		const validateStepText = ValidateSettings('step-text');
		//On fails
		if (!validateStepText)
			return;

		//Text Attribute Variable
		const text = $('#static-text').val();
		const fontSize = $('#text-font-size').val();
		const fontWeight = $('#text-font-weights').val();
		const fontStyle = $('#text-font-style').val();

		//Append Variables to Element
		currentElement.attr('text', text);
		currentElement.attr('fontsize', fontSize);
		currentElement.attr('fontweight', fontWeight);

		if (fontStyle === "Italic") {
			currentElement.css('font-style', 'italic');
			currentElement.attr('fontstyle', 'Italic');
		}
		else if (fontStyle === "Underline") {
			currentElement.css('text-decoration', 'underline');
			currentElement.attr('fontstyle', 'Underlien');
		}
		else if (fontStyle === "ItalicAndUnderline") {
			currentElement.css('font-style', 'italic');
			currentElement.css('text-decoration', 'underline');
			currentElement.attr('fontstyle', 'ItalicAndUnderline');
		}

		$('.bd-example-modal-lg').modal('hide');
		return;

	}

	//Validate Step-1
	const validateStep1 = ValidateSettings('step-1');
	//On fail
	if (!validateStep1) {
		return $('ul.setup-panel li a[href="#step-1"]').trigger('click');
	}

	//Validate Step2
	const validateStep2 = ValidateSettings('step-2');
	//On failS
	if (!validateStep2) {
		//Disable Step 3
		$('#step-3-li').removeClass('active');
		$('#step-3-li').addClass('disabled');

		//Disable Step 4
		$('#step-4-li').removeClass('active');
		$('#step-4-li').addClass('disabled');

		return $('ul.setup-panel li a[href="#step-2"]').trigger('click');
	}

	//Validate Step3
	const validateStep3 = ValidateSettings('step-3');
	//On fail
	if (!validateStep3) {
		//Disable Step 4
		$('#step-4-li').removeClass('active');
		$('#step-4-li').addClass('disabled');

		return $('ul.setup-panel li a[href="#step-3"]').trigger('click');
	}

	//Getting Property Type
	if (numberTypeSelect.css('display') === 'inline-block') {
		propertyType = numberTypeSelect.val();
	}
	else if (stringTypeSelect.css('display') === 'inline-block') {
		propertyType = stringTypeSelect.val();
	}

	if ($('input.property-boxes:checked').length <= 0 && currentElement.attr('Type') === 'List') {
		//Active validate
		elementAction(propertyValidation, 'open', 'validate');

		return propertyValidation.text('Please ensure to select atleast one property');
	}
	else {
		elementAction(propertyValidation, 'clear');
	}

	//Will Delete Current Branch and Current Details
	$('#' + currentId + ' > detail').remove();
	$('#' + currentId + ' > branch').remove();

	//First Apply Branches To Element
	$('input.branch-boxes').each((i, v) => {
		if ($(v).prop('checked')) {

			const branchid = $(v).attr('branchid');
			const branchname = $(v).attr('branchname');

			text = "<branch branchid='" + branchid + "' branchname='" + branchname + "'></branches>";

			currentElement.append(text);
		}
	});

	//Apply Report Type To Element
	const reportType = $('#select-type-options').val();
	currentElement.attr('reporttype', reportType);

	if (currentElement.attr('type') === "Field") {
		//Apply Details To Element
		if (reportType === "Appointment") {
			$('input.appointment-boxes').each((i, v) => {
				const elementid = $(v).attr('appointmentid');
				const elementname = $(v).attr('appointmentname');

				if ($(v).prop('checked')) {
					text = "<detail appointmentid='" + elementid + "' appointmentname='" + elementname + "'></detail>";

					currentElement.append(text);
				}
			});

		}
		//Branch Details To Element
		else if (reportType === "Branch") {
			$('input.branch1-boxes').each((i, v) => {
				const elementid = $(v).attr('branchid');
				const elementname = $(v).attr('branchname');

				if ($(v).prop('checked')) {
					text = "<detail branchid='" + elementid + "' branchname='" + elementname + "'></detail>";

					currentElement.append(text);
				}
			});

		}
		//Customer & Details To Element
		else if (reportType === "Customer" || reportType === "User") {
			$('li.customer-user-item').each((i, v) => {
				const elementid = $(v).attr('customerid');
				const elementname = $(v).attr('customername');

				text = "<detail customerid='" + elementid + "' customername='" + elementname + "'></detail>";

				currentElement.append(text);

			});

		}
		//Service Details To Element
		else if (reportType === "Service") {
			$('input.service-boxes').each((i, v) => {
				const elementid = $(v).attr('serviceid');
				const elementname = $(v).attr('servicename');

				if ($(v).prop('checked')) {
					text = "<detail serviceid='" + elementid + "' servicename='" + elementname + "'></detail>";

					currentElement.append(text);
				}
			});

		}
		//Segment Details To Element
		else if (reportType === "Segment") {
			$('input.segment-boxes').each((i, v) => {
				const elementid = $(v).attr('segmentid');
				const elementname = $(v).attr('segmentname');

				if ($(v).prop('checked')) {
					text = "<detail segmentid='" + elementid + "' segmentname='" + elementname + "'></detail>";

					currentElement.append(text);
				}
			});

		}
		//Terminal Details To Element
		else if (reportType === "Terminal") {
			$('input.terminal-boxes').each((i, v) => {
				const elementid = $(v).attr('terminalid');
				const elementname = $(v).attr('terminalname');

				if ($(v).prop('checked')) {
					text = "<detail terminalid='" + elementid + "' terminalname='" + elementname + "'></detail>";

					currentElement.append(text);
				}
			});

		}
		//Macro Details To Element
		else if (reportType === "Macro") {
			$('input.macro-boxes').each((i, v) => {
				const elementid = $(v).attr('macroid');
				const elementname = $(v).attr('macroname');

				if ($(v).prop('checked')) {
					text = "<detail macroid='" + elementid + "' macroname='" + elementname + "'></detail>";

					currentElement.append(text);
				}
			});

		}

		//Append Property & Property Type To Element
		const elementProperty = $('#select-property').val();
		text = "<detail property='" + elementProperty + "' propertytype='" + propertyType + "'></detail>";

		currentElement.append(text);
		text = '';
	}
	else if (currentElement.attr('type') === "List") {
		//Create Item Count Variable
		let itemCount = 0;

		//Look Each Property Checkbox
		$('input.property-boxes').each((i, v) => {
			const elementProperty = $(v).attr('property');

			//If Checkbox Checked, Add Detail with Property Attribute
			if ($(v).prop('checked')) {
				text = "<detail property='" + elementProperty + "'></detail>";

				currentElement.append(text);

				//Then Plus One Total Cheked Item Count
				itemCount++;
			}
		});

		//If There is None Checked Checkboxes, Error Will Append to Error Label
		if (itemCount === 0) {
			return $('#step-4-select-error').text('Please ensure to select atleast one property');
		}
		else {
			$('#step-4-select-error').text('');
		}
	}
	else if (currentElement.attr('type') === "Chart") {

		//Chart Type Variable
		const chartType = $('#chart-type-options').val();
		//Append Chart Type to Element
		currentElement.attr('charttype', chartType);

		//Apply Details To Element
		if (reportType === "Appointment") {
			$('input.appointment-boxes').each((i, v) => {
				const elementid = $(v).attr('appointmentid');
				const elementname = $(v).attr('appointmentname');

				if ($(v).prop('checked')) {
					text = "<detail appointmentid='" + elementid + "' appointmentname='" + elementname + "'></detail>";

					currentElement.append(text);
				}
			});

		}
		//Branch Details To Element
		else if (reportType === "Branch") {
			$('input.branch1-boxes').each((i, v) => {
				const elementid = $(v).attr('branchid');
				const elementname = $(v).attr('branchname');

				if ($(v).prop('checked')) {
					text = "<detail branchid='" + elementid + "' branchname='" + elementname + "'></detail>";

					currentElement.append(text);
				}
			});

		}
		//Customer & Details To Element
		else if (reportType === "Customer" || reportType === "User") {
			$('li.customer-user-item').each((i, v) => {
				const elementid = $(v).attr('customerid');
				const elementname = $(v).attr('customername');

				text = "<detail customerid='" + elementid + "' customername='" + elementname + "'></detail>";

				currentElement.append(text);

			});

		}
		//Service Details To Element
		else if (reportType === "Service") {
			$('input.service-boxes').each((i, v) => {
				const elementid = $(v).attr('serviceid');
				const elementname = $(v).attr('servicename');

				if ($(v).prop('checked')) {
					text = "<detail serviceid='" + elementid + "' servicename='" + elementname + "'></detail>";

					currentElement.append(text);
				}
			});

		}
		//Segment Details To Element
		else if (reportType === "Segment") {
			$('input.segment-boxes').each((i, v) => {
				const elementid = $(v).attr('segmentid');
				const elementname = $(v).attr('segmentname');

				if ($(v).prop('checked')) {
					text = "<detail segmentid='" + elementid + "' segmentname='" + elementname + "'></detail>";

					currentElement.append(text);
				}
			});

		}
		//Terminal Details To Element
		else if (reportType === "Terminal") {
			$('input.terminal-boxes').each((i, v) => {
				const elementid = $(v).attr('terminalid');
				const elementname = $(v).attr('terminalname');

				if ($(v).prop('checked')) {
					text = "<detail terminalid='" + elementid + "' terminalname='" + elementname + "'></detail>";

					currentElement.append(text);
				}
			});

		}
		//Macro Details To Element
		else if (reportType === "Macro") {
			$('input.macro-boxes').each((i, v) => {
				const elementid = $(v).attr('macroid');
				const elementname = $(v).attr('macroname');

				if ($(v).prop('checked')) {
					text = "<detail macroid='" + elementid + "' macroname='" + elementname + "'></detail>";

					currentElement.append(text);
				}
			});

		}

		//Append Property & Property Type To Element
		const elementProperty = $('#select-property').val();
		text = "<detail property='" + elementProperty + "' propertytype='" + propertyType + "'></detail>";

		currentElement.append(text);
		text = '';
	}
	else {
		return;
	}

	$('.bd-example-modal-lg').modal('hide');
}

//Save Function
function Save() {
	let xamlText = "";
	xamlText += '<Report type="Advanced">\n';
	let validate = false;

	$('.draggable').each((i, v) => {
		const elementId = $(v).attr('id');

		//Control The Element Has Been Edited or Not
		if ($(v).attr('type') !== "Text") {
			if ($('#' + elementId + ' > branch').length === 0) {
				swal({
					icon: 'warning',
					title: 'One or More Elements Is Empty!',
					text: 'Please ensure your all elements has been edited'
				});

				validate = true;
				return;
			}
		}
		else {
			let correctLatter = /^[a-zA-Z0-9]/;
			let text = "";
			$(v).attr('text') ? text = $(v).attr('text') : text = "";

			if (!correctLatter.test(text)) {
				swal({
					icon: 'warning',
					title: 'One or More Elements Is Empty!',
					text: 'Please ensure your all elements has been edited'
				});

				validate = true;
				return;
			}
		}
	});

	//Validate Fail
	if (validate)
		return;

	//Check Each Element for Convert to XAML 
	$('.draggable').each((i, v) => {
		currentElement = $(v);

		//Element Variables
		const element = $(v);
		const elementType = $(v).attr('type');
		const elementId = $(v).attr('id');
		const elementReportType = $(v).attr('reporttype');

		//TODO: Calculation will change later
		//Element Width, Height and Top,Left Percentage Convert
		const width = elementWidth();
		const height = elementHeight();

		const left = elementLeft();
		const top = elementTop();

		//Opening Tag For Element
		xamlText += '\n<Element Type="' + elementType + '" Identify="' + elementId + '" Left="' + left + '" Top="' + top + '" Width="' + width + '" Height="' + height + '">\n';

		if (elementType === "Field") {

			//Branches
			xamlText += '<Branches>\n';
			$('#' + elementId + ' > branch').each((i, v) => {
				xamlText += '<Branch>' + $(v).attr('branchid') + '</Branch>\n';
			});
			xamlText += '</Branches>\n';

			//Report Type
			xamlText += '<ReportType>' + elementReportType + '</ReportType>\n';

			//Details
			xamlText += '<Details>\n';
			if (elementReportType === "Appointment") {
				$('#' + elementId + ' > detail[appointmentid]').each((i, v) => {
					xamlText += '<Detail>\n';
					xamlText += '<Id>' + $(v).attr('appointmentid') + '</Id>\n';
					xamlText += '<Name>' + $(v).attr('appointmentname') + '</Name>\n';
					xamlText += '</Detail>\n';
				});
			}
			else if (elementReportType === "Branch") {
				$('#' + elementId + ' > detail[branchid]').each((i, v) => {
					xamlText += '<Detail>\n';
					xamlText += '<Id>' + $(v).attr('branchid') + '</Id>\n';
					xamlText += '<Name>' + $(v).attr('branchname') + '</Name>\n';
					xamlText += '</Detail>\n';
				});
			}
			else if (elementReportType === "Customer" || elementReportType === "User") {
				$('#' + elementId + ' > detail[customerid]').each((i, v) => {
					xamlText += '<Detail>\n';
					xamlText += '<Id>' + $(v).attr('customerid') + '</Id>\n';
					xamlText += '<Name>' + $(v).attr('customername') + '</Name>\n';
					xamlText += '</Detail>\n';
				});
			}
			else if (elementReportType === "Service") {
				$('#' + elementId + ' > detail[serviceid]').each((i, v) => {
					xamlText += '<Detail>\n';
					xamlText += '<Id>' + $(v).attr('serviceid') + '</Id>\n';
					xamlText += '<Name>' + $(v).attr('servicename') + '</Name>\n';
					xamlText += '</Detail>\n';
				});
			}
			else if (elementReportType === "Segment") {
				$('#' + elementId + ' > detail[segmentid]').each((i, v) => {
					xamlText += '<Detail>\n';
					xamlText += '<Id>' + $(v).attr('segmentid') + '</Id>\n';
					xamlText += '<Name>' + $(v).attr('segmentname') + '</Name>\n';
					xamlText += '</Detail>\n';
				});
			}
			else if (elementReportType === "Terminal") {
				$('#' + elementId + ' > detail[terminalid]').each((i, v) => {
					xamlText += '<Detail>\n';
					xamlText += '<Id>' + $(v).attr('terminalid') + '</Id>\n';
					xamlText += '<Name>' + $(v).attr('terminalname') + '</Name>\n';
					xamlText += '</Detail>\n';
				});
			}
			else if (elementReportType === "Macro") {
				$('#' + elementId + ' > detail[macroid]').each((i, v) => {
					xamlText += '<Detail>\n';
					xamlText += '<Id>' + $(v).attr('macroid') + '</Id>\n';
					xamlText += '<Name>' + $(v).attr('macroname') + '</Name>\n';
					xamlText += '</Detail>\n';
				});
			}

			xamlText += '</Details>\n';

			//Property
			xamlText += '<Properties>\n';
			$('#' + elementId + ' > detail[property]').each((i, v) => {
				xamlText += '<Property>' + $(v).attr('property') + '</Property>\n';
				xamlText += '<PropertyType>' + $(v).attr('propertytype') + '</PropertyType>\n';

			});
			xamlText += '</Properties>\n';
		}
		else if (elementType === "List") {
			//Branches
			xamlText += '<Branches>\n';
			$('#' + elementId + ' > branch').each((i, v) => {
				xamlText += '<Branch>' + $(v).attr('branchid') + '</Branch>\n';
			});
			xamlText += '</Branches>\n';

			//Report Type
			xamlText += '<ReportType>' + elementReportType + '</ReportType>\n';

			//Property
			xamlText += '<Properties>\n';
			$('#' + elementId + ' > detail').each((i, v) => {
				xamlText += '<Property>' + $(v).attr('property') + '</Property>\n';
			});
			xamlText += '</Properties>\n';

		}
		else if (elementType === "Chart") {
			const chartType = currentElement.attr('charttype');

			//Chart Type
			xamlText += '<ChartType>' + chartType + '</ChartType>';

			//Branches
			xamlText += '<Branches>\n';
			$('#' + elementId + ' > branch').each((i, v) => {
				xamlText += '<Branch>' + $(v).attr('branchid') + '</Branch>\n';
			});
			xamlText += '</Branches>\n';

			//Report Type
			xamlText += '<ReportType>' + elementReportType + '</ReportType>\n';

			//Details
			xamlText += '<Details>\n';
			if (elementReportType === "Appointment") {
				$('#' + elementId + ' > detail[appointmentid]').each((i, v) => {
					xamlText += '<Detail>\n';
					xamlText += '<Id>' + $(v).attr('appointmentid') + '</Id>\n';
					xamlText += '<Name>' + $(v).attr('appointmentname') + '</Name>\n';
					xamlText += '</Detail>\n';
				});
			}
			else if (elementReportType === "Branch") {
				$('#' + elementId + ' > detail[branchid]').each((i, v) => {
					xamlText += '<Detail>\n';
					xamlText += '<Id>' + $(v).attr('branchid') + '</Id>\n';
					xamlText += '<Name>' + $(v).attr('branchname') + '</Name>\n';
					xamlText += '</Detail>\n';
				});
			}
			else if (elementReportType === "Customer" || elementReportType === "User") {
				$('#' + elementId + ' > detail[customerid]').each((i, v) => {
					xamlText += '<Detail>\n';
					xamlText += '<Id>' + $(v).attr('customerid') + '</Id>\n';
					xamlText += '<Name>' + $(v).attr('customername') + '</Name>\n';
					xamlText += '</Detail>\n';
				});
			}
			else if (elementReportType === "Service") {
				$('#' + elementId + ' > detail[serviceid]').each((i, v) => {
					xamlText += '<Detail>\n';
					xamlText += '<Id>' + $(v).attr('serviceid') + '</Id>\n';
					xamlText += '<Name>' + $(v).attr('servicename') + '</Name>\n';
					xamlText += '</Detail>\n';
				});
			}
			else if (elementReportType === "Segment") {
				$('#' + elementId + ' > detail[segmentid]').each((i, v) => {
					xamlText += '<Detail>\n';
					xamlText += '<Id>' + $(v).attr('segmentid') + '</Id>\n';
					xamlText += '<Name>' + $(v).attr('segmentname') + '</Name>\n';
					xamlText += '</Detail>\n';
				});
			}
			else if (elementReportType === "Terminal") {
				$('#' + elementId + ' > detail[terminalid]').each((i, v) => {
					xamlText += '<Detail>\n';
					xamlText += '<Id>' + $(v).attr('terminalid') + '</Id>\n';
					xamlText += '<Name>' + $(v).attr('terminalname') + '</Name>\n';
					xamlText += '</Detail>\n';
				});
			}
			else if (elementReportType === "Macro") {
				$('#' + elementId + ' > detail[macroid]').each((i, v) => {
					xamlText += '<Detail>\n';
					xamlText += '<Id>' + $(v).attr('macroid') + '</Id>\n';
					xamlText += '<Name>' + $(v).attr('macroname') + '</Name>\n';
					xamlText += '</Detail>\n';
				});
			}

			xamlText += '</Details>\n';

			//Property
			xamlText += '<Properties>\n';
			$('#' + elementId + ' > detail[property]').each((i, v) => {
				xamlText += '<Property>' + $(v).attr('property') + '</Property>\n';
				xamlText += '<PropertyType>' + $(v).attr('propertytype') + '</PropertyType>\n';

			});
			xamlText += '</Properties>\n';

		}
		else if (elementType === "Text") {
			const elementText = element.attr('text');
			const fontSize = element.attr('fontsize');
			const fontWeight = element.attr('fontweight');
			const fontStyle = element.attr('fontstyle');

			////Opening Tag For Element
			//xamlText += '\n<Element Type="' + elementType + '" Identify="' + elementId + '" Left="' + elementLeft + '" Top="' + elementTop + '" Width="' + elementWidth + '" Height="' + elementHeight + '">\n';

			//Report Type
			xamlText += '<Text FontSize="' + fontSize + '" FontWeight="' + fontWeight + '" FontStyle="' + fontStyle + '"> ' + elementText + ' </Text> \n';
		}

		//Closing Tag For Element
		xamlText += '</Element>\n';
	});

	xamlText += "\n</Report>";
	$('#txtSourceCode').text(xamlText);

	//Submit Form to Save Report
	if ($('#txtSourceCode').html() !== '') {
		$('#generic-form').submit();
	}
}

//Save User or Customer
function SaveCS() {
	$('.customer-user:checked').each((i, v) => {
		//Define properties
		const customerId = $(v).attr('customerid');
		const customerName = $(v).attr('customername');

		//Generate control boolean property.
		let isAdded = false;

		//If this customer or user added list before control it.
		if ($('.customer-user-item[customerid="' + customerId + '"]').length > 0)
			isAdded = true;

		//Then if customer or user didn't, add in list.
		if (!isAdded) {
			//Preper new customer element.
			let text = '<li class="select-branch customer-user-item" customerid="' + customerId + '" customername="' + customerName + '">' + customerName + '<i class="fa fa-times delete-li"></i></li>';

			$('.customer-user-list').append(text);
		}
	});

	//Reset Search Input
	ResetSearchInput();
}

//==========================
// Reset Functions 
//==========================
function ResetModal() {
	//Reset Titles
	ResetLi();

	//Reset Properties
	ResetProperties();

	//Reset Lists
	ResetLists();

	//Reset Error Labels
	ResetErrorLabes();

	//Reset Search Input
	ResetSearchInput();

	//Type of Report List
	$('#select-type-options').val($('#select-type-options > option').eq(0).val());
	$('#select-property').val($('#select-property > option').eq(0).val());


}

function ResetProperties() {
	//First Step's Reset Elements
	$('#chart-type-options').val('Pie');

	$('.check-box').prop("checked", false);

	//Callback Option Function
	Option();

	//Callback ResetErrorLabes Function
	ResetErrorLabes();
}

function ResetErrorLabes() {
	//Steps Error Label Reset
	$('#step-1-select-error').html('');
	$('#step-2-select-error').html('');
	$('#step-3-select-error').html('');
	$('#step-4-select-error').html('');
	$('#step-text-select-error').html('');
}

function ResetLi() {
	//Reset All Steps
	$('#step-1').css('display', 'block');
	$('#step-1-li').addClass('active');

	$('#step-2-li').removeClass('active');
	$('#step-2-li').addClass('disabled');
	$('#step-2').css('display', 'none');

	$('#step-3-li').removeClass('active');
	$('#step-3-li').addClass('disabled');
	$('#step-3').css('display', 'none');

	$('#step-4-li').removeClass('active');
	$('#step-4-li').addClass('disabled');
	$('#step-4').css('display', 'none');
}

function ResetLists() {
	//Font-Size List
	$('#static-text').val('');
	$('#text-font-size').val(2);
	$('#text-font-weights').val(100);
	$('#text-font-style').val('Italic');


	//Appointment List Reset
	$('.appointment-boxes').prop('checked', false);

	//Branch List Reset
	$('.branch1-boxes').prop('checked', false);

	//Service List Reset
	$('.service-boxes').prop('checked', false);

	//Segment List Reset
	$('.segment-boxes').prop('checked', false);

	//Terminal List Reset
	$('.terminal-boxes').prop('checked', false);

	//Macro List Reset
	$('.macro-boxes').prop('checked', false);

	//Multi Select Property List Reset
	$('.property-boxes').prop('checked', false);

	//Single Select Property List Reset
	$('#select-property').val($('#select-property > option').eq(0).val());

	//Single Select Property Type List Reset
	//Numbers
	$('#select-property-type-number').val($('#select-property-type-number > option').eq(0).val());
	$('#select-property-type-number').css('display', 'none');
	//Strings
	$('#select-property-type-string').val($('#select-property-type-string > option').eq(0).val());
	$('#select-property-type-string').css('display', 'none');

	Option();
}

function ResetSearchInput() {
	//Clear All Required Area's
	$('#SearchInput').val('');
	$('#SearchInput').removeClass('select-active');
	$('#search-customer-user').css('display', 'none');
	$('#search-customer-user').html('');
}

//==========================
// Change Pages
//==========================
function GoDesigner() {
	//Change Tabs
	$("#DesignArea").show();
	$("#CodeTab").hide();

	//Change Active Class
	$('#Designer').addClass('active');
	$('#SourceCode').removeClass('active');
}

function GoSourceCode() {
	//Change Tabs
	$("#CodeTab").show();
	$("#DesignArea").hide();

	//Change Active
	$('#SourceCode').addClass('active');
	$('#Designer').removeClass('active');
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

//==========================
// Quick Setup Wizard Functions
//==========================

//Wizard Change Actions
let reportTypeChange = (value) => {
	let raportId = parseInt($('#Report_ReportID').val());

	if (raportId <= 0) {
		if (value === 'quick') {
			$('#report-type-section').fadeOut();

			//Open quick report designer
			$('#report-type-quick').fadeIn(1250);
		}
		else if (value === 'advanced') {
			$('#report-type-section').fadeOut();

			//Open advanced report designer
			$('#advanced-design-body').fadeIn(1250);
		}
	}
	else if (raportId > 0) {
		const reportTypeName = $('#report-type').val();

		if (reportTypeName === 'Quick') {
			//On quick report
			onEditQuickReport();

			//Open quick report designer
			$('#report-type-quick').fadeIn(50);
		}
		else if (reportTypeName === 'Advanced') {
			//Open quick report designer
			$('#advanced-design-body').fadeIn(50);
		}
	}
};

//Branch selection page checked checkbox counter. If all branch is selected All Branch Select will set as checked.
$('.quick-branch-boxes').on('change', () => {
	if ($('.quick-branch-boxes:checked').length === $('.quick-branch-boxes').length)
		$('#all-quick-branch-boxes').prop('checked', true);
	else {
		$('#all-quick-branch-boxes').prop('checked', false);

	}
});

//Branch selection page check all checkboxes in sametime.
$('#all-quick-branch-boxes').on('change', () => {
	if ($('#all-quick-branch-boxes').prop('checked') === true)
		$('.quick-branch-boxes').prop('checked', true);
	else
		$('.quick-branch-boxes').prop('checked', false);

});

//Service selection page checked checkbox counter. If all service is selected All Service Select will set as checked.
$('.quick-service-boxes').on('change', () => {
	if ($('.quick-service-boxes:checked').length === $('.quick-service-boxes').length)
		$('#all-quick-service-boxes').prop('checked', true);
	else {
		$('#all-quick-service-boxes').prop('checked', false);

	}
});

//Service selection page check all checkboxes in sametime.
$('#all-quick-service-boxes').on('change', () => {
	if ($('#all-quick-service-boxes').prop('checked') === true)
		$('.quick-service-boxes').prop('checked', true);
	else
		$('.quick-service-boxes').prop('checked', false);

});

$('#add-property').on('click', () => {
	$('.property-item').each((i, v) => {
		let isItemAdded = $('th:contains(' + $(v).html() + ')');

		if (isItemAdded.length > 0) {
			$(v).css('border-color', '#29c75f');
		}
		else {
			$(v).css('border-color', '#d0d0d0');
		}
	});


	//Activate modal
	$('#quick-wizard-modal').modal('toggle');
});

$('.property-item').on('click', (e) => {

	//Set event to default
	e.preventDefault();

	//Get element from current target(on click)
	const targetElement = $(e.currentTarget);

	//Create new element for table
	var newElement = document.createElement('th');
	$(newElement).html(targetElement.text());
	$(newElement).addClass('table-item also-items ui-sortable-handle');

	//Create delete button element
	var deleteElement = document.createElement('i');
	$(deleteElement).addClass('fa fa-times-circle text-danger');
	$(deleteElement).attr('onclick', 'DeleteItem($(this))');
	newElement.append(deleteElement);

	let isAddedBefore = $('th:contains(' + targetElement.html() + ')');

	if (isAddedBefore.length <= 0) {
		//Append item into table
		$('#property-items').append(newElement);

		//Set element index
		$(newElement).attr('index', $(newElement).index());
		$(newElement).attr('text', targetElement.html());


		//Set target element as added
		targetElement.css('border-color', '#29c75f');

		$('#quick-wizard-modal').modal('hide');
	}

});

$('#property-items').sortable({
	containment: "parent",
	stop: () => {
		//Change index of elements
		$('.table-item').each((i, v) => {
			$(v).attr('index', $(v).index());
		});
	}
});

//Save 
const saveQuickReport = () => {
	let xamlText = '';

	xamlText += '<Report type="Quick">\n\n';

	//Get selected branches and convert them xaml.
	xamlText += "<Branches>\n";

	$('.quick-branch-boxes:checked').each((i, v) => {

		const id = $(v).attr('elementid');
		xamlText += '<Branch>' + id + '</Branch>\n';
	});

	xamlText += "</Branches>\n\n";

	//Get selected service / segment combinations
	xamlText += '<ServicesNSegments>\n';

	$('.quick-service-boxes:checked').each((i, v) => {
		//Get service id and segment id
		let ids = $(v).attr('elementid').split('/');
		//Replace 
		ids[0] = ids[0].replace(' ', '');
		ids[1] = ids[1].replace(' ', '');

		xamlText += '<ServiceNSegment>\n';

		//Service
		xamlText += '<Service>' + ids[0] + '</Service>\n';

		//Segment
		xamlText += '<Segment>' + ids[1] + '</Segment>\n';

		xamlText += '</ServiceNSegment>\n';
	});

	xamlText += '</ServicesNSegments>\n\n';

	//Get table items
	const tableItems = $('.table-item');

	xamlText += '<Items>\n';
	$(tableItems).each((i, v) => {
		xamlText += '<Item>\n';
		xamlText += '<Index>' + $(v).attr('index') + '</Index>\n';
		xamlText += '<Title>' + $(v).attr('text') + '</Title>\n';
		xamlText += '</Item>\n';
	});

	xamlText += '</Items>\n\n';

	xamlText += "</Report>";

	$('input[id="quick-report-xml"]').val(xamlText);

	if (notNull.test($('input[id="quick-report-xml"]').val()))
		return true;
	else
		return false;
};

const onEditQuickReport = () => {
	const xml = "<rss version='2.0'><channel><title>RSS Title</title></channel></rss>",
		xmlDoc = $.parseXML($('#quick-report-xml').val()),
		$xml = $(xmlDoc);

	//Parse xml in to variable
	const report = xmlDoc.children,
		branches = $(report).children('branches').children('branch'),
		serviceAndSegment = $(report).children('servicesnsegments').children('servicensegment'),
		items = $(report).children('items').children('item');

	// => Step 1 Branch Boxes
	// ==> Control selected checkboxes
	branches.each((i, v) => {
		$('.quick-branch-boxes[elementid="' + $(v).text() + '"]').prop('checked', true);
	});

	//Check 'Select All' checkbox if all checkboxes are checked
	if ($('.quick-branch-boxes').length === $('.quick-branch-boxes:checked').length)
		$('#all-quick-branch-boxes').prop('checked', true);

	// => Step 2 Service/Segment Boxes
	// ==> Control selected checkboxes
	serviceAndSegment.each((i, v) => {
		let serviceAndSegment = '' + $(v).children().eq(0).text() + ' / ' + $(v).children().eq(1).text() + '';

		$('.quick-service-boxes[elementid="' + serviceAndSegment + '"]').prop('checked', true);
	});

	//Check 'Select All' checkbox if all checkboxes are checked
	if ($('.quick-service-boxes').length === $('.quick-service-boxes:checked').length)
		$('#all-quick-service-boxes').prop('checked', true);

};