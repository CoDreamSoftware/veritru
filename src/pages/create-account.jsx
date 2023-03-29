import { Fragment, useRef, useState, useEffect } from 'react'
import { register } from '@/services/auth'

import { Tabs, TabList, Tab, TabPanels, TabPanel, useToast } from '@chakra-ui/react'
import { FiChevronDown, FiCheck } from 'react-icons/fi'
import { Listbox, Transition } from '@headlessui/react'
import Layout from '@/components/Layout'
import CustomToast from '@/components/CustomToast'

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
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [yrs, setYrs] = useState(yrsExp[0])
    const [org, setOrg] = useState(organization[0])
    const [role, setRole] = useState(category[0])

    const [error, setError] = useState({})
    const [showErrors, setShowErrors] = useState(false)

    const [isTabDisabled, setIsTabDisabled] = useState(true)
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

    function handleValidations() {
        let errors = {}
        let isValid = true
        // Check validations
        if (!lastname) {
            errors.lastname = 'Last name is required'
            isValid = false
        }
        if (!firstname) {
            errors.firstname = 'First name is required'
            isValid = false
        }
        if (!email) {
            errors.email = 'Email is required'
            isValid = false
        }
        if (!password) {
            errors.password = 'Password is required'
            isValid = false
        }
        if (password.length < 8) {
            errors.passwordLen = 'Password must be at least 8 characters'
            isValid = false
        }
        setIsTabDisabled(!isValid)
        return errors
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const res = await register({
            name: `${firstname} ${lastname}`,
            email: email,
            password: password,
            tenure: yrs.name.toString(),
            organization: org.name.toString(),
            role: role.name.toString(),
        })
        if (res.success) {
            toaster({
                duration: 4000,
                isClosable: true,
                render: () => (
                    <CustomToast
                        title= 'Registration Submitted'
                        description='Thanks for submitting your registration. Our team will get back to you soon. Always check your email.'
                        status='success'
                        centered
                    />
                )
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
        setFirstname('')
        setLastname('')
        setEmail('')
        setPassword('')
        setYrs(yrsExp[0])
        setOrg(organization[0])
        setRole(category[0])
    }

    useEffect(() => {
        handleValidations();
      }, [lastname, firstname, email, password])

    useEffect(() => {
        console.log(yrs, org, role)
        console.log(error)
    }, [yrs, org, role, error])

    return (
        <Layout>
            <div className="h-screen pt-32 flex items-center justify-center p-12">
                <div className="max-w-[700px] p-8 rounded-lg bg-gray-100 dark:bg-gray-50">
                    <Tabs variant='soft-rounded' colorScheme='cyan' isFitted>
                        <TabList>
                            <Tab>Account Info</Tab>
                            <Tab isDisabled={isTabDisabled} ref={tabRef}>Personal Info</Tab>
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
                                                Firstname
                                            </label>
                                            <input
                                                value={firstname}
                                                onChange={(e)=> setFirstname(e.target.value)}
                                                type="text"
                                                name="firstname"
                                                id="firstname"
                                                placeholder="Your firstname"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required
                                            />
                                            { !firstname && error.firstname && <p className="text-sm text-red-500">{error.firstname}</p> }
                                        </div>

                                        <div className="mb-5">
                                            <label
                                                htmlFor="name"
                                                className="mx-2 my-2 block font-normal font-display text-base text-gray-900 dark:text-white tracking-wide"
                                            >
                                                Lastname
                                            </label>
                                            <input
                                                value={lastname}
                                                onChange={(e)=> setLastname(e.target.value)}
                                                type="text"
                                                name="lastname"
                                                id="lastname"
                                                placeholder="Your lastname"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required
                                            />
                                            { !lastname && error.lastname && <p className="text-sm text-red-500">{error.lastname}</p> }
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
                                            { !email && error.email && <p className="text-sm text-red-500">{error.email}</p> }
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
                                            { !password && error.password && <p className="text-sm text-red-500">{error.password}</p> }
                                            { !password && error.passwordLen && <p className="text-sm text-red-500">{error.passwordLen}</p> }
                                        </div>
                                        
                                        <button 
                                            onClick={() => {
                                                const errors = handleValidations()
                                                setError(errors)
                                                if (errors) {
                                                    setShowErrors(true)
                                                }
                                                if (!isTabDisabled) {
                                                    handleTab()
                                                }
                                            }} 
                                            type="button" 
                                            className="w-full my-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-5 py-2.5 text-center text-sm font-medium font-display">
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