import { FaLeaf, FaShoppingBasket, FaUsers, FaChartLine, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


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

 

 

function Navbar(){

    const navigate = useNavigate();

 

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return(
        <nav className="bg-gray-800 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="text-green-400 text-2xl font-bold flex items-center">
            <FaLeaf className="mr-2" />
            <span className="text-gradient">FarmBasket</span>
          </a>
          <div className="hidden md:flex space-x-4">
            <a href="#products" className="text-gray-300 hover:text-green-400 hover-underline-animation">Products</a>
            
            <a href="#about" className="text-gray-300 hover:text-green-400 hover-underline-animation">About</a>
            <a onClick={() => navigate("/farmersWork")} className="text-gray-300 hover:text-green-400 hover-underline-animation">Farmers Showcase</a>
            <a onClick={()=> navigate("/dashboard")} className="text-gray-300 hover:text-green-400 hover-underline-animation">Farmers Work</a>
          </div>
          <div className="hidden md:flex space-x-2">
            {/* <Button variant="outline">Login</Button>
            <Button onClick={()=>{navigate('/signup')}}>Sign Up</Button> */}
          </div>
          <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaBars />
          </Button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <a href="#products" className="block text-gray-300 hover:text-green-400">Products</a>
            <a href="#farmers" className="block text-gray-300 hover:text-green-400">Farmers</a>
            <a href="#about" className="block text-gray-300 hover:text-green-400">About</a>
            <a href="/farmers-showcase" className="block text-gray-300 hover:text-green-400">Farmers Showcase</a>
            <a href="/farmers-work" className="block text-gray-300 hover:text-green-400">Farmers Work</a>
            {/* <Button variant="outline" className="w-full mt-2">Login</Button>
            <Button className="w-full mt-2">Sign Up</Button> */}
          </div>
        )}
      </nav>
    )
}

export default Navbar;