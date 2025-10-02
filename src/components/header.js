'use client'
import { Menu } from "lucide-react";
import MMItems from "./header/mobile-menu-items";
import { Button } from "./ui/button";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";





const Header = () => {
    const links = {
        gamesForPlaying: "/game-library",
        gamesForPurchase: "https://athena-board-game-cafe.square.site/",
        menu: "/menu",
        reservations: "https://www.athenabgc.com/reservations",
        giftCards: "https://www.athenabgc.com/gift-cards",
        takeout: "https://athenabgc.getbento.com/",
        byob: "https://www.athenabgc.com/byob",
        instagram: "https://instagram.com/athenabgc",
        facebook: "https://facebook.com/athenabgc",
        events:"/events",
        aboutUs:""
    };
    
    const navitems = {
        games:{path:links.gamesForPlaying, label:'Games'},
        shop:{path:links.gamesForPurchase, label:'Shop'},
        menu:{path:links.menu, label:'Menu'},
        events:{path:links.events, label:'Events'},
        // aboutUs:{path:links.aboutUs, label:'About Us'}
    }

    const [menuOpen,setMenuOpen] = useState(false)
    const menuRef = useRef(null)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    // close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 z-20 
        px-0 md:px-7 lg:px-12 xl:px-16">

            <div className="mx-auto py-5 flex items-center  
            px-4 sm:px-6 lg:px-8">
                
                <Link className="w-10 h-10 
                bg-center bg-contain"
                href="/"
                style={{
                    backgroundImage:'url(/images/athena-icon.png)'
                }}
                >

                </Link>
                <Link href="/" className="text-xl font-display text-background ml-3">
                    ABGC
                    <div className="w-full h-[1px] bg-white"/>
                </Link>
                
                <nav className="hidden md:flex items-center gap-2 font-primary text-background ml-auto">
                    {Object.keys(navitems).map((item,dex) => {
                        const _item = navitems[item]
                        return(
                            <a key={dex} 
                            className="px-3 py-2 text-sm xl:text-base hover:underline underline-offset-4" href={_item.path}>
                                {_item.label}
                            </a>
                        )
                    })}
                    
                    {/* <Button className='ml-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-white shadow-[0_8px_20px_rgba(0,0,0,.18)] hover:bg-black'>
                        <a href={links.reservations}>
                            Reserve
                        </a>
                    </Button> */}
                </nav>
                
                <div 
                  className='md:hidden rounded-md bg-transparent font-medium text-white relative '
                  onClick={toggleMenu}
                  ref={menuRef}
                >
                    <Menu size={30} />
                    
                    <AnimatePresence >
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 flex flex-col w-[100px]">
                                {Object.keys(navitems).map((item,dex) => {
                                    const _item = navitems[item]
                                    return(
                                        <motion.a key={dex} 
                                        className="w-full px-3 py-1.5 text-sm xl:text-base hover:underline underline-offset-4
                                        my-1 rounded-sm bg-foreground/50 backdrop-blur-[3px]" 
                                        href={_item.path}
                                        
                                        initial={{opacity:0}}
                                        animate={{opacity:1}}
                                        exit={{opacity:0}}
                                        transition={{
                                            delay:.1+(.1*dex)
                                        }}
                                        >
                                            {_item.label}
                                        </motion.a>
                                    )
                                })}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
 
export default Header;
