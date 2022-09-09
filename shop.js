//get categories

const getCatUrl = async () => {
  const url = `https://fakestoreapi.com/products/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayProCat(data);
  // console.log(data);
}
//display cat
const displayProCat = ctaegories => {

  const catContainer = document.getElementById('category-container');
  ctaegories.forEach(category => {
  //   console.log(typeof category);
  // console.log(category);
    const li = document.createElement('li');
    li.innerHTML = `
    <span onclick="loadAllCat('${category.split(
      "'"
  )}')" class="text-2xl capitalize">${category}</span>
`;
  catContainer.appendChild(li);

  });

}

// getcat id
const loadAllCat = async (category) => {
  const categoryWithQuote = category.replace(/,/g, "'");
    const categoryArray = categoryWithQuote.split(' ').join('%20')
    const url = `https://fakestoreapi.com/products/category/${categoryArray}`;
    const res = await fetch(url);
    const data = await res.json();
    showShopData(data);
};



//   loadAllCat();


// get all product 

const getShopApi = async() =>{
  const url=`https://fakestoreapi.com/products`;
  const res =await fetch(url);
  const data = await res.json();
  showShopData(data);
  // console.log(data);
  localStorage.setItem("products", JSON.stringify(data));
  if(!localStorage.getItem("cart")){
    localStorage.setItem("cart",[]);
  }
}

//global variable array
let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));

function addItem(productID){
  let product = products.find(function(product){
    return product.id == productID;
  });
  if(cart.length == 0){
    cart.push(product);
  }else{
    let data = cart.find(element => element.id == productID);
    if(data == undefined){
      cart.push(product);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

// show all product 

const showShopData = shopDatas => {
  const ShopItem = document.getElementById('show-item');
  ShopItem.textContent='';
  shopDatas = shopDatas.slice(0,9);
  shopDatas.forEach(shopData  => {
  // console.log(shopData);
  const showItemDiv = document.createElement('div');
  showItemDiv.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl');
  showItemDiv.innerHTML =`
      <figure class="px-10 pt-10">
        <img src="${shopData.image ? shopData.image : 'no img found'}" alt="Shoes" class="rounded-xl h-60" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${shopData.title ? shopData.title : 'no title found'}</h2>
        <p>${shopData.description.slice(0,105)}...</p>
        <div class="card-actions">
          <label onclick="productPOpUp('${shopData.id}')" for="my-modal-6" class="btn modal-button w-40 hover:bg-violet-900">Shop</label>
        </div>
        <button onclick="addItem('${shopData.id}')" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">Cart
</button>
      </div>
  `;
  ShopItem.appendChild(showItemDiv);

});
}

// product id 
const productPOpUp = async(id) =>{
  document.getElementById('show-details').textContent = ''
  const url =`https://fakestoreapi.com/products/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  showProductDetails(data);
}


const showProductDetails = (shopData) => {
console.log(shopData);
const showDetailsOfProduct = document.getElementById('show-details');
  
const modalBox = document.createElement('div')
modalBox.innerHTML = `
  <div class="modal-box">
      <img src="${
    shopData.image ? shopData.image : 'no img found'
  }" class="h-5/6"/>
      <h3 class="font-bold text-lg">${
    shopData.title ? shopData.title : 'no data dound'
  }</h3>
      <p class="py-4">${
    shopData.description ? shopData.description : 'no data found'
  }</p>
      <div class="modal-action">
      <label for="my-modal-6" class="btn">Close</label>
      </div>
  </div>
  `;
showDetailsOfProduct.appendChild(modalBox)
};

getCatUrl();
// productPOpUp();
getShopApi();
