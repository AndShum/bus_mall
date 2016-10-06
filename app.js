'use strict';
var chartDrawn = false;
var imageSources = [];
var labelsForChart = [];
var numOfVotesForChart = [];
var clicker = 0;
var liButtonVisiblity = document.getElementById('printLi');
var chartButtonVisiblity = document.getElementById('printChart');

var surveyUl = document.getElementById('surveyUl');
var leftPhoto = document.getElementById('left_image');
var centerPhoto = document.getElementById('center_image');
var rightPhoto = document.getElementById('right_image');

new ImageConstructor('Baby', 'img/baby.jpg');
new ImageConstructor('Banana', 'img/banana.jpg');
new ImageConstructor('Bathroom', 'img/bathroom.jpg');
new ImageConstructor('Breakfast', 'img/breakfast.jpg');
new ImageConstructor('Bubblegum', 'img/bubblegum.jpg');
new ImageConstructor('Chair', 'img/chair.jpg');
new ImageConstructor('Cthulhu', 'img/cthulhu.jpg');
new ImageConstructor('Dog Duck', 'img/dog_duck.jpg');
new ImageConstructor('Dragon Meat', 'img/dragon_meat.jpg');
new ImageConstructor('Pen', 'img/pen.jpg');
new ImageConstructor('Pet','img/pet.jpg');
new ImageConstructor('R2D2 Bag', 'img/r2d2.jpg');
new ImageConstructor('Rain Boots', 'img/rain_boots.jpg');
new ImageConstructor('Pizza Scissors', 'img/scissors.jpg');
new ImageConstructor('Shark Sleeping Bag', 'img/shark.jpg');
new ImageConstructor('Tauntaun Sleeping Bag', 'img/tauntaun.jpg');
new ImageConstructor('Unicorn', 'img/unicorn.jpg');
new ImageConstructor('Tentacle USB', 'img/usb.jpg');
new ImageConstructor('Water Can', 'img/water_can.jpg');
new ImageConstructor('Wine Glass', 'img/wine_glass.jpg');

var hideChart = function() {
  console.log(document.getElementById('voteChart'));
  document.getElementById('voteChart').style.visibility = 'hidden';
};

function ImageConstructor(imageName, imagePath){
  this.imageName = imageName;
  this.imagePath = imagePath;
  this.imageViews = 0;
  this.clickCounter = 0;
  imageSources.push(this);
  // console.log(this);
}

var currentImg = [];

function randomNumber(){
  return Math.floor(Math.random() * imageSources.length);
}

function chooseImagesToDisplay() {
  var leftPhotoIndex = randomNumber();
  var centerPhotoIndex = randomNumber();
  var rightPhotoIndex = randomNumber();

  while(centerPhotoIndex === leftPhotoIndex || imageSources[centerPhotoIndex] === currentImg[0] || imageSources[centerPhotoIndex] === currentImg[1] || imageSources[centerPhotoIndex] === currentImg[2]){
    centerPhotoIndex = randomNumber();
  }

  while(leftPhotoIndex === rightPhotoIndex || imageSources[leftPhotoIndex] === currentImg[0] || imageSources[leftPhotoIndex] === currentImg[1] || imageSources[leftPhotoIndex] === currentImg[2]){
    leftPhotoIndex = randomNumber();
  }

  while(rightPhotoIndex === centerPhotoIndex || imageSources[rightPhotoIndex] === currentImg[0] || imageSources[rightPhotoIndex] === currentImg[1] || imageSources[rightPhotoIndex] === currentImg[2]){
    rightPhotoIndex = randomNumber();
  }

  var imageIndices = {
    leftPhotoIndex : leftPhotoIndex,
    centerPhotoIndex : centerPhotoIndex,
    rightPhotoIndex : rightPhotoIndex,
  };
  // console.log('imageIndices: ', imageIndices);
  return imageIndices;
}

function createImg(){
  var imageIndices = chooseImagesToDisplay();
  console.log('imageIndices ', imageIndices);

  var leftItem = imageSources[imageIndices.leftPhotoIndex];
  var centerItem = imageSources[imageIndices.centerPhotoIndex];
  var rightItem = imageSources[imageIndices.rightPhotoIndex];

  currentImg = [];
  currentImg.push(leftItem);
  currentImg.push(centerItem);
  currentImg.push(rightItem);

  console.log('currentImg ', currentImg );
  leftPhoto.src = currentImg[0].imagePath;
  centerPhoto.src = currentImg[1].imagePath;
  rightPhoto.src = currentImg[2].imagePath;
}

createImg();

function handleClicks(event){
  console.log('handleClicks', event);

  if(event.target.id === 'surveyUl'){
    alert('You must click on an image.');
    return;
  }

  if (clicker === 25){
    saveGame();
    liButtonVisiblity.style.visibility = 'visible';
    chartButtonVisiblity.style.visibility = 'visible';
    alert("That's 25! Click below to view your results!")
    return;
  } else if (event.target.id === 'left_image') {
    currentImg[0].clickCounter += 1;
    clicker += 1;
    console.log(clicker + ' this is the clicker');
    console.log(currentImg[0]);
  }

  if (event.target.id === 'center_image') {
    currentImg[1].clickCounter += 1;
    clicker += 1;
    console.log(clicker + ' this is the clicker');
    console.log(currentImg[1]);
  }

  if (event.target.id === 'right_image'){
    currentImg[2].clickCounter += 1;
    clicker += 1;
    console.log(clicker + ' this is the clicker');
    console.log(currentImg[2]);
  }
  createImg();

};

surveyUl.addEventListener('click', handleClicks);

var printLi = document.getElementById('printLi');

function renderResults() {
  listOfVotes.innerHTML = '';
  for ( var i = 0; i < imageSources.length; i++){
    var listEl = document.createElement('li');
    listEl.textContent = imageSources[i].clickCounter + ' clicks for ' + imageSources[i].imageName;
    listOfVotes.appendChild(listEl);
    console.log(imageSources[i].clickCounter + ' clicks for ' + imageSources[i].imageName);
  }
  hideChart();
  return;
}

if(localStorage.getItem('savedImages')){
  var loadImages = localStorage.getItem('savedImages');
  var newImageSources = JSON.parse(loadImages);
  imageSources = newImageSources;
} else{
  saveGame();
};

function saveGame(){
  var imagesStringified = JSON.stringify(imageSources);
  localStorage.setItem('savedImages', imagesStringified);
};

function createChartArrays(){
  event.preventDefault();
  for (var i = 0; i < imageSources.length; i++){
    numOfVotesForChart[i] = imageSources[i].clickCounter;
    labelsForChart[i] = imageSources[i].imageName;
  }
  saveGame();
  createChart();
  document.getElementById('voteChart').style.visibility = 'visible';
}

printChart.addEventListener('click', createChartArrays);

printLi.addEventListener('click', renderResults);

// Begin code for Chart

// var Chart = require('Chart.js');

var data = {
  backgroundColor: 'rgb(255, 255, 255)',
  labels: labelsForChart,
  datasets: [
    {
      label: 'Vote Results',
      data: numOfVotesForChart,
      backgroundColor: 'rgb(178, 52, 70)',
      hoverBackgroundColor: 'rgb(0, 40, 251)'
    }
  ]
};

function createChart(){
  var getChart = document.getElementById('voteChart').getContext('2d');
  var voteChart = new Chart(getChart, {
    type: 'bar',
    data: data,
    options: {
      responsive: false
    },
    scales: [{
      ticks: {
        beginAtZero: true
      }
    }]
  });
  chartDrawn = true;
};

hideChart();
