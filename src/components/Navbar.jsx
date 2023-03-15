import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { 
    Avatar, 
    Button,
    Menu, 
    MenuButton, 
    MenuList, 
    MenuGroup, 
    MenuItem,
    useDisclosure, 
} from '@chakra-ui/react'
import { truncateAddress } from '@/utilities/address.utils'
import RegisterModal from '@/components/RegisterModal'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const navigation = [
    { name: 'Fact Check', href: '/' },
    { name: 'Submit Article', href: '/submit-article' },
    { name: 'Guides', href: '/guides' },
]

export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
        connector: new MetaMaskConnector(),
        onSuccess() { localStorage.setItem('isWalletConnected', true) },
        onError(error) { console.log(error) }
    })
    const { disconnect } = useDisconnect({
        onSettled(data, error) {
            console.log('Disconnect Settled', {data, error})
            localStorage.setItem('isWalletConnected', false)
        }
    })

    // Persist wallet connection
    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            if (localStorage.getItem('isWalletConnected') === 'true') {
                await connect()
            }
        }
        connectWalletOnPageLoad()
    }, [])

    return (
        <>
            <nav className="w-full fixed z-10 bg-white shadow-sm">
                <div className="w-full">
                    <div className="flex items-center h-20 w-full">
                        <div className="flex items-center mx-10 md:mx-20 justify-between w-full">
                            <Link href="/" className="flex justify-center items-center flex-shrink-0">
                                <Image src="/png/veritru-sq-white.png" className="w-12 h-12 sm:w-16 sm:h-16" alt="VeriTru Logo" width="48" height="48" unoptimized priority />
                                <span className="self-center whitespace-nowrap text-xl font-medium font-display active:text-cyan-500 hover:text-cyan-500 text-black dark:text-white ml-2">
                                    VERITRU
                                </span>
                            </Link>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key = {item.name}
                                            href= {item.href}
                                            className="cursor-pointer active:text-cyan-500 hover:text-cyan-500 text-black dark:text-white px-3 py-2 rounded-md text-sm font-normal font-display"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}

                                    { isConnected
                                        ? <Menu>
                                            <MenuButton 
                                                as={Button}
                                            >
                                                <div className="flex items-center">
                                                    <p className="font-display font-normal mr-2">
                                                        { truncateAddress(address) }
                                                    </p>
                                                    <Avatar 
                                                        size="sm"
                                                        name={truncateAddress(address)} 
                                                        src="https://api.dicebear.com/5.x/shapes/svg?scale=50" 
                                                        alt="avatar" 
                                                    />
                                                </div>
                                            </MenuButton>
                                            <MenuList>
                                                <MenuGroup title="Profile">
                                                    <MenuItem>Account</MenuItem>
                                                    <MenuItem>
                                                        <Link 
                                                            onClick={disconnect} 
                                                            href="/"
                                                        >
                                                            Disconnect
                                                        </Link>
                                                    </MenuItem>
                                                </MenuGroup>
                                            </MenuList>
                                        </Menu>
                                        : <button 
                                            onClick={onOpen}
                                            type="button" 
                                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-5 py-2.5 text-center text-sm font-medium font-display"
                                        >
                                            Get Started
                                        </button>
                                    }
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
                    enterFrom="opacity-0 scale-100 translate-y-2"
                    enterTo="opacity-100 scale-100 translate-y-0"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100 translate-y-2"
                    leaveTo="opacity-0 scale-100 translate-y-0"
                >
                    <div className="md:hidden bg-white relative min-h-screen" id="mobile-menu">
                        <div
                            className="px-10 py-3 space-y-1"
                        >                            
                            {navigation.map((item) => (
                                <Link
                                    key = {item.name}
                                    href= {item.href}
                                    className="cursor-pointer hover:bg-cyan-500 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium font-display"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="absolute inset-x-0 bottom-28 px-10 py-3 space-y-1">
                            { isConnected
                                ? <>
                                    <div className="flex items-center px-3 py-2 mt-5 mx-5">
                                        <Avatar 
                                            name={truncateAddress(address)} 
                                            src="https://api.dicebear.com/5.x/shapes/svg?scale=50" 
                                            alt="avatar" 
                                        />
                                        <p className="font-display ml-2 font-medium">
                                            { truncateAddress(address) }
                                        </p>
                                    </div>
                                    <Link 
                                        href="/"
                                        onClick={disconnect}
                                        className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white block px-3 py-2 rounded-md text-base font-medium font-display text-center mx-5 mt-5"
                                    >
                                        Disconnect
                                    </Link>
                                </>
                                : <button 
                                    onClick={onOpen}
                                    type="button" 
                                    className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-5 py-2.5 text-center text-sm font-medium font-display"
                                >
                                    Connect Wallet
                                </button>
                            }
                        </div>
                    </div>
                </Transition>
            </nav>

            <RegisterModal isOpen={isOpen} closeModal={onClose} />
        </>
    )
}