/* eslint-disable @next/next/no-img-element */
import HeroLayout from "@/components/Layout"
import Image from "next/image"

export default function Home() {

    return (
        <HeroLayout>
            <div className="w-full h-[40rem] md:h-[45rem] bg-gradient-to-br from-red-200 to-cyan-200">
                <div className="container py-32">
                    <div className="flex flex-col max-w-[20rem] lg:max-w-[45rem] md:py-16 mx-auto items-center">
                        <h1 className="sm:text-3xl text-2xl mb-4 font-bold text-gray-900">
                            VERIFY THE TRUTH
                        </h1>
                        <p className="mb-8 leading-relaxed text-center">
                            A Web3 fact-Checking Application using Voting-Based Consensus Algorithm in 
                            blockchain technology to utilize its decentralization, security, and 
                            immutability of records and to combat the spread of fake news by creating 
                            a platform that stores and retains all fact-checked news articles or 
                            contents.
                        </p>
                        <button
                            type="button" 
                            className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-5 py-2.5 text-sm font-medium font-display"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
                <Image src="/assets/diamond.svg" width="300" height="300" alt="Ethereum" 
                    className="absolute w-[90px] top-[35rem] right-[40%] md:w-[90px] md:top-[35rem] md:right-[8rem] lg:w-[90px] lg:top-[35rem] lg:right-[18rem]" />
                
                <Image src="/assets/block.svg" width="300" height="300" alt="Ethereum" 
                    className="absolute w-[90px] top-[35rem] -left-[10rem] md:w-[90px] md:top-[35rem] md:left-[10rem] lg:w-[90px] lg:top-[35rem] lg:left-[18rem]" />

                <Image src="/assets/liquid-blob.svg" width="300" height="300" alt="Ethereum" 
                    className="absolute w-[90px] top-[25rem] right-0 md:w-[240px] md:top-[2rem] md:right-[2rem]" />
                
                <Image src="/assets/liquid-blob2.svg" width="300" height="300" alt="Ethereum" 
                    className="absolute w-[180px] top-[5rem] -left-[7rem] sm:-left-[5rem] md:w-[320px] md:top-[2rem] md:-left-[8rem]" />

                <Image src="/assets/swirl.svg" width="50" height="50" alt="Ethereum" 
                    className="absolute w-[50px] top-[27rem] left-[2rem] sm:-left-[5rem] md:w-[50px] md:top-[25rem] md:left-[5rem] lg:w-[80px] lg:top-[10rem] lg:left-[18rem]" />

                <Image src="/assets/swirl.svg" width="50" height="50" alt="Ethereum" 
                    className="absolute w-[50px] top-[10rem] right-[0.5rem] sm:-right-[5rem] md:w-[60px] md:top-[25rem] md:right-[5rem] lg:w-[100px] lg:top-[25rem] lg:right-[15rem]" />
            </div>
        </HeroLayout>
    )
}