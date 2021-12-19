console.log("Aby wywołać pierwsze zadanie wpisz 'pitagoras(x,y,z)'"); 
console.log("Aby wywołać drugie zadanie wpisz 'dzielne(x,y,z)'. x oraz y to przedziały liczb, z to dzielnik"); 
console.log("Aby wywołać trzecie zadanie wpisz 'tabliczka(x)', gdzie x to bok tabliczki mnożenia."); 
console.log("Aby wywołać czwarte zadanie wpisz 'fibonacci(x)'."); 
console.log("Aby wywołać piąte zadanie wpisz 'choinka(x)'."); 
console.log("Aby wywołać szóste zadanie wpisz 'choinkaNoca(x)'."); 
console.log("Aby wywołać siódme zadanie wpisz 'pole()'."); 
console.log("Aby wywołać dziesiąte zadanie utwórz obiekt Auto."); 

function pitagoras(x,y,z) {
    if(z>y) {
        if (z>x) {
            return ((x**2) + (y**2) == (z**2));
        } else {
            return ((z**2) + (y**2) == (x**2));
        }
    } else if (y>x) {
        return ((x**2) + (z**2) == (y**2));
    } else {
        return ((y**2) + (z**2) == (x**2));
    }
}

function dzielne(x,y,z) {
    let num = x;
    while (num <= y) {
        if (num % z == 0) {
            console.log(num);
        }
        num++;
    }
}

function tabliczka(x) {
    let num = 1;
    let vertNum = 1;
    let line = "";
    while (vertNum <= x) {
        while (num <= x) {
            line += num*vertNum + " ";
            num++;
        }
        console.log(line);
        num = 1;
        line = "";
        vertNum++;
    }
}

function fibonacci(x) {
    let i;
    let fib = [];
    
    fib[0] = 0;
    fib[1] = 1;
    for (i = 2; i <= 10; i++) {
      fib[i] = fib[i - 2] + fib[i - 1];
      console.log(fib[i]);
    }
}

function choinka(x) {
    let txt;
    let i, j;
    for(i=1;i<=x;i++) {
        txt = "";
        for(j=1;j<=i;j++){
            txt += "*";
        }
        console.log(txt);
    }
}

function choinkaNoca(x) {
    let txt;
    let i, j, k;
    for(i=0;i<x-1;i++){ // wiersze
        txt = "";
        for(j=i;j<x-1;j++){ // pierwsza czesc
            txt += "*";
        }
        for(k=0;k<(i*2)-1;k++){ // choinka
            txt += " ";
        }
        for(j=i;j<x-1;j++){ // druga czesc
            txt += "*";
        }
        console.log(txt);
    }
    txt = "";
    for(k=0;k<(i*2)-1;k++){ 
        txt += "*";
    }
    console.log(txt);
}

function pole() {
    console.log("1. Prostokat");
    console.log("2. Trójkąt");
    console.log("3. Równoległobok");
    console.log("4. Trapez");
    let x = parseInt(prompt("Wybierz figurę do obliczenia pola powierzchni"), 10);
    switch(x) {
        case 1: 
            prostokat();
            break;
        case 2:
            trojkat();
            break;
        case 3:
            rownoleglobok();
            break;
        case 4: 
            trapez();
            break;
    }
    function prostokat() {
        let a = parseInt(prompt("Wprowadź bok a:"), 10);
        let b = parseInt(prompt("Wprowadź bok b:"), 10);
        console.log("Pole powierzchni prostokąta wynosi " + (a*b));
    }
    function trojkat() {
        let a = parseInt(prompt("Wprowadź bok a:"), 10);
        let h = parseInt(prompt("Wprowadź wysokosc h:"), 10);
        console.log("Pole powierzchni trojkata wynosi " + ((a*h)/2));
    }
    function rownoleglobok() {
        let a = parseInt(prompt("Wprowadź bok a:"), 10);
        let h = parseInt(prompt("Wprowadź wysokosc h:"), 10);
        console.log("Pole powierzchni rownolegloboku wynosi " + (a*h));
    }
    function trapez() {
        let a = parseInt(prompt("Wprowadź bok a:"), 10);
        let b = parseInt(prompt("Wprowadź bok b:"), 10);
        let h = parseInt(prompt("Wprowadź wysokość h:"), 10);
        console.log("Pole powierzchni trapezu wynosi " + (((a+b)*h)/2));
    }
}

// zadanie 10
const tablicaAut = [];
class Auto {
    constructor(rok, przebieg, cena_wyjsciowa) {
        this.rok = rok;
        this.przebieg = przebieg;
        this.cena_wyjsciowa = cena_wyjsciowa;
        this.cena_koncowa = undefined;
    }

    /* Funkcja, która powiększa cenę wyjściową o 1000 */
    zwiekszCeneWyjsciowa() {
        return this.cena_wyjsciowa += 1000;
    }

    /* Funkcja, która obniża cenę końcową o 1000 za każdy rok
       wieku auta (względem ceny wyjściowej) */
    obliczCeneKoncowaWzgledemWieku() {
        const d = new Date();
        const roznica = (d.getFullYear() - this.rok) * 1000;
        if (typeof this.cena_koncowa !== "number") {
            this.cena_koncowa = this.cena_wyjsciowa - roznica;
        } else {
            this.cena_koncowa -= roznica;
        }
        return this.cena_koncowa;
    }

    /* Funkcja, która obniża cenę końcową o 10000 za każde
       100000km przebiegu auta */
    obliczCeneKoncowaWzgledemPrzebiegu() {
        const roznica = (parseInt((this.przebieg / 100000)) * 10000);
        if (typeof this.cena_koncowa !== "number") {
            this.cena_koncowa = this.cena_wyjsciowa - roznica;
        } else {
            this.cena_koncowa -= roznica;
        }
        return this.cena_koncowa;
    }

    /* Funkcja, która dopisuje do auta podany przebieg i rok
       (automatycznie przeliczając cenę wg powyższych funkcji) */
    zmienPrzebiegRok(przebieg, rok) {
        this.przebieg = przebieg;
        this.rok = rok;
        this.cena_koncowa = undefined;
        this.obliczCeneKoncowaWzgledemPrzebiegu();
        this.obliczCeneKoncowaWzgledemWieku();
    }
}

/* Funkcja, która dopisze auto do tablicy samochodow, jesli jego
   cena jest wieksza niz 10000 */
function czyWartoSprzedac(tablicaAut, auto) {
    if(typeof auto.cena_koncowa === 'number') {
        if(auto.cena_koncowa > 10000)
            return tablicaAut.push(auto);
        else
            return console.log("Nie warto sprzedawać tego auta. Przekręć licznik.")
    } else {
        return console.log("Cena końcowa nie została ustalona.")
    }
}

/* Funkcja, ktora operuje na tablicy obiektow typu auto. Dla
   wszystkich aut z tablicy zwieksza rok o 1. */
function odmlodzAuta(tablicaAut) {
    tablicaAut.map((obiekt) => {
        return obiekt.rok += 1;
    })
}




// stare rozwiązanie. Hard code bezpośrednio do obiektu
const autoPierwotne = { 
    rok: 2008,
    przebieg: 165000,
    cena_wyjsciowa: 30000,
    cena_koncowa: undefined,
    zwiekszCeneWyjsciowa: function() {
        return this.cena_wyjsciowa += 1000;
    },
    obliczCeneKoncowaWzgledemWieku: function() {
        const d = new Date();
        const roznica = (d.getFullYear() - this.rok) * 1000;
        if(typeof this.cena_koncowa !== "number") {
            this.cena_koncowa = this.cena_wyjsciowa - roznica;
        } else {
            this.cena_koncowa -= roznica;
        }
        return this.cena_koncowa;
    },
    obliczCeneKoncowaWzgledemPrzebiegu: function() {
        const roznica = (parseInt((this.przebieg / 100000)) * 10000);
        if(typeof this.cena_koncowa !== "number") {
            this.cena_koncowa = this.cena_wyjsciowa - roznica;
        } else {
            this.cena_koncowa -= roznica;
        }
        return this.cena_koncowa;
    },
    przebiegRok: function(przebieg, rok) {
        this.przebieg = przebieg;
        this.rok = rok;
        this.obliczCeneKoncowaWzgledemPrzebiegu();
        this.obliczCeneKoncowaWzgledemWieku();
    },
    czyWartoSprzedac: function(tablicaAut) {
        if(typeof this.cena_koncowa === 'number') {
            if(this.cena_koncowa > 10000)
                return tablicaAut.push(this);
        } else {
            return console.log("Cena końcowa nie została ustalona.")
        }
    },
    podkrecLicznik: function(tablicaAut) {
        tablicaAut.map((obiekt) => {
            return obiekt.rok += 1;
        })
    }
};




