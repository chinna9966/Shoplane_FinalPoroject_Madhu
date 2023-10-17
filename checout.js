if (localStorage.getItem("cart_items") != null) {
  var total_cost = 0;
  var data = [...JSON.parse(localStorage.getItem("cart_items"))];
  console.log(`checkout-data: ${data}`);

  if (localStorage.getItem("cart_number") != null) {
    $("#items-count").html(localStorage.getItem("cart_number"));
  } else {
    $("#items-count").html("0");
  }
  var arr = [];
  var count = 1;
  for (cost of data) {
    total_cost = total_cost + cost.price;
  }
  $("#total-amount").html(total_cost);
  for (let x = 0; x < data.length; x++) {
    count = 1;
    if (data[x] == null) {
      continue;
    }
    for (let j = x + 1; j < data.length; j++) {
      if (data[j] == null) {
        continue;
      }
      if (data[x].id == data[j].id) {
        data[j] = null;
        count++;
      }
    }

    var block = $("<div>").addClass("product_block");
    var element = $("<div>").addClass("product_element");
    var left_img = $("<img>").attr("src", data[x].preview);
    var right_elem = $("<div>").addClass("right_elem");
    var right_head = $("<h3>").addClass("right_head").html(data[x].name);
    var right_count = $("<p>")
      .addClass("right_count")
      .html("x" + count);
    var right_price = $("<p>")
      .addClass("right_price")
      .html("Amount: Rs " + data[x].price * count);

    $("#cart-list").append(block);
    block.append(element);
    block.append(right_elem);
    element.append(left_img);
    right_elem.append(right_head);
    right_elem.append(right_count);
    right_elem.append(right_price);
  }
  //console.log(localStorage.getItem("cart_items"));
} else {
  console.log("no data");
}
