

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
  Youtube: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  TikTok: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.36-.54.38-.89.98-1.01 1.64-.13.64.01 1.35.35 1.9.36.57.97.97 1.62 1.13.67.16 1.39.11 2.02-.18.73-.34 1.25-1.01 1.47-1.79.07-.3.1-.61.1-.92-.02-3.5-.04-7.01-.03-10.52z"/>
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
              <a href="#" className="hover:text-gold transition-colors"><SocialIcons.Youtube /></a>
              <a href="#" className="hover:text-gold transition-colors"><SocialIcons.TikTok /></a>
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
