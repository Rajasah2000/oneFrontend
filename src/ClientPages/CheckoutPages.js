import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  IconButton,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { Add, Remove, Payment } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import Helpers from "../Helper/Helpers";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

// import { loadRazorpay } from "../utils/paymentUtils"; // Utility function for Razorpay integration

export default function CheckoutPage() {
  const location = useLocation();
  const { cart, getAllCartData, getAllOrder } = useCart();
  const [orderId, setOrderId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { userDetails } = useCart();
  const navigate = useNavigate();
  let InitialData = {
    name: userDetails?.name,
    mobile: "",
    email: userDetails?.email,
    city: "",
    state: "",
    zip: "",
    address: "",
    note: "",
    paymentMethod: "cash",
  };
  const [formData, setFormData] = useState(InitialData);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("locationfffffffff", location.state, userDetails);
  }, []);

  const generateOrder = async (orderdata) => {
    let data = {
      amount: 1, // Amount in INR
      currency: "INR",
      receipt: "receipt_001",
    };
    try {
      const response = await Helpers(`/generate-order`, "POST", data, {});
      if (response && response?.success) {
        console.log("Payff", response?.order);

        // const { order } = response?.order;
        setOrderId(response?.order?.id); // Save the order ID for further steps
        console.log("Order Generated:", response?.order?.id);
        if (orderdata?.paymentMethod === "cash") {
          await addOrder(orderdata, response?.order?.id);
        } else {
          startPayment(response?.order);
        }
      } else {
        console.log(response?.error);
      }
    } catch (error) {
      console.error("Error generating order:", error);
    }
  };

  const startPayment = async (order) => {
    if (!order || !order.id) return;
    const orderData = {
      user: {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        address: formData.address,
        note: formData.note,
      },
      cartItems: location?.state?.cart,
      totalAmount: location?.state?.price,
      paymentMethod: formData.paymentMethod,
      // orderId: formData?.id,
    };
    if (!window.Razorpay) {
      console.error("Razorpay SDK not loaded");
      alert("Failed to load Razorpay SDK. Please try again later.");
      return;
    }
    const options = {
      key: "rzp_live_1Dbrh57RMoBb1K",
      amount: order.amount,
      currency: order.currency,
      name: "OneFit",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        try {
          let data = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          const verifyResponse = await Helpers(
            `/verify-payment`,
            "POST",
            data,
            {}
          );

          console.log(
            "verifyResponse",
            verifyResponse,
            verifyResponse?.success
          );

          if (verifyResponse && verifyResponse.success) {
            setPaymentStatus("Payment Verified Successfully!");
            await addOrder(orderData, order.id);
          } else {
            setPaymentStatus("Payment Verification Failed.");
            navigate("/checkout");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          setPaymentStatus("Payment Verification Failed.");
          navigate("/checkout");
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.mobile,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Validate fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Valid mobile number is required";
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      newErrors.email = "Valid email is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zip.trim() || !/^\d{5,6}$/.test(formData.zip))
      newErrors.zip = "Valid ZIP code is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const removeAllCartItem = async (id) => {
    try {
      // Make API call to delete the cart item
      const response = await Helpers(
        `/user/cart/delete-all`,
        "DELETE",
        null,
        {}
      );

      if (response && response?.status) {
        // toast?.success(response?.message);
        getAllCartData();
      }
    } catch (error) {
      console.error("Error deleting all item:", error.message);
    }
  };

  // Submit Handler
  const handleSubmit = async () => {
    if (!validate()) {
      toast?.error("Please fill in all required fields correctly.");
      return;
    }

    const orderData = {
      user: {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        address: formData.address,
        note: formData.note,
      },
      cartItems: location?.state?.cart,
      totalAmount: location?.state?.price,
      paymentMethod: formData.paymentMethod,
    };

    await generateOrder(orderData);

    // if (formData.paymentMethod === "cash") {
    //   await addOrder(orderData);
    // } else {
    //   console.log("kkkkkkkkkkkkkk", orderData);
    //   await generateOrder(orderData);
    //   // await handleRazorpayPayment(orderData);
    // }
  };

  // Add Order API Call
  const addOrder = async (orderData, orderId) => {
    orderData.orderId = orderId;
    try {
      const response = await Helpers("/user/orders/add", "POST", orderData);
      if (response.status) {
        toast.success("Order placed successfully!");
        setFormData(InitialData);
        removeAllCartItem();
        getAllOrder();
        navigate("/order");
      } else {
        console.log("Error placing order: " + response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Razorpay Payment Integration
  // const handleRazorpayPayment = async (orderData) => {
  //   const paymentResponse = await loadRazorpay();
  //   if (!paymentResponse) {
  //     alert("Razorpay SDK failed to load. Are you online?");
  //     return;
  //   }

  //   const options = {
  //     key: "YOUR_RAZORPAY_KEY_ID",
  //     amount: subtotal * 100,
  //     currency: "INR",
  //     name: "Your Store",
  //     description: "Order Payment",
  //     handler: async function (response) {
  //       orderData.paymentDetails = response;
  //       await addOrder(orderData);
  //     },
  //     prefill: {
  //       name: formData.name,
  //       email: formData.email,
  //       contact: formData.mobile,
  //     },
  //   };

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // };

  return (
    <Container maxWidth="lg" className="py-8 mt-16">
      <Grid container spacing={4}>
        {/* Delivery Information Section */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" className="mb-4 font-bold">
            Delivery Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                error={!!errors.mobile}
                helperText={errors.mobile}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                error={!!errors.city}
                helperText={errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                error={!!errors.state}
                helperText={errors.state}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="ZIP"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                error={!!errors.zip}
                helperText={errors.zip}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
          </Grid>

          <TextField
            style={{ marginTop: "16px" }}
            fullWidth
            label="Note"
            placeholder="Type your note"
            multiline
            rows={3}
            className="mt-4"
            name="note"
            value={formData.note}
            onChange={handleInputChange}
          />

          <div className="mt-6">
            <Typography variant="h6" className="mb-2">
              Payment Method
            </Typography>
            <RadioGroup
              value={formData.paymentMethod}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  paymentMethod: e.target.value,
                }))
              }
            >
              <FormControlLabel
                value="online"
                control={<Radio />}
                label={
                  <>
                    <Payment style={{ marginRight: "8px" }} /> Online Payment
                  </>
                }
              />
              <FormControlLabel
                value="cash"
                control={<Radio />}
                label={
                  <>
                    <Payment style={{ marginRight: "8px" }} /> Cash on Delivery
                  </>
                }
              />
            </RadioGroup>
          </div>
        </Grid>

        {/* Order Summary Section */}
        <Grid item xs={12} md={5}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h5" className="mb-4 font-bold">
                Order Summary
              </Typography>
              {cart.map((item, index) => (
                <div key={index} className="flex items-center mb-4">
                  <Avatar
                    variant="rounded"
                    src={item.image || "/placeholder.png"}
                    alt={item.Title}
                    className="w-16 h-16 bg-gray-200 mr-4 rounded-lg"
                  />
                  <div className="flex-grow">
                    <Typography variant="subtitle1" className="font-semibold">
                      {item.Title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price.toFixed(2)}
                    </Typography>
                  </div>
                  <div className="flex items-center">
                    <IconButton size="small">
                      <Remove />
                    </IconButton>
                    <Typography className="mx-2">{item.quantity}</Typography>
                    <IconButton size="small">
                      <Add />
                    </IconButton>
                  </div>
                </div>
              ))}

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between">
                  <Typography>Subtotal</Typography>
                  <Typography>₹{location?.state?.price}</Typography>
                </div>
                {/* <div className="flex justify-between mt-2">
                  <Typography>Shipping</Typography>
                  <Typography>--</Typography>
                </div> */}
                <div className="flex justify-between mt-4 font-bold">
                  <Typography>Total (INR)</Typography>
                  <Typography>₹{location?.state?.price}</Typography>
                </div>
              </div>

              <Button
                variant="contained"
                fullWidth
                className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                onClick={handleSubmit}
              >
                Confirm Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
