var searchShown = false;

$(function() {
	
	/* ######## lazy load images ######## */
	$("img.lazy").lazyload({
		container: $("#slideshowContainer")
	});
	
	/* ######## hiding and showing the Different menu sections ######## */
	$home = $('#home');
	$about = $('#about');
	$products = $('#products');
	$kurtis = $('#products_kurtis');
	$western = $('#products_western');
	$tunics = $('#products_tunics');
	$tshirts = $('#products_tshirts');
	$jewellery = $('#products_jewellery');
	$contact = $('#contact');
	$search = $('#searchSection');

	var hideAll = function() {
		$home.hide();
		$about.hide();
		$products.hide();
		$kurtis.hide();
		$western.hide();
		$tunics.hide();
		$tshirts.hide();
		$jewellery.hide();
		$contact.hide();
		$search.hide();
	};

	hideAll();
	$home.fadeIn(10);

	// Bind a handler for state
	$.History.bind('', function(state) {
		// Show apricots tab, hide the other tabs
		hideAll();
		$home.stop(true, true).fadeIn(200);
		searchShown = false;
	});

	// Bind a handler for state: apricots
	$.History.bind('/about', function(state) {
		// Show apricots tab, hide the other tabs
		hideAll();
		$about.stop(true, true).fadeIn(200);
		searchShown = false;
	});
	$.History.bind('/products', function(state) {
		hideAll();
		$products.stop(true, true).fadeIn(200);
		searchShown = false;
	});
	$.History.bind('/products/kurtis', function(state) {
		hideAll();
		// $kurtis.stop(true, true).fadeIn(10);
		$kurtis.load('kurtis.html');
		$kurtis.stop(true, true).fadeIn(10);
		searchShown = false;
	});
	$.History.bind('/products/western', function(state) {
		hideAll();
		$western.stop(true, true).fadeIn(200);
		searchShown = false;
	});
	$.History.bind('/products/tunics', function(state) {
		hideAll();
		$tunics.stop(true, true).fadeIn(200);
		searchShown = false;
	});
	$.History.bind('/products/tshirts', function(state) {
		hideAll();
		$tshirts.stop(true, true).fadeIn(200);
		searchShown = false;
	});
	$.History.bind('/products/jewellery', function(state) {
		hideAll();
		$jewellery.stop(true, true).fadeIn(200);
		searchShown = false;
	});
	$.History.bind('/contact', function(state) {
		hideAll();
		$contact.stop(true, true).fadeIn(200);
		searchShown = false;
	});

	/* ######## Search ####### */
	$("#filter").keyup(function() {

		// Retrieve the input field text and reset the count to zero
		var filter = $(this).val(), count = 0;

		if (filter.length == 0) {
			return;
		} else {
			if (searchShown != true) {
				hideAll();
				$search.stop(true, true).fadeIn(200);
				searchShown = true;
			}
		}

		// Loop through the comment list
		$(".searchdata li").each(function() {

			// If the list item does not contain the text phrase fade it out
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).fadeOut();

				// Show the list item if the phrase matches and increase the
				// count by 1
			} else {
				$(this).show();
				count++;
			}
		});

		// Update the count
		var numberItems = count;
		$("#filter-count").text(count + " Search results");
	});
});
