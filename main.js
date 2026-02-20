
const toggleButton = document.getElementById("Theme");
const body = document.body;

const savedTheme =localStorage.getItem("Theme");

if (savedTheme==="Dark"){
    body.classList.add("dark-mode");
    toggleButton.textContent="Light";
    } else {
    toggleButton.textContent = "Dark";
}
/*Click*/ 
toggleButton.addEventListener ("click",() => {
    body.classList.toggle("dark-mode");

    if(body.classList.contains("dark-mode")){
        localStorage.setItem("Theme", "Dark");
        toggleButton.textContent ="Light";
    } else{
        localStorage.setItem("Theme","Light");
        toggleButton.textContent= "Dark";
    }
});

const Tarjetas = document.querySelector(".Tarjetas");
const card = document.querySelectorAll (".card");
card [0].classList.add("active");

function updateActiveCard() {
 const carouselRect = carousel.getBoundingClientRect();
    const carouselCenter = carouselRect.left + carouselRect.width / 2;

    card.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;

        const distance = Math.abs(carouselCenter - cardCenter);

        if (distance < rect.width / 2) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
}

carousel.addEventListener("scroll", updateActiveCard);