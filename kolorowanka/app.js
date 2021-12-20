//funkcja na zaladowanie dokumentu
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
      $("#right div").off();
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
        // bez zatrzymania propagacji w górę drzewka DOM, e.target koloruje divy przodków
        e.stopPropagation();  
        $(e.target).css("backgroundColor", color);
      });
    }

    // dodawanie diva
    function addDiv() {
      $("#right div").click((e) => {
        /* 
        bez zatrzymania propagacji w górę drzewka DOM, 
        e.target dodaje n divów w zależności od głębokości n względem div#right
        */
        e.stopPropagation();
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
      let divToMove;
      $("#right div").click((e) => {
        /* 
          bez zatrzymania propagacji w górę drzewka DOM, 
          detach() działa w sposób nieprzewidywany
        */
        e.stopPropagation();
        if (divToMove) {
          $(e.target).append(divToMove);
          divToMove = null;
        } else {
          divToMove = $(e.target).detach();
        }
      });
    }

    // kolorowanie ramki
    function borderColor(color) {
      $("#right div").click((e) => {
         $(e.target).css("borderColor", color);
      });
    }

    // dodawanie zaokrąglonego diva
    function borderRadius() {
      $("#right div").click((e) => {
        /* 
        bez zatrzymania propagacji w górę drzewka DOM, 
        e.target dodaje n divów w zależności od głębokości n względem div#right
        */
        e.stopPropagation();
        $(e.target).append(() => {
          let newDiv = document.createElement("div");
          $(newDiv).css("borderRadius", "30%");
          return newDiv;
        });
      });
    }
})