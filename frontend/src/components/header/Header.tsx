import React, { useEffect } from 'react';
import './Header.css';

export function Header() {
    useEffect(() => {
        const hamburgerMenu = document.querySelector("#hamburger-menu") as HTMLElement | null;
        const overlay = document.querySelector("#overlay") as HTMLElement | null;
        const nav1 = document.querySelector("#nav-1") as HTMLElement | null;
        const nav2 = document.querySelector("#nav-2") as HTMLElement | null;
        const nav3 = document.querySelector("#nav-3") as HTMLElement | null;
        const navItems = [nav1, nav2, nav3];

        function navAnimation(val1: string, val2: string) {
            navItems.forEach((nav, i) => {
                nav?.classList.replace(`slide-${val1}-${i + 1}`, `slide-${val2}-${i + 1}`);
            });
        }

        function toggleNav() {
            if (hamburgerMenu) {
                hamburgerMenu.classList.toggle("active");
            }

            if (overlay) {
                overlay.classList.toggle("overlay-active");

                if (overlay.classList.contains("overlay-active")) {
                    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
                    navAnimation("out", "in");
                } else {
                    overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
                    navAnimation("in", "out");
                }
            }
        }

        hamburgerMenu?.addEventListener("click", toggleNav);
        navItems.forEach((nav) => {
            nav?.addEventListener("click", toggleNav);
        });

        return () => {
            hamburgerMenu?.removeEventListener("click", toggleNav);
            navItems.forEach((nav) => {
                nav?.removeEventListener("click", toggleNav);
            });
        };
    }, []);

    return (
        <>
            <div className="overlay overlay-slide-left" id="overlay">
                <nav>
                    <ul>
                        <li id="nav-1" className="slide-out-1 center">
                            <a href="#home" className="center">Home</a>
                        </li>
                        <li id="nav-2" className="slide-out-2 center">
                            <a href="#about" className="center">Select</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="hamburger-menu" id="hamburger-menu">
                <div className="menu-bar1"></div>
                <div className="menu-bar2"></div>
                <div className="menu-bar3"></div>
            </div>
        </>
    );
}

export default Header;
