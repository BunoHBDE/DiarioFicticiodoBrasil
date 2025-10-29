import React from 'react';
import NewspaperIcon from './icons/NewspaperIcon';
import { CATEGORIES } from '../constants';

const Header: React.FC = () => {
    const today = new Date();
    const dateString = today.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header className="border-b-4 border-ink p-4 sm:p-6 text-ink">
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-2">
                <span className="uppercase tracking-wider date-text">{dateString}</span>
            </div>
            <div className="text-center py-4">
                <h1 
                    id="main-page-title"
                    tabIndex={-1}
                    className="font-serif font-bold flex items-center justify-center gap-4 page-title readable-content"
                >
                    <NewspaperIcon className="w-10 h-10 hidden sm:block"/>
                    Diário Fictício do Brasil
                </h1>
                <p 
                    id="main-page-subtitle"
                    tabIndex={-1}
                    className="text-gray-600 mt-2 header-subtitle readable-content"
                >
                    O Jornal Gerado por Inteligência Artificial
                </p>
            </div>
            
            <div className="space-y-4 mt-4">
                <div className="bg-accent text-white py-2 overflow-hidden shadow-md">
                    <p className="whitespace-nowrap animate-marquee">
                        <span className="font-bold uppercase mx-4">Urgente:</span>
                        <span>Ladrões entraram no Museu do Louvre, e roubam mais de R$ 550 milhões em jóias.</span>
                    </p>
                </div>

                <nav className="w-full border-t-2 border-b-2 border-ink py-2">
                    <ul className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
                        {CATEGORIES.map((category) => (
                            <li key={category}>
                            <a
                                href="#"
                                className="block font-sans font-bold text-ink hover:text-accent uppercase tracking-wider transition-colors duration-200"
                                aria-label={`Ver notícias da categoria ${category}`}
                            >
                                {category}
                            </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;