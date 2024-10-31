const container = document.querySelector(".container");
const card_container = document.querySelector(".card-container");
const selected_card = document.querySelector(".selected-card");
const card_place = document.querySelector(".card-place");
const rect = container.getBoundingClientRect();
let active = false;

const card_select = () => {
    
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
async function choose_card() {
    if (active==true) {
        selected_card.style.display = "none";
        var audio = new Audio("./sfx/flip.mp3");
        audio.play();
        try {
            const response = await fetch("https://www.deckofcardsapi.com/api/deck/new/draw/?count=1")
            const deck = await response.json();
            const random_card = document.createElement("img");
            random_card.src = deck.cards[0].image;
            random_card.className = "drawn-card";
            document.querySelector(".card-place").appendChild(random_card);
            active = false;
        } catch (error) {
            console.log(error)
        }
    } else {
        console.log("No card selected!");
    }
}
card_place.addEventListener("click", choose_card, false);
card_container.addEventListener('click', card_select, false);
container.addEventListener('mousemove', move_card, false);