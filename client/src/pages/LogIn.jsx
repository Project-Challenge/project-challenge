import React from "react";
import { Button } from "react-bootstrap";
import { useState,useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const LogIn = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const { loginUser } = useContext(AuthContext)
  return (
    <form onSubmit={loginUser} className='flex flex-col space-y-2'>
      <p className='text-gray-400' id='message'>
        Log in!
      </p>
      <div className='flex flex-col space-y-4 z-10'>
        <input
          className='border border-gray-200 outline-none rounded-full md:h-12 h-10 w-72 md:w-80 lg:96 pl-4 text-xs shadow-md'
          type='text'
          value={login}
          name='username'
          onChange={(e) => setLogin(e.target.value)}
          placeholder='Login...'
        />
        <input
          className='border border-gray-200 outline-none rounded-full md:h-12 h-10 w-72 md:w-80 lg:96 pl-4 text-xs shadow-md'
          type='password'
          value={password}
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password...'
        />
        <input
          className='hover:bg-blue-700 bg-blue-600 w-full rounded-full md:h-12 h-10 w-72 md:w-80 lg:96 font-semibold shadow-md text-white'
          type='submit'
          value='Log in'
        />
      </div>
    </form>
  );
};
export default LogIn;
