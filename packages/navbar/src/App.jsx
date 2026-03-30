import React from 'react';
import './global.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavMenu } from './hooks/useNavMenu';

const Navbar = () => {
    const { open, toggle, close } = useNavMenu();

    const links = [
        { label: 'Home', href: '/' },
        { label: 'Settings', href: '/settings' },
    ];

    return (
        <nav className="bg-gray-900 shadow-md">
            <div className="flex justify-between items-center px-4 md:px-8 py-3">
                {/* Logo */}
                <span className="text-white font-bold text-xl tracking-wide">Home</span>

                {/* Desktop links */}
                <div className="hidden md:flex items-center space-x-6">
                    {links.map(l => (
                        <a key={l.href} href={l.href}
                            className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-150">
                            {l.label}
                        </a>
                    ))}
                </div>

                {/* Desktop user */}
                <div className="hidden md:flex items-center space-x-2">
                    <span className="text-gray-300 text-sm">User</span>
                    <AccountCircleIcon className="text-white" style={{ fontSize: 32 }} />
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggle}
                    aria-label="Toggle menu"
                >
                    {open ? <CloseIcon style={{ fontSize: 28 }} /> : <MenuIcon style={{ fontSize: 28 }} />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden bg-gray-800 px-4 pb-4 flex flex-col space-y-3">
                    {links.map(l => (
                        <a key={l.href} href={l.href}
                            className="text-gray-300 hover:text-white text-sm font-medium py-1 transition-colors duration-150"
                            onClick={close}>
                            {l.label}
                        </a>
                    ))}
                    <div className="flex items-center space-x-2 pt-2 border-t border-gray-700">
                        <span className="text-gray-300 text-sm">User</span>
                        <AccountCircleIcon className="text-white" style={{ fontSize: 28 }} />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
