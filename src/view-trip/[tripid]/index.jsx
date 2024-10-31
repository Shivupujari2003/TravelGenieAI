import { db } from '@/service/firebaseconfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import Placesstovisit from '../components/Placesstovisit';
import Footer from '../components/Footer';

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]); 

  useEffect(() => {
    if (tripId) {
      getTripData();
    }
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Doc data:", docSnap.data());
      setTrip(docSnap.data()); 
    } else {
      console.log("No such document");
      toast("No trip found!");
    }
  };

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {trip ? ( 
        <>
          <InfoSection trip={trip} />
          <Hotels trip={trip} />
          <div className=''>
            <Placesstovisit trip={trip} />
          </div>
        </>
      ) : (
        <p>Loading trip data...</p>
      )}
    </div>
  );
};

export default ViewTrip;
