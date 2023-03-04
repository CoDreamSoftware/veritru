import Link from 'next/link'
import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { create } from 'ipfs-http-client'
import { useToast, Progress } from '@chakra-ui/react'

function SubmitArticle() {
    const [cid, setCid] = useState(null)
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(null)
    const [isUploading, setIsUploading] = useState(false)

    const projectId = process.env.INFURA_IPFS_ID
    const projectSecret = process.env.INFURA_IPFS_SECRET
    const auth =
        'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

    const IPFS = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: auth,
        },
    })

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

    const saveToIpfs = async (event) => {
        const file = event.target.files[0]
        setFile(file)

        try {
            setIsUploading(true)
            const added = await IPFS.add(file, {
                progress: (prog) => setProgress((prog / file.size)*100)
            })
            const fileUrl = `https://veritru.infura-ipfs.io/ipfs/${added.path}`
            setCid(fileUrl)
            toast({
                title: 'Upload Success', 
                msg: `File Url: ${fileUrl.substring(0,10) + "..."}`, 
                stats: 'success'
            })
            setIsUploading(false)
        } catch (error) {
            toast({
                title: 'Error uploading file', 
                msg: error.message, 
                stats: 'error'
            })
        }
    }
    useEffect(() => {
        console.log(`Upload Progress: ${progress}`);
    }, [progress])

    return (
        <Layout>
            <div className="pt-32 flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <h2 className="font-display font-semibold text-base text-center mb-4 mx-2 text-gray-900 dark:text-white">
                        Article Submission
                    </h2>
                    <form>
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="mx-2 block font-normal font-display text-base text-gray-900 dark:text-white tracking-wide"
                            >
                                Title
                            </label>
                            <span className="mb-2 mx-2 block font-display text-[.775rem] text-gray-400 dark:text-white">Required</span>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Article Title"
                                className="w-full rounded-lg py-2 px-3 text-sm font-normal text-gray-500 dark:text-white border border-gray-300 dark:border-white focus:border-cyan-500 bg-gray-50 outline-none"
                            />
                        </div>

                        <div className="mb-5">
                            <label
                                htmlFor="subject"
                                className="mx-2 block font-normal font-display text-base text-gray-900 dark:text-white tracking-wide"
                            >
                                Authors
                            </label>
                            <span className="mb-2 mx-2 block font-display text-[.775rem] text-gray-400 dark:text-white">Required</span>
                            <input
                                type="text"
                                name="authors"
                                id="authors"
                                placeholder="Author's Full Name"
                                className="w-full rounded-lg py-2 px-3 text-sm font-normal text-gray-500 dark:text-white border border-gray-300 dark:border-white focus:border-cyan-500 bg-gray-50 outline-none"
                            />
                        </div>

                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="mb-2 mx-2 block font-normal font-display text-base text-gray-900 dark:text-white tracking-wide"
                            >
                                Description
                            </label>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Short Description of the Article"
                                className="w-full rounded-lg py-2 px-3 text-sm font-normal text-gray-500 dark:text-white border border-gray-300 dark:border-white focus:border-cyan-500 bg-gray-50 outline-none"
                            />
                        </div>

                        <div className="mb-5">
                            <label
                                htmlFor="message"
                                className="mb-2 mx-2 block font-normal font-display text-base text-gray-900 dark:text-white tracking-wide"
                            >
                                Content
                            </label>
                            <textarea
                                rows="4"
                                name="content"
                                id="content"
                                placeholder="Insert text / content of the article here."
                                className="w-full rounded-lg py-2 px-3 text-sm font-normal text-gray-500 dark:text-white border border-gray-300 dark:border-white focus:border-cyan-500 bg-gray-50 outline-none"
                            ></textarea>
                        </div>

                        {!file &&
                            <div className="mb-5">
                                <label
                                    htmlFor="message"
                                    className="mb-2 mx-2 block font-normal font-display text-base text-gray-900 dark:text-white tracking-wide"
                                >
                                    Upload Document
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">pdf &#40;max. 2mb&#41;</p>
                                        </div>
                                        <input 
                                            id="dropzone-file" 
                                            type="file" 
                                            className="hidden"
                                            onChange={saveToIpfs}
                                        />
                                    </label>
                                </div> 
                            </div>
                        }
                        
                        {file &&
                            <div className="rounded-md bg-gray-200 py-4 px-8">
                                <div className="flex items-center justify-between">
                                    <span className="truncate pr-3 text-base font-medium text-gray-900">
                                        {file.name}
                                    </span>
                                    <button className="text-gray-900" id="close-btn">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z" fill="currentColor"/><path fillRule="evenodd" clipRule="evenodd" d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z" fill="currentColor" /></svg>
                                    </button>
                                </div>
                                {isUploading &&
                                    <div className="relative w-full mt-3 rounded-lg bg-[#E2E5EF]">
                                        <Progress value={progress} className="rounded-lg bg-teal-500" size="xs" />
                                    </div>
                                }
                            </div>
                        }
                        <div className="flex w-full flex-row-reverse mt-5">
                            <button
                                type="button" 
                                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-8 py-2.5 mx-2 text-center text-sm font-medium font-display"
                            >
                                Submit
                            </button>
                            <Link 
                                href="/user"
                                type="button" 
                                className="text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-200 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                Cancel
                            </Link>
                        </div>
                    </form>
                    {cid && <p>Uploaded to IPFS with CID : {cid}</p>}
                </div>
            </div>
        </Layout>
    )
}

export default SubmitArticle