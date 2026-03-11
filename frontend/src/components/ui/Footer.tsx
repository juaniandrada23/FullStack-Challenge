import { FaGithub } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center py-6 border-t border-neutral-800">
                    <a
                        href="https://github.com/juaniandrada23"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white"
                    >
                        <FaGithub className="w-5 h-5" />
                        <span className="text-sm font-medium">juaniandrada23</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};
