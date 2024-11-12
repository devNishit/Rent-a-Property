let inputRating = document.querySelector("#rating");
let classRating = document.querySelector(".rating");

classRating.innerText = `Rating : ${inputRating.value}`;

inputRating.addEventListener('input',()=>{
    classRating.innerText = `Rating : ${inputRating.value}`;
})