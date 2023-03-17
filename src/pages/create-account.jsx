import { Fragment, useRef, useState, useEffect } from 'react'
import { register } from '@/auth'

import { Tabs, TabList, Tab, TabPanels, TabPanel, useToast } from '@chakra-ui/react'
import { FiChevronDown, FiCheck } from 'react-icons/fi'
import { Listbox, Transition } from '@headlessui/react'
import Layout from '@/components/Layout'

const yrsExp = [
    { name: '0-5 years', value: 1 },
    { name: '5-10 years', value: 2 },
    { name: '10+ years', value: 3 }
]

const organization = [
    { name: 'Freelancer', value: 1 },
    { name: 'Regional', value: 2 },
    { name: 'Local', value: 3 },
    { name: 'National', value: 4 }
]

const category = [
    { name: 'Independent', value: 1 },
    { name: 'Journalist', value: 2 }
]

export default function CreateAccount() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [yrs, setYrs] = useState(yrsExp[0])
    const [org, setOrg] = useState(organization[0])
    const [role, setRole] = useState(category[0])

    const [error, setError] = useState({ email: '', password: '', username: '' })

    const tabRef = useRef()

    function handleTab() {
        tabRef.current.focus()
    }

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

    async function handleSubmit(event) {
        event.preventDefault()
        if (!email) {
            setError({ ...error, email: "Email is required" })
            return
        }
        if (!password) {
            setError({ ...error, password: "Password is required" })
            return
        }
        if (!username) {
            setError({ ...error, username: "Username is required" })
            return
        }

        const res = await register({
            username: username,
            email: email,
            password: password,
            tenure: yrs.name.toString(),
            organization: org.name.toString(),
            role: role.name.toString(),
        })
        if (res.success) {
            toast({
                title: 'Success!',
                msg: res.message,
                stats: 'success',
            })
            resetForm()
        } else {
            toast({
                title: 'Error!',
                msg: res.message,
                stats: 'error',
            })
        }
    }

    function resetForm () {
        setUsername('')
        setEmail('')
        setPassword('')
        setYrs(yrsExp[0])
        setOrg(organization[0])
        setRole(category[0])
    }

    useEffect(() => {
        console.log(yrs, org, role)
    }, [yrs, org, role])

    return (
        <Layout>
            <div className="pt-32 flex items-center justify-center p-12">
                <div className="max-w-[700px] p-8 rounded-lg bg-gray-100 dark:bg-gray-50">
                    <Tabs variant='soft-rounded' colorScheme='cyan' isFitted>
                        <TabList>
                            <Tab>Account Info</Tab>
                            <Tab ref={tabRef}>Personal Info</Tab>
                        </TabList>
                        <form onSubmit={handleSubmit}>
                            <TabPanels>
                                <TabPanel>
                                    <div className="mx-auto mt-5 w-full">
                                        <h2 className="font-display font-semibold text-lg text-center mb-10 mx-2 text-gray-900 dark:text-white">
                                            Register as a reviewer
                                        </h2>

                                        <div className="mb-5">
                                            <label
                                                htmlFor="name"
                                                className="mx-2 my-2 block font-normal font-display text-base text-gray-900 dark:text-white tracking-wide"
                                            >
                                                Username
                                            </label>
                                            <input
                                                value={username}
                                                onChange={(e)=> setUsername(e.target.value)}
                                                type="text"
                                                name="username"
                                                id="username"
                                                placeholder="Your username"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label
                                                htmlFor="name"
                                                className="mx-2 my-2 block font-normal font-display text-base text-gray-900 dark:text-white tracking-wide"
                                            >
                                                Email
                                            </label>
                                            <input
                                                value={email}
                                                onChange={(e)=> setEmail(e.target.value)}
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="name@email.com"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required
                                            />
                                        </div>

                                        <div className="mb-5">
                                            <label
                                                htmlFor="subject"
                                                className="mx-2 my-2 block font-normal font-display text-base text-gray-900 dark:text-white tracking-wide"
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
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required
                                            />
                                        </div>
                                        
                                        <button onClick={handleTab} type="button" className="w-full my-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-5 py-2.5 text-center text-sm font-medium font-display">
                                            Continue
                                        </button>

                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                            By continuing you agree to our &nbsp;
                                            <span className="text-blue-700 hover:underline dark:text-blue-500">
                                                Terms of Use
                                            </span>
                                        </div>
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <div className="mx-auto mt-5 w-full">
                                        <h2 className="font-display font-semibold text-lg text-center mb-10 mx-2 text-gray-900 dark:text-white">
                                            Register as a reviewer
                                        </h2>
                                        <div className="mb-5">
                                            <label
                                                htmlFor="name"
                                                className="mx-2 my-2 block font-normal font-display text-base text-gray-900 dark:text-white tracking-wide"
                                            >
                                                Years of Experience
                                            </label>
                                            <Listbox value={yrs} onChange={setYrs}>
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full cursor-default text-left bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 focus:ring-1 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                        <span className="block truncate">{yrs.name}</span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <FiChevronDown
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {yrsExp.map((yrs, yrsIdx) => (
                                                            <Listbox.Option
                                                                value={yrs}
                                                                key={yrsIdx}
                                                                className={({ active }) =>
                                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                    active ? 'bg-cyan-100' : 'text-gray-900'
                                                                    }`
                                                                }
                                                            >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${
                                                                        selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                    >
                                                                        {yrs.name}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600">
                                                                            <FiCheck className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                            </Listbox.Option>
                                                        ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>

                                        <div className="mb-5">
                                            <label
                                                htmlFor="name"
                                                className="mx-2 my-2 block font-normal font-display text-base text-gray-900 dark:text-white tracking-wide"
                                            >
                                                Type of Organization
                                            </label>
                                            <Listbox value={org} onChange={setOrg}>
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full cursor-default text-left bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 focus:ring-1 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                        <span className="block truncate">{org.name}</span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <FiChevronDown
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {organization.map((org, orgIdx) => (
                                                            <Listbox.Option
                                                                value={org}
                                                                key={orgIdx}
                                                                className={({ active }) =>
                                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                    active ? 'bg-cyan-100' : 'text-gray-900'
                                                                    }`
                                                                }
                                                            >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${
                                                                        selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                    >
                                                                        {org.name}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600">
                                                                            <FiCheck className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                            </Listbox.Option>
                                                        ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>

                                        <div className="mb-5">
                                            <label
                                                htmlFor="name"
                                                className="mx-2 my-2 block font-normal font-display text-base text-gray-900 dark:text-white tracking-wide"
                                            >
                                                Role / Category
                                            </label>
                                            <Listbox value={role} onChange={setRole}>
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full cursor-default text-left bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 focus:ring-1 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                                                        <span className="block truncate">{role.name}</span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <FiChevronDown
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {category.map((role, roleIdx) => (
                                                            <Listbox.Option
                                                                value={role}
                                                                key={roleIdx}
                                                                className={({ active }) =>
                                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                    active ? 'bg-cyan-100' : 'text-gray-900'
                                                                    }`
                                                                }
                                                            >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${
                                                                        selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                    >
                                                                        {role.name}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600">
                                                                            <FiCheck className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                            </Listbox.Option>
                                                        ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                        </div>
                                        
                                        <button type="submit" className="w-full my-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-5 py-2.5 text-center text-sm font-medium font-display">
                                            Register Account
                                        </button>
                                        
                                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                            By continuing you agree to our &nbsp;
                                            <span className="text-blue-700 hover:underline dark:text-blue-500">
                                                Terms of Use
                                            </span>
                                        </div>
                                    </div>
                                </TabPanel>
                            </TabPanels>
                        </form>
                    </Tabs>
                </div>
            </div>
        </Layout>
    )
}