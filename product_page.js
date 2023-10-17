$("#place-order").click(function () {
  n = 0;
  localStorage.clear();
  $("#cart-count").html(n);
});
if (localStorage.getItem("cart_number") != null) {
  $("#cart-count").html(localStorage.getItem("cart_number"));
} else {
  $("#cart-count").html("0");
}

var productList = [];
$(document).ready(function () {
  var linkId = window.location.search.split("=")[1];

  function createProductImages(url, id) {
    var main_image = $("<img>").attr("src", url);

    if (id === 0) {
      main_image.addClass("active-image");
    }

    main_image.click(function () {
      $("#product-images img").removeClass("active-image");
      main_image.addClass("active-image");
      $("#main-img-link").attr("src", url);
    });

    return main_image;
  }

  $.get(
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + linkId,
    function (data) {
      console.log(data);

      $("#main-img-link").attr("src", data.preview);
      $("#product-title").html(data.name);
      $("#product-brand").html(data.brand);
      $("#description").html(data.description);
      $("#product-price").html(data.price);

      for (var i = 0; i < data.photos.length; i++) {
        $("#product-images").append(createProductImages(data.photos[i], i));
      }

      $("#cartAdd-button").click(function () {
        console.log("clicked");
        var n = localStorage.getItem("cart_number");

        if (n === null) {
          n = 0;
        }

        n++;

        localStorage.setItem("cart_number", n);
        productList = [];
        if (localStorage.getItem("cart_items") != null) {
          productList.push(...JSON.parse(localStorage.getItem("cart_items")));
          productList.push(data);
          localStorage.setItem("cart_items", JSON.stringify(productList));
          let res = localStorage.getItem("cart_items");
          console.log("cart_itms:", JSON.parse(res));
        } else {
          productList.push(data);
          localStorage.setItem("cart_items", JSON.stringify(productList));
          let res = localStorage.getItem("cart_items");
          console.log("cart_itms:", JSON.parse(res));
        }
        //console.log(localStorage.getItem("cart_number"));
        console.log(n);
        // location.reload();
        if (localStorage.getItem("cart_number") != null) {
          $("#cart-count").html(localStorage.getItem("cart_number"));
        } else {
          $("#cart-count").html("0");
        }
      });
    }
  );
});
