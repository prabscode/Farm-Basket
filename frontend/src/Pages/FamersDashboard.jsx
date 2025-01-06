import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLeaf, FaLock, FaEnvelope, FaSignInAlt, FaSignOutAlt, FaPlus, FaImage } from 'react-icons/fa';

function FarmersDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [newPost, setNewPost] = useState({
    farmer_name: '',
    photo_link: '',
    caption: '',
    category: '',
    location: '',
    phone_number: '',
    email: ''
  });

  useEffect(() => {
    // Fetch posts from the database when the component mounts
    axios.get('http://localhost:3000/api/farmers')
      .then(response => setPosts(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    // POST the new post to the backend
    axios.post('http://localhost:3000/api/farmers', newPost)
      .then(response => {
        setPosts([response.data, ...posts]); // Add the new post to the list
        setNewPost({
          farmer_name: '',
          photo_link: '',
          caption: '',
          category: '',
          location: '',
          phone_number: '',
          email: ''
        });
      })
      .catch(error => console.error("Error posting data:", error));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPost({ ...newPost, photo_link: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-green-400 text-2xl font-bold flex items-center">
            <FaLeaf className="mr-2" />
            <span className="text-gradient">FarmBasket</span>
          </div>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-400">Farmer Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
                  <FaEnvelope className="inline-block mr-2" /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                  <FaLock className="inline-block mr-2" /> Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              >
                <FaSignInAlt className="mr-2" /> Login
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl font-bold mb-8 text-center ">Farmer's Showcase</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Add New Post Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-400">Add New Post</h2>
                <form onSubmit={handleAddPost} className="bg-gray-800 shadow-md rounded-lg p-6">
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="farmer_name">
                      Farmer Name
                    </label>
                    <input
                      type="text"
                      id="farmer_name"
                      value={newPost.farmer_name}
                      onChange={(e) => setNewPost({ ...newPost, farmer_name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="caption">
                      Caption
                    </label>
                    <input
                      type="text"
                      id="caption"
                      value={newPost.caption}
                      onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="category">
                      Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="location">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={newPost.location}
                      onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="phone_number">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone_number"
                      value={newPost.phone_number}
                      onChange={(e) => setNewPost({ ...newPost, phone_number: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={newPost.email}
                      onChange={(e) => setNewPost({ ...newPost, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="photo">
                      <FaImage className="inline-block mr-2" /> Photo
                    </label>
                    <input
                      type="file"
                      id="photo"
                      onChange={handleImageUpload}
                      className="w-full text-gray-300 bg-gray-700 py-2 rounded-lg focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                  >
                    <FaPlus className="mr-2" /> Add Post
                  </button>
                </form>
              </div>

              {/* Display Posts */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-green-400">Posts</h2>
                {posts.map((post) => (
                  <div key={post._id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                    <h3 className="text-lg font-bold">{post.farmer_name}</h3>
                    <img src={post.photo_link} alt="Post" className="mt-2 w-full h-48 object-cover rounded-lg" />
                    <p className="mt-2 text-gray-300">{post.caption}</p>
                    <p className="mt-1 text-gray-400">Category: {post.category}</p>
                    <p className="mt-1 text-gray-400">Location: {post.location}</p>
                    <p className="mt-1 text-gray-400">Phone: {post.phone_number}</p>
                    <p className="mt-1 text-gray-400">Email: {post.email}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default FarmersDashboard;
