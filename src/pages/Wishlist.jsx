import { useEffect } from 'react';
import { useCart } from './CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Heart } from 'lucide-react';

const Wishlist = () => {
  const { wishlistItems, toggleWishlist, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-charcoal pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-charcoal font-serif">My Wishlist</h1>
            <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">{wishlistItems.length} Saved Items</p>
          </div>
          <button 
            onClick={() => navigate('/products')}
            className="flex items-center gap-3 text-gold font-bold uppercase tracking-[0.2em] text-[10px] hover:gap-5 transition-all"
          >
            Continue Shopping <ArrowRight size={14} />
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-8">
              <Heart size={40} />
            </div>
            <h3 className="text-2xl font-bold text-charcoal mb-4">Your wishlist is empty</h3>
            <p className="text-gray-500 max-w-sm leading-relaxed mb-10 text-sm">
              Save items you love here to easily find them later and add them to your cart.
            </p>
            <button 
              onClick={() => navigate('/products')}
              className="bg-charcoal text-white px-10 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all shadow-xl"
            >
              Discover Collections
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div 
                  className="aspect-[3/4] relative overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="p-8 space-y-4">
                  <div>
                    <p className="text-[9px] text-gold font-bold uppercase tracking-widest mb-1">{item.category}</p>
                    <h4 className="text-lg font-bold text-charcoal font-serif truncate group-hover:text-gold transition-colors">{item.name}</h4>
                    <p className="text-xl font-bold text-charcoal mt-1">{item.price}</p>
                  </div>

                  <button 
                    onClick={() => addToCart(item, 1, 'M', { name: 'Default', hex: '#000' })}
                    className="w-full py-4 bg-charcoal text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all flex items-center justify-center gap-3 shadow-lg"
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
