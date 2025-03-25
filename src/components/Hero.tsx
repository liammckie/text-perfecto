
import React from 'react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/30 to-background"></div>
        <div className="absolute top-0 left-1/3 w-2/3 h-2/3 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-1/2 h-1/2 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block animate-fade-in px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            The Document Perfection Tool
          </span>
          
          <h1 className="animate-fade-up text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Perfect Your Document's <br />
            <span className="text-gradient">Structure & Spelling</span>
          </h1>
          
          <p className="animate-fade-up animate-delay-1 text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
            Automatically correct sentence structure and fix spelling errors in your documents with our intelligent formatting tool.
          </p>
          
          <div className="animate-fade-up animate-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:shadow-primary/20">
              Try For Free
            </button>
            <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
