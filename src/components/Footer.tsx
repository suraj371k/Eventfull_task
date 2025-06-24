"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook,
  Instagram,
  Twitter,
  Heart
} from 'lucide-react';

export default function Footer() {
  const services = ["Weddings", "Corporate", "Birthdays", "Conferences"];
  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-500" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { icon: Twitter, href: "#", color: "hover:text-sky-500" }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <motion.div 
        className="container mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              EventCraft
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Creating unforgettable moments with perfect event planning.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map(({ icon: Icon, href, color }, index) => (
                <a
                  key={index}
                  href={href}
                  className={`p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 transition-all duration-300 ${color} hover:scale-110`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>123 Event Street, NY</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <a href="mailto:hello@eventcraft.com" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  hello@eventcraft.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm">
              <span>© 2025 EventCraft. Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
            </div>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}