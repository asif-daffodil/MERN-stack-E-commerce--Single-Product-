
const ConfirmOrder = () => {
    return (
        <div className="container mx-auto p-4 min-h-[calc(100vh-156px)] flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-center">Thank you for your order</h1>
            <p className="text-center mt-4">Your order has been successfully placed. We will process it shortly.</p>
            <p>
                One of our representatives will contact you soon to confirm the details of your order.
            </p>

            {/* in Bengeli */}
            <h1 className="text-3xl font-bold text-center mt-8">আপনার অর্ডারের জন্য ধন্যবাদ</h1>
            <p className="text-center mt-4">আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে। আমরা শীঘ্রই এটি প্রক্রিয়া করব।</p>
            <p>
                আমাদের একজন প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন আপনার অর্ডারের বিবরণ নিশ্চিত করার জন্য।
            </p>
        </div>
    );
};

export default ConfirmOrder;