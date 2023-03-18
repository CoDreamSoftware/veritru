import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import DashboardLayout from '@/components/DashboardLayout'
import ArticlesTable from '@/components/ArticlesTable'

export default function FactCheck() {
    const { data: status } = useSession()
    const router = useRouter()

    // useEffect(() => {
    //     async function fetch() {
    //         const fetchArticles = await Veritru.methods.getAllArticles().call()
    //         setArticles(fetchArticles)
    //         console.log(fetchArticles)
    //     }
    //     fetch()
    // }, [])


    // check user session
    if (status === "unauthenticated") {
        router.replace('/')
    }
    // otherwise, continue rendering props below

    return (
        <DashboardLayout>
            <div className="pt-32 pb-5 px-5 flex items-center justify-center">
                <div className="mx-auto w-full max-w-[1024px] lg:max-w-[1444px]">
                    <article>
                        <h2 className="font-display font-medium text-black dark:text-white text-base my-2 mx-2">
                            Fact-Check Articles
                        </h2>
                        <ArticlesTable/>
                    </article>
                </div>
            </div>
        </DashboardLayout>
    )
}