import React from 'react';
import { Link } from 'react-router-dom';

const NavCguCgv = () => {
    return (
        <nav className="border-b border-gray-200">
            <ul className="flex space-x-4">
                <li>
                    <Link
                        to="/cgu"
                        className="inline-block py-2 px-4 text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300"
                    >
                        CGU
                    </Link>
                </li>
                <li>
                    <Link
                        to="/cgv"
                        className="inline-block py-2 px-4 text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300"
                    >
                        CGV
                    </Link>
                </li>
                <li>
                    <Link
                        to="/"
                        className="inline-block py-2 px-4 text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300"
                    >
                        &#x2B05; Retour
                    </Link>
                 </li>
            </ul>
        </nav>
    );
};

export default NavCguCgv;
