import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const PROMOS = [
  {
    id: 1,
    title: "Semanas de Ouro",
    subtitle: "Até 40% OFF em Batons Matte",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=2000&auto=format&fit=crop",
    link: "/promocoes"
  },
  {
    id: 2,
    title: "Skincare Completo",
    subtitle: "Leve 3, Pague 2",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2000&auto=format&fit=crop",
    link: "/colecao?categoria=Skincare"
  }
];

export default function PromoCarousel() {
  return (
    <section id="ofertas" className="py-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-sm overflow-hidden shadow-2xl bg-premium-900 border border-premium-800">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="h-[400px] md:h-[500px] w-full promo-swiper"
        >
          {PROMOS.map((promo) => (
            <SwiperSlide key={promo.id}>
              <div className="relative w-full h-full flex items-center">
                <div className="absolute inset-0">
                  <img 
                    src={promo.image} 
                    alt={promo.title}
                    className="w-full h-full object-cover object-center opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-premium-900 via-premium-900/80 to-transparent"></div>
                </div>
                
                <div className="relative z-10 p-8 md:p-16 max-w-xl">
                  <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">
                    Oferta Especial
                  </span>
                  <h3 className="text-3xl md:text-5xl font-serif text-white mb-4 leading-tight">
                    {promo.title}
                  </h3>
                  <p className="text-premium-200 text-lg md:text-xl mb-8 font-light">
                    {promo.subtitle}
                  </p>
                  
                  <Link 
                    to={promo.link}
                    className="inline-flex items-center gap-2 bg-white text-premium-900 px-6 py-3 font-semibold hover:bg-accent hover:text-white transition-all group rounded-sm"
                  >
                    Aproveitar Agora
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}