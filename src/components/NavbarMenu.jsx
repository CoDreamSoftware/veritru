import Link from 'next/link'
import Image from 'next/image'

// pckgs
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { useDisclosure } from '@chakra-ui/react';

// components
import GetStartedModal from '@components/GetStartedModal';

function NavbarMenu() {
    const [navOpen, setNavOpen] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <nav className=" shadow-sm fixed w-full z-10">
                <div className="w-full">
                    <div className="flex items-center h-20 w-full">
                        <div className="flex items-center mx-10 md:mx-20 justify-between w-full">
                            <div className="flex justify-center items-center flex-shrink-0 ">
                                <Image src="/svg/veritru-sq-white.svg" className="w-12 h-12 sm:w-16 sm:h-16" alt="VeriTru Logo" width="48" height="48" priority />
                                <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white font-display ml-2">veritru</span>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link
                                        href="#"
                                        className="cursor-pointer active:text-cyan-500 text-black hover:text-cyan-500 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Home
                                    </Link>

                                    <Link
                                        href="#"
                                        className="cursor-pointer active:text-cyan-500 text-black hover:text-cyan-500 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Guides
                                    </Link>

                                    <Link
                                        href="#"
                                        className="cursor-pointer active:text-cyan-500 text-black hover:text-cyan-500 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Whitepaper
                                    </Link>

                                    <Link
                                        href="#"
                                        className="cursor-pointer active:text-cyan-500 text-black hover:text-cyan-500 px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Contact
                                    </Link>

                                    <button 
                                        onClick={onOpen}
                                        type="button" 
                                        className="font-display font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mr-10 flex md:hidden ">
                            <button
                                onClick={() => setNavOpen(!navOpen)}
                                type="button"
                                className="bg-cyan-500 inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyan-600 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                { !navOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <Transition
                    show={navOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {(ref) => (
                        <div className="md:hidden" id="mobile-menu">
                            <div
                                ref={ref}
                                className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3"
                            >
                                <Link
                                    href="#"
                                    className="cursor-pointer hover:bg-cyan-500 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Home
                                </Link>
                                
                                <Link
                                    href="#"
                                    className="cursor-pointer hover:bg-cyan-500 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Guides
                                </Link>

                                <Link
                                    href="#"
                                    className="cursor-pointer hover:bg-cyan-500 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Whitepaper
                                </Link>

                                <Link
                                    href="#"
                                    className="cursor-pointer hover:bg-cyan-500 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Contact
                                </Link>

                                <button 
                                    onClick={onOpen}
                                    type="button" 
                                    className="font-display font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 w-full text-center"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    )}
                </Transition>
            </nav>

            <main>
                <GetStartedModal isOpen={isOpen} onClose={onClose} />
            </main>
        </>
    )
}

export default NavbarMenu