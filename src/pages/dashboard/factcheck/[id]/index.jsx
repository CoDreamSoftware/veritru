import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'

import DashboardLayout from '@/components/DashboardLayout'

export default function FactCheck({ articles }) {
    const { data: status } = useSession()
    const router = useRouter()

    if (articles) {
        console.log(articles)
    }

    // check user session
    if (status === "unauthenticated") {
        router.replace('/')
    }
    // otherwise, continue rendering props below

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
            <div className="md:w-full pt-32 pb-5 px-5 flex items-center justify-center">
                <div className="mx-auto w-full max-w-[1024px] lg:max-w-[1444px]">
                    <div>
                        <h2 className="font-display font-medium text-black dark:text-white text-base my-2 mx-2">
                            Fact-Check Articles
                        </h2>
                        <div className="relative overflow-x-auto shadow-lg shadow-gray-300/50 sm:rounded-lg">
                            
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

// // Pre-render props SSR
// export async function getServerSideProps() {
//     const res = await getArticles()
//     return {props: { articles: res }}
// }