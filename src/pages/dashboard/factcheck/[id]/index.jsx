import { assetPrefix } from '@/next/next.config'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import Error from "next/error"

import DisplayPDF from '@/components/DisplayPDF'
import DashboardLayout from '@/components/DashboardLayout'

export default function FactCheck({ article, error }) {
    const { data: status } = useSession()
    const { query, push } = useRouter()

    if (article) {
        console.log(article)
    }

    // check user session
    if (status === "unauthenticated") {
        router.replace('/')
    }
    // otherwise, continue rendering props below

    // Throw error if id is broken
    if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />

    return (
        <DashboardLayout>
            <div className="pt-32 pb-5 px-5 flex items-center justify-center">
                <div className="mx-auto w-full max-w-[1024px] lg:max-w-[1444px]">
                    <div className="max-w-[635px]">
                        <div className="flex flex-row font-display my-2 mx-2">
                            <h2 className="font-medium text-black dark:text-white text-base mr-2">
                                Headline:
                            </h2>
                            <p>{article.headline}</p>
                        </div>
                        <DisplayPDF cid={article.ipfs_cid}/>
                    </div>
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