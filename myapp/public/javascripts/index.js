const map = L.map('map',
{
    center: [0, 0],
    zoom: 3.5

});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      

      
      
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



fetch('/javascripts/GeoJSON.json')
.then(function(response) {
return response.json();
})
.then(function(geojson){
    for(var i=0;i<geojson.features.length;i++){
    console.log(geojson.features[i]);
    var feature=geojson.features[i];
    var coordinates=feature.geometry.coordinates;
    var lat = coordinates[1];
    var long = coordinates[0];
    var name = feature.properties.name;

    var marker = L.marker([lat, long]);
    marker.bindPopup(name).openPopup()
    marker.addTo(map);
    
    }
})
.catch(function(error){
    console.log('Error',error);
})
function hasComma(s) {
  return s.indexOf(',') >= 0;
}

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}
function isNumber(char) {
  return /^\d$/.test(char);
}
function hasDash(s) {
  return s.indexOf('-') >= 0;
}
let jsonData; // Variable to store the JSON data

function writeToJson(long, lat, extra) {
  let entry = "";

  if (extra) {
    entry = extra;
  }

  // Update the local JSON data
  const newObject = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [long, lat]
    },
    "properties": { "name": extra }
  };

  jsonData.features.push(newObject);

  // Convert the updated JSON data to a JSON string
  const updatedData = JSON.stringify(jsonData, null, 2);

  // Use the updated data within your application

  // Perform any other operations with the updated data

  console.log('JSON object added successfully!');
  console.log(JSON.stringify(updatedData));
  var marker = L.marker([lat, long]);
  if(extra){
  marker.bindPopup(entry).openPopup()
  }
  marker.addTo(map);
}

function fetchJsonData() {
  fetch('/javascripts/GeoJSON.json')
    .then(response => response.json())
    .then(data => {
      jsonData = data; // Store the fetched JSON data in the variable

      // Use the jsonData variable as needed within your application

      console.log('JSON data fetched successfully:', jsonData);
    })
    .catch(error => {
      console.error('Error reading file:', error);
    });
}

// Call the function to fetch the JSON data
fetchJsonData();
function countSpace(s){
let out =0;
for(let i=0;i<s.length;i++){
  if(s.charAt(i)===' '){
    out=out+1;
  }
}
return out;
}
function dataScrub(){

}
function removeCommas(str) {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    if (str[i] !== ',') {
      result += str[i];
    }
  }
  return result;
}
function removeDegree(str){
  var result = '';
  for (var i = 0; i < str.length; i++) {
    if (str[i] !== '°') {
      result += str[i];
    }
  }
  return result;
}
function dirCheck(northSouth,eastWest){
  let NS=northSouth.toUpperCase();
  let EW=eastWest.toUpperCase();
  if(NS=='N' || NS=='S' && EW=='E' || EW=='W'){
  return true;
  }else{
    return false;
  }
}
function numCheck(input){
  let out=false;
  for(let i=0;i<input.length;i++){
    if(isNumber(input.charAt(i))){  
      out=true;
    }else{
      return false;
    }
  }
  if(input.charAt(0)==0){
    out=false;
  }
  return out;
}
function hasdot(s){
  return s.indexOf('.') >= 0;
}
function hasMins(s){
  return s.indexOf("'") >= 0;
}
function hasSecs(s){
  return s.indexOf('"') >= 0;
}
function hasN(s){
  s=s.toUpperCase();
  return s.indexOf('N') >= 0;
}
function hasS(s){
  s=s.toUpperCase();
  return s.indexOf('S') >= 0;
}
function sixOrLess(s){
  let decimal=s.substring(s.indexOf('.')+1,s.length);
  if(decimal.length>6){
    return false;

  }else{
    return true;
  }
}
function hasNoLetters(string) {
  return /^[^a-zA-Z]+$/.test(string);
}
function findSpaceIndex(num,string) {
  let count = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === ' ') {
      count++;
      if (count === num) {
        return i;
      }
    }
  }
  return -1;
}
function degreeDecimalMins(input){
  const ERROR = "ERROR! Input text is not a valid coordinate";
  let extra;
  let coords=input;
  console.log(countSpace(coords));
  if(countSpace(coords)==6){
   
    extra=coords.substring(findSpaceIndex(6,coords),coords.length);
    coords=coords.substring(0,findSpaceIndex(6,coords));
    console.log(extra);
  }
  let pt1;
  let pt2;
  let mins1;
  let mins2;
  let pass=false;
  if(hasN(coords)){
    coords=coords.toUpperCase();
    pt1=coords.substring(0,coords.indexOf('N'));
    dir2=coords.charAt(coords.length-1);
    pt2=coords.substring(coords.indexOf('N')+2,coords.length);
    mins1=pt1.substring(pt1.indexOf('°')+2,pt1.length);
    pt1=pt1.substring(0,pt1.indexOf('°'));
    mins1=mins1.substring(0,mins1.indexOf("'"));
    
    mins2=pt2.substring(pt2.indexOf('°')+2,pt2.length);
    pt2=pt2.substring(0,pt2.indexOf('°'));
    mins2=mins2.substring(0,mins2.indexOf("'"));
    mins1=mins1/60;
    pt1=pt1*1;
    pt1=pt1+mins1;
    
    mins2=mins2/60;
    if(dir2=='W'){
      pt2=pt2*-1;

      pt2=pt2-mins2;
    }else{
      pt2=pt2*1;

      pt2=pt2+mins2;
    }
    if(hasNoLetters(pt1)&&hasNoLetters(pt2)){
      pass=true;
      
    }
    
  }else if(hasS(coords)){
    coords=coords.toUpperCase();
    pt1=coords.substring(0,coords.indexOf('S'));
    dir2=coords.charAt(coords.length-1);
    pt2=coords.substring(coords.indexOf('S')+2,coords.length);
    mins1=pt1.substring(pt1.indexOf('°')+2,pt1.length);
    pt1=pt1.substring(0,pt1.indexOf('°'));
    mins1=mins1.substring(0,mins1.indexOf("'"));
    
    mins2=pt2.substring(pt2.indexOf('°')+2,pt2.length);
    pt2=pt2.substring(0,pt2.indexOf('°'));
    mins2=mins2.substring(0,mins2.indexOf("'"));
    mins1=mins1/60;
    pt1=pt1*-1;
    pt1=pt1-mins1;
    
    mins2=mins2/60;
    if(dir2=='W'){
      pt2=pt2*-1;

      pt2=pt2-mins2;
    }else{
      pt2=pt2*1;

      pt2=pt2+mins2;
    }
    if(hasNoLetters(pt1)&&hasNoLetters(pt2)){
      pass=true;
      
    }
  }else{
    pass=false;
  }
  if(pass){
    document.getElementById("text").innerText=coords;
    writeToJson(pt2,pt1,extra);
  }else{
    document.getElementById("text").innerText=ERROR;
  }
}
function dmsHandle(input){
  const ERROR = "ERROR! Input text is not a valid coordinate";
  let extra;
  let coords=input;
  if(countSpace(coords)==8){
    extra=coords.substring(findSpaceIndex(8,coords),coords.length);
    coords=coords.substring(0,findSpaceIndex(8,coords));
  }
  let pt1;
  let pt2;
  let mins1;
  let mins2;
  let seconds1;
  let seconds2;
  let pass=false;
  if(hasN(coords)){
    coords=coords.toUpperCase();
    pt1=coords.substring(0,coords.indexOf('N'));
    dir2=coords.charAt(coords.length-1);
    pt2=coords.substring(coords.indexOf('N')+2,coords.length);
    mins1=pt1.substring(pt1.indexOf('°')+2,pt1.length);
    pt1=pt1.substring(0,pt1.indexOf('°'));
    seconds1=mins1.substring(mins1.indexOf("'")+2,mins1.length-2);
    mins1=mins1.substring(0,mins1.indexOf("'"));
    
    mins2=pt2.substring(pt2.indexOf('°')+2,pt2.length);
    pt2=pt2.substring(0,pt2.indexOf('°'));
    seconds2=mins2.substring(mins2.indexOf("'")+2,mins2.length-3);
    mins2=mins2.substring(0,mins2.indexOf("'"));
    mins1=mins1/60;
    seconds1=seconds1/3600;
    pt1=pt1*1;
    pt1=pt1+mins1+seconds1;
    
    mins2=mins2/60;
    seconds2=seconds2/3600;
    if(dir2=='W'){
      pt2=pt2*-1;

      pt2=pt2-mins2-seconds2;
    }else{
      pt2=pt2*1;

      pt2=pt2+mins2+seconds2;
    }
    if(hasNoLetters(pt1)&&hasNoLetters(pt2)){
      pass=true;
      
    }
    
  }else if(hasS(coords)){
    coords=coords.toUpperCase();
    pt1=coords.substring(0,coords.indexOf('S'));
    dir2=coords.charAt(coords.length-1);
    pt2=coords.substring(coords.indexOf('S')+2,coords.length);
    mins1=pt1.substring(pt1.indexOf('°')+2,pt1.length);
    pt1=pt1.substring(0,pt1.indexOf('°'));
    seconds1=mins1.substring(mins1.indexOf("'")+2,mins1.length-2);
    mins1=mins1.substring(0,mins1.indexOf("'"));
    
    mins2=pt2.substring(pt2.indexOf('°')+2,pt2.length);
    pt2=pt2.substring(0,pt2.indexOf('°'));
    seconds2=mins2.substring(mins2.indexOf("'")+2,mins2.length-3);
    mins2=mins2.substring(0,mins2.indexOf("'"));
    mins1=mins1/60;
    seconds1=seconds1/3600;
    pt1=pt1*-1;
    pt1=pt1-mins1-seconds1;
    
    mins2=mins2/60;
    seconds2=seconds2/3600;
    if(dir2=='W'){
      pt2=pt2*-1;

      pt2=pt2-mins2-seconds2;
    }else{
      pt2=pt2*1;

      pt2=pt2+mins2+seconds2;
    }
    if(hasNoLetters(pt1)&&hasNoLetters(pt2)){
      pass=true;
      
    }
  }else{
    pass=false;
  }





  if(pass){
    document.getElementById("text").innerText=coords;
    writeToJson(pt2,pt1,extra);
  }else{
    document.getElementById("text").innerText=ERROR;
  }
}
function useInputData(input){
  
}
function handleSubmit(){
    const input = document.getElementById("myInput").value;
    var coords = input;
    let long ="<NULL>";
    let lat ="<NULL>";
    let pt1;
    let pt2;
    let dir1;
    let dir2;
    let extra ="";
    let pass=false;
    const ERROR = "ERROR! Input text is not a valid coordinate";
    let total=countSpace(coords);
    if(hasMins(coords)&&hasSecs(coords)){
      dmsHandle(coords);
    }else if(hasMins(coords)){
      degreeDecimalMins(coords);
    }else{
    if(total==1){
      coords=removeCommas(coords);
      coords=removeDegree(coords);
      pt1=coords.substring(0,coords.indexOf(' '));
      pt2=coords.substring(coords.indexOf(' ')+1,coords.length);
      if(pt1.indexOf('N')>= 0||pt1.indexOf('S')>= 0||pt1.indexOf('n')>= 0||pt1.indexOf('s')>= 0){
        dir1=pt1.charAt(pt1.length-1);
        pt1=pt1.substring(0,pt1.length-1);
      }
      if(pt2.indexOf('E')>= 0||pt2.indexOf('W')>= 0||pt2.indexOf('e')>= 0||pt2.indexOf('w')>= 0){
        dir2=pt2.charAt(pt2.length-1);
        
        pt2=pt2.substring(0,pt2.length-1);
      }
      if(hasDash(pt1)&&dir1==null){
        dir1='S';
        pt1=pt1.substring(1,pt1.length);
      }else if(dir1==null){
        dir1='N';
      }if(hasDash(pt2)&&dir2==null){
        dir2='W';
        pt2=pt2.substring(1,pt2.length);
      }else if(dir2==null){
        dir2='E';
      }

      var numBool1=numCheck(pt1);
      if(!numBool1){
        numBool1=hasdot(pt1);
      }
      var numBool2=numCheck(pt2);
      if(!numBool2){
        numBool2=hasdot(pt2);
      }
      if(numBool1){
        numBool1=(sixOrLess(pt1));
      }
      if(numBool2){
        numBool2=(sixOrLess(pt2));
      }
      if(numBool1&&numBool2&&dirCheck(dir1,dir2)){
        
        pass=true;
        long=pt2;
        lat=pt1;

        coords=pt1 + "° "+dir1+", "+pt2+"° "+dir2;
        if(dir1=='S'||dir1=='s'){
        lat="-"+lat;
        }
        if(dir2=='W'||dir2=='w'){
        long="-"+long;
        }
        }else{
          pass=false;
        }
    }else if(total==2){
      coords=removeCommas(coords);
      coords=removeDegree(coords);
      pt1=coords.substring(0,coords.indexOf(' '));
      pt2=coords.substring(coords.indexOf(' ')+1,coords.length);
      extra=pt2.substring(pt2.indexOf(' ')+1,pt2.length);
      pt2=pt2.substring(0,pt2.indexOf(' '));

      if(pt1.indexOf('N')>= 0||pt1.indexOf('S')>= 0||pt1.indexOf('n')>= 0||pt1.indexOf('s')>= 0){
        dir1=pt1.charAt(pt1.length-1);
        pt1=pt1.substring(0,pt1.length-1);
      }
      if(pt2.indexOf('E')>= 0||pt2.indexOf('W')>= 0||pt2.indexOf('e')>= 0||pt2.indexOf('w')>= 0){
        dir2=pt2.charAt(pt2.length-1);
        
        pt2=pt2.substring(0,pt2.length-1);
      }
      if(hasDash(pt1)&&dir1==null){
        dir1='S';
        pt1=pt1.substring(1,pt1.length);
      }else if(dir1==null){
        dir1='N';
      }if(hasDash(pt2)&&dir2==null){
        dir2='W';
        pt2=pt2.substring(1,pt2.length);
      }else if(dir2==null){
        dir2='E';
      }
      var numBool1=numCheck(pt1);
      if(!numBool1){
        numBool1=hasdot(pt1);
      }
      var numBool2=numCheck(pt2);
      if(!numBool2){
        numBool2=hasdot(pt2);
      }
      if(numBool1){
        numBool1=(sixOrLess(pt1));
      }
      if(numBool2){
        numBool2=(sixOrLess(pt2));
      }
      
      if(numBool1&&numBool2&&dirCheck(dir1,dir2)){
        
        
        pass=true;
        long=pt2;
        lat=pt1;
      
        coords=pt1 + "° "+dir1+", "+pt2+"° "+dir2+", "+extra;
        if(dir1=='S'||dir1=='s'){
        lat="-"+lat;
        }
        if(dir2=='W'||dir2=='w'){
        long="-"+long;
        }
        }else{
          pass=false;
        }
        
      
    }else if(total==3){
      coords=removeCommas(coords);
      coords=removeDegree(coords);
      pt1=coords.substring(0,coords.indexOf(' '));
      dir1=coords.substring(coords.indexOf(' ')+1,coords.length);
      
      pt2=dir1.substring(dir1.indexOf(' ')+1,dir1.length);
      dir1=dir1.charAt(0);
      dir2=pt2.substring(pt2.indexOf(' ')+1,pt2.length);
      pt2=pt2.substring(0,pt2.indexOf(' '));
      var numBool1=numCheck(pt1);
      if(!numBool1){
        numBool1=hasdot(pt1);
      }
      var numBool2=numCheck(pt2);
      if(!numBool2){
        numBool2=hasdot(pt2);
      }
      if(numBool1){
        numBool1=(sixOrLess(pt1));
      }
      if(numBool2){
        numBool2=(sixOrLess(pt2));
      }
      if(numBool1&&numBool2&&dirCheck(dir1,dir2)){
        
        coords=pt1 + "° "+dir1+", "+pt2+"° "+dir2;
        long=pt2;
        lat=pt1;
        if(dir1=='S'||dir1=='s'){
        lat="-"+lat;
        }
        if(dir2=='W'||dir2=='w'){
        long="-"+long;
        }

        pass=true;
      }
    }else if(total==4){
      coords=removeCommas(coords);
      coords=removeDegree(coords);
      pt1=coords.substring(0,coords.indexOf(' '));
      dir1=coords.substring(coords.indexOf(' ')+1,coords.length);
      
      pt2=dir1.substring(dir1.indexOf(' ')+1,dir1.length);
      dir1=dir1.charAt(0);
      dir2=pt2.substring(pt2.indexOf(' ')+1,pt2.length);
      extra=dir2.substring(dir2.indexOf(' ')+1,dir2.length);
      pt2=pt2.substring(0,pt2.indexOf(' '));
      dir2=dir2.substring(0,dir2.indexOf(' '));
      var numBool1=numCheck(pt1);
      if(!numBool1){
        numBool1=hasdot(pt1);
      }
      var numBool2=numCheck(pt2);
      if(!numBool2){
        numBool2=hasdot(pt2);
      }
      if(numBool1){
        numBool1=(sixOrLess(pt1));
      }
      if(numBool2){
        numBool2=(sixOrLess(pt2));
      }
      if(numBool1&&numBool2&&dirCheck(dir1,dir2)){
        
        coords=pt1 + "° "+dir1+", "+pt2+"° "+dir2+", "+extra;
        long=pt2;
        lat=pt1;
        if(dir1=='S'||dir1=='s'){
        lat="-"+lat;
        }
        if(dir2=='W'||dir2=='w'){
        long="-"+long;
        }

        pass=true;
      }


      console.log(coords);
    }else{
      console.log("FAILED CHECKS!");
      pass=false;
    }
    if(lat>90 || lat<-90){
      console.log("lat out of bounds");
      pass=false;
    }
    if(long>180 || long<-180){
      console.log("long out of bounds");
      pass=false;
    }
    if(pass){
      document.getElementById("text").innerText=coords;
      writeToJson(long,lat,extra);
    }else{
      document.getElementById("text").innerText=ERROR;
    }
  }
  function multiHandle(){

  }
    //console.log(coords);
}
