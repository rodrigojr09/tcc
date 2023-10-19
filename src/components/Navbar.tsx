import { items_styles, nav_items } from "../utils/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { User } from "../utils/types";
import { useSession } from "next-auth/react";
import { FaBars } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import Image from "next/image";
import DefaultAvatar from '../styles/assets/default-avatar.png';

export default function Navbar(){
    const [navbar,setNavbar] = useState(false);
    const {data,status} = useSession();
    const user = data?.user as User | undefined
    const router = useRouter();
    return (
        <header className="navbar-header">
            <a href="/" className="Logo">Suporte Eletro</a>
            <input type="checkbox" id="check"/>
            <label htmlFor="check" className="icons">
                <FaBars className={navbar ? 'bx bx-x' : 'bx bx-menu'} id="menu-icon" onClick={e=>setNavbar(!navbar)}/>
                <MdClose className={navbar ? 'bx bx-menu' : 'bx bx-x'} id="close-icon" onClick={e=>setNavbar(!navbar)}/>
            </label>
            <nav className="navbar">
            <a  href="/">Home</a>
            <a  href="/about">Sobre</a> 
            <a  href={user ? "/aluno" : "/auth/login"}>{user ? (user?.nome.split(" ")[0].split("").map((a,i)=>i === 0 ? a : a.toLowerCase())) : "Login"}</a>    
            </nav>
        </header>
    );
}