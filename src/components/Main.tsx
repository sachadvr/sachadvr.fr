import React from 'react'
import Portfolio from './Portfolio'
import WhoAmi from './WhoAmi'
import './Main.scss'
import Contact from './Contact'
import { Link } from 'react-router-dom'
import { FaChevronUp } from 'react-icons/fa'

const Main = () => {
  function ObserveScroll() {
    const topScroll = document.getElementById('topscroll');
    if (window.scrollY > 100) {
      topScroll?.classList.add('show');
    } else {
      topScroll?.classList.remove('show');
    }
  }
  window.addEventListener('scroll', ObserveScroll);
  return (
    <main>
        <WhoAmi/>
        <Portfolio/>
        <Contact/>
        <div id="topscroll"> 
        <Link to="/" className="grid" onClick={e=> {window.scroll(0,0)}}><FaChevronUp color='black' />
    </Link></div>
    </main>
  )
}
export default Main