import React, { useState } from 'react'
// import LogoImg from "../assets/images/logo.png"
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { LinkData } from '../../assets/data/thedata'
export const Header = () => {
    const [open, setOpen] = useState(false)
  return (
    <div>
        <header>
            <div className='container flex=b'>
                <div className='logo'>
                    <h1>put img here</h1>
                </div>
                <nav className={open ? "mobile_view":"desktop_view"}>
                    <ul className='flex-b-g'>
                        {LinkData.map((link) =>(
                            <li key={link.id} onClick={() => setOpen(null)}>
                                <a href={link.url}>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="accountflex-b-g">
                    {/* <button>
                        <BiShoppingBag />
                    </button> */}
                    <button className="open-menu" onClick={()=> setOpen(!open)}>
                        <HiOutlineMenuAlt1 />
                    </button>
                </div>
            </div>
        </header>
    </div>
  )
}

