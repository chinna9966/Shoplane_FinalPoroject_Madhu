// $("#cart-count").html(localStorage.getItem("cart_number"));

//slides
var slideIndex = 0;
showSlides();
var slides, dots;

function currentSlide(index) {
  slideIndex = index;
  if (index > slides.length) {
    index = 1;
  } else if (index < 1) {
    index = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[index - 1].style.display = "block";
  dots[index - 1].className += " active";
}

function showSlides() {
  var i;
  slides = document.getElementsByClassName("mySlides");
  dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 3 seconds
}

//Images
$(document).ready(function () {
  if (localStorage.getItem("cart_number") != null) {
    $("#cart-count").html(localStorage.getItem("cart_number"));
  } else {
    $("#cart-count").html("0");
  }
  $.get(
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
    function (response) {
      // console.log(response);
      const clothing = $("<div>").addClass("div_styles");
      const accessories = $("<div>").addClass("div_styles");

      const div_clothing = $("<div>").addClass("clothing");
      const para_clothing = $("<div>")
        .addClass("heading")
        .html("Clothing For Men and Women");
      const clothing_images = $("<div>").addClass("clothing_images");

      var div_accessories = $("<div>").addClass("clothing");
      var para_accessories = $("<div>")
        .addClass("heading")
        .html("Accessories For Men and Women");
      var accessories_images = $("<div>").addClass("accessories_images");

      $("#clothing-section").append(clothing);
      $("#accessory-section").append(accessories);

      clothing.append(div_clothing);
      accessories.append(div_accessories);

      div_clothing.append(para_clothing);
      div_clothing.append(clothing_images);

      div_accessories.append(para_accessories);
      div_accessories.append(accessories_images);

      let i = 0;
      let m = 1;
      for (var x of response) {
        // console.log(x);
        if (!x.isAccessory) {
          var link = $("<a>").attr("href", "./product_page.html?p=" + m);

          var img = $("<img>")
            .addClass("images_clothing")
            .attr("src", x.preview);
          var clothing_desc = $("<div>").addClass("image_desc");
          var clothing_images_div = $("<div>")
            .addClass("individual_div_image_section")
            .prop({ id: "page" + i });

          var clothing_detail = $("<h2>").addClass("image_detail").html(x.name);
          var clothing_brand = $("<h4>").html(x.brand);
          var clothing_rate = $("<h5>").html("Rs" + " " + x.price);

          clothing_images.append(clothing_images_div);
          clothing_images_div.append(link);
          link.append(img);
          clothing_images_div.append(clothing_desc);
          clothing_desc.append(clothing_detail);
          clothing_desc.append(clothing_brand);
          clothing_desc.append(clothing_rate);
        } else {
          var link = $("<a>").attr("href", "./product_page.html?p=" + m);
          var img = $("<img>")
            .addClass("images_clothing")
            .attr("src", x.preview);
          var accessories_desc = $("<div>").addClass("image_desc");
          var accessories_img_div = $("<div>")
            .addClass("individual_div_image_section")
            .prop({ id: "page" + i });
          var accessories_details = $("<h2>")
            .addClass("image_detail")
            .html(x.name);
          var accessories_brand = $("<h4>").html(x.brand);
          var accessories_rate = $("<h5>").html("Rs" + " " + x.price);

          accessories_images.append(accessories_img_div);
          accessories_img_div.append(link);
          link.append(img);
          accessories_img_div.append(accessories_desc);
          accessories_desc.append(accessories_details);
          accessories_desc.append(accessories_brand);
          accessories_desc.append(accessories_rate);
        }
        i++;
        m++;
      }

      for (let j = 0; j < response.length; j++) {
        $("#page" + j).click(function () {
          console.log("clicked");
        });
      }
    }
  );
});
