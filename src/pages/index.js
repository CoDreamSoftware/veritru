import Head from 'next/head'
import Image from 'next/image'
import { Navbar } from 'flowbite-react'

import logo from "../../public/SVG/veritru-sq-white.svg"

export default function Home() {

    return (
        <>
            <Head>
                <title>Veritru - A Fact-Checking Web3 Application</title>
                <meta name="author" content="Mark Christian Tan" />
                <meta name="description" content="VeriTru is a web application that uses blockchain technology to utilize its decentralization, security, and immutability of records to combat the spread of fake news by creating a platform that stores and retains all fact-checked news articles or contents." />
                <meta name="keywords" content="fact-check, fact-checking, fact-checker, fake news, web3, dapp, decentralized, decentralized application, blockchain, journalism, articles, news, contents" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/SVG/veritru-sq-white.svg" />
            </Head>
            <main>
                <Navbar fluid={true} rounded={true}>
                    <Navbar.Brand>
                        <Image src={logo} className="w-12 h-12 sm:w-16 sm:h-16" alt="VeriTru Logo" priority />
                        <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white font-display ml-2">veritru</span>
                    </Navbar.Brand>

                    <div className="flex justify-between">
                        <Navbar.Collapse className="self-center mr-5">
                            <Navbar.Link href="#">
                                Home
                            </Navbar.Link>

                            <Navbar.Link href="#">
                                Guides
                            </Navbar.Link>

                            <Navbar.Link href="#">
                                Whitepaper
                            </Navbar.Link>

                            <Navbar.Link href="#">
                                Contact
                            </Navbar.Link>
                        </Navbar.Collapse>

                        <div className="flex md:order-2">
                            <button type="button" className="font-display font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center">Get Started</button>
                            <Navbar.Toggle />
                        </div>
                    </div>
                </Navbar>

            </main> 
        </>
    )
}
