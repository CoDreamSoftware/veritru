import Link from 'next/link'
import { useState } from 'react'
import Layout from '@/components/Layout'
import { create } from 'ipfs-http-client'
import { useToast } from '@chakra-ui/react'

function SubmitArticle() {
    const [cid, setCid] = useState(null)

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
        try {
            const added = await IPFS.add(file, {
                progress: (prog) => console.log(`Received: ${prog}`)
            })
            const fileUrl = `https://veritru.infura-ipfs.io/ipfs/${added.path}`
            setCid(fileUrl)
            toast({
                title: 'Upload Success', 
                msg: `File Url: ${fileUrl}`, 
                stats: 'success'
            })
        } catch (error) {
            toast({
                title: 'Error uploading file', 
                msg: error.message, 
                stats: 'error'
            })
        }
    }

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
                        
                        <div className="inline-flex items-center justify-center w-full">
                            <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                            <span className="absolute px-3 font-normal text-[0.775rem] text-gray-400 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">and</span>
                        </div>

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
                                        <p className="text-xs text-gray-500 dark:text-gray-400">docx, pdf, jpg, png (max. 2mb)</p>
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
                        
                        <div className="flex w-full flex-row-reverse">
                            <Link 
                                href="/user"
                                type="button" 
                                className="text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-200 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                Cancel
                            </Link>
                            <button
                                type="button" 
                                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-8 py-2.5 mx-2 text-center text-sm font-medium font-display"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    {cid && <p>Uploaded to IPFS with CID : {cid}</p>}
                </div>
            </div>
        </Layout>
    )
}

export default SubmitArticle