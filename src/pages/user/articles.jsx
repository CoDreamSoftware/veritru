import { useState, useEffect } from 'react'
import { hasToken } from '@/database/middleware/checkUser'
import DashboardLayout from '@/components/DashboardLayout'

export default function Articles() {
    const [articles, setArticles] = useState([])

    // useEffect(() => {
    //     async function fetch() {
    //         const fetchArticles = await Veritru.methods.getAllArticles().call()
    //         setArticles(fetchArticles)
    //         console.log(fetchArticles)
    //     }
    //     fetch()
    // }, [])

    return (
        <DashboardLayout>
            <div className="pt-20 flex items-center justify-center">
                <div className="mx-auto w-full max-w-[1024px] lg:max-w-[1444px]">
                    <article>
                        <div className="mt-2">
                            <h2 className="font-display font-medium text-black dark:text-white text-base my-2 mx-2">
                                List of Articles
                            </h2>

                            <div className="container">
                                {/* <div className="flex flex-wrap justify-between">
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

                                                { article.result &&
                                                    <span className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabIndex="0" role="button">
                                                        { article.result }
                                                    </span>
                                                }
                                                <span className="px-3 py-1 text-sm font-medium text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabIndex="0" role="button">
                                                    Unverified
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div> */}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </DashboardLayout>
    )
}

// PROTECTED PAGE
export async function getServerSideProps(context) {
    const token = await hasToken(context.req)

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return { props: {} }
}