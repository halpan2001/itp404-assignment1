$("#submit").on('click', function(event){
  event.preventDefault();
  let loadhtml= '<div class="loader">Loading...</div>';
  $('#results').html(loadhtml);

  let url = "https://www.reddit.com/r/";

  let searchterm = $('#searchterm').val();
  url += searchterm;
  url += ".json";

  // console.log(url)

  let promise = $.ajax({
    type:'GET',
    url: url
  });

  promise.then(function(response){
    console.log('success', response);
    let html='';

    //forEach is a type of for loop thingy, but a nice version
    response.data.children.forEach(function(thread){
    //`` allow to enter variables with ${}
      html +=`
      <h2>${thread.data.title}</h2>
      <h4> Score: ${thread.data.score} </h4>
      <h5> Author: ${thread.data.author} </h5>
      `;

      thread.data.preview.images.forEach(function(image){
          html +=`
          <img class="pic" src="${image.source.url}">
          `
      });
    });



    $('#results').html(html);

  }, function(){
    console.log('error');
  });

});
