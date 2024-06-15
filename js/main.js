let storageContainer = [];

//fetching product catagory (Step - 1)
const getProductCatagories = async (id) => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const value = await res.json();
    catagoryArray(value);


}
//fetching all products (Step - 4)
const getProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    storageContainer = data;
    productArray();
}
//for showing all the product(Step - 5)
const productArray = (productValue = storageContainer) => {
    const productContainer = document.getElementById('item-container');
    productContainer.textContent = '';
    productValue.forEach(element => {
        const productDiv = document.createElement('div');
        productDiv.classList = `card bg-base-100 shadow-xl`;
        productDiv.innerHTML = `
            <figure class="px-10 pt-10">
                <img src="${element.image}" class="rounded-xl h-52 object-contain" />
            </figure>
            <div class="card-body items-center text-center justify-between">
                <h2 class="font-medium">${element.title}</h2>
                <h3 class="font-semibold">$<span>${element.price}</span></h3>
                <div class="flex items-center justify-between w-full">
                    <span class=""text--[#845EC2] font-bold><i class="fa-sharp fa-solid fa-star"></i><span>${element.rating.rate}</span></span>
                    <button class="btn btn-ghost text-xl text-white bg-[#845EC2] hover:text-[#845EC2]"><i class="fa-sharp fa-light fa-cart-plus"></i></button>
                </div>
            </div>
        `;
        productContainer.appendChild(productDiv);
    });
}
//for showing the categories(Step - 2)
const catagoryArray = (catagory) => {
    const navContainer1 = document.getElementById('catagory-nav1');
    const navContainer2 = document.getElementById('catagory-nav2');
    catagory.forEach(element => {
        const li1 = document.createElement('li');
        const li2 = document.createElement('li');
        // Manually escape single quotes in the element string
        const escapedElement = element.replace(/'/g, "\\'");
        li1.innerHTML = `<a onclick="loadProduct('${escapedElement}');showCategory('${escapedElement}')" class="capitalize nav-list">${element}</a>`;
        li2.innerHTML = `<a onclick="loadProduct('${escapedElement}');showCategory('${escapedElement}')" class="capitalize nav-list">${element}</a>`;
        navContainer1.appendChild(li1);
        navContainer2.appendChild(li2);
    });
    addNavListeners();
}
//showing category in top
const showCategory = (escapedElement) => {
    const currentCategory = document.getElementById('currentCategory');
    currentCategory.innerHTML = escapedElement;
}
const addNavListeners = ()=>{
    const navList = document.querySelectorAll(".nav-list");
    navList.forEach(btn => btn.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".nav-list.active").classList.remove("active");
        btn.classList.add("active");
    }));
}

//for sorting by categories(Step - 3)
const loadProduct = async (productName) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${productName}`);
    const data = await response.json();
    //assigning the new category products to the empty array and sending it.
    storageContainer = data;
    productArray();
}

//sort by price
const sortByPrice = () => {
    storageContainer.sort((a, b) => a.price - b.price);
    productArray();
}

//sort by ratings
const sortByRatings = () => {
    storageContainer.sort((a, b) => b.rating.rate - a.rating.rate);
    productArray();
}

//search
const search = () => {
    const searchFieldValue = document.getElementById('search-field');
    const searchField = searchFieldValue.value.toLowerCase();
    if (searchField !== '') {
        document.getElementById('search-field').value = '';
        const filteredData = storageContainer.filter(product =>
            product.title.toLowerCase().includes(searchField)
        );
        productArray(filteredData);
    }
}


getProductCatagories();
getProducts();



//   Hero Slider

$(document).ready(function(){
    $('.hero-slider').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 3000,
        autoplay: true,
        fade: true,
    cssEase: 'linear',
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
  }); 