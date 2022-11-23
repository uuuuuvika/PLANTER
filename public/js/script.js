// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("PLANTER JS imported successfully!");
  waterF()
});

function myFunction() {
  const popup = document.getElementById("myPopup");
  popup.classList.add("show");
}
function waterF(){
  const water = document.querySelectorAll(".water");
  const waterBool = water.innerHTML;
  console.log(water.innerHTML)
}
