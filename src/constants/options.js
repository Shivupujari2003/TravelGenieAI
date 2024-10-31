export const SelectTravelesList = [
  {
    id: 1,
    title: "Just me",
    desc: "A solo traveles in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A couple",
    desc: "A couple in love",
    icon: "❤️",
    people: "2",
  },
  {
    id: 3,
    title: "A family",
    desc: "A family with kids",
    icon: "👪",
    people: "3 to 5",
  },
  {
    id: 4,
    title: "A Friends group",
    desc: "A group of friends",
    icon: "👫",
    people: "6 to 10",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Low",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Medium",
    desc: "A balanced budget",
    icon: "💸",
  },
  {
    id: 3,
    title: "High",
    desc: "No budget limits",
    icon: "💰",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location:{location},for {totalDays}: Days for {traveler} with a {Budget} budget, give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.";
