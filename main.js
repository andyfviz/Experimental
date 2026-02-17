
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