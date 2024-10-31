import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  const [imageUrl, setImageUrl] = useState("/ph.jpeg"); 
  const [loading, setLoading] = useState(true);

  const fetchLocationImage = async (location) => {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${location}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`);
      const data = await response.json();
      return data?.results?.[0]?.urls?.small || "/ph.jpeg"; 
    } catch (error) {
      console.error("Error fetching image:", error);
      return "/ph.jpeg"; 
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      if (trip?.userSelection?.location) {
        const imgUrl = await fetchLocationImage(trip.userSelection.location);
        setImageUrl(imgUrl);
      }
      setLoading(false);
    };

    loadImage();
  }, [trip]);

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className='mt-10 hover:scale-105 transition-all'>
        {loading ? (
          <div className="animate-pulse bg-gray-300 rounded-xl h-[300px] w-full" /> // Skeleton loader
        ) : (
          <img
            src={imageUrl}
            onError={(e) => {
              e.target.onerror = null; // Prevent looping
              e.target.src = "/ph.jpeg"; // Set a default image on error
            }}
            alt={trip?.userSelection?.location || "Trip Image"}
            className="object-cover rounded-xl"
          />
        )}
        <div>
          <h2 className='font-bold text-lg'>
            {trip?.userSelection?.location}
          </h2>
          <h2 className='text-sm text-gray-500'>
            {trip?.userSelection?.tripDays} Days trip with {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
