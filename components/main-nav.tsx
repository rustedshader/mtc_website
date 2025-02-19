"use client"

import Link from "next/link"

export function MainNav() {
    return (
        <div className="mr-4 hidden md:flex">
            <nav className="flex items-center gap-4 text-sm xl:gap-6">
            <Link href="/">
                    Home
                </Link>
                <Link href="/team">
                    Our Team
                </Link>
                <Link href="/gallery">
                Memories
                </Link>
                <Link href="/contact">
                    Contact Us
                </Link>
            </nav>
        </div>
    )
}