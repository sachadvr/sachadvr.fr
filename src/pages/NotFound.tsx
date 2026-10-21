import React from 'react'
import { FaChevronCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'



const NotFound = () => {
  return (
    <div className="m-7 flex-1">
    <h1 className='text-sm '>
        <Link to="/"><button className="flex items-center gap-1">
            <FaChevronCircleLeft /> Retour à la page d&apos;accueil</button> </Link><br/></h1>
      Malheuresement, la page que vous cherchez n&apos;existe pas.<br/>
      Vous pouvez toujours retourner à <Link to="/">la page d&apos;accueil.</Link>
    </div>
    
  )
}
export default NotFound