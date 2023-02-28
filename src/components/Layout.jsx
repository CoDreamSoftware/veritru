import NavbarMenu from "./NavbarMenu"

function Layout(props) {
    return (
        <>
            <header>
                <NavbarMenu />
            </header>
            <main>
                <div className="mx-10 md:mx-20 max-w-screen-xl py-20 sm:px-6 lg:px-8">
                    {props.children}
                </div>
            </main>
        </>
    )
}

export default Layout