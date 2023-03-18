/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { logout } from '@/services/auth'
import { useSession } from "next-auth/react"
import { useRef, useState, useEffect } from 'react'
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Menu, 
    MenuButton, 
    MenuList, 
    MenuGroup, 
    MenuItem,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import { HiBars3BottomLeft } from 'react-icons/hi2'
import { IoSettingsSharp, IoWallet } from 'react-icons/io5'
import { MdSpaceDashboard, MdArticle, MdNoteAdd } from 'react-icons/md'
import Avatar, { genConfig } from 'react-nice-avatar'

import ConnectWallet from './ConnectWallet'
import { truncateAddress } from '@/utilities/address.utils'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const navigation = [
    { name: 'Dashboard', href: '/user', Icon: MdSpaceDashboard },
    { name: 'Articles', href: '/user/articles', Icon: MdArticle },
    { name: 'Add Article', href: '/user/add-article', Icon: MdNoteAdd },
]

export default function Sidebar() {
    const { data: session, status } = useSession()
    const [sessionData, setSessionData] = useState([])

    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
    const { isOpen: isNavOpen, onOpen: onNavOpen, onClose: onNavClose } = useDisclosure()
    const navRef = useRef()
    const router = useRouter()
    const { address, isConnected } = useAccount()

    const toaster = useToast()
    const toast = (value) => {
        toaster({
            title: value.title,
            description: value.msg,
            status: value.stats,
            duration: 3000,
            isClosable: true,
            position: 'top',
        })
    }

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

    async function handleLogout() {
        const res = await logout()
        if (res.error) {
            toast({
                title: 'Error!',
                msg: res.error,
                stats: 'error',
            })
        } else {
            toast({
                title: 'Successfully logged out',
                msg: res.message,
                stats: 'success',
            })
            router.push('/')
        }
    }

    // Persist wallet connection
    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            if (localStorage.getItem('isWalletConnected') === 'true') {
                await connect()
            }
        }
        connectWalletOnPageLoad()
    }, [])

    // Always checks user session
    useEffect(() => {
        async function fetchSessionData() {
            setSessionData(session.user)
            console.log(session.user)
        }
        fetchSessionData()
    },[])

    // Set Avatar
    const config = genConfig(sessionData.email)
    
    return (
        <nav>
            <div className="fixed top-0 z-50 w-full py-2 px-5 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hidden md:block">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <Link href="/user" className="flex flex-shrink-0">
                            <Image src="/png/veritru-sq-white.png" className="w-12 h-12 sm:w-16 sm:h-16" alt="VeriTru Logo" width="48" height="48" unoptimized priority />
                            <span className="self-center whitespace-nowrap text-xl font-medium font-display active:text-cyan-500 hover:text-cyan-500 text-black dark:text-white ml-2">
                                VERITRU
                            </span>
                        </Link>
                    </div>

                    { isConnected
                        ? <Menu>
                            <MenuButton 
                                as={Button}
                            >
                                <div className="flex items-center">
                                    <p className="font-display font-normal mr-2">
                                        { truncateAddress(address) }
                                    </p>
                                    <IoWallet className="w-7 h-7 my-auto rounded-full shadow-lg text-cyan-600 transition duration-75 dark:text-gray-50 group-hover:text-gray-100 dark:group-hover:text-white"/>
                                </div>
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title="Profile">
                                    <MenuItem onClick={disconnect}>Disconnect</MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                        : <button 
                            onClick={onModalOpen}
                            type="button" 
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-5 py-2.5 text-center text-sm font-medium font-display"
                        >
                            Connect Wallet
                        </button>
                    }
                </div>
            </div>

            <div className="fixed z-20 h-screen top-0 left-0 w-64 pt-20 hidden md:block bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                <div className="px-3 py-4">
                    <ul className="space-y-2">
                        {navigation.map(item => { const { name, href, Icon } = item
                            return (
                                <li key={name}>
                                    <Link
                                        href={href}
                                        className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
                                    >
                                        <Icon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-50 group-hover:text-gray-100 dark:group-hover:text-white"/>
                                        <span className="ml-3">
                                            {name}
                                        </span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    
                    <div className="fixed bottom-10 space-y-1">
                        <div className="flex">
                            <Avatar className="w-12 h-12 rounded-full" {...config}/>
                            <div className="my-auto mx-2">
                                <h5 className="text-[13px] truncate font-medium text-gray-900 dark:text-white">
                                    {sessionData.email}
                                </h5>
                                <span className="text-[12px] text-gray-500 dark:text-gray-400">
                                    Account User
                                </span>
                            </div>
                            <Menu placement="top-end">
                                <MenuButton as={Button} size="xs" colorScheme="whiteAlpha">
                                    <IoSettingsSharp className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-50 group-hover:text-gray-100 dark:group-hover:text-white"/>
                                </MenuButton>
                                <MenuList className="text-[12px]">
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed top-0 z-50 w-full p-2 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 md:hidden">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <Link href="/reviewer" className="flex flex-shrink-0">
                            <Image src="/png/veritru-sq-white.png" className="w-12 h-12 sm:w-16 sm:h-16" alt="VeriTru Logo" width="48" height="48" unoptimized priority />
                            <span className="self-center whitespace-nowrap text-xl font-medium font-display active:text-cyan-500 hover:text-cyan-500 text-black dark:text-white ml-2">
                                VERITRU
                            </span>
                        </Link>
                    </div>
                    <button ref={navRef} onClick={onNavOpen} 
                        type="button" 
                        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    >
                        <span className="sr-only">Open sidebar</span>
                        <HiBars3BottomLeft size={36}/>
                    </button>
                </div>
            </div>

            

            <Drawer
                isOpen={isNavOpen}
                placement='left'
                onClose={onNavClose}
                finalFocusRef={navRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <div className="relative h-full pt-16">
                            <ul className="space-y-2">
                                {navigation.map(item => { const { name, href, Icon } = item
                                    return (
                                        <li key={name}>
                                            <Link
                                                href={href}
                                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
                                            >
                                                <Icon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-50 group-hover:text-gray-100 dark:group-hover:text-white"/>
                                                <span className="ml-3">
                                                    {name}
                                                </span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                            
                            <div className="fixed bottom-28 space-y-1">
                                <div className="flex">
                                    <Avatar className="w-12 h-12 rounded-full" {...config}/>
                                    <div className="my-auto mx-2">
                                        <h5 className="text-[13px] truncate font-medium text-gray-900 dark:text-white">
                                            {sessionData.email}
                                        </h5>
                                        <span className="text-[12px] text-gray-500 dark:text-gray-400">
                                            Account User
                                        </span>
                                    </div>
                                    <Menu placement="top-end">
                                        <MenuButton as={Button} size="xs" colorScheme="whiteAlpha">
                                            <IoSettingsSharp className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-50 group-hover:text-gray-100 dark:group-hover:text-white"/>
                                        </MenuButton>
                                        <MenuList className="text-[12px]">
                                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </div>
                            </div>

                            <div className="absolute inset-x-0 bottom-10 px-10 py-3 space-y-1">
                                { isConnected
                                    ? <Menu>
                                        <MenuButton 
                                            as={Button}
                                        >
                                            <div className="flex items-center">
                                                <p className="font-display font-normal mr-2">
                                                    { truncateAddress(address) }
                                                </p>
                                                <IoWallet className="w-7 h-7 my-auto rounded-full shadow-lg text-cyan-600 transition duration-75 dark:text-gray-50 group-hover:text-gray-100 dark:group-hover:text-white"/>
                                            </div>
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem onClick={disconnect}>Disconnect</MenuItem>
                                        </MenuList>
                                    </Menu>
                                    : <button 
                                        onClick={onModalOpen}
                                        type="button" 
                                        className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-5 py-2.5 text-center text-sm font-medium font-display"
                                    >
                                        Connect Wallet
                                    </button>
                                }
                            </div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <ConnectWallet isOpen={isModalOpen} closeModal={onModalClose} />
        </nav>
    )
}