import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/react'

import DashboardLayout from '@/components/DashboardLayout'

//export default function FactCheck({ articles }) {
export default function FactCheck({ serverSession }) {
    const router = useRouter()
    const { data: clientSession, status } = useSession()
    const session = clientSession || serverSession

    // check user session
    if (status === "unauthenticated") {
        router.replace('/')
    }
    // check if admin
    useEffect(() => {
        if (!session?.user?.isAdmin) {
            router.replace('/dashboard')
        }
    }, [session, router])

    if (!status || !session.user.isAdmin) {
        return <p>Loading...</p>
    }
    // otherwise, continue rendering props below

    // // If no articles yet, render initial view
    // if (articles.length === 0) return (
    //     <DashboardLayout>
    //         <div className="md:w-full pt-32 pb-5 px-5 flex items-center justify-center">
    //             <div className="mx-auto w-full max-w-[1024px] lg:max-w-[1444px]">
    //                 <div>
    //                     <h3 className="p-2">No articles yet.</h3>
    //                 </div>
    //             </div>
    //         </div>
    //     </DashboardLayout>
    // )

    return (
        <DashboardLayout>
            <div className="md:w-full pt-32 pb-5 px-10 flex items-center justify-center">
                <div className="mx-auto w-full max-w-[1024px] lg:max-w-[1444px]">
                    <div>
                        <h2 className="font-display font-medium text-black dark:text-white text-base my-2 mx-2">
                            Users List
                        </h2>
                        {/* <div className="relative overflow-x-auto shadow-lg shadow-gray-300/50 sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
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
                                            Status
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
                        </div> */}
                    </div>
                </div>
            </div>
        </DashboardLayout>
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

// // Pre-render props SSR
// export async function getServerSideProps() {
//     const articles = await getArticles()
//     return {props: { articles }}
// }