"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState,useEffect } from 'react';
import {signIn,signOut,useSession,getProviders} from 'next-auth/react';

const Nav = () => {

  const {data: session} = useSession();

  const [providers,setProviders] = useState(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() =>{
    const setUpProviders = async() => {
        const response = await getProviders();

        setProviders(response);
    }
    setUpProviders();
  },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href="/" className='gap-2 flex-center'>
            <Image
                src= '/assets/images/logo.png'
                alt= 'BateBola Logo'
                width={50}
                height={30}
                className='object-contain'
            />
            <p className='logo_text'>
                BateBola
            </p>
        </Link>

        {/*Usuario Desktop*/}

        <div className='sm:flex hidden'>
            {session?.user ? (
                <div className='flex gap-3 md:gap-5'>
                    <Link href='/criar-evento' className='black_btn'>
                        Criar Evento
                    </Link>

                    <button type='button' onClick={signOut} className='outline_btn'>
                        Desconectar
                    </button>
                    
                    <Link href='/perfil'>
                        <Image 
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className='rounded-full'
                            alt='perfil'
                        />
                    </Link>
                </div>
            ): (
                <>
                    {providers &&
                        Object.values(providers).map((provider)=>
                        <button 
                            type='button'
                            key={provider.name}
                            onClick={()=>signIn(provider.id)}
                            className='black_btn'
                        >
                            Entrar  
                        </button>
                        )
                    }
                </>
            )
            }
        </div>

        {/*Usuario Mobile*/}

        <div className='sm:hidden flex relative'>
            {session?.user ? (
                <div className='flex'>
                    <Image 
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className='rounded-full'
                        alt='perfil'
                        onClick={() => setToggleDropdown((prev) => !prev)}
                    />

                    {toggleDropdown && (
                        <div className='dropdown'>
                            <Link
                                href='/perfil'
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}
                            >
                                Meu Perfil
                            </Link>
                            <Link
                                href='/criar-evento'
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}
                            >
                                Criar Evento
                            </Link>
                            <button
                                type='button'
                                onClick={() => {
                                    setToggleDropdown(false);
                                    signOut();
                                }}
                                className='mt-5 w-full black_btn'
                            >
                                Desconectar
                            </button>
                        </div>
                    )}
                </div>
            ):(
                <>
                    {providers &&
                        Object.values(providers).map((provider)=>
                        <button 
                        type='button'
                        key={provider.name}
                        onClick={()=>signIn(provider.id)}
                        className='black_btn'
                        >
                            Entrar  
                        </button>
                        )
                    }
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav