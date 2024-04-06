import Image from "next/image";

interface AppProps{

} 

const MainPage: React.FC<AppProps> = () => {
  return (
    <div className="flex">
      <div>Mainpage</div>
        <div><Image src="/Icon.jpg" alt="Icon" height={450} width={450}/></div>
    </div>
  );
};

export default MainPage;