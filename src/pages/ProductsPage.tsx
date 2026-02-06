import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Car, BookOpen, Cpu, Sparkles, Shield, Zap, Globe } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const products = [
  {
    id: 'vera',
    name: 'Vera AI',
    tagline: 'Virtual Entity for Responsive Assistance',
    description: 'A sophisticated conversational AI companion designed to understand context, learn from interactions, and provide meaningful assistance across personal and professional domains.',
    icon: Brain,
    color: 'from-brand-500 to-brand-600',
    features: ['Natural Language Processing', 'Context Awareness', 'Multi-modal Interaction', 'Continuous Learning'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'charioteer',
    name: 'Charioteer',
    tagline: 'Intelligent Mobility Navigator',
    description: 'Next-generation autonomous navigation system that combines AI precision with human-centric design for safer, smarter transportation solutions.',
    icon: Car,
    color: 'from-cyan-500 to-blue-600',
    features: ['Real-time Navigation', 'Predictive Analytics', 'Safety Monitoring', 'Fleet Management'],
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'ailedger',
    name: 'AI Ledger',
    tagline: 'Decentralized Intelligence Network',
    description: 'Blockchain-powered AI infrastructure that ensures transparent, secure, and verifiable artificial intelligence operations with complete audit trails.',
    icon: BookOpen,
    color: 'from-emerald-500 to-teal-600',
    features: ['Blockchain Security', 'Smart Contracts', 'Audit Trails', 'Decentralized Computing'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 'blueprint',
    name: 'Blueprint AI',
    tagline: 'Architectural Intelligence Platform',
    description: 'Revolutionary design assistant that transforms creative visions into detailed technical specifications using advanced generative AI and engineering principles.',
    icon: Cpu,
    color: 'from-orange-500 to-red-600',
    features: ['Generative Design', '3D Visualization', 'Code Generation', 'Technical Documentation'],
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&auto=format&fit=crop&q=60',
  },
];

const ProductCard: React.FC<{ product: typeof products[0]; index: number }> = ({ product, index }) => {
  const cardRef = useScrollAnimation<HTMLDivElement>({ type: 'fadeInUp', delay: index * 0.1 });
  const Icon = product.icon;

  return (
    <div
      ref={cardRef}
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-60`} />
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Icon */}
        <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 font-display">{product.name}</h3>
        <p className="text-sm text-brand-400 mb-3">{product.tagline}</p>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.features.slice(0, 3).map((feature, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-gray-400"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          to={`/products/${product.id}`}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${product.color} text-white font-medium hover:shadow-lg hover:shadow-brand-500/25 transition-all duration-300 group/btn`}
        >
          Learn More
          <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

const ProductsPage: React.FC = () => {
  const heroRef = useScrollAnimation<HTMLDivElement>({ type: 'fadeIn' });
  const statsRef = useScrollAnimation<HTMLDivElement>({ type: 'stagger' });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-400 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Our Product Suite
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
            Intelligent Solutions for
            <span className="block brand-gradient">
              Every Challenge
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Explore our ecosystem of AI-powered products designed to transform how you work, 
            create, and innovate. Each solution is built on cutting-edge technology with a 
            focus on user experience.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Cpu, label: 'Products', value: '4+' },
              { icon: Globe, label: 'Countries', value: '50+' },
              { icon: Shield, label: 'Uptime', value: '99.9%' },
              { icon: Zap, label: 'API Calls/Day', value: '10M+' },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
              >
                <stat.icon className="w-6 h-6 text-brand-400 mx-auto mb-2" />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Get started with a free trial and experience the power of AI-driven solutions. 
            No credit card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-black rounded-full font-medium hover:shadow-lg hover:shadow-brand-500/25 transition-all duration-300"
            >
              Get Started Free
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-lg font-medium hover:bg-white/10 transition-all duration-300"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
