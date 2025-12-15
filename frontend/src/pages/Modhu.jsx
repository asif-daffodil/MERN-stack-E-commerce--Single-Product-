import { useState } from "react";

const Modhu = () => {
    const [deliveryArea, setDeliveryArea] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);

    return (
        <div className="container mx-auto px-2 md:px-4 py-3 md:py-6 text-center bg-white">
            <h1 className="text-center text-3xl mb-3">ক্লাসিক হানি কম্বো | Classic Honey Combo</h1>
            <img src="https://pub-b80211003304448e8a7f0edc480f0608.r2.dev/4%20Honey%20500gm%20as_KMGk2cb1.webp" alt="" className="w-full md:w-1/3 m-auto mb-6" />
            <a className="bg-yellow-400 px-4 py-2 font-bold rounded" href="#orderForm">অর্ডার করতে চাই</a>
            <h2 className="bg-green-600 text-white text-center my-5 py-3 w-full md:w-2/3 mx-auto">প্রয়োজনে কল করুন - 09639812525</h2>
            <div className="border border-gray-300 rounded p-4 w-full md:w-2/3 mx-auto">
                <form action="" id="orderForm" className="grid md:grid-cols-2 gap-4 text-left">
                    <div className="border border-gray-300 rounded p-2">
                        <h3 className="text-center text-xl font-bold my-4">অর্ডার করতে নিচের তথ্যগুলি দিন</h3>
                        <div className="w-full flex justify-between items-center gap-3 mb-3">
                            <label htmlFor="" className="w-1/5 font-bold">নাম</label>
                            <input type="text" placeholder="আপনার নাম" className="border border-gray-300 rounded p-2 w-4/5" />
                        </div>
                        <div className="w-full flex justify-between items-center gap-3 mb-3">
                            <label htmlFor="" className="w-1/5 font-bold">মোবাইল নাম্বার</label>
                            <input type="text" placeholder="11 ডিজিট মোবাইল নাম্বার" className="border border-gray-300 rounded p-2 w-4/5" />
                        </div>
                        <div className="w-full flex justify-between items-center gap-3 mb-3">
                            <label htmlFor="" className="w-1/5 font-bold">ঠিকানা</label>
                            <textarea type="text" placeholder="আপনার বাসার সম্পূর্ণ ঠিকানা" className="border border-gray-300 rounded p-2 w-4/5"></textarea>
                        </div>
                        <div className="w-full flex justify-between items-center gap-3 mb-3">
                            <label htmlFor="" className="w-1/5 font-bold">অর্ডার নোট</label>
                            <input type="text" placeholder="স্পেশাল কিছু বলতে চাইলে লেখুন (অপশনাল)" className="border border-gray-300 rounded p-2 w-4/5" />
                        </div>
                        <div className="w-full flex flex-col justify-center items-start gap-3 mb-3">
                            <label htmlFor="" className="font-bold">ডেলিভারি এলাকা</label>
                            <label htmlFor="insideDhaka" className={`border rounded w-full flex items-center p-2 ${deliveryArea === "insideDhaka" ? "border-black" : "border-gray-300"}`}>
                                <input type="radio" id="insideDhaka" name="deliveryArea" value="insideDhaka" onChange={(e) => setDeliveryArea(e.target.value)} className="size-4 mr-2" />
                                ঢাকা সিটির ভেতরে
                                <div className="ml-auto font-bold">৳50</div>
                            </label>
                            <label htmlFor="outsideDhaka" className={`border rounded w-full flex items-center p-2 ${deliveryArea === "outsideDhaka" ? "border-black" : "border-gray-300"}`}>
                                <input type="radio" id="outsideDhaka" name="deliveryArea" className="size-4 mr-2" value="outsideDhaka" onChange={(e) => setDeliveryArea(e.target.value)} />
                                ঢাকা সিটির বাহিরে
                                <div className="ml-auto font-bold">৳80</div>
                            </label>
                            <label htmlFor="insideBd" className={`border rounded w-full flex items-center p-2 ${deliveryArea === "insideBd" ? "border-black" : "border-gray-300"}`}>
                                <input type="radio" id="insideBd" name="deliveryArea" value="insideBd" onChange={(e) => setDeliveryArea(e.target.value)} className="size-4 mr-2" />
                                ঢাকা জেলার বাহিরে
                                <div className="ml-auto font-bold">৳100</div>
                            </label>
                        </div>
                        <button type="submit" className="bg-orange-600 text-white font-bold w-full rounded py-3 cursor-pointer animate-[shaking_2s_ease-in-out_infinite_0s] ">অর্ডার কনফার্ম করুন {totalAmount} TK</button>
                        <div className="text-xs text-center text-gray-500 py-4">
                            আমাদের একজন কাস্টমার প্রতিনিধি আপনাকে কল করে আবার কনফার্ম হবে
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-6">পন্য বাছাই করুন</h3>
                        <label htmlFor="" className="border p-4 rounded flex gap-3 bg-gray-100">
                            <input type="radio" checked className="size-5 border border-gray-300" />
                            <img src="https://pub-b80211003304448e8a7f0edc480f0608.r2.dev/WW_KMG3qle6k.webp" alt="" className="w-24" />
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modhu;