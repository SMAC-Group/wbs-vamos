$(function() {
	// Person
	$(document).on('click', '.personModal', function(e) {
		e.preventDefault();
		var jqxhrPerson = $.ajax({
			url: $(this).attr('href')
		});
		jqxhrPerson.done(personDone);
		jqxhrPerson.fail(xhrError);
	});

	// Sortierung
	$(document).on('click', '.orderList', function(e) {
		e.preventDefault();
		if ($("#btnReplay").length == 1) {
			if ($("#btnReplay").html() == "Play") {
				changeListClass('orderList', $(this));
				getResult($(this).attr('href'));
			}
		} else {
			changeListClass('orderList', $(this));
			getResult($(this).attr('href'));
		}
	});

	// Paging
	$(document).on('click', '.paging', function(e) {
		e.preventDefault();
		getResult($(this).attr('href'));
	});

	// Add Print Classes for Modal
    $('.modal').on('shown.bs.modal',function() {
        $('.modal,.modal-backdrop').addClass('toPrint');
        $('body').addClass('non-print');
    });
    // Remove classes
    $('.modal').on('hidden.bs.modal',function() {
        $('.modal,.modal-backdrop').removeClass('toPrint');
        $('body').removeClass('non-print');
    });

    // Ticker Click-Handler
    $(document).on('click', '.tickerModal', function(e) {
		e.preventDefault();
		var jqxhrTicker = $.ajax({
			url: $(this).attr('href')
		});
		jqxhrTicker.done(tickerDone);
		jqxhrTicker.fail(xhrError);
	});
});

function parseQueryString(queryString) {
	var query = {};
	var a = queryString.substr(1).split('&');
	for (var i = 0; i < a.length; i++) {
		var b = a[i].split('=');
		query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
	}
	return query;
}

function xhrError(jqXHR, textStatus, errorThrown) {
	$("#timer").html(" !");
}

function init() {
	if (panicmode <= 1) {
		if (refresh > 0) {
			$("#timer").html(' &sdot;');
			intervalID = window.setInterval('checkUpdate()', refresh);
		}
	} else {
		$("#progress").html($("#progress").html() + ' |');
	}
}

function personDone(response) {
	$(".modal-content").html(response);
	$("#myModal").modal('show');
}

function changeListClass(cssClass, element) {
	$("." + cssClass).parent().removeClass('active');
	element.parent().addClass('active');
}

function updateEvent(eventstatus, statusinfo, infotext) {
	$("#racestatus").html(eventstatus);
	if (eventstatus == 'live') {
		$("#racestatus").removeClass('racestatus').addClass('racestatusLive');
	}
	else {
		$("#racestatus").removeClass('racestatusLive').addClass('racestatus');
	}
	if ( (statusinfo == 2 || statusinfo == 3) && infotext != "") {
		$("#infotext").html(infotext).show();
	}
	else {
		$("#infotext").hide();
	}
	if (statusinfo == 3) {
		$("#contentWrapper").hide()
	}
	else {
		$("#contentWrapper").show()
	}
}

function convertFunction(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		var reader = new FileReader();
		reader.onloadend = function() {
			callback(reader.result);
		}
		reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
}