import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import { AuthProvider } from "./contex/AuthContex";
import Auth from "./pages/Auth";

function App() {
	
	return (
		<div >
			<AuthProvider>
			<Routes>
				<Route
					exact
					path="/"
					element={<Login />}
				/>
				<Route
					path="/signup"
					element={<SignIn/>}
				/>
				<Route
					path="/home"
					element={<Home/>}
				/>
				<Route
					path="/auth/:token"
					element={<Auth/>}
				/>
			</Routes>
			</AuthProvider>
		</div>
	);
}

export default App;
