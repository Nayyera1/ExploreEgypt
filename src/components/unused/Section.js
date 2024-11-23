import React from "react";
import Card from "../Card";

const Section = ({ title, cards }) => {
	return (
		<div className="mt-10">
			<h2 className="text-2xl text-teal-600 mb-4">{title}</h2>
			<div className="flex gap-6 overflow-x-auto no-scrollbar">
				{cards.map((card, index) => (
					<Card
						key={index}
						image={card.image}
						title={card.title}
						description={card.description}
					/>
				))}
			</div>
		</div>
	);
};

export default Section;
