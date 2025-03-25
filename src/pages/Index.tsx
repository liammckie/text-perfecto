
import React from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Editor from '@/components/Editor';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Editor />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
