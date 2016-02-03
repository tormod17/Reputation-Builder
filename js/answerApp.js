var showQuestion = function(question) {
   // this function takes the question object returned by the StackOverflow request
   // and returns new results to be appended to DOM
   
   var result = document.getElementById('results').innerHTML+=
   '<div> Question: ' + question.title +'</div>'+
   '<div> Asked: '+ new Date(1000 * question.creation_date)+'</div>'+
   '<div><a href='+question.link+'> Link : '+question.link+'</a></div>'+
   '<div> Views : '+question.view_count+'</div>'+
   '<div> Owner : '+question.owner.display_name+'</div>'+
   '<div> Owner Reputaition :'+question.owner.reputation+'</div>'+
   '</br>';
   
   return result;
};

var showSearchResults = function(query, resultNum) {
    var results = resultNum + ' results for <strong>' + query + '</strong>';
    return results;
};


var showError = function(error) {
    var errorElem = document.getElementById('results');
    var errorText = '<p>' + error + '</p>';
    errorElem.append(errorText);
};



var getUnanswered = function(tags) {

	var request = { 
		tagged: tags,
		site: 'stackoverflow',
		order: 'desc',
		sort: 'creation'
	};

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
        	var result = JSON.parse(xhttp.responseText);
            var searchResults = showSearchResults(request.tagged, result.items.length);
            document.getElementById('search-results').innerHTML += searchResults;
            ///code here to append all of the questions to the page. 
            console.log(result);
            result.items.forEach(function(question){
                console.log(question);
                showQuestion(question);
            });
        }
    };


    var url = "https://api.stackexchange.com/2.2/questions?";
    var  query = Object.keys(request).map(function(key) {
    return key + '=' + request[key];
	}).join('&');
	console.log(query);

    xhttp.open("GET", url + query, true);
    xhttp.send();
};


document.getElementById('unanswered-getter').addEventListener('submit',function(e){
	  e.preventDefault();
	  document.getElementById('results').innerHTML+="";
	  var tags = document.getElementById('tags').value;
	  getUnanswered(tags);

});