(function() {
	var cx = '002612420283441268524:sumneqdctam';
	var gcse = document.createElement('script');
	gcse.type = 'text/javascript';
	gcse.async = true;
	gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:')
			+ '//www.google.com/cse/cse.js?cx=' + cx;
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(gcse, s);
})();

$(function() {

	/* hiding and showing the Diff menus */
	$home = $('#home');
	$about = $('#about');
	$products = $('#products');
	$kurtis = $('#products_kurtis');
	$western = $('#products_western');
	$tunics = $('#products_tunics');
	$tshirts = $('#products_tshirts');
	$jewellery = $('#products_jewellery');
	$contact = $('#contact');

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
	};
	
	hideAll();
	$home.fadeIn(10);

	// Bind a handler for state
	$.History.bind('', function(state) {
		// Show apricots tab, hide the other tabs
		hideAll();
		$home.stop(true, true).fadeIn(200);
	});

	// Bind a handler for state: apricots
	$.History.bind('/about', function(state) {
		// Show apricots tab, hide the other tabs
		hideAll();
		$about.stop(true, true).fadeIn(200);
	});
	$.History.bind('/products', function(state) {
		hideAll();
		$products.stop(true, true).fadeIn(200);
	});
	$.History.bind('/products/kurtis', function(state) {
		hideAll();
		$kurtis.stop(true, true).fadeIn(200);
	});
	$.History.bind('/products/western', function(state) {
		hideAll();
		$western.stop(true, true).fadeIn(200);
	});
	$.History.bind('/products/tunics', function(state) {
		hideAll();
		$tunics.stop(true, true).fadeIn(200);
	});
	$.History.bind('/products/tshirts', function(state) {
		hideAll();
		$tshirts.stop(true, true).fadeIn(200);
	});
	$.History.bind('/products/jewellery', function(state) {
		hideAll();
		$jewellery.stop(true, true).fadeIn(200);
	});
	$.History.bind('/contact', function(state) {
		hideAll();
		$contact.stop(true, true).fadeIn(200);
	});
});
