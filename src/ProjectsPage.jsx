import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ExternalLink, CheckCircle, Code, MessageSquare, Phone, Eye, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';

const config = {
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
    },
    { 
      id: 5, 
      title: "Compu-Mail", 
      category: "Technology", 
      url: "https://www.compu-mail.com/",
      description: "Technology services website with modern interface.",
      technologies: ["WordPress", "WooCommerce", "Custom Theme"],
      features: ["Service Showcase", "Contact Integration", "Responsive Layout"],
      screenshot: "/projects/compu-mail.png"
    },
    { 
      id: 6, 
      title: "CS Electric", 
      category: "Industrial", 
      url: "https://cselectric.co.in",
      description: "Industrial electrical solutions website with product catalog.",
      technologies: ["WordPress", "Custom Theme", "Product Catalog"],
      features: ["Product Management", "Quote System", "Mobile Optimized"],
      screenshot: "/projects/cs-electric.png"
    },
    { 
      id: 7, 
      title: "Huntsman Sports", 
      category: "E-commerce", 
      url: "https://huntsmansports.com",
      description: "Sports equipment and apparel e-commerce platform.",
      technologies: ["WooCommerce", "WordPress", "Custom Design"],
      features: ["Product Catalog", "Shopping Cart", "Payment Integration"],
      screenshot: "/projects/huntsman.png"
    },
    { 
      id: 8, 
      title: "Native Sutra", 
      category: "E-commerce", 
      url: "https://nativesutra.com/",
      description: "Natural beauty and wellness products online store.",
      technologies: ["Shopify", "Liquid", "Custom Theme"],
      features: ["Product Management", "Checkout Optimization", "SEO"],
      screenshot: "/projects/native.png"
    },
    { 
      id: 9, 
      title: "Fast Track Solutions", 
      category: "Corporate", 
      url: "https://fasttracksolutions.ae/",
      description: "Business consulting and solutions provider website.",
      technologies: ["WordPress", "Custom Development", "Elementor"],
      features: ["Service Pages", "Contact Forms", "Responsive Design"],
      screenshot: "/projects/fast-track.png"
    },
    { 
      id: 10, 
      title: "Eldon Aesthetics", 
      category: "Healthcare", 
      url: "https://eldonaesthetics.co.uk/",
      description: "Aesthetic clinic website with appointment booking and service showcase.",
      technologies: ["WordPress", "Custom Theme", "Booking System"],
      features: ["Service Showcase", "Appointment Booking", "Patient Portal"],
      screenshot: "/projects/eldon-aesthetics.png"
    },
    { 
      id: 11, 
      title: "Pharma Solutions International", 
      category: "Healthcare", 
      url: "https://pharmasolutions-int.com/",
      description: "Pharmaceutical solutions and services provider.",
      technologies: ["WordPress", "Custom Development"],
      features: ["Product Catalog", "Information Management", "Contact Forms"],
      screenshot: "/projects/pharma.png"
    },
    { 
      id: 12, 
      title: "MD Life", 
      category: "Healthcare", 
      url: "https://md.life/",
      description: "Medical professionals platform and healthcare services.",
      technologies: ["Custom Development", "React", "API Integration"],
      features: ["User Dashboard", "Appointment System", "Real-time Updates"],
      screenshot: "/projects/md-life.png"
    }
  ]
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
        const scrollAmount = 2; // Increased from 1 to 2 for faster scrolling
        const scrollDelay = 20; // Reduced from 30ms to 20ms for faster scrolling
        
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

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [hoveredProject, setHoveredProject] = useState(null);
  
  const categories = ['All', 'E-commerce', 'Enterprise', 'Corporate', 'Platform', 'Technology', 'Industrial', 'Healthcare'];

  const filteredProjects = filter === 'All' 
    ? config.projects 
    : config.projects.filter(project => project.category === filter);

  const handleProjectClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLiveSiteClick = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleViewProjectClick = (e, url) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">
      {/* Background effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1),rgba(0,0,0,1))]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-lg shadow-black/50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Code size={24} />
              </div>
              <div>
                <div className="text-xl font-bold">Zehan Khan</div>
                <div className="text-xs text-gray-400">Web Developer</div>
              </div>
            </Link>
          </div>
          <Link 
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={18} /> Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-full text-sm font-semibold mb-6 border border-pink-500/30">
              🖼️ Project Gallery
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Featured Projects
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              A selection from 150+ websites and applications I've built for clients worldwide
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 max-w-2xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">150+</div>
                <div className="text-gray-400">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{categories.length - 1}</div>
                <div className="text-gray-400">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">100%</div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">6+ Years</div>
                <div className="text-gray-400">Experience</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/50">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50'
                      : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-gray-400">View:</span>
              <div className="flex bg-gray-800/50 backdrop-blur-sm rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-blue-600/50 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-blue-600/50 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Project Count Info */}
          <div className="mb-8 p-4 bg-gradient-to-br from-gray-800/20 to-gray-900/20 backdrop-blur-sm rounded-xl border border-gray-700/30">
            <div className="text-center">
              <span className="text-blue-400 font-semibold">Showing {filteredProjects.length} featured projects</span>
              <span className="text-gray-400 mx-2">•</span>
              <span className="text-gray-300">From a portfolio of 150+ completed projects</span>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1'} gap-8`}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-700 ease-in-out"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image Container - Fixed height with auto-scroll */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-900/10 to-purple-900/10">
                  <AutoScrollImage 
                    src={project.screenshot} 
                    alt={`${project.title} screenshot`}
                    isHovered={hoveredProject === project.id}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-400 border border-blue-500/30">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Live Site Link */}
                  <button 
                    onClick={(e) => handleLiveSiteClick(e, project.url)}
                    className="absolute top-4 right-4 z-10 p-2 bg-black/70 backdrop-blur-sm rounded-full hover:bg-green-600 transition-all duration-500 hover:scale-110 transform"
                    title="Visit Live Website"
                  >
                    <ExternalLink size={18} />
                  </button>
                </div>
                
                {/* Content Below Image - Always visible */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 bg-gray-800/50 backdrop-blur-sm rounded text-xs text-gray-300 border border-gray-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-300">
                        <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
                    <div className="flex items-center gap-2 text-blue-400 text-sm">
                      <Eye size={14} />
                      <span>Featured Project</span>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleProjectClick(project.url)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                      >
                        Visit Site
                      </button>
                      <button 
                        onClick={(e) => handleViewProjectClick(e, project.url)}
                        className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg font-semibold text-sm border border-gray-700/50 transition-all duration-300 hover:scale-105"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-2xl font-bold mb-4">No featured projects in this category</h3>
              <p className="text-gray-400 mb-8">Try selecting a different category</p>
              <button
                onClick={() => setFilter('All')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                Show All Featured Projects
              </button>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
              <Eye size={20} className="text-blue-400" />
              <span className="text-gray-300">These are {config.projects.length} featured projects from my portfolio of 150+ delivered projects</span>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-700/30 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">150+</div>
              <div className="text-gray-300">Projects Delivered</div>
              <div className="text-gray-400 text-sm mt-1">{config.projects.length} featured here</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/20 to-purple-700/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-700/30 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">6+ Years</div>
              <div className="text-gray-300">Experience</div>
              <div className="text-gray-400 text-sm mt-1">Since 2018</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-green-700/20 backdrop-blur-sm rounded-2xl p-6 border border-green-700/30 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-gray-300">Client Satisfaction</div>
              <div className="text-gray-400 text-sm mt-1">Repeat clients</div>
            </div>
            <div className="bg-gradient-to-br from-orange-900/20 to-orange-700/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-700/30 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
              <div className="text-gray-300">Support Available</div>
              <div className="text-gray-400 text-sm mt-1">Always ready to help</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Ready to Add Your Project?</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                With 150+ projects delivered successfully, I have the experience to handle any web development challenge.
                Let's work together to create something amazing for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/918439858095"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                >
                  <MessageSquare size={20} /> Start a Conversation
                </a>
                <a
                  href="tel:+918439858095"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                >
                  <Phone size={20} /> Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Code size={24} />
              </div>
              <div>
                <div className="text-2xl font-bold">Zehan Khan</div>
                <div className="text-gray-400">Web Developer • 150+ Projects</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link>
            </div>
            <div className="text-gray-400 text-sm text-center md:text-right">
              <p>© {new Date().getFullYear()} Zehan Khan. All rights reserved.</p>
              <p className="mt-1">150+ projects delivered worldwide since 2018</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Add custom styles */}
      <style jsx>{`
        /* Custom scrollbar styling for auto-scroll container */
        .overflow-hidden::-webkit-scrollbar {
          display: none;
        }
        
        .overflow-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Smooth transitions */
        * {
          transition-property: opacity, transform, filter, background-color, border-color;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }
      `}</style>
    </div>
  );
}