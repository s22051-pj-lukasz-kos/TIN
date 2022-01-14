// załadowanie dokumentu
$(() => {
  console.log("jquery");

  // tablica z ułożonymi puzzlami
  const arrayCorrect = [
    "obrazek1",
    "obrazek2",
    "obrazek3",
    "obrazek4",
    "obrazek5",
    "obrazek6",
    "obrazek7",
    "obrazek8",
    "pusty",
  ];

  // tablica na której wykonane jest przetasowanie
  let array = [...arrayCorrect];

  // przetasowanie tablicy
  shuffleArray(array);

  // przypisanie odpowiednich klas, czyli przetasowanie obrazków
  shufflePictures(array);

  // nasłuch na kafelki
  $(".container").on("click", ".sasiaduje", (e) => {
    // przesunięcie kafelki
    move(e);

    // usuwa klasy .sasiaduje i przelicza ich wystepowanie na nowo
    neighborChecker();

    // sprawdza czy kafelki są ułożone w odpowiedniej kolejności
    winChecker(arrayCorrect);
  });

  // przesuwanie kafelka
  function move(e) {
    // pozycja starego pustego kafelka i jego numer
    let staryPusty = $(".pusty");

    // usuwa część klas
    $(e.target).removeClass("obrazek sasiaduje");

    // pobiera pozycję obrazka
    let className = $(e.target).attr("class");

    // usuwa resztę klas
    $(e.target).removeClass();

    // i zmienia jego widoczność
    $(e.target).addClass("pusty");

    // zmiana widoczności w pustym kafelku
    staryPusty.removeClass("pusty");
    staryPusty.addClass("obrazek");

    // dodaję pozycję obrazka do dawnego pustego miejsca
    staryPusty.addClass(className);
  }

  // funkcja do przypisywania klasy .sasiaduje na nowo
  function neighborChecker() {
    // usuwa klasy sasiaduje
    $(".container div").removeClass("sasiaduje");

    // sprawdza gdzie jest pusty kafel
    let pusty = $(".pusty");
    let pos = returnPosition(pusty);

    // i dodaje odpowiednią klasę w zależności od występowania pustej kafli
    switch (pos) {
      case "1":
        $("#div2").addClass("sasiaduje");
        $("#div4").addClass("sasiaduje");
        break;
      case "2":
        $("#div1").addClass("sasiaduje");
        $("#div3").addClass("sasiaduje");
        $("#div5").addClass("sasiaduje");
        break;
      case "3":
        $("#div2").addClass("sasiaduje");
        $("#div6").addClass("sasiaduje");
        break;
      case "4":
        $("#div1").addClass("sasiaduje");
        $("#div5").addClass("sasiaduje");
        $("#div7").addClass("sasiaduje");
        break;
      case "5":
        $("#div2").addClass("sasiaduje");
        $("#div4").addClass("sasiaduje");
        $("#div6").addClass("sasiaduje");
        $("#div8").addClass("sasiaduje");
        break;
      case "6":
        $("#div3").addClass("sasiaduje");
        $("#div5").addClass("sasiaduje");
        $("#div9").addClass("sasiaduje");
        break;
      case "7":
        $("#div4").addClass("sasiaduje");
        $("#div8").addClass("sasiaduje");
        break;
      case "8":
        $("#div5").addClass("sasiaduje");
        $("#div7").addClass("sasiaduje");
        $("#div9").addClass("sasiaduje");
        break;
      case "9":
        $("#div6").addClass("sasiaduje");
        $("#div8").addClass("sasiaduje");
        break;
      default:
        console.log("Dziwny zwrot z returnPosition.");
    }
  }

  // funkcja do zwracania pozycji przekazanego elementu
  function returnPosition(dom) {
    let id = dom.attr("id");
    let num = id.charAt(3);
    return num;
  }

  // funkcja do tasowania tablicy
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // funkcja do tasowania obrazków
  function shufflePictures(array) {
    // usuń wszystkie klasy
    $(".container div").removeClass();

    // stwórz listę divów
    let divs = document.querySelectorAll(".container div");

    // przypisz im klasy z tablicy
    for (let index = 0; index < array.length; index++) {
      if (array[index] == "pusty") {
        divs[index].classList.add("pusty");
      } else {
        divs[index].classList.add(array[index], "obrazek");
      }
    }

    // na końcu ustaw klasy .sasiaduje
    neighborChecker();
  }

  // funkcja do sprawdzania czy wygrałeś
  function winChecker(array) {
    let flag = true;

    // stwórz listę divów
    let divs = document.querySelectorAll(".container div");

    // sprawdź kolejność z przekazaną tablicą
    for (let index = 0; index < array.length; index++) {
      if (!divs[index].classList.contains(array[index])) {
        flag = false;
        break;
      }
    }

    // jeśli kolejność się zgadza z tablicą to komunikat
    if (flag) {
      alert("BRAWO!!! Dokonałeś niemożliwego!!!");
    }
  }
});
