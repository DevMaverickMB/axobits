import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, Check, MessageSquareCode, Map, BarChart3, FileCode, Sparkles, Database, Shield, Zap } from 'lucide-react';
import { useModal } from '../context/ModalContext';

gsap.registerPlugin(ScrollTrigger);

interface ProductData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  features: { title: string; description: string; icon: React.ElementType }[];
  useCases: string[];
  stats: { value: string; label: string }[];
  testimonial: { quote: string; author: string; role: string };
}

const productsData: { [key: string]: ProductData } = {
  vera: {
    id: 'vera',
    name: 'Vera AI',
    tagline: 'The intelligent data bridge',
    description: 'Transform how you interact with your databases. Ask questions in plain English and get instant, accurate results.',
    longDescription: 'Vera AI revolutionizes database interaction by bridging the gap between natural language and complex queries. Whether you\'re a developer, analyst, or executive, Vera understands your questions and delivers precise answers in milliseconds. No SQL expertise required.',
    icon: MessageSquareCode,
    color: 'brand',
    gradient: 'from-brand-600 to-brand-400',
    features: [
      { title: 'Natural Language Processing', description: 'Ask questions in plain English - Vera understands context and intent.', icon: MessageSquareCode },
      { title: 'Multi-Database Support', description: 'Connect PostgreSQL, MySQL, MongoDB, and 20+ other databases seamlessly.', icon: Database },
      { title: 'Enterprise Security', description: 'SOC2 compliant with end-to-end encryption and role-based access control.', icon: Shield },
      { title: 'Real-time Insights', description: 'Get instant answers with sub-100ms query execution times.', icon: Zap },
    ],
    useCases: ['Business Intelligence', 'Data Analysis', 'Executive Reporting', 'Customer Insights', 'Operational Metrics'],
    stats: [
      { value: '100M+', label: 'Queries Processed' },
      { value: '<50ms', label: 'Average Response' },
      { value: '99.9%', label: 'Query Accuracy' },
    ],
    testimonial: {
      quote: 'Vera AI cut our reporting time by 80%. What used to take our analysts hours now takes seconds.',
      author: 'Sarah Chen',
      role: 'CTO, TechVentures',
    },
  },
  charioteer: {
    id: 'charioteer',
    name: 'Charioteer',
    tagline: 'Guided experiences, instantly',
    description: 'Create interactive product tours and onboarding flows without writing a single line of code.',
    longDescription: 'Charioteer transforms how users discover and learn your product. Build beautiful, interactive guided experiences that increase activation, reduce churn, and eliminate support tickets. Our no-code builder makes it easy to create personalized journeys for every user segment.',
    icon: Map,
    color: 'brand',
    gradient: 'from-brand-600 to-brand-400',
    features: [
      { title: 'No-Code Builder', description: 'Drag-and-drop interface to create tours in minutes, not days.', icon: Sparkles },
      { title: 'Smart Targeting', description: 'Show the right tour to the right user based on behavior and attributes.', icon: Map },
      { title: 'Analytics Dashboard', description: 'Track completion rates, drop-offs, and user engagement in real-time.', icon: BarChart3 },
      { title: 'A/B Testing', description: 'Optimize your tours with built-in experimentation tools.', icon: Zap },
    ],
    useCases: ['User Onboarding', 'Feature Announcements', 'Customer Education', 'Self-Service Support', 'Product Updates'],
    stats: [
      { value: '340%', label: 'Activation Increase' },
      { value: '65%', label: 'Support Ticket Reduction' },
      { value: '2min', label: 'Avg. Build Time' },
    ],
    testimonial: {
      quote: 'Our activation rate jumped 340% after implementing Charioteer. The ROI was immediate.',
      author: 'Marcus Rodriguez',
      role: 'VP Product, GlobalScale',
    },
  },
  ledger: {
    id: 'ledger',
    name: 'AI Ledger',
    tagline: 'Your AI cost command center',
    description: 'Consolidate, track, and optimize your AI subscriptions and usage across your organization.',
    longDescription: 'AI Ledger brings clarity to the chaos of AI spending. As organizations adopt more AI tools, tracking costs and usage becomes a nightmare. AI Ledger consolidates all your AI subscriptions, provides accurate forecasting, and helps you optimize spending across your entire stack.',
    icon: BarChart3,
    color: 'brand',
    gradient: 'from-brand-600 to-brand-400',
    features: [
      { title: 'Cost Consolidation', description: 'See all AI spending in one unified dashboard.', icon: BarChart3 },
      { title: 'Usage Forecasting', description: 'Predict future costs with ML-powered projections.', icon: Sparkles },
      { title: 'Renewal Alerts', description: 'Never miss a renewal or get surprised by auto-charges.', icon: Shield },
      { title: 'Vendor Comparison', description: 'Compare providers and find cost-saving opportunities.', icon: Database },
    ],
    useCases: ['Budget Planning', 'Vendor Management', 'Cost Optimization', 'Usage Analysis', 'Compliance Reporting'],
    stats: [
      { value: '30%', label: 'Avg. Cost Savings' },
      { value: '100+', label: 'Vendors Tracked' },
      { value: '$2.4B', label: 'Spending Analyzed' },
    ],
    testimonial: {
      quote: 'We discovered $200k in redundant AI subscriptions in the first week. AI Ledger pays for itself.',
      author: 'Emily Thompson',
      role: 'CFO, Innovate Labs',
    },
  },
  blueprint: {
    id: 'blueprint',
    name: 'Blueprint AI',
    tagline: 'Living documentation',
    description: 'Documentation that writes itself and stays synchronized with your codebase.',
    longDescription: 'Blueprint AI solves the eternal problem of outdated documentation. By analyzing your codebase in real-time, it automatically generates and updates documentation as your project evolves. From API docs to architecture diagrams, Blueprint keeps everything current without manual effort.',
    icon: FileCode,
    color: 'brand',
    gradient: 'from-brand-600 to-brand-400',
    features: [
      { title: 'Auto-Generation', description: 'Generate comprehensive docs from your code automatically.', icon: FileCode },
      { title: 'Code Sync', description: 'Documentation updates in real-time as code changes.', icon: Zap },
      { title: 'API Documentation', description: 'Beautiful, interactive API docs with code samples.', icon: Database },
      { title: 'Team Collaboration', description: 'Comment, suggest, and review docs together.', icon: MessageSquareCode },
    ],
    useCases: ['API Documentation', 'Technical Specs', 'Onboarding Docs', 'Architecture Diagrams', 'Knowledge Base'],
    stats: [
      { value: '90%', label: 'Time Saved' },
      { value: '500+', label: 'Languages Supported' },
      { value: '1M+', label: 'Docs Generated' },
    ],
    testimonial: {
      quote: 'Blueprint AI freed our team from documentation debt. Now docs are always current.',
      author: 'Alex Patel',
      role: 'Engineering Manager, CloudFirst',
    },
  },
};

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productsData[productId || 'vera'];
  const sectionRef = useRef<HTMLElement>(null);
  const { openModal } = useModal();

  useEffect(() => {
    if (!product) return;

    let ctx: gsap.Context | null = null;
    let isSetup = false;

    const setupAnimations = () => {
      if (isSetup || !sectionRef.current) return;
      isSetup = true;

      ctx = gsap.context(() => {
        // Hero animations
        gsap.fromTo(
          '.product-hero-content > *',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );

        // Feature cards
        gsap.fromTo(
          '.feature-card',
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.features-section',
              start: 'top 80%',
            },
          }
        );

        // Stats animation
        gsap.fromTo(
          '.stat-item',
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: '.stats-section',
              start: 'top 80%',
            },
          }
        );
      }, sectionRef);
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
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products" className="text-brand-400 hover:underline">
            View all products
          </Link>
        </div>
      </div>
    );
  }

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      brand: { bg: 'bg-brand-500/10', text: 'text-brand-400', border: 'border-brand-500/30' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
      emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
    };
    return colorMap[color] || colorMap.brand;
  };

  const colors = getColorClasses(product.color);

  return (
    <section ref={sectionRef} className="min-h-screen">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-b ${product.gradient} opacity-[0.05]`}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-900/20 blur-[200px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 relative z-10">
          {/* Back Link */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          {/* Hero Content */}
          <div className="product-hero-content grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className={`w-20 h-20 rounded-2xl ${colors.bg} flex items-center justify-center mb-8`}>
                <product.icon className={`w-10 h-10 ${colors.text}`} />
              </div>

              <h1 className="text-5xl md:text-7xl font-black font-display mb-4">{product.name}</h1>
              <p className={`${colors.text} text-xl font-medium mb-6`}>{product.tagline}</p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">{product.longDescription}</p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={openModal}
                  className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-brand-300 transition-colors flex items-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className={`px-8 py-4 rounded-full border ${colors.border} ${colors.text} font-bold hover:bg-white/5 transition-colors`}>
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="stats-section grid grid-cols-3 gap-4">
              {product.stats.map((stat, index) => (
                <div
                  key={index}
                  className={`stat-item p-6 rounded-2xl ${colors.bg} border ${colors.border} text-center`}
                >
                  <div className={`text-3xl font-black ${colors.text}`}>{stat.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
              Powerful <span className="brand-gradient">features</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Everything you need to transform your workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card p-8 rounded-2xl bg-dark-card border border-white/5 hover:${colors.border} transition-colors duration-300 group`}
              >
                <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                Built for your <span className="brand-gradient">use case</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                {product.name} adapts to your specific needs, whether you're a startup or enterprise.
              </p>
              <div className="space-y-4">
                {product.useCases.map((useCase, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center`}>
                      <Check className={`w-4 h-4 ${colors.text}`} />
                    </div>
                    <span className="text-white font-medium">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className={`p-8 rounded-3xl bg-gradient-to-br ${product.gradient} bg-opacity-10 border ${colors.border}`}>
              <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center mb-6`}>
                <Sparkles className={`w-6 h-6 ${colors.text}`} />
              </div>
              <blockquote className="text-xl text-white font-light leading-relaxed mb-6">
                "{product.testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center ${colors.text} font-bold`}>
                  {product.testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-white font-bold">{product.testimonial.author}</div>
                  <div className="text-gray-400 text-sm">{product.testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
            Ready to get started with <span className="brand-gradient">{product.name}</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join thousands of teams already transforming their workflow with {product.name}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={openModal}
              className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-brand-300 transition-colors flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              to="/products"
              className="px-8 py-4 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 transition-colors"
            >
              Explore Other Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
