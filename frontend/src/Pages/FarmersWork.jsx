import { useState, useEffect } from 'react';
import './FarmersWork.css';
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import { FaLeaf, FaSearch, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import FarmersDashboard from './FamersDashboard';



const categories = ["All", "Grain", "Vegetables", "Fruits", "Dairy", "Eggs"];


const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};


function FarmersWork() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [farmersWork, setFarmersWork] = useState([]); // Original data
  const [filteredWork, setFilteredWork] = useState([]); // Filtered data for display
  const [loading, setLoading] = useState(true);


  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://omegaxomv.github.io/LAST/API.json'); // Update to your API URL
        const data = await response.json();
        setFarmersWork(data); // Store the original data
        setFilteredWork(data); // Set the initial filtered work to the original data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter data based on search and category
  useEffect(() => {
    const filtered = farmersWork.filter(work =>
      (work.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
       work.farmer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       work.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
       work.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "All" || work.category === selectedCategory)
    );
    setFilteredWork(filtered);
  }, [searchTerm, selectedCategory, farmersWork]); // Also include `farmersWork` in the dependencies

  // Function to handle new post addition
  const handleNewPost = (newPost) => {
    setFarmersWork((prevPosts) => [...prevPosts, newPost]); // Update original data
    setFilteredWork((prevPosts) => [...prevPosts, newPost]); // Update filtered data
  };

  

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="bg-gray-800 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="text-green-400 text-2xl font-bold flex items-center">
            <FaLeaf className="mr-2" />
            <span className="text-gradient">FarmBasket</span>
          </a>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-300 hover:text-green-400 hover-underline-animation">Home</Link>
            <a className="text-gray-300 hover:text-green-400 hover-underline-animation">Farmers Showcase</a>
          </div>
        </div>
      </nav>

      <section className="py-12 md:py-24 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ">
            Farmers' Work
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6 typewriter">
            Discover the fruits of our farmers' labor.
          </p>
        </div>
      </section>

      <section className="py-8 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search farmers' work..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex items-center gap-4">
              <FaFilter className="text-green-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-700 text-white border-gray-600 focus:border-green-400 focus:ring-green-400 rounded-lg p-2"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

     

      {/* Farmers' Work Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-gray-400">Loading data...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWork.map((work) => (
                <motion.div
                  key={work.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
                >
                 <Link to={`/work/${work.id}`} className="block">
                  <img
                    src={work.photo_link}
                    alt={work.caption}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 ">{work.caption}</h3>
                    <p className="text-gray-400 mb-2">{work.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400">{work.farmer_name}</span>
                      <span className="text-sm text-gray-500">{work.category}</span>
                    
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Contact: {work.phone_number}</p>
                    <p className="text-sm text-gray-400">Email: {work.email}</p>
                  </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

     
     

      {/* Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">&copy; 2023 FarmFresh. All rights reserved.</p>
          <div className="mt-4">
            <a href="/" className="text-gray-400 hover:text-green-400 hover-underline-animation mx-2">Home</a>
            <a href="#" className="text-gray-400 hover:text-green-400 hover-underline-animation mx-2">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-green-400 hover-underline-animation mx-2">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default FarmersWork;
