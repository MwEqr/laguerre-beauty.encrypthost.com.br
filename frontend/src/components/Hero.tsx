import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-premium-900 min-h-[75vh] flex items-center overflow-hidden">
      {/* Background Image placed beautifully */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=2080&auto=format&fit=crop"
          alt="Laguerre Beauty - Cosméticos"
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
      </div>

      {/* Content Aligned to Left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl text-left">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-accent"></span>
            <span className="text-accent-light font-medium tracking-widest uppercase text-xs md:text-sm">
              Nova Coleção 2026
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight">
            A Beleza que <br />
            <span className="italic font-light text-accent-light">Empodera</span>
          </h1>
          
          <p className="text-lg text-premium-200 mb-10 font-light leading-relaxed max-w-lg">
            Descubra nossa coleção premium de cosméticos. Fórmulas exclusivas, cores intensas e luxo absoluto para realçar sua essência.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/colecao" className="bg-accent text-white px-8 py-4 hover:bg-accent-dark transition-colors font-medium tracking-wide text-sm shadow-lg shadow-accent/20 text-center">
              Explorar Produtos
            </Link>
            <Link to="/promocoes" className="bg-transparent text-white px-8 py-4 border border-premium-200 hover:border-accent hover:text-accent transition-all font-medium tracking-wide text-sm backdrop-blur-sm text-center">
              Ver Ofertas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}