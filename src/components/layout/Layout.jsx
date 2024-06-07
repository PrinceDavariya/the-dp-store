import React from 'react'
import Navbar from '../navabr/Navbar'
import Footer from '../Footer/Footers'
export default function Layout({children}) {
    return (
    <>
    <Navbar/>
    <div className="content">
    {children}
    </div>
    <Footer/>
    </>
  )
}
