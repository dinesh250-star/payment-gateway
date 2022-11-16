import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
let id = "";

function App() {
  const [value, setValue] = useState();

  const activate = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/deposit", {
        value: value,
      })
      .then((response) => {
        console.log(response.data);
      });
  };
  const a = (e) => {
    setValue(e.target.value);
  };
  //
  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };
  const displayRazorpay = async (value) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_tJjCIXswffCju3",
      currency: "INR",
      amount: value * 100,
      name: "SupplyChain",
      description: "Thanks for purchasing",
      image:
        "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

      handler: async function (response) {
        id = response.razorpay_payment_id;
        console.log(response);
        if (id) {
          await axios
            .post("http://localhost:3001/deposit", {
              value: value,
              id: id,
            })
            .then((resp) => {
              console.log(resp.data);
            });
          alert(response.razorpay_payment_id);
          alert("Payment Successfully");
        } else {
          alert("error");
        }
      },
      prefill: {
        name: "code",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    rzp1.open();
  };

  return (
    <div className="App">
      <input type="number" placeholder="money" onChange={a} required />
      <button onClick={() => displayRazorpay(value)}>pay</button>
    </div>
  );
}

export default App;
