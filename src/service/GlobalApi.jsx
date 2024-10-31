// import axios from "axios";

// const BASE_URL = 'https://api.geoapify.com/v2/places';

// export const GetPlaceDetails = async (data) => {
//   try {
//     // Create the query parameters
//     const queryParams = new URLSearchParams({
//       text: data.textQuery, // Use the raw textQuery without double encoding
//       apiKey: import.meta.env.VITE_GEO_PLACE_KEY,
//       categories: 'tourism.sights',
//     });

//     // Optional: Include location filter if latitude and longitude are provided
//     if (data.latitude && data.longitude) {
//       queryParams.append('filter', `circle:${data.latitude},${data.longitude},1000`);
//     }

//     // Make the GET request to the Geoapify API
//     const response = await axios.get(`${BASE_URL}?${queryParams.toString()}`);
//     return response.data; // Return the data received from the API
//   } catch (error) {
//     console.error("Error fetching place details:", error);
//     throw error; // Throw error for handling in the calling function
//   }
// };
