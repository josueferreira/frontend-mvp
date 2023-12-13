import React from "react";
import { Link } from 'react-router-dom';
import { TiHome, TiZoomOutline, TiLocation, TiCompass, TiLocationArrowOutline } from "react-icons/ti";
import { TbLogout } from "react-icons/tb";

const Sidebar = () => {
  return (
    <div className=" h-screen w-1/5 py-10 px-4 bg-slate-100 flex flex-col justify-between fixed lg:visible invisible">
     <div>
      <img className="w-48 mb-4" src="/logo.png" alt="logo"/>
      
      <div className="hidden text-left lg:flex justify-start align-middle items-center gap-2">
      <img className="w-16 h-16 rounded-full"  src="/images/users/user.jpg" alt="user"/>
        <div className="grid col text-left">
        <span className="text-sm font-medium text-black dark:text-white">
          Thomas Anree
        </span>
        <button className="text-xs text-left">editar perfil</button>
        </div>
      </div>
      </div>
      <nav className=" flex flex-col mb-12">
        <ul className="space-y-2 flex flex-col gap-7">
            <li><Link to="/" className="flex items-center gap-1 text-lg hover:text-amber-300"><TiHome /> Início</Link></li>
            <li><Link to="/experiencia" className="flex items-center gap-1 text-lg hover:text-amber-300"><TiLocation />Experiência</Link></li>
            <li><button className="flex items-center gap-1 text-lg hover:text-amber-300"><TiZoomOutline />Pesquisar</button></li>
            <li><button className="flex items-center gap-1 text-lg hover:text-amber-300"><TiCompass />Explorar</button></li>
            <li><button className="flex items-center gap-1 text-lg hover:text-amber-300"><TiLocationArrowOutline />Mensagens</button></li>

        </ul>
      </nav>
     
     <button className="flex mb-8 items-center gap-1 text-lg hover:text-amber-300"><TbLogout /> Logout</button>
    </div>
  );
};

export default Sidebar;
