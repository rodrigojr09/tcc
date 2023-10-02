import { items_styles, nav_items } from "../utils/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { User } from "../utils/types";
import { useSession } from "next-auth/react"
import Image from "next/image";
import DefaultAvatar from '../styles/assets/default-avatar.png';

export default function Navbar(){
    const [navbar,setNavbar] = useState(false);
    const {data,status} = useSession();
    const user = data?.user as User | undefined
    const router = useRouter();
    function getStyle(id:string):typeof items_styles[0] | undefined{
        const style = items_styles.find((a:any)=>a.id === id);
        return style ? style : undefined;
    }
    return (
        <header className="header">
            <a href="#" className="Logo">Suporte Eletro</a>
            <input type="checkbox" id="check"/>
            <label htmlFor="check" className="icons">
                <i className='bx bx-menu'id="menu-icon"></i>
                <i className='bx bx-x'id="close-icon"></i>
            </label>
            <nav className="navbar">
            <a  href="#" style={"--i:0;"}>Home</a>
            <a  href="#" style="--i:1;">Sobre</a> 
            <a  href="#" style="--i:2;">Login</a>    
            </nav>
        </header>
    );
}