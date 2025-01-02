import React, { useEffect } from 'react'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
const App = () => {
  let theme
  useEffect(()=>{
theme = localStorage.getItem('theme')
document.body.className = theme
  },[theme])
  return (
    <>
    <main>
      <Outlet />
    </main>
    <div className="footer">
    <Footer />
    </div>
    </>
  )
}

export default App
