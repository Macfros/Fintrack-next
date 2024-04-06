import {ReactNode} from "react";
import Sidebar from "./Sidebar";
import SidebarProvider from "./SidebarContext";

interface AppProps{
    children: ReactNode | ReactNode[];
} 

export default function BaseLayout({children}: AppProps) {
  return (
    <SidebarProvider>
    <div className="layout">
        <Sidebar />
      {children}
    </div>
    </SidebarProvider>
  );
};
