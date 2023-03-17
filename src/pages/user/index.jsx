import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import DashboardLayout from '@/components/DashboardLayout'

export default function User() {
    const { data: session, status } = useSession()
    const router = useRouter()

    // check user session
    if (status === "unauthenticated") {
        router.replace('/')
    }
    // otherwise, continue rendering props below
    return (
        <DashboardLayout>
            <div className="pt-20 flex items-center justify-center">
                <div className="mx-auto w-full max-w-[1024px] lg:max-w-[1444px]">
                    <article>
                        <div className="mt-2">
                            <h2 className="font-display font-medium text-black dark:text-white text-base my-2 mx-2">
                                Recent Articles
                            </h2>
                        </div>
                    </article>
                </div>
            </div>
        </DashboardLayout>
    )
}