import React from 'react';
import '../globals.css';

function AboutPage() {
  return (
    <div className="space-y-4 p-6">
      <div className="bg-primary text-white p-4 rounded">Primary</div>
      <div className="bg-secondary text-white p-4 rounded">Secondary</div>
      <div className="bg-accent text-black p-4 rounded">Accent</div>
      <div className="bg-background text-black p-4 rounded">Background</div>
    </div>
  );
}

export default AboutPage;
