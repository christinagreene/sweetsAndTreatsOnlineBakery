// flickety for gallery
var carousel = document.querySelector('.photoGallery');
var flkty = new Flickity(carousel, {
   cellAlign: 'center',
   contain: true,
   wrapAround: true,
   prevNextButtons: false,
   pageDots: false,
   autoPlay: true,
   accessibility: true
});


// Show cart contents (sidebar) when clicking the cart icon
(function () {
   const cartInfo = document.getElementById('cartInfo');
   const cart = document.getElementById('cart');

   cartInfo.addEventListener('click', function () {
      cart.classList.toggle('showCart');
      cartInfo.classList.toggle('cartInfoOpen');
   });
})(); 

// CART FUNCTIONS (ADD, DELETE ITEM, CLEAR ALL, TOTAL)--------
// Delete individual items from cart
const removeCartItemButtons = document.getElementsByClassName('removeCartItem');

for (let i = 0; i < removeCartItemButtons.length; i++) {
   const button = removeCartItemButtons[i];

   button.addEventListener('click', function(e) {
      var buttonClicked = e.target
      buttonClicked.parentElement.parentElement.parentElement.remove();
      // updateCartTotal();
   });
};

// Delete ALL items from cart
const clearCartButton = document.getElementById('clearCart');


// function updateCartTotal() {
//    var cartItemContainer = document.getElementsByClassName('cart')
// }