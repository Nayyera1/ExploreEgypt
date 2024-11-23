"use client";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState();

	useEffect(() => {
		const _token = localStorage.getItem("_token");
		if (!_token) return;

		axios.interceptors.request.use(function (config) {
			config.headers.Authorization = _token;
			return config;
		});

		try {
			axios.get("http://localhost:5000/api/me").then(({ data }) => {
				setUser(data);
			});
		} catch {}
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useCurrentUser = () => {
	const userContext = useContext(UserContext);
	return userContext;
};
