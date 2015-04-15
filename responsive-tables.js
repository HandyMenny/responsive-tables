(function($) {

  $(document).ready(function() {
    var responsiveBoundary = 767;
    var switched = false;

    var updateTables = function() {

      var scrollBarWidth = 0;

      if ( !(window.mozInnerScreenX === null) ) {
        scrollBarWidth = window.innerWidth - $("body").width();
      }

      if ( $(window).width() < responsiveBoundary - scrollBarWidth && !switched ) {
        switched = true;
        $("table.responsive").each(function(i, element) {
          splitTable($(element));
        });

        return true;
      }
      else if ( switched && ($(window).width() > responsiveBoundary - scrollBarWidth) ) {
        switched = false;
        $("table.responsive").each(function(i, element) {
          unsplitTable($(element));
        });
      }

      $(window).trigger('responsiveTables:postDraw');
    };

    $(window).load(updateTables);
    $(window).on("redraw",function(){switched=false;updateTables();}); // An event to listen for
    $(window).on("resize", updateTables);


    function splitTable(original)
    {
      original.wrap("<div class='table-wrapper' />");

      var copy = original.clone();
      copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
      copy.removeClass("responsive");

      original.closest(".table-wrapper").append(copy);
      copy.wrap("<div class='pinned' />");
      original.wrap("<div class='scrollable' />");

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
        $('td', original).css('height', height+'px');
        $('td', copy).css('height', height+'px');
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