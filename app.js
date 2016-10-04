'use strict';
var imageSources = [];

new ImageConstructor('Baby', 'img/baby.png');
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
new ImageConstructor('Tentacle USB', 'img/usb.gif');
new ImageConstructor('Water Can', 'img/usb.gif');
new ImageConstructor('Wine Glass', 'img/wine_glass.jpg');


function ImageConstructor(imageName, imagePath){
  this.imageName = imageName;
  this.imagePath = imagePath;
  this.imageCounter = 0;
  this.clickCounter = 0;
  imageSources.push(this);
  console.log(this);
}


var currentImg = [];

function randomNumber(){
  return Math.floor(Math.random() * imageSources.length);
}
var leftPhoto = document.getElementById('left');
var centerPhoto = document.getElementById('center');
var rightPhoto = document.getElementById('right');


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
  console.log('imageIndices: ', imageIndices);
  return imageIndices;
}

function createImg(){
  var imageIndices = chooseImagesToDisplay();

  var leftItem = imageSources[imageIndices.leftPhotoIndex].imagePath;
  var centerItem = imageSources[imageIndices.centerPhotoIndex].imagePath;
  var rightItem = imageSources[imageIndices.rightPhotoIndex].imagePath;


  currentImg.push(leftItem);
  currentImg.push(centerItem);
  currentImg.push(rightItem);

}

createImg();

leftPhoto.src = currentImg[0];
centerPhoto.src = currentImg[1];
rightPhoto.src = currentImg[2];
