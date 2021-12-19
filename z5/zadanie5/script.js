const lightbox = document.querySelector(".lightbox");
const przegladarka = document.querySelector(".przegladarka");
const miniatury = przegladarka.children;
const close = document.querySelector(".close");
const obrazy = document.querySelectorAll(".obraz");

// event listener na close
close.addEventListener("click", zamknijBox);

// kliknięcie na miniaturę uruchamia fullscreen
function otworzBox(index) {
    przegladarka.classList.add("invisible");
    lightbox.classList.remove("invisible");
    close.classList.remove("invisible");
    obrazy[index].classList.remove("invisible");
}

// kliknięcie na close zamyka fullscreen
function zamknijBox() {
    przegladarka.classList.remove("invisible");
    lightbox.classList.add("invisible");
    close.classList.add("invisible");
    for (let index = 0; index < obrazy.length; index++) {
        obrazy[index].classList.add("invisible");
    }
}

