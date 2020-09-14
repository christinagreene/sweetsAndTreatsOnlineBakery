if (document.readyState == 'loading') {
   document.addEventListener('DOMContentLoaded', ready);
} else {
   ready();
};


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

function ready() {
   // add event listener on buttons and lead to appropriate functions
   const removeCartItemButtons = document.getElementsByClassName('removeCartItem');
   for (let i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i];
      button.addEventListener('click', removeCartItem);
   };

   const quantityInputs = document.getElementsByClassName('itemQuantity');
   for (let i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i]
      input.addEventListener('change', quantityChanged)
   }

   const addToCartButtons = document.getElementsByClassName('addToCart');
   for (let i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i];
      button.addEventListener('click', addItemClicked);
   };
};

// Delete individual items from cart & updates total
function removeCartItem(e) {
   var removeButton = e.target;
   removeButton.parentElement.parentElement.parentElement.remove();
   updateCartTotal();
}

// Prevents quantity for item in cart from going below 1 & updates total on change
function quantityChanged(e) {
   var input = e.target;
   if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
   }
   updateCartTotal();
}

// Adds item to cart & updates total
function addItemClicked(e) {
   e.preventDefault();
   var addButton = e.target;
   
   var itemName = addButton.previousElementSibling.previousElementSibling.innerText;

   var priceValue = addButton.previousElementSibling.innerText;
   var itemPrice = parseFloat(priceValue.replace('$', ''));

   addItemToCart(itemName, itemPrice);
   updateCartTotal();
}

function addItemToCart(itemName, itemPrice) {

   var cartItemContainerDiv = document.createElement('div');
   cartItemContainerDiv.classList.add('cartItemContainer');
   var cartItemsDiv = document.getElementsByClassName('cartItems')[0];

   var cartItemNames = cartItemsDiv.getElementsByClassName('cartItemTitle');
   
   for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == itemName) {
         alert('Oops! You have already added this item to the cart.')
         return
      }
   }

   var cartItemContents = `
      <div class="cartItemText">
         <p class="cartItemTitle">${itemName}</p>
         <p>$<span class="cartItemPrice">${itemPrice}</span></p>
      </div>
      <div class="cartItemQuantity">
         <p>x <input class="itemQuantity" type="number" value="1"></p>
      </div>
      <div class="removeFromCart">
         <a href="#" class="removeCartItem"><i class="fas fa-trash-alt"></i></a>
      </div>`;

   cartItemContainerDiv.innerHTML = cartItemContents;
   cartItemsDiv.append(cartItemContainerDiv);
   cartItemContainerDiv.getElementsByClassName('removeCartItem')[0].addEventListener('click', removeCartItem);
   cartItemContainerDiv.getElementsByClassName('itemQuantity')[0].addEventListener('change', quantityChanged);

   alert('We have added this delicious item to your cart!');
}

// Update cart total function
function updateCartTotal() {
   const itemsInCart = document.getElementsByClassName('cartItems')[0];
   const cartItemContainers = itemsInCart.getElementsByClassName('cartItemContainer');

   let total = 0;

   for (let i = 0; i < cartItemContainers.length; i++) {
      var cartItemInfo = cartItemContainers[i];
      var priceElement = cartItemInfo.getElementsByClassName('cartItemPrice')[0];
      var quantityElement = cartItemInfo.getElementsByClassName('itemQuantity')[0];
      
      var price = priceElement.innerText;
      var quantity = parseInt(quantityElement.value);
      total = total + (price * quantity);
      var totalDollarAmount = total.toFixed(2);

      const itemCount = [];
      itemCount.push(quantity);

      console.log(itemCount);

   }

   document.getElementsByClassName('cartTotal')[0].innerText = totalDollarAmount;

   document.getElementsByClassName('itemTotal')[0].innerText = totalDollarAmount;
}
