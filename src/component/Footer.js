import React from 'react';
import { FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        
        {/* Column 1: Achievements */}
        <div>
          <h3 className="text-lg font-bold mb-4">Achievements</h3>
          <div className="flex items-center mb-2">
            <FaYoutube className="text-yellow-400 mr-2" />
            <span>YouTube: 200k+ Subscribers</span>
          </div>
          <div className="flex items-center mb-2">
            <FaInstagram className="text-yellow-400 mr-2" />
            <span>Instagram: 200k+ Followers</span>
          </div>
          <div className="flex items-center mb-2">
            <FaFacebook className="text-yellow-400 mr-2" />
            <span>Facebook: 50k+ Followers</span>
          </div>
        </div>

        {/* Column 2: Customer Service */}
        <div>
          <h3 className="text-lg font-bold mb-4">Customer Service</h3>
          <ul>
            <li>
              <Link to="/faq" className="hover:underline text-left">FAQ</Link>
            </li>
            <li>
              <Link to="/track-order" className="hover:underline text-left">Track Your Order</Link>
            </li>
            <li>
              <Link to="/return-refund-policy" className="hover:underline text-left">Return & Refund Policy</Link>
            </li>
            <li>
              <Link to="/customer-care" className="hover:underline text-left">Customer Care</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline text-left">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-conditions" className="hover:underline text-left">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:underline text-left">Terms of Service</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: About Us */}
        <div>
          <h3 className="text-lg font-bold mb-4">About Us</h3>
          <ul>
            <li>
              <Link to="/business-enquiry" className="hover:underline text-left">Business Enquiry</Link>
            </li>
            <li>
              <Link to="/disclaimer" className="hover:underline text-left">Disclaimer</Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:underline text-left">Cookies</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Collections */}
        <div>
          <h3 className="text-lg font-bold mb-4">Collections</h3>
          <ul>
            <li>
              <Link to="/collections/tracksuits" className="hover:underline text-left">Track Suits</Link>
            </li>
            <li>
              <Link to="/collections/tshirts" className="hover:underline text-left">T-shirts</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-8">
        <p>&copy; {new Date().getFullYear()} OneFit Sports. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
