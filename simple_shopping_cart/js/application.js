var updateItemPrice = function(ele){
  var unitCost = parseFloat($(ele).find('.itemCost input').val());
  var quantity = parseFloat($(ele).find('.itemQuantity input').val());

  var totalCost = unitCost * quantity;
  $(ele).children('.total').html(totalCost);

  return totalCost;
}

var sum = function(acc, x){
  return acc + x;
}

var updateCartTotal = function(){
  var totalPriceValues = [];
  var cartTotal;

  $('tbody tr').each(function(i, ele){
    var totalPrice = updateItemPrice(ele);
    totalPriceValues.push(totalPrice);
  });
  if(totalPriceValues.length != 0){
    cartTotal = totalPriceValues.reduce(sum);
  }
  else{
    cartTotal = 0;
  }
  
  

  $('#cartTotal').html(cartTotal);
  console.log(cartTotal);
}

$(document).ready(function () {
  updateCartTotal();

  $(document).on('click', '.btn.remove',function(){
    $(this).closest('tr').remove();
    updateCartTotal();
  });

  var timeout;
  $(document).on('input', 'tr input', function(){
    clearTimeout(timeout);
    timeout = setTimeout(function(){
      updateCartTotal();
    }, 1000);
  })

  $('#addRow').on('submit', function(event){
    event.preventDefault();
    var item = $(this).children('[name=item]').val();
    var itemCost =$(this).children('[name=itemCost]').val();
    var itemQuantity = $(this).children('[name=itemQuantity]').val();

    $('tbody').append('<tr>' + 
    '<td class = item>' + item + '</td>' +
    '<td class = itemCost><input type="number" value="' + itemCost + '"/></td>' +
    '<td class = itemQuantity>QTY<input type="number" value="' + itemQuantity + '"/></td>' +
    '<td class="total"></td>' +
    '<td><button class = "btn btm-sm remove">Remove</button></td>' +
    '</tr>');

    updateCartTotal();
    $(this).children('[name=item]').val('');
    $(this).children('[name=itemCost]').val('');
    $(this).children('[name=itemQuantity]').val('');
  });
});
