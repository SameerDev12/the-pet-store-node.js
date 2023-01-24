import express from "express";
import Product from "../models/productSchema.js";
import multer from "multer";
import path from "path";

//Setting multer for storing the image file.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("./public/Assets/product_image"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage, limits: { fileSize: 3000000 } });

//Setting the routes
const router = express.Router();

//Sending all the products.
router.get("/", async (req, res) => {
  const findProduct = await Product.find({});
  try {
    res.send(findProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});
//Sending the prduct, depending upon id.
router.get("/:id", (req, res) => {
  const findedProducts = Product.findOne({ _id: req.params.id });
  try {
    findedProducts.then((da) => {
      res.status(200).json(da);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Sending the prducts, depending upon Category.
router.get("/Category/:Category", (req, res) => {
  const findedProducts = Product.find({ Category: req.params.Category });
  try {
    findedProducts.then((da) => {
      res.status(200).json(da);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Adding the product in the database.
router.post("/", upload.single("product-image"), async (req, res) => {
  const product = new Product({
    name: req.body["product-name"],
    description: req.body["product-description"],
    price: req.body["product-price"],
    image: `http://localhost:4004/Assets/product_image/${req.file.filename}`,
    Category: req.body["product-Category"],
    stock: req.body["product-stock"],
  });
  try {
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Updating the data in the dataBase.
router.patch("/edit/:id", upload.single("product-image"), async (req, res) => {
  try {
    await Product.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body["product-name"],
        description: req.body["product-description"],
        price: req.body["product-price"],
        image: `http://localhost:4004/Assets/product_image/${req.file.filename}`,
        Category: req.body["product-Category"],
        stock: req.body["product-stock"],
      }
    );
    res
      .status(201)
      .json({
        status: 200,
        message: "Your data has been successfully updated",
      });
  } catch (error) {
    res.status(500).json({ status: 500, message: "NO send" });
  }
});

router.patch("/editStock/:id", async(req,res) => {
  console.log(req.body);
  try
  {
    await Product.findByIdAndUpdate({_id:req.params.id},{stock:req.body.stock});
    res.status(201).json({status:201,message:"The stock is updated"});
  }
  catch(error)
  {
    res.status(501).json({status:500,message:"The stock is not updated"});
  }
});

//Deleting the product from the dataBase
router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete({ _id: req.params.id },{stock:req.body.stock}).then(() => {
    res
      .status(200)
      .json({ status: 200, message: "The product is Successfully deleted." });
  });
});

export default router;
