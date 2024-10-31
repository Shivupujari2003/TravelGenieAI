import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotels Recommendation:</h2>
      <div className='mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4'>
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

const HotelCard = ({ hotel }) => {
  const [imageUrl, setImageUrl] = useState("/hotel.jpg"); 
  const [loading, setLoading] = useState(true);

  const fetchHotelImage = async (hotelName) => {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${hotelName}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`);

      const data = await response.json();
      return data?.results?.[0]?.urls?.small || "/hotel.jpg"; 
    } catch (error) {
      console.error("Error fetching hotel image:", error);
      return "/hotel.jpg"; 
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      if (hotel?.name) {
        const imgUrl = await fetchHotelImage(hotel.name);
        setImageUrl(imgUrl);
      }
      setLoading(false);
    };

    loadImage();
  }, [hotel]);

  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name} ${hotel?.address}`} target='_blank'>
      <div className='hover:scale-105 transition-all cursor-pointer'>
        {loading ? (
          <div className="animate-pulse bg-gray-300 rounded-xl h-[200px] w-full" /> // Skeleton loader for image
        ) : (
          <img
            src={imageUrl}
            onError={(e) => {
              e.target.onerror = null; // Prevent looping
              e.target.src = "/hotel.jpg"; 
            }}
            alt={hotel?.name || "Hotel Image"}
            className='rounded-xl object-cover h-[200px] w-full'
          />
        )}
        <div className='my-2 flex flex-col'>
          <h2 className='font-medium'>{hotel?.name}</h2>
          <h2 className='text-xs text-gray-700'>📍{hotel?.address}</h2>
          <h2 className='text-sm'>💰{hotel?.price}</h2>
          <h2 className='text-sm'>{hotel?.rating}⭐</h2>
        </div>
      </div>
    </Link>
  );
};

export default Hotels;
