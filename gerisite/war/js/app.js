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
        $kurtis.load('kurtis.html');
        $kurtis.stop(true, true).show();
//		$kurtis.show();
        searchShown = false;
    });
    $.History.bind('/products/western', function(state) {
        hideAll();
        closeMenu();
        $western.load('western.html');
        $western.stop(true, true).fadeIn(200);
        searchShown = false;
    });
    $.History.bind('/products/tunics', function(state) {
        hideAll();
        closeMenu();
        $tunics.load('tunics.html');
        $tunics.stop(true, true).fadeIn(200);
        searchShown = false;
    });
    $.History.bind('/products/tshirts', function(state) {
        hideAll();
        closeMenu();
        $tshirts.stop(true, true).fadeIn(200);
        searchShown = false;

    });
    $.History.bind('/products/jewellery', function(state) {
        hideAll();
        closeMenu();
        $jewellery.load('jewellery.html');
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
            return;
        } else { // show search section
            if (searchShown != true) {
                hideAll();
                $search.stop(true, true).fadeIn(200);
                searchShown = true;
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
        $("#filter-count").text(count + " Search results");
    });

    //temporary partial IE fix to remove space beneath footer 
    //	caused due to overflow-y:scroll
    $('html').css('height', '99.9%');

});

function closeMenu() {
    var parent = $('nav.top-bar');
    if (parent.hasClass('expanded')) {
        parent.toggleClass('expanded').css('min-height', '');
    }
}

// ########   generate images on page
function displayPageProducts(pageName) {
    $.getJSON('data/productImages.json', function(data) {
        var pageData = data[pageName];
        var folder = pageData.folderLocation;
        var productList = pageData.productList;
        
        var content = "";
        $.each(productList, function(i, product) {
            content += displayProductThumb(i, product, folder);
        });
        $('#product_list').append(content);

        $("img.lazy").lazyload();
    })
            .fail(function() {
        console.log("error");
    });
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
    content += '<div class="large-3 small-6 columns">';
    content += '<a href="' + folder + product.img + '" target="_blank">';

    if (product.lazy === 'true') {
        content += '<img class="lazy" src="img/grey.gif" data-original="' + folder + product.imgThumb + '" max-width="220px"/>';
    }
    else {
        content += '<img src="' + folder + product.imgThumb + '" max-width="220px"/>';
    }
    content += '</a>';
    if (product.title !== "") {
        content += '<div class="panel">';
        content += '<h5>' + product.title + '</h5>';
    } else {
        content += '<div class="panelWhite">';
        content += '<h5>&nbsp;</h5>';
    }
    
    content += '</div>'; //title
    content += '</div>'; //column

    return content;
}


//$.getJSON("http://mywebsite.com/json/get.php?cid=15",
//        function(data) {
//            $.each(data.products, function(i, product) {
//                content = '<p>' + product.product_title + '</p>';
//                content += '<p>' + product.product_short_description + '</p>';
//                content += '<img src="' + product.product_thumbnail_src + '"/>';
//                content += '<br/>';
//                $(content).appendTo("#product_list");
//            });
//        });
