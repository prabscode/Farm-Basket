import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLeaf, FaShoppingBasket, FaUsers, FaChartLine, FaBars } from 'react-icons/fa';
import './Home.css';
import { useNavigate , BrowserRouter , Router , Routes , Route } from 'react-router-dom';
import Navbar from './components/Navbar';



const images = [
  'https://st2.depositphotos.com/3591429/6311/i/450/depositphotos_63118539-stock-photo-india-family-faeming-harvesting-crops.jpg',
  'https://c8.alamy.com/comp/2CC5TAG/woman-rice-farmer-harvesting-stalks-of-rice-grain-in-rural-bihar-india-2CC5TAG.jpg',
  'https://images.pexels.com/photos/235731/pexels-photo-235731.jpeg?cs=srgb&dl=pexels-pixabay-235731.jpg&fm=jpg'
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

function AnimatedSection({ children, className }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerChildren}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Button({ children, className, onClick, variant }) {
  const baseClass = "px-4 py-2 rounded-md font-medium transition-colors duration-200";
  const variantClass = variant === "outline" 
    ? "border border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
    : "bg-green-500 text-gray-900 hover:bg-green-400";

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

function Home() {

  const navigate = useNavigate();

 
  const [currentImage, setCurrentImage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
   

      <Navbar></Navbar>

      {/* Hero Section */}
      <AnimatedSection className="py-8 md:py-16 lg:py-20 xl:py-32 px-4 md:px-6">

        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div variants={fadeInUp} className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ">
                Fresh from Farm to Your Table
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-6 pb-4 typewriter">
                Discover the taste of locally grown produce.
              </p>
              <div className="flex space-x-4">
                <Button  onClick={()=>{navigate("/farmersWork")}} className="pulse-animation">Explore More!</Button>
                
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="md:w-1/2 relative h-[450px] w-full max-w-[450px]">
              {images.map((src, index) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: index === currentImage ? 1 : 0,
                    y: index === currentImage ? 0 : 20
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={src}
                    alt={`Farm image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection id="about" className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center mb-8 rainbow-text">Why Choose FarmFresh?</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
              <FaShoppingBasket className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-green-400">Fresh Produce</h3>
              <p className="text-gray-400">Get the freshest fruits and vegetables directly from local farms.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
              <FaUsers className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-green-400">Support Local Farmers</h3>
              <p className="text-gray-400">Your purchases directly support hardworking farmers in your community.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center">
              <FaChartLine className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-green-400">Sustainable Practices</h3>
              <p className="text-gray-400">We promote environmentally friendly and sustainable farming methods.</p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Products Section */}
      <AnimatedSection id="products" className="py-12">
  <div className="container mx-auto px-4">
    <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center mb-8 rainbow-text">
      Featured Products
    </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          id: 1,
          title: "Farm Fresh Product 1",
          img: "https://skrmindia.com/blog/wp-content/uploads/2017/09/Basmati-Rice-Paddy-Shree-krishna-rice-mills.jpg"
        },
        {
          id: 2,
          title: "Farm Fresh Product 2",
          img: "https://peacedeen.wordpress.com/wp-content/uploads/2012/04/12168242.jpg" // Replace this with the second image URL
        },
        {
          id: 3,
          title: "Farm Fresh Product 3",
          img: "https://icrisat.org/assets/crops/pearlmillet-crop-image-1.jpg" // Replace this with the third image URL
        }
      ].map((item) => (
        <motion.div key={item.id} variants={fadeInUp} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <img
            src={item.img}
            alt={item.title}
            className="w-full object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 text-green-400 ">{item.title}</h3>
            <p className="text-gray-400 mb-4">Delicious and nutritious, straight from our local farms.</p>
            
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</AnimatedSection>


      {/* Farmers Section */}
            {/* Farmers Section */} 
            <AnimatedSection id="farmers" className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center mb-8 rainbow-text">Our Farmers</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "Pradeep Dhanekar",
                img: "https://st5.depositphotos.com/81161912/66752/i/450/depositphotos_667522188-stock-photo-indian-cwopea-farming-farmer-holding.jpg", // Replace with actual image URL
                bio: "Expert in organic farming for over 10 years.",
              },
              {
                id: 2,
                name: "Nishant Joshi",
                img: "https://static.vecteezy.com/system/resources/thumbnails/026/537/292/small_2x/indian-farmer-holding-gullak-in-hand-saving-concept-happy-poor-farmer-photo.jpg", // Replace with actual image URL
                bio: "Passionate about sustainable agriculture.",
              },
              {
                id: 3,
                name: "Sonu Yadav",
                img: "https://media.istockphoto.com/id/1333505622/photo/indian-farmer-holding-crop-plant-in-his-wheat-field.jpg?s=612x612&w=0&k=20&c=--_zOuuSFy6hPIUqJVY5tFa8Loecs3T3s0CWp3FeEXs=", // Replace with actual image URL
                bio: "Growing fresh produce with love and care.",
              }
            ].map((farmer) => (
              <motion.div key={farmer.id} variants={fadeInUp} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={farmer.img}
                  alt={farmer.name}
                  className="w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-green-400">{farmer.name}</h3>
                  <p className="text-gray-400 mb-4">{farmer.bio}</p>
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>


      {/* Newsletter Section */}
      <AnimatedSection className="py-12">
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center mb-8 rainbow-text">Stay Updated</motion.h2>
          <motion.p variants={fadeInUp} className="text-center text-gray-300 mb-8">Subscribe to our newsletter for the latest updates on fresh produce and special offers.</motion.p>
          <motion.form variants={fadeInUp} className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Enter your email" className="flex-grow px-4 py-2 rounded-md bg-gray-700 text-white" />
            <Button type="submit">Subscribe</Button>
          </motion.form>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-green-400 mb-4">FarmFresh</h3>
              <p className="text-gray-400">Connecting local farmers with conscious consumers.</p>
            </div>
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-green-400 mb-4">Quick Links</h4>
              <ul className="text-gray-400">
                <li><a onClick={()=>{navigate('/')}} className="hover:text-green-400 hover-underline-animation">Home</a></li>
                <li><a href="#products" className="hover:text-green-400 hover-underline-animation">Products</a></li>
                <li><a href="#farmers" className="hover:text-green-400 hover-underline-animation">Farmers</a></li>
                <li><a href="#about" className="hover:text-green-400 hover-underline-animation">About Us</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-green-400 mb-4">Contact Us</h4>
              <p className="text-gray-400">123 Farm Road, Countryside</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
              <p className="text-gray-400">Email: info@farmfresh.com</p>
            </div>
            <div className="w-full md:w-1/4">
              <h4 className="text-lg font-semibold text-green-400 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-green-400 hover-underline-animation">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-green-400 hover-underline-animation">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-green-400 hover-underline-animation">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2023 FarmFresh. All rights reserved.</p>
          </div>
        </div>
      </footer>

      
    </main>
  );
}

export default Home;