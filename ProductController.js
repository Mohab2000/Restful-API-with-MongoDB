const mongoDBDriver = require("mongodb");

class ProductController {
  client;
  constructor() {
    this.conStr = "mongodb://localhost:27017/SimpleShop";
    this.MongoClient = mongoDBDriver.MongoClient;
  }
  connect() {
    this.client = new this.MongoClient(this.conStr);
    console.log("Start connecting...");
    return new Promise((resolve, reject) => {
      this.client.connect((err) => {
        if (err) {
          console.log("Connection Error");
          reject(err);
        }
        console.log("Connected");
        //console.log(db);
        var db = this.client.db();
        resolve(db);
      });
    });
  }
  async insertProduct(newProduct) {
    // console.log("test0");
    const db = await this.connect();
    // console.log("test1");
    return new Promise((resolve, reject) => {
      db.collection("Product").insertOne(newProduct, (err, result) => {
        if (err) reject(err);
        else {
          resolve(result);
          this.client.close();
        }
      });
    });
  }
  async getAllProducts() {
    const db = await this.connect();
    return new Promise((resolve, reject) => {
      db.collection("Product")
        .find()
        .toArray((err, result) => {
          if (err) reject(err);
          this.client.close();
          resolve(result);
        });
    });
  }
  async getProductByID(id) {
    const db = await this.connect();
    return new Promise((resolve, reject) => {
      db.collection("Product")
        .find({})
        .toArray((err, result) => {
          if (err) reject(err);
          this.client.close();
          var prd = result.find((p) => p._id == id);
          resolve(prd);
        });
    });
  }
}
module.exports = ProductController;
