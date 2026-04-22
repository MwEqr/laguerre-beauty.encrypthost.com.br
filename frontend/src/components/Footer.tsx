import { Instagram, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-premium-900 text-premium-100 py-16 border-t border-premium-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-serif text-white mb-6">
              <img src="/logo.png?v=2" alt="Laguerre Beauty" className="h-24 w-auto object-contain" />
            </h3>
            <p className="text-premium-400 text-sm leading-relaxed mb-6">
              Sua essência, nossa inspiração. Oferecemos o que há de mais luxuoso em cosméticos para realçar sua beleza natural com fórmulas exclusivas.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/laguerrebeautycosmeticos/" target="_blank" rel="noopener noreferrer" className="text-premium-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/55" target="_blank" rel="noopener noreferrer" className="text-premium-400 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium uppercase tracking-wider text-sm mb-4">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-xs font-bold uppercase tracking-widest mb-1">Atendimento</p>
                  <a href="https://wa.me/55" target="_blank" rel="noopener noreferrer" className="text-premium-400 hover:text-white transition-colors text-sm">
                    Fale Conosco
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-xs font-bold uppercase tracking-widest mb-1">Localização</p>
                  <p className="text-premium-400 text-sm">Artur Nogueira - SP</p>
                  <p className="text-premium-400 text-xs">CEP: 13167-564</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium uppercase tracking-wider text-sm mb-4">Newsletter</h4>
            <p className="text-premium-400 text-sm mb-4">Receba ofertas exclusivas e novidades.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="bg-premium-800 text-white px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-accent-dark text-sm placeholder:text-premium-500"
              />
              <button type="submit" className="bg-accent-dark hover:bg-accent text-white px-4 py-2 text-sm font-medium transition-colors">
                Assinar
              </button>
            </form>
          </div>

        </div>
        
        <div className="border-t border-premium-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-premium-500">
          <p>© {new Date().getFullYear()} Laguerre Beauty. Todos os direitos reservados.</p>
          <p className="mt-2 sm:mt-0">Elegância em cada detalhe.</p>
        </div>
      </div>
    </footer>
  );
}