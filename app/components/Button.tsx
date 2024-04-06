"use client"

interface AppProps{
    title?: string;
    func?:()=>void;
    
} 

const Button: React.FC<AppProps> = ({
    title,
    func,
}) => {
  return (
    <div className="pr-4 pl-4 text-center align-middle pt-2  border-black border-2 hover:cursor-pointer hover:border-blue-700 transition ease-in hover:text-blue-700">
      <button onClick={func} className="">{title}</button>
    </div>
  );
};

export default Button;