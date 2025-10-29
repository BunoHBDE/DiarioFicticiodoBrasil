
import React from 'react';
import { CATEGORIES } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-full">
      <div className="bg-accent text-white py-2 overflow-hidden mb-6 shadow-md">
          <p className="whitespace-nowrap animate-marquee">
              <span className="font-bold uppercase mx-4">Urgente:</span>
              <span>Ladrões entraram no Museu do Louvre, e roubam mais de R$ 550 milhões em jóias.</span>
          </p>
      </div>

      <div className="p-4 bg-gray-50 border border-gray-200">
        <h3 className="font-serif text-2xl font-bold text-ink mb-4 border-b-2 border-accent pb-2">
            Categorias
        </h3>
        <nav>
            <ul className="space-y-2">
            {CATEGORIES.map((category) => (
                <li key={category}>
                <a
                    href="#"
                    className="block font-sans font-bold text-gray-700 hover:text-accent hover:pl-2 transition-all duration-200 ease-in-out"
                    aria-label={`Ver notícias da categoria ${category}`}
                >
                    {category}
                </a>
                </li>
            ))}
            </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
