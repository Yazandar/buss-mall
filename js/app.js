'use strict';

let photoArry =[
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];
let resultSection = document.getElementById('results');
let attempts = 25;
let photosSection = document.getElementById('photos');
let leftPhoto = document.getElementById('leftPic');
let midPhoto = document.getElementById('midPic');
let rightPhoto = document.getElementById('rightPic');
let clickTimes = 0;
let leftImage = 0;
let midImage = 0;
let rightImage = 0;


function Images( name ) {
  this.name = name;
  this.img = `./img/${name}`;
  this.click = 0;
  this.shown = 0;
  this.appear = false;
  Images.all.push(this);
}
Images.all = [];
console.log(Images.all);

for ( let i = 0; i < photoArry.length; i++ ) {
  new Images( photoArry[i] );
}


function renderImages() {
  let leftIn;
  let midIn;
  let rightIn;

  do{
    leftIn = randomNumber( 0 , photoArry.length-1);
    midIn = randomNumber( 0 , photoArry.length-1);
    rightIn = randomNumber( 0 , photoArry.length-1);
  }while(leftIn === midIn || leftIn === rightIn || midIn === rightIn || (Images.all.appear === true));



  leftPhoto.src = Images.all[leftIn].img;
  midPhoto.src = Images.all[midIn].img;
  rightPhoto.src = Images.all[rightIn].img;

  leftImage = leftIn;
  midImage = midIn;
  rightImage = rightIn;

  Images.all[leftIn].shown++;
  Images.all[midIn].shown++;
  Images.all[rightIn].shown++;

  Images.all[leftIn].appear=true;
  Images.all[midIn].appear=true;
  Images.all[rightIn].appear=true;

}

function renderResults(){
  for ( let i = 0; i < photoArry.length; i++ ) {
    const liElement = document.createElement('li');
    resultSection.appendChild(liElement);
    liElement.textContent = Images.all[i].name + ' : ' + Images.all[i].click + ' Votes' + '/'+' was seen'+' :'+ Images.all[i].shown;
  }

}


function randomNumber( min, max ) {
  min = Math.ceil( min );
  max = Math.floor( max );
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

renderImages();


function eventClick (c) {
  if ((c.target.id =='leftPic'||c.target.id == 'midPic'||c.target.id == 'rightPic') && clickTimes < attempts ){

    if(c.target.id =='leftPic' ){
      Images.all[leftImage].click++;
    }
    if(c.target.id == 'midPic'){
      Images.all[midImage].click++;
    }
    if(c.target.id == 'rightPic'){
      Images.all[rightImage].click++;
    }


    clickTimes++;
    renderImages();


  }

}

function resultView (v){
  if( v.target.id == 'viewButton'){
    renderResults();
    renderChart();
  }

}

function renderChart(){
  let clicksArray =[];
  let names = [];
  let shown = [];
  for (let i = 0; i < Images.all.length; i++ ){
    clicksArray.push(Images.all[i].click);
    names.push(Images.all[i].name);
    shown.push(Images.all[i].shown);
  }
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: clicksArray,
        backgroundColor:
          'rgba(255, 99, 132, 0.2)',

        borderColor:
          'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }, {
        label: '# shown times',
        data: shown,
        backgroundColor:
          'rgba(30, 139, 195, 1)',

        borderColor:
          'rgba(30, 139, 195, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

photosSection.addEventListener('click',eventClick);
resultSection.addEventListener('click',resultView);

