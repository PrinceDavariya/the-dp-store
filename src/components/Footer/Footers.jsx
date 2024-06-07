import React from "react";

const Footer = () => {
  return (
    <>
    <div className="bg-gray-100 py-8 px-4 mt-[4%] lg:px-16">
      <div className="container mx-auto flex flex-wrap justify-center items-start">
        {/* Lists Section */}
        <div className="flex w-auto max-lg:m-auto ml-[30%] m-auto mb-8 lg:mb-0">
          {/* Need Help Section */}
          <ul className="w-full lg:w-auto mr-8 mb-6 lg:mb-0">
            <h3 className="font-semibold text-lg mb-2">NEED HELP</h3>
            <li className="mb-2">Contact Us</li>
            <li className="mb-2">Track Order</li>
            <li className="mb-2">Returns &amp; Refunds</li>
            <li className="mb-2">FAQs</li>
            <li>My Account</li>
          </ul>

          {/* Company Section */}
          <ul className="w-full lg:w-auto mr-8 mb-6 lg:mb-0 max-sm:hidden">
            <h3 className="font-semibold text-lg mb-2">COMPANY</h3>
            <li className="mb-2">About Us</li>
            <li className="mb-2">Careers</li>
            <li className="mb-2">Community Initiatives</li>
            <li>DM Army</li>
          </ul>

          {/* More Info Section */}
          <ul className="w-full lg:w-auto max-sm:hidden">
            <h3 className="font-semibold text-lg mb-2">MORE INFO</h3>
            <li className="mb-2">Terms &amp; Conditions</li>
            <li className="mb-2">Privacy Policy</li>
            <li className="mb-2">Cookie Policy</li>
            <li className="mb-2">Security</li>
            <li>Sitemap</li>
          </ul>
        </div>

        {/* Policy Section */}
        <div className="flex   w-[100%] items-start max-sm:ml-[10%]  lg:items-center gap-4 mt-7 mb-8 lg:mb-0">
          <div className="">
            <div className="">
              <span className=" pl-2 pr-2 rounded-full border  border-black text-xl">₹</span>
            </div>
            <p>COD  Available</p>
          </div>

          <div>
            <span className="text-xl mr-2 ">
              <i className="p-1  rounded-full border  border-black ri-loop-right-line"></i>
            </span>
            <p>30 Days Easy Returns</p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex justify-center lg:justify-end w-full">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center mx-2">
              <i className="ri-facebook-fill text-white text-2xl"></i>
            </div>
            <div className="bg-pink-500 rounded-full w-10 h-10 flex items-center justify-center mx-2">
              <i className="ri-instagram-fill text-white text-2xl"></i>
            </div>
            <div className="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center mx-2">
              <i className="ri-snapchat-fill text-white text-2xl"></i>
            </div>
            <div className="bg-green-500 rounded-full w-10 h-10 flex items-center justify-center mx-2">
              <i className="ri-twitter-fill text-white text-2xl"></i>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
      </div>
        <div className="text-center lg:text-center mt-6 lg:mt-0 w-full">
          <i className="ri-copyright-line mr-1"></i>
          The DP Store 2024-25
        </div>
    </div>
       
        </>
    
  );
};

export default Footer;
