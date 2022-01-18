var widgetElement = "";

function swellSetupAlternate() {
  if ($("#swell-checkout-holder").length > 0) {
    widgetElement = $("#swell-checkout-holder").detach();
  }
  widget_position(".cart-priceItem--total.cart-priceItem", ".form-fieldset.redeemable-payments");
}

function widget_position(desktop, mobile) {
  if (window.location.href.indexOf("checkout") > -1 && window.location.href.indexOf("order-confirmation") == -1) {
    var couponCodeSelector = "";
    setTimeout(function () {
      if ($(window).width() < 968) {
        if ($(".cart-priceItem-postFix.optimizedCheckout-contentSecondary").length > 0) {
          couponCodeSelector = ".cart-priceItem-postFix.optimizedCheckout-contentSecondary";
        } else {
          couponCodeSelector = ".redeemable-info-subHeader";
        }
        $(mobile).before(widgetElement);
        $("#swell-checkout-holder").show();
      } else {
        couponCodeSelector = ".cart-priceItem-postFix.optimizedCheckout-contentSecondary";
        $(desktop).before(widgetElement);
        $("#swell-checkout-holder").show();
      }
      Swell.Cart.selectors.couponCode = couponCodeSelector;
      $(".swell-point-balance").text(spapi.getAdjustedPointsBalance());
      Swell.Cart.hideSwellAppliedCouponCodes();
    }, 2500);
  }
}
$(document).ready(function () {
  var onSuccess = function (redemption) {
    console.log(redemption);
    window.stencilUtils.api.cart.applyCode(redemption.couponCode, (err, response) => {
      if (response.data.status === 'success') {
        document.location.reload();
      } else {
      	$("#swell-checkout-redeem-btn-1 .btn__content").show();
      	$("#swell-checkout-redeem-btn-1 .coupon-loader").hide();
        $("#swell-checkout-error-message-general").show();
        console.log(response.data.errors.join('\n'));
      }
    });
  };
  var onError = function (err) {
    $("#swell-checkout-error-message-general").show();
  };
  $('body').on('click', '#swell-checkout-redeem-btn-1', function (e) {
  	$("#swell-checkout-redeem-btn-1 .btn__content").hide();
  	$("#swell-checkout-redeem-btn-1 .coupon-loader").show();
    $("#swell-checkout-error-message-amount").hide();
    $("#swell-checkout-error-message-general").hide();
    const redId = $('#swell-checkout-redemption-options').val();
    if (spapi.getAdjustedPointsBalance() >= spapi.findActiveRedemptionOptionById(redId).amount) {
      swellAPI.makeRedemption({
          redemptionOptionId: redId,
          delayPointDeduction: true
        },
        onSuccess,
        onError
      );
    } else {
      $("#swell-checkout-error-message-amount").show();
    	$("#swell-checkout-redeem-btn-1 .btn__content").show();
    	$("#swell-checkout-redeem-btn-1 .coupon-loader").hide();
    }
  });
  // This is for the cart's summary popup
  $("body").on("click", ".cartDrawer.optimizedCheckout-orderSummary", function () {
    widget_position(".cart-section.optimizedCheckout-orderSummary-cartSection .redeemable-label", ".cart-section.optimizedCheckout-orderSummary-cartSection .redeemable-label");
  });
  // This is for the billing method's place
  $("body").on("click", "#checkout-billing-continue, #checkout-shipping-continue, .modal.optimizedCheckout-contentPrimary .cart-modal-header .cart-modal-close", function () {
    setTimeout(function () {
      widget_position(".cart-section.optimizedCheckout-orderSummary-cartSection .redeemable-label", ".form-fieldset.redeemable-payments");
    }, 3000);
  });
});
$(document).on("swell:initialized", function () {
  Swell.Cart.selectors.couponCode = ".product-options.optimizedCheckout-contentSecondary";
  Swell.Cart.hideCouponCodeEl = function (el) {
    el.hide()
  }
});
$(document).on("swell:setup", function () {
  swellSetupAlternate();
});
