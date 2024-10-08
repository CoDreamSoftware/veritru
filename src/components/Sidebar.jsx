/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/react'
import { logout } from '@/services/auth'
import { useRef, useEffect } from 'react'

import ConnectWallet from './ConnectWallet'
import { truncateAddress } from '@/utilities/tools.utils'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

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
import { MdSpaceDashboard, MdArticle, MdNoteAdd, MdAccountCircle } from 'react-icons/md'
import Avatar, { genConfig } from 'react-nice-avatar'

const navigation = [
    // { name: 'Dashboard', href: '/dashboard', Icon: MdSpaceDashboard },
    { name: 'Fact-Check', href: '/dashboard/factcheck', Icon: MdArticle },
    { name: 'Add Article', href: '/dashboard/factcheck/new', Icon: MdNoteAdd },
]

export default function Sidebar({ serverSession }) {
    const router = useRouter()

    const { data: clientSession } = useSession()
    const session = clientSession || serverSession
    const { address, isConnected } = useAccount()

    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
    const { isOpen: isNavOpen, onOpen: onNavOpen, onClose: onNavClose } = useDisclosure()
    const navRef = useRef()

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

    const { connect, isLoading } = useConnect({
        connector: new MetaMaskConnector(),
        onSuccess() { 
            localStorage.setItem('isWalletConnected', true)
        },
        onError(error) { console.log(error) }
    })
    const { disconnect } = useDisconnect({
        onSettled(data, error) {
            console.log('Disconnect Settled', {data, error})
            localStorage.setItem('userConnectedWallet', false)
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
        async function connectWalletOnPageLoad() {
            localStorage.setItem('isWalletConnected', false)
            localStorage.setItem('userConnectedWallet', false)
            
            if (localStorage.getItem('userConnectedWallet') === 'true') {
                if (localStorage.getItem('isWalletConnected') === 'true') {
                    await connect()
                }
            }
        }
        connectWalletOnPageLoad()
    }, [])

    // Set Avatar
    const config = genConfig(session?.user?.email)

    return (
        <nav>
            <div className="fixed top-0 z-50 w-full py-2 px-5 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hidden md:block">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <Link href="/dashboard" className="flex flex-shrink-0">
                            <Image src="/assets/png/veritru-sq-white.png" className="w-12 h-12 sm:w-16 sm:h-16" alt="VeriTru Logo" width="48" height="48" unoptimized priority />
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
                            { !isLoading ? (
                                <p>Connect Wallet</p>
                            ) : (
                                <div className="text-center">
                                    <div role="status">
                                        <svg aria-hidden="true" className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                    </div>
                                </div>
                            )}
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

                        {session?.user?.isAdmin && (
                            <li>
                                <Link
                                    href="/dashboard/users"
                                    className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
                                >
                                    <MdAccountCircle className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-50 group-hover:text-gray-100 dark:group-hover:text-white"/>
                                    <span className="ml-3">
                                        Users
                                    </span>
                                </Link>
                            </li>
                        )}
                    </ul>
                    
                    <div className="fixed bottom-10 space-y-1">
                        <div className="flex">
                            <Avatar className="w-12 h-12 rounded-full" {...config}/>
                            <div className="my-auto mx-2">
                                <h5 className="text-[13px] truncate font-medium text-gray-900 dark:text-white">
                                    {session?.user?.email.substring(0,14) + "..."}
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
                            <Image src="/assets/png/veritru-sq-white.png" className="w-12 h-12 sm:w-16 sm:h-16" alt="VeriTru Logo" width="48" height="48" unoptimized priority />
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

                                {session?.user?.isAdmin && (
                                    <li>
                                        <Link
                                            href="/dashboard/users"
                                            className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
                                        >
                                            <MdAccountCircle className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-50 group-hover:text-gray-100 dark:group-hover:text-white"/>
                                            <span className="ml-3">
                                                Users
                                            </span>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                            
                            <div className="fixed bottom-28 space-y-1 px-6 py-4">
                                <div className="flex">
                                    <Avatar className="w-12 h-12 rounded-full" {...config}/>
                                    <div className="my-auto mx-2">
                                        <h5 className="text-[13px] truncate font-medium text-gray-900 dark:text-white">
                                            {session?.user?.email.substring(0,14) + "..."}
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
                                        { !isLoading ? (
                                            <p>Connect Wallet</p>
                                        ) : (
                                            <div className="text-center">
                                                <div role="status">
                                                    <svg aria-hidden="true" className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
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

export async function getServerSideProps(context) {
    const serverSession = await getSession(context)
    return {
        props: {
            serverSession,
        },
    }
}