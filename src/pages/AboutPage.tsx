import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, Sparkles, Target, Users, Lightbulb, Shield,
  Rocket, Heart, ArrowRight,
  Linkedin, Twitter
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import TerminalSection from '../components/TerminalSection';

const team = [
  {
    name: 'AXOBITS Leadership',
    role: 'Product & Delivery',
    bio: 'Focused on clear scope, dependable execution, and measurable outcomes.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'AXOBITS Engineering',
    role: 'Architecture & Systems',
    bio: 'Builds production-grade systems with performance, reliability, and security in mind.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'AXOBITS Product',
    role: 'Discovery & UX',
    bio: 'Turns requirements into usable interfaces and practical product decisions.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'AXOBITS Security',
    role: 'Security & Governance',
    bio: 'Prioritizes safe defaults, auditability, and operational maturity.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60',
    linkedin: '#',
    twitter: '#',
  },
];

const values = [
  {
    icon: Lightbulb,
    title: 'Practical engineering',
    description: 'We choose simple approaches that work in production and are easy to maintain.',
  },
  {
    icon: Users,
    title: 'Clear communication',
    description: 'We share progress early, document decisions, and keep stakeholders aligned.',
  },
  {
    icon: Shield,
    title: 'Security by default',
    description: 'We build with safe defaults, least privilege, and reviewable systems.',
  },
  {
    icon: Heart,
    title: 'Long-term thinking',
    description: 'We optimize for reliability, clarity, and sustainable delivery.',
  },
];

const milestones = [
  { year: '2020', event: 'AXOBITS began with product engineering work' },
  { year: '2021', event: 'Standardized delivery and code review practices' },
  { year: '2022', event: 'Expanded into integrations and platform hardening' },
  { year: '2023', event: 'Strengthened QA, observability, and release processes' },
  { year: '2024', event: 'Partnered on long-term maintenance and scaling efforts' },
  { year: '2025', event: 'Continued building reliable software with clients' },
];

const AboutPage: React.FC = () => {
  const heroRef = useScrollAnimation<HTMLDivElement>({ type: 'fadeIn' });
  const missionRef = useScrollAnimation<HTMLDivElement>({ type: 'fadeInUp' });
  const valuesRef = useScrollAnimation<HTMLDivElement>({ type: 'stagger' });
  const teamRef = useScrollAnimation<HTMLDivElement>({ type: 'stagger' });
  const timelineRef = useScrollAnimation<HTMLDivElement>({ type: 'fadeInUp' });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/15 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-500/6 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-300 text-sm mb-6">
            <Brain className="w-4 h-4" />
            About AXOBITS
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-display">
            Building software <span className="brand-gradient">teams trust</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            AXOBITS PRIVATE LIMITED partners with teams to design, build, and ship reliable software — with clear milestones and production-ready delivery.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-300 text-sm mb-4">
                <Target className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-4xl font-bold mb-6 font-display">
                Build, ship, and maintain serious software
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  AXOBITS PRIVATE LIMITED helps teams turn ideas into dependable systems — with clean architecture, thoughtful UX, and disciplined execution.
                </p>
                <p>
                  We focus on foundations: security, performance, maintainability, and operational readiness.
                </p>
                <p>
                  The result is software that teams can ship confidently — and run without surprises.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-dark-card border border-white/10 p-6 rounded-xl">
                <div className="text-base font-semibold text-white mb-1">Delivery-first</div>
                <div className="text-sm text-gray-400">Clear milestones, reviewable work</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-300 text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Our Values
            </div>
            <h2 className="text-4xl font-bold mb-4 font-display">What Drives Us</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our core values shape every decision we make and every product we build.
            </p>
          </div>

          <div ref={valuesRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-brand-500/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6 text-brand-300" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-display">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Section */}
      <TerminalSection />

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-300 text-sm mb-4">
              <Users className="w-4 h-4" />
              Leadership Team
            </div>
            <h2 className="text-4xl font-bold mb-4 font-display">Meet Our Leaders</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A delivery-focused group that cares about quality and clarity.
            </p>
          </div>

          <div ref={teamRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group"
              >
                <div className="relative mb-4 rounded-xl overflow-hidden aspect-[3/4]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Social Links */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <a href={member.linkedin} className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={member.twitter} className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold font-display">{member.name}</h3>
                <p className="text-brand-300 text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-300 text-sm mb-4">
              <Rocket className="w-4 h-4" />
              Our Journey
            </div>
            <h2 className="text-4xl font-bold mb-4 font-display">Milestones</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A steady focus on foundations and delivery.
            </p>
          </div>

          <div ref={timelineRef} className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/10 via-brand-500/30 to-brand-500/10" />
              
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-8 mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-brand-500/30 transition-colors">
                      <span className="text-brand-300 font-semibold text-lg">{milestone.year}</span>
                      <p className="text-gray-300 mt-1">{milestone.event}</p>
                    </div>
                  </div>
                  
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-brand-500 rounded-full transform -translate-x-1/2 border-4 border-black" />
                  
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
              Want to work with AXOBITS?
            </h2>
            <p className="text-gray-400 mb-8">
              Share your goals and constraints — we’ll respond with a clear approach and next steps.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-brand-300 transition-colors group"
              >
                Talk to our team
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-white/5 border border-white/10 rounded-full font-medium hover:bg-white/10 transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
