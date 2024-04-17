'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';

const Nav = () => {

  const isUserLoggedIn= true;
  const [providors, setProdvidors]= useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  useEffect(()=> {
    try{
      const setProdvidors= async () => {
        const response= await getProviders();
        setProdvidors(response); 
      }

      setProdvidors();
    } catch (error){
      console.error('Error fetching authentication providers:', error);
    }
  }, [])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 justify-center'>
        <Image 
          src="/assets/images/logo.svg"
          alt="Logo"
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>
          Promptopia
        </p>
      </Link>
      {/* {Desktop Nagivation} */}

      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>
            <button type="button" className='outline_btn' onClick={signOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image 
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className='rounded-full'
                alt="profile"
              />
            </Link>
          </div>
        ): (
          <>
            {providors && 
            Object.values(providors).map((providor)=>(
              <button
              type="button"
              key={providor.name}
              onClick={()=> signIn(providor.id)}
              className='black_btn'
              >
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

      {/* {Mobile Navigation} */}
      <div className='sm:hidden flex relative'>
          {isUserLoggedIn? (
            <div className='flex'>
            <Image 
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className='rounded-full'
                alt="profile"
                onClick={() => setToggleDropDown((prev)=>!prev)}
              />
              {toggleDropDown && (
                  <div className='dropdown'>
                    <Link href="/profile"
                    className='dropdown_link'
                    onClick={()=> setToggleDropDown(false)}>
                      My Profile
                    </Link>
                    <Link href="/create-prompt"
                    className='dropdown_link'
                    onClick={()=> setToggleDropDown(false)}>
                      Create Prompt
                    </Link>
                    <button
                    type="button"
                    onClick={()=> {
                      setToggleDropDown(false)
                      signOut();
                    }}
                    className='mt-5 w-full black_btn'
                    >
                      Sign Out
                    </button>
                  </div>
                )}
            </div>
          ):(
            <>
            {providors && 
            Object.values(providors).map((providor)=>(
              <button
              type="button"
              key={providor.name}
              onClick={()=> signIn(providor.id)}
              className='black_btn'
              >
                Sign In
              </button>
            ))}
          </>
          )}
      </div>
    </nav>
  )
}

export default Nav