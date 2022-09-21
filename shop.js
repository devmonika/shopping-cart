let products = [];
if (!localStorage.getItem('cart')) {
	localStorage.setItem('cart', '[]');
}
//get categories

const getCatUrl = async () => {
	const url = `https://fakestoreapi.com/products/categories`;
	const res = await fetch(url);
	const data = await res.json();
	displayProCat(data);
	// console.log(data);
};
//display cat
const displayProCat = (ctaegories) => {
	const catContainer = document.getElementById('category-container');
	ctaegories.forEach((category) => {
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
};

// getcat id
const loadAllCat = async (category) => {
	const categoryWithQuote = category.replace(/,/g, "'");
	const categoryArray = categoryWithQuote.split(' ').join('%20');
	const url = `https://fakestoreapi.com/products/category/${categoryArray}`;
	const res = await fetch(url);
	const data = await res.json();
	showShopData(data);
};

//   loadAllCat();

// get all product

const getShopApi = async () => {
	const url =`https://fakestoreapi.com/products`;
	const res = await fetch(url);
	const data = await res.json();
	showShopData(data);
	// console.log(data);
	products = [...data];
};
//global variable array
let cart = JSON.parse(localStorage.getItem('cart'));

const addItem = async(productID) =>{
  const product = await productForCart(productID).then(data=> data);
	if (!cart.length) {
		cart.push(product);
	} else {
		let data = cart.find((element) => element.id == productID);
		if (data == undefined) {
			cart.push(product);
		}
	}
	localStorage.setItem('cart', JSON.stringify(cart));
	displayCartLength(cart);
	showCartItems(product);
}

const displayCartLength = (cart) => {
	const display = document.getElementById('add-item');
	display.innerText = cart.length;
};
// show cart items 
const showCartItems = (product) =>{
	const display = document.getElementById('show-cart');
	const container = document.createElement('div');
	container.innerHTML=`
	<div class="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100" style="">
		<div class="p-2 w-12"><img src="${
			product.image ? product.image : 'no img found'
		}" alt="img product"></div>
		<div class="flex-auto text-sm w-32">
			<div class="font-bold">${
				product.title ? product.title : 'no title found'
			}</div>
			<div class="truncate">${product.description.slice(0, 20)}</div>
			<div class="text-gray-400">Qt: ${product.cart}</div>
		</div>
		<div class="flex flex-col w-18 font-medium items-end">
			<div class="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
				<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 ">
					<polyline points="3 6 5 6 21 6"></polyline>
					<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
					<line x1="10" y1="11" x2="10" y2="17"></line>
					<line x1="14" y1="11" x2="14" y2="17"></line>
				</svg>
			</div>
			$${product.price}</div>
	</div>
    <div class="p-4 justify-around flex ">
        <button class="text-base  undefined  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
      hover:bg-teal-700 hover:text-teal-100 
      bg-teal-100 
      text-teal-700 
      border duration-200 ease-in-out 
      border-teal-600 transition">Checkout</button>
	  <button class="text-base  undefined  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
      hover:bg-teal-700 hover:text-teal-100 
      bg-teal-100 
      text-teal-700 
      border duration-200 ease-in-out 
      border-teal-600 transition">View Cart</button>
    </div>
	`;
	display.appendChild(container);
	// console.log(product);
}

// show all product

const showShopData = (shopDatas) => {
	const ShopItem = document.getElementById('show-item');
	ShopItem.textContent = '';
	shopDatas = shopDatas.slice(0, 9);
	shopDatas.forEach((shopData) => {
		// console.log(shopData);
		const showItemDiv = document.createElement('div');
		showItemDiv.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl');
		showItemDiv.innerHTML = `
      <figure class="px-10 pt-10">
        <img src="${
			shopData.image ? shopData.image : 'no img found'
		}" alt="Shoes" class="rounded-xl h-60" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${
			shopData.title ? shopData.title : 'no title found'
		}</h2>
        <p>${shopData.description.slice(0, 105)}...</p>
        <div class="card-actions">
          <label onclick="productPOpUp('${
				shopData.id
			}')" for="my-modal-6" class="btn modal-button w-20 hover:bg-violet-900">Shop</label>
			<button onclick="addItem('${
				shopData.id
			}')" class="bg-gray-500 text-white font-bold py-3 px-6 w-20 rounded inline-flex items-center  hover:bg-violet-900">Cart
	</button>
        </div>
        
      </div>
  `;
		ShopItem.appendChild(showItemDiv);
	});
};

// product id
const productPOpUp = async (id) => {
	document.getElementById('show-details').textContent = '';
	const url = `https://fakestoreapi.com/products/${id}`;
	const res = await fetch(url);
	const data = await res.json();
	// console.log(data);
	showProductDetails(data);
};
const productForCart = async (id) => {
	const url = `https://fakestoreapi.com/products/${id}`;
	const res = await fetch(url);
	const data = await res.json();
	return data;
};

const showProductDetails = (shopData) => {
	console.log(shopData);
	const showDetailsOfProduct = document.getElementById('show-details');

	const modalBox = document.createElement('div');
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
	showDetailsOfProduct.appendChild(modalBox);
};



getCatUrl();
// productPOpUp();
getShopApi();