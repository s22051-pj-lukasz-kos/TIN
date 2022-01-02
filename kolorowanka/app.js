// funkcja na zaladowanie dokumentu
$(() => {
    console.log("jquery works");
    
    //przykładowa funkcja na klikniecie diva w obszarze roboczym
    $("#right div").click(function(e){
      var index = $(e.target).index('#right div');
      console.log(index);
    });

    // zmienne
    let color = $("#color").val();
    let selectOption = $("select option:selected").val();

    // nasłuch na przycisk
    $("#wlacz").click(() => {
      /* 
        W pierwszej kolejności należy wyłączyć nasłuch na eventy, 
        inaczej funkcje będą powielane. Robimy to z każdym selektorem z osobna, 
        któremu włączyliśmy nasłuch.  
      */
      $("#right").off();
      $("#right div").off();
      // pobieranie danych z input#color oraz select#opcja
      color = $("#color").val();
      selectOption = $("select option:selected").val();
      menu(color, selectOption);
    })

    // switch na opcje, menu
    function menu(color, selectOption) {
      switch (selectOption) {
        case "1":
          painting(color);
          break;
        case "2":
          addDiv();
          break;
        case "3":
          removeDiv();
          break;
        case "4":
          moveDiv();
          break;
        case "5":
          borderColor(color);
          break;
        case "6":
          borderRadius();
          break;
        default:
          alert($("select option:selected").val());
          break;
      }
    }

    // kolorowanie diva
    function painting(color) {
      $("#right div").click((e) => {
        $(e.target).css("backgroundColor", color);
      });
    }

    // dodawanie diva
    function addDiv() {
      $("#right").click((e) => {
        $(e.target).append(document.createElement("div"));
      });
    }

    // usuwanie diva
    function removeDiv() {
      $("#right div").click((e) => {
        $(e.target).remove();
      });
    }

    // przenoszenie diva
    function moveDiv() {
      let divToMove = null;
      $("#right").click((e) => {
        if (divToMove) {
          $(e.target).append(divToMove);
          divToMove = null;
        } else {
          // warunek uniemożliwia 'wycięcie' #right
          if(e.target.id != "right"){
            divToMove = $(e.target).detach();
          }
        }
      });
    }

    // kolorowanie ramki
    function borderColor(color) {
      $("#right").click((e) => {
         $(e.target).css("borderColor", color);
      });
    }

    // dodawanie zaokrąglonego diva
    function borderRadius() {
      $("#right").click((e) => {
        $(e.target).append(() => {
          let newDiv = document.createElement("div");
          $(newDiv).css("borderRadius", "30%");
          return newDiv;
        });
      });
    }
})