"use client"
import BaseLayout from "../components/BaseLayout";


interface AppProps{

} 

const About: React.FC<AppProps> = () => {
  return (
    <BaseLayout>
      <div>
      <h1>About</h1>
      </div>
    </BaseLayout>
  );
};

export default About;