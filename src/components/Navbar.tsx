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
    <header>
      <nav>
          <ul className="nav__links">
              <li><a href="#">Services</a></li>
              <li><a href="#">Project</a></li>
              <li><a href="#">About</a></li>
          </ul>
      </nav>
      <a className="cta" href="#"><button> Contact</button></a>
  </header>
    );
}