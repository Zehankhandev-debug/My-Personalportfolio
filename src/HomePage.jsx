import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Eye, MessageSquare, Clock, CheckCircle, Code, Menu, X,
  Layout, Server, Globe, Wrench, Briefcase, GraduationCap, Code2,
  Mail, Phone, Github, Linkedin, ExternalLink, Sparkles, ArrowLeft, Sun, Moon,
  Calendar, XCircle, ChevronRight
} from 'lucide-react';

const config = {
  hero: {
    name: "Zehan Khan", 
    title: "Web Developer",
    subheadline: "Full-stack web developer specializing in React, Next.js, and WordPress. I create high-performance, scalable web applications that drive business growth.",
    trustPoints: [
      { value: "6+", label: "Years Experience" }, 
      { value: "150+", label: "Projects Delivered" },
      { value: "100%", label: "Client Satisfaction" }, 
      { value: "24/7", label: "Support Available" }
    ],
    whatsappLink: "https://wa.me/918439858095", 
    phoneLink: "tel:+918439858095",
    email: "zehandev@gmail.com", 
    location: "Aligarh, UP, India"
  },
  skills: {
    "WordPress Development": ["Custom Themes", "Custom Plugins", "WooCommerce", "Elementor", "ACF"],
    "E-commerce Solutions": ["Shopify Apps", "Shopify Themes", "Payment Integration", "Product Management"],
    "Frontend Technologies": ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "HTML5/CSS3"],
    "Backend & CMS": ["PHP", "Node.js", "REST APIs", "SQL", "Custom Development"]
  },
  experience: [
    { 
      company: "Bannpeople", 
      role: "Web Developer", 
      period: "2025 - Present",
      description: "Developing custom web solutions and maintaining client websites with modern technologies.",
      achievements: [
        "Created custom WordPress solutions for various clients", 
        "Implemented responsive designs and mobile optimization",
        "Integrated third-party APIs and payment gateways", 
        "Improved website performance and loading speeds"
      ]
    },
    { 
      company: "Teqexpert", 
      role: "Web Developer", 
      period: "2024 - 2025",
      description: "Leading full-stack development projects, creating custom WordPress themes and React-based applications.",
      achievements: [
        "Developed 15+ custom WordPress themes and plugins", 
        "Built responsive React and Next.js applications",
        "Implemented modern JavaScript patterns and best practices", 
        "Collaborated with cross-functional teams for project delivery"
      ]
    },
    { 
      company: "TZS", 
      role: "Web Developer", 
      period: "2023 - 2024",
      description: "Developed and maintained responsive websites using modern frameworks and technologies.",
      achievements: [
        "Integrated third-party APIs for enhanced functionality", 
        "Utilized Git for version control and Jira for project management",
        "Optimized website performance and user experience", 
        "Maintained back-end systems using PHP"
      ]
    },
    { 
      company: "Unyscape Infocom", 
      role: "Web Developer", 
      period: "2021 - 2023",
      description: "Specialized in custom WordPress development and SEO optimization.",
      achievements: [
        "Increased website traffic through SEO strategies", 
        "Enhanced user experience with responsive designs",
        "Resolved technical issues with minimal downtime", 
        "Collaborated with teams to deliver high-quality products"
      ]
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
  education: [
    { 
      degree: "Diploma in Computer Engineering", 
      institution: "Aligarh Muslim University", 
      year: "2020" 
    }
  ]
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

// Auto Scroll Image Component
const AutoScrollImage = ({ src, alt, isHovered }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [scrollInterval, setScrollInterval] = useState(null);

  useEffect(() => {
    if (isHovered && containerRef.current && imageRef.current) {
      const container = containerRef.current;
      const image = imageRef.current;
      
      if (image.clientHeight > container.clientHeight) {
        const scrollAmount = 2;
        const scrollDelay = 20;
        
        const interval = setInterval(() => {
          if (container.scrollTop + container.clientHeight >= image.clientHeight - 5) {
            container.scrollTop = 0;
          } else {
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setIsVisible(true), delay);
      }, 
      { threshold: 0.05, rootMargin: '50px' }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [delay]);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Schedule Call Popup Component
const ScheduleCallPopup = ({ darkMode, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup Content */}
      <div className={`relative ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 to-black border-gray-800' 
          : 'bg-white border-gray-200'
      } rounded-2xl border max-w-lg w-full overflow-hidden shadow-2xl`}>
        {/* Header */}
        <div className="relative p-6 border-b border-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Calendar size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Schedule a Free Consultation</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Get personalized pricing for your website project
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${
                darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              } transition-colors`}
            >
              <XCircle size={20} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3">What's included in your free consultation:</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Detailed project analysis & scope review
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Customized pricing quote & timeline
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Technical recommendations & best practices
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Q&A session for all your project concerns
                </span>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg mb-6 ${
            darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'
          }`}>
            <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="font-bold text-green-500">No commitment required</span> - Just a friendly chat about your project needs
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-4">
            <a 
              href={config.hero.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-bold text-white hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02] text-center"
              onClick={onClose}
            >
              <div className="flex items-center justify-center gap-2">
                <MessageSquare size={20} />
                Schedule on WhatsApp
              </div>
            </a>
            
            <a 
              href={`mailto:${config.hero.email}?subject=Schedule a Call - Website Project Consultation&body=Hi Zehan, I'd like to schedule a free consultation call for my website project.`}
              className={`block w-full py-3 px-4 ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' 
                  : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
              } rounded-lg font-bold border transition-all duration-300 hover:scale-[1.02] text-center`}
              onClick={onClose}
            >
              <div className="flex items-center justify-center gap-2">
                <Mail size={20} />
                Schedule via Email
              </div>
            </a>
          </div>
        </div>
        
        {/* Footer */}
        <div className={`px-6 py-4 border-t ${
          darkMode ? 'border-gray-800/50 bg-gray-900/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <p className={`text-xs text-center ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            Typically respond within 2-3 hours during business hours
          </p>
        </div>
      </div>
    </div>
  );
};

// Floating CTA Button
const FloatingCTA = ({ darkMode, onClick }) => {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCTA(true);
    }, 10000); // Show after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!showCTA) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <button
        onClick={onClick}
        className="group flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full shadow-lg hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
          <MessageSquare size={20} className="text-white relative z-10" />
        </div>
        <span className="text-white font-bold text-sm">
          Get Free Quote
        </span>
        <ChevronRight size={16} className="text-white group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

const ProjectCard = ({ project, index, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedCard delay={index * 80}>
      <div 
        className={`group ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-blue-500/50' 
            : 'bg-white/50 border-gray-300/50 hover:border-blue-500/50'
        } backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-700 ease-in-out h-full flex flex-col hover:shadow-2xl hover:shadow-blue-500/10`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/10">
          <AutoScrollImage 
            src={project.screenshot} 
            alt={`${project.title} screenshot`}
            isHovered={isHovered}
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`px-3 py-1 ${
              darkMode ? 'bg-black/70' : 'bg-white/70'
            } backdrop-blur-sm rounded-full text-xs font-semibold text-blue-400 border border-blue-500/30`}>
              {project.category}
            </span>
          </div>
          
          {/* Live Site Link */}
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`absolute top-4 right-4 z-10 p-2 ${
              darkMode ? 'bg-black/70' : 'bg-white/70'
            } backdrop-blur-sm rounded-full hover:bg-green-600 transition-all duration-500 hover:scale-110`}
            title="Visit Live Website"
          >
            <ExternalLink size={18} />
          </a>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-all duration-500">
            {project.title}
          </h3>
          <p className={`${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          } mb-6 flex-1 text-sm leading-relaxed`}>
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, i) => (
              <span 
                key={i} 
                className={`px-3 py-1 ${
                  darkMode 
                    ? 'bg-gray-800/50 text-gray-300 border-gray-700/50' 
                    : 'bg-gray-100 text-gray-700 border-gray-300/50'
                } rounded-full text-xs border hover:border-blue-500/50 transition-all duration-500 hover:scale-110`}
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Features */}
          <div className="space-y-2">
            {project.features.map((feature, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-2 text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className={`flex items-center justify-between pt-4 mt-4 border-t ${
            darkMode ? 'border-gray-700/30' : 'border-gray-300/30'
          }`}>
            <div className="flex items-center gap-2 text-blue-400 text-sm">
              <Eye size={14} />
              <span>Featured</span>
            </div>
            <a 
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium text-xs hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 text-white"
            >
              Visit Site
            </a>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

// Scroll Progress Indicator Component
const ScrollProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

// Main Component
export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showCallPopup, setShowCallPopup] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
    }
  };

  // Load theme preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setDarkMode(savedTheme === 'dark');
      }
    }
  }, []);

  // Handle scroll and loading
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => setLoading(false), 3500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Auto-show popup after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCallPopup(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    } transition-colors duration-500`}>
      
      {/* Custom Styles */}
      <style jsx global>{`
        * { 
          scroll-behavior: smooth; 
        }
        @keyframes blink { 
          0%, 100% { opacity: 1; } 
          50% { opacity: 0; } 
        }
        .animate-blink { 
          animation: blink 1s infinite; 
        }
        .overflow-hidden::-webkit-scrollbar { 
          display: none; 
        }
        .overflow-hidden { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>

      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 ${
          darkMode 
            ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]' 
            : 'bg-[radial-gradient(circle_at_50%_50%,rgba(249,250,251,1),rgba(255,255,255,1))]'
        }`} />
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${
          darkMode ? 'bg-blue-600/10' : 'bg-blue-400/20'
        } rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${
          darkMode ? 'bg-purple-600/10' : 'bg-purple-400/20'
        } rounded-full blur-3xl animate-pulse`} style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled 
          ? `py-4 ${darkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-xl ${
              darkMode ? 'border-b border-gray-800/50' : 'border-b border-gray-200/50'
            } shadow-lg` 
          : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Code size={24} className="text-white" />
            </div>
            <div>
              <div className="text-xl font-bold">{config.hero.name}</div>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {config.hero.title}
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => smoothScroll(`#${item.toLowerCase()}`)} 
                className={`${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                } font-medium transition-all duration-500 relative group`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-700" />
              </button>
            ))}
            
            {/* Projects Page Link */}
            <button
              onClick={() => window.location.href = '/projects'}
              className={`${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              } font-medium transition-all duration-500 relative group`}
            >
              All Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-700" />
            </button>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
              } transition-all duration-300 hover:scale-110`}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-blue-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className={`md:hidden p-2 ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
            } rounded-lg transition-colors`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 ${
          darkMode ? 'bg-black/95' : 'bg-white/95'
        } backdrop-blur-xl ${
          darkMode ? 'border-b border-gray-800/50' : 'border-b border-gray-200/50'
        } transition-all duration-700 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[500px] py-6' : 'max-h-0 py-0'
        }`}>
          <div className="flex flex-col gap-4 px-6">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => { 
                  smoothScroll(`#${item.toLowerCase()}`); 
                  setMobileMenuOpen(false); 
                }}
                className={`text-left ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                } font-medium py-2 hover:translate-x-2 transform transition-all duration-300`}
              >
                {item}
              </button>
            ))}
            
            {/* Mobile Projects Page Link */}
            <button
              onClick={() => { 
                window.location.href = '/projects';
                setMobileMenuOpen(false);
              }}
              className={`text-left ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              } font-medium py-2 hover:translate-x-2 transform transition-all duration-300 flex items-center gap-2`}
            >
              <Eye size={16} />
              All Projects
            </button>
            
            {/* Mobile Theme Toggle */}
            <button
              onClick={() => { 
                toggleDarkMode(); 
                setMobileMenuOpen(false); 
              }}
              className={`flex items-center gap-2 px-4 py-2 ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'
              } rounded-lg transition-all duration-300`}
            >
              {darkMode ? (
                <>
                  <Sun size={20} className="text-yellow-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={20} className="text-blue-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />

      {/* Schedule Call Popup */}
      <ScheduleCallPopup 
        darkMode={darkMode} 
        isOpen={showCallPopup} 
        onClose={() => setShowCallPopup(false)} 
      />

      {/* Floating CTA Button */}
      <FloatingCTA 
        darkMode={darkMode} 
        onClick={() => setShowCallPopup(true)} 
      />

      {/* Hero Section */}
      <section id="about" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <AnimatedCard>
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full border border-blue-500/30 text-sm font-semibold flex items-center gap-2">
                <Sparkles size={16} className="text-blue-400 animate-pulse" /> 
                Available for freelance projects
              </span>
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                {config.hero.name}
              </span>
            </h1>
          </AnimatedCard>
          
          <AnimatedCard delay={200}>
            <p className={`text-2xl md:text-3xl ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            } mb-4 font-semibold`}>
              {config.hero.title}
            </p>
          </AnimatedCard>
          
          <AnimatedCard delay={300}>
            <p className={`text-xl md:text-2xl ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            } max-w-4xl mx-auto mb-12 leading-relaxed`}>
              {config.hero.subheadline}
            </p>
          </AnimatedCard>
          
          <AnimatedCard delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a 
                href={config.hero.whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 text-white"
              >
                <MessageSquare size={20} /> 
                Start a Conversation 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <button 
                onClick={() => smoothScroll('#projects')} 
                className={`px-8 py-4 ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' 
                    : 'bg-white hover:bg-gray-50 border-gray-300'
                } rounded-xl font-bold flex items-center justify-center gap-3 border transition-all duration-300 hover:scale-105`}
              >
                <Eye size={20} /> View My Work
              </button>
            </div>
          </AnimatedCard>
          
          <AnimatedCard delay={500}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {config.hero.trustPoints.map((point, i) => (
                <div 
                  key={i} 
                  className={`${
                    darkMode 
                      ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-blue-500/50' 
                      : 'bg-white/50 border-gray-300/50 hover:border-blue-500/50'
                  } backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20`}
                >
                  <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    {point.value}
                  </div>
                  <div className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  } text-sm`}>
                    {point.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedCard>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full text-sm font-semibold mb-6 border border-green-500/30">
                🛠️ Technical Skills
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  My Tech Stack
                </span>
              </h2>
              <p className={`text-xl ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              } max-w-3xl mx-auto`}>
                Modern technologies and tools I use to build amazing web experiences
              </p>
            </div>
          </AnimatedCard>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(config.skills).map(([category, skills], i) => (
              <AnimatedCard key={category} delay={i * 100}>
                <div className={`${
                  darkMode 
                    ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-blue-500/50' 
                    : 'bg-white/50 border-gray-300/50 hover:border-blue-500/50'
                } backdrop-blur-sm rounded-2xl p-8 border h-full transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20`}>
                  <div className="flex items-center gap-3 mb-6">
                    {category === 'WordPress Development' && <Globe size={24} className="text-blue-400" />}
                    {category === 'E-commerce Solutions' && <Layout size={24} className="text-blue-400" />}
                    {category === 'Frontend Technologies' && <Code2 size={24} className="text-blue-400" />}
                    {category === 'Backend & CMS' && <Server size={24} className="text-blue-400" />}
                    <h3 className="text-xl font-bold">{category}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <AnimatedCard>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-600/20 to-amber-600/20 rounded-full text-sm font-semibold mb-6 border border-orange-500/30">
                💼 Professional Journey
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Work Experience
                </span>
              </h2>
              <p className={`text-xl ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              } max-w-3xl mx-auto`}>
                My professional journey through various roles and companies
              </p>
            </div>
          </AnimatedCard>
          
          <div className="relative max-w-3xl mx-auto">
            {config.experience.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l border-gray-700 pb-10 last:pb-0 group">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-800 border border-blue-500 group-hover:scale-125 transition-transform duration-300" />
                <div className={`${
                  darkMode 
                    ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-blue-500/50' 
                    : 'bg-white/50 border-gray-300/50 hover:border-blue-500/50'
                } backdrop-blur-sm rounded-xl p-6 border transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 ml-4`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors duration-500">
                      {exp.role}
                    </h3>
                    <span className={`px-3 py-1 ${
                      darkMode ? 'bg-gray-800 text-blue-400' : 'bg-blue-100 text-blue-600'
                    } rounded-full text-sm font-semibold mt-2 md:mt-0`}>
                      {exp.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase size={16} className={darkMode ? 'text-gray-500' : 'text-gray-600'} />
                    <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {exp.company}
                    </span>
                  </div>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                    {exp.description}
                  </p>
                  <div className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle size={16} className="text-green-500 mt-1 flex-shrink-0" />
                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedCard>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-full text-sm font-semibold mb-6 border border-pink-500/30">
                🚀 Featured Work
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Portfolio Projects
                </span>
              </h2>
              <p className={`text-xl ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              } max-w-3xl mx-auto`}>
                A showcase of my recent projects and client work
              </p>
            </div>
          </AnimatedCard>
          
          <div className="grid md:grid-cols-2 gap-8">
            {config.projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
                darkMode={darkMode} 
              />
            ))}
          </div>
          
          {/* Projects CTA Section */}
          <AnimatedCard delay={200}>
            <div className={`mt-16 text-center ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800/30 to-gray-900/30 border-gray-700/50' 
                : 'bg-white/30 border-gray-300/50'
            } backdrop-blur-sm rounded-2xl p-8 md:p-12 border`}>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Want to see more projects?
              </h3>
              <p className={`text-lg mb-8 max-w-2xl mx-auto ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Browse my complete portfolio with detailed case studies and client testimonials.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* View All Projects Button */}
                <button
                  onClick={() => window.location.href = '/projects'}
                  className={`px-8 py-3 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border-blue-500/30' 
                      : 'bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 border-blue-300'
                  } border rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105`}
                >
                  <Eye size={20} /> 
                  View All Projects
                </button>
                
                {/* Schedule Call Button */}
                <button
                  onClick={() => setShowCallPopup(true)}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 text-white"
                >
                  <Calendar size={20} /> 
                  Get Free Quote
                </button>
              </div>
              
              {/* Additional Links */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
                <button 
                  onClick={() => window.location.href = '/projects'}
                  className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm flex items-center gap-2`}
                >
                  <Eye size={14} />
                  Browse All Projects
                </button>
                <span className={`${darkMode ? 'text-gray-700' : 'text-gray-400'}`}>•</span>
                <button
                  onClick={() => setShowCallPopup(true)}
                  className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm flex items-center gap-2`}
                >
                  <Calendar size={14} />
                  Schedule Consultation
                </button>
                <span className={`${darkMode ? 'text-gray-700' : 'text-gray-400'}`}>•</span>
                <a 
                  href={config.hero.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm flex items-center gap-2`}
                >
                  <MessageSquare size={14} />
                  Quick Chat
                </a>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <AnimatedCard>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-600/20 to-violet-600/20 rounded-full text-sm font-semibold mb-6 border border-indigo-500/30">
                🎓 Education
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Academic Background
                </span>
              </h2>
              <p className={`text-xl ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              } max-w-3xl mx-auto`}>
                Formal education and certifications
              </p>
            </div>
          </AnimatedCard>
          
          <div className="max-w-2xl mx-auto">
            {config.education.map((edu, index) => (
              <AnimatedCard key={index} delay={index * 100}>
                <div className={`${
                  darkMode 
                    ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-blue-500/50' 
                    : 'bg-white/50 border-gray-300/50 hover:border-blue-500/50'
                } backdrop-blur-sm rounded-2xl p-8 border transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 h-full`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl flex items-center justify-center">
                      <GraduationCap size={24} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {edu.institution}
                      </p>
                    </div>
                  </div>
                  <div className={`inline-block px-4 py-2 ${
                    darkMode ? 'bg-gray-800 text-blue-400' : 'bg-blue-100 text-blue-600'
                  } rounded-full text-sm font-semibold`}>
                    {edu.year}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <AnimatedCard>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-600/20 to-sky-600/20 rounded-full text-sm font-semibold mb-6 border border-cyan-500/30">
                📞 Get In Touch
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Let's Work Together
                </span>
              </h2>
              <p className={`text-xl ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              } max-w-3xl mx-auto`}>
                Have a project in mind? Contact me directly via email or WhatsApp
              </p>
            </div>
          </AnimatedCard>
          
          <div className={`${
            darkMode 
              ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50' 
              : 'bg-white/50 border-gray-300/50'
          } backdrop-blur-sm rounded-3xl p-8 md:p-12 border max-w-4xl mx-auto`}>
            <div className="text-center space-y-8">
              {/* Direct Contact Buttons */}
              <div className="grid md:grid-cols-2 gap-6">
                <a 
                  href={`mailto:${config.hero.email}`}
                  className={`flex flex-col items-center justify-center gap-4 p-8 ${
                    darkMode 
                      ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border-blue-500/30' 
                      : 'bg-gradient-to-br from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 border-blue-300'
                  } border rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20`}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Mail size={32} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Email</h4>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {config.hero.email}
                    </p>
                  </div>
                </a>
                
                <a 
                  href={config.hero.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center gap-4 p-8 ${
                    darkMode 
                      ? 'bg-gradient-to-br from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 border-green-500/30' 
                      : 'bg-gradient-to-br from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 border-green-300'
                  } border rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20`}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                    <MessageSquare size={32} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">WhatsApp</h4>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      +91 8439858095
                    </p>
                  </div>
                </a>
              </div>
              
              {/* Free Consultation CTA */}
              <div className={`p-6 rounded-xl ${
                darkMode 
                  ? 'bg-gradient-to-br from-green-600/10 to-emerald-600/10 border border-green-500/20' 
                  : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
              }`}>
                <h4 className="text-xl font-bold mb-3">Need a website? Get a free consultation!</h4>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Schedule a free call to discuss your project requirements and get a personalized quote
                </p>
                <button
                  onClick={() => setShowCallPopup(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-bold text-white hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
                >
                  <Calendar size={18} />
                  Schedule Free Call
                </button>
              </div>
              
              {/* Contact CTA */}
              <div className="pt-8 border-t border-gray-700/30">
                <p className={`text-lg mb-8 max-w-2xl mx-auto ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Don't hesitate to reach out! I'm excited to hear about your project ideas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href={config.hero.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 text-white"
                  >
                    <MessageSquare size={20} /> 
                    Message on WhatsApp
                  </a>
                  <a 
                    href={`mailto:${config.hero.email}`}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 text-white"
                  >
                    <Mail size={20} /> 
                    Send an Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-6 border-t ${
        darkMode ? 'border-gray-800/50' : 'border-gray-300/50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className={`${darkMode ? 'text-gray-500' : 'text-gray-600'} mb-2`}>
                © {new Date().getFullYear()} {config.hero.name}. All rights reserved.
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-500'}`}>
                Web Developer specializing in React, Next.js & WordPress
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6">
              <button 
                onClick={() => smoothScroll('#about')}
                className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors flex items-center gap-2 text-sm`}
              >
                <ArrowLeft size={14} /> Back to Top
              </button>
              <button 
                onClick={() => window.location.href = '/projects'}
                className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors flex items-center gap-2 text-sm`}
              >
                <Eye size={14} /> All Projects
              </button>
              <button
                onClick={() => setShowCallPopup(true)}
                className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors flex items-center gap-2 text-sm`}
              >
                <Calendar size={14} /> Get Quote
              </button>
              <button 
                onClick={toggleDarkMode}
                className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors flex items-center gap-2 text-sm`}
              >
                {darkMode ? (
                  <>
                    <Sun size={14} /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={14} /> Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}