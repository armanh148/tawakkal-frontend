

const SocialIcons = {
  Facebook: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Instagram: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Linkedin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  WhatsApp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M11.5 2C6.253 2 2 6.253 2 11.5c0 1.938.584 3.74 1.587 5.24L2 22l5.438-1.566C8.926 21.459 10.687 22 12.5 22 17.747 22 22 17.747 22 12.5S17.747 2 11.5 2zm0 18c-1.72 0-3.33-.504-4.682-1.37l-.336-.199-3.226.929.958-3.131-.218-.35A8.457 8.457 0 0 1 3 11.5C3 6.804 6.804 3 11.5 3S20 6.804 20 11.5 16.196 20 11.5 20z"/>
    </svg>
  ),
};

const Footer = ({ id }) => {
  return (
    <footer id={id} className="bg-charcoal text-white pt-16 md:pt-24 pb-4 border-t border-gold/20">
      <div className="max-w-[100%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12 md:mb-20">
          
          {/* Column 1: Contact/Newsletter replacement (20%) */}
          <div className="lg:w-[20%] gap-4">
            <h3 className="text-[14px] uppercase tracking-[0.2em] font-extrabold text-white mb-6">GET IN TOUCH</h3>
            <div className="space-y-2 text-xs text-white/60">
              <div className="flex flex-col space-y-0">
                <span className="text-white uppercase text-[12px] tracking-wider opacity-40">WhatsApp</span>
                <p className="text-gray-300 uppercase text-[12px] tracking-wider font-light">+92 3XX XXXXXXX</p>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-white uppercase text-[12px] tracking-wider opacity-40">Email</span>
                <p className="text-gray-300 uppercase text-[12px] tracking-wider font-light">info@tawakkalstudio.com</p>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-white uppercase text-[12px] tracking-wider opacity-40">Address</span>
                <p className="text-gray-300 uppercase text-[12px] tracking-wider font-light">Karachi, Pakistan</p>
              </div>
            </div>
          </div>

          {/* Column 2: Customer Care (20%) */}
          <div className="lg:w-[20%] gap-4">
            <h3 className="text-[14px] uppercase tracking-[0.2em] font-extrabold text-white mb-6">CUSTOMER CARE</h3>
            <ul className="space-y-0 md:space-y-2 text-[12px] text-white/60">
              <li><a href="/contact" className="hover:text-gold transition-colors block">Contact Us</a></li>
              <li><a href="/feedback-survey" className="hover:text-gold transition-colors block">Feedback Survey</a></li>
              <li><a href="/privacy-policy" className="hover:text-gold transition-colors block">Privacy Policy</a></li>
              <li><a href="/faqs" className="hover:text-gold transition-colors block">FAQ's</a></li>
              <li><a href="/disclaimer" className="hover:text-gold transition-colors block">Disclaimer</a></li>
            </ul>
          </div>

          {/* Column 3: Information (20%) */}
          <div className="lg:w-[20%]">
            <h3 className="text-[14px] uppercase tracking-[0.2em] font-extrabold text-white mb-6">INFORMATION</h3>
            <ul className="space-y-0 md:space-y-2 text-[12px] text-white/60">
              <li><a href="/about" className="hover:text-gold transition-colors block">About Us</a></li>
              <li><a href="/shipping" className="hover:text-gold transition-colors block">Shipping and Handling</a></li>
              <li><a href="/store-locator" className="hover:text-gold transition-colors block">Store Locator</a></li>
              <li><a href="/blogs" className="hover:text-gold transition-colors block">Blogs</a></li>
              <li><a href="/fabric-glossary" className="hover:text-gold transition-colors block">Fabric Glossary</a></li>
            </ul>
          </div>

          {/* Column 4: About (40%) - Moved to Right */}
          <div className="lg:w-[40%]">
            <h3 className="text-[14px] uppercase tracking-[0.2em] font-extrabold text-white mb-6">ABOUT</h3>
            <p className="text-white/60 text-[12px] leading-relaxed text-left pl-0 lg:pl-0">
              Tawakkal began its journey with a global vision: to craft world-class textiles driven by innovation, quality, and design. Over the years, it has grown to become one of Pakistan's leading fashion and textile companies. Today, Tawakkal stands as one of the country's premium fashion destinations, trusted across markets with a global footprint.
            </p>
            <div className="mt-4 flex space-x-6 text-white/60">
              <a href="#" className="hover:text-gold transition-colors"><SocialIcons.Facebook /></a>
              <a href="#" className="hover:text-gold transition-colors"><SocialIcons.Instagram /></a>
              <a href="#" className="hover:text-gold transition-colors"><SocialIcons.Linkedin /></a>
              <a href="#" className="hover:text-gold transition-colors"><SocialIcons.WhatsApp /></a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-4 md:pt-4 flex justify-center">
          <p className="text-[12px] uppercase tracking-[0.2em] text-white/40 text-center">
          © 2026 - TAWAKKAL STUDIO | Developed by <span className="text-gold hover:text-orange-200 transition-colors"><a href="https://techmiresolutions.com/" target="_blank" rel="noopener noreferrer">Techmire Solutions</a></span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
