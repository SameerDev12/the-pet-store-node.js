const handelingEditForm = async () => {
  const id = window.localStorage.getItem("edit-product-id");
  const raw = await fetch(`http://localhost:4004/product/${id}`);
  const data = await raw.json();
  document.getElementById("name").value = data.name;
  document.getElementById("price").value = data.price;
  document.getElementById("description").value = data.description;
  document.getElementById("stock").value = data.stock;
  document.getElementById("Category").value = data.Category;
  const btn_edit = document.getElementById("btn-edit");
 
  //Update method
  const update =() => {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const stock = document.getElementById("stock").value;
    const Category = document.getElementById("Category").value;
    const image = document.getElementById("image").files[0];
    const formData = new FormData();
    formData.append("product-name", name);
    formData.append("product-description", description);
    formData.append("product-price", price);
    formData.append("product-image", image);
    formData.append("product-Category", Category);
    formData.append("product-stock", stock);

    const response = fetch(`http://localhost:4004/product/edit/${data._id}`, {
        method: "PATCH",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
  };

  btn_edit.addEventListener("click", update);
};

window.addEventListener("DOMContentLoaded", handelingEditForm);
