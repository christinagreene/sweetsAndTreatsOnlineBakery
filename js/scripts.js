// flickety for gallery
var carousel = document.querySelector('.photoGallery');
var flkty = new Flickity( carousel, {
   cellAlign: 'center',
   contain: true,
   wrapAround: true,
   prevNextButtons: false,
   pageDots: false,
   autoPlay: true,
   accessibility: true
});

// Show cart when clicking the Cart Icon
(function(){
   const cartInfo = document.getElementById('cartInfo');
   const cart = document.getElementById('cart');

   cartInfo.addEventListener('click', function(){
      cart.classList.toggle('showCart');
      cartInfo.classList.toggle('cartInfoOpen');
   });
})();

// Add items to the cart
(function(){
   const cartBtn = document.querySelectorAll('.addToCart');

   cartBtn.forEach(function(btn) {
      btn.addEventListener('click', function(e) {

         e.preventDefault();

         const item = {};

         let name = e.target.previousElementSibling.previousElementSibling.textContent;

         item.name = name;

         let price = e.target.previousElementSibling.textContent;

         let finalPrice = price.slice(1);

         item.price = finalPrice;

         const cartItem = document.createElement('div');
         cartItem.classList.add('cartItemContainer');

         cartItem.innerHTML = `<div class="cartItemText">
               <p class="cartItemTitle" id="cartItemTitle">${item.name}</p>
               <p class="cartItemPrice">$<span id="cartItemPrice">${item.price}</span></p>
            </div>
            <div class="removeFromCart">
               <a href="#" id="cartItemRemove" class="cartItemRemove"><i class="fas fa-trash-alt"></i></a>
            </div>`;

         // select cart
         const cart = document.getElementById('cart');
         const itemPrice = document.querySelector('.cartTotalContainer');

         cart.insertBefore(cartItem, itemPrice);
         alert('You have added this item to the cart.');

         showTotals();
      })
   });

   // to show the totals
   function showTotals(){
      const total = [];
      const items = document.querySelectorAll('.cartItemPrice');

      items.forEach(function(item) {
         total.push(parseFloat(item.textContent.slice(1)));
      });

      const totalCost = total.reduce(function(total, item) {
         total += item;
         
         return total;
      }, 0)

      const dollarAmount = totalCost.toFixed(2);

      document.getElementById('cartTotal').textContent = dollarAmount;
      document.querySelector('.itemTotal').textContent = dollarAmount;
      document.getElementById('itemCount').textContent = total.length;
   }
})();

// delete items from cart
(function() {
   
})();