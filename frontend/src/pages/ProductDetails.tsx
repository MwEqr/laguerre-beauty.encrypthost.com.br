import { Star, Truck, ShieldCheck, RefreshCw, Plus, Minus } from 'lucide-react';

export default function ProductDetails() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=800&auto=format&fit=crop&q=80" 
              alt="Batom Matte" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 border hover:border-primary cursor-pointer">
                <img src={`https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=200&auto=format&fit=crop&q=60`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <span className="text-primary font-bold text-sm tracking-widest uppercase">Maquiagem</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">BATOM MATTE RED PASSION</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-primary text-primary" />)}
            </div>
            <span className="text-gray-400 text-sm">(48 avaliações)</span>
          </div>

          <p className="text-3xl font-bold text-secondary mb-8">R$ 89,90</p>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            O Batom Matte Red Passion da Laguerre Beauty oferece uma cobertura impecável, alta pigmentação e conforto extremo. Sua fórmula exclusiva enriquecida com manteiga de karité garante lábios hidratados por até 12 horas.
          </p>

          <div className="space-y-6 mb-10 pb-10 border-b">
            <div>
              <span className="block text-sm font-bold mb-3 uppercase tracking-wider">Cor: Intenso Vermelho</span>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D32F2F] ring-2 ring-offset-2 ring-primary cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-[#8B0000] cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-[#FF4500] cursor-pointer"></div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center border">
                <button className="p-3 hover:bg-gray-100 transition"><Minus size={18} /></button>
                <span className="px-6 font-bold">1</span>
                <button className="p-3 hover:bg-gray-100 transition"><Plus size={18} /></button>
              </div>
              <button className="flex-grow bg-secondary hover:bg-black text-white py-4 font-bold transition">
                ADICIONAR AO CARRINHO
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 text-sm">
              <Truck size={20} className="text-primary" />
              <div>
                <p className="font-bold">Frete Grátis</p>
                <p className="text-gray-500 text-xs">Em compras acima de R$ 150</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RefreshCw size={20} className="text-primary" />
              <div>
                <p className="font-bold">Troca Fácil</p>
                <p className="text-gray-500 text-xs">30 dias para devolução</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <ShieldCheck size={20} className="text-primary" />
              <div>
                <p className="font-bold">Compra Segura</p>
                <p className="text-gray-500 text-xs">Certificado SSL 256 bits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}