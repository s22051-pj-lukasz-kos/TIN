let naglowkiAkordeonu = document.querySelectorAll(".naglowekAkordeonu");

for (let index = 0; index < naglowkiAkordeonu.length; index++) {
    naglowkiAkordeonu[index].addEventListener("click", function() {
        let zawartosc = this.nextElementSibling;
        if (zawartosc.style.display === "block") {
            zawartosc.style.display = "none";
        } else {
            zawartosc.style.display = "block";
        }
    })
}

