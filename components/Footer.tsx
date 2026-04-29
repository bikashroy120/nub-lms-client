import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="border-t border-border bg-card">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <p className="font-semibold">LearnHub</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Empowering learners worldwide with quality education.
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold">Company</p>
                        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold">Product</p>
                        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold">Legal</p>
                        <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-foreground">
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; 2024 LearnHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer