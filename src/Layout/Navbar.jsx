import React,{useState} from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaBars } from 'react-icons/fa';

function Navbar(){
    let [isOpen, setIsOpen] = useState(false);
    return(
       <>
        <div className="navbar">
         <div className="container">
           <nav>
             <h1>LOGO</h1>
           <div className="navbar__right">
           <ul>
             <li>
                <NavLink className="list" to="/">Home</NavLink>
             </li>
             <li>
                <NavLink className="list" to="/blog">Blog</NavLink>
             </li>
             <li>
                <NavLink className="list" to="/contact">Contact</NavLink>
             </li>
          </ul>

           </div>
            <FaBars onClick={()=>setIsOpen(!isOpen) } className="addBtn"/>
           <div className={`navbar__right__phone ${isOpen? "show" :"hide"}`}
           id="navbar__right__phone">
           <ul>
             <li>
                <NavLink className="list" to="/">Home</NavLink>
             </li>
             <li>
                <NavLink className="list" to="/blog">Blog</NavLink>
             </li>
             <li>
                <NavLink className="list" to="/contact">Contact</NavLink>
             </li>
          </ul>
           </div>
           </nav>
         </div>
         </div> 
       </>
    )
}
export default Navbar