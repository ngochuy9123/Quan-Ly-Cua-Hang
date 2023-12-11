// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = toggleClickHandler;

function toggleClickHandler() {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
}


// Pop up Form

function closeForm() {
  document.querySelector('.form-popup-bg').classList.remove('is-visible');
  toggle.onclick = toggleClickHandler;
}

document.addEventListener('DOMContentLoaded', function() {
  // Contact Form Interactions
  document.getElementById('btnOpenForm').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.form-popup-bg').classList.add('is-visible');
    toggle.onclick = null;
  });

  // Close popup when clicking x or off popup
  document.querySelector('.form-popup-bg').addEventListener('click', function(event) {
    if (event.target.classList.contains('form-popup-bg') || event.target.id === 'btnCloseForm') {
      event.preventDefault();
      this.classList.remove('is-visible');
      toggle.onclick = toggleClickHandler;
    }
  });
});

  // upload image

let image = document.getElementById("imgInput")
let imgInput = document.querySelector(".img")


image.onchange = function(){
  if(image.files[0].size < 1000000){  // 1MB = 1000000
      var fileReader = new FileReader();

      fileReader.onload = function(e){
          imgUrl = e.target.result
          imgInput.src = imgUrl
      }

      fileReader.readAsDataURL(image.files[0])
  }
  else{
      alert("This file is too large!")
  }
}

