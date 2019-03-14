(function($) {

  $(document).ready(function() {
    var responsiveBoundary = 768;
    var switched = false;

    var updateTables = function() {

      if (window.matchMedia("(max-width:" + responsiveBoundary + "px)").matches && !switched ) {
        switched = true;
        $("table.responsive").each(function(i, element) {
          splitTable($(element));
        });

        return true;
      }
      if (switched && window.matchMedia("(min-width:" + (responsiveBoundary-0.02) + "px)").matches) {
        switched = false;
        $("table.responsive").each(function(i, element) {
          unsplitTable($(element));
        });
      }

      $(window).trigger('responsiveTables:postDraw');
    };

    $(window).on('load',updateTables);
    $(window).on("redraw",function(){switched=false;updateTables();}); // An event to listen for
    $(window).on("resize", updateTables);


    function splitTable(original)
    {
      original.wrap("<div class='table-wrapper'>");

      var copy = original.clone();
      copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
      copy.removeClass("responsive");

      original.closest(".table-wrapper").append(copy);
      copy.wrap("<div class='pinned'>");
      original.wrap("<div class='scrollable'>");

      setCellHeights(original, copy);
      setTableHeights(original, copy);
    }

    function unsplitTable(original) {
      original.closest(".table-wrapper").find(".pinned").remove();
      original.unwrap();
      original.unwrap();
    }

    function setCellHeights(original, copy) {
      $('tr', original).each(function(index){
        oheight = $(this).height();
        cheight = $('tr:eq('+index+')', copy).height();
        height = (oheight > cheight ? oheight : cheight);
        $('tr:eq('+index+') td', original).css('height', height+'px');
        $('tr:eq('+index+') td', copy).css('height', height+'px');
      });
    }

    function setTableHeights(original, copy) {
      oheight = original.outerHeight();
      cheight = copy.outerHeight();
      height = (oheight > cheight ? oheight : cheight);
      original.css('min-height', height+'px');
      copy.css('min-height', height+'px');
    }

  });

})(jQuery);
