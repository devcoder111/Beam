(function()
{
  $(document).on("swell:initialized", function() {
    SwellConfig.Campaign.loadCampaigns();
    $(".swell-referral-loader-campaigns").remove();
  });
  $(document).on("swell:setup", function() {
    SwellConfig.Referral.initializeReferral(".swell-referral");
    SwellConfig.Referral.populateReferrals();
    Swell.Redemption.initializeRedemptions(".swell-redemption-option-list", SwellConfig.Redemption.opts);
    $(".swell-referral-loader").remove();
    if($(".swell-post-checkout-beam").length > 0) {
      $(".swell-post-checkout-beam").css("display","flex");
    }
  });
  $(document).on("swell:referral:success", function ()
  {
    swellAPI.refreshCustomerDetails(function ()
    {
      $(".table-data").html("");
      SwellConfig.Referral.populateReferrals();
    });
  });
  $(document).on("swell:referral:error", function (jqXHR, textStatus, errorThrown)
  {
    if (textStatus && textStatus === "EMAILS_ALREADY_PURCHASED")
    {
      $(".refer-customer-error").remove();
      $(".swell-referral-form-list").before('<p class="refer-customer-error">Sorry! Looks like this person has already made a purchase. Try referring another friend.</p>');
    }
    if (textStatus && textStatus === "Please enter a valid email address")
    { 
      $(".refer-customer-error").remove();
      $(".swell-referral-form-list").before('<p class="refer-customer-error">Please enter valid email addresses seperated with commas</p>');
    }
  });
  $(document).ready(function () {
    if(window.location.href.indexOf("refer") > -1 || window.location.href.indexOf("rewards") > -1 || window.location.href.indexOf("account-reward") > -1)
    {
      $(".body .container").addClass("swell-page");
    }
    $(document).on("click","#refer-campaign", function(){
      window.location.href = '/refer';
    });
    $(document).on("click",".post-popup-close", function(){
      $(".swell-post-checkout-beam").css("display","none");
    });
    $(document).on("click", ".swell-share-referral-copy", function() {
      setTimeout(function(){
        $(".swell-referral-copy-link").html($(".swell-referral-copy-link").html().replace("http://",""));
        $(".swell-referral-copy-link").html($(".swell-referral-copy-link").html().replace("https://",""));
       },20);
     });
  });
}).call(this);

//campaigns
(function() {
  window.SwellConfig = window.SwellConfig || {};

  SwellConfig.Campaign = {
    loadCampaigns: function()
    {
      var campaigns = spapi.activeCampaigns;
      campaigns.forEach(function(campaign) {
        if(campaign.type != "ReferralCampaign")
        {
          $(".swell-campaign-list").append("<li class='swell-campaign'> <div class='swell-campaign-content swell-campaign-link' data-display-mode='modal' data-campaign-id='"+campaign.id+"'> <div class='swell-campaign-icon'> <span class='swell-campaign-icon-content'><span class='"+campaign.icon+"'><span class='path1'></span><span class='path2'></span><span class='path3'></span></span></span> <span class='swell-campaign-icon-content'><span class='"+campaign.icon+"-hover'><span class='path1'></span><span class='path2'></span><span class='path3'></span></span></span> </div> <div class='campaign-content-holder'> <div class='swell-campaign-value'> <span class='swell-campaign-value-content'>"+campaign.reward_text+"</span> </div> <div class='swell-campaign-type'> <span class='swell-campaign-type-content'>"+campaign.title+"</span> </div> </div> </div> </li>");
        }
      });
      $(".swell-campaign-list").append("<li class='swell-campaign'> <div class='swell-campaign-content' id='refer-campaign'> <div class='swell-campaign-icon'> <span class='swell-campaign-icon-content'><span class='swell-icon-raf-a-friend'><span class='path1'></span><span class='path2'></span><span class='path3'></span></span></span> <span class='swell-campaign-icon-content'><span class='swell-icon-raf-a-friend-hover'><span class='path1'></span><span class='path2'></span><span class='path3'></span></span></span> </div> <div class='campaign-content-holder'> <div class='swell-campaign-value'> <span class='swell-campaign-value-content'>Get $20</span> </div> <div class='swell-campaign-type'> <span class='swell-campaign-type-content'>Refer a Friend</span> </div> </div> </div> </li>");
    }
  };
}).call(this);

//redemptions
(function() {
  window.SwellConfig = window.SwellConfig || {};

  SwellConfig.Redemption = {
    opts: {
      templates: {
        redemptionOption: '<li class="swell-redemption-option"> <div class="swell-redemption-option-content"> <div class="swell-redemption-option-cost"><%= redemption.name %></div> <div class="swell-redemption-option-value"><%= redemption.cost_text %></div> </div> </li>'
      }
    }
  };
}).call(this);

// referral
(function() {
  window.SwellConfig = window.SwellConfig || {};

  SwellConfig.Referral = {
    opts: {
      localization: {
        referralSidebarDetailsAction: "Refer a Friend",
        referralSidebarDetailsReward: "<%= referralCampaign.reward_text %>",

        referralRegisterHeading: "Give $20, Get $20",
        referralRegisterFormDetails: "Enter your email below to get started",
        referralRegisterFormEmail: "Enter email...",
        referralRegisterFormSubmit: "next",
        referralRegisterDetails: "give your friends $20 off on their first order of $75+ and get $20 for each successful referral.",

        referralReferHeading: "Give $20, Get $20",
        referralReferFormEmails: "Your friends’ emails (separated by commas)",
        referralReferFormSubmit: "send",
        referralReferFormDetails: "Now, Enter your friends’ emails.",
        referralReferDetails: "give your friends $20 off on their first order of $75+ and get $20 for each successful referral.",

        referralReferMediaDetails: "You can also share your link with the buttons below.",

        referralShareFacebook: "Share",
        referralShareTwitter: "Tweet",
        referralShareCopy: "Copy Link",
        referralShareMessenger: "Message",
        referralShareSMS: "SMS",

        referralThanksHeading: "Thanks for Referring!",
        referralThanksDetails: "Remind your friends to check their emails.",

        referralCopyHeading: "Copy Link",
        referralCopyButton: "Copy link",
        referralCopyDetails: "Copy and share link with your friends."
      },
      templates: {
        referralRegister: '<div class="swell-referral-register"> <h2 class="swell-referral-heading"><%= localization.referralRegisterHeading %></h2> <p class="swell-referral-details"><%= localization.referralRegisterDetails %></p> <div class="swell-referral-form-wrapper"> <form name="swell-referral-register-form" id="swell-referral-register-form" method="POST" action="."> <div class="swell-referral-form-header"> <p class="swell-referral-form-header-details"><%= localization.referralRegisterFormDetails %></p> </div> <div class="swell-referral-form-body"> <ul class="swell-referral-form-list"> <li class="swell-referral-form-list-field"> <input class="swell-referral-form-list-field-input" autofocus="off" type="email" name="swell-referral-register-email" id="swell-referral-register-email" required="required" placeholder="<%= localization.referralRegisterFormEmail %>"> <input class="swell-referral-form-list-submit" type="submit" name="swell-referral-register-submit" id="swell-referral-register-submit" value="<%= localization.referralRegisterFormSubmit %>"> </li> </ul> </div> </form> </div> </div>',
        referralRefer: '<div class="swell-referral-refer"> <h2 class="swell-referral-heading"><%= localization.referralReferHeading %></h2> <p class="swell-referral-details"><%= localization.referralReferDetails %></p> <div class="swell-referral-form-wrapper"> <form class="swell-referral-form" name="swell-referral-refer-form" id="swell-referral-refer-form" method="POST" action="."> <div class="swell-referral-form-header"> <p class="swell-referral-form-header-details"><%= localization.referralReferFormDetails %></p> </div> <div class="swell-referral-form-body"> <ul class="swell-referral-form-list"> <li class="swell-referral-form-list-field"> <input class="swell-referral-form-list-field-input" autofocus="off" type="text" name="swell-referral-refer-emails" id="swell-referral-refer-emails" required="required" placeholder="<%= localization.referralReferFormEmails %>"> <input class="swell-referral-form-list-submit" type="submit" name="swell-referral-refer-submit" id="swell-referral-refer-submit" value="<%= localization.referralReferFormSubmit %>"> </li> </ul> </div> </form> </div> <div class="swell-referral-media-wrapper"> <p class="swell-referral-media-details"><%= localization.referralReferMediaDetails %></p> <ul class="swell-referral-media-list"> <li class="swell-referral-medium swell-share-referral-facebook"> <div class="swell-referral-medium-content"> <i class="swell-referral-media-icon swell-icon-share" aria-hidden="true"></i> <%= localization.referralShareFacebook %> </div> </li> <li class="swell-referral-medium swell-share-referral-twitter"> <div class="swell-referral-medium-content"> <i class="swell-referral-media-icon swell-icon-tweet" aria-hidden="true"></i> <%= localization.referralShareTwitter %> </div> </li> <li class="swell-referral-medium swell-share-referral-messenger"> <div class="swell-referral-medium-content"> <i class="swell-referral-media-icon swell-icon-message" aria-hidden="true"></i> <%= localization.referralShareMessenger %> </div> </li> <li class="swell-referral-medium swell-share-referral-copy"> <div class="swell-referral-medium-content"> <i class="swell-referral-media-icon swell-icon-copy-link" aria-hidden="true"></i> <%= localization.referralShareCopy %> </div> </li> <li class="swell-referral-medium swell-share-referral-sms"> <div class="swell-referral-medium-content"> <i class="swell-referral-media-icon swell-icon-sms" aria-hidden="true"></i> <%= localization.referralShareSMS %> </div> </li> </ul> </div> </div>',
      }
    },
    initializeReferral: function(containerSelector) {
      var email = $(containerSelector).data("customer-email");
      if (email) {
        spapi.storage.setItem("referrer_email", email);
        spapi.customer.email = email;
      }
      Swell.Referral.initializeReferral(".swell-referral", SwellConfig.Referral.opts);
    },
    populateReferrals: function(){
      if (spapi.authenticated) {
        var referral_receipts = spapi.customer.referral_receipts;
        referral_receipts.forEach(function(referral_receipt) {
          var email = referral_receipt.email;
          var completed_at = referral_receipt.completed_at;
          if (completed_at) {
            status = "Purchased (" + spapi.activeReferralCampaign.reward_text + "earned)";
          } else {
            status = 'invited';
          }
          $(".table-data").append("<tr><td>" + email + "</td><td>" + status + "</td></tr>");
        });
      }
    }
  };
}).call(this);
