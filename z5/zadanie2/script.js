/*  Stwórz tablicę obiektów typu auto{rok, przebieg,
    cena_wyjsciowa, cena_koncowa}.
    Przy pomocy JS zbuduj element DOM – tabelkę zawierającą dane
    z tych obiektów. Umieść tabelkę na stronie przy pomocy JS. */

const tablicaAut = [];
class Auto {
    constructor(rok, przebieg, cena_wyjsciowa, cena_koncowa) {
        this.rok = rok;
        this.przebieg = przebieg;
        this.cena_wyjsciowa = cena_wyjsciowa;
        this.cena_koncowa = cena_koncowa;
    }
}

const auto1 = new Auto(1999, 543000, 30000, 2000);
const auto2 = new Auto(2008, 165000, 40000, 8000);
const auto3 = new Auto(2015, 60000, 90000, 35000);

tablicaAut.push(auto1);
tablicaAut.push(auto2);
tablicaAut.push(auto3);

const table = document.createElement("TABLE");
document.body.appendChild(table);
table.innerHTML = 
    `
    <thead>
        <tr>
            <th>Rok</th>
            <th>Przebieg</th>
            <th>Cena wyjściowa</th>
            <th>Cena końcowa</th>
        </tr>
    </thead>`;

const tbody = document.createElement("TBODY");
table.appendChild(tbody);
tbody.innerHTML = 
    tablicaAut.map(auto => `
    <tr>
        <td>${auto.rok}</td>
        <td>${auto.przebieg}</td>
        <td>${auto.cena_wyjsciowa}</td>
        <td>${auto.cena_koncowa}</td>
    </tr>`).join("");
