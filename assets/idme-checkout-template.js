(function() {
  var cartContainer = document.getElementById("CartContainer");
  var checkout = document.getElementsByClassName('order-summary__section--discount')[0];

  var idme = `<div class="idme-shopify">
    <span class='idme-btn-affinity'>Hospital Employees, Medical Providers, Military, Nurses, and First Responders receive 25% off</span>
    <span class="idme-btn-unify">
      <a href="https://discountify.id.me/oauth/checkpoint/beamtlc" >
        <img src="https://s3.amazonaws.com/idme/buttons/v4/verify-with-idme.png" alt="ID.me" style="height:37px"/>
      </a>
    </span>
  </div>`;

  checkout && checkout.insertAdjacentHTML("afterend", idme);
})();

