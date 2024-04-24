import Image from "next/image";
import Link from "next/link";
import {useContext} from "react";
import {MdDashboard} from "react-icons/md";
import {AiOutlineHome} from "react-icons/ai";
import {BsPeople} from "react-icons/bs";
import {FiMail} from "react-icons/fi";
import {TiContacts} from "react-icons/ti";
import {useState} from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import {SidebarContext} from "./SidebarContext";


interface AppProps{

} 

const sidebarItems = [
  {
    name: "Home",
    href: "/",
    icon: AiOutlineHome,
  },
  {
    name: "Bills",
    href: "/bills",
    icon: BsPeople,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FiMail,
  },
  {
     name: "ITR filing",
     href: "/itr",
     icon: TiContacts,
  }]

const Sidebar: React.FC<AppProps> = () => {

  const {isCollapsedSidebar,toggleSidebarCollapseHandler} = useContext(SidebarContext);

  return (
    <div className="sidebar_wrapper">
      <button className="btn" onClick={toggleSidebarCollapseHandler}>
        <MdOutlineKeyboardArrowLeft />
      </button>
      <aside className="sidebar" data-collapse={isCollapsedSidebar}>
        <div className="sidebar_top">
                <Image src="/logo.png" alt="logo" height={80} width={80}   className="sidebar_logo"/>
                <p className="sidebar_logoname">Fintrack</p>
          </div>
              <ul className="sidebar_list">
                  {sidebarItems.map(({name, href, icon: Icon}) => (
                    <li className="sidebar_item" key={name}>
                    <Link href={href} className="sidebar_link">
                      <span className="sidebar_icon">
                        <Icon />
                      </span>
                      <span className="sidebar_name">{name}</span>
                      </Link>
                  </li>
                  ))}
              </ul>
      </aside>
    </div>
  );
};

export default Sidebar;