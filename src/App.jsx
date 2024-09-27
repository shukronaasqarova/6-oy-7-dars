import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Flowers from './pages/Flowers';
import { ClipLoader } from 'react-spinners';

export default function App() {
  const [comfystore, setComfystore] = useState([]);
  const [loading, setLoading] = useState(true);

  const placeholderImage = "https://picsum.photos/200/300";

  useEffect(() => {
    fetch("https://strapi-store-server.onrender.com/api/products", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setComfystore(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>

      <nav className="bg-white shadow-md p-4 mb-6">
        <div className="container mx-auto flex justify-around">
          <Link to="/" className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300">Home</Link>
          <Link to="/flowers" className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300">Flowers</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <div className="container mx-auto p-4 max-w-screen-xl">
            {
              loading ? (
                <div className="flex justify-center items-center h-48">
                  <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
              ) : (
                <div className="flex flex-wrap justify-between">
                  {comfystore.length > 0 && comfystore.map((value) => (
                    <div key={value.id} className="p-4 border rounded-lg shadow-lg w-1/3 max-w-sm mb-4">
                      <img
                        className="w-full h-48 object-cover rounded"
                        src={value.attributes.image || placeholderImage}
                        alt=""
                      />
                      <h3 className="mt-2 text-lg font-semibold text-center">{value.attributes.title}</h3>
                      <p className="text-gray-700 text-center">$ {value.attributes.price}</p>
                    </div>
                  ))}
                </div>
              )}
          </div>
        } />
        <Route path="/flowers" element={<Flowers />} />
      </Routes>
    </>
  );
}
