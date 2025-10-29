
import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="border-t-2 border-gray-300 mt-8 p-4 text-center text-gray-500 text-xs">
            <p>&copy; {currentYear} Diário Fictício do Brasil. Todos os direitos reservados.</p>
            <p className="mt-1">Este conteúdo é gerado por IA e é inteiramente fictício. Qualquer semelhança com eventos ou pessoas reais é mera coincidência.</p>
        </footer>
    );
};

export default Footer;
