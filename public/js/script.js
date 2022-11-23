// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("PLANTER JS imported successfully!");
});

function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.add("show");
}
