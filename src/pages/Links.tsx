import React from 'react'
import { Link } from 'react-router-dom'
import './Links.scss'
import { FaChevronCircleLeft, FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaInstagram, FaSnapchatGhost, FaYoutube, FaPinterest } from 'react-icons/fa'

const Links = () => {
  return (
    <div className="links-basic-content">
        <div className="profile-card">
      <div className="card-header">
      <div id="back"><Link to="/"><FaChevronCircleLeft color="white" className='absolute top-5 left-5'/></Link></div>
      <div className="pic">
        <i id="img"></i>
      </div>
      
      <div className="name">Sacha DVR </div>
      <div className="mail"><a href="./index.html#contact">contact@sachadvr.fr</a></div>
      <div className="sm-box"><div className="sm">
        <a href="https://www.facebook.com/profile.php?id=100010069578181" className="grid place-items-center" target="_blank" rel="noreferrer">
            <FaFacebookF />
        </a>
        <a href="https://twitter.com/SachaDvr" className="grid place-items-center" target="_blank" rel="noreferrer">
            <FaTwitter />
        </a>
        <a href="https://www.linkedin.com/in/sacha-duvivier-8b5a89205/" className="grid place-items-center" target="_blank" rel="noreferrer">
            <FaLinkedinIn />
        </a>
        <a href="https://github.com/sachadvr" className="grid place-items-center" target="_blank" rel="noreferrer" >
            <FaGithub />
        </a>
      </div>
      <div className="sm">
        <a href="https://instagram.com/sachadvr" className="grid place-items-center" target="_blank" rel="noreferrer">
            <FaInstagram />
        </a>
        <a href="https://www.snapchat.com/add/chacha151101?share_id=RjZDQjdG&locale=fr_FR" className="grid place-items-center" target="_blank" rel="noreferrer">
            <FaSnapchatGhost />
        </a>
        <a href="https://www.youtube.com/channel/UCNDLN4TdHwS_o1Z6SPiO15w" className="grid place-items-center" target="_blank" rel="noreferrer">
            <FaYoutube />
        </a>
        <a href="https://www.pinterest.fr/sachaduvivier/" className="grid place-items-center" target="_blank" rel="noreferrer">
            <FaPinterest />
        </a>
      </div>
      </div>
        </div>
    
    </div>
    </div>
  )
}
export default Links