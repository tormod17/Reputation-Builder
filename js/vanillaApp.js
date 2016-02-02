//link, title, time, date, user rep
   // this function takes the question object returned by the StackOverflow request
   // and returns new results to be appended to DOM
var showQuestion = function(questions) {
    questions.items.sort(function(a,b) {
        return a.owner.reputation - b.owner.reputation;
    });

    result = [];

    questions.items.forEach(function(el) {
        result.append({
            title: el.title,
            link: el.link,
            creation: el.creation_date,
            rep: el.owner.reputation,
        });
    });

    return result;
};


// this function takes the results object from StackOverflow
// and returns the number of results and tags to be appended to DOM
var showSearchResults = function(query, resultNum) {
    var results = resultNum + ' results for <strong>' + query + '</strong>';
    return results;
};


// takes a string from input and searches
// for unaswered questions on StackOverflow API.

var getUnanswered = function(tags) {

};

var getTopAnswerers = function(tags) {
  var request = new XMLHttpRequest();
  var url = "https://api.stackexchange.com/" + tags + "/2.2/tags/css/top-answerers/all_time?site=stackoverflow";
  requet.open("GET", url, false);
  request.send();
  
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
