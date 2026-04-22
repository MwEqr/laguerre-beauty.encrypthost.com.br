import { ShoppingBag, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';

interface ProductGridProps {
  onlyPromos?: boolean;
}

export default function ProductGrid({ onlyPromos = false }: ProductGridProps) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      let data = await fetchProducts();
      
      if (data && onlyPromos) {
        data = data.filter((p: any) => p.tag === 'Promoção' || (p.oldPrice && p.oldPrice > p.price));
      }
      
      setProducts(data || []);
      setLoading(false);
    };
    getProducts();
  }, [onlyPromos]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 w-full">
        <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
        <p className="text-premium-500 font-serif">Carregando catálogo...</p>
      </div>
    );
  }

  if (products.length === 0) {
    if (onlyPromos) {
      return (
        <div className="bg-white border border-premium-100 p-12 text-center rounded-sm shadow-sm max-w-3xl mx-auto my-8">
          <div className="w-16 h-16 bg-premium-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="text-accent w-8 h-8" strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-serif text-premium-900 mb-3 uppercase tracking-widest">Ofertas Exclusivas em Breve</h3>
          <p className="text-premium-500 italic leading-relaxed">
            Estamos preparando promoções irresistíveis e lançamentos luxuosos para você. <br />
            Fique atenta às nossas redes sociais para não perder nada!
          </p>
          <div className="mt-8">
            <span className="h-px w-24 bg-accent/30 inline-block"></span>
          </div>
        </div>
      );
    }
    return (
      <div className="text-center py-20 w-full">
        <p className="text-premium-500">Nenhum produto encontrado no momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id} className="group flex flex-col relative">
          
          {/* Tags */}
          {product.tag && (
            <div className="absolute top-3 left-3 z-10">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 shadow-sm ${
                product.tag === 'Promoção' || product.tag.includes('%') ? 'bg-accent text-white' : 'bg-premium-900 text-white'
              }`}>
                {product.tag}
              </span>
            </div>
          )}

          {/* Image Container */}
          <Link to={`/product/${product.id}`} className="relative h-[360px] w-full overflow-hidden bg-premium-100 mb-4 rounded-sm block flex-shrink-0">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            
            {/* Hover Actions */}
            <div className="absolute inset-0 bg-premium-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product, product.sizes?.[0] || 'M', product.colors?.[0] || 'Natural', 1);
                }} 
                className="bg-white p-3.5 rounded-full text-premium-900 hover:bg-accent hover:text-white transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
                title="Adicionar à Sacola"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
          </Link>

          {/* Info */}
          <div className="flex flex-col flex-grow">
            <Link to={`/product/${product.id}`}>
              <h3 className="text-base font-medium text-premium-900 hover:text-accent-dark transition-colors cursor-pointer">
                {product.name}
              </h3>
            </Link>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-premium-900 font-semibold">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              {product.oldPrice && (
                <span className="text-premium-400 line-through text-sm">
                  R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
