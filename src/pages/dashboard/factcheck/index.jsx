import { getSession } from 'next-auth/react'
import { getArticles } from '@/services/articles'

import DashboardLayout from '@/components/DashboardLayout'
import ArticlesTable from '@/components/ArticlesTable'

export default function FactCheck({ articles }) {

    // If no articles yet, render initial view
    if (articles.length === 0) return (
        <DashboardLayout>
            <div className="md:w-full pt-32 pb-5 px-5 flex items-center justify-center">
                <div className="mx-auto w-full max-w-[1024px] lg:max-w-[1444px]">
                    <div>
                        <h3 className="p-2">No articles yet.</h3>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )

    return (
        <DashboardLayout>
            <div className="md:w-full pt-32 pb-5 px-10 flex items-center justify-center">
                <div className="mx-auto w-full max-w-[1024px] lg:max-w-[1444px]">
                    <div>
                        <h2 className="font-display font-medium text-black dark:text-white text-base my-2 mx-2">
                            Fact-Check Articles
                        </h2>
                        <div className="relative overflow-x-auto shadow-lg shadow-gray-300/50 sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="pl-6 pr-2 py-3">
                                            No.
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Headline
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            CID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Outcome
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {articles.map((article, idx) => (
                                        <ArticlesTable id={idx+1} article={article} key={article._id} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

// Pre-render props SSR
export async function getServerSideProps(context) {
    const session = await getSession(context)
    const articles = await getArticles()

    console.log(session)
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            //session,
            articles 
        }
    }
}