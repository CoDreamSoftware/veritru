import Link from 'next/link'
import { login } from '@/services/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    useToast,
} from '@chakra-ui/react'

export default function LoginModal({ isOpen, closeModal }) {
    const [formData, setFormData] = useState({ email: '', password: ''})
    const [error, setError] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const toaster = useToast()
    const toast = (value) => {
        toaster({
            title: value.title,
            description: value.msg,
            status: value.stats,
            duration: 3000,
            isClosable: true,
            position: 'top',
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (!formData.email) {
            setError({ ...error, email: "Email is required"})
            return
        }
        if (!formData.password) {
            setError({ ...error, password: "Password is required"})
            return
        }

        setLoading(true)
        const res = await login(formData)
        if (res.error) {
            toast({
                title: 'Error!',
                msg: res.error,
                stats: 'error',
            })
        } else {
            toast({
                title: 'Success!',
                msg: res.message,
                stats: 'success',
            })
            router.push('/dashboard/factcheck')
        }
        setLoading(false)
    }

    return (
        <>
            <Modal onClose={closeModal} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign in to continue</ModalHeader>

                    <ModalCloseButton />
                    <hr />

                    <ModalBody>
                        <div className="px-6 py-6 lg:px-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="name@company.com"
                                    />
                                    { error.email && <p className="text-sm text-red-500">{error.email}</p> }
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    />
                                    { error.password && <p className="text-sm text-red-500">{error.password}</p> }
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-5 py-2.5 text-center text-sm font-medium font-display"
                                >
                                    { !loading ? (
                                        <p>Login Account</p>
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
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Or register as a reviewer.&nbsp;
                                    <Link
                                        href="/create-account"
                                        className="text-blue-700 hover:underline dark:text-blue-500"
                                    >
                                        Create account
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={closeModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
