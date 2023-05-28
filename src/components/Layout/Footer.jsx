import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <h4 className='text-center'> All Right Reserved &copy; Mahmoud wardany</h4>
      <p className="text-center mt-3">
        <Link to='/contact'>Contact</Link>|
        <Link to='/about'>About</Link>

      </p>
      </footer>
  )
}

export default Footer