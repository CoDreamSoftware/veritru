import { assetPrefix } from '@/next/next.config'
import Error from "next/error"
import { getSession } from 'next-auth/react'
import { Fragment, useRef, useState, useEffect } from 'react'

import DisplayPDF from '@/components/DisplayPDF'
import DashboardLayout from '@/components/DashboardLayout'
import { formatDate } from '@/utilities/tools.utils'
import { Listbox, Transition } from '@headlessui/react'
import { RiCloseCircleFill } from "react-icons/ri"
import { IoStatsChart } from "react-icons/io5"
import { FiChevronDown, FiCheck } from 'react-icons/fi'
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

import { updateResult } from '@/services/articles'
import { useAccount } from 'wagmi'
import { VeritruProvider, VeritruSigner } from '@/contracts/veritru'
import { getProvider } from '@/contracts/provider'
import jStat from 'jstat'

const confidenceLvl = [
    { name: 'Select', value: null },
    { name: 'Not Confident', value: -1 },
    { name: 'Confident', value: 0 },
    { name: 'Highly Confident', value: 1 }
]

const yrsExp = [
    { name: '0-5 years', value: 1 },
    { name: '5-10 years', value: 2 },
    { name: '10+ years', value: 3 }
]

const organization = [
    { name: 'Freelancer', value: 1 },
    { name: 'Regional', value: 2 },
    { name: 'Local', value: 3 },
    { name: 'National', value: 4 }
]

const category = [
    { name: 'Independent', value: 1 },
    { name: 'Journalist', value: 2 }
]

// Custom use** Hook instead of using SWR - stale while revalidate
function useTrueVotes(ipfs_cid, initTrueVotes, interval = 5000) {
    const [trueVotes, setTrueVotes] = useState(initTrueVotes)

    useEffect(() => {
        async function fetchData() {
            // Get ethers provider
            const provider = getProvider()
            // Connect to smart contract
            const veritru = await VeritruProvider(provider)

            try {
                const trueVotesData = await veritru.getTrueVotes(ipfs_cid)
                setTrueVotes(trueVotesData.toString())
            } catch (error) {
                console.log(error)
                setTrueVotes(0)
            }
        }

        const intervalId = setInterval(fetchData, interval)
        return () => clearInterval(intervalId)
    }, [ipfs_cid, interval])

    return trueVotes
}

// Custom use** Hook instead of using SWR - stale while revalidate
function useFalseVotes(ipfs_cid, initFalseVotes, interval = 5000) {
    const [falseVotes, setFalseVotes] = useState(initFalseVotes)

    useEffect(() => {
        async function fetchData() {
            // Get ethers provider
            const provider = getProvider()
            // Connect to smart contract
            const veritru = await VeritruProvider(provider)

            try {
                const falseVotesData = await veritru.getFalseVotes(ipfs_cid)
                setFalseVotes(falseVotesData.toString())
            } catch (error) {
                console.log(error)
                setFalseVotes(0)
            }
        }

        const intervalId = setInterval(fetchData, interval)
        return () => clearInterval(intervalId)
    }, [ipfs_cid, interval])

    return falseVotes
}

// Custom use** Hook instead of using SWR - stale while revalidate
function useTotalVotes(ipfs_cid, initTotalVotes, interval = 5000) {
    const [totalVotes, setTotalVotes] = useState(initTotalVotes)

    useEffect(() => {
        async function fetchData() {
            // Get ethers provider
            const provider = getProvider()
            // Connect to smart contract
            const veritru = await VeritruProvider(provider)

            try {
                const totalVotesData = await veritru.getTotalVotes(ipfs_cid)
                setTotalVotes(totalVotesData.toString())
            } catch (error) {
                console.log(error)
                setTotalVotes(0)
            }
        }

        const intervalId = setInterval(fetchData, interval)
        return () => clearInterval(intervalId)
    }, [ipfs_cid, interval])

    return totalVotes
}

// Custom use** Hook instead of using SWR - stale while revalidate
function useConfidences(ipfs_cid, initConfidences, interval = 5000) {
    const [confidences, setConfidences] = useState(initConfidences)

    useEffect(() => {
        async function fetchData() {
            // Get ethers provider
            const provider = getProvider()
            // Connect to smart contract
            const veritru = await VeritruProvider(provider)

            try {
                const confidencesList = await veritru.getConfidenceLevels(ipfs_cid)
                setConfidences(confidencesList.toString())
            } catch (error) {
                console.log(error)
                setConfidences('0,0')
            }
        }

        const intervalId = setInterval(fetchData, interval)
        return () => clearInterval(intervalId)
    }, [ipfs_cid, interval])

    return confidences
}

// Custom use** Hook instead of using SWR - stale while revalidate
function useExpScores(ipfs_cid, initExpScores, interval = 5000) {
    const [expScores, setExpScores] = useState(initExpScores)

    useEffect(() => {
        async function fetchData() {
            // Get ethers provider
            const provider = getProvider()
            // Connect to smart contract
            const veritru = await VeritruProvider(provider)

            try {
                const expScoresList = await veritru.getExpScores(ipfs_cid)
                setExpScores(expScoresList.toString())
            } catch (error) {
                console.log(error)
                setExpScores('0,0')
            }
        }

        const intervalId = setInterval(fetchData, interval)
        return () => clearInterval(intervalId)
    }, [ipfs_cid, interval])

    return expScores
}

export default function FactCheck({ 
    user, article, sessionError, initTrueVotes, initFalseVotes, initTotalVotes, initConfidences, initExpScores
}) {
    const trueVotes = useTrueVotes(article.ipfs_cid, initTrueVotes)
    const falseVotes = useFalseVotes(article.ipfs_cid, initFalseVotes)
    const totalVotes = useTotalVotes(article.ipfs_cid, initTotalVotes)
    const confidences = useConfidences(article.ipfs_cid, initConfidences)
    const expScores = useExpScores(article.ipfs_cid, initExpScores)

    const { isConnected } = useAccount()
    const provider = getProvider()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    
    const [selectedVote, setSelectedVote] = useState(false)
    const [confidence, setConfidence] = useState(confidenceLvl[0])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

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

    useEffect(() => {
        console.log('confidences: ', confidences)
        console.log('expScores: ', expScores)

        console.log(user.tenure, user.organization, user.role)
        console.log(confidence.value)
    }, [user, confidence])

    // Throw sessionError if article id is broken
    if (sessionError && sessionError.statusCode)
    return <Error statusCode={sessionError.statusCode} title={sessionError.statusText} />

    function handleConfidenceChange(selectedValue) {
        setConfidence(selectedValue)
        console.log("confidence change: ", selectedValue)
    }

    function handleSubmit(selectedVote) {
        console.log("selected vote: ", selectedVote)
        // Set the selected vote
        setSelectedVote(selectedVote)
        // Perform the validation check
        if (confidence.value === null) {
            setError('Please select a confidence level.')
            return
        } else {
            setError('')
        }
        onOpen()
    }

    // convert user values to ordinal values
    function equivalence(input, mapping) {
        const result = {}
        for(const key in input) {
            const mappedValue = mapping.find((item) => item.name === input[key])
            if (mappedValue) {
                result[key] = mappedValue.value
            }
        }
        console.log(result)
        return result
    }

    // assign equivalence to user values
    const exp = {
        ...equivalence({ tenure: user.tenure }, yrsExp),
        ...equivalence({ organization: user.organization }, organization),
        ...equivalence({ role: user.role }, category),
    }

    // Execute to interact with smart contract
    async function handleConfirmSubmitVote() {
        setLoading(true)
        if (isConnected) {
            console.log(provider)
            const signer = provider.getSigner()
            const veritru = await VeritruSigner(signer)

            const expScore = exp.tenure + exp.organization + exp.role
            console.log(exp)
            console.log(expScore)

            try {
                const signedTx = await veritru.vote(
                    article.ipfs_cid,
                    selectedVote,
                    confidence.value,
                    expScore
                )
                console.log("Status: ", signedTx)
                toast({
                    title: 'Voted Successfully',
                    msg: 'Your vote was successfully recorded.', 
                    stats: 'success'
                })
                // Update result in database
                handleUpdateResult()
            } catch (error) {
                console.log(error)
                if (error.message === 'Internal JSON-RPC error.') {
                    toast({
                        title: 'Error!',
                        msg: 'You already voted for this article.', 
                        stats: 'error'
                    })
                } else {
                    toast({
                        title: 'Error!',
                        msg: error.message.substring(0,26) + "...", 
                        stats: 'error'
                    })
                }
                setLoading(false)
            }
        } else {
            toast({
                title: 'Error!', 
                msg: 'Wallet not connected!', 
                stats: 'error'
            })
            setLoading(false)
        }
        setLoading(false)
        onClose()
    }

    function probitModel(trueVotes, confidences, expScores) {
        let weightedSum = 0

        console.log("CONFIDENCES", confidences)
        console.log("EXPSCORES", expScores)

        // parse confidences and expScores to an array
        const confidencesArray = confidences.split(',').map(Number)
        const expScoresArray = expScores.split(',').map(Number)

        for (let i = 0; i < confidencesArray.length; i++) {
            if (i < trueVotes) {
                weightedSum += confidencesArray[i] * expScoresArray[i]
            } else {
                weightedSum -= confidencesArray[i] * expScoresArray[i]
            }
        }

        const sd = Math.sqrt(confidencesArray.reduce((acc, c) => acc + c ** 2, 0))
        const mle = weightedSum / sd
        const cdf = jStat.normal.cdf(mle, 0, 1)

        return { cdf, sd, mle }
    }

    const { cdf, sd, mle } = probitModel(trueVotes, confidences, expScores)
    const outcome = cdf >= 0.5

    // Results of PROBIT Model
    console.log(`Probability of outcome: ${(cdf * 100).toFixed(2)}%`)
    console.log(`Standard deviation: ${sd.toFixed(2)}`)
    console.log(`Cumulative distribution function: ${cdf.toFixed(2)}`)
    console.log(`Parameter of maximum likelihood: ${mle.toFixed(2)}`)
    console.log(`Outcome: ${outcome.toString()}`)

    async function handleUpdateResult() {
        const firstLetter = outcome.toString().charAt(0)
        const result = firstLetter.toUpperCase() + outcome.toString().slice(1)

        const res = await updateResult(article._id, result)

        if (res.success) {
            console.log("Result: ", result)
        }
    }

    return (
        <DashboardLayout>
            <div className="pt-32 pb-10 px-7 md:px-10 items-center justify-center">
                <div className="w-full md:max-w-[1280px] flex flex-wrap">
                    <div className="w-full xl:w-[50%] mt-5">
                        <div id="article-details">
                            <div className="flex bg-white dark:bg-gray-800">
                                <div className="py-2 font-medium text-gray-900 dark:text-white">
                                    <div className="w-[100px]">
                                        <h3>
                                            Outcome:
                                        </h3>
                                    </div>
                                </div>
                                <div className="pl-10 pr-5 md:pl-10 md:px-10 py-2">
                                    <div className="w-full flex">
                                        {article.result === 'Undetermined' && <BsFillQuestionCircleFill className="mr-2 text-gray-500" size="24" />}
                                        {article.result === 'True' && <BsCheckCircleFill className="mr-2 text-green-500" size="24" />}
                                        {article.result === 'False' && <RiCloseCircleFill className="mr-2 text-red-500" size="26" />}
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
                                            onClick={() => handleSubmit(true)}
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
                                            onClick={() => handleSubmit(false)}
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
                                        <Listbox value={confidence} onChange={handleConfidenceChange}>
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
                                        { error && <p className="text-sm text-red-500">{error}</p> }
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
                                                    {trueVotes}
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
                                                {(trueVotes/totalVotes) * 100 } %
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
                                                    {falseVotes}
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
                                                {(falseVotes/totalVotes) * 100 } %
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
                                        onClick={handleConfirmSubmitVote}
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
export async function getServerSideProps(context) {
    const { query: { id }, req } = context
    const session = await getSession({req})

    // GET method that fetches an entry from mongodb using ID
    const res = await fetch(`${assetPrefix}/api/articles/${id}`, {
        method: 'GET',
    })
    const article = await res.json()
    console.log(article)

    // GET method that fetches an entry from mongodb using ID
    const resUser = await fetch(`${assetPrefix}/api/users/getUser?email=${session.user.email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const user = await resUser.json()
    console.log(user)

    // Get ethers provider
    const provider = getProvider()
    // Connect to smart contract
    const veritru = await VeritruProvider(provider)

    // Call smart contract function and handle the error
    let initTrueVotes, initFalseVotes, initTotalVotes, initConfidences, initExpScores
    try {
        const trueVotes = await veritru.getTrueVotes(article.ipfs_cid)
        const falseVotes = await veritru.getFalseVotes(article.ipfs_cid)
        const totalVotes = await veritru.getTotalVotes(article.ipfs_cid)
        const confidences = await veritru.getConfidenceLevels(article.ipfs_cid)
        const expScores = await veritru.getExpScores(article.ipfs_cid)
        initTrueVotes = trueVotes.toString()
        initFalseVotes = falseVotes.toString()
        initTotalVotes = totalVotes.toString()
        initConfidences = confidences.toString()
        initExpScores = expScores.toString()
        console.log("confidences:", confidences.toString())
        console.log("expScores:", expScores.toString())
    } catch (error) {
        console.log(error)
        initTrueVotes = "0"
        initFalseVotes = "0"
        initTotalVotes = "0"
        initConfidences = "0,0"
        initExpScores = "0,0"
    }

    console.log(session)
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    if (res.status === 200) {
        return {
            props: {
                //session,
                user,
                article,
                initTrueVotes: initTrueVotes,
                initFalseVotes: initFalseVotes,
                initTotalVotes: initTotalVotes,
                initConfidences: initConfidences,
                initExpScores: initExpScores,
            }
        }
    }

    return {
        props: {
            //session,
            sessionError: {
                statusCode: res.status,
                statusText: "Invalid Id",
            }
        }
    }
}