// załadowanie dokumentu 
$(() => {
    console.log("jquery");

    // nasłuch na kafelki
    $(".container div").on("click", () => {
        // nasłuch na sąsiadujące z pustą przestrzenią kafelki
        $(".sasiaduje").on("click", (e) => move(e));

        // usunięcie nasłuchu
        // $(".sasiaduje").off();

        // usuwa klasy .sasiaduje i przelicza ich wystepowanie na nowo
        neighborChecker();

    });
    
    // przesuwanie kafelka
    function move(e) {
        
        // pozycja starego pustego kafelka i jego numer
        let staryPusty = $(".pusty");

        // usuwa część klas 
        $(e.target).removeClass("obrazek sasiaduje");

        // pobiera fragment obrazka
        let className = $(e.target).attr("class");

        // usuwa resztę klas
        $(e.target).removeClass();

        // i zmienia jego widoczność 
        $(e.target).addClass("pusty");

        // zmiana klas w pustym kafelku
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
        switch(pos) {
            case 1: 
                $("#div2").addClass("sasiaduje");
                $("#div4").addClass("sasiaduje");
                break;
            case 2:
                $("#div1").addClass("sasiaduje");
                $("#div3").addClass("sasiaduje");
                $("#div5").addClass("sasiaduje");
                break;
            case 3:
                $("#div2").addClass("sasiaduje");
                $("#div6").addClass("sasiaduje");
                break;
            case 4:
                $("#div1").addClass("sasiaduje");
                $("#div5").addClass("sasiaduje");
                $("#div7").addClass("sasiaduje");
                break;
            case 5:
                $("#div2").addClass("sasiaduje");
                $("#div4").addClass("sasiaduje");
                $("#div6").addClass("sasiaduje");
                $("#div8").addClass("sasiaduje");
                break;
            case 6:
                $("#div3").addClass("sasiaduje");
                $("#div5").addClass("sasiaduje");
                $("#div9").addClass("sasiaduje");
                break;
            case 7: 
                $("#div4").addClass("sasiaduje");
                $("#div8").addClass("sasiaduje");
                break;
            case 8:
                $("#div5").addClass("sasiaduje");
                $("#div7").addClass("sasiaduje");
                $("#div9").addClass("sasiaduje");
                break;
            case 9:
                $("#div6").addClass("sasiaduje");
                $("#div8").addClass("sasiaduje");
                break;
        }
    }

    // funkcja do zwracania pozycji przekazanego elementu
    function returnPosition(dom) {
        let id = dom.attr("id");
        let num = id.charAt(3);
        return num;
    }


});