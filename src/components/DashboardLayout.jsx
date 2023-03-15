import Head from "next/head"
import Sidebar from "./Sidebar"

export default function DashboardLayout(props) {
    return (
        <>
            <Head>
                <title>Veritru - Dashboard</title>
                <meta name="author" content="Mark Christian Tan" />
                <meta name="description" content="VeriTru is a web application that uses blockchain technology to utilize its decentralization, security, and immutability of records to combat the spread of fake news by creating a platform that stores and retains all fact-checked news articles or contents." />
                <meta name="keywords" content="fact-check, fact-checking, fact-checker, fake news, web3, dapp, decentralized, decentralized application, blockchain, journalism, articles, news, contents" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/png/veritru-sq-white.png" />
            </Head>
            <div className="flex flex-row min-w-screen-xl">
                <header>
                    <Sidebar />
                </header>
                <main className="w-full p-2">
                    {props.children}
                </main>
            </div>
        </>
    )
}