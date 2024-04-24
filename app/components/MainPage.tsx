import Image from "next/image";
import PageTitle from "./PageTitle";

interface AppProps{

} 

const MainPage: React.FC<AppProps> = () => {
  return (
<div className="flex justify-center items-center h-full pt-10">
  <div className="flex flex-col w-4/12 gap-5 ">
    <PageTitle title="Fintrack"/>
    <div className="flex items-center">
      Fintrack is your ultimate companion for effortless bill management. 
      Say goodbye to missed payments and financial stress with our intuitive app. 
      With powerful machine learning technology, Fintrack helps you stay organized 
      and in control of your microfinances. Experience the future of financial management today!
    </div>
  </div>
  <div className="ml-10"><Image src="/Icon.jpg" alt="Icon" height={450} width={450}/></div>
</div>
  );
};

export default MainPage;