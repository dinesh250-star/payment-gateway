const express = require("express");
const app = express();
const cors = require("cors");
const Razorpay = require("razorpay");
app.use(cors());
app.use(express.json());
var instance = new Razorpay({
  key_id: "rzp_test_tJjCIXswffCju3",
  key_secret: "rNnnYJLnYpUwB1TvdxAPBnAT",
});

app.listen(3001, () => {
  console.log("server is running");
});
app.post("/deposit", (req, res) => {
  const value = req.body.value;
  const id = req.body.id;

  if (id) {
    res.send("success");
  } else {
    res.send("false");
  }
});
