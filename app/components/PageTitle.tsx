import  { cn } from "@/lib/utils";

interface AppProps{
    title: string;
    className?: string;
} 

const PageTitle: React.FC<AppProps> = ({ title, className}) => {
  return (
    <div>
      <h1 className={cn("text-2xl font-semibold",className)}>{title}</h1>
    </div>
  );
};

export default PageTitle;