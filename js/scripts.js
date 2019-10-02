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

// Show cart contents (sidebar) when clicking the cart icon
(function(){
   const cartInfo = document.getElementById('cartInfo');
   const cart = document.getElementById('cart');

   cartInfo.addEventListener('click', function(){
      cart.classList.toggle('showCart');
      cartInfo.classList.toggle('cartInfoOpen');
   });
})();

(function(){
   // 
   const addItem = document.querySelectorAll('.addToCart');
   
   // Add items from the shop to the cart
   addItem.forEach(function(button) {
      button.addEventListener('click', function(e) {

         e.preventDefault();

         const item = {};

         // locating each item name in shop to include in description of added items in cart
         let name = e.target.previousElementSibling.previousElementSibling.textContent;

         item.name = name;

         // locating price of ea.ch item in shop to include in description and totals of items in cart
         let price = e.target.previousElementSibling.textContent;

         let finalPrice = price.slice(1);

         item.price = finalPrice;

         // create div for cart items once something is added to the cart
         const cartItem = document.createElement('div');
         cartItem.classList.add('cartItemContainer');

         cartItem.innerHTML = `
            <div class="cartItemText">
               <p class="cartItemTitle" id="cartItemTitle">${item.name}</p>
               <p class="cartItemPrice">$<span id="cartItemPrice">${item.price}</span></p>
            </div>
            <div class="removeFromCart">
               <a href="#" id="removeCartItem" class="removeCartItem" onClick="removeItem"><i class="fas fa-trash-alt"></i></a>
            </div>
         `;

         // select cart
         const cart = document.getElementById('cart');
         const itemPrice = document.querySelector('.cartTotalContainer');

         // items that get added to the cart to be located before the cart total in the DOM
         cart.insertBefore(cartItem, itemPrice);

         // alerts the user that an item was added to the cart
         alert('You have added this item to the cart.');

         showTotals();
      })
   });

   // to show the total in the nav bar and in the cart
   function showTotals() {
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
   };

   
   // function deleteItem() {
   //    const clearItem = document.getElementById('removeCartItem');
      
   //    clearItem.forEach(function(clearButton) {
   //       clearButton.addEventListener('click', function(event) {
            
   //          e.preventDefault();
            
   //       })
   //    })
   // }
   
   // function deleteCart() {
   //    const clearCart = document.getElementById('clearCart');

   // }
})();
