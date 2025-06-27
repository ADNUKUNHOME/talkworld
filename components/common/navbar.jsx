import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
    return (
        <nav className="bg-gray-900 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <div className="text-white text-lg font-bold">
                        TALKWORLD
                    </div>
                </Link>

                <div className="hidden md:flex space-x-4 text-white items-center">
                    <Link href="/">
                        Home
                    </Link>
                    <Link href="/about">
                        About
                    </Link>
                    <Link href="/contact">
                        Contact
                    </Link>
                    <div>
                        <Button className="mx-1" variant="outline">Signup</Button>
                        <Button className="mx-1" variant="outline">Login</Button>
                    </div>
                </div>
                <div className="md:hidden">
                    <button className="text-white focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            hmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;