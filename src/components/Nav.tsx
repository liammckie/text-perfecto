
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled 
          ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm py-4" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span className="text-primary font-bold text-2xl">Text</span>
          <span className="font-bold text-2xl">Perfecto</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-foreground/80 hover:text-primary transition-colors">How It Works</a>
          <a href="#editor" className="text-foreground/80 hover:text-primary transition-colors">Try It</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="hidden md:inline-flex px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
            Sign In
          </button>
          <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Nav;
