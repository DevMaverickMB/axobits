import React from 'react';
import { Twitter, Linkedin, Instagram, Github, Youtube, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AxobitsLogo from '../assets/Axobits W-B.svg';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark-bg border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-900/10 blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">

                    {/* Column 1: Brand */}
                    <div className="lg:col-span-2 flex flex-col items-start">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <img src={AxobitsLogo} alt="Axobits" className="h-8 md:h-11 w-auto" />
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
                            AXOBITS PRIVATE LIMITED builds and supports software products — from discovery to delivery, with reliability-first execution.
                        </p>

                        {/* Socials styled like buttons */}
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Portfolio */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Portfolio</h4>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li><Link to="/products/vera" className="hover:text-brand-400 transition-colors">Vera AI</Link></li>
                            <li><Link to="/products/charioteer" className="hover:text-brand-400 transition-colors">Charioteer</Link></li>
                            <li><Link to="/products/ledger" className="hover:text-brand-400 transition-colors">AI Ledger</Link></li>
                            <li><Link to="/products/blueprint" className="hover:text-brand-400 transition-colors">Blueprint AI</Link></li>
                            <li><Link to="/products" className="hover:text-brand-400 transition-colors">View portfolio</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Resources</h4>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li><Link to="/blog" className="hover:text-brand-400 transition-colors">Blog</Link></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors flex items-center gap-1">Documentation <ArrowUpRight className="w-3 h-3" /></a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors flex items-center gap-1">API Reference <ArrowUpRight className="w-3 h-3" /></a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Changelog</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors flex items-center gap-1">Status <ArrowUpRight className="w-3 h-3" /></a></li>
                        </ul>
                    </div>

                    {/* Column 4: Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-4 text-gray-500 text-sm">
                            <li><Link to="/about" className="hover:text-brand-400 transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-brand-400 transition-colors">Contact</Link></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-brand-400 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="py-10 border-y border-white/5 mb-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="text-white font-semibold text-lg mb-1">Stay up to date</h4>
                            <p className="text-gray-500 text-sm">Occasional updates from AXOBITS PRIVATE LIMITED.</p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 md:w-72 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-500 transition-colors"
                            />
                            <button className="px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-brand-300 transition-colors whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600 text-sm">
                    <p>&copy; 2025 AXOBITS PRIVATE LIMITED. All rights reserved.</p>
                    <p className="text-gray-500">AXOBITS</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
