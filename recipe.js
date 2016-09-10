$(document).ready(function(){
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
  
  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });
})

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.showMe = false;
    $scope.myFunc = function() {
        $scope.showMe = !$scope.showMe;
    }
});

var i=0;
var sums = [];
function description(id1){
	$.ajax({
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+id1+'/summary', // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {
		id:id1
	}, // Additional parameters here
    dataType: 'json',
    success: function(data) { 
		console.dir(data);
		sum = data["summary"];
		var text = document.createElement('p');
		text.innerHTML = sum;
		sums.push(text);	
		summaries(i);
		i++;
	},
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
		xhr.setRequestHeader("X-Mashape-Authorization", "XptQA26zqnmsh6mMAtakOfUkCHt4p1OWihUjsn47fsHxNZSBD8"); // Enter here your Mashape key
    }
});
	
}
//onClick="document.getElementById('portfolio').scrollIntoView();"

function doIt() { //outputs recipe data
	document.getElementById("showrec").innerHTML = "- R E C I P E S -";
	document.getElementById("dashes").innerHTML = "- - -";
	
	i = 0;
	sums = [];
	$.ajax({
	url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
	type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
	data: {
		ingredients:document.getElementById("mytext").value,
		number:5,
		ranking:2
	}, // Additional parameters here
	dataType: 'json',
	success: function(data) {
		//Change data.source to data.something , where something is whichever part of the object you want returned.
		//To see the whole object you can output it to your browser console using:
		console.log(data);
		document.getElementById("output").innerHTML=""; //clears results from last search
		var i;
		var ids = [];
		for (i=0;i<data.length;i++){ //i is the i-th object in the data array that we get from the API
			var id = data[i]["id"];
			var para = document.createElement("p"); //creates a paragraph element
			var a = document.createElement("a"); 
			var img = document.createElement('img'); //creates an image element
			var div = document.createElement('div'); //output is an empty div where we put all the recipe title/info
			var innerdiv = document.createElement('div');
			var paradiv = document.createElement('div');
			var b = document.createElement('br');
			
			
			a.innerHTML = data[i]["title"]; //makes the title a link
			a.href = data[i]["image"].replace("/recipeImages/", "/").replace(".jpg", "");
			a.target = "_blank";	
			para.appendChild(a); //puts the text elem in the paragraph elem	
			description(id);
			div.className = "divs";
			para.className = "paras";
			paradiv.className= "col-sm-7";
			paradiv.id = "para"+i; 
			paradiv.appendChild(para);

			img.src = data[i]["image"]; //sets image
			img.id = "image";
			
			innerdiv.id = 'recipe'+i;
			innerdiv.className = 'crop thumbnail col-sm-5';
			innerdiv.appendChild(img); //appends image element into div
			
			div.appendChild(paradiv);
			div.appendChild(innerdiv);
			
			
			document.getElementById("output").appendChild(div);
			document.getElementById("output").appendChild(b);
			
			}
			document.getElementById('portfolio').scrollIntoView();
		
		},
	error: function(err) { alert(err); },
	beforeSend: function(xhr) {
		xhr.setRequestHeader("X-Mashape-Authorization", "XptQA26zqnmsh6mMAtakOfUkCHt4p1OWihUjsn47fsHxNZSBD8"); // Enter here your Mashape key
	}
});
}

function summaries(i){
	console.dir(sums);
	document.getElementById("para"+i).appendChild(sums[i]);
	if (i==4){
		var anchors = document.querySelectorAll('a[href^="/"]');
		Array.prototype.forEach.call(anchors, function (element, index) {
    	element.href = "https://spoonacular.com" + element.href.substring(6);
    	element.target = "_blank";
});
	}

}

