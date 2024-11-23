import React from "react";

const Footer = () => {
	return (
		<footer className="bg-teal-600 text-white p-4 mt-10">
			<div id="contact-footer" className="flex justify-around">
				<div>
					<h3>Contact Us</h3>
					<p>Email: contact@exploreegypt.com</p>
					<p>Phone: +20 123 456 789</p>
				</div>
				<div>
					<h4>Quick Links</h4>
					<ul>
						<li>
							<a href="#" className="hover:text-gray-300">
								Home
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-gray-300">
								Destinations
							</a>
						</li>
						<li>
							<a href="#" className="hover:text-gray-300">
								Sign In
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="mt-4 flex justify-center">
				<a href="https://www.facebook.com" className="mx-2">
					<img
						src="https://th.bing.com/th/id/OIP.N24RC8dLPtIGYfPSlKsK7AHaHa?w=157&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
						alt="Facebook"
						className="w-8"
					/>
				</a>
				<a href="https://www.twitter.com" className="mx-2">
					<img
						src="https://th.bing.com/th/id/OIP.t1fyvKgDnUoIiC049MG48AHaHa?w=182&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7"
						alt="twitter"
						className="w-8"
					/>
				</a>
				<a href="https://www.instagram.com" className="mx-2">
					<img
						src="https://th.bing.com/th?id=OIF.Wztrcf%2fhqkhQ7PT8JcxQzw&w=151&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
						alt="instagram"
						className="w-8"
					/>
				</a>
			</div>
		</footer>
	);
};

export default Footer;
