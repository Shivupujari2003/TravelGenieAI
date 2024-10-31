// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
// } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// async function run() {
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
        },
      ],
    },
    // {
    //   role: "model",
    //   parts: [
    //     {
    //       text: '```json\n{\n  "hotels": [\n    {\n      "name": "The D Las Vegas",\n      "address": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "from $39 per night",\n      "imageUrl": "https://www.theDlasvegas.com/images/hero-images/hero-home-desktop.jpg",\n      "geoCoordinates": "36.1699, -115.1426",\n      "rating": 4.0,\n      "description": "A centrally located casino hotel on Fremont Street with affordable rooms, a vibrant casino, and multiple dining options."\n    },\n    {\n      "name": "Golden Nugget Las Vegas",\n      "address": "129 E Fremont Street, Las Vegas, NV 89101",\n      "price": "from $59 per night",\n      "imageUrl": "https://www.goldennugget.com/las-vegas/media/images/hero-images/hero-goldennuggetlasvegas-home-desktop.jpg",\n      "geoCoordinates": "36.1694, -115.1438",\n      "rating": 4.5,\n      "description": "A historic hotel with a lively casino, a shark tank, and a variety of restaurants and bars."\n    },\n    {\n      "name": "Circus Circus Hotel & Casino",\n      "address": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": "from $35 per night",\n      "imageUrl": "https://www.circuscircus.com/media/images/hero-images/hero-circuscircus-home-desktop.jpg",\n      "geoCoordinates": "36.1191, -115.1731",\n      "rating": 3.5,\n      "description": "A family-friendly hotel with a circus theme, a large casino, and a variety of entertainment options."\n    },\n    {\n      "name": "The Orleans Hotel & Casino",\n      "address": "4500 W Tropicana Ave, Las Vegas, NV 89103",\n      "price": "from $45 per night",\n      "imageUrl": "https://www.orleanscasino.com/media/images/hero-images/hero-orleanscasino-home-desktop.jpg",\n      "geoCoordinates": "36.0921, -115.2015",\n      "rating": 4.0,\n      "description": "A large hotel and casino with a variety of dining options, entertainment, and a golf course."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "name": "Fremont Street Experience",\n      "details": "Explore the vibrant pedestrian mall with live entertainment, street performers, and shops.",\n      "imageUrl": "https://www.fremontstreetexperience.com/media/images/hero-images/hero-fremontstreetexperience-home-desktop.jpg",\n      "geoCoordinates": "36.1699, -115.1426",\n      "ticketPricing": "Free",\n      "rating": 4.5,\n      "time": "Afternoon (2pm - 6pm)"\n    },\n    {\n      "name": "Neon Museum",\n      "details": "Wander through a collection of iconic neon signs from Las Vegas history.",\n      "imageUrl": "https://www.neonmuseum.org/wp-content/uploads/2017/09/Neon-Museum-Banner.jpg",\n      "geoCoordinates": "36.1721, -115.1379",\n      "ticketPricing": "$20 - $30 per person",\n      "rating": 4.0,\n      "time": "Evening (7pm - 9pm)"\n    },\n    {\n      "name": "Dinner at a Fremont Street restaurant",\n      "details": "Enjoy a casual dinner at one of the many affordable restaurants on Fremont Street.",\n      "imageUrl": "https://www.fremontstreetexperience.com/media/images/hero-images/hero-fremontstreetexperience-home-desktop.jpg",\n      "geoCoordinates": "36.1699, -115.1426",\n      "ticketPricing": "Varies by restaurant",\n      "rating": 4.0,\n      "time": "Evening (9pm - 11pm)"\n    }\n  },\n  "day2": {\n    "name": "Hoover Dam",\n    "details": "Take a day trip to the impressive Hoover Dam and learn about its history and engineering.",\n      "imageUrl": "https://www.nps.gov/hdam/planyourvisit/images/hoover-dam-1.jpg",\n      "geoCoordinates": "36.0184, -114.9995",\n      "ticketPricing": "Free entry to the dam, tours available for extra cost",\n      "rating": 4.5,\n      "time": "Morning (9am - 12pm)"\n    },\n    {\n      "name": "Lake Mead",\n      "details": "Enjoy a scenic hike or boat tour on Lake Mead, the largest reservoir in the US.",\n      "imageUrl": "https://www.nps.gov/lake/learn/photosmultimedia/images/lake-mead-003.jpg",\n      "geoCoordinates": "36.0626, -114.9444",\n      "ticketPricing": "Free entry, boat tours available for extra cost",\n      "rating": 4.0,\n      "time": "Afternoon (1pm - 4pm)"\n    },\n    {\n      "name": "Dinner at a local restaurant",\n      "details": "Enjoy a casual dinner at a local restaurant in Las Vegas.",\n      "imageUrl": "https://www.lasvegas.com/media/images/hero-images/hero-lasvegas-home-desktop.jpg",\n      "geoCoordinates": "36.1699, -115.1426",\n      "ticketPricing": "Varies by restaurant",\n      "rating": 4.0,\n      "time": "Evening (7pm - 9pm)"\n    }\n  },\n  "day3": {\n    "name": "Bellagio Conservatory & Botanical Garden",\n      "details": "Admire the stunning floral displays in this free attraction at the Bellagio Hotel.",\n      "imageUrl": "https://www.bellagio.com/media/images/hero-images/hero-bellagio-home-desktop.jpg",\n      "geoCoordinates": "36.1145, -115.1724",\n      "ticketPricing": "Free",\n      "rating": 4.5,\n      "time": "Morning (10am - 12pm)"\n    },\n    {\n      "name": "The Venetian and The Palazzo",\n      "details": "Explore the luxurious shopping and dining at these faux-Venetian resorts.",\n      "imageUrl": "https://www.venetian.com/media/images/hero-images/hero-venetian-home-desktop.jpg",\n      "geoCoordinates": "36.1228, -115.1707",\n      "ticketPricing": "Free",\n      "rating": 4.0,\n      "time": "Afternoon (1pm - 4pm)"\n    },\n    {\n      "name": "Dinner at a buffet",\n      "details": "Indulge in a lavish buffet at one of the many casinos on the Strip.",\n      "imageUrl": "https://www.lasvegas.com/media/images/hero-images/hero-lasvegas-home-desktop.jpg",\n      "geoCoordinates": "36.1699, -115.1426",\n      "ticketPricing": "Varies by buffet",\n      "rating": 4.0,\n      "time": "Evening (7pm - 9pm)"\n    }\n  }\n}\n```\n\n**Notes:**\n\n* This itinerary is just a suggestion and can be adjusted based on your interests and preferences.\n* Hotel prices are approximate and may vary depending on the season and availability.\n* You can find cheaper food options by avoiding the restaurants in the casinos and exploring the local neighborhoods.\n* The travel time between locations is not included in the itinerary and may vary depending on traffic conditions.\n* Consider using public transportation or walking whenever possible to save on transportation costs.\n* Remember to check the operating hours and ticket prices for attractions before visiting.\n* Have fun and enjoy your trip!',
    //     },
    //   ],
    // },
    {
      "role": "model",
      "parts": [
        {
          "text": "```json\n{\n  \"hotels\": [\n    {\n      \"name\": \"The D Las Vegas\",\n      \"address\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"from $39 per night\",\n      \"imageUrl\": \"https://www.theDlasvegas.com/images/hero-images/hero-home-desktop.jpg\",\n      \"geoCoordinates\": \"36.1699, -115.1426\",\n      \"rating\": 4.0,\n      \"description\": \"A centrally located casino hotel on Fremont Street with affordable rooms, a vibrant casino, and multiple dining options.\"\n    },\n    {\n      \"name\": \"Golden Nugget Las Vegas\",\n      \"address\": \"129 E Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"from $59 per night\",\n      \"imageUrl\": \"https://www.goldennugget.com/las-vegas/media/images/hero-images/hero-goldennuggetlasvegas-home-desktop.jpg\",\n      \"geoCoordinates\": \"36.1694, -115.1438\",\n      \"rating\": 4.5,\n      \"description\": \"A historic hotel with a lively casino, a shark tank, and a variety of restaurants and bars.\"\n    },\n    {\n      \"name\": \"Circus Circus Hotel & Casino\",\n      \"address\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"from $35 per night\",\n      \"imageUrl\": \"https://www.circuscircus.com/media/images/hero-images/hero-circuscircus-home-desktop.jpg\",\n      \"geoCoordinates\": \"36.1191, -115.1731\",\n      \"rating\": 3.5,\n      \"description\": \"A family-friendly hotel with a circus theme, a large casino, and a variety of entertainment options.\"\n    },\n    {\n      \"name\": \"The Orleans Hotel & Casino\",\n      \"address\": \"4500 W Tropicana Ave, Las Vegas, NV 89103\",\n      \"price\": \"from $45 per night\",\n      \"imageUrl\": \"https://www.orleanscasino.com/media/images/hero-images/hero-orleanscasino-home-desktop.jpg\",\n      \"geoCoordinates\": \"36.0921, -115.2015\",\n      \"rating\": 4.0,\n      \"description\": \"A large hotel and casino with a variety of dining options, entertainment, and a golf course.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"name\": \"Fremont Street Experience\",\n        \"details\": \"Explore the vibrant pedestrian mall with live entertainment, street performers, and shops.\",\n        \"imageUrl\": \"https://www.fremontstreetexperience.com/media/images/hero-images/hero-fremontstreetexperience-home-desktop.jpg\",\n        \"geoCoordinates\": \"36.1699, -115.1426\",\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.5,\n        \"time\": \"Afternoon (2pm - 6pm)\"\n      },\n      {\n        \"name\": \"Neon Museum\",\n        \"details\": \"Wander through a collection of iconic neon signs from Las Vegas history.\",\n        \"imageUrl\": \"https://www.neonmuseum.org/wp-content/uploads/2017/09/Neon-Museum-Banner.jpg\",\n        \"geoCoordinates\": \"36.1721, -115.1379\",\n        \"ticketPricing\": \"$20 - $30 per person\",\n        \"rating\": 4.0,\n        \"time\": \"Evening (7pm - 9pm)\"\n      },\n      {\n        \"name\": \"Dinner at a Fremont Street restaurant\",\n        \"details\": \"Enjoy a casual dinner at one of the many affordable restaurants on Fremont Street.\",\n        \"imageUrl\": \"https://www.fremontstreetexperience.com/media/images/hero-images/hero-fremontstreetexperience-home-desktop.jpg\",\n        \"geoCoordinates\": \"36.1699, -115.1426\",\n        \"ticketPricing\": \"Varies by restaurant\",\n        \"rating\": 4.0,\n        \"time\": \"Evening (9pm - 11pm)\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"name\": \"Hoover Dam\",\n        \"details\": \"Take a day trip to the impressive Hoover Dam and learn about its history and engineering.\",\n        \"imageUrl\": \"https://www.nps.gov/hdam/planyourvisit/images/hoover-dam-1.jpg\",\n        \"geoCoordinates\": \"36.0184, -114.9995\",\n        \"ticketPricing\": \"Free entry to the dam, tours available for extra cost\",\n        \"rating\": 4.5,\n        \"time\": \"Morning (9am - 12pm)\"\n      },\n      {\n        \"name\": \"Lake Mead\",\n        \"details\": \"Enjoy a scenic hike or boat tour on Lake Mead, the largest reservoir in the US.\",\n        \"imageUrl\": \"https://www.nps.gov/lake/learn/photosmultimedia/images/lake-mead-003.jpg\",\n        \"geoCoordinates\": \"36.0626, -114.9444\",\n        \"ticketPricing\": \"Free entry, boat tours available for extra cost\",\n        \"rating\": 4.0,\n        \"time\": \"Afternoon (1pm - 4pm)\"\n      },\n      {\n        \"name\": \"Dinner at a local restaurant\",\n        \"details\": \"Enjoy a casual dinner at a local restaurant in Las Vegas.\",\n        \"imageUrl\": \"https://www.lasvegas.com/media/images/hero-images/hero-lasvegas-home-desktop.jpg\",\n        \"geoCoordinates\": \"36.1699, -115.1426\",\n        \"ticketPricing\": \"Varies by restaurant\",\n        \"rating\": 4.0,\n        \"time\": \"Evening (7pm - 9pm)\"\n      }\n    ],\n    \"day3\": [\n      {\n        \"name\": \"Bellagio Conservatory & Botanical Garden\",\n        \"details\": \"Admire the stunning floral displays in this free attraction at the Bellagio Hotel.\",\n        \"imageUrl\": \"https://www.bellagio.com/media/images/hero-images/hero-bellagio-home-desktop.jpg\",\n        \"geoCoordinates\": \"36.1145, -115.1724\",\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.5,\n        \"time\": \"Morning (10am - 12pm)\"\n      },\n      {\n        \"name\": \"The Venetian and The Palazzo\",\n        \"details\": \"Explore the luxurious shopping and dining at these faux-Venetian resorts.\",\n        \"imageUrl\": \"https://www.venetian.com/media/images/hero-images/hero-venetian-home-desktop.jpg\",\n        \"geoCoordinates\": \"36.1228, -115.1707\",\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.0,\n        \"time\": \"Afternoon (1pm - 4pm)\"\n      },\n      {\n        \"name\": \"Dinner at a buffet\",\n        \"details\": \"Indulge in a lavish buffet at one of the many casinos on the Strip.\",\n        \"imageUrl\": \"https://www.lasvegas.com/media/images/hero-images/hero-lasvegas-home-desktop.jpg\",\n        \"geoCoordinates\": \"36.1699, -115.1426\",\n        \"ticketPricing\": \"Varies by buffet\",\n        \"rating\": 4.0,\n        \"time\": \"Evening (7pm - 9pm)\"\n      }\n    ]\n  }\n}\n```\n\n**Notes:**\n\n* This itinerary is just a suggestion and can be adjusted based on your interests and preferences.\n* Hotel prices are approximate and may vary depending on the season and availability.\n* You can find cheaper food options by avoiding the restaurants in the casinos and exploring the local neighborhoods.\n* The travel time between locations is not included in the itinerary and may vary depending on traffic conditions.\n* Consider using public transportation or walking whenever possible to save on transportation costs.\n* Remember to check for any entry fees or reservations required for specific attractions."
        },
      ],
    }    
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
