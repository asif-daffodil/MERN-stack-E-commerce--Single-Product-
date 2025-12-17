import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Modhu = () => {
    const [deliveryArea, setDeliveryArea] = useState("");
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [productName, setProductName] = useState("Classic Honey Combo - 2kg");
    const [productPrice, setProductPrice] = useState(1750);
    const [totalAmount, setTotalAmount] = useState(productPrice + deliveryCharge);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const {register, handleSubmit, reset, formState: { errors }} = useForm();

    const onSubmit = async data => {
        data.productName = productName;
        data.productPrice = productPrice;
        data.deliveryCharge = deliveryCharge;
        data.quantity = quantity;
        data.totalProductPrice = productPrice * quantity;
        data.totalAmount = totalAmount;
        console.log(data);
        reset();
        setDeliveryCharge(0);
        setDeliveryArea("");
        setQuantity(1);
        setTotalAmount(productPrice + 0);
        await axios.post("http://localhost:4000/api/v1.0.0/order", data)
        .then(res => {
            // check if response status code is 201
            if(res.status === 201 && res.data.success) {
                navigate("/confirm-order");
            }
            if(res.status === 500) {
                throw new Error(res.data.error);
            }
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message,
            });
        });
    }

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        setTotalAmount((1750 * newQuantity) + deliveryCharge);
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            setTotalAmount((1750 * newQuantity) + deliveryCharge);
        }
    }

    useEffect(() => {
        setTotalAmount((1750 * quantity) + deliveryCharge);
    }, [deliveryCharge, quantity]);

    return (
        <div className="container mx-auto px-2 md:px-4 py-3 md:py-6 text-center bg-white">
            <h1 className="text-center text-3xl mb-3">ক্লাসিক হানি কম্বো | Classic Honey Combo</h1>
            <img src="https://pub-b80211003304448e8a7f0edc480f0608.r2.dev/4%20Honey%20500gm%20as_KMGk2cb1.webp" alt="" className="w-full md:w-1/3 m-auto mb-6" />
            <a className="bg-yellow-400 px-4 py-2 font-bold rounded" href="#orderForm">অর্ডার করতে চাই</a>
            <h2 className="bg-green-600 text-white text-center my-5 py-3 w-full md:w-2/3 mx-auto">প্রয়োজনে কল করুন - 09639812525</h2>
            <div className="border border-gray-300 rounded p-4 w-full md:w-2/3 mx-auto">
                <form action="" id="orderForm" className="grid md:grid-cols-2 gap-4 text-left" onSubmit={handleSubmit(onSubmit)}>
                    <div className="border border-gray-300 rounded p-2">
                        <h3 className="text-center text-xl font-bold my-4">অর্ডার করতে নিচের তথ্যগুলি দিন</h3>
                        <div className="w-full flex justify-between items-center gap-3 mb-3">
                            <label htmlFor="" className="w-1/5 font-bold">নাম</label>
                            <input type="text" placeholder="আপনার নাম" className="border border-gray-300 rounded p-2 w-4/5" {...register("name", {
                                required: "Name is required"
                            })} />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs text-right mb-3 -mt-3">{errors.name.message}</p>}
                        <div className="w-full flex justify-between items-center gap-3 mb-3">
                            <label htmlFor="" className="w-1/5 font-bold">মোবাইল নাম্বার</label>
                            <input type="text" placeholder="11 ডিজিট মোবাইল নাম্বার" className="border border-gray-300 rounded p-2 w-4/5" {...register("mobile", {
                                required: "Mobile number is required",
                                pattern: {
                                    value: /^[0-9]{11}$/,
                                    message: "Invalid mobile number"
                                }
                            })} />
                        </div>
                        {errors.mobile && <p className="text-red-500 text-xs text-right mb-3 -mt-3">{errors.mobile.message}</p>}
                        <div className="w-full flex justify-between items-center gap-3 mb-3">
                            <label htmlFor="" className="w-1/5 font-bold">ঠিকানা</label>
                            <textarea type="text" placeholder="আপনার বাসার সম্পূর্ণ ঠিকানা" className="border border-gray-300 rounded p-2 w-4/5" {...register("address", {
                                required: "Address is required"
                            })}></textarea>
                        </div>
                        {errors.address && <p className="text-red-500 text-xs text-right mb-3 -mt-3">{errors.address.message}</p>}
                        <div className="w-full flex justify-between items-center gap-3 mb-3">
                            <label htmlFor="" className="w-1/5 font-bold">অর্ডার নোট</label>
                            <input type="text" placeholder="স্পেশাল কিছু বলতে চাইলে লেখুন (অপশনাল)" className="border border-gray-300 rounded p-2 w-4/5" {...register("orderNote")} />
                        </div>
                        <div className="w-full flex flex-col justify-center items-start gap-3 mb-3">
                            <label htmlFor="" className="font-bold">ডেলিভারি এলাকা</label>
                            <label htmlFor="insideDhaka" className={`border rounded w-full flex items-center p-2 ${deliveryArea === "insideDhaka" ? "border-black" : "border-gray-300"}`}>
                                <input type="radio" id="insideDhaka" {...register("deliveryArea", { required: "Delivery area is required" })} value="insideDhaka" onChange={(e) => {setDeliveryArea(e.target.value); setDeliveryCharge(50)}} className="size-4 mr-2" />
                                ঢাকা সিটির ভেতরে
                                <div className="ml-auto font-bold">৳50</div>
                            </label>
                            <label htmlFor="outsideDhaka" className={`border rounded w-full flex items-center p-2 ${deliveryArea === "outsideDhaka" ? "border-black" : "border-gray-300"}`}>
                                <input type="radio" id="outsideDhaka" {...register("deliveryArea", { required: "Delivery area is required" })} className="size-4 mr-2" value="outsideDhaka" onChange={(e) => {setDeliveryArea(e.target.value); setDeliveryCharge(80)}} />
                                ঢাকা সিটির বাহিরে
                                <div className="ml-auto font-bold">৳80</div>
                            </label>
                            <label htmlFor="insideBd" className={`border rounded w-full flex items-center p-2 ${deliveryArea === "insideBd" ? "border-black" : "border-gray-300"}`}>
                                <input type="radio" id="insideBd" {...register("deliveryArea", { required: "Delivery area is required" })} value="insideBd" onChange={(e) => {setDeliveryArea(e.target.value); setDeliveryCharge(100)}} className="size-4 mr-2" />
                                ঢাকা জেলার বাহিরে
                                <div className="ml-auto font-bold">৳100</div>
                            </label>
                        </div>
                        {errors.deliveryArea && <p className="text-red-500 text-xs text-right mb-3 -mt-3">{errors.deliveryArea.message}</p>}
                        <button type="submit" className="bg-orange-600 text-white font-bold w-full rounded py-3 cursor-pointer animate-[shaking_2s_ease-in-out_infinite_0s] ">অর্ডার কনফার্ম করুন {totalAmount.toLocaleString()} TK</button>
                        <div className="text-xs text-center text-gray-500 py-4">
                            আমাদের একজন কাস্টমার প্রতিনিধি আপনাকে কল করে আবার কনফার্ম হবে
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-6">পন্য বাছাই করুন</h3>
                        <div htmlFor="" className="border p-4 rounded flex gap-3 bg-gray-50 mb-3">
                            <input type="radio" defaultChecked className="size-5 border border-gray-300" />
                            <img src="https://pub-b80211003304448e8a7f0edc480f0608.r2.dev/WW_KMG3qle6k.webp" alt="" className="w-24" />
                            <div>
                                <h4 className="font-bold text-lg">২ কেজি - প্রিমিয়াম কম্বো</h4>
                                <h4 className="font-bold text-lg">৳1,750 <span className="text-sm line-through font-light">৳2,100</span><span className="text-sm font-medium bg-red-500 text-white rounded-full px-2 py-1 ml-1">17% OFF</span></h4>
                                <div className="flex items-center gap-3 mt-3">
                                    Quantity: 
                                    <div className="*:py-2 *:px-3 border-2 border-gray-300 rounded-md">
                                        <button className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-l-md" onClick={() => handleDecrement()} type="button">-</button>
                                        <span className="bg-white">{quantity}</span>
                                        <button className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-r-md" onClick={() => handleIncrement()} type="button">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 rounded border border-gray-300 bg-white flex flex-col gap-3">
                            <div className="flex justify-between">
                                <span>মোট</span>
                                <span>৳{(totalAmount - deliveryCharge).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>ডেলিভারি চার্জ</span>
                                <span>{deliveryCharge === 0 ? "Select Delivery Area" : `৳${deliveryCharge.toLocaleString()}`}</span>
                            </div>
                            <hr className="bg-transparent border-t border-gray-200" />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>{deliveryCharge === 0 ? "Select Delivery Area" : `৳${(totalAmount).toLocaleString()}`}</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modhu;