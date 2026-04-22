import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary tracking-tighter">LAGUERRE</span>
          <span className="text-2xl font-light text-secondary">BEAUTY</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-primary transition">INÍCIO</Link>
          <Link to="/shop" className="hover:text-primary transition">PRODUTOS</Link>
          <Link to="/about" className="hover:text-primary transition">SOBRE</Link>
          <Link to="/contact" className="hover:text-primary transition">CONTATO</Link>
        </div>

        <div className="flex items-center gap-5">
          <button className="hover:text-primary transition"><Search size={22} /></button>
          <Link to="/login" className="hover:text-primary transition"><User size={22} /></Link>
          <Link to="/cart" className="relative hover:text-primary transition">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">0</span>
          </Link>
          <button className="md:hidden hover:text-primary transition"><Menu size={22} /></button>
        </div>
      </div>
    </nav>
  );
}