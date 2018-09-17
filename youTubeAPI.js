const youTube_URL = "https://www.googleapis.com/youtube/v3/search";
let numOfResults = 0;
let checkBoolean = false;

function get_YouTube_API(curr, callback){
  if(checkBoolean == true){
    numOfResults = 0;
  }

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
    maxResults:10,
    success: callback
  }

  $.ajax(settings);
}

function renderResult(items){
  if(items.id.kind === 'youtube#video'){
  console.log(items);
  numOfResults++;
  return `<div>
      <a href = "https://www.youtube.com/watch?v=${items.id.videoId}"><img src = "${items.snippet.thumbnails.medium.url}" alt = "Thumbnail of pic"></a>
    </div>`; 
    
  }
  console.log(numOfResults);
} 

function displayNumberOfResults(){
  console.log("in here");
  let results = $('.numberOfResults');
  results.html(`<p>Number of results:  ${numOfResults}</p>`);
  console.log(numOfResults);
}

function displayYouTubeSearchData(data) {
  //.map helps iterate through every element.
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').prop('hidden', false);
  $('.js-search-results').html(results);
  displayNumberOfResults();
  checkBoolean = true;
}

function get_Input(){
  $("form").submit(function(event){
    event.preventDefault();
    let curr = $('.insertInfo').val();
    get_YouTube_API(curr, displayYouTubeSearchData);
  });
}

$(get_Input);