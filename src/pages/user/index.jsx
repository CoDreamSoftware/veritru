import { useState, useEffect } from 'react'
import { hasToken } from '@/services/checkUser'
import DashboardLayout from '@/components/DashboardLayout'

export default function User() {
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