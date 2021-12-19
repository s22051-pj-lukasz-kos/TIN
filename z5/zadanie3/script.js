// dodany Hamburger menu i responsywność z tym związana. 
// główna obsługa znajduje się w CSS

// dodaje klasę 'pion' do NAV w celu ustawienia menu pionowo dla niskich rozdzielczości
const ham = document.querySelector(".ham");
const nav = document.querySelector("nav");

ham.addEventListener("click", function() {
    nav.classList.toggle("pion");
})