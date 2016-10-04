'use strict';

var imageSources = [];

var getUl = document.getElementById('surveyUl');
var leftPhoto = document.getElementById('left_image');
var centerPhoto = document.getElementById('center_image');
var rightPhoto = document.getElementById('right_image');

new ImageConstructor('Baby', 'img/baby.jpg');
new ImageConstructor('Banana', 'img/banana.jpg');
new ImageConstructor('Bathroom', 'img/bathroom.jpg');
new ImageConstructor('Breakfast', 'img/breakfast.jpg');
new ImageConstructor('Bubblegum', 'img/chair.jpg');
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
new ImageConstructor('Unicorn', 'img/tauntaun.jpg');
new ImageConstructor('Tentacle USB', 'img/usb.jpg');
new ImageConstructor('Water Can', 'img/usb.jpg');
new ImageConstructor('Wine Glass', 'img/wine_glass.jpg');

function ImageConstructor(imageName, imagePath){
  this.imageName = imageName;
  this.imagePath = imagePath;
  this.imageCounter = 0;
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

  while(centerPhotoIndex === leftPhotoIndex){
    centerPhotoIndex = randomNumber();
  }

  while(rightPhotoIndex === leftPhotoIndex){
    rightPhotoIndex = randomNumber();
  }

  while(rightPhotoIndex === centerPhotoIndex){
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
  console.log('imageIndices ' + imageIndices);

  var leftItem = imageSources[imageIndices.leftPhotoIndex].imagePath;
  var centerItem = imageSources[imageIndices.centerPhotoIndex].imagePath;
  var rightItem = imageSources[imageIndices.rightPhotoIndex].imagePath;

  currentImg = [];
  currentImg.push(leftItem);
  currentImg.push(centerItem);
  currentImg.push(rightItem);

  console.log('currentImg ' + currentImg );
  leftPhoto.src = currentImg[0];
  centerPhoto.src = currentImg[1];
  rightPhoto.src = currentImg[2];
}

createImg();

getUl.addEventListener('click', createImg);
getUl.addEventListener('click', handleClicks);

function handleClicks(){
  if(event.target.id === 'getUl'){
    console.log('You must click on an image.');
  }
  for ( var i = 0; i <= 25; i++){
    ImageConstructor.clickCounter += 1;
    console.log( ImageConstructor.clickCounter + ' clicks for ' + ImageConstructor.imageName);
    return;
  }
};

handleClicks();
