import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/router';

function Header() {

    const [navbar, setNavbar] = useState(false)

    // const router = useRouter()

    const backToCoverage = () => {
        // setFibreProvider([])
        // console.log(fibreProvider)
        console.log("backToCoverage")
    }
    return (
    <nav className="w-full bg-hwc-darkPurple top-0 left-0 fixed z-[3000]">
        <div className="justify-between mx-auto max-w-[1500px] px-4 md:px-8 md:items-center md:flex ">
            <div>
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                <Link href="/" className="flex items-center">
                        <Image src="/images/logo.png" alt="Logo" width="180" height="50" className='py-2'/>
                    </Link>
                <div className="md:hidden">
                    <button
                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                    >
                    {navbar ? (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                        </svg>
                    ) : (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        </svg>
                    )}
                    </button>
                </div>
                </div>
            </div>
        <div>
            <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
            }`}
            >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <li>
                    <Link href="/fibre-deals" className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-white md:p-0 hover:text-[#48CBC5]" aria-current="page" onClick={() => setNavbar(!navbar)}>FIBRE DEALS</Link>
                    </li>
                    <li>
                    <Link href="/fibre-coverage" className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-white md:p-0 hover:text-[#48CBC5]" onClick={() => setNavbar(!navbar)}>CHECK COVERAGE</Link>
                    </li>
                    <li>
                    <Link href="/about-us" className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-white md:p-0 hover:text-[#48CBC5]" onClick={() => setNavbar(!navbar)}>ABOUT US</Link>
                    </li>
                    <li>
                    <Link href="/get-in-touch" className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-white md:p-0 hover:text-[#48CBC5]" onClick={() => setNavbar(!navbar)}>GET IN TOUCH</Link>
                    </li>
                    <li>
                    <Link href="https://clientzone.hollywoodconnect.co.za/portal/dashboard" className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-white md:p-0 hover:text-[#48CBC5]">CLIENT PORTAL</Link>
                    </li>
            </ul>
            </div>
        </div>
            <div className='md:hidden hidden lg:block'>
                <Link href="/fibre-coverage" onClick={backToCoverage} className="text-[#28003E] duration-500 font-semibold bg-[#48CBC5] hover:bg-[#AD83EA] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-sm px-5 py-2.5 text-center mr-3 md:mr-0">Order Now</Link>
            </div>
        </div>
    </nav>
    )
}

export default Header