import Link from 'next/link'
import { signIn } from 'next-auth/react'
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
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

    async function handleLogin(event) {
        event.preventDefault()

        try {
            await signIn('credentials', {
                redirect: '/user',
                email: email,
                password: password,
            })
            toast({
                title: 'Success!',
                msg: 'You have successfully logged in',
                stats: 'success',
            })
            router.push('/user')
        } catch (error) {
            toast({
                title: 'Error!',
                msg: 'Invalid credentials!',
                stats: 'error',
            })
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
                            <form className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        value={email}
                                        onChange={(e)=> setEmail(e.target.value)}
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        placeholder="name@company.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        value={password}
                                        onChange={(e)=> setPassword(e.target.value)}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required
                                    />
                                </div>
                                <button
                                    onClick={handleLogin}
                                    type="button"
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
