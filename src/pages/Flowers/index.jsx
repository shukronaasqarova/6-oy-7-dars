import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const Flowers = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/photos", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setPhotos(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-center my-4">Flowers</h1>
            <div className="container mx-auto p-4 max-w-screen-xl">
                <div className="flex flex-wrap justify-between">
                    {photos.map((photo) => (
                        <div key={photo.id} className="p-4 border rounded-lg shadow-lg w-1/3 max-w-sm mb-4">
                            <img className="w-full h-48 object-cover rounded" src={photo.thumbnailUrl} alt={photo.title} />
                            <h3 className="mt-2 text-lg font-semibold text-center">{photo.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Flowers;
