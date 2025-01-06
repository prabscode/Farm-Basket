import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Star, Tag } from "lucide-react"; // Icons
import Navbar from "./components/Navbar";
import { FaSignInAlt } from "react-icons/fa";

export default function DetailCard() {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchWorkDetails = async () => {
      try {
        const response = await fetch(
          "https://omegaxomv.github.io/LAST/API.json"
        );
        const data = await response.json();
        const selectedWork = data.find(
          (workItem) => workItem.id === parseInt(id)
        );
        setWork(selectedWork);
      } catch (error) {
        console.error("Error fetching work details:", error);
      }
    };
    fetchWorkDetails();
  }, [id]);

  if (!work) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const checkoutData = {
      userEmail: formData.email,
      productOwnerEmail: work.email, // Product owner's email from the work details
      productName: work.caption, // Product name from the work details
    };

    try {
      const response = await fetch("http://localhost:5001/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.alert("Error submitting form 2:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/3">
              <img
                src={work.photo_link}
                alt={work.caption}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Details Section */}
            <div className="md:flex-1 md:ml-6 mt-6 md:mt-0">
              <h2 className="text-3xl font-bold mb-2">{work.farmer_name}</h2>
              <p className="text-gray-400 mb-4">{work.caption}</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{work.location}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>Rating: 4.5 stars</span> {/* Example static rating */}
                </div>

                <div className="flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-gray-500" />
                  <span>{work.category}</span>
                </div>

                <p className="text-sm text-gray-400 mt-2">
                  Contact: {work.phone_number}
                </p>
                <p className="text-sm text-gray-400">Email: {work.email}</p>
              </div>

              <button
                onClick={() => setFormVisible(true)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded w-6/12 focus:outline-none focus:shadow-outline flex items-center justify-center"
              >
                <FaSignInAlt className="mr-2" /> Checkout
              </button>

              {/* Modal for Checkout Form */}
              {formVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full relative">
                    <button
                      onClick={() => setFormVisible(false)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-white focus:outline-none"
                    >
                      X {/* Close button */}
                    </button>
                    <form
                      onSubmit={handleSubmit}
                      className="mt-6 space-y-4 bg-gray-800 p-4 rounded-lg"
                    >
                      <div className="space-y-2">
                        <label htmlFor="name">Full Name</label>
                        <input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 text-gray-100 border-gray-500 p-2 rounded outline outline-2 outline-gray-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="address">Address</label>
                        <input
                          id="address"
                          placeholder="123 Main St"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 text-gray-100 border-gray-500 p-2 rounded outline outline-2 outline-gray-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="city">Quantity</label>
                          <input
                            id="city"
                            placeholder="Enter the Quantity"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 text-gray-100 border-gray-500 p-2 rounded outline outline-2 outline-gray-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="state">State</label>
                          <input
                            id="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 text-gray-100 border-gray-500 p-2 rounded outline outline-2 outline-gray-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="(123) 456-7890"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 text-gray-100 border-gray-500 p-2 rounded outline outline-2 outline-gray-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email">Email Address</label>
                        <input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800 text-gray-100 border-gray-500 p-2 rounded outline outline-2 outline-gray-500"
                        />
                      </div>

                      <button
                      onClick={()=>{alert("Request has been send ")}}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
