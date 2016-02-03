//link, title, time, date, user rep
   // this function takes the question object returned by the StackOverflow request
   // and returns new results to be appended to DOM
var parseQuestionData = function(questions) {
    // JSON.parse(questions).items.sort(function(a,b) {
    //     return a.owner.reputation - b.owner.reputation;
    // });

    var result = [];

    JSON.parse(questions).items.forEach(function(el) {
        result.push({
            title: el.title,
            link: el.link,
            creation: el.creation_date,
            name: el.owner.display_name,
            rep: el.owner.reputation,
        });
    });
    console.log(result);
    return result;
};

var parseAnswererData = function(questions) {
    // JSON.parse(questions).items.sort(function(a,b) {
    //     return a.user.reputation - b.user.reputation;
    // });

    var result = [];

    JSON.parse(questions).items.forEach(function(el) {
        result.push({
            name: el.user.display_name,
            displayPic: el.user.profile_image,
            link: el.user.link,
            rep: el.user.reputation,
            postCount: el.post_count,
            score: el.score
        });
    });
    console.log(result);
    return result;
};


// [{name: "bfof", displayPic: "url"}, {name: "bfof", displayPic: "url"}];

// this function takes the results object from StackOverflow
// and returns the number of results and tags to be appended to DOM
var appendQuestionResultsToDOM = function(results) {
  results.forEach(function(el) {
    var templateTitle = '<h3><a href="' + el.link + '">'+ el.title +'</a></h3>';
    var templateDate = '<p>' + el.creation + '</p>';
    var templateUserName = '<p>' + el.name + '</p>';
    var templateUserRep = '<p>' + el.rep + '</p>';

    var elementh3 = document.createElement('h3');
    var elementA = document.createElement('a');
    var elementp1 = document.createElement('p');
    var date = new Date(el.creation * 1000);
    elementA.href = el.link;
    elementA.innerHTML = el.title;
    elementh3.appendChild(elementA);
    elementp1.innerHTML = date.toISOString();

    document.getElementById('results').appendChild(elementh3);
    document.getElementById('results').appendChild(elementp1);

    // var newResult = document.createElement(templateTitle + templateDate + templateUserName + templateUserRep);
    // document.getElementById('results').appendChild(newResult);
  });
};


// takes a string from input and searches
// for unaswered questions on StackOverflow API.

var getUnanswered = function(tags) {
  var request = new XMLHttpRequest();
  var url = "https://api.stackexchange.com/2.2/questions/unanswered?order=desc&sort=activity&tagged=" + tags + "&site=stackoverflow";
  request.open("GET", url, false);
  request.send();

  var results = parseQuestionData(request.response);
  appendQuestionResultsToDOM(results);
};

var getTopAnswerers = function(tags) {
  var request = new XMLHttpRequest();
  var url = "https://api.stackexchange.com/" + tags + "/2.2/tags/css/top-answerers/all_time?site=stackoverflow";
  request.open("GET", url, false);
  request.send();

  var results = parseAnswererData(request.response);
};


document.getElementById('unanswered-getter').addEventListener('submit',function(e){
    e.preventDefault();
    document.getElementById('results').innerHTML+="";
    var tags = document.querySelector('#unanswered-getter input[type="text"]').value;
    getUnanswered(tags);
});

document.getElementById('inspiration-getter').addEventListener('submit',function(e){
    e.preventDefault();
    document.getElementById('results').innerHTML+="";
    var tags = document.querySelector('#inspiration-getter input[type="text"]').value;
    getTopAnswerers(tags);
});
