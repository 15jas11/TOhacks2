function getPhrase(placeID){
  var xhr = new XMLHttpRequest();
  var url = "https://tohacks18.herokuapp.com/predict";
  xhr.open("POST", url, true);

 debugger;
  var setPolarity = function(result) {
      console.log(result);
      getReviews(result);
  }

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var json = JSON.parse(xhr.responseText);
          setPolarity(json);
      }
  };

  var data = JSON.stringify({"placeID": placeID});
  xhr.send(data);

}


function submitAns(){
  //var review = document.getElementById("ReviewInput").value;
 getPhrase(document.getElementById("placeID").value);
}

function getColor(accuracy){
  var percentage = accuracy;
if (percentage <= 100 && percentage >= 75){
  return "00b200";
} else if (percentage < 75 && percentage >= 50){
  return "#07ce07";
} else if (percentage < 50 && percentage >= 25){
  return "ff0000";
} else if (percentage < 25 && percentage >= 0) {
  return "cc0000";
} else{
  console.log("else");
  return "000000"
}
}

function getAccuracy(accuracy){
  var color = getColor(accuracy);
  return "<div style = \"background-color:" + color +"; margin:1%; width:100%; height:5%; text-align:center; padding-top:0.7%;\">"+ "Accuracy: " +  accuracy + "%" + "</div>" +  "<hr>" ;
}

function getReviews(inputJSON){

    console.log(inputJSON);
    var reviews = inputJSON;
    console.log(reviews.text);

    if(reviews.text == "no reviews exist"){
      bigOne.innerHTML =  "<div> This location does not have any reviews </div>";
    }else{
    bigOne.innerHTML = Object.values(reviews).map(function(reviews) {
          return "<div>"
          + "<div style = \"float:left; margin-right:5px;\">"
              + "<img src=\"" + reviews.profile_photo_url + " \" alt=\"N/a\" height=\"75\" width=\"75\">" +
          "</div>"
          + "Name: " + reviews.author_name
          + "<br>"
          + "Rating: " + reviews.rating
          + "<br> "
          + "Time: " + reviews.relative_time_description + " " +
           "<br>" + reviews.text +
           "<br>" + getAccuracy(reviews.accuracy.toFixed(2));

     }).join('');
}
     console.log(reviews);
 }
