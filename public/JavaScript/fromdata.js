//Sending the data
const btn = document.getElementById("btn");

const Sender = () => {
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

  const response = fetch("http://localhost:4004/product", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
};

btn.addEventListener("click", Sender);







