let ElementCount = 1;
let DesignHeight = 0;
const xArrow = $('#x-arrow');
const yArrow = $('#y-arrow');
let pagePropsActive = false,
	currentElement,
	currenElementId = 0,
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


$(document).ready(function () {
	var browser_height = $(document).height();

	var area_width = $("#DesignArea").width();
	var area_height = (area_width * 16) / 9;

	var legend_height = area_height + 200;
	legend_height = Math.round(legend_height);

	$("#MainLegend").css("min-height", legend_height);

	if (!jQuery.ui) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.async = true;
		script.src = "/assets/jquery-ui/jquery-ui.js";
		var oScripts = document.getElementsByTagName("script");
		var s = oScripts[0];
		s.parentNode.insertBefore(script, s);
	}

	//Control Height of ticket design
	$('#txtHeight').change(() => {
		//Getting requested value
		var value = $('#txtHeight').val();
		let biggerPosition = 0;


		var area = $('.uiElement');
		//Then control all sub elements
		$('.uiElement').each((index, value) => {
			const valuePositionTop = $(value).position().top;
			const valueHeight = $(value).height();
			const valueAbsolutePosition = valuePositionTop + valueHeight + 5;

			if (valueAbsolutePosition > biggerPosition)
				biggerPosition = valueAbsolutePosition;
		});

		if (biggerPosition > value) {
			swal({
				title: "You can't change height of design!",
				text: "One of elements position bigger then new height",
				icon: "warning",
				dangerMode: true
			});
		}
		else {
			$('#DesignArea').height(value);
			$("#DesignArea").parent().height(value);
			$("#DesignTab").height(value);
		}

	});

	//Control Enter Press
	$('#txtPageName').on('keypress',
		(event) => {
			if (event.which === 13 && event.target.id === "txtPageName") {
				//Callback SaveScreen Method
				SaveScreen();
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
			$(currentElement).remove();
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

		if (currentElement.length > 0) {
			$('.uiElement').removeClass('selected');

			currentElement.addClass('selected');
			currentElementId = currentElement.attr('id');
		}
		else {
			$('.uiElement').removeClass('selected');
			currenElementId = 0;

			//Common Properties Reset
			$("#txtType").val('');
			$("#txtID").val('');
			$("#txtName").val('');
			$("#txtCaption").val('');
			$("#txtPositionX").val('');
			$("#txtPositionY").val('');
			$("#txtSizeX").val('');
			$("#txtSizeY").val('');

			//Special Properties Reset
			$('#cmbAction').val($('#cmbAction').children().eq(0).val());
			$('#select2-cmbAction-container').html($('#cmbAction').children().eq(0).text());

			//Font Proeprties Reset
			$('#cmbFont').val($('#cmbFont').children().eq(0).val());
			$('#select2-cmbFont-container').html($('#cmbFont').children().eq(0).text());

			$('#cmbFontSize').val($('#cmbFontSize').children().eq(0).val());
			$('#select2-cmbFontSize-container').html($('#cmbFontSize').children().eq(0).text());

			$('#cmbFontColor').val($('#cmbFontColor').children().eq(0).val());
			$('#select2-cmbFontColor-container').html($('#cmbFontColor').children().eq(0).text());

			$('#cmbAlign').val($('#cmbAlign').children().eq(0).val());
			$('#select2-cmbAlign-container').html($('#cmbAlign').children().eq(0).text());

			$('#cmbValign').val($('#cmbValign').children().eq(0).val());
			$('#select2-cmbValign-container').html($('#cmbValign').children().eq(0).text());

			//Font Property Change
			$('#font-bold').removeClass('btn-primary');
			$('#font-bold').addClass('btn-default');

			$('#font-italic').removeClass('btn-primary');
			$('#font-italic').addClass('btn-default');

			$('#font-underline').removeClass('btn-primary');
			$('#font-underline').addClass('btn-default');
		}

		if (currentElement !== undefined && currentElement.length !== 0 || currentElement !== null && currentElement.length !== 0)
			GetProperties(currentElement);
	});

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

			//Remove 'Selected' Class From All Draggable Objects
			$('.uiElement').removeClass('selected');

			//Add 'Selected' Class to Current Dragging Object
			currentElement.addClass('selected');
		},
		resize: (event, ui) => {
			GetProperties($(ui.helper));
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

//Validate Element
function validateElement(element) {
	element = $(element);
	let bool = true;
	let elementType = $(element).attr('type');
	let notNull = /[a-zA-Z0-9]/;

	function validateGeneral() {
		if (currentElement === undefined || currentElement === null || currentElement === '' || currentElement.length === 0) {

			//Identifier Validate
			if (!notNull.test($(element.attr('id'))))
				bool = false;

			//Name Validate
			if (!notNull.test($(element).attr('name')))
				bool = false;

			//Left Validate
			if (element.attr('element-left') !== undefined && !notNull.test(element.attr('element-left')))
				bool = false;

			//Top Validate
			if (element.attr('element-top') !== undefined && !notNull.test(element.attr('element-top')))
				bool = false;

			//Width Validate
			if (element.attr('element-width') !== undefined && !notNull.test(element.attr('element-width')))
				bool = false;

			//Height Validate
			if (element.attr('element-height') !== undefined && !notNull.test(element.attr('element-height')))
				bool = false;

		}
		else {
			//Identifier Validate
			if (!notNull.test($('#txtID').val()))
				bool = false;

			//Name Validate
			if (!notNull.test($('#txtName').val()))
				bool = false;

			//Left Validate
			if (!notNull.test($('#txtPositionX').val()))
				bool = false;

			//Top Validate
			if (!notNull.test($('#txtPositionY').val()))
				bool = false;

			//Width Validate
			if (!notNull.test($('#txtSizeX').val()))
				bool = false;

			//Height Validate
			if (!notNull.test($('#txtSizeY').val()))
				bool = false;
		}
	}

	validateGeneral();

	return bool;

}

function GetProperties(tElement) {
	var element_type = tElement.attr("type");

	$("#txtName").val(tElement.attr("name"));
	$("#txtPositionX").val(elementLeft());
	$("#txtPositionY").val(elementTop());
	$("#txtSizeX").val(elementWidth());
	$("#txtSizeY").val(elementHeight());
	$(".SpecialProps").hide();

	$("#txtType").val(element_type);
	$("#txtID").val(tElement.attr("id"));
	$("#btnBackgroundBrowser").attr("onclick", "window.open('/KioskDesigner/ImageBrowser?reff=txtBackground', 'Browser', 'width=1100,height=750');");

	if (element_type === "Label") {
		$("#txtCaption").removeClass("disabled");
		$("#txtCaption").val(tElement.children('label').text());

		$("#txtBackground").val("NULL");
		$("#txtBackground").attr("disabled", "disabled");
		$("#btnBackgroundBrowser").attr("disabled", "disabled");
		$("#txtCaption").removeClass("disabled");
		$("#FontProperties").show();

		if (tElement.attr("bold") === "true") {
			$("#btnBold").attr("checked", "checked");
			$("#btnBold").parent().addClass("active");
		}
		else {
			$("#btnBold").removeAttr("checked");
			$("#btnBold").parent().removeClass("active");
		}

		if (tElement.attr("italic") === "true") {
			$("#btnItalic").attr("checked", "checked");
			$("#btnItalic").parent().addClass("active");
		}
		else {
			$("#btnItalic").removeAttr("checked");
			$("#btnItalic").parent().removeClass("active");
		}

		if (tElement.attr("underline") === "true") {
			$("#btnUnderline").attr("checked", "checked");
			$("#btnUnderline").parent().addClass("active");
		}
		else {
			$("#btnUnderline").removeAttr("checked");
			$("#btnUnderline").parent().removeClass("active");
		}

		$("#SpecialLabel").show();

		var label_action = tElement.attr("data-bind");
		$("#cmbAction").val(label_action).change();


		$("#cmbFont").removeAttr("disabled");
		$("#cmbFontSize").removeAttr("disabled");
		$("#cmbFontColor").removeAttr("disabled");

		$("#cmbFont").val($(tElement).css("font-family").replace('"', '').replace('"', '')).change();
		$("#cmbFontSize").val($(tElement).css("font-size").replace("px", "")).change();
		$("#cmbFontColor").val($(tElement).css("color")).change();

		$("#cmbAlign").val($(tElement).attr("align")).change();
		$("#cmbValign").val($(tElement).attr("valign")).change();

		$("#cmbcmbAlign").removeClass("disabled");
		$("#cmbValign").removeClass("disabled");
		$("#SpecialNumPad").hide();
	}

	fontActions('check');
}

function SetProperties() {
	let page_background = $("#txtPageBackground").val();
	let page_height = $("#txtHeight").val();
	let element_type = $("#txtType").val();
	let element_id = $("#txtID").val();
	let element_name = $("#txtName").val();
	let element_text = $("#txtCaption").val();
	let element_positionx = $("#txtPositionX").val();
	let element_positiony = $("#txtPositionY").val();
	let element_sizex = $("#txtSizeX").val();
	let element_sizey = $("#txtSizeY").val();

	let element_font = $("#cmbFont").val();
	let element_fontsize = $("#cmbFontSize").val();
	let element_color = $("#cmbFontColor").val();

	let element_align = $("#cmbAlign").val();
	let element_valign = $("#cmbValign").val();
	let element


	//Apply Settings
	$("#DesignArea").css("background-image", "url(" + page_background + ")");

	$("#DesignArea").css("height", page_height + "px");
	$("#DesignArea").parent().css("height", page_height + "px");
	$("#DesignTab").css("height", page_height + "px");

	if (currentElement !== undefined && currentElement.length >= 1) {
		if (!validateElement(currentElement)) {
			return swal({
				icon: 'warning',
				title: 'Some Properties Are Wrong',
				text: 'Please ensure to fill all required inputs'
			});
		}

		if (currentElementId !== element_id) {
			const changedElement = $('#' + element_id + '');

			if (changedElement.length !== 0) {
				return swal({
					icon: 'warning',
					title: 'Identifier Exist!',
					text: 'This identifier already defined for another element'
				});
			}
		}

		//Append Attributes
		let element = currentElement;
		element.attr('element-left', element_positionx);
		element.attr('element-top', element_positiony);
		element.attr('element-width', element_sizex);
		element.attr('element-height', element_sizey);

		if (element_type === "Label") {
			var label_action = $("#cmbAction").val();
			element.attr('id', element_id);
			element.attr("name", element_name);
			element.children('label').html(element_text);
			element.css("left", '' + element_positionx + '');
			element.css("top", '' + element_positiony + '%');
			element.css("width", '' + element_sizex + '%');
			element.css("height", '' + element_sizey + '%');
			element.css("font-family", "'" + element_font + "'");
			element.css("font-size", element_fontsize + "px");
			element.css("color", element_color);
			element.attr("data-bind", label_action);
			element.attr("align", element_align);
			element.attr("valign", element_valign);

		}
	}

	draggable();
	resizable();
}

function RemoveItem() {
	var element_id = $("#txtID").val();

	$("#" + element_id).remove();
}

//Create Element Function
function CreateElement(elementtype) {
	//Increase Total Element Count
	ElementCount++;

	//Control Element
	let elementControl = $('#' + ElementCount + '');

	//If This Id Assign to Another Element.
	if (elementControl.length > 0)
		controlElement();

	let element;

	if (elementtype === "Label") {
		element = $('<div class="uiElement" data-bind="Static" parameter="0" style="width: 50px; height: 50px; left:0px; top:0px;  border:dotted 2px #CCC; cursor:pointer; color:rgb(0,0,0);" type="Label" name="Label' + ElementCount + '" id="' + ElementCount + '" element-left="0" element-top="0" element-width="11.21" element-height="16.78"; align="false" valign="false" bold="false" italic="false" underline="false"><label>Label Item</label></div>');
	}
	else if (elementtype === "RouteMap") {
		element = $('<div class="uiElement" style="width: 50px; height: 50px; left: 0px; top: 0px; border:dotted 2px #CCC; cursor:pointer;" type="RouteMap" name="RouteMap' + ElementCount + '" id="' + ElementCount + '" element-left="0" element-top="0" element-width="11.21" element-height="16.78"> <i class="fa fa-map-marker"></i> </div>');
	}

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

function ConvertToMagic() {
	GoDesigner();
	var page_title = $("#txtPageName").val();
	var page_background = $("#txtPageBackground").val();
	var pheight = $("#txtHeight").val();
	var plang = $("#cmbLanguage").val();

	var TheCode = "<Design>\n";
	TheCode = TheCode + '\t<Page type="TicketDesign" name="' + page_title + '" BackgroundImage="' + page_background + '" Height="' + pheight + '"  Language="' + plang + '">\n\n';

	$(".uiElement").each(function () {
		let element = $(this);
		currentElement = element;

		const element_type = element.attr("type");
		const element_id = element.attr("id");
		const element_name = element.attr("name");
		const element_positionx = elementLeft();
		const element_positiony = elementTop();
		const element_width = elementWidth();
		const element_height = elementHeight();

		if (element_type === "Label") {
			const element_text = element.children('label').text();
			element_action = element.attr("data-bind"),
				element_parameter = element.attr("parameter"),
				element_font = element.css("font-family"),
				element_fontsize = element.css("font-size"),
				element_color = element.css("color"),

				element_bold = element.attr("bold"),
				element_italic = element.attr("italic"),
				element_underline = element.attr("underline"),

				element_align = element.attr("align"),
				element_valign = element.attr("valign");

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
		else if (element_type === "RouteMap") {
			TheCode += '\t<Control type="RouteMap">\n';
			TheCode += '\t\t<Type>RouteMap</Type>\n';
			TheCode += '\t\t<Identifier>' + element_id + '</Identifier>\n';
			TheCode += '\t\t<Name>' + element_name + '</Name>\n';
			TheCode += '\t\t<PositionX>' + element_positionx + '</PositionX>\n';
			TheCode += '\t\t<PositionY>' + element_positiony + '</PositionY>\n';
			TheCode += '\t\t<Width>' + element_width + '</Width>\n';
			TheCode += '\t\t<Height>' + element_height + '</Height>\n';

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

	//Convert Process
	ConvertToMagic();

	//Validate Each Item
	let items = $('.uiElement');
	let isValid = true;
	currentElement = null;
	for (var i = 0; i < items.length; i++) {
		if (!validateElement(items[i]))
			isValid = false;
	}

	if (!isValid) {
		return swal({
			icon: 'error',
			title: 'Empty Element',
			text: 'Element added but didn\'t edited or one property missing.'
		});

	}

	//Submit Form
	$("form").submit();
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