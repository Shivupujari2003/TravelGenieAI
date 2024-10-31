import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-lg'>Places to Visit</h2>
      <div className=''>
        {Object.entries(trip?.tripData?.itinerary || {})
          .sort(([dayA], [dayB]) => dayA.localeCompare(dayB)) 
          .map(([day, activities], dayIndex) => (
            <div key={dayIndex} className='my-4'>
              <h3 className='font-semibold text-md'>{day}</h3>
              {activities.map((item, index) => (
                <ActivityCard key={index} item={item} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

const ActivityCard = ({ item }) => {
  const [imageUrl, setImageUrl] = useState("/ph2.jpg"); 
  const [loading, setLoading] = useState(true);

  const fetchActivityImage = async (activityName) => {
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${activityName}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`);
      const data = await response.json();
      return data?.results?.[0]?.urls?.small || "/ph1.jpg"; 
    } catch (error) {
      console.error("Error fetching activity image:", error);
      return "/ph1.jpg"; 
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      if (item?.name) {
        const imgUrl = await fetchActivityImage(item.name);
        setImageUrl(imgUrl);
      }
      setLoading(false);
    };

    loadImage();
  }, [item]);

  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${item?.name}`} target='_blank'>
      <div className='flex border rounded p-4 mt-5 my-2 hover:scale-105 transition-all cursor-pointer bg-slate-300'>
        {loading ? (
          <div className="animate-pulse bg-gray-300 rounded h-32 w-32" /> // Skeleton loader for image
        ) : (
          <img
            src={imageUrl}
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "/ph2.jpg"; 
            }}
            alt={item.name}
            className='w-48 h-40 object-cover rounded-l' 
          />
        )}
        <div className='flex-1 pl-4'> 
          <h4 className='font-bold text-lg'>{item.name}</h4>
          <p>{item.details}</p>
          <p className='text-sm text-red-600'>Time: {item.time}</p>
          <p className='text-sm text-gray-700'>Ticket Pricing: {item.ticketPricing}</p>
          <p className='text-sm text-gray-700'>Rating: {item.rating}</p>
          <p className='text-sm text-gray-700'>Coordinates: {item.geoCoordinates}</p>
        </div>
      </div>
    </Link>
  );
};

export default PlacesToVisit;


