import { useState } from "react";
import { ChevronRight, ArrowUp, Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-stone-950 text-stone-400 font-sans pt-16 relative">
      
      {/* Decorative top border gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 opacity-50"></div>

      {/* Newsletter Section - Floating Card Style */}
      <div className="container mx-auto px-6 mb-16">
        <div className="bg-stone-900 rounded-2xl p-8 md:p-12 border border-stone-800 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Subtle bg decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-20 pointer-events-none"></div>
          
          <div className="relative z-10 text-center lg:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Join our Travel Community</h3>
            <p className="text-stone-400">Get the latest travel updates and exclusive offers sent to your inbox.</p>
          </div>

          <form onSubmit={handleSubscribe} className="relative z-10 w-full lg:w-auto flex flex-col sm:flex-row gap-3">
             <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:w-80 pl-12 pr-4 py-3 bg-stone-950 border border-stone-800 text-white rounded-xl focus:outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600 transition-all placeholder:text-stone-600"
                  required
                />
             </div>
             <button type="submit" className="px-6 py-3 bg-white text-stone-950 font-bold rounded-xl hover:bg-stone-200 transition-colors flex items-center justify-center gap-2">
                Subscribe <Send className="w-4 h-4" />
             </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">Tour<span className="text-stone-600">.</span></h3>
            <div className="space-y-4 text-sm">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
                <span>Walvis Bay, Waterfront<br />Namibia</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-stone-500 shrink-0" />
                <span>+264 81 266 4189</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-stone-500 shrink-0" />
                <span>info@walvisbay-eco-tourism.com</span>
              </p>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Useful Links</h3>
            <ul className="space-y-3">
              {["Home", "About us", "Services", "Terms of service", "Privacy policy"].map((link) => (
                <li key={link}>
                  <a href="#" className="inline-flex items-center hover:text-white transition-all group">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-700 group-hover:bg-white mr-3 transition-colors"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Our Tours</h3>
            <ul className="space-y-3">
              {["Marine Tours", "Cape Cross", "Pelican Point", "Sandwich Harbour tour", "Township Tours"].map((service) => (
                <li key={service}>
                   <a href="#" className="inline-flex items-center hover:text-white transition-all group">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-700 group-hover:bg-white mr-3 transition-colors"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Follow Us</h3>
            <p className="text-sm mb-6 leading-relaxed">
              Stay connected with us on social media for the latest updates and travel inspiration.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:bg-white hover:border-white hover:text-stone-950 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-stone-900 bg-black/20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="text-center md:text-left">
              <p>
                © Copyright <span className="font-bold text-white">Walvis Bay Tours - 2026 -</span> All Rights Reserved
              </p>
            </div>
            <div className="text-center md:text-right">
              <p>
                Designed by <a href="#" className="text-white hover:underline decoration-stone-500 underline-offset-4 transition-all">VTA Namibia</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-stone-100 text-stone-900 shadow-xl flex items-center justify-center transition-all hover:scale-110 hover:bg-white z-50 group border border-stone-200"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
};

export default Footer;