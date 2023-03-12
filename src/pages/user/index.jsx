import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HiArrowLongRight } from "react-icons/hi2"
// import { dateFormat } from '@/utilities/dateformatter.utils'
import Layout from "@/components/Layout"
import Veritru from '@/contracts/veritru'

function User() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        async function fetch() {
            const fetchArticles = await Veritru.methods.getAllArticles().call()
            setArticles(fetchArticles)
        }
        fetch()
    }, [])

    return (
        <Layout>
            <div className="pt-32 flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[1024px] lg:max-w-[1444px]">
                    <div className="my-2 flex lg:my-3">
                        <span>
                            <Link 
                                href="/user/submit-article"
                                type="button" 
                                className="flex w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-3 py-2 text-center text-sm font-medium font-display"
                            >
                                <svg className="mr-2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_3098_154395)"><path d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/></g><defs><clipPath id="clip0_3098_154395"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>
                                Submit Article
                            </Link>
                        </span>
                    </div>
                    <article>
                        <div className="mt-10">
                            <h2 className="font-display font-medium text-black dark:text-white text-base my-2 mx-2">
                                Recent Articles
                            </h2>

                            <div className="container">
                                <div className="flex flex-wrap justify-between">
                                    {articles.map((article, index) => (
                                        <div key={index} className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                            <div>
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                    {article.headline}
                                                </h5>
                                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                                    Category: {article.category}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between py-2">
                                                <button href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cyan-500 rounded-lg hover:bg-cyan-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    Read more
                                                    <HiArrowLongRight className="w-4 h-4 ml-2 -mr-1"/>
                                                </button>

                                                {/* <span className="text-sm font-light text-gray-600 dark:text-gray-400">
                                                    {article.date}
                                                </span> */}

                                                { article.result ? (
                                                    <span className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabIndex="0" role="button">
                                                        { article.result }
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 text-sm font-medium text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabIndex="0" role="button">
                                                        Unverified
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </Layout>
    )
}

export default User