import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <nav className="text-center mt-4">
            {links.map((link, index) => (
            <Link
            href={link.url || " "}
            className={`inline-block py-2 px-3 rounded-lg text-gray-200 text-xs ${link.active ? 'bg-gray-950' : ''} ${link.url ? 'text-gray-500 cursor-not-allwed' : ''}`}
            key={index} 
            dangerouslySetInnerHTML={{ __html: link.label }}
          >
          </Link>
            ))}
        </nav>
    );
}
