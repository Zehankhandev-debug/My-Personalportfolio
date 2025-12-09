import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Eye, MessageSquare, Clock, CheckCircle, Code, Menu, X,
  Layout, Server, Globe, Wrench, Briefcase, GraduationCap, Code2,
  Mail, Phone, Github, Linkedin, ExternalLink, Sparkles, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const config = {
  hero: {
    name: "Zehan Khan", title: "Web Developer",
    subheadline: "Full-stack web developer specializing in React, Next.js, and WordPress. I create high-performance, scalable web applications that drive business growth.",
    trustPoints: [
      { value: "6+", label: "Years Experience" }, { value: "150+", label: "Projects Delivered" },
      { value: "100%", label: "Client Satisfaction" }, { value: "24/7", label: "Support Available" }
    ],
    whatsappLink: "https://wa.me/918439858095", phoneLink: "tel:+918439858095",
    email: "zehandev@gmail.com", location: "Aligarh, UP, India"
  },
  skills: {
    "WordPress Development": ["Custom Themes", "Custom Plugins", "WooCommerce", "Elementor", "ACF"],
    "E-commerce Solutions": ["Shopify Apps", "Shopify Themes", "Payment Integration", "Product Management"],
    "Frontend Technologies": ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "HTML5/CSS3"],
    "Backend & CMS": ["PHP", "Node.js", "REST APIs", "SQL", "Custom Development"]
  },
  experience: [
    { company: "Bannpeople", role: "Web Developer", period: "2025 - Present",
      description: "Developing custom web solutions and maintaining client websites with modern technologies.",
      achievements: ["Created custom WordPress solutions for various clients", "Implemented responsive designs and mobile optimization",
        "Integrated third-party APIs and payment gateways", "Improved website performance and loading speeds"]
    },
    { company: "Teqexpert", role: "Web Developer", period: "2024 - 2025",
      description: "Leading full-stack development projects, creating custom WordPress themes and React-based applications.",
      achievements: ["Developed 15+ custom WordPress themes and plugins", "Built responsive React and Next.js applications",
        "Implemented modern JavaScript patterns and best practices", "Collaborated with cross-functional teams for project delivery"]
    },
    { company: "TZS", role: "Web Developer", period: "2023 - 2024",
      description: "Developed and maintained responsive websites using modern frameworks and technologies.",
      achievements: ["Integrated third-party APIs for enhanced functionality", "Utilized Git for version control and Jira for project management",
        "Optimized website performance and user experience", "Maintained back-end systems using PHP"]
    },
    { company: "Unyscape Infocom", role: "Web Developer", period: "2021 - 2023",
      description: "Specialized in custom WordPress development and SEO optimization.",
      achievements: ["Increased website traffic through SEO strategies", "Enhanced user experience with responsive designs",
        "Resolved technical issues with minimal downtime", "Collaborated with teams to deliver high-quality products"]
    }
  ],
  projects: [
    { 
      id: 1, 
      title: "Supreme Cars Singapore", 
      category: "E-commerce", 
      url: "https://supremecars.com.sg/",
      description: "Luxury car dealership website with advanced booking system and inventory management.",
      technologies: ["WordPress", "PHP", "JavaScript", "Custom Theme"],
      features: ["Inventory Management", "Booking System", "Responsive Design"],
      screenshot: "/projects/supreme-cars.png"
    },
    { 
      id: 2, 
      title: "Comviva", 
      category: "Enterprise", 
      url: "https://www.comviva.com",
      description: "Enterprise-level corporate website with dynamic content management.",
      technologies: ["WordPress", "React", "Custom Development"],
      features: ["Multi-language Support", "Custom CMS", "Performance Optimized"],
      screenshot: "/projects/comviva.png"
    },
    { 
      id: 3, 
      title: "BFP Minc", 
      category: "Corporate", 
      url: "https://bfpminc.com",
      description: "Professional corporate website with modern design and functionality.",
      technologies: ["WordPress", "Elementor", "Custom CSS"],
      features: ["Modern Design", "Contact Forms", "SEO Optimized"],
      screenshot: "/projects/bfp-minc.png"
    },
    { 
      id: 4, 
      title: "Kandidatencheck", 
      category: "Platform", 
      url: "https://kandidatencheck.net/",
      description: "Interactive candidate evaluation platform with custom functionality.",
      technologies: ["Custom Development", "JavaScript", "PHP"],
      features: ["Custom Forms", "Data Analytics", "User Dashboard"],
      screenshot: "/projects/kandidatencheck.png"
    }
  ],
  education: [{ degree: "Diploma in Computer Engineering", institution: "Aligarh Muslim University", year: "2020" }]
};

// Preloader Component
const Preloader = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Zehan Khan';

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-950 via-black to-gray-900 flex items-center justify-center overflow-hidden">
      <div className="relative">
        <h1 className="text-6xl md:text-8xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {displayText}
          </span>
          <span className="inline-block w-1 h-16 md:h-24 bg-gradient-to-b from-blue-400 to-purple-400 ml-1 animate-blink"></span>
        </h1>
      </div>
    </div>
  );
};

// Fast AutoScroll Component for images
const AutoScrollImage = ({ src, alt, isHovered }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [scrollInterval, setScrollInterval] = useState(null);

  useEffect(() => {
    if (isHovered && containerRef.current && imageRef.current) {
      const container = containerRef.current;
      const image = imageRef.current;
      
      // Only auto-scroll if image is taller than container
      if (image.clientHeight > container.clientHeight) {
        const scrollAmount = 2; // Faster scrolling
        const scrollDelay = 20; // Reduced delay for faster scrolling
        
        const interval = setInterval(() => {
          if (container.scrollTop + container.clientHeight >= image.clientHeight - 5) {
            // If at bottom, reset to top
            container.scrollTop = 0;
          } else {
            // Otherwise scroll down faster
            container.scrollTop += scrollAmount;
          }
        }, scrollDelay);
        
        setScrollInterval(interval);
        
        return () => {
          clearInterval(interval);
          setScrollInterval(null);
        };
      }
    } else if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  }, [isHovered]);

  const handleMouseEnter = () => {
    // Reset scroll position when mouse enters
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-auto min-h-full object-cover"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentElement.style.background = 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))';
        }}
      />
    </div>
  );
};

const smoothScroll = (target) => {
  const element = document.querySelector(target);
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const AnimatedCard = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setTimeout(() => setIsVisible(true), delay);
    }, { threshold: 0.05, rootMargin: '50px' });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [delay]);

  return (
    <div ref={ref} className={`transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'} ${className}`}>
      {children}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedCard delay={index * 80}>
      <div 
        className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-700 ease-in-out h-full flex flex-col hover:shadow-2xl hover:shadow-blue-500/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container - Fixed height with auto-scroll */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/10">
          <AutoScrollImage 
            src={project.screenshot} 
            alt={`${project.title} screenshot`}
            isHovered={isHovered}
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-400 border border-blue-500/30 transition-all duration-500">
              {project.category}
            </span>
          </div>
          
          {/* Live Site Link */}
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="absolute top-4 right-4 z-10 p-2 bg-black/70 backdrop-blur-sm rounded-full hover:bg-green-600 transition-all duration-500 hover:scale-110 transform hover:rotate-12"
            title="Visit Live Website"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={18} />
          </a>
        </div>
        
        {/* Content Below Image - Always visible */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-all duration-500 ease-in-out">{project.title}</h3>
          <p className="text-gray-400 mb-6 flex-1 text-sm leading-relaxed transition-all duration-500">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, i) => (
              <span 
                key={i} 
                className="px-3 py-1 bg-gray-800/50 rounded-full text-xs text-gray-300 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-110 hover:-translate-y-1"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="space-y-2">
            {project.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-400 transition-all duration-300 hover:translate-x-1">
                <CheckCircle size={16} className="text-green-500 flex-shrink-0 transition-transform duration-500 group-hover:rotate-12" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-700/30">
            <div className="flex items-center gap-2 text-blue-400 text-sm">
              <Eye size={14} />
              <span>Featured Project</span>
            </div>
            <div className="flex gap-2">
              <a 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium text-xs hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                onClick={(e) => e.stopPropagation()}
              >
                Visit Site
              </a>
              <Link
                to="/projects"
                className="px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg font-medium text-xs border border-gray-700/50 transition-all duration-300 hover:scale-105"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  // Add Google Site Verification meta tag
  useEffect(() => {
    // Create meta tag
    const metaTag = document.createElement('meta');
    metaTag.name = 'google-site-verification';
    metaTag.content = 'm6D-Ihlpamo32dttft-N7FinIxgoFoyp7neNF6DdWBs';
    
    // Check if tag already exists
    const existingTag = document.querySelector('meta[name="google-site-verification"]');
    if (!existingTag) {
      // Add to head
      document.head.appendChild(metaTag);
    }
    
    // Cleanup on unmount
    return () => {
      if (document.head.contains(metaTag)) {
        document.head.removeChild(metaTag);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      <style>{`
        * { scroll-behavior: smooth; }
        @keyframes pulse { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.2; } }
        .animate-pulse { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(-15px); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); } }
        .animate-bounce { animation: bounce 3s infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
        .animate-progress { animation: progress 2s ease-in-out infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .animate-blink { animation: blink 1s infinite; }
        
        /* Custom scrollbar styling for auto-scroll container */
        .overflow-hidden::-webkit-scrollbar {
          display: none;
        }
        
        .overflow-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: rgba(17, 24, 39, 0.5); backdrop-filter: blur(10px); }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #3b82f6, #8b5cf6); border-radius: 5px; transition: background 0.3s ease; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #2563eb, #7c3aed); }
        iframe { scrollbar-width: none; -ms-overflow-style: none; }
        iframe::-webkit-scrollbar { display: none; }
        button, a, .group { transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        * { transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 0.5s; }
      `}</style>

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${scrolled ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-lg shadow-black/50' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Code size={24} />
            </div>
            <div>
              <div className="text-xl font-bold">{config.hero.name}</div>
              <div className="text-xs text-gray-400">{config.hero.title}</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button key={item} onClick={() => smoothScroll(`#${item.toLowerCase()}`)} className="text-gray-300 hover:text-white font-medium transition-all duration-500 relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-700 ease-in-out" />
              </button>
            ))}
          </div>
          <Link to="/projects" className="hidden md:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-700 hover:scale-110 transform">
            <ArrowRight size={18} /> All Projects
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-gray-800/50 transition-all duration-700 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-96 py-6' : 'max-h-0 py-0'}`}>
          <div className="flex flex-col gap-4 px-6">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button key={item} onClick={() => { smoothScroll(`#${item.toLowerCase()}`); setMobileMenuOpen(false); }}
                className="text-left text-gray-300 hover:text-white font-medium transition-colors py-2 hover:translate-x-2 transform duration-300">{item}</button>
            ))}
            <Link to="/projects" className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold mt-4 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
              <ArrowRight size={18} /> All Projects
            </Link>
          </div>
        </div>
      </nav>

      <section id="about" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <AnimatedCard>
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full border border-blue-500/30 text-sm font-semibold flex items-center gap-2">
                <Sparkles size={16} className="text-blue-400 animate-pulse" /> Available for freelance projects
              </span>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">{config.hero.name}</span>
            </h1>
          </AnimatedCard>
          <AnimatedCard delay={200}>
            <p className="text-2xl md:text-3xl text-gray-400 mb-4 font-semibold">{config.hero.title}</p>
          </AnimatedCard>
          <AnimatedCard delay={300}>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">{config.hero.subheadline}</p>
          </AnimatedCard>
          <AnimatedCard delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a href={config.hero.whatsappLink} target="_blank" rel="noopener noreferrer" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 transform">
                <MessageSquare size={20} /> Start a Conversation <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button onClick={() => smoothScroll('#projects')} className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold flex items-center justify-center gap-3 border border-gray-700 transition-all duration-300 hover:scale-105 transform">
                <Eye size={20} /> View My Work
              </button>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={500}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {config.hero.trustPoints.map((point, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 transform hover:shadow-lg hover:shadow-blue-500/20">
                  <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{point.value}</div>
                  <div className="text-gray-400 text-sm">{point.label}</div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-gray-500 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedCard>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full text-sm font-semibold mb-6 border border-green-500/30">🛠️ Technical Skills</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">My Tech Stack</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">Modern technologies and tools I use to build amazing web experiences</p>
            </div>
          </AnimatedCard>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(config.skills).map(([category, skills], i) => (
              <AnimatedCard key={category} delay={i * 100}>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 h-full hover:border-blue-500/50 transition-all duration-500 hover:scale-105 transform hover:shadow-lg hover:shadow-blue-500/20">
                  <div className="flex items-center gap-3 mb-6">
                    {category === 'WordPress Development' && <Globe size={24} className="text-blue-400" />}
                    {category === 'E-commerce Solutions' && <Layout size={24} className="text-green-400" />}
                    {category === 'Frontend Technologies' && <Code size={24} className="text-purple-400" />}
                    {category === 'Backend & CMS' && <Server size={24} className="text-orange-400" />}
                    <h3 className="text-xl font-bold">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, j) => (
                      <span key={j} className="px-3 py-1 bg-gray-800/50 rounded-lg text-sm text-gray-300 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 transform cursor-default">{skill}</span>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <AnimatedCard>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full text-sm font-semibold mb-6 border border-purple-500/30">💼 Work History</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Professional Experience</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">My journey through the world of web development</p>
            </div>
          </AnimatedCard>
          <div className="space-y-8">
            {config.experience.map((exp, i) => (
              <AnimatedCard key={i} delay={i * 150}>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] transform hover:shadow-lg hover:shadow-blue-500/20">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-white">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                        <Briefcase size={18} /> <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 mt-2 md:mt-0">
                      <Clock size={18} /> <span>{exp.period}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>
                  <div className="space-y-3">
                    {exp.achievements.map((achievement, j) => (
                      <div key={j} className="flex items-start gap-3 group">
                        <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-gray-400">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
          <AnimatedCard delay={450}>
            <div className="mt-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap size={28} className="text-blue-400" />
                <h3 className="text-2xl font-bold">Education</h3>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">{config.education[0].degree}</h4>
                  <p className="text-gray-400">{config.education[0].institution}</p>
                </div>
                <div className="text-gray-400 mt-2 md:mt-0">{config.education[0].year}</div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedCard>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-full text-sm font-semibold mb-6 border border-pink-500/30">🚀 Portfolio</span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Featured Projects</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">A selection from 150+ websites and applications I've built for clients worldwide</p>
            </div>
          </AnimatedCard>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {config.projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <AnimatedCard delay={400}>
            <div className="text-center mt-12">
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-500 hover:scale-110 transform group"
              >
                View All 150+ Projects
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </AnimatedCard>
        </div>
      </section>

      <section id="contact" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedCard>
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-8 border border-blue-500/30">📞 Let's Connect</span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Get In Touch</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">Have a project in mind? Let's discuss how we can work together to bring your vision to life.</p>
          </AnimatedCard>
          <AnimatedCard delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <a href={config.hero.whatsappLink} target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-green-500/50 transition-all duration-500 hover:scale-105 transform hover:shadow-lg hover:shadow-green-500/20 flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                <p className="text-gray-400 mb-4">Quickest response</p>
                <span className="text-blue-400 group-hover:text-green-400 transition-colors">Message Now →</span>
              </a>
              <a href={config.hero.phoneLink} className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 transform hover:shadow-lg hover:shadow-blue-500/20 flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Phone size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone Call</h3>
                <p className="text-gray-400 mb-4">Direct conversation</p>
                <span className="text-blue-400 group-hover:text-purple-400 transition-colors">Call Now →</span>
              </a>
              <a href={`mailto:${config.hero.email}`} className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-500 hover:scale-105 transform hover:shadow-lg hover:shadow-pink-500/20 flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Mail size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-400 mb-4">{config.hero.email}</p>
                <span className="text-blue-400 group-hover:text-pink-400 transition-colors">Send Email →</span>
              </a>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="text-xl font-bold">Location</h3>
                </div>
                <p className="text-gray-300">Aligarh, UP, India</p>
                <p className="text-gray-400 text-sm mt-2">Open to remote work worldwide</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Clock size={24} className="text-blue-400" />
                  <h3 className="text-xl font-bold">Availability</h3>
                </div>
                <p className="text-gray-300">Currently available for new projects</p>
                <p className="text-gray-400 text-sm mt-2">Response time: Within 24 hours</p>
              </div>
            </div>
          </AnimatedCard>
          <AnimatedCard delay={300}>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://github.com/Zehankhandev-debug" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm rounded-xl border border-gray-700/50 flex items-center gap-2 hover:scale-105 transition-all duration-300">
                <Github size={20} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/zehan-khan-aa8a2a1b9/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gray-800/50 hover:bg-blue-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 flex items-center gap-2 hover:scale-105 transition-all duration-300">
                <Linkedin size={20} /> LinkedIn
              </a>
              <a href="/Zehankhan.pdf" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-gray-800/50 hover:bg-purple-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 flex items-center gap-2 hover:scale-105 transition-all duration-300">
                <Briefcase size={20} /> Resume
              </a>
            </div>
          </AnimatedCard>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Code2 size={20} />
              </div>
              <div>
                <div className="text-xl font-bold">{config.hero.name}</div>
                <div className="text-gray-400 text-sm">{config.hero.title}</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a href="#about" onClick={(e) => { e.preventDefault(); smoothScroll('#about'); }} className="text-gray-400 hover:text-white transition-colors text-sm">About</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); smoothScroll('#projects'); }} className="text-gray-400 hover:text-white transition-colors text-sm">Projects</a>
              <Link to="/projects" className="text-gray-400 hover:text-white transition-colors text-sm">All Projects</Link>
              <a href="#contact" onClick={(e) => { e.preventDefault(); smoothScroll('#contact'); }} className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a>
            </div>
            <div className="text-gray-400 text-xs text-center md:text-right">
              <p>© {new Date().getFullYear()} {config.hero.name}. All rights reserved.</p>
              <p className="mt-1">Made with ❤️ using React & Tailwind CSS</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800/50 text-center text-gray-500 text-xs">
            <p>Designed & Developed by {config.hero.name}</p>
            <p className="mt-1">Aligarh, Uttar Pradesh, India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}