let navbar = document.getElementById('navbarMobile');
let closeMenu = document.getElementById('closeMenu');
let openMenu = document.getElementById('openMenu');

document.getElementById('openMenu').addEventListener('click', function () {
    navbar.classList.add('showme');
  this.style.display = "none";
  closeMenu.style.display = "inline-block";

});
document.getElementById('closeMenu').addEventListener('click', function () {
    navbar.classList.remove('showme');
  openMenu.style.display = "inline-block";
  this.style.display = "none";
});


const common = (($) => {
    'use strict';

    /**
     * Some function
     *
     * @since   1.0.0
     */
    const someFunction = () => {
        // do something
    };

    /**
     * Fire events on document ready and bind other events
     *
     * @since   1.0.0
     */
    const ready = () => {
        someFunction();
    };

    /**
     * Only expose the ready function to the world
     */
    return {
        ready: ready
    }

})(jQuery);

jQuery(common.ready);


