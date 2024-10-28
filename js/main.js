const container = document.querySelector(".container");
const card_container = document.querySelector(".card-container");
const selected_card = document.querySelector(".selected-card");
const card_place = document.querySelector(".card-place");
const card_array = ["card1", "card2", "card3", "card4"];
const rect = container.getBoundingClientRect();
let active = false;

const card_select = () => {
    const card = document.querySelector(".card").className = "card:nth-of-type(1)";
    selected_card.style.display = "block";
    active = true;
}
const move_card = (e) => {
    if (active==true) {
        let cursorX = e.clientX - rect.left - 75;
        let cursorY = e.clientY - rect.top - 75;
        selected_card.style.transform = "translate(" + cursorX + "px," + cursorY + "px)";
    }
}
const choose_card = (min, max) =>{
    if (active==true) {
        selected_card.style.display = "none";
        var audio = new Audio("./sfx/flip.mp3");
        audio.play();
        const random_card = document.createElement("img");
        const card_number = card_array[Math.round(Math.random()*(max-min)+min)];
        if (card_number == undefined) {
        console.log("Undefined image detected");
        } else {
        random_card.src = "./images/" + card_number + ".png";
        random_card.className = "card_number";
        document.querySelector(".card-place").appendChild(random_card);
        }
    } else {
        console.log("No card selected!");
    }
    active= false;
}
card_place.addEventListener("click", () => {choose_card(0, 3)}, false);
card_container.addEventListener('click', card_select, false);
container.addEventListener('mousemove', move_card, false);