
import React from 'react';

const Features = () => {
  const features = [
    {
      title: "Smart Spell Checking",
      description: "Advanced algorithms detect and correct spelling mistakes contextually, ensuring accuracy."
    },
    {
      title: "Sentence Structure",
      description: "Automatically improve sentence structure for better readability and clarity."
    },
    {
      title: "Multi-Format Support",
      description: "Import and export in various formats including plain text, Word, and PDF."
    },
    {
      title: "Interactive Editing",
      description: "Review suggestions, accept or modify corrections with an intuitive interface."
    },
    {
      title: "Preserve Formatting",
      description: "Keep your document's style, layout, and formatting intact throughout the process."
    },
    {
      title: "Real-Time Feedback",
      description: "Receive immediate visual feedback on corrections as you type or import."
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Everything You Need for Perfect Documents
          </h2>
          <p className="text-lg text-foreground/80">
            Our comprehensive set of tools helps you create flawless documents with proper structure and spelling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-12 h-12 mb-6 rounded-xl bg-primary/10 flex items-center justify-center">
                <div className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
