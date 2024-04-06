"use client";

import {useState, createContext, ReactNode} from "react";

const initialValue = {isCollapsedSidebar: true, toggleSidebarCollapseHandler:() => {}};
export const SidebarContext = createContext(initialValue);

interface Props{
    children: ReactNode | ReactNode[];
}
const SidebarProvider = ({children}: Props) => {
    const [isCollapsedSidebar,setIsCollapsedSidebar] = useState<boolean>(false);
    const toggleSidebarCollapseHandler = () => {
        setIsCollapsedSidebar(prev => !prev);
    }
    return (
        <SidebarContext.Provider value={{isCollapsedSidebar,toggleSidebarCollapseHandler}}>
        {children}
        </SidebarContext.Provider>
        )
}

export default SidebarProvider;