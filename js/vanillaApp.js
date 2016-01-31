
   // this function takes the question object returned by the StackOverflow request
   // and returns new results to be appended to DOM
var showQuestion = function(question) {

  
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


document.getElementById('unanswered-getter').addEventListener('submit',function(e){
	  e.preventDefault();
	  document.getElementById('results').innerHTML+="";
	  var tags = document.getElementById('tags').value;
	  getUnanswered(tags);


});