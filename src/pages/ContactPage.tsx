import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, MessageSquare, Send, Clock, Globe, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    let isSetup = false;

    const setupAnimations = () => {
      if (isSetup || !pageRef.current) return;
      isSetup = true;

      ctx = gsap.context(() => {
        // Header animation - use fromTo to avoid jitter
        gsap.fromTo('.contact-header > *',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          }
        );

        // Contact cards animation - use fromTo
        gsap.fromTo('.contact-card',
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-cards',
              start: 'top 85%',
            },
          }
        );

        // Form animation - use fromTo
        gsap.fromTo('.contact-form',
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-section',
              start: 'top 80%',
            },
          }
        );

        // Info panel animation - use fromTo
        gsap.fromTo('.contact-info',
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-section',
              start: 'top 80%',
            },
          }
        );
      }, pageRef);
    };

    const handleLayoutReady = () => {
      setupAnimations();
    };

    window.addEventListener('layoutReady', handleLayoutReady);

    // Fallback: if layoutReady already fired before this listener was registered
    if ((window as any).__layoutReadyFired) {
      setupAnimations();
    }

    // Safety net: if layoutReady never arrives, set up after 300ms anyway
    const safetyTimeout = window.setTimeout(() => {
      setupAnimations();
    }, 300);

    return () => {
      window.removeEventListener('layoutReady', handleLayoutReady);
      clearTimeout(safetyTimeout);
      if (ctx) ctx.revert();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div ref={pageRef} className="min-h-screen pt-32 pb-20">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-brand-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-brand-900/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        {/* Header */}
        <div className="contact-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-display mb-6">
            Let's start a <span className="brand-gradient">conversation</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tell us what you’re building. AXOBITS PRIVATE LIMITED will respond with next steps and a clear way forward.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="contact-cards grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="contact-card p-8 rounded-2xl bg-dark-card border border-white/5 hover:border-brand-500/30 transition-colors group text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-brand-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
            <p className="text-gray-400 text-sm mb-4">For general inquiries</p>
            <a href="mailto:hello@axobits.com" className="text-brand-400 font-medium hover:underline">
              hello@axobits.com
            </a>
          </div>

          <div className="contact-card p-8 rounded-2xl bg-dark-card border border-white/5 hover:border-brand-500/30 transition-colors group text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-8 h-8 text-brand-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
            <p className="text-gray-400 text-sm mb-4">Use the form below</p>
            <a href="#contact-form" className="text-brand-400 font-medium hover:underline flex items-center gap-2 mx-auto w-fit">
              Go to form
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="contact-card p-8 rounded-2xl bg-dark-card border border-white/5 hover:border-brand-500/30 transition-colors group text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8 text-brand-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Request a Call</h3>
            <p className="text-gray-400 text-sm mb-4">Share your requirements</p>
            <a href="#contact-form" className="text-brand-400 font-medium hover:underline flex items-center gap-2 mx-auto w-fit">
              Request a conversation
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact-section grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div id="contact-form" className="contact-form lg:col-span-3">
            <div className="p-8 md:p-10 rounded-3xl bg-dark-card border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-2">Send us a message</h2>
              <p className="text-gray-400 mb-8">Fill out the form below and we'll get back to you shortly.</p>

              {isSubmitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                  <p className="text-gray-400 mb-8">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
                    }}
                    className="text-brand-400 font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-500 transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-500 transition-colors"
                        placeholder="Company Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-500 transition-colors"
                      >
                        <option value="" className="bg-dark-bg">Select a subject</option>
                        <option value="demo" className="bg-dark-bg">Request a Demo</option>
                        <option value="sales" className="bg-dark-bg">Sales Inquiry</option>
                        <option value="support" className="bg-dark-bg">Technical Support</option>
                        <option value="partnership" className="bg-dark-bg">Partnership</option>
                        <option value="other" className="bg-dark-bg">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                      placeholder="Tell us about your project or question..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-white text-black rounded-full font-bold hover:bg-brand-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div className="contact-info lg:col-span-2 space-y-8">
            {/* Office Info */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-brand-950/50 to-dark-card border border-brand-500/20">
              <h3 className="text-xl font-bold text-white mb-6">Headquarters</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-medium">San Francisco</div>
                    <div className="text-gray-400 text-sm">
                      100 California Street<br />
                      Suite 500<br />
                      San Francisco, CA 94111
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-brand-400 shrink-0" />
                  <div>
                    <div className="text-gray-400 text-sm">
                      Mon - Fri: 9:00 AM - 6:00 PM PST
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Globe className="w-5 h-5 text-brand-400 shrink-0" />
                  <div>
                    <div className="text-gray-400 text-sm">
                      Serving customers worldwide
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="p-8 rounded-2xl bg-dark-card border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
              <div className="space-y-4">
                <a href="#" className="flex items-center justify-between py-3 border-b border-white/5 text-gray-400 hover:text-white transition-colors group">
                  <span>Documentation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#" className="flex items-center justify-between py-3 border-b border-white/5 text-gray-400 hover:text-white transition-colors group">
                  <span>API Reference</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#" className="flex items-center justify-between py-3 border-b border-white/5 text-gray-400 hover:text-white transition-colors group">
                  <span>Status Page</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#" className="flex items-center justify-between py-3 text-gray-400 hover:text-white transition-colors group">
                  <span>Community Forum</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Support Badge */}
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <div className="text-emerald-400 font-bold text-lg mb-1">24/7 Support</div>
              <div className="text-gray-400 text-sm">Enterprise customers get round-the-clock assistance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
