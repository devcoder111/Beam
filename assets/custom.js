$(document).click(function(e) {
	if( $(e.target).attr("class") == "details-modal") {
		$(".details-modal").css("display", "none");
	}
})

$(document).ready(function(){
	var url = window.location.pathname;    
	var cartlink = url.indexOf("cart");
	if(cartlink > 0) {
		setInterval(function(){
			var productTitles = $(".cart-product-title");

		$.map(productTitles, function(e, i){
			var productTitle = $(e).text();
			if(productTitle.search("subscription") > 0) {
				var originTitle = productTitle.slice(0, productTitle.search("subscription")) + " subscription";
				if(productTitle.search("30") > 0){
					var disPercent = 30;
				}
				else {
					if(productTitle.search("20") > 0){
						var disPercent = 20;
					}
				}
				var parentEle = $(e).parent(".product--title");
				var price = parseFloat(parentEle.siblings(".cart-item-price").text().trim().replace("$", ""));
			
				if(disPercent == 30){
					var originPrice = price / 0.7;
					var msg = "take an <span class='color--blue fw--600'>additional 10% off</span> with code <span class='color--blue fw--600'>PRIME</span>. renews monthly at 20% off regular price.";

				}
				if(disPercent == 20){
					var originPrice = price / 0.8;
				}
				var msg = "take an <span class='color--blue fw--600'>additional 10% off</span> with code <span class='color--blue fw--600'>PRIME</span>. renews monthly at 20% off regular price.";
				var priceLine = "$" + price + "    " + "<span class='line-through'>$" + originPrice + "</span>"; 
				parentEle.siblings(".discount-message").html(msg);
				parentEle.siblings(".price-line").html(priceLine);
				parentEle.siblings(".cart-product-title-new").find("a").text(originTitle);
				parentEle.siblings(".cart-item-price").css("display", "none");
				
				parentEle.css("display", "none");
			}
			else {
				if(productTitle.search("20") > 0){
					var originTitle = productTitle.slice(0, productTitle.search("20"));
					var disPercent = 20;
					var parentEle = $(e).parent(".product--title");
					var price = parseFloat(parentEle.siblings(".cart-item-price").text().trim().replace("$", ""));
					if(disPercent == 20){
						var originPrice = price / 0.8;
					}
					var priceLine = "$" + price + "    " + "<span class='line-through'>$" + originPrice + "</span>"; 
					parentEle.siblings(".price-line").html(priceLine);
					parentEle.siblings(".cart-product-title-new").find("a").text(originTitle);
					parentEle.css("display", "none");
					parentEle.siblings(".cart-item-price").css("display", "none");
				}
			}
			
		})

		}, 100);
		
	}	
});

$(".testimonial-slider").slick({
	dots: true,
	customPaging: function (slider, i) {
		return $('<button type="button" />').text(i + 1);
	},
	centerMode: true,
	centerPadding: "24%",	
	infinite: true,
	autoplay: true,
	autoplaySpeed: 5000,
	responsive: [{
		breakpoint: 992,
		settings: {
			centerPadding: "120px"
		}
	},
	{
		breakpoint: 768,
		settings: {
			centerPadding: "80px"
		}
		
	},
	{
		breakpoint: 554,
		settings: {
			centerPadding: "10px"
		}
	}]
});