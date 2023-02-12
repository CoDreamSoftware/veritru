import Image from 'next/image'

import logo from "../../public/SVG/veritru-sq-white.svg"

function NavbarMenu() {

    return (
        <>
            <button onClick={()=>setShowModal(true)} type="button" className="font-display font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-3 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center">Get Started</button>
            <div>
                <Image src={logo} className="w-12 h-12 sm:w-16 sm:h-16" alt="VeriTru Logo" priority />
                    <span className="self-center whitespace-nowrap text-xl font-bold dark:text-white font-display ml-2">veritru</span>
            </div>
        </>
    )
}

export default NavbarMenu