import Link from "next/link";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "../theme-btn";

const Navbar = () => {
    return (
        <nav className="p-4 bg-background/50 sticky top-0 backdrop-blur border-b">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    <div className="text-lg font-bold">
                        TALKWORLD
                    </div>
                </Link>

                <div className="hidden md:flex space-x-4 items-center">
                    <Link href="/" className="hover:font-semibold hover:scale-105 transition-transform duration-300">
                        Home
                    </Link>
                    <Link href="/blog" className="hover:font-semibold hover:scale-105 transition-transform duration-300">
                        blog
                    </Link>
                    <Link href="/about" className="hover:font-semibold hover:scale-105 transition-transform duration-300">
                        About
                    </Link>
                    <Link href="/contact" className="hover:font-semibold hover:scale-105 transition-transform duration-300">
                        Contact
                    </Link>
                    <div>
                        <Button className="mx-1 text-black dark:text-white" variant="outline">Login</Button>
                        <Button className="mx-1 text-black dark:text-white" variant="outline">Signup</Button>
                    </div>
                    <ModeToggle />
                </div>
                <div className="md:hidden">
                    <span className="mr-4">
                        <ModeToggle />
                    </span>
                    <Sheet>
                        <SheetTrigger>
                            <span className="text-white focus:outline-none">
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
                            </span>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle className="font-bold my-4">Talkworld</SheetTitle>
                                <SheetDescription>
                                    <div className="flex flex-col gap-6">
                                        <Link href="/">
                                            Home
                                        </Link>
                                        <Link href="/blog">
                                            blog
                                        </Link>
                                        <Link href="/about">
                                            About
                                        </Link>
                                        <Link href="/contact">
                                            Contact
                                        </Link>
                                        <div>
                                            <Button className="mx-1 text-xs" variant="outline">Signup</Button>
                                            <Button className="mx-1 text-xs" variant="outline">Login</Button>
                                        </div>
                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav >
    )
}

export default Navbar;