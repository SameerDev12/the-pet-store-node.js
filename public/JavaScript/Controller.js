//Controller
const MoveHome = () => {
  window.location.href = "./index.html";
};

const MoveProducts = () => {
  window.location.href = "./products.html";
};

const MoveAboutus = () => {
  window.location.href = "./About-us.html";
};

const MoveContactUs = () => {
  window.location.href = "./contact.html";
};

const MoveCreateProduct = () => {
  window.location.href = "./product-form.html";
};

//For opening the description page.
const Shifter = (ID) => {
  const Product = document.getElementById(ID);

  const Item = {
    id: Product.children[0].id,
  };
  console.log(Item);
  localStorage.setItem("Product-ID", Item.id);
  window.location.href = "./Product-Details.html";
};

const searchHandler = () => {
  const search = document.getElementById("search");
  const Category = search.value;
  console.log(Category);
  window.localStorage.setItem("search-data", Category);
  window.location.href = "./searched.html";
};

const searchBtn = document.getElementById("btn-search");
searchBtn.addEventListener("click", searchHandler);



