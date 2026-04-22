import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  return (
    <main className="flex-grow bg-premium-50 pb-16">
      <Hero />
      
      <section id="promocoes" className="pt-16 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif text-premium-900 mb-4 uppercase tracking-widest">Promoções</h2>
          <div className="h-0.5 w-12 bg-accent mx-auto mb-6"></div>
        </div>
        <ProductGrid onlyPromos={true} />
      </section>

      <FeatureSection />
      
      <section id="todos-produtos" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif text-premium-900 mb-4 uppercase tracking-widest">Todos os Produtos</h2>
          <div className="h-0.5 w-12 bg-accent mx-auto mb-6"></div>
        </div>
        <ProductGrid />
      </section>
    </main>
  );
}
