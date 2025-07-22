const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product");

require("dotenv").config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use('/product', productRoutes);

//MongoDB models
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB Connected");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
});

//Start server
app.listen(5000, () => console.log("Server running on port 5000"));

