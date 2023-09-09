import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";

const CompanyHistory = () => {
  return (
    <div className="bg-white w-full h-screen flex flex-col relative ">
      <Navbar />
      <main className="flex flex-grow flex-col lg:px-0 mt-20 max-w-screen-xl mx-auto w-full px-10">
        <div className="w-full text-2xl font-semibold text-left text-gray-400 mt-20">
          Our 7 days return policy
        </div>
        <div className="w-full mt-5">
          <span className="text-lg">
            You may return most new, unopened items within 7 days of delivery
            for a full refund. We'll pay the return shipping costs if the return
            is a result of our error (you received an incorrect or defective
            item, etc.)
          </span>
          <p className="text-lg mt-5">
            You should expect to receive your refund within four weeks of giving
            your package to the return shipper, however, in many cases you will
            receive a refund more quickly. This time period includes the transit
            time for us to receive your return from the shipper (5 to 10
            business days), the time it takes us to process your return once we
            receive it (3 to 5 business days), and the time it takes your bank
            to process our refund request (5 to 10 business days).
          </p>
          <p className="text-lg mt-5">
            If you need to return an item, simply login to your account, view
            the order using the "Complete Orders" link under the My Account menu
            and click the Return Item(s) button. You also need to upload the
            image of product while stating the reason for returning. We'll
            notify you via e-mail of your refund once we've received and
            processed the returned item.
          </p>
        </div>
        <div className="w-full text-2xl font-semibold text-left text-gray-400 mt-20">
          Defective Products
        </div>
        <div className="w-full mt-5 flex flex-col">
          <span className="text-lg">
            If any product is found defective in the package, contact the
            customer support right away through email at '
            {process.env.NEXT_PUBLIC_PROJECT_EMAIL}' Please also click the
            photographs of the defective product and upload with stating the
            reason for return. We will arrange a pick up from your place and
            upon receiving the product, we will inspect it and make sure that it
            is exchanged and delivered to you in pristine condition or a full
            refund will be made as per terms and conditions.
          </span>
          <span className="text-lg mt-5">
            Please note that the exchange of products is subjected to the
            availability of the products at the time of returning the product.
          </span>
          <span className="text-lg mt-5">
            Please note: in case of a defective product received at your end,
            you must notify {process.env.NEXT_PUBLIC_PROJECT_EMAIL} within 24-48
            hours.
          </span>{" "}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyHistory;
