import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building reliable SaaS systems: what we optimize for',
    excerpt: 'How AXOBITS PRIVATE LIMITED approaches delivery: clear scope, measurable outcomes, and production-grade engineering practices.',
    category: 'Best Practices',
    author: 'AXOBITS Team',
    date: 'Dec 10, 2025',
    readTime: '8 min read',
    image: 'bg-gradient-to-br from-brand-600 to-brand-400',
    featured: true,
  },
  {
    id: '2',
    title: 'Discovery to delivery: a lightweight process that ships',
    excerpt: 'A practical workflow for aligning stakeholders, engineering, and timelines without unnecessary ceremony.',
    category: 'Best Practices',
    author: 'AXOBITS Team',
    date: 'Dec 8, 2025',
    readTime: '5 min read',
    image: 'bg-gradient-to-br from-brand-600 to-brand-400',
  },
  {
    id: '3',
    title: 'Documentation that stays accurate: patterns that work',
    excerpt: 'How to keep docs current with review loops, ownership, and tooling that fits your team.',
    category: 'Best Practices',
    author: 'AXOBITS Team',
    date: 'Dec 5, 2025',
    readTime: '6 min read',
    image: 'bg-gradient-to-br from-brand-600 to-brand-400',
  },
  {
    id: '4',
    title: 'Engineering cost control: where it actually comes from',
    excerpt: 'A checklist for reducing cloud spend, improving performance, and keeping systems predictable at scale.',
    category: 'Finance',
    author: 'AXOBITS Team',
    date: 'Dec 3, 2025',
    readTime: '7 min read',
    image: 'bg-gradient-to-br from-brand-600 to-brand-400',
  },
  {
    id: '5',
    title: 'Security basics for SaaS teams: practical defaults',
    excerpt: 'Sane security defaults that reduce risk: access control, auditability, and deployment hygiene.',
    category: 'Industry Insights',
    author: 'AXOBITS Team',
    date: 'Nov 30, 2025',
    readTime: '4 min read',
    image: 'bg-gradient-to-br from-brand-600 to-brand-400',
  },
  {
    id: '6',
    title: 'Onboarding that reduces support load',
    excerpt: 'Simple UX and engineering patterns that help users succeed without complexity.',
    category: 'Research',
    author: 'AXOBITS Team',
    date: 'Nov 28, 2025',
    readTime: '10 min read',
    image: 'bg-gradient-to-br from-brand-600 to-brand-400',
  },
];

const categories = ['All', 'Industry Insights', 'Case Study', 'Best Practices', 'Product Update', 'Research', 'Finance'];

const BlogPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = React.useState('All');

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    let isSetup = false;

    const setupAnimations = () => {
      if (isSetup || !pageRef.current) return;
      isSetup = true;

      ctx = gsap.context(() => {
        // Header animation
        gsap.fromTo(
          '.blog-header > *',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );

        // Featured post animation
        gsap.fromTo(
          '.featured-post',
          { opacity: 0, y: 60, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.featured-post',
              start: 'top 85%',
            },
          }
        );

        // Blog cards animation
        gsap.fromTo(
          '.blog-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.blog-grid',
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

  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0];
  const otherPosts = filteredPosts.filter(post => post.id !== featuredPost?.id);

  return (
    <div ref={pageRef} className="min-h-screen pt-32 pb-20">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-900/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        {/* Header */}
        <div className="blog-header text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
            Blog & News
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-display mb-6">
            Insights & <span className="brand-gradient">Updates</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Notes and updates from AXOBITS PRIVATE LIMITED on SaaS engineering, delivery, and building reliable software.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-white text-black'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="featured-post mb-16">
            <Link to={`/blog/${featuredPost.id}`} className="block group">
              <div className={`relative overflow-hidden rounded-3xl ${featuredPost.image} p-8 md:p-12 min-h-[400px] md:min-h-[500px] flex flex-col justify-end`}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium">
                      {featuredPost.category}
                    </span>
                    <span className="text-white/60 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-brand-300 transition-colors">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-white/70 text-lg mb-6 max-w-2xl">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-medium">
                        {featuredPost.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{featuredPost.author}</div>
                        <div className="text-white/50 text-xs">{featuredPost.date}</div>
                      </div>
                    </div>
                    
                    <span className="flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all">
                      Read Article
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                {/* Featured Badge */}
                <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider">
                  Featured
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Grid */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="blog-card group"
            >
              <article className="h-full flex flex-col rounded-2xl bg-dark-card border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300">
                {/* Image */}
                <div className={`h-48 ${post.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-24 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-brand-950/50 to-brand-900/50 border border-brand-500/20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Stay in the loop
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Get the latest insights, product updates, and industry news delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-500"
            />
            <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-brand-300 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
