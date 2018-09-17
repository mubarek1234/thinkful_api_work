const youTube_URL = "https://www.googleapis.com/youtube/v3/search";

function get_YouTube_API(curr, callback){
  const settings ={
    url: youTube_URL,
    id:{
      kind:'youtube#video'
    },
    data : {
      part:'snippet',
      key:'AIzaSyA_btGl7SDfpHrSXexVkeSNiXW5111kg0w',
      q: `${curr}`
    },
    dataType: 'json',
    type: 'GET',
    maxResults:5,
    success: callback

  }

  $.ajax(settings);
}

function renderResult(items){

  if(items.id.kind === 'youtube#video'){
  console.log(items);
  return `<div>
      <a href = "https://www.youtube.com/watch?v=${items.id.videoId}"><img src = "${items.snippet.thumbnails.medium.url}" alt = "Thumbnail of pic"></a>
    </div>`; 
  }
} 


function displayYouTubeSearchData(data) {
  //.map helps iterate through every element.
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').append(results);
}

function get_Input(){
  $("form").submit(function(event){
    event.preventDefault();
    let curr = $('.insertInfo').val();
    get_YouTube_API(curr, displayYouTubeSearchData);
  });
}

$(get_Input);