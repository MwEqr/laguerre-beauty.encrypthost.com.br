import { ShieldCheck, Star, Package } from 'lucide-react';

export default function FeatureSection() {
  return (
    <section id="experiencia" className="bg-premium-900 py-20 my-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Text Content */}
        <div className="text-white space-y-8 z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-12 bg-accent"></span>
            <span className="text-accent-light font-medium tracking-widest uppercase text-xs">
              A Experiência Laguerre
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight text-white">
            Elegância e <span className="italic font-light text-accent-light">Luxo</span> para sua Pele
          </h2>
          
          <p className="text-premium-200 text-lg font-light leading-relaxed">
            Cada detalhe é pensado para quem aprecia o poder da beleza e da sofisticação. Nossos produtos são 
            cuidadosamente desenvolvidos, unindo fórmulas veganas, durabilidade extrema e 
            o cuidado absoluto que você merece.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-premium-800 rounded-full">
                <Star className="text-accent-light" size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Qualidade Premium</h4>
                <p className="text-sm text-premium-400 font-light">Ingredientes selecionados e alta pigmentação aprovada por especialistas.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-premium-800 rounded-full">
                <Package className="text-accent-light" size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Envio Garantido</h4>
                <p className="text-sm text-premium-400 font-light">Sua encomenda chega com segurança e rapidez em todo o Brasil.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop" 
            alt="Beleza e Elegância" 
            className="w-full h-[500px] object-cover object-center shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-700 ease-out brightness-90"
          />
          <div className="absolute -bottom-8 -left-8 bg-white p-6 md:p-8 shadow-2xl text-premium-900 hidden sm:block max-w-[200px] border-t-4 border-accent">
            <ShieldCheck className="text-accent mb-3" size={32} strokeWidth={1.5} />
            <p className="text-2xl font-serif font-semibold mb-1">100%</p>
            <p className="text-xs font-bold text-premium-500 uppercase tracking-widest">Compra Segura e Garantida</p>
          </div>
        </div>

      </div>
    </section>
  );
}