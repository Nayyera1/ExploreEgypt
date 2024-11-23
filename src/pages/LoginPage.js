import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import { UserContext } from "../utils/userContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
	const [error, setError] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			if (error) setError(false);
		}, 5_000);
	}, [error]);

	async function login() {
		const inputs = document.querySelectorAll("#form_data input");
		const data = {};

		for (const input of inputs) {
			data[input.name] = input.value;
		}

		try {
			const { data: loggedUser } = await axios.post(
				`http://localhost:5000/api/auth/login`,
				data
			);

			localStorage.setItem("_token", loggedUser.token);
            setUser(loggedUser);
            navigate("/");
		} catch (err) {
            if (!err.response) return navigate("/");
			const error = err.response.data;
			if (error.error) setError(error.message);
		}
	}

	return (
		<main className="size-full p-52 bg-background flex flex-col text-text gap-4 items-center justify-between relative">
			<a href="/" className="text-xl absolute top-5 left-0 p-4">
				<Icon name="TbChevronLeft" />
			</a>
			<div className="w-full flex flex-col items-start justify-center gap-2">
				<header className="text-3xl">
					Login <span className="italic font-serif">Account</span>
				</header>
				<a
					href="/register"
					className="flex items-center justify-center p-2 rounded-full gap-4 border border-text text-xs"
				>
					Don&apos;t have an account?{" "}
					<Icon name="TbArrowUpRight" className="text-lg" />
				</a>
			</div>
			<form
				onSubmit={(e) => e.preventDefault()}
				id="form_data"
				className="w-full flex flex-col items-center justify-center gap-2"
			>
				<input
					type="text"
					name="username"
					placeholder="Username"
					className=" w-full p-4 rounded-xl outline-none bg-accent text-background placeholder-background/40"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					className=" w-full p-4 rounded-xl outline-none bg-accent text-background placeholder-background/40"
				/>
				<span className="text-xs text-red-400 italic mt-2">{error}</span>
			</form>
			<button
				onClick={() => login()}
				className="w-full p-5 rounded-full bg-primary flex items-center justify-center gap-4"
			>
				Enter Back <Icon name="TbChevronRight" />
			</button>
		</main>
	);
}
