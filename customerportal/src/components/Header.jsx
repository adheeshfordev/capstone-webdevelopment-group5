import React from 'react'
import Navbar from '../components/Navbar.jsx'
var items = [
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

export default function Header() {
  return (
    <div>
				<Navbar items={items} navColor="#0C3648" navBorder="#0BEFB7" brandColor="#334155" />
			</div>
  )
}
