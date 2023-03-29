import { assetPrefix } from '@/next/next.config'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import Error from "next/error"
import { Fragment, useRef, useState, useEffect } from 'react'

import DisplayPDF from '@/components/DisplayPDF'
import DashboardLayout from '@/components/DashboardLayout'
import { formatDate } from '@/utilities/tools.utils'
import { RiCloseCircleFill } from "react-icons/ri"
import { IoStatsChart } from "react-icons/io5"
import { FiChevronDown, FiCheck } from 'react-icons/fi'
import { Listbox, Transition } from '@headlessui/react'
import { 
    BsFillQuestionCircleFill,
    BsCheckCircleFill,
    BsCheck2Circle,
    BsXCircle
} from "react-icons/bs"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'

import { useAccount } from 'wagmi'
import { Veritru } from '@/contracts/veritru'
import provider from '@/contracts/provider'

const confidenceLvl = [
    { name: 'Select', value: 0 },
    { name: 'Not Confident', value: 1 },
    { name: 'Confident', value: 2 },
    { name: 'Highly Confident', value: 3 }
]

export default function FactCheck({ article, error }) {
    const { data: status } = useSession()
    const { address, isConnected } = useAccount()

    const { query, push } = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    
    const [selectedVote, setSelectedVote] = useState(false)
    const [confidence, setConfidence] = useState(confidenceLvl[0])
    const [loading, setLoading] = useState(false)

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

    // check user session
    if (status === "unauthenticated") {
        router.replace('/')
    }
    // otherwise, continue rendering props below


    // Throw error if article id is broken
    if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />


    // Execute to interact with smart contract
    async function handleSubmitVote() {
        console.log(selectedVote)
        setLoading(true)

        if (isConnected) {
            const signer = provider.getSigner()
            const veritru = await Veritru(signer)

            try {
                const signedTx = await veritru.vote(
                    article.ipfs_cid,
                    selectedVote
                )
                console.log("Status: ", signedTx)
                toast({
                    title: 'Voted Successfully',
                    stats: 'success'
                })
            } catch (error) {
                toast({
                    title: 'Error!', 
                    msg: `${error.message.substring(0,25) + "..."}`, 
                    stats: 'error'
                })
            }
        } else {
            toast({
                title: 'Error!', 
                msg: 'Wallet not connected!', 
                stats: 'error'
            })
        }

        setLoading(false)
    }

    return (
        <DashboardLayout>
            <div className="pt-32 pb-10 px-7 md:px-20 items-center justify-center">
                <div className="w-full md:max-w-[1280px] flex flex-wrap">
                    <div className="w-full xl:w-[50%] mt-5">
                        <div id="article-details">
                            <div className="flex bg-white dark:bg-gray-800">
                                <div className="py-2 font-medium text-gray-900 dark:text-white">
                                    <div className="w-[100px]">
                                        <h3>
                                            Status:
                                        </h3>
                                    </div>
                                </div>
                                <div className="pl-10 pr-5 md:pl-10 md:px-10 py-2">
                                    <div className="w-full flex">
                                        <BsFillQuestionCircleFill className="mr-2 text-gray-500" size="24" />
                                        {/* <BsCheckCircleFill className="mr-2 text-green-500" size="24" /> */}
                                        {/* <RiCloseCircleFill className="mr-2 text-red-500" size="26" /> */}
                                        <p className="text-sm">
                                            {article.result}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex bg-white dark:bg-gray-800">
                                <div className="py-2 font-medium text-gray-900 dark:text-white">
                                    <div className="w-[100px]">
                                        <h3>
                                            Headline:
                                        </h3>
                                    </div>
                                </div>
                                <div className="pl-10 pr-5 md:pl-10 md:px-10 py-2">
                                    <div className="w-full">
                                        <p className="text-sm">
                                            {article.headline}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex bg-white dark:bg-gray-800">
                                <div className="py-2 font-medium text-gray-900 dark:text-white">
                                    <div className="w-[100px]">
                                        <h3>
                                            Description:
                                        </h3>
                                    </div>
                                </div>
                                <div className="pl-10 pr-5 md:px-10 py-2">
                                    <div className="w-full">
                                        <p className="text-sm">
                                            {article.short_desc}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex bg-white dark:bg-gray-800">
                                <div className="py-2 font-medium text-gray-900 dark:text-white">
                                    <div className="w-[100px]">
                                        <h3>
                                            CID:
                                        </h3>
                                    </div>
                                </div>
                                <div className="pl-10 pr-5 md:px-10 py-2">
                                    <div className="w-full">
                                        <p className="text-sm break-all">
                                            {article.ipfs_cid}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex bg-white dark:bg-gray-800">
                                <div className="py-2 font-medium text-gray-900 dark:text-white">
                                    <div className="w-[100px]">
                                        <h3>
                                            Timestamp:
                                        </h3>
                                    </div>
                                </div>
                                <div className="pl-10 pr-5 md:px-10 py-2">
                                    <div className="w-full">
                                        <p className="text-sm">
                                            {formatDate(article.createdAt.toString())}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex bg-white dark:bg-gray-800">
                                <div className="py-2 font-medium text-gray-900 dark:text-white">
                                    <div className="w-[100px]">
                                        <h3>
                                            Vote:
                                        </h3>
                                    </div>
                                </div>
                                <div className="pl-10 pr-5 md:px-10 py-2">
                                    <div className="w-full">
                                        <button
                                            onClick={() => {
                                                setSelectedVote(true)
                                                onOpen()
                                            }}
                                            type="button"
                                            disabled={loading}
                                            className={`text-white bg-emerald-500 hover:bg-emerald-400 rounded-lg px-7 py-2.5 mr-5 mb-2 text-center text-sm font-medium font-display`}
                                        >
                                            { !loading ? (
                                                <div className="flex flex-row-reverse">
                                                    <span>True</span>
                                                    <BsCheck2Circle className="mr-1 my-auto" strokeWidth="1" size={16} />
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <div role="status">
                                                        <svg aria-hidden="true" className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedVote(false)
                                                onOpen()
                                            }}
                                            type="button"
                                            disabled={loading}
                                            className="text-white bg-red-500 hover:bg-red-400 rounded-lg px-6 py-2.5 mr-5 text-center text-sm font-medium font-display"
                                        >
                                            { !loading ? (
                                                <div className="flex flex-row-reverse">
                                                    <span>False</span>
                                                    <BsXCircle className="mr-1 my-auto" strokeWidth="1" size={16} />
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <div role="status">
                                                        <svg aria-hidden="true" className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex bg-white dark:bg-gray-800">
                                <div className="py-2 font-medium text-gray-900 dark:text-white">
                                    <div className="w-[100px]">
                                        <h3>
                                            Confidence Level:
                                        </h3>
                                    </div>
                                </div>
                                <div className="pl-10 pr-5 md:px-10 py-2 w-[21rem]">
                                    <div className="w-full">
                                        <Listbox value={confidence} onChange={setConfidence}>
                                            <div className="relative mt-1">
                                                <Listbox.Button className="relative w-full cursor-default text-left bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 focus:ring-1 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                    <span className="block truncate">{confidence.name}</span>
                                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <FiChevronDown
                                                            className="h-5 w-5 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                </Listbox.Button>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                >
                                                    <Listbox.Options className="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {confidenceLvl.map((item, idx) => (
                                                        <Listbox.Option
                                                            value={item}
                                                            key={idx}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                active ? 'bg-cyan-100' : 'text-gray-900'
                                                                }`
                                                            }
                                                        >
                                                        {({ selected }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${
                                                                    selected ? 'font-medium' : 'font-normal'
                                                                    }`}
                                                                >
                                                                    {item.name}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600">
                                                                        <FiCheck className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                        </Listbox.Option>
                                                    ))}
                                                    </Listbox.Options>
                                                </Transition>
                                            </div>
                                        </Listbox>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-row">
                                <div className="w-full mx-1 my-5 xl:my-8 relative flex flex-col break-words bg-gray-50 dark:bg-gray-300 rounded shadow-lg">
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-wrap">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-gray-400 uppercase font-bold text-xs">
                                                    Total True Votes
                                                </h5>
                                                <span className="font-semibold text-xl text-gray-700">
                                                    204
                                                </span>
                                            </div>
                                            <div className="relative w-auto pl-4 flex-initial">
                                                <div className="text-emerald-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full">
                                                    <IoStatsChart />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400 mt-4">
                                            <span className="text-emerald-500">
                                                100%
                                            </span>
                                            <span className="mx-2 whitespace-nowrap">
                                                of total votes
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="w-full mx-1 my-5 xl:my-8 relative flex flex-col break-words bg-gray-50 dark:bg-gray-300 rounded shadow-lg">
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-wrap">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-gray-400 uppercase font-bold text-xs">
                                                    Total False Votes
                                                </h5>
                                                <span className="font-semibold text-xl text-gray-700">
                                                    204
                                                </span>
                                            </div>
                                            <div className="relative w-auto pl-4 flex-initial">
                                                <div className="text-rose-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full">
                                                    <IoStatsChart />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400 mt-4">
                                            <span className="text-rose-500">
                                                100%
                                            </span>
                                            <span className="mx-2 whitespace-nowrap">
                                                of total votes
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full xl:w-[28rem] mx-auto">
                        <DisplayPDF cid={article.ipfs_cid}/>
                    </div>

                    <AlertDialog
                        motionPreset='slideInBottom'
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                        isOpen={isOpen}
                        isCentered
                    >
                        <AlertDialogOverlay />

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                Confirm your Vote
                            </AlertDialogHeader>
                            <AlertDialogCloseButton />

                            <AlertDialogBody>
                                Are you sure of your vote?
                            </AlertDialogBody>
                            
                            <AlertDialogFooter>
                                <div className="flex w-full flex-row-reverse mt-5">
                                    <button
                                        onClick={()=> {
                                            handleSubmitVote()
                                            onClose()
                                        }}
                                        type="button"
                                        disabled={loading}
                                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-8 py-2.5 mx-2 text-center text-sm font-medium font-display"
                                    >
                                        { !loading ? (
                                            <p>Confirm</p>
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
                                    <button 
                                        ref={cancelRef}
                                        onClick={onClose}
                                        type="button" 
                                        className="text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                        Cancel
                                    </button>
                                </div>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </DashboardLayout>
    )
}

// Pre-render props SSR
export async function getServerSideProps({ query: { id } }) {
    // GET method that fetches an entry from mongodb using ID
    const res = await fetch(`${assetPrefix}/api/articles/${id}`, {
        method: 'GET',
    })
    
    if (res.status === 200) {
        const article = await res.json()

        return {props: { article }}
    }

    return {
        props: { 
            error: {
                statusCode: res.status,
                statusText: "Invalid Id",
            }
        }
    }
}