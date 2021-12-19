/* doda kolejny div do 4 istniejących divów */
const button1handler = () => {
    const container = document.querySelector('#container');
    const child = document.createElement('div');
    child.classList.add('editable');
    container.append(child);
}

/* usunie pierwszy div (kolejne naciśnięcie usunie
kolejny div i tak dalej) */
const button2handler = () => {
    const container = document.querySelector('#container');
    const divToRemove = container.querySelector('div');
    if(divToRemove) {
        container.removeChild(divToRemove);
    } else {
        console.log("Nie ma czego usuwac");
    }
}

/* zmieni kolor tła diva numer 3 */
const button3handler = () => {
    const container = document.querySelector('#container');
    const divs = container.querySelectorAll('div');

    if(divs.length >= 3) {
        const divToChangeColor = divs[2]
        divToChangeColor.style.backgroundColor='turquoise';
    } else {
        console.log('nie ma az 3 divow');
    }
}

/* wpisze tekst „nowy tekst” do wszystkich divów */
const button4handler = () => {
    const divs = document.querySelectorAll('div.editable');
    for (let index = 0; index < divs.length; index++) {
        divs[index].innerText = "nowy tekst";
    }
}
