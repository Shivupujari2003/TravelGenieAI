import React, { useEffect, useState } from 'react';

function InfoSection({ trip }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLocationImage = async (location) => {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${location}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`);
      const data = await response.json();
      return data?.results?.[0]?.urls?.regular || "/ph.jpeg"; 
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
      } else {
        setImageUrl("/ph.jpeg"); 
      }
      setLoading(false);
    };

    loadImage();
  }, [trip]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <img
          src={imageUrl}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "/ph.jpeg"; 
          }}
          className="h-[500px] w-full object-contain rounded-xl"
          alt={trip?.userSelection?.location || "Trip Image"}
        />
      )}
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-700 rounded-full text-gray-100 text-sm md:text-md'>
              🗓️ {trip?.userSelection?.tripDays} Days
            </h2>
            <h2 className='p-1 px-3 bg-gray-700 rounded-full text-gray-100 text-sm md:text-md'>
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className='p-1 px-3 bg-gray-700 rounded-full text-gray-100 text-sm md:text-md'>
              🥂 Number of travellers: {trip?.userSelection?.travelCompanion}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
