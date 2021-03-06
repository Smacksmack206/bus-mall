'use-strict'

const myContainer = document.querySelector('section');
const myButton = document.getElementById('results');
const results = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');


const randomNumbersArray = [];
const allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
const clicksAllowed = 3;
let clicks = 0;
let rounds = 0;
let limit = 25;


//Create a constructor function that creates an object associated with each product, and has the following properties: Name of the product, File path of image, Times the image has been shown// 
function Product(name, fileExtention = 'jpg', views) {
  this.name = name;
  this.src = `img/${name}.${fileExtention}`;
  this.views = 0;
  //2.a In the constructor function define a property to hold the number of times a product has been clicked.//
  this.likes = 0;
  this.clicks = 0;
  this.total = JSON.parse(localStorage.getItem(this.name)) || {
    views: [],
    likes: []
    };  
  allProducts.push(this);
}

//


new Product('sweep', 'png');
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');



function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

//renders products to myContainer//

function renderProduct() {

  //makes sure products are not the same//
  while (randomNumbersArray.length < 6) {
    let Product1 = selectRandomProduct();
    if (!randomNumbersArray.includes(Product1)){
      randomNumbersArray.push(Product1);

    }

  }
  console.log(randomNumbersArray);
  image1.src = allProducts[randomNumbersArray[0]].src;
  image1.alt = allProducts[randomNumbersArray[0]].name;
  image1.views = allProducts[randomNumbersArray[0]].views;
  image2.src = allProducts[randomNumbersArray[1]].src;
  image2.alt = allProducts[randomNumbersArray[1]].name;
  image2.views = allProducts[randomNumbersArray[1]].views;
  image3.src = allProducts[randomNumbersArray[2]].src;
  image3.alt = allProducts[randomNumbersArray[2]].name;
  image3.views = allProducts[randomNumbersArray[2]].views;

}

//This is where we are going to store the products
Product.prototype.storeTolocalStorage = function () {
  
  this.total.views.push(this.views);
  this.total.likes.push(this.likes);
  console.log(this.total);
localStorage.setItem(this.name, JSON.stringify(this.total));

}

function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }

  // console.log(clicks);
  let clickedProduct = event.target.alt;
  // console.log(event.target.alt);
  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      //2.b After every selection by the viewer, update the newly added property to reflect if it was clicked.//
      allProducts[i].likes++;
      rounds++;
      allProducts[i].clicks++
      allProducts[i].views++
      // console.log(rounds);
      break
    }
  }
  if (rounds > limit) {
    alert('You passed round 25 - Click the View Results CTA below to see the results');
    //   image1.src = '';
    // image2.src = '';
    // image3.src = '';
    // image1.alt = '';
    // image2.alt = '';
    // image3.alt = '';
    myContainer.removeEventListener('click', handleProductClick);
    for (let product of allProducts) {
      product.storeTolocalStorage();
    }
    
    return;
  } else if (rounds < limit) {
    randomNumbersArray.shift();
    randomNumbersArray.shift();
    randomNumbersArray.shift();
    renderProduct();
  }
}
// renderProduct();

function handleButtonClick(e) {
  let productName = [];
  let productClicks = [];
  let ProductsViews = [];
  
  
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    productName.push(allProducts[i].name);
    let eViews = 0;
    let eLikes = 0;
    for (let z = 0; z < allProducts[i].total.views.length; z++) {
        eViews += allProducts[i].total.views[z];
        eLikes += allProducts[i].total.likes[z];

        
    }
    

  
   ProductsViews.push(eViews); 
   productClicks.push(eLikes); 
  }
  
  let labelArray = [1, 2, 3, 4, 5, 6, 7];
  const data = {
    labels: productName,
    datasets: [{
      label: 'Views',
      data: ProductsViews,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }, {
      label: 'Likes',
      data: productClicks,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

}
// event handler for when the page loads instruct the user
function handleAlert(e) {
  alert('To begin click one of the boxes below to load first three products');
}
//event listener for the event handler that displays results when clicking the view results button on the page
myButton.addEventListener('click', handleButtonClick);

//event listner for the event handler that displays new random products upon clicking on a product
myContainer.addEventListener('click', handleProductClick);

//event listener for event handler that instucts the user 
window.addEventListener('load', handleAlert);





