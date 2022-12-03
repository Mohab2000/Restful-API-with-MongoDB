const ProductController = require("./ProductController");
const pController = new ProductController();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*", methods: "*" }));

app.get("/getAll", (req, res) => {
  pController.getAllProducts().then((data) => {
    res.status(200).send(data);
  });
});

app.get("/getProduct/:id", (req, res) => {
  const id = req.params.id;
  pController.getProductByID(id).then((data) => {
    res.status(200).send(data);
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

// pController.connect().then(
//   (db) => {
//     console.log("Connected app.js");
//   },
//   (err) => {
//     console.log(err);
//   }
// );

// var prd = {
//   name: "tablet",
//   price: 100,
//   quantity: 10,
// };
// pController.insertProduct(prd).then((res) => {
//   console.log(res);
// });

// pController.getAllProducts().then((res) => {
//   console.log(res);
// });
// pController.getProductByID("638b61e2d70d384bc680a8a6").then((res) => {
//   console.log(res);
// });
