let list = document.querySelectorAll('.list .item');
list.forEach(item => {
  item.addEventListener('click', function(event) {
    if (event.target.classList.contains('add')) {
      var itemNew = item.cloneNode(true);
      let checkIsset = false;

      let listCart = document.querySelectorAll('.cart .item');
      listCart.forEach(cart => {
        if (cart.getAttribute('data-key') == itemNew.getAttribute('data-key')) {
          checkIsset = true;
          cart.classList.add('danger');
          setTimeout(function() {
            cart.classList.remove('danger');
          }, 1000);
        }
      });

      if (checkIsset == false) {
        document.querySelector('.listCart').appendChild(itemNew);
        let countInput = itemNew.querySelector('.count');
        countInput.addEventListener('change', countChanged);
      }
    }
    updateCartTotal();
  });
});
/* Function to remove items from cart*/
function Remove($key) {
  let listCart = document.querySelectorAll('.cart .item');
  listCart.forEach(item => {
    if (item.getAttribute('data-key') == $key) {
      item.remove();
      updateCartTotal();
    }
  });
}
/* Checking to see if the value the user puts in is not less than 1 or to check whether they are putting a proper value in */ 
function countChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

/* Update the total when items are added, removed, or quantity changes */
function updateCartTotal() {
  let listRows = document.querySelectorAll('.listCart .item');
  let total = 0;
  listRows.forEach(listRow => {
    let priceElement = listRow.querySelector('.price');
    let countElement = listRow.querySelector('.count');

    let price = parseFloat(priceElement.innerText.replace('R', ''));
    let count = parseInt(countElement.value);
    total += price * count;
  });
  total = Math.round(total * 100) / 100;
  document.querySelector('.cart-total-price').innerText = 'R' + total;
}
