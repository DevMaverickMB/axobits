import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { Link, useLocation } from 'react-router-dom';

import AxobitsLogo from '../assets/Axobits W-B.svg';
import { HoverBorderGradient } from './ui/hover-border-gradient';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const { openModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const products = [
    { name: 'Vera AI', description: 'Natural-language data workflows', href: '/products/vera' },
    { name: 'Charioteer', description: 'No-code onboarding and tours', href: '/products/charioteer' },
    { name: 'AI Ledger', description: 'AI spend visibility and control', href: '/products/ledger' },
    { name: 'Blueprint AI', description: 'Living documentation at scale', href: '/products/blueprint' },
  ];

  // scrollTo is kept for future in-page navigation.

  return (
    <>
      <nav
        className={`fixed w-full z-50 top-0 transition-all duration-500 ${isScrolled
          ? 'bg-dark-bg/80 backdrop-blur-xl border-b border-white/5 py-4'
          : 'py-6'
          }`}
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group z-50">
            <img src={AxobitsLogo} alt="Axobits" className="h-8 md:h-9 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-400">
            {/* Products Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 hover:text-white transition-colors py-2"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                Portfolio
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${isProductsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <div className="w-72 p-3 rounded-2xl bg-dark-card/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">
                  {products.map((product) => (
                    <Link
                      key={product.name}
                      to={product.href}
                      className="flex flex-col p-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <span className="text-white font-medium">{product.name}</span>
                      <span className="text-gray-500 text-xs">{product.description}</span>
                    </Link>
                  ))}
                  <div className="mt-2 pt-2 border-t border-white/5">
                    <Link
                      to="/products"
                      className="flex items-center justify-center gap-2 p-3 rounded-xl text-brand-400 hover:bg-brand-500/10 transition-colors text-sm font-medium"
                    >
                      View the portfolio
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>

            <HoverBorderGradient
              containerClassName="rounded-full ml-4"
              as="button"
              onClick={openModal}
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 font-bold tracking-tight px-6 py-2.5"
            >
              <span>Talk to our team</span>
            </HoverBorderGradient>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white z-50 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-dark-bg/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
          <div className="space-y-2 mb-4">
            <p className="text-gray-500 text-sm uppercase tracking-widest">Portfolio</p>
            {products.map((product) => (
              <Link
                key={product.name}
                to={product.href}
                className="block text-xl text-gray-300 hover:text-white transition-colors py-2"
              >
                {product.name}
              </Link>
            ))}
          </div>

          <div className="h-px w-20 bg-white/10 my-4"></div>

          <Link to="/blog" className="text-2xl text-gray-300 hover:text-white transition-colors py-2">
            Blog
          </Link>
          <Link to="/about" className="text-2xl text-gray-300 hover:text-white transition-colors py-2">
            About
          </Link>
          <Link to="/contact" className="text-2xl text-gray-300 hover:text-white transition-colors py-2">
            Contact
          </Link>

          <button
            onClick={() => {
              openModal();
              setIsMobileMenuOpen(false);
            }}
            className="mt-8 bg-white text-black py-4 px-10 rounded-full font-bold text-lg hover:bg-brand-300 transition-colors"
          >
            Talk to our team
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
