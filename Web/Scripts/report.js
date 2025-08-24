function callPrint(value) {
	const pageTitle = 'QMagic Report';

	//Remove Unnecessary Elements & Make Other Changes
	//Control search key, if there's any key entered print table by this search result.
	if (searchResult.length > 0) {
		searchResult.children().parent().css('display', '');
	}
	else {
		$($table.children('tbody').children('tr')).css('display', '');
	}

	//Close below elements for print view
	$('#navbar').css('display', 'none');
	$('#sidebar').css('display', 'none');
	$('#printtable').parent().css('display', 'none');
	$('#MainContainer').css('padding-left', '0');
	$('#button-area').css('display', 'none');
	$('.app-footer').css('display', 'none');
	$('#item-per-page').css('display', 'none');
	$('#search-magic-table').css('display', 'none');
	$('#button-container').css('display', 'none');
	$('#page-info-box').css('display', 'none');

	//Create Window Page
	let windowPage = value.documentElement.innerHTML;
	let windowContainer = window.open('#', pageTitle, "width=" + screen.availWidth + ",height=" + screen.availHeight);
	let windowDocument = windowContainer.document.open();
	windowDocument.write('<!DOCTYPE html><html lang="en">');
	windowDocument.write(windowPage);

	//Open below elements for end user view
	windowContainer.onbeforeunload = () => {
		//Set orginal page to normal
		$('#navbar').css('display', '');
		$('#sidebar').css('display', '');
		$('#printtable').parent().css('display', '');
		$('#MainContainer').css('padding-left', '');
		$('#button-area').css('display', '');
		$('.app-footer').css('display', '');
		$('#item-per-page').css('display', '');
		$('#search-magic-table').css('display', '');
		$('#button-container').css('display', '');
		$('#page-info-box').css('display', '');

		pagination();
		pageChange(1);
	};

	//Close HTML element
	windowDocument.write('</html>');
	windowDocument.close();

	$(windowContainer).on('load', function () {

		if (searchResult.length > 0) {
			searchResult.children('tr').css('display', '');
		}
		else {
			$($table.children('tbody').children('tr')).css('display', '');
		}

		windowContainer.print();
	});

}

function addSigner() {
	let basicRegex = /[a-zA-Z0-9]/;
	let title = basicRegex.test($('input[name="signer-job-title"]').val());
	let li = '';

	if (!basicRegex.test($('input[name="signer-name"]').val()) || !basicRegex.test($('input[name="signer-surname"]').val())) {
		return;
	}

	if (title)
		li = '<li name="' + $('input[name="signer-name"]').val() + '" surname="' + $('input[name="signer-surname"]').val() + '" job-title="' + $('input[name="signer-job-title"]').val() + '"><span>' + $('input[name="signer-name"]').val() + ' ' + $('input[name="signer-surname"]').val() + ' - ' + $('input[name="signer-job-title"]').val() + '</span> <i class="text-danger fa fa-trash" onclick="deleteSigner($(this))"></i></li>';
	else
		li = '<li name="' + $('input[name="signer-name"]').val() + '" surname="' + $('input[name="signer-surname"]').val() + '" job-title=""><span>' + $('input[name="signer-name"]').val() + ' ' + $('input[name="signer-surname"]').val() + '</span> <i class="text-danger fa fa-trash" onclick="deleteSigner($(this))"></i></li>';

	$('#signer-list').append(li);

	//Reset input values
	$('input[name="signer-name"], input[name="signer-surname"],input[name="signer-job-title"]').val('');
}

function deleteSigner(value) {
	value.parent().remove();
}

function saveSigners() {
	let basicRegex = /[a-zA-Z0-9]/;
	const signers = $('#signer-list > li');

	//Remove current element
	$('.sign-area').remove();

	//Add newer element.
	for (var i = 0; i < signers.length; i++) {
		let text = '';

		text += '<div class="sign-area">';
		text += '<div class="signer-fullname">';
		text += '<span>';
		if (basicRegex.test($(signers[i]).attr('job-title')))
			text += '' + $(signers[i]).attr('name') + ' ' + $(signers[i]).attr('surname') + ' - ' + $(signers[i]).attr('job-title') + '';
		else
			text += '' + $(signers[i]).attr('name') + ' ' + $(signers[i]).attr('surname') + '';
		text += '</span>';
		text += '</div>';
		text += '<div class="signer-underline"></div>';
		text += '</div>';

		$('form.row').append(text);
	}

	$('#sign-report-modal').modal('hide');
}

let searchResult = [];

//rgba
const rgba = () => {
	//Returning random number beetwen 1-255
	const rbaNumber = () => {
		return 1 + Math.floor(Math.random() * 200);
	};

	return 'rgba(' + rbaNumber() + ', ' + rbaNumber() + ', ' + rbaNumber() + ', 1)';
};

//Branch arrays
let branchChartLabel = [],
	branchChartData = [],
	branchColours = [],

	//Service arrays
	serviceChartLabel = [],
	serviceChartData = [],
	serviceColours = [],

	//Segment arrays
	segmentChartLabel = [],
	segmentChartData = [],
	segmentColours = [],

	//serviceLineChart
	serviceLineChart = [];


let $table = $('.magic-table'),
	$rowCount = $('.magic-table > tbody > tr').length,
	$trs = [];

let $rowPerPage = 10,
	$pageCount = (number) => {

		//Return search result page count
		if (number >= 0)
			return Math.ceil(number / $rowPerPage);
		//General page count
		else
			return Math.ceil($rowCount / $rowPerPage);
	};

//Container of buttons will create in this section, also buttons will be created
$('.journey-header').append('<ul id="button-container"></ul>');
function pagination(rowCount) {
	//Delete all page buttons
	$('li.page-button').remove();

	//Detect how much page neeeded
	let numberOfRow = 0;
	if (rowCount === 0)
		numberOfRow = $pageCount();
	else
		numberOfRow = $pageCount(rowCount);

	for (let i = 1; i <= numberOfRow; i++) {
		//Create button element and add click attribute
		let button = $(document.createElement('li'));
		button.attr('page', '' + i + '');
		button.addClass('page-button');

		//Define
		if (i === 1) {
			//Append a tag inside div
			let link = $(document.createElement('a'));
			link.text(i)
			link.attr('href', '#');
			link.attr('onclick', 'pageChange(1)');
			button.append(link);

			let previousButton = $(document.createElement('li'));
			previousButton.addClass('page-button');

			//Append a tag inside div
			let linkPrevious = $(document.createElement('a'));
			linkPrevious.text('Previous');
			linkPrevious.attr('href', '#');
			linkPrevious.attr('onclick', 'pageChange("previous")');
			previousButton.append(linkPrevious);

			button.addClass('disable');
			button.addClass('active');
			$('#button-container').append(previousButton);
			$('#button-container').append(button);

			if ($pageCount() === 1) {
				//Create next button element
				let nextButton = $(document.createElement('li'));
				nextButton.addClass('page-button');

				//Append a tag inside div
				let linkNext = $(document.createElement('a'));
				linkNext.text('Next')
				linkNext.attr('href', '#');
				linkNext.attr('onclick', 'pageChange("next")');
				nextButton.append(linkNext);

				$('#button-container').append(nextButton);
			}

		}
		else if (i === numberOfRow) {
			//Append a tag inside div
			let link = $(document.createElement('a'));
			link.text(i);
			link.attr('href', '#');
			link.attr('onclick', 'pageChange(' + numberOfRow + ')');
			button.css('display', 'none');
			button.append(link);

			//Create next button element
			let nextButton = $(document.createElement('li'));
			nextButton.addClass('page-button');

			//Append a tag inside div
			let linkNext = $(document.createElement('a'));
			linkNext.text('Next')
			linkNext.attr('href', '#');
			linkNext.attr('onclick', 'pageChange("next")');
			nextButton.append(linkNext);

			$('#button-container').append(button);
			$('#button-container').append(nextButton);
		}
		else {
			//Append a tag inside div
			let link = $(document.createElement('a'));
			link.text(i)
			link.attr('href', '#');
			link.attr('onclick', 'pageChange(' + i + ')');
			button.append(link);

			if (i > 5) { button.css('display', 'none'); }

			$('#button-container').append(button);

		}

	}
}

function pageChange(currentPage) {
	//Prevent default
	if (event !== undefined)
		event.preventDefault();

	let previousButton = new Object();

	if (currentPage === 0 || currentPage === undefined)
		return;

	let items = currentPage * $rowPerPage,
		pageCount = $pageCount(),
		previousItems = 0;

	//Open current items
	const openRows = (iValue, maxValue) => {
		let willClose = [];

		if (searchResult.length === 0 && searchResult !== undefined) {
			willClose = $trs.slice(iValue, maxValue);
		}
		else {
			willClose = searchResult.slice(iValue, maxValue);
		}

		if (willClose.length > 0)
			willClose.map((index, value) => value.style.display = '');
	};

	//Close current items
	const closeRows = (iValue, maxValue) => {
		let willClose = [];

		if (searchResult.length === 0 && searchResult !== undefined) {
			willClose = $trs.slice(iValue, maxValue);
		}
		else {
			willClose = searchResult.slice(iValue, maxValue);
		}

		if (willClose.length > 0)
			willClose.map((index, value) => value.style.display = 'none');

	};

	previousPage = parseInt($('li.page-button.disable').attr('page'));
	previousItems = previousPage * $rowPerPage;
	previousIndexValue = previousItems - $rowPerPage;
	if (currentPage === 1)
		closeRows(0, $rowCount);
	else
		closeRows(previousIndexValue, previousItems);


	if (currentPage === 1) {
		//Active first page elements
		openRows(0, $rowPerPage);
	}
	else if (currentPage !== pageCount && currentPage !== 1 && currentPage !== 'next' && currentPage !== 'previous') {
		let iValue = (items - $rowPerPage);

		openRows(iValue, items);
	}
	else if (currentPage === 'next') {
		currentPage = parseInt($('li.page-button.disable').attr('page')) + 1;

		if (currentPage > pageCount)
			currentPage--;

		if (currentPage <= pageCount) {
			items = currentPage * $rowPerPage;
			let iValue = items - $rowPerPage;

			//Callback open function
			openRows(iValue, items);

		}
	}
	else if (currentPage === 'previous') {
		currentPage = parseInt($('li.page-button.disable').attr('page')) - 1;

		if (currentPage > 0) {
			//Calculate items
			items = (currentPage * $rowPerPage);
			let iValue = (items - $rowPerPage);

			openRows(iValue, items);
		}
		else {
			currentPage = 1;

			//Active first page elements
			openRows(0, $rowPerPage);

		}
	}
	else {
		items = (currentPage * $rowPerPage);
		let iValue = (items - $rowPerPage);

		openRows(iValue, items);
	}

	let currentButton = $('li.page-button[page="' + currentPage + '"]');
	previousButton = $('li.page-button[page="' + parseInt($('li.page-button.disable').attr('page')) + '"]');

	if (currentButton.css('display') === 'none') {
		currentButton.css('display', '');

		//Detect page number is increase or decrease
		let gap = parseInt(currentButton.attr('page')) - parseInt(previousButton.attr('page'));

		//If number is increasing
		if (gap > 0) {
			let closedButton = currentButton.index() - 4;
			$('li.page-button[page="' + (closedButton - 1) + '"]').css('display', 'none');

			//$('li.page-button[page="' + currentPage + '"]').insertBefore('#page-button-dots');
		}
		else {
			let closedButton = currentButton.index() + 5;

			$('li.page-button[page="' + closedButton + '"]').css('display', 'none');
			//$('#page-button-dots').insertBefore('li.page-button[page="' + closedButton + '"]');
		}
	}

	//Remove disable class from page buttons
	$('li.page-button').removeClass('disable');
	$('li.page-button').removeClass('active');

	//Add disable class to current page
	currentButton.addClass('disable');
	currentButton.addClass('active');

}

//Table Search
$(document).ready(function () {
	$table = $('.magic-table');
	$rowCount = $('.magic-table > tbody > tr').length;
	$trs = $('.magic-table > tbody > tr');

	for (var i = 0; i < $rowPerPage; i++) {
		$($table.children('tbody').children('tr')[i]).css('display', '');
	}

	$('#search-magic-table').on('keyup', () => {
		const key = $('#search-magic-table').val();

		if (event.keyCode !== 13 && event.keyCode !== 37 && event.keyCode !== 39 && /[a-zA-Z0-9]/.test(key)) {

			setTimeout(() => {
				searchResult = $('.magic-table > tbody > tr > td[text*="' + key + '"]').parent();

				//Recreate pagination buttons through to search count.
				pagination(searchResult.length);
				$('#result-count').text(searchResult.length);
				$('#page-count').text($pageCount(searchResult.length));

				pageChange(1);

				if (searchResult.length === 0)
					$('.magic-table > tbody > tr').css('display', 'none');

			}, 250);

		}
		else {
			//Active default
			searchResult = [];
			pagination();
			pageChange(1);

			$('#result-count').text();
			$('#page-count').text($pageCount($rowCount));

		}



	});

	//Append total result and page count
	$('#result-count').text($rowCount);
	$('#page-count').text($pageCount());

	$('#item-per-page').on('change', () => {
		$rowPerPage = $('#item-per-page').val();

		if (searchResult.length > 0) {
			pagination(searchResult.length);

			$('#page-count').text($pageCount(searchResult.length));
		}
		else {
			pagination();

			$('#page-count').text($pageCount());
		}

		pageChange(1);
	});

	$('li.page-button > a').on('click', () => {
		event.preventDefault();
	});

	//Run method when its ready.
	pagination();

});