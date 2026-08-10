import Hero from '@/components/sections/Hero';
import EditorSection from '@/components/sections/EditorSection';
import LibraryShowcase from '@/components/sections/LibraryShowcase';
import Features from '@/components/sections/Features';
import ExportSection from '@/components/sections/ExportSection';
import Faq from '@/components/sections/Faq';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/sections/Footer';

const Index = () => (
  <main className="min-h-screen bg-background font-body">
    <Hero />
    <EditorSection />
    <LibraryShowcase />
    <Features />
    <ExportSection />
    <Faq />
    <CtaSection />
    <Footer />
  </main>
);

export default Index;