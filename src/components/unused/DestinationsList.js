import axios from "axios";
import { useEffect, useState } from "react";

const DestinationsList = () => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        if (destinations.length) return;
        axios.get("http://localhost:5000/api/destinations").then(({ data }) => setDestinations(data));
    }, []);

	return (
		<div>
			<h1>Destinations</h1>
			<ul>
				{destinations.map((dest, index) => (
					<li key={index}>
						{dest.name} - {dest.description}
					</li>
				))}
			</ul>
		</div>
	);
};

export default DestinationsList;
