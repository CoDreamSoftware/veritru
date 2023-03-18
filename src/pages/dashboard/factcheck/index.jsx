import { getArticles } from "@/services/articles"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'

import DashboardLayout from '@/components/DashboardLayout'
import ArticlesTable from '@/components/ArticlesTable'

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
    if (articles.length === 0) return <h3 className="p-2">No articles yet.</h3>

    return (
        <DashboardLayout>
            <div className="pt-32 pb-5 px-5 flex items-center justify-center">
                <div className="mx-auto w-full max-w-[1024px] lg:max-w-[1444px]">
                    <div>
                        <h2 className="font-display font-medium text-black dark:text-white text-base my-2 mx-2">
                            Fact-Check Articles
                        </h2>
                        {articles.map((article) => (
                            <ArticlesTable article={article} key={article._id} />
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

// Pre-render props SSR
export async function getServerSideProps() {
    const res = await getArticles()
    return {props: { articles: res }}
}