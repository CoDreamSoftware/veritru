import Link from 'next/link'
import { useState } from 'react'

import { BsFillCheckCircleFill } from 'react-icons/bs'
import { IoMdCloseCircle } from 'react-icons/io'
import { useToast } from '@chakra-ui/react'
import { grantAccess, revokeAccess } from '@/services/users'

export default function UsersTable({ id, user }) {
    const [loading, setLoading] = useState(false)

    const toaster = useToast()
    function toast (value) {
        toaster({
            title: value.title,
            description: value.msg,
            status: value.stats,
            duration: 3000,
            isClosable: true,
            position: 'top',
        })
    }

    async function handleGrant(userId) {
        setLoading(true)
        const res = await grantAccess(userId)
        if (res.success) {
            toast({
                title: 'Success!',
                msg: res.message,
                stats: 'success',
            })
            setLoading(false)
        } else {
            toast({
                title: 'Error!',
                msg: res.message,
                stats: 'error',
            })
            setLoading(false)
        }
    }

    async function handleRevoke(userId) {
        setLoading(true)
        const res = await revokeAccess(userId)
        if (res.success) {
            toast({
                title: 'Success!',
                msg: res.message,
                stats: 'success',
            })
            setLoading(false)
        } else {
            toast({
                title: 'Error!',
                msg: res.message,
                stats: 'error',
            })
            setLoading(false)
        }
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-2 font-medium text-gray-900">
                <div className="w-3">
                    {id}
                </div>
            </th>
            <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                <div className="w-[120px]">
                    <Link href={`/dashboard/users/${user._id}`} 
                        className="line-clamp-2 hover:text-cyan-500"
                    >
                        {user.name}
                    </Link>
                </div>
            </td>
            <td className="px-4 py-2">
                <div className="w-[120px]">
                    <p className="line-clamp-2">
                        {user.email}
                    </p>
                </div>
            </td>
            <td className="px-4 py-2">
                <div className="w-26">
                    {user.tenure}
                </div>
            </td>
            <td className="px-4 py-2">
                <div className="w-26">
                    {user.organization}
                </div>
            </td>
            <td className="px-4 py-2">
                <div className="w-26">
                    {user.role}
                </div>
            </td>
            <td className="px-4 py-2">
                <div className="w-18">
                    {user.isAdmin
                        ? "Admin"
                        : "User"
                    }
                </div>
            </td>
            <td className="px-4 py-2">
                <div className="w-18">
                    {user.isApproved
                        ? (
                            // Approved, revocable
                            <BsFillCheckCircleFill size="20" className="ml-3 text-green-500"/>
                        )
                        : (
                            // Not approved, can be granted, once granted will email registrant
                            <IoMdCloseCircle size="23" className="ml-2.5 text-red-500"/>
                        )
                    }
                </div>
            </td>
            <td className="px-4 py-2">
                <div className="w-20">
                    {user.isApproved
                        ? (
                            <button
                                onClick={() => handleRevoke(user._id)}
                                disabled={loading}
                                type="button" 
                                class="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-red-500 focus:z-10 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                { !loading ? (
                                    <p>Revoke</p>
                                ) : (
                                    <div className="text-center">
                                        <div role="status">
                                            <svg aria-hidden="true" className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </button>
                        )
                        : (
                            <button
                                onClick={() => handleGrant(user._id)}
                                disabled={loading}
                                type="button" 
                                class="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-red-500 focus:z-10 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                { !loading ? (
                                    <p>Grant</p>
                                ) : (
                                    <div className="text-center">
                                        <div role="status">
                                            <svg aria-hidden="true" className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </button>
                        )
                    }
                </div>
            </td>
        </tr>
    )
}