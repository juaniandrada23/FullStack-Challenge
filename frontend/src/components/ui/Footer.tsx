import { FaGithub } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="bg-neutral-950 mt-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-accent-600/50 to-transparent" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between py-5 gap-3">
                    <p className="text-xs text-neutral-600">
                        FullStack Challenge &mdash; Order Management System
                    </p>
                    <a
                        href="https://github.com/juaniandrada23"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors duration-200 group"
                    >
                        <FaGithub className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        <span className="text-sm font-medium">juaniandrada23</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};
