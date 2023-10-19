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
    return ( <>
        <style jsx>
            { `.navbar-header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 1.3rem 10%;
   /* background:rgba(0, 0, 0, .1);*/
    /*backdrop-filter:blur(50px) ;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
}
.navbar-header::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background: rgba(0, 0, 0, .1);
    backdrop-filter: blur(50px);
    z-index: -1;
}

.navbar-header .Logo{
    font-size: 2rem;
    color: #DB0000;
    text-decoration: none;
    font-weight: 700;
}
.navbar-header .navbar a {
    position: relative;
    font-size: 1.15rem;
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    margin-left: 2.7rem;
}

.navbar-header .navbar a::before{
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 0;
    height: 1px;
    background: #fff;
    transition: .3s;
}

.navbar-header .navbar a:hover::before{
    width: 100%;
}

.navbar-header #check {
    display: none;
}
.navbar-header .icons{
    position: absolute;
    right: 5%;
   font-size:2.8rem;
   color: #fff;
   cursor: pointer; 
   display: none; 
}
@media only screen and (max-width:600px){
    .navbar-header::before {
        width: 100%;
    }
    .navbar-header {
        width: 100%;
    }
    .navbar-header .icons {
        display: inline-flex;
    }
    
    .navbar-header #check:checked~.icons #menu-icon{
        display: none;  
    }
    .navbar-header .icons #close-icon{
        display:none;
    }
    .navbar-header #check:checked~.icons #close-icon{
        display: block;
    }
    .navbar-header .navbar{
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 0;
        background:rgba(0, 0, 0, .1);
        backdrop-filter: blur(50px);
        box-shadow: 0.5rem 1rem rgba(0, 0, 0, .1);
        overflow: hidden;
        transition: .3s ease;
    }
    .navbar-header #check:checked~.navbar{
        height: 8rem;
    }
    .navbar-header .navbar a {
        display: block;
        font-size: 1.1rem;
        margin: 0.8rem 0;  
        text-align: center; 
        transform:translateY(-50);
        transition:.3s ease ;
    }
    .navbar-header #check:checked~.navbar a { 
        transform: translateY(0);
        opacity: 1;
        transition-delay: calc(.15s * var(--i));
    }
    .navbar-header .bx-menu {
        font-size: 4vh;
        color: white;
    }
    
}    
/*.navbar-header .Logo */
@media (max-width:992px){
    .navbar-header .header{
        padding:1.3rem 5%;
    }
}`}
        </style>
        <header  className={"navbar-header"}>
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
    </>
    );
}