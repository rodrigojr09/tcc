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
      <nav className="bg-[#ff0000]">
  <div className="logo">Inicio</div>
  <div className="links">
    <ul className="nav-itens">
    <li className="text-white">
        <a href="">Link1</a>
      </li>
      <li className="text-white">
        <a href="">Link2</a>
      </li>
      <li className="text-white">
        <a href="">Link3</a>
      </li>
    </ul>
  </div>
  <div className="btn">
    <a href={ !data?.user ? "/auth/login" : "#" } className="usuario">
      { !data?.user ? "Login" : user?.nome }
    </a>
  </div>
</nav>
    );
}