import React from 'react'

const Navbar = () => {
  return (
   <nav className='flex justify-between bg-slate-300 p-3 '>
    <ul className="flex gap-4">
        <li>Logo</li>
        <li>Home</li>
      </ul>
      <ul className='flex gap-4'> <li>Your task</li>
        <li>About us</li>
        <li>Contact</li>
        <li>Services</li></ul>
   </nav>
  )
}

export default Navbar
