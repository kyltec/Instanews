$(document).ready(function() {
  // js code
  $("select").selectric();
  const $loader = $(".loading").append("<img src='./images/ajax-loader.gif'>");
  let $body = $(".cashe");

  $("#category").on("change", function(event) {
    event.preventDefault;
    let selected = $(this).val();

    $body.css("display", "flex");
    $("header").addClass("nav");
    $("header").removeClass("flex-container");
    $("img").addClass("logo");

    $loader;
    getStories(selected);
  });
});

function getStories(selected) {
  let url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
  url +=
    "?" +
    $.param({
      "api-key": "1a105db8955341c29606cfcfb8c3c1b2"
    });
  let $body = $(".cashe");

  $.ajax({
    method: "GET",
    url: url,
    dataType: "JSON"
  })
    .done(function(data) {
      $body.empty();

      let sift = data.results.filter(function(value) {
        return value.multimedia.length;
      });
      const slicedArray = sift.slice(0, 12);

      for (let value of slicedArray) {
        const { url, multimedia, abstract } = value;
        $body.append(
          `<a href="${url}">
            <div class="article" style=" 
                  background:url(${multimedia[4].url});background-size:cover;"
                  >
            <p>${abstract}</p>
            </div></a>`
        );
      }
    })

    .always(function() {
      $("div").removeClass(".loading");
    })

    .fail(function() {
      $body.empty();
      $body.append("<p> Sorry please try again</p>");
    });
}
