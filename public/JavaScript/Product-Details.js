const handelingProductDetail = async () => {
  const id = window.localStorage.getItem("Product-ID");
  const raw = await fetch(`http://localhost:4004/product/${id}`);
  const data = await raw.json();
  const title = document.querySelector(".Title");
  const price = document.getElementById("product-price");
  const inStock = document.getElementById("product-in-stock");
  const stock = document.getElementById("product-stock");
  const category = document.getElementById("category");
  const img = document.getElementById("product-img");
  const description = document.getElementById("product-description");
  title.textContent = data.name;
  price.textContent = "PKR " + String(data.price);
  stock.textContent = data.stock;
  inStock.textContent = data.stock == 0 ? "NO" : "YES";
  category.textContent = data.Category;
  img.src = data.image;
  description.textContent = data.description;
  const btnBuy = document.getElementById("btn-buy");
  const buyingMessage = async () => {
    const updateProductMethod = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: data.stock - 1 }),
    };
    const deleteProducttMethod = { method: "DELETE" };
    const updateUrl = `http://localhost:4004/product/editStock/${data._id}`;
    const deleteUrl = `http://localhost:4004/product/${data._id}`;
    const raw = await fetch(
      data.stock > 1 ? updateUrl : deleteUrl,
      data.stock > 1 ? updateProductMethod : deleteProducttMethod
    );
    stock.textContent = data.stock - 1;
    const messageContainer = document.getElementById("message-container");
    messageContainer.innerHTML = `
   <div class='d-flex flex-column align-items-center position-absolute start-0 end-0 top-50 p-3 text-center message'>
      <p class='mt-2'>Total-Price:PKR ${data.price}</p>
      <p>Thank you for buying this product, hope you have a greath time.</p>
      <button id='btn-ok' class='btn btn-primary'>Ok</button>
   </div>`;
    const btnOk = document.getElementById("btn-ok");
    btnOk.addEventListener("click", () => {
      messageContainer.innerHTML = "";
    });
  };

  btnBuy.addEventListener("click", buyingMessage);
  const btn_edit = document.getElementById("btn-edit");
  const upateForm = () => {
    window.localStorage.setItem("edit-product-id", data._id);
    window.location.href = "./edit_form.html";
  };
  btn_edit.addEventListener("click", upateForm);
};

window.addEventListener("DOMContentLoaded", handelingProductDetail);
