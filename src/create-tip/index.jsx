import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext
} from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { SelectBudgetOptions, SelectTravelesList } from '@/constants/options.js';
import { toast } from 'sonner';
import { AI_PROMPT } from '@/constants/options.js';
import { chatSession } from '@/service/AIModal';
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseconfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useNavigation } from 'react-router-dom';

function CreateTrip() {
  const [placeId, setPlaceId] = useState(0);
  const [formData, setFormData] = useState({}); // Initialize formData as an object
  const [openDailog, setopenDailog] = useState(false);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const handlePlaceSelect = (value) => {
    if (value?.properties) {
      console.log("Selected place details:", value);
      const placeId = value.properties.place_id;
      console.log("Place ID:", placeId);
      setPlaceId(placeId);
      handleInputChange('location', value.properties.formatted);
    } else {
      console.warn("No place selected or invalid data.");
    }
  };


  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user')
    if (!user) {
      setopenDailog(true)
      return;
    }
    if (formData.tripDays > 10 || !formData?.tripDays || !formData?.location || !formData?.budget || !formData?.travelCompanion) {
      toast("please fill all details!");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location)
      .replace('{totalDays}', formData?.tripDays)
      .replace('{traveler}', formData?.travelCompanion)
      .replace('{Budget}', formData?.budget)
    // console.log(FINAL_PROMPT)
    const result = await chatSession.sendMessage(FINAL_PROMPT)
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      // tripData:TripData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId)
  }

  const Getuser = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      },
    })
      .then((res) => {
        console.log('User data:', res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        setopenDailog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const login = useGoogleLogin({
    onSuccess: Getuser,
    onError: (errorResp) => console.log('Login failed:', errorResp),
  });

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GeoapifyContext apiKey={import.meta.env.VITE_GEO_PLACE_KEY}>
            <GeoapifyGeocoderAutocomplete
              placeholder="Enter your destination"
              placeSelect={handlePlaceSelect}
            />
          </GeoapifyContext>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'> How many days are you planning your trip?(1-10 only)</h2>
          <Input
            placeholder={'Ex. 3'}
            type="number"
            onChange={(e) => handleInputChange('tripDays', e.target.value)} // Bind onChange event
          />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>What is your Budget? The budget is exclusively allocated for activities and dining purposes.</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => {
            const isSelected = formData.budget === item.title;

            return (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${isSelected ? 'shadow-lg border-black' : ''}
                `}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => {
            const isSelected = formData.travelCompanion === item.people;

            return (
              <div
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${isSelected ? 'shadow-lg border-black' : ''}
                `}
                onClick={() => handleInputChange('travelCompanion', item.people)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            );
          })}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button
          disabled={Loading}
          onClick={onGenerateTrip}>
          {
            Loading ?
              <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'
          }
        </Button>
      </div>

      <Dialog open={openDailog}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent>
          <DialogHeader>
            {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className='font-bold text-lg mt-7'>Sign in with google</h2>
              <p>Sign in to the App with Google Authetication</p>
              <Button
                onClick={login}
                className='w-full mt-5 flex gap-4 items-center'>
                <FcGoogle className='h-10 w-10' />
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  );
}

export default CreateTrip;

