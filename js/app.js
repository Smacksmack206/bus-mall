'use-strict'

const myContainer = document.querySelector('section');
const myButton = document.querySelector('main div');
const results = document.querySelector('ul');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');


let allProducts = [];
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


image1.src = allProducts[0].src;
image2.src = allProducts[1].src;

function selectRandomProduct() {
return Math.floor(Math.random() * allProducts.length);
}

//renders products to myContainer//
function renderProduct() {
let Product1 = selectRandomProduct();
let Product2 = selectRandomProduct();
let Product3 = selectRandomProduct();
//For each of the three images, increment its property of times it has been shown by one.//
allProducts[Product1].views++;
allProducts[Product2].views++;
allProducts[Product3].views++;
console.log(allProducts[Product1].views);
console.log(allProducts[Product2].views);
console.log(allProducts[Product3].views);

//array.method. include() look this up will be useful//

//makes sure products are not the same//
while (Product1 === Product2 || Product2 === Product3 || Product1 === Product3) {
    
    Product2 = selectRandomProduct();
    Product3 = selectRandomProduct();
    // Product1.views++;


}

image1.src = allProducts[Product1].src;
image1.alt = allProducts[Product1].name;
image1.views = allProducts[Product1].views;
image2.src = allProducts[Product2].src;
image2.alt = allProducts[Product2].name;
image2.views = allProducts[Product2].views;
image3.src = allProducts[Product3].src;
image3.alt = allProducts[Product3].name;
image3.views = allProducts[Product3].views;
}

function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  clicks++
  console.log(clicks);
  let clickedProduct = event.target.alt;
  console.log(event.target.alt);
  for (let i = 0; i < allProducts.length; i++) {
  if (clickedProduct === allProducts[i].name) {
    //2.b After every selection by the viewer, update the newly added property to reflect if it was clicked.//
    allProducts[i].likes++;
    rounds++;
    break
  }
}
renderProduct();
}
renderProduct();

function handleButtonClick() {
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts} `
  }
}

if (clicks === clicksAllowed) {
myContainer.removeEventListener('click', handleProductClick);

}
myButton.addEventListener('click', handleButtonClick);

myContainer.addEventListener('click', handleProductClick);



// create a loop towards 25 rounds
// for (let i = 0; i < 1; i++) {
//   renderProduct();
// for (let rounds = 0; rounds < limit; rounds++) {
//   function handleProductClick(event) {
//     if (event.target === myContainer) {
//       alert('Please click on an image');
//     }
//     clicks++
//     console.log(clicks);
//     let clickedProduct = event.target.alt;
//     console.log(event.target.alt);
//     for (let i = 0; i < allProducts.length; i++) {
//     if (clickedProduct === allProducts[i].name) {
//       //2.b After every selection by the viewer, update the newly added property to reflect if it was clicked.//
//       allProducts[i].likes++;
//       rounds++;
//       break
//     }
//   }
//   renderProduct();
//   }
  
// }

// }