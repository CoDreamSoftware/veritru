import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { getUsers } from '@/services/users'

import DashboardLayout from '@/components/DashboardLayout'
import UsersTable from '@/components/UsersTable'

// Custom use** Hook instead of using SWR - stale while revalidate
function useUpdatedUsers ( initialRenderedUsers, interval = 3000) {
    const [data, setData] = useState(initialRenderedUsers)

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await getUsers()
                setData(res)
            } catch (error) {
                console.error(error)
            }
        }

        const intervalId = setInterval(fetchData, interval)
        return () => clearInterval(intervalId)
    }, [interval])

    return data
}

export default function FactCheck({ initialRenderedUsers }) {
    const users = useUpdatedUsers(initialRenderedUsers)

    // If no users yet, render initial view
    if (users.length === 0) return (
        <DashboardLayout>
            <div className="md:w-full pt-32 pb-5 px-5 flex items-center justify-center">
                <div className="mx-auto w-full max-w-[1024px] lg:max-w-[1444px]">
                    <div>
                        <h3 className="p-2">No users yet.</h3>
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
                            Users List
                        </h2>
                        <div className="relative overflow-x-auto shadow-lg shadow-gray-300/50 sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">
                                            No.
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Tenure
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Organization
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Role
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Account
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Access
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {users.map((user, idx) => {
                                        if (user.isAdmin) {
                                            return null
                                        }
                                        return <UsersTable id={idx} user={user} key={user._id} />
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

// Pre-render server props
export async function getServerSideProps(context) {
    const session = await getSession(context)

    const initialRenderedUsers = await getUsers()

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    if (!session?.user?.isAdmin) {
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        }
    }

    return {
        props: {
            //session,
            initialRenderedUsers
        },
    }
}