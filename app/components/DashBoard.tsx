import BaseLayout from "./BaseLayout";
import Sidebar from "./Sidebar";

interface AppProps{

} 

const DashBoard: React.FC<AppProps> = () => {
  return (
    
      <BaseLayout>
      <div>
      <h1>Dashboard</h1>
      </div>
      </BaseLayout>
      
  );
};

export default DashBoard;