import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial reveal
    tl.fromTo('.hero-fade-in',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out' }
    )
    .fromTo('.product-card-reveal',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, stagger: 0.3, ease: 'expo.out' },
      '-=1'
    );

    // Subtle floating animation for cards
    gsap.to('.float-card', {
      y: -15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.5
    });
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#ebebeb]">

      {/* Vertical Scroll Indicator (Left) */}
      <div className="absolute left-6 sm:left-10 bottom-24 hidden lg:flex flex-col items-center gap-6 z-30">
        <p className="text-charcoal/30 [writing-mode:vertical-lr] uppercase text-[8px] font-bold tracking-[0.5em] rotate-180">
          Scroll to Explore
        </p>
        <div className="w-px h-24 bg-gradient-to-t from-gold/40 to-transparent" />
      </div>

      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.webp"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-20 w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-8 min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
        
        {/* Center Content: Title & Button (Order 1 on mobile, Order 2 on desktop) */}
        <div className="w-full lg:w-[50%] flex flex-col items-center text-center z-40 py-6 lg:py-0 order-1 lg:order-2">
          <div className="hero-fade-in space-y-3 flex flex-col items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-gold/30" />
              <p className="text-gold tracking-[0.6em] uppercase text-[9px] font-bold">Est. 1995</p>
              <div className="w-8 h-px bg-gold/30" />
            </div>
            <p className="text-charcoal/40 tracking-[0.4em] uppercase text-[8px] font-bold">
              Haute Couture & Luxury Fashion
            </p>
          </div>

          <div className="hero-fade-in">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-9xl font-black text-charcoal tracking-tighter leading-[0.8] uppercase mb-8">
              LUXURY <br />
              <span className="italic font-serif text-gold lowercase relative inline-block">
                Defined
                <div className="absolute -bottom-2 left-0 w-full h-px bg-gold/20" />
              </span>
            </h1>
          </div>

          <div className="hero-fade-in">
            <button className="group relative overflow-hidden border border-gold px-10 sm:px-20 py-3.5 sm:py-6 transition-all duration-500 hover:border-gold/0">
              <span className="relative z-10 text-[9px] sm:text-[12px] font-black uppercase tracking-[0.5em] text-gold group-hover:text-white transition-colors duration-500">
                Explore Collection
              </span>
              <div className="absolute inset-0 bg-gold translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </button>
          </div>
        </div>

        {/* Cards Container: Side-by-side on mobile, flanking on desktop */}
        <div className="w-full flex flex-row items-center justify-center gap-4 sm:gap-8 lg:contents order-2 lg:order-none mt-4 lg:mt-0">
          
          {/* New Arrival (Left on desktop) */}
          <div className="w-1/2 lg:w-[25%] hero-fade-in lg:order-1 flex justify-center lg:justify-start">
            <Link to="/products?sort=Newest" className="group block relative float-card w-full max-w-[280px] lg:max-w-[320px]">
              <div className="product-card-reveal relative mx-auto lg:ml-0">
                <div className="relative aspect-[3/4] overflow-hidden shadow-2xl transition-shadow duration-700">
                  <img
                    src="/hero-left.jpg"
                    alt="New Arrival"
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 z-30 bg-white px-3 sm:px-8 py-1.5 sm:py-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 whitespace-nowrap overflow-hidden group">
                  <span className="text-[7px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-charcoal relative z-10 transition-colors duration-300 group-hover:text-white">New Arrival</span>
                  <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </div>
              </div>
            </Link>
          </div>

          {/* Best Seller (Right on desktop) */}
          <div className="w-1/2 lg:w-[25%] hero-fade-in lg:order-3 flex justify-center lg:justify-end">
            <Link to="/products?badge=Best Seller" className="group block relative float-card w-full max-w-[280px] lg:max-w-[320px]">
              <div className="product-card-reveal relative mx-auto lg:mr-0">
                <div className="relative aspect-[3/4] overflow-hidden shadow-2xl transition-shadow duration-700">
                  <img
                    src="/hero-right.jpg"
                    alt="Best Seller"
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 z-30 bg-white px-3 sm:px-8 py-1.5 sm:py-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 whitespace-nowrap overflow-hidden group">
                  <span className="text-[7px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-charcoal relative z-10 transition-colors duration-300 group-hover:text-white">Best Seller</span>
                  <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
