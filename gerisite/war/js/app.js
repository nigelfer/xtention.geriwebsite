/*
 * Application JS file
 */

//Flag used to determine if search is already shown.
var searchShown = false;

$(function() {

	/*
	 * ######## lazy load slideshow images ######## allows first page to load a
	 * little faster.
	 */
	$("img.lazy").lazyload({
		container : $("#slideshowContainer")
	});

	/* ######## hiding and showing the Different menu sections ######## */
	$home = $('#home');
	$about = $('#about');
	$products = $('#products');
	$kurtis = $('#products_kurtis');
	$western = $('#products_western');
	$tunics = $('#products_tunics');
	$tops = $('#products_tops');
	$tshirts = $('#products_tshirts');
	$jewellery = $('#products_jewellery');
	$contact = $('#contact');
	$search = $('#searchSection');
	$anarkali = $('#products_anarkali_kurtis');

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
		$tops.hide();
		$anarkali.hide();
	};

	hideAll();
	$home.fadeIn(10);

	// Bind a handler for state using HISTORY plugin
	// to enable the BACK and FWD browser buttons
	$.History.bind('', function(state) {
		// Show home tab, hide the other tabs
		hideAll();
		$home.stop(true, true).fadeIn(200);
		searchShown = false;
	});

	$.History.bind('/about', function(state) {
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
		closeMenu();
		// $kurtis.load('kurtis.html');
		displayPageProducts('retailCottonKurtis', '#Cotton-Kurtis',
				'Cotton Kurtis');
		displayPageProducts('retailCottonKurtisPlus', '#Cotton-Kurtis-PLUS',
				'Cotton Kurtis:PLUS size');
		displayPageProducts('retailGeorgetteKurtisPlus', '#Georgette-Kurtis',
				'Georgette Kurtis:PLUS size');
		displayPageProducts('retailLinenKurtis', '#linen-kurtis',
				'Linen Kurtis');
		// ...

		$kurtis.stop(true, true).show();
		// $kurtis.show();
		searchShown = false;
	});
	$.History.bind('/products/western', function(state) {
		hideAll();
		closeMenu();
		// $western.load('western.html');
		displayPageProducts('retailWesternDresses', '#products_western',
				'Western Dresses');
		$western.stop(true, true).fadeIn(200);
		searchShown = false;
	});
	$.History.bind('/products/tunics', function(state) {
		hideAll();
		closeMenu();
		// $tunics.load('tunics.html');
		displayPageProducts('retailIndoWesternTunics', '#products_tunics',
				'Indo Western Tunics');
		$tunics.stop(true, true).fadeIn(200);
		searchShown = false;
	});
	$.History.bind('/products/tops', function(state) {
		hideAll();
		closeMenu();
		displayPageProducts('retailTopsPlusSize', '#products_tops',
				'Tops Plus Size');
		$tops.stop(true, true).show();
		searchShown = false;
	});
	$.History.bind('/products/AnarkaliKurtis', function(state) {
		hideAll();
		closeMenu();
		displayPageProducts('wholesaleAnarkaliKurtis',
				'#products_anarkali_kurtis', 'Anarkali Kurtis');
		$anarkali.stop(true, true).show();
		searchShown = false;
	});
	$.History.bind('/products/tshirts', function(state) {
		hideAll();
		closeMenu();
		displayPageProducts('retailTshirtsPlusSize', '#products_tshirts',
				'Tshirts Plus Size');
		$tshirts.stop(true, true).fadeIn(200);
		searchShown = false;

	});
	$.History.bind('/products/jewellery', function(state) {
		hideAll();
		closeMenu();
		displayPageProducts('jewellery', '#products_jewellery', 'Jewellery');
		$jewellery.stop(true, true).show();
		searchShown = false;

	});
	$.History.bind('/contact', function(state) {
		hideAll();
		$contact.load('contact.html');
		$contact.stop(true, true).fadeIn(200);
		searchShown = false;
	});

	/* ######## Search site. ####### */
	// as u type search will run , no enter button
	$("#filter").keyup(function() {

		// Retrieve the input field text and reset the search items found count
		// to zero
		var filter = $(this).val(), count = 0;

		if (filter.length == 0) { // if nothing entered, do nothing.
			$("#filter-count").hide();
			hideAll();
			$('.clear-search').hide();
			searchShown = false;
			return;
		} else { // show search section
			if (searchShown != true) {
				hideAll();
				$search.stop(true, true).fadeIn(200);
				searchShown = true;
				$('.clear-search').show();
			}
		}

		// Loop through the total search data
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
		$("#filter-count").show();
		$("#filter-count").text(count + " Search results");
	});

	$('#clear-search-id').click(function() {
		$("#filter-count").hide();
		hideAll();
		$('.clear-search').hide();
		$("#filter").val('');
		searchShown = false;
	});

	$("#filter").blur(function() {
		$("#filter-count").hide();
	});

	// temporary partial IE fix to remove space beneath footer
	// caused due to overflow-y:scroll
	$('html').css('height', '99.9%');

	// move spotlight
	$('#bifId-outer').mousemove(function(e) {
		var spot = $('#bifId');
		if ((e.pageX > 100) && (e.pageX < 1000)) {
			spot.stop().animate({
				'left' : e.pageX - 100
			});
		}
	});

	// page smooth scrolling
	$(function() {
		$('a.scroll').click(function(e) {
			e.preventDefault(); // prevent the "normal" behaviour which would be
			// a "hard" jump
			if ($(this).prop('back') != 'true') {
				$('a.scroll').parent().removeClass('active');
				$(this).parent().addClass('active');
			}
			scrollTo($(this));
		});
	});

});

function closeMenu() {
	var parent = $('nav.top-bar');
	if (parent.hasClass('expanded')) {
		parent.toggleClass('expanded').css('min-height', '');
	}
}

// ######## generate images on page
function displayPageProducts(pageName, htmlName, titleName) {
	var numberDivs = $(htmlName + ' .product_list').find('div').size();
	if (numberDivs === 0) { // not loaded page yet.
		$
				.getJSON(
						'data/productImages.json',
						function(data) {
							var pageData = data[pageName];
							var folder = pageData.folderLocation;
							var productList = pageData.productList;

							var content = "";
							content += "<div class='row'><div class='large-3 small-10 columns hbghead_title'>"
									+ "<h5 class='innerhead'>"
									+ titleName
									+ "</h5></div></div>";
							$.each(productList, function(i, product) {
								content += displayProductThumb(i, product,
										folder);
							});
							$(htmlName + ' .product_list').append(content);

							$("img.lazy").lazyload();
						}).fail(function() {
					console.log("error");
				});
	}
}

function displayProductThumb(index, product, folder) {
	var content = "";
	var myIndex = index + 1;
	if (myIndex % 4 === 1) {
		if (myIndex !== 1) {
			content += '</div>';
		}
		content += '<div class="row">';
	}
	content += '<div class="large-3 small-6 columns align-cener">';
	content += '<a href="' + folder + product.img + '" target="_blank">';

	if (product.lazy === 'true') {
		content += '<img class="lazy prodimg" src="img/grey.gif" data-original="'
				+ folder + product.imgThumb + '" max-width="220px"/>';
	} else {
		content += '<img src="' + folder + product.imgThumb
				+ '" max-width="220px" class="prodimg"/>';
	}
	content += '</a>';
	if ((product.title !== "") && (product.title !== undefined)) {
		content += '<div class="panel">';
		content += '<h5>' + product.title + '</h5>';
	} else {
		content += '<div class="panelWhite">';
		content += '<h5>&nbsp;</h5>';
	}

	content += '</div>'; // title
	content += '</div>'; // column

	return content;
}

function scrollTo(ahref) {
	var target = ahref.attr("href"); // Get the target
	if ($(target).length != 0) {
		var top = $(target).offset().top;
		// perform animated scrolling by getting top-position of target-element
		// and set it as scroll target
		$('html, body').stop().animate({
			scrollTop : top
		}, 1000, function() {
			location.hash = target; // attach the hash (#jumptarget) to the
			// pageurl
		});

		// alert(top);
		// alert(document.body.clientHeight);
		// $('a.scroll').attr("href").css('background-color', 'white');
		// var viewableHeight = document.body.clientHeight;
		// if (top < viewableHeight) {
		// $(target).css('background-color', 'yellow');
		// }
	}
	return false;
}
