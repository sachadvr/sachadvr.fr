import React from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>Copyright {new Date().getFullYear()} © Sacha DVR. Tout droits réservés. &nbsp;(
    <Link to="/cgu">CGU</Link>,&nbsp;
    <Link to="/cgv">CGV</Link>)
    </footer>
  )
}

export default Footer