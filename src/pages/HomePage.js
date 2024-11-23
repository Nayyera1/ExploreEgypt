import axios from "axios";
import Navbar from "../components/Navbar";
import DestinationCards from "../components/DestinationCards";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [destinations, setDestinations] = useState({}); // Initialize as an object for grouping

  // Function to refresh destinations
  const refreshDestinations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/destinations");
      if (response.status === 200) {
        const data = response.data;
        const grouped = {
          Cairo: [],
          Alexandria: [],
          Luxor: [],
          Sinai: [],
        };

        data.forEach((dest) => {
          // Group destinations by country
          if (dest.country.includes("Cairo")) grouped.Cairo.push(dest);
          else if (dest.country.includes("Alexandria")) grouped.Alexandria.push(dest);
          else if (dest.country.includes("Luxor")) grouped.Luxor.push(dest);
          else if (dest.country.includes("Sinai")) grouped.Sinai.push(dest);
          else grouped.Cairo.push(dest); // Default case
        });

        setDestinations(grouped); // Update the state with grouped destinations
      }
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    }
  };

  useEffect(() => {
    refreshDestinations(); // Fetch destinations on component mount
  }, []); // Run once on component mount

  return (
    <main>
      <Navbar refreshDestinations={refreshDestinations} /> {/* Pass refresh function here */}
      <div className="p-4">
        <DestinationCards 
          destinations={destinations} 
          onAdd={refreshDestinations} // Pass refresh function for adding
          refreshDestinations={refreshDestinations} // Pass refresh function for editing and deleting
        />
      </div>
      <Footer />
    </main>
  );
}
