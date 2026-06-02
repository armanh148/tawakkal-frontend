import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const reelsData = [
  {
    id: 1,
    videoImg: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=600',
    thumbImg: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=100',
    category: 'RTW',
    title: 'SHIRT, TROUSER',
    price: 'PKR 12,990',
  },
  {
    id: 2,
    videoImg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600',
    thumbImg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=100',
    category: 'RTW',
    title: 'SHIRT, TROUSER',
    price: 'PKR 9,690',
  },
  {
    id: 3,
    videoImg: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=600',
    thumbImg: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=100',
    category: 'RTS',
    title: 'SHIRT, TROUSER',
    price: 'PKR 6,792',
    oldPrice: 'PKR 8,490'
  },
  {
    id: 4,
    videoImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
    thumbImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=100',
    category: 'RTS',
    title: 'SHIRT, TROUSER',
    price: 'PKR 6,792',
    oldPrice: 'PKR 8,490'
  },
  {
    id: 5,
    videoImg: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=600',
    thumbImg: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=100',
    category: 'RTS',
    title: 'SHIRT, TROUSER',
    price: 'PKR 9,990',
  },
  {
    id: 6,
    videoImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
    thumbImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=100',
    category: 'RTW',
    title: 'SHIRT, TROUSER',
    price: 'PKR 8,990',
  },
  {
    id: 7,
    videoImg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600',
    thumbImg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=100',
    category: 'RTW',
    title: 'SHIRT, TROUSER',
    price: 'PKR 7,990',
  },
  {
    id: 8,
    videoImg: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=600',
    thumbImg: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=100',
    category: 'RTS',
    title: 'SHIRT, TROUSER',
    price: 'PKR 5,990',
    oldPrice: 'PKR 7,990'
  }
];

const ReelsGallery = () => {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[95%] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-[0.2em] text-charcoal uppercase">
            WATCH. CLICK. OWN
          </h2>
        </div>

        {/* Reels Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={12}
          slidesPerView={2}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          className="reels-slider"
        >
          {reelsData.map((reel) => (
            <SwiperSlide key={reel.id}>
              <div className="relative aspect-[9/16] rounded-lg md:rounded-xl overflow-hidden group cursor-pointer">
                {/* Background Video/Image */}
                <img 
                  src={reel.videoImg} 
                  alt={reel.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-90"></div>

                {/* Product Info Bar */}
                <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 bg-white/20 backdrop-blur-md rounded md:rounded-lg p-1.5 md:p-2 flex items-center gap-2 md:gap-3 border border-white/10 transition-transform duration-300 group-hover:-translate-y-1">
                  
                  {/* Thumbnail */}
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded overflow-hidden flex-shrink-0 bg-white">
                    <img 
                      src={reel.thumbImg} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Text Details */}
                  <div className="flex flex-col justify-center text-white min-w-0">
                    <h4 className="text-[8px] md:text-[9px] font-bold tracking-widest uppercase mb-0.5 truncate">
                      {reel.category} | {reel.title}
                    </h4>
                    <div className="flex items-center gap-1 md:gap-2 text-[9px] md:text-[10px]">
                      {reel.oldPrice && (
                        <span className="text-white/50 line-through text-[8px] md:text-[9px]">{reel.oldPrice}</span>
                      )}
                      <span className="font-extrabold">{reel.price}</span>
                    </div>
                  </div>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {/* Custom Swiper Styles */}
      <style>{`
        .reels-slider .swiper-button-next,
        .reels-slider .swiper-button-prev {
          width: 36px;
          height: 36px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          color: #1a1a1a;
          transition: all 0.3s ease;
        }
        
        .reels-slider .swiper-button-next:hover,
        .reels-slider .swiper-button-prev:hover {
          background: #e6a13b;
          color: white;
          transform: scale(1.1);
        }
        
        .reels-slider .swiper-button-next::after,
        .reels-slider .swiper-button-prev::after {
          font-size: 12px;
          font-weight: bold;
        }
        
        .reels-slider .swiper-pagination {
          position: relative;
          margin-top: 16px;
        }
        
        .reels-slider .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .reels-slider .swiper-pagination-bullet-active {
          background: #e6a13b;
          width: 24px;
          border-radius: 4px;
        }

        @media (max-width: 640px) {
          .reels-slider .swiper-button-next,
          .reels-slider .swiper-button-prev {
            width: 28px;
            height: 28px;
          }
          
          .reels-slider .swiper-button-next::after,
          .reels-slider .swiper-button-prev::after {
            font-size: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default ReelsGallery;
