const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

if(burger){
burger.addEventListener("click", () => {
nav.classList.toggle("active");
});
}