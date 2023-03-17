import Link from 'next/link'
import { login } from '@/auth'
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
            router.push('/user')
        }
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
                                    Login account
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

                        <hr className="my-5" />
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={closeModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
