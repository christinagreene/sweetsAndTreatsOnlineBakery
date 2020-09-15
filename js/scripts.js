if (document.readyState == 'loading') {
   document.addEventListener('DOMContentLoaded', ready);
} else {
   ready();
};


// Flickity for gallery
const carousel = document.querySelector('.photoGallery');
const flkty = new Flickity(carousel, {
   cellAlign: 'center',
   contain: true,
   wrapAround: true,
   prevNextButtons: false,
   pageDots: false,
   autoPlay: true,
   accessibility: true
});


// Hamburger menu for smaller screens
let hamburger = document.querySelector('.menuToggle');
let menu = document.querySelector('.siteNav');

hamburger.addEventListener('click', function(){
   hamburger.classList.toggle('openMenu');
   menu.classList.toggle('active');
});


/////// CART FUNCTIONALITY ///////
// Show cart contents (sidebar) when clicking the cart icon
(function () {
   const cartInfo = document.getElementById('cartInfo');
   const cart = document.getElementById('cart');

   cartInfo.addEventListener('click', function () {
      cart.classList.toggle('showCart');
      cartInfo.classList.toggle('cartInfoOpen');
   });
})(); 

// Add event listener on buttons and lead to appropriate functions
function ready() {
   const removeCartItemButtons = document.getElementsByClassName('removeCartItem');
   for (let i = 0; i < removeCartItemButtons.length; i++) {
      const button = removeCartItemButtons[i];
      button.addEventListener('click', removeCartItem);
   };

   const quantityInputs = document.getElementsByClassName('itemQuantity');
   for (let i = 0; i < quantityInputs.length; i++) {
      const input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
   }

   const addToCartButtons = document.getElementsByClassName('addToCart');
   for (let i = 0; i < addToCartButtons.length; i++) {
      const button = addToCartButtons[i];
      button.addEventListener('click', addItemClicked);
   };
};

// Removes individual items from cart & updates total
function removeCartItem(e) {
   let removeButton = e.target;
   removeButton.parentElement.parentElement.parentElement.remove();
   updateCartTotal();
}

// Prevents quantity for item in cart from going below 1 on an item & updates total on change
function quantityChanged(e) {
   let input = e.target;
   if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
   }
   updateCartTotal();
}

// Adds item to cart & updates total
function addItemClicked(e) {
   e.preventDefault();
   let addButton = e.target;
   
   let itemName = addButton.previousElementSibling.previousElementSibling.innerText;

   let priceValue = addButton.previousElementSibling.innerText;
   let itemPrice = parseFloat(priceValue.replace('$', ''));

   addItemToCart(itemName, itemPrice);
   updateCartTotal();
}

// Adds dynamic content about items, alerts for confirming addition of item and preventing from adding more than one of same item from main shop page
function addItemToCart(itemName, itemPrice) {

   let cartItemContainerDiv = document.createElement('div');
   cartItemContainerDiv.classList.add('cartItemContainer');
   let cartItemsDiv = document.getElementsByClassName('cartItems')[0];

   let cartItemNames = cartItemsDiv.getElementsByClassName('cartItemTitle');
   
   for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == itemName) {
         alert('Oops! You have already added this item to the cart.')
         return
      }
   }

   let cartItemContents = `
      <div class="cartItemText">
         <p class="cartItemTitle">${itemName}</p>
         <p>$<span class="cartItemPrice">${itemPrice}</span></p>
      </div>
      <div class="cartItemQuantity">
         <p>x <input class="itemQuantity" type="number" value="1"></p>
      </div>
      <div class="remofcartveFromCart">
         <a href="#" class="removeCartItem"><i class="fas fa-trash-alt"></i></a>
      </div>`;

   cartItemContainerDiv.innerHTML = cartItemContents;
   cartItemsDiv.append(cartItemContainerDiv);
   cartItemContainerDiv.getElementsByClassName('removeCartItem')[0].addEventListener('click', removeCartItem);
   cartItemContainerDiv.getElementsByClassName('itemQuantity')[0].addEventListener('change', quantityChanged);

   alert('We have added this delicious item to your cart!');
}

// Updates the total price of cart contents
function updateCartTotal() {
   const cartItemContainers = document.getElementsByClassName('cartItemContainer');

   let total = 0;
   let totalDollarAmount = '0.00';

   for (let i = 0; i < cartItemContainers.length; i++) {
      let cartItemInfo = cartItemContainers[i];
      let priceElement = cartItemInfo.getElementsByClassName('cartItemPrice')[0];
      let quantityElement = cartItemInfo.getElementsByClassName('itemQuantity')[0];
      
      let price = priceElement.innerText;
      let quantity = parseInt(quantityElement.value);
      total = total + (price * quantity);
      totalDollarAmount = total.toFixed(2);
   }

   // appends total price to menu and cart sidebar
   document.getElementsByClassName('cartTotal')[0].innerText = totalDollarAmount;
   document.getElementsByClassName('itemTotal')[0].innerText = totalDollarAmount;
}
