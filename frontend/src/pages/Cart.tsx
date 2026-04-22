import { ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const cartItems = [
    { id: 1, name: "Batom Matte Red Passion", price: 89.90, quantity: 1, image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=500&auto=format&fit=crop&q=60" },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-10">SEU CARRINHO</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-6 border-b pb-6">
                <img src={item.image} alt={item.name} className="w-24 h-32 object-cover bg-gray-100" />
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm">Unitário: R$ {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border">
                      <button className="p-2 hover:bg-gray-100"><Minus size={16} /></button>
                      <span className="px-4 font-bold">{item.quantity}</span>
                      <button className="p-2 hover:bg-gray-100"><Plus size={16} /></button>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-sm">
                      <Trash2 size={16} /> REMOVER
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-8 h-fit">
            <h2 className="text-xl font-bold mb-6">RESUMO DO PEDIDO</h2>
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>R$ 89,90</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frete</span>
                <span className="text-green-600 font-bold text-[10px] bg-green-100 px-2 flex items-center">GRÁTIS</span>
              </div>
              <div className="flex justify-between border-t pt-4 text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">R$ 89,90</span>
              </div>
            </div>
            <button className="w-full bg-primary hover:bg-primary-dark text-white py-4 font-bold transition">
              FINALIZAR COMPRA
            </button>
            <Link to="/" className="block text-center mt-4 text-xs font-bold text-gray-500 hover:text-primary transition uppercase tracking-widest">
              Continuar Comprando
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <ShoppingBag size={64} className="mx-auto text-gray-200 mb-6" />
          <p className="text-xl text-gray-500 mb-8">Seu carrinho está vazio.</p>
          <Link to="/" className="bg-primary text-white px-8 py-4 font-bold inline-block">VER PRODUTOS</Link>
        </div>
      )}
    </div>
  );
}