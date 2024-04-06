"use client"

import {useSession} from 'next-auth/react'
interface UserProps{

} 

const User: React.FC<UserProps> = () => {
    const { data: session} = useSession();
  return (
    <div>
      <h1>Hello!
        {JSON.stringify(session)}
      </h1>
    </div>
  );
};

export default User;