$(() => {
  console.log("jquery works!");

  // płótno
  let can = document.getElementById("katomierz").getContext("2d");
  let can2 = document.getElementById("katomierz2").getContext("2d");

  // poszczególne ustawienia
  const baerwald = {
    np1: 660,
    np2: 1209,
  };
  const loefgren = {
    np1: 703,
    np2: 1166,
  };
  const stevenson = {
    np1: 603,
    np2: 1174,
  };

  // klasa do tworzenia współrzędnych
  class Coordinates {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  // zmienna zawierająca współrzędne trzpienia
  const spindle = new Coordinates(400, 800);
  let armPivot = new Coordinates(400, undefined);

  // klasa do wyszukiwania współrzędnych punktów zerowych
  class NullPointsCoord extends Coordinates {
    constructor(alignment, y) {
      let x = Math.sqrt(Math.pow(alignment.np1, 2) - Math.pow(y, 2));
      super(x, y);
      this.alignment = alignment;
    }
  }

  /*
    klasa zawierająca informacje startowe:
    mount dist, współrzędne osi ramienia gramofonu, współrzędne trzpienia 
  */
  class MountingDistanceParams {
    constructor(mountingDistanceMM, spindle, armPivot) {
      let armPivotY = spindle.y - mountingDistanceMM * 10;
      this.armPivot = armPivot;
      this.armPivot.y = armPivotY;
      this.mountingDistance = mountingDistanceMM * 10;
      this.spindle = spindle;
    }
  }

  /* 
    tablica do przechowywania parametrów
    dla poszczególnych wewnętrznych punktów zerowych 
  */
  let calcComponents = [];

  // klasa licząca parametry
  class CalcComponent {
    constructor(mountingDistanceParams, nullPointsCoord) {
      this.mountingDistanceParams = mountingDistanceParams;
      this.nullPointsCoord = nullPointsCoord;
      this.effectiveLength = this.calcEffectiveLength();
      this.overhang = this.calcOverhang();
      this.innerLOC = this.calcInnerLOC();
      this.locDifference = this.calcLocDifference();
    }

    // odległość skuteczna dla podanego wewnętrznego punktu zerowego
    calcEffectiveLength() {
      let effectiveLength = 0;
      effectiveLength = Math.hypot(
        this.nullPointsCoord.x - this.mountingDistanceParams.armPivot.x,
        this.nullPointsCoord.y + this.mountingDistanceParams.mountingDistance
      );
      return effectiveLength;
    }

    // przewieszenie
    calcOverhang() {
      let overhang = 0;
      overhang =
        this.effectiveLength - this.mountingDistanceParams.mountingDistance;
      return overhang;
    }

    /* 
    Prawo cosinusów.
    Przekazany argument decyduje o obliczeniach dla konkretnego punktu zerowego
    1 liczy kąt dla wewnętrznego punktu zerowego
    2 liczy kąt dla zewnętrznego punktu zerowego
    */
    lawOfCosines(number) {
      let loc = 0;
      if (number === 1) {
        loc =
          (Math.pow(this.nullPointsCoord.alignment.np1, 2) +
            Math.pow(this.effectiveLength, 2) -
            Math.pow(this.mountingDistanceParams.mountingDistance, 2)) /
          (2 * this.nullPointsCoord.alignment.np1 * this.effectiveLength);
      } else if (number === 2) {
        loc =
          (Math.pow(this.nullPointsCoord.alignment.np2, 2) +
            Math.pow(this.effectiveLength, 2) -
            Math.pow(this.mountingDistanceParams.mountingDistance, 2)) /
          (2 * this.nullPointsCoord.alignment.np2 * this.effectiveLength);
      }
      return loc;
    }

    // oblicz kąt dla wewnętrznego punktu zerowego
    calcInnerLOC() {
      let loc = 0;
      loc = this.lawOfCosines(1);
      return loc;
    }

    // różnica w prawie cosinusów między punktami zerowymi
    calcLocDifference() {
      let outerLoc = 0;
      outerLoc = this.lawOfCosines(2);
      let locDifference = 0;
      locDifference = Math.abs(this.innerLOC - outerLoc);
      return locDifference;
    }
  }

  // nasłuch na przycisk od formularza
  $("#formBtn").on("click", () => {
    validateForm();
  });

  /* TODO:
    * napisać funkcję, która liczy dane dla poszczególnych pozycji wewnętrznego punktu zerowego i umieszcza je w tablicy
    * napisać funkcję, która iteruje tablicę i wyszukuje najmniejszą różnicę LOC między punktami i zwraca pożądane dane
    * przekierować dane do tablicy i do funkcji rysującej kątomierz
    * napisać rysowanie kątomierza wykorzystującego dane z argumentów
    
    * wykres pokazujący przestery (W OSTATECZNOŚCI)
  */

  //poniżej jest test płótna
  // płótno z kątomierzem
  drawCanvas(can);
  drawCanvas2(can2);

  // funkcja, która odpala się po wypełnieniu formularza i wciśnięciu przycisku
  function validateForm() {
    // pobiera odległość montażową z formularza
    let mountingDistance = document.forms["form"]["inputMountDist"].value;
    let mountingDistanceParams = new MountingDistanceParams(
      mountingDistance,
      spindle,
      armPivot
    );

    // pobiera typ kątomierza z formularza i na jego podstawie pobiera odpowiednie ustawienie
    let alignment;
    if ($("#radioBaer").prop("checked")) {
      alignment = baerwald;
    } else if ($("#radioLoef").prop("checked")) {
      alignment = loefgren;
    } else if ($("#radioSteven").prop("checked")) {
      alignment = stevenson;
    }

    // dokonuje obliczeń, by znaleźć najlepsze możliwe parametry dla poszczególnych ustawień

    let baerResult = calculations(mountingDistanceParams, baerwald);
    calcComponents = [];
    let loefResult = calculations(mountingDistanceParams, loefgren);
    calcComponents = [];
    let stevResult = calculations(mountingDistanceParams, stevenson);
    calcComponents = [];

    // następnie wywoływana jest funkcja, która umieszcza dane w tabeli
    if (
      parseFloat(mountingDistance) >= 150.0 &&
      parseFloat(mountingDistance) <= 500.0
    ) {
      fillTable(mountingDistanceParams, baerResult, loefResult, stevResult);
    }
    /*
      TODO:
      * następnie wywoływana jest funkcja, która wypełnia tabelę danymi
      * następnie wywoływana jest funkcja, która rysuje płótno w zależności od ustawień
    */
  }

  // funkcja licząca wszystkie parametry dla serii wewnętrznych punktów zerowych o różnych współrzędnych
  // zwraca szukane optymalne parametry dla gramofonu
  function calculations(mountingDistanceParams, alignment) {
    let y = 300;

    // dokonuje serii obliczeń dla wewnętrznego punktu zerowego
    do {
      let nullPointsCoord = new NullPointsCoord(alignment, y);
      let calcComponent = new CalcComponent(
        mountingDistanceParams,
        nullPointsCoord
      );

      // jeśli różnica między wewnętrznym, a zewnętrznym kątem przegięcia jest większa niż jeden stopień to przyśpiesz liczenie
      if (calcComponent.locDifference > 0.02) {
        y -= 20;
      } else {
        // lub dodaj do tablicy
        y -= 1;
        calcComponents.push(calcComponent);
      }
    } while (y >= 0);

    // przeszukuje tablicę i zwraca szukany element
    calcComponents.sort((a, b) => {
      return a.locDifference - b.locDifference;
    });
    return calcComponents[0];
  }

  // funkcja do wypełniania tablicy na stronie
  function fillTable(
    mountingDistanceParams,
    baerResult,
    loefResult,
    stevResult
  ) {
    // odległość montażowa
    let mountingDistance = mountingDistanceParams.mountingDistance / 10;
    $("#baerMountingDistance").text(mountingDistance);
    $("#loefMountingDistance").text(mountingDistance);
    $("#stevMountingDistance").text(mountingDistance);

    // odległość skuteczna
    $("#baerEffectiveLength").text(
      (baerResult.effectiveLength / 10).toFixed(2)
    );
    $("#loefEffectiveLength").text(
      (loefResult.effectiveLength / 10).toFixed(2)
    );
    $("#stevEffectiveLength").text(
      (stevResult.effectiveLength / 10).toFixed(2)
    );

    // przewieszenie
    $("#baerOverhang").text((baerResult.overhang / 10).toFixed(2));
    $("#loefOverhang").text((loefResult.overhang / 10).toFixed(2));
    $("#stevOverhang").text((stevResult.overhang / 10).toFixed(2));

    // kąt przegięcia
    $("#baerOffsetAngle").text(getDegrees(baerResult));
    $("#loefOffsetAngle").text(getDegrees(loefResult));
    $("#stevOffsetAngle").text(getDegrees(stevResult));

    // przesunięcie liniowe
    $("#baerLinearOffset").text(linearOffset(baerResult));
    $("#loefLinearOffset").text(linearOffset(loefResult));
    $("#stevLinearOffset").text(linearOffset(stevResult));

    // wewnętrzny punkt zerowy
    $("#baerInnerNullPoint").text(
      baerResult.nullPointsCoord.alignment.np1 / 10
    );
    $("#loefInnerNullPoint").text(
      loefResult.nullPointsCoord.alignment.np1 / 10
    );
    $("#stevInnerNullPoint").text(
      stevResult.nullPointsCoord.alignment.np1 / 10
    );

    // zewnętrzny punkt zerowy
    $("#baerOuterNullPoint").text(
      baerResult.nullPointsCoord.alignment.np2 / 10
    );
    $("#loefOuterNullPoint").text(
      loefResult.nullPointsCoord.alignment.np2 / 10
    );
    $("#stevOuterNullPoint").text(
      stevResult.nullPointsCoord.alignment.np2 / 10
    );
  }

  // funkcja do konwersji LOC na kąt w stopniach
  function getDegrees(result) {
    let asin = Math.asin(result.innerLOC);
    let degrees = asin * (180 / Math.PI);
    return degrees.toFixed(2);
  }

  // funkcja do liczenia przesunięcia liniowego
  function linearOffset(result) {
    let linear = (result.effectiveLength / 10) * result.innerLOC;
    return linear.toFixed(2);
  }

  function drawCanvas(canvas) {
    // oś talerza, trzpień
    canvas.beginPath();
    canvas.arc(400, 800, 35, 0, 2 * Math.PI);
    canvas.closePath();
    canvas.stroke();

    // krzyżyk na trzpieniu
    canvas.strokeStyle = "#ff0000";
    canvas.beginPath();
    canvas.moveTo(380, 800);
    canvas.lineTo(420, 800);
    canvas.moveTo(400, 780);
    canvas.lineTo(400, 820);
    canvas.stroke();
    canvas.strokeStyle = "#000000";

    // ostatnia wewnętrzna ścieżka płyty
    canvas.beginPath();
    canvas.arc(400, 800, 603, 0, 2 * Math.PI);
    canvas.closePath();
    canvas.stroke();

    // wewnętrzny punkt zerowy
    canvas.beginPath();
    canvas.arc(400, 800, 660, 0, 2 * Math.PI);
    canvas.closePath();
    canvas.stroke();

    // zewnętrzny punkt zerowy
    canvas.beginPath();
    canvas.arc(400, 800, 1209, 0, 2 * Math.PI);
    canvas.closePath();
    canvas.stroke();

    // zewnętrzna ścieżka odtwarzania na płycie
    canvas.beginPath();
    canvas.arc(400, 800, 1406, 0, 2 * Math.PI);
    canvas.closePath();
    canvas.stroke();

    // odległość skuteczna; łuk, jaki zatacza ramię gramofonu
    canvas.beginPath();
    canvas.arc(400, -4200, 5079, 0, 2 * Math.PI);
    canvas.closePath();
    canvas.stroke();

    // linia łącząca wewnętrzny punkt zerowy z osią obrotu ramienia
    canvas.beginPath();
    canvas.moveTo(400, -4200);
    canvas.lineTo(1059, 836);
    canvas.stroke();

    // linia łącząca zewnętrzny punkt zerowy z osią obrotu ramienia
    canvas.beginPath();
    canvas.moveTo(400, -4200);
    canvas.lineTo(1607, 733);
    canvas.stroke();

    // TODO:
    // prosta linia jako wzornik pod skalowanie
  }

  function drawCanvas2(canvas) {
    // oś talerza, trzpień
    canvas.beginPath();
    canvas.arc(400, 800, 35, 0, 2 * Math.PI);
    canvas.closePath();
    canvas.stroke();

    // krzyżyk na trzpieniu
    canvas.strokeStyle = "#ff0000";
    canvas.beginPath();
    canvas.moveTo(380, 800);
    canvas.lineTo(420, 800);
    canvas.moveTo(400, 780);
    canvas.lineTo(400, 820);
    canvas.stroke();
    canvas.strokeStyle = "#000000";

    // ostatnia wewnętrzna ścieżka płyty
    canvas.beginPath();
    canvas.arc(400, 800, 603, 0, 2 * Math.PI);
    canvas.closePath();
    canvas.stroke();

    // wewnętrzny punkt zerowy
    canvas.beginPath();
    canvas.arc(400, 800, 660, 0, 2 * Math.PI);
    canvas.closePath();
    canvas.stroke();

    // zewnętrzny punkt zerowy
    canvas.beginPath();
    canvas.arc(400, 800, 1209, 0, 2 * Math.PI);
    canvas.closePath();
    canvas.stroke();

    // zewnętrzna ścieżka odtwarzania na płycie
    canvas.beginPath();
    canvas.arc(400, 800, 1406, 0, 2 * Math.PI);
    canvas.closePath();
    canvas.stroke();

    // odległość skuteczna; łuk, jaki zatacza ramię gramofonu
    canvas.beginPath();
    canvas.arc(400, -700, 1746, 0, 2 * Math.PI);
    canvas.closePath();
    canvas.stroke();

    // linia łącząca wewnętrzny punkt zerowy z osią obrotu ramienia
    canvas.beginPath();
    canvas.moveTo(400, -700);
    canvas.lineTo(1049, 921);
    canvas.stroke();

    // linia łącząca zewnętrzny punkt zerowy z osią obrotu ramienia
    canvas.beginPath();
    canvas.moveTo(400, -700);
    canvas.lineTo(1589, 579);
    canvas.stroke();

    // TODO:
    // prosta linia jako wzornik pod skalowanie
  }
});
