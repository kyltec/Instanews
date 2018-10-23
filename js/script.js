$(document).ready(function() {
  // js code
  $("select").selectric();

  $("#category").on("change", function(event) {
    event.preventDefault;
    let selected = $(this).val();
    let url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
    url +=
      "?" +
      $.param({
        "api-key": "1a105db8955341c29606cfcfb8c3c1b2"
      });

    $(".loading").append("<img src='../../images/ajax-loader.gif'>");
    $(".cashe").css("display", "flex");
    $("header").addClass("nav");
    $("header").removeClass("flex-container");
    $("img").addClass("logo");

    $.ajax({
      method: "GET",
      url: url,
      dataType: "JSON"
    })
      .done(function(data) {
        $(".cashe").empty();
        console.log(data);

        let sift = data.results.filter(function(value) {
          return value.multimedia.length;
        });
        const slicedArray = sift.slice(0, 12);

        $.each(slicedArray, function(key, value) {
          console.log("ran");
          $(".cashe").append(
            `<a href="${value.url}">
            <div class="article" style=" 
                  background:url(${
                    value.multimedia[4].url
                  });background-size:cover;"
                  >
            <p>${value.abstract}</p>
            </div></a>`
          );
        });
      })

      .always(function() {
        $("div").removeClass(".loading");
      })

      .fail(function() {
        $(".cashe").empty();
        $(".cashe").append("<p> Sorry please try again</p>");
      });
  });
});
