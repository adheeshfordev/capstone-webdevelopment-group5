import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Cookies from 'js-cookie'
const loggedOutItems = [
	{
		title: "Home",
		href: "/",
		color: "#334155"
	},
	{
		title: "SignUp",
		href: "/signup",
		color: "#334155"
	},
	{
		title: "SignIn",
		href: "/signin",
		color: "#334155"
	},
	{
		title: "ForgotPassword",
		href: "/forgotpassword",
		color: "#334155"
	}
];

const loggedInItems = [
	{
		title: "Home",
		href: "/",
		color: "#334155"
	},
	{
		title: "SignOut",
		href: "/signout",
		color: "#334155"
	}
];

export default function Header() {

	return (
		<div>
			<Navbar items={Cookies.get('token') ? loggedInItems : loggedOutItems} navColor="#0C3648" navBorder="#0BEFB7" brandColor="#334155" />
		</div>
	)
}
