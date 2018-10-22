$(document).ready(function() {
  // js code
  // let url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  // url +=
  //   "?" +
  //   $.param({
  //     "api-key": "1a105db8955341c29606cfcfb8c3c1b2"
  //   });

  $("#category").on("change", function(event) {
    event.preventDefault;
    let selected = $(this).val();
    let url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
    url +=
      "?" +
      $.param({
        "api-key": "1a105db8955341c29606cfcfb8c3c1b2"
      });
    console.log(selected);

    $.ajax({
      method: "GET",
      url: url
    }).done(function(data) {
      $(".cashe").empty();
      console.log(data);

      $.each(data.results, function(key, value) {
        $(".cashe")
          .append("<p>" + value.abstract + "</p>")
          .append("<img src=" + value.multimedia[4].url + ">");
      }).fail(function() {
        $(".cashe").empty();
        $(".cashe").append("<p> Sorry please try again");
      });
    });
  });
});
