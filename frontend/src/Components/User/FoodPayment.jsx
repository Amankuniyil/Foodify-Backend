import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { useSelector } from 'react-redux';
import Razorpay from 'react-razorpay';
import SubTotal from '../Layout/SubTotal';



function FoodPayment() {
    const user = useSelector((state) => state.user);
    const { orderId } = useParams(); // Receive the order ID from URL parameters
    const [orderData, setOrderData] = useState({});
    const [orderTotal, setOrderTotal] = useState(0);
    const [orderResponse, setOrderResponse] = useState(null);
    

    useEffect(() => {
        async function fetchOrderDetails() {
            try {
                // Fetch order details from the backend based on the provided order ID
                const response = await api.get(`http://127.0.0.1:8000/orders/order-view/${orderId}`);
    
                if (response.data) {
                    const orderData = response.data;
                    setOrderData(orderData);
                    setOrderTotal(orderData.order_total);
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        }
    
        fetchOrderDetails();
    }, [orderId]);

    const initiateFoodPayment = async () => {
        try {
            const response = await api.post('http://127.0.0.1:8000/orders/initiate-payment/', {
                order_number: orderId,         // Use order_number instead of order_id
                order_total: orderTotal,       // Use order_total instead of deposit_amount
            });
            console.log("gg:",response.data.order_response)
            console.log('Payment:', response.data.order_response.id);
            console.log('p:',response.status)
    
            setOrderResponse(response.data.order_response);
            if(response.status==200){
                initPayment(response.data.order_response)
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };



    const initPayment =(order)=>{

        console.log(order.id)
        console.log(order.id)
        console.log(order.amount)
        var options={
            key:"rzp_test_bSa79V3eWORvIC",
            currency:"INR",
            name:"foodify",
            description:"for testing",
            amount:order.amount,
            order_id:order.id,
            handler:function(response){
                createOrder(response)
            },
            theme:{
                color:"#3399cc"
            },
        }
        var pay= new window.Razorpay(options)
        pay.open()
    }






    // const handleFoodPaymentSuccess = (paymentData) => {
    //     try {
    //         const requestData = {
    //             razorpay_order_id: paymentData.razorpay_order_id,
    //         };

    //         api.post('/orders/success-payment/', requestData)
    //             .then((response) => {
    //                 if (response.status === 200) {
    //                     window.location.href = 'http://127.0.0.1:8000/orders/success-payment/';
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error('Error processing payment:', error);
    //             });
    //     } catch (error) {
    //         console.error('Error processing payment:', error);
    //     }
    // }


    const createOrder=async(data)=>{
            try{
            const requestData = {
                razorpay_order_id: data.razorpay_order_id,
             
            };
            const response = await api.post('/orders/success-payment/',{data
    
            })
            console.log("Response from backend:", response.data);
            console.log("pa:",data)
            if (response.status === 200) {
                window.location.href = '/payment/success/';
            }
            }catch (error) {
                console.error('Error creating booking:', error);
            }  
        
    };

    return (
        <div>
            <div className="bg-gray-100 min-h-screen p-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                    <p>{ orderId }</p>
                    <p>Payment page</p>
                    <SubTotal />

                    {Object.keys(orderData).length > 0 && (
                        <div className="border rounded p-4 mb-4">
                            <h2 className="text-xl font-semibold">Order Details</h2>

                            <div className="mt-4">
                                <p>Order Total: ₹{orderTotal}</p>
                            </div>

                            {orderResponse ? (
                                <Razorpay
                                    order_id={orderResponse.id}
                                    currency="INR"
                                    amount={orderResponse.amount}
                                    name="EliteFood"
                                    description="for testing"
                                    handler={createOrder}
                                    theme={{
                                        color: "#3399cc",
                                    }}
                                >
                                    <button className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Pay Now
                                    </button>
                                </Razorpay>
                            ) : (
                                <button
                                    className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={initiateFoodPayment}
                                >
                                    Initiate Payment
                                </button>
                            )}
                        </div>
                    )}
{/* 
                    {Object.keys(orderData).length > 0 && (
                        <div className="border rounded p-4 mb-4">
                            <h2 className="text-xl font-semibold">Vendor Details</h2>
                            <p>Vendor Name: {orderData.food.vendor.vendor_details.username}</p>
                            <p>Contact: {orderData.food.vendor.vendor_details.phone_number}</p>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
}

export default FoodPayment;
