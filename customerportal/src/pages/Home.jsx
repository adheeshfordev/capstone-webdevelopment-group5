import React from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Banner from '../components/Banner.jsx'

export default function Home() {
  return (
    <div>
        <Header />
        <a href='/signin'>Home</a>
        <Banner />
        <Footer />
    </div>
  )
}
