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
    })
      .done(function(data) {
        $(".cashe").empty();
        console.log(data);

        // const sift = data.results.filter(multimedia.length[5]);

        let sift = data.results.filter(function(value) {
          return value.multimedia.length;
        });
        const slicedArray = data.results.slice(0, 12);

        $.each(slicedArray, function(key, value) {
          console.log("ran");
          $(".cashe").append(
            `<a href="${value.url}">
            <div class="article" style=" 
                  background:url(${
                    value.multimedia[4].url
                  });background-size:cover; display:flex";
                  >
            <p style="background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))">${
              value.abstract
            }</p>
            </div></a>`
          );
        });
      })
      .fail(function() {
        $(".cashe").empty();
        $(".cashe").append("<p> Sorry please try again</p>");
      });
  });
});
