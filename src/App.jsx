import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useInView,
  animate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  ExternalLink,
  Eye,
  FileCode,
  Figma,
  Github,
  Grid,
  List,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Server,
  Wind,
  X,
  XCircle,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Data — single source of truth for all portfolio content.            */
/* ------------------------------------------------------------------ */

const hero = {
  name: 'Zehan Khan',
  title: 'Web Developer',
  badge: 'Available for freelance projects',
  subheadline:
    "I build fast, scalable web products — from custom WordPress platforms to React & Next.js applications — for clients shipping real businesses.",
  stats: [
    { value: '6+', label: 'Years Experience' },
    { value: '150+', label: 'Projects Delivered' },
    { value: '100%', label: 'Client Satisfaction' },
    { value: '24/7', label: 'Support Available' },
  ],
  whatsappLink: 'https://wa.me/918439858095',
  phoneLink: 'tel:+918439858095',
  phoneDisplay: '+91 8439858095',
  email: 'zehandev@gmail.com',
  location: 'Aligarh, UP, India',
  resume: '/Zehankhan.pdf',
  bio: [
    "I'm a full-stack web developer who's spent six years moving between WordPress, React, and Next.js — whichever gets a client's product shipped without cutting corners.",
    "Most of my work starts as a rebuild: a slow site, a CMS nobody trusts, a checkout that leaks conversions. I like that part — finding what's actually broken and fixing it cleanly.",
  ],
};

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const skills = [
  {
    category: 'WordPress Development',
    icon: 'Globe',
    items: ['Custom Themes', 'Custom Plugins', 'WooCommerce', 'Elementor', 'ACF'],
  },
  {
    category: 'E-commerce Solutions',
    icon: 'ShoppingBag',
    items: ['Shopify Apps', 'Shopify Themes', 'Payment Integration', 'Product Management'],
  },
  {
    category: 'Frontend Technologies',
    icon: 'Code2',
    items: ['React.js', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML5/CSS3'],
  },
  {
    category: 'Backend & CMS',
    icon: 'Server',
    items: ['PHP', 'Node.js', 'REST APIs', 'SQL', 'Custom Development'],
  },
];

const experience = [
  {
    company: 'Bannpeople',
    role: 'Web Developer',
    period: '2025 — Present',
    description:
      'Building and maintaining custom web solutions for a portfolio of active clients, from first line of code to production support.',
    achievements: [
      'Shipped custom WordPress builds tailored to each client’s workflow',
      'Delivered fully responsive, mobile-first layouts across every project',
      'Wired up third-party APIs and payment gateways end to end',
      'Cut page load times through targeted performance passes',
    ],
  },
  {
    company: 'Teqexpert',
    role: 'Web Developer',
    period: '2024 — 2025',
    description:
      'Led full-stack builds — custom WordPress themes alongside React and Next.js applications — from spec to launch.',
    achievements: [
      'Built 15+ custom WordPress themes and plugins from scratch',
      'Shipped production React and Next.js applications',
      'Introduced modern JS patterns that the team adopted project-wide',
      'Partnered with design and PM across cross-functional delivery',
    ],
  },
  {
    company: 'TZS',
    role: 'Web Developer',
    period: '2023 — 2024',
    description:
      'Developed and maintained responsive client websites, owning both the frontend experience and the PHP backend behind it.',
    achievements: [
      'Integrated third-party APIs to extend core site functionality',
      'Ran the team’s Git workflow and Jira sprint tracking',
      'Tuned performance and UX across the site catalog',
      'Maintained and extended PHP backend systems',
    ],
  },
  {
    company: 'Unyscape Infocom',
    role: 'Web Developer',
    period: '2021 — 2023',
    description:
      'Specialized in custom WordPress builds and SEO — the role that set the foundation for everything since.',
    achievements: [
      'Grew organic traffic through hands-on SEO strategy',
      'Redesigned key UX flows for responsiveness and clarity',
      'Resolved production issues with near-zero downtime',
      'Collaborated closely with teams to ship polished releases',
    ],
  },
];

const education = [
  {
    degree: 'Diploma in Computer Engineering',
    institution: 'Aligarh Muslim University',
    year: '2020',
  },
];

// All projects live here once. `featured: true` surfaces a project on the homepage.
const projects = [
  {
    id: 1,
    title: 'Supreme Cars Singapore',
    category: 'E-commerce',
    url: 'https://supremecars.com.sg/',
    description:
      'Luxury car dealership platform with live inventory and an integrated booking flow for test drives and viewings.',
    technologies: ['WordPress', 'PHP', 'JavaScript', 'Custom Theme'],
    features: ['Inventory Management', 'Booking System', 'Responsive Design'],
    screenshot: '/projects/supreme-cars.png',
    featured: true,
  },
  {
    id: 2,
    title: 'Comviva',
    category: 'Enterprise',
    url: 'https://www.comviva.com',
    description:
      'Enterprise corporate site serving a global telecom audience, with a dynamic CMS behind every page.',
    technologies: ['WordPress', 'React', 'Custom Development'],
    features: ['Multi-language Support', 'Custom CMS', 'Performance Optimized'],
    screenshot: '/projects/comviva.png',
    featured: true,
  },
  {
    id: 3,
    title: 'BFP Minc',
    category: 'Corporate',
    url: 'https://bfpminc.com',
    description: 'Corporate site built for clarity and lead capture, with a design system that scales across pages.',
    technologies: ['WordPress', 'Elementor', 'Custom CSS'],
    features: ['Modern Design', 'Contact Forms', 'SEO Optimized'],
    screenshot: '/projects/bfp-minc.png',
    featured: true,
  },
  {
    id: 4,
    title: 'Kandidatencheck',
    category: 'Platform',
    url: 'https://kandidatencheck.net/',
    description: 'Interactive candidate evaluation platform with custom scoring logic and a user-facing dashboard.',
    technologies: ['Custom Development', 'JavaScript', 'PHP'],
    features: ['Custom Forms', 'Data Analytics', 'User Dashboard'],
    screenshot: '/projects/kandidatencheck.png',
    featured: true,
  },
  {
    id: 5,
    title: 'Compu-Mail',
    category: 'Technology',
    url: 'https://www.compu-mail.com/',
    description: 'Technology services site with a clean service catalog and a streamlined enquiry flow.',
    technologies: ['WordPress', 'WooCommerce', 'Custom Theme'],
    features: ['Service Showcase', 'Contact Integration', 'Responsive Layout'],
    screenshot: '/projects/compu-mail.png',
  },
  {
    id: 6,
    title: 'CS Electric',
    category: 'Industrial',
    url: 'https://cselectric.co.in',
    description: 'Industrial electrical solutions site with a full product catalog and quote request workflow.',
    technologies: ['WordPress', 'Custom Theme', 'Product Catalog'],
    features: ['Product Management', 'Quote System', 'Mobile Optimized'],
    screenshot: '/projects/cs-electric.png',
  },
  {
    id: 7,
    title: 'Huntsman Sports',
    category: 'E-commerce',
    url: 'https://huntsmansports.com',
    description: 'Sports equipment and apparel storefront built for high-volume browsing and checkout.',
    technologies: ['WooCommerce', 'WordPress', 'Custom Design'],
    features: ['Product Catalog', 'Shopping Cart', 'Payment Integration'],
    screenshot: '/projects/huntsman.png',
  },
  {
    id: 8,
    title: 'Native Sutra',
    category: 'E-commerce',
    url: 'https://nativesutra.com/',
    description: 'Natural beauty and wellness storefront with a checkout tuned for conversion.',
    technologies: ['Shopify', 'Liquid', 'Custom Theme'],
    features: ['Product Management', 'Checkout Optimization', 'SEO'],
    screenshot: '/projects/native.png',
  },
  {
    id: 9,
    title: 'Fast Track Solutions',
    category: 'Corporate',
    url: 'https://fasttracksolutions.ae/',
    description: 'Business consulting site structured around clear service pages and fast lead capture.',
    technologies: ['WordPress', 'Custom Development', 'Elementor'],
    features: ['Service Pages', 'Contact Forms', 'Responsive Design'],
    screenshot: '/projects/fast-track.png',
  },
  {
    id: 10,
    title: 'Eldon Aesthetics',
    category: 'Healthcare',
    url: 'https://eldonaesthetics.co.uk/',
    description: 'Aesthetic clinic site with service showcases and an integrated appointment booking system.',
    technologies: ['WordPress', 'Custom Theme', 'Booking System'],
    features: ['Service Showcase', 'Appointment Booking', 'Patient Portal'],
    screenshot: '/projects/eldon-aesthetics.png',
  },
  {
    id: 11,
    title: 'Pharma Solutions International',
    category: 'Healthcare',
    url: 'https://pharmasolutions-int.com/',
    description: 'Pharmaceutical services site organized around a structured product and information catalog.',
    technologies: ['WordPress', 'Custom Development'],
    features: ['Product Catalog', 'Information Management', 'Contact Forms'],
    screenshot: '/projects/pharma.png',
  },
  {
    id: 12,
    title: 'MD Life',
    category: 'Healthcare',
    url: 'https://md.life/',
    description: 'Healthcare platform for medical professionals with live data and appointment scheduling.',
    technologies: ['Custom Development', 'React', 'API Integration'],
    features: ['User Dashboard', 'Appointment System', 'Real-time Updates'],
    screenshot: '/projects/md-life.png',
  },
];

const featuredProjects = projects.filter((p) => p.featured);
const projectCategories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

/* ------------------------------------------------------------------ */
/* Shared helpers                                                       */
/* ------------------------------------------------------------------ */

// Shared easing curve for scroll reveals and transitions across the site.
const EASE = [0.16, 1, 0.3, 1];

// One distinct gradient identity per project category, so the case-study
// blocks read as varied brand moments instead of one repeated color.
const categoryTheme = {
  'E-commerce': 'from-blue-600 via-cyan-500 to-sky-400',
  Enterprise: 'from-violet-600 via-purple-500 to-fuchsia-500',
  Corporate: 'from-amber-500 via-orange-500 to-rose-500',
  Platform: 'from-fuchsia-600 via-pink-500 to-rose-400',
  Technology: 'from-emerald-500 via-teal-500 to-cyan-500',
  Industrial: 'from-slate-500 via-slate-400 to-orange-400',
  Healthcare: 'from-teal-500 via-emerald-500 to-lime-400',
};

const getCategoryGradient = (category) => categoryTheme[category] || 'from-indigo-500 via-purple-500 to-fuchsia-500';

/* ------------------------------------------------------------------ */
/* Scroll-reveal primitives                                             */
/* ------------------------------------------------------------------ */

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Wrap a list of children in <StaggerGroup><StaggerItem>…</StaggerItem></StaggerGroup>
// to reveal them one after another as the group scrolls into view.
function StaggerGroup({ children, className = '', once = true, amount = 0.15 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = '' }) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

// Same idea as Reveal, but sharpens in from a soft blur instead of sliding —
// used for hero copy and case-study imagery.
function BlurReveal({ children, className = '', delay = 0, y = 16, blur = 10, once = true, amount = 0.2, ...props }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Small reusable pieces                                                */
/* ------------------------------------------------------------------ */

// Animates the leading number in a stat string ("150+", "24/7", "100%")
// from 0 up to its target once it scrolls into view.
function AnimatedCounter({ value, className = '' }) {
  const match = value.match(/\d+/);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(match ? '0' : value);

  useEffect(() => {
    const target = value.match(/\d+/);
    if (!isInView || !target) return undefined;
    const controls = animate(0, parseInt(target[0], 10), {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [isInView, value]);

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const prefix = value.slice(0, match.index);
  const suffix = value.slice(match.index + match[0].length);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

// Slowly auto-scrolls a tall screenshot while it's hovered, so the full
// page is visible without the user having to scroll the card itself.
function AutoScrollImage({ src, alt, isHovered }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [, setScrollInterval] = useState(null);

  useEffect(() => {
    if (!isHovered || !containerRef.current || !imageRef.current) return undefined;

    const container = containerRef.current;
    const image = imageRef.current;
    if (image.clientHeight <= container.clientHeight) return undefined;

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
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseEnter = () => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
  };

  return (
    <div
      ref={containerRef}
      className="no-scrollbar relative h-full w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="h-auto min-h-full w-full object-cover"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentElement.style.background =
            'linear-gradient(to bottom right, rgba(99,102,241,0.25), rgba(168,85,247,0.25))';
        }}
      />
    </div>
  );
}

// Infinite horizontal ticker. Duplicates its children once so the CSS
// animation (translateX 0 -> -50%) loops seamlessly.
function Marquee({ items, className = '' }) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent" />
      <div className="animate-marquee flex w-max gap-3 group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex-shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// A slowly spinning circular text badge with a fixed (non-rotating) icon in
// the center — the "available for work" motif used in the hero and final CTA.
function RotatingBadge({ text, size = 128, className = '', children }) {
  const id = useId();
  const r = size / 2 - 10;
  const pathId = `badge-path-${id}`;

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="animate-spin-slow h-full w-full">
        <path id={pathId} fill="none" d={`M ${size / 2},${size / 2} m -${r},0 a ${r},${r} 0 1,1 ${2 * r},0 a ${r},${r} 0 1,1 -${2 * r},0`} />
        <text fill="currentColor" className="fill-white/50 text-[10px] uppercase tracking-[0.2em]">
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Layout / chrome                                                      */
/* ------------------------------------------------------------------ */

// A slim gradient bar pinned to the top of the viewport that tracks scroll progress.
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400"
    />
  );
}

function FloatingCTA({ onClick, delay = 10000 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClick}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-white shadow-[0_0_30px_-6px_rgba(16,185,129,0.7)]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          <MessageSquare size={18} />
          <span className="text-sm font-bold">Get Free Quote</span>
          <ChevronRight size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

const schedulePerks = [
  'Detailed project analysis & scope review',
  'Customized pricing quote & timeline',
  'Technical recommendations & best practices',
  'Q&A session for all your project concerns',
];

function ScheduleCallPopup({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-black shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500">
                  <Calendar size={20} className="text-white" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white sm:text-xl">Schedule a Free Consultation</h3>
                  <p className="text-xs text-white/50 sm:text-sm">Get personalized pricing for your project</p>
                </div>
              </div>
              <button onClick={onClose} className="flex-shrink-0 rounded-lg p-2 transition-colors hover:bg-white/10">
                <XCircle size={20} className="text-white/50" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="mb-6 space-y-3">
                {schedulePerks.map((perk) => (
                  <div key={perk} className="flex items-start gap-3">
                    <CheckCircle size={18} className="mt-0.5 flex-shrink-0 text-emerald-400" />
                    <span className="text-sm text-white/70">{perk}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4 text-center text-sm text-white/70">
                <span className="font-bold text-emerald-400">No commitment required</span> — just a friendly chat
                about your project needs.
              </div>

              <div className="space-y-3">
                <a
                  href={hero.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-center font-bold text-white transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/40"
                >
                  <MessageSquare size={20} /> Schedule on WhatsApp
                </a>
                <a
                  href={`mailto:${hero.email}?subject=Schedule a Call - Website Project Consultation&body=Hi Zehan, I'd like to schedule a free consultation call for my website project.`}
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-center font-bold text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-white/10"
                >
                  <Mail size={20} /> Schedule via Email
                </a>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/5 px-6 py-4">
              <p className="text-center text-xs text-white/40">Typically respond within 2-3 hours during business hours</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const smoothScrollTo = (hash) => {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function Nav({ variant = 'home' }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleSectionClick = (href) => {
    setOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      requestAnimationFrame(() => setTimeout(() => smoothScrollTo(href), 60));
      return;
    }
    smoothScrollTo(href);
  };

  return (
    <motion.nav
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-500 ${
          scrolled ? 'border-white/10 bg-black/70 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-black transition-transform duration-300 group-hover:scale-105">
            ZK
          </span>
          <span className="hidden text-sm font-medium text-white/80 sm:inline">{hero.name}</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 md:flex">
          {variant === 'home' &&
            navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleSectionClick(item.href)}
                className="rounded-full px-4 py-1.5 text-sm text-white/60 transition-colors duration-300 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </button>
            ))}

          {variant === 'projects' ? (
            <Link
              to="/"
              className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm text-white/60 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={14} /> Home
            </Link>
          ) : (
            <button
              onClick={() => navigate('/projects')}
              className="rounded-full px-4 py-1.5 text-sm text-white/60 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              All Projects
            </button>
          )}
        </div>

        <a
          href={hero.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105 md:flex"
        >
          Book a call
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {variant === 'home' &&
                navLinks.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSectionClick(item.href)}
                    className="py-2 text-left font-medium text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </button>
                ))}

              {variant === 'projects' ? (
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 py-2 font-medium text-white/70 transition-colors hover:text-white"
                >
                  <ArrowLeft size={16} /> Back to Home
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate('/projects');
                  }}
                  className="py-2 text-left font-medium text-white/70 transition-colors hover:text-white"
                >
                  All Projects
                </button>
              )}

              <a
                href={hero.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-black"
              >
                Book a call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

const footerGeneral = [...navLinks, { label: 'All Projects', href: '/projects' }];

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-6 pb-8 pt-16 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-black">
            ZK
          </span>
          <p className="max-w-xs text-sm text-white/45">
            I&rsquo;m {hero.name.split(' ')[0]} — a {hero.title.toLowerCase()}, freelancer &amp; problem solver. Thanks
            for checking out my site.
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/30">General</p>
          <ul className="space-y-3 text-sm">
            {footerGeneral.map((item) => (
              <li key={item.label}>
                {item.href.startsWith('/') ? (
                  <Link to={item.href} className="text-white/55 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className="text-white/55 transition-colors hover:text-white">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/30">Connect</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${hero.email}`} className="text-white/55 transition-colors hover:text-white">
                Email
              </a>
            </li>
            <li>
              <a
                href={hero.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/55 transition-colors hover:text-white"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={hero.resume} download className="text-white/55 transition-colors hover:text-white">
                Resume
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/30 md:flex-row">
        <p>&copy; {new Date().getFullYear()} {hero.name}. All rights reserved.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="transition-colors hover:text-white"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Project cards                                                       */
/* ------------------------------------------------------------------ */

// The large "curated work" treatment: a color-blocked hero panel with a
// tilted, browser-framed screenshot, followed by the write-up beneath it.
function CaseStudyCard({ project, index = 0, reverse = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const gradient = getCategoryGradient(project.category);

  return (
    <BlurReveal delay={index * 0.05} amount={0.1} className="group">
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 md:p-10`}>
        <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:justify-between sm:gap-6">
          <p className="max-w-lg font-serif text-xl italic leading-snug text-white sm:text-2xl md:text-3xl">
            {project.description}
          </p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-transform duration-300 hover:scale-110 hover:bg-black/50"
            title="Visit live website"
          >
            <ArrowUpRight size={20} />
          </a>
        </div>

        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative mx-auto max-w-3xl origin-bottom overflow-hidden rounded-xl border border-white/20 bg-black shadow-2xl transition-transform duration-500 ${
            reverse ? '-rotate-1' : 'rotate-1'
          } group-hover:rotate-0`}
        >
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/60 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          </div>
          <div className="h-56 md:h-72">
            <AutoScrollImage src={project.screenshot} alt={`${project.title} screenshot`} isHovered={isHovered} />
          </div>
        </div>
      </div>

      <div className="px-2 py-6 md:px-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-serif text-2xl italic text-white md:text-3xl">{project.title}</h3>
          <span className="text-xs uppercase tracking-[0.2em] text-white/40">{project.category}</span>
        </div>

        <div className="mb-4 flex flex-wrap gap-3">
          {project.features.map((feature) => (
            <span key={feature} className="flex items-center gap-1.5 text-sm text-white/55">
              <CheckCircle size={14} className="text-white/30" />
              {feature}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </BlurReveal>
  );
}

function ProjectCard({ project, layout = 'grid' }) {
  const [isHovered, setIsHovered] = useState(false);
  const isList = layout === 'list';
  const gradient = getCategoryGradient(project.category);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors duration-500 hover:border-white/25 ${
        isList ? 'flex-col sm:flex-row' : 'flex-col'
      }`}
    >
      <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} p-2 ${isList ? 'sm:w-80 sm:flex-shrink-0' : ''}`}>
        <div className={`relative overflow-hidden rounded-lg ${isList ? 'h-52 sm:h-full' : 'h-52'}`}>
          <AutoScrollImage src={project.screenshot} alt={`${project.title} screenshot`} isHovered={isHovered} />
        </div>

        <div className="absolute top-4 left-4 z-10">
          <span className="rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          title="Visit live website"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/70"
        >
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-serif text-2xl italic text-white">{project.title}</h3>
        <p className="mb-5 flex-1 text-sm leading-relaxed text-white/55">{project.description}</p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/50">
              {tech}
            </span>
          ))}
        </div>

        <div className="mb-5 space-y-2">
          {project.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm text-white/55">
              <CheckCircle size={14} className="flex-shrink-0 text-white/30" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
          <span className="flex items-center gap-2 text-sm text-white/40">
            <Eye size={14} /> Featured
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Visit Site
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* HomePage                                                             */
/* ------------------------------------------------------------------ */

const allTech = Array.from(new Set(skills.flatMap((s) => s.items)));

const tools = [
  { label: 'GitHub', icon: Github },
  { label: 'Tailwind', icon: Wind },
  { label: 'Node.js', icon: Server },
  { label: 'PHP', icon: FileCode },
  { label: 'Figma', icon: Figma },
];

function Preloader() {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      index += 1;
      setDisplayText(hero.name.slice(0, index));
      if (index >= hero.name.length) clearInterval(typing);
    }, 90);
    return () => clearInterval(typing);
  }, []);

  return (
    <motion.div
      key="preloader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      <h1 className="px-6 text-center font-serif text-4xl italic sm:text-5xl md:text-7xl">
        <span className="text-white">{displayText}</span>
        <span className="animate-blink ml-1 inline-block h-8 w-0.5 bg-white align-middle sm:h-10 md:h-14" />
      </h1>
    </motion.div>
  );
}

function AmbientBackground() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 40, damping: 20 });
  const springY = useSpring(my, { stiffness: 40, damping: 20 });
  const blob1X = useTransform(springX, [-1, 1], [-24, 24]);
  const blob1Y = useTransform(springY, [-1, 1], [-24, 24]);

  useEffect(() => {
    const handleMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(20,20,30,0.5),rgba(0,0,0,1)_60%)]" />
      <motion.div style={{ x: blob1X, y: blob1Y }} className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-white/[0.03] blur-3xl" />
    </div>
  );
}

function ConcentricRings() {
  return (
    <div className="relative flex h-40 w-40 flex-shrink-0 items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
          className="absolute rounded-full border border-white/15"
          style={{ width: `${60 + i * 40}px`, height: `${60 + i * 40}px` }}
        />
      ))}
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
        ZK
      </span>
    </div>
  );
}

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [showCallPopup, setShowCallPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowCallPopup(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Preloader />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="min-h-screen bg-black text-white"
        >
          <AmbientBackground />
          <ScrollProgress />
          <ScheduleCallPopup isOpen={showCallPopup} onClose={() => setShowCallPopup(false)} />
          <FloatingCTA onClick={() => setShowCallPopup(true)} />
          <Nav variant="home" />

          {/* Hero */}
          <section id="about" className="relative px-6 pb-16 pt-40 md:px-10 md:pt-48">
            <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.3fr_1fr]">
              <div>
                <BlurReveal>
                  <p className="mb-6 text-xs uppercase tracking-[0.25em] text-white/40">
                    {hero.location} &middot; {hero.stats[0].value} building
                  </p>
                </BlurReveal>
                <h1 className="leading-[0.95]">
                  <BlurReveal delay={0.05}>
                    <span className="block text-5xl font-medium text-white sm:text-6xl md:text-8xl">Web</span>
                  </BlurReveal>
                  <BlurReveal delay={0.12}>
                    <span className="block bg-gradient-to-r from-indigo-300 via-white to-fuchsia-200 bg-clip-text font-serif text-5xl italic text-transparent sm:text-6xl md:text-8xl">
                      developer
                    </span>
                  </BlurReveal>
                </h1>

                <BlurReveal delay={0.22}>
                  <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/50">{hero.subheadline}</p>
                </BlurReveal>

                <BlurReveal delay={0.3}>
                  <div className="mt-10 flex flex-wrap items-center gap-6">
                    <a
                      href={hero.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105"
                    >
                      Start a conversation <ArrowRight size={16} />
                    </a>
                    <a href="#work" className="text-sm text-white/50 underline underline-offset-4 transition-colors hover:text-white">
                      View my work
                    </a>
                  </div>
                </BlurReveal>
              </div>

              <div className="flex flex-col items-start gap-8 md:items-end">
                <BlurReveal delay={0.15} className="w-full max-w-[240px] md:w-auto">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Available now
                    </p>
                    <p className="text-lg font-semibold text-white">{hero.title}</p>
                    <p className="mt-1 text-sm text-white/40">WordPress &middot; React &middot; Next.js</p>
                  </div>
                </BlurReveal>

                <BlurReveal delay={0.25} className="hidden text-right md:block">
                  <p className="font-serif text-xl italic text-white/40">Engineering with care.</p>
                  <p className="font-serif text-4xl italic text-white">{hero.name}</p>
                </BlurReveal>

                <BlurReveal delay={0.35} className="w-full max-w-[280px]">
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
                    <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                      <span className="h-2 w-2 rounded-full bg-red-400/70" />
                      <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                      <span className="h-2 w-2 rounded-full bg-green-400/70" />
                    </div>
                    <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-white/60">
                      <code>
                        <span className="text-fuchsia-300">const</span> stack = [{'\n'}
                        {'  '}
                        <span className="text-emerald-300">&apos;React&apos;</span>,{'\n'}
                        {'  '}
                        <span className="text-emerald-300">&apos;Next.js&apos;</span>,{'\n'}
                        {'  '}
                        <span className="text-emerald-300">&apos;WordPress&apos;</span>,{'\n'}
                        {'  '}
                        <span className="text-emerald-300">&apos;Tailwind&apos;</span>,{'\n'}
                        ];
                      </code>
                    </pre>
                  </div>
                </BlurReveal>
              </div>
            </div>
          </section>

          {/* Status strip */}
          <section className="border-y border-white/10">
            <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-white/10 md:grid-cols-4 md:divide-y-0">
              {[
                { icon: Briefcase, label: 'Now', value: experience[0].role, sub: experience[0].company },
                { icon: Wind, label: 'Focus', value: 'WordPress + React', sub: 'Full-stack builds' },
                { icon: MapPin, label: 'Based', value: hero.location.split(',')[0], sub: 'Remote friendly' },
              ].map((tile) => (
                <BlurReveal key={tile.label} className="group px-6 py-8">
                  <tile.icon size={16} className="mb-3 text-white/30" />
                  <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-white/30">{tile.label}</p>
                  <p className="font-medium text-white">{tile.value}</p>
                  <p className="text-sm text-white/40">{tile.sub}</p>
                </BlurReveal>
              ))}
              <BlurReveal delay={0.1}>
                <a
                  href={hero.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-center gap-2 bg-white px-6 py-8 text-black transition-colors hover:bg-white/90"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-black/50">Reach out</p>
                  <p className="flex items-center gap-2 font-semibold">
                    Start a conversation <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </p>
                </a>
              </BlurReveal>
            </div>
          </section>

          {/* Rings + stack marquee */}
          <section className="px-6 py-24 md:px-10">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
              <BlurReveal className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 p-10 text-center">
                <ConcentricRings />
                <div>
                  <p className="mb-2 text-lg font-semibold text-white">Let&rsquo;s build together</p>
                  <p className="mx-auto max-w-xs text-sm text-white/45">
                    Direct communication, fast iteration, no agency overhead — just one developer shipping.
                  </p>
                </div>
              </BlurReveal>

              <BlurReveal delay={0.1} className="flex flex-col justify-center gap-6 rounded-3xl border border-white/10 p-10">
                <div>
                  <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-white/30">Tech stack</p>
                  <p className="text-lg font-semibold text-white">The stack behind everything I ship</p>
                </div>
                <div className="space-y-3">
                  <Marquee items={allTech} />
                </div>
              </BlurReveal>
            </div>
          </section>

          {/* What you get / availability / tools */}
          <section className="px-6 pb-24 md:px-10">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-6 md:grid-cols-2">
                <BlurReveal className="rounded-3xl border border-white/10 p-10">
                  <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-white/30">What you get</p>
                  <p className="mb-6 text-lg font-semibold text-white">Clean code, shipped and supported</p>
                  <StaggerGroup className="space-y-4">
                    {['Meets deadlines', 'Responsive, tested builds', 'Direct access — no middlemen', 'Support after launch'].map((item) => (
                      <StaggerItem key={item} className="flex items-center gap-3 text-sm text-white/60">
                        <CheckCircle size={16} className="text-emerald-400" /> {item}
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                </BlurReveal>

                <BlurReveal delay={0.1} className="rounded-3xl border border-white/10 p-10">
                  <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-white/30">Flexible with timezones</p>
                  <p className="mb-6 text-lg font-semibold text-white">Based in India, available globally</p>
                  <div className="flex items-center gap-4 rounded-xl bg-white/[0.03] p-4">
                    <Clock size={20} className="text-white/40" />
                    <div>
                      <p className="text-sm font-medium text-white">IST &middot; GMT+5:30</p>
                      <p className="text-xs text-white/40">Overlaps comfortably with US &amp; EU working hours</p>
                    </div>
                  </div>
                </BlurReveal>
              </div>

              <BlurReveal delay={0.15} className="mt-6 rounded-3xl border border-white/10 p-10">
                <p className="mb-6 text-center text-[11px] uppercase tracking-[0.2em] text-white/30">Tools I reach for</p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  {tools.map((tool) => (
                    <div key={tool.label} className="flex flex-col items-center gap-2">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/70 transition-colors duration-300 hover:border-white/30 hover:text-white">
                        <tool.icon size={22} />
                      </span>
                      <span className="text-xs text-white/40">{tool.label}</span>
                    </div>
                  ))}
                </div>
              </BlurReveal>
            </div>
          </section>

          {/* Curated work */}
          <section id="work" className="px-6 py-24 md:px-10">
            <div className="mx-auto max-w-4xl">
              <BlurReveal className="mb-16 text-center">
                <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/30">Case studies</p>
                <h2 className="text-4xl font-medium text-white md:text-6xl">
                  Curated <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-300">work</span>
                </h2>
              </BlurReveal>

              <div className="space-y-20" id="projects">
                {featuredProjects.map((project, i) => (
                  <CaseStudyCard key={project.id} project={project} index={i} reverse={i % 2 === 1} />
                ))}
              </div>

              <BlurReveal className="mt-16 text-center">
                <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-white/50 underline underline-offset-4 transition-colors hover:text-white">
                  See all 12 projects <ArrowRight size={14} />
                </Link>
              </BlurReveal>
            </div>
          </section>

          {/* About */}
          <section className="px-6 py-24 md:px-10">
            <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
              <BlurReveal>
                <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/30">Know about me</p>
                <h2 className="mb-6 text-4xl font-medium text-white md:text-5xl">
                  Full-stack developer, and a little bit of{' '}
                  <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-300">everything</span>
                </h2>
                {hero.bio.map((para) => (
                  <p key={para} className="mb-4 text-white/50">
                    {para}
                  </p>
                ))}
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <a
                    href={hero.resume}
                    download
                    className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
                  >
                    Download resume
                  </a>
                  <a href="#experience" className="flex items-center gap-1.5 text-sm text-white/50 underline underline-offset-4 hover:text-white">
                    Work experience <ArrowRight size={14} />
                  </a>
                </div>
              </BlurReveal>

              <BlurReveal delay={0.1} className="flex flex-col items-center gap-10">
                <RotatingBadge text="AVAILABLE FOR WORK • FREELANCE • ">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black">
                    <ArrowUpRight size={22} />
                  </span>
                </RotatingBadge>
                <div className="flex divide-x divide-white/10 text-center">
                  {hero.stats.slice(0, 3).map((stat) => (
                    <div key={stat.label} className="px-6">
                      <p className="text-2xl font-semibold text-white">
                        <AnimatedCounter value={stat.value} />
                      </p>
                      <p className="text-xs text-white/40">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </BlurReveal>
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="px-6 py-24 md:px-10">
            <div className="mx-auto max-w-4xl">
              <BlurReveal className="mb-16 text-center">
                <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/30">Journey</p>
                <h2 className="text-4xl font-medium text-white md:text-6xl">
                  Where I&rsquo;ve{' '}
                  <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-300">worked</span>
                </h2>
              </BlurReveal>

              <div className="divide-y divide-white/10 border-t border-white/10">
                {experience.map((exp, index) => (
                  <BlurReveal key={exp.company} delay={index * 0.04} y={16} className="group py-8 transition-colors">
                    <div className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
                      <p className="text-lg font-semibold text-white">
                        {exp.role} <span className="font-normal text-white/40">&middot; {exp.company}</span>
                      </p>
                      <p className="text-sm text-white/40">{exp.period}</p>
                    </div>
                    <p className="mt-2 max-w-2xl text-sm text-white/45">{exp.description}</p>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      {exp.achievements.map((achievement) => (
                        <span key={achievement} className="flex items-center gap-2 text-xs text-white/40">
                          <CheckCircle size={12} className="text-white/25" /> {achievement}
                        </span>
                      ))}
                    </div>
                  </BlurReveal>
                ))}
              </div>

              <BlurReveal className="mt-8 text-sm text-white/35">
                {education[0].degree} &middot; {education[0].institution} &middot; {education[0].year}
              </BlurReveal>
            </div>
          </section>

          {/* Final CTA */}
          <section id="contact" className="relative overflow-hidden px-6 py-32 md:px-10">
            <div className="grain absolute inset-0 bg-gradient-to-br from-indigo-700 via-blue-800 to-black" />
            <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
              <RotatingBadge text="OPEN TO WORK • FREELANCE PROJECTS • ">
                <a
                  href={hero.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110"
                >
                  <ArrowUpRight size={22} />
                </a>
              </RotatingBadge>

              <h2 className="text-4xl font-medium text-white md:text-6xl">
                From idea to{' '}
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">launch.</span>
              </h2>
              <p className="max-w-lg text-white/60">
                Have a project in mind? Reach out directly — I typically respond within a few hours.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={hero.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105"
                >
                  <MessageSquare size={16} /> Message on WhatsApp
                </a>
                <a
                  href={`mailto:${hero.email}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Mail size={16} /> {hero.email}
                </a>
              </div>
            </div>
          </section>

          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* ProjectsPage                                                        */
/* ------------------------------------------------------------------ */

function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [showCallPopup, setShowCallPopup] = useState(false);

  const filteredProjects = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(20,20,30,0.5),rgba(0,0,0,1)_60%)]" />
      </div>

      <ScrollProgress />
      <ScheduleCallPopup isOpen={showCallPopup} onClose={() => setShowCallPopup(false)} />
      <Nav variant="projects" />

      <main className="relative z-10 px-6 pb-24 pt-40 md:px-10 md:pt-48">
        <div className="mx-auto max-w-6xl">
          <BlurReveal className="mb-16 max-w-2xl">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-white/30">Project gallery</p>
            <h1 className="text-4xl font-medium text-white sm:text-5xl md:text-7xl">
              All <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-300">work</span>
            </h1>
            <p className="mt-6 text-lg text-white/45">
              {projects.length} projects from a portfolio of 150+ websites and applications built for clients worldwide.
            </p>
          </BlurReveal>

          {/* Controls */}
          <BlurReveal delay={0.1}>
            <div className="mb-10 flex flex-col items-start justify-between gap-6 border-y border-white/10 py-6 md:flex-row md:items-center">
              <div className="flex flex-wrap gap-2">
                {projectCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                      filter === category ? 'text-black' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {filter === category && (
                      <motion.span
                        layoutId="category-pill"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-white"
                      />
                    )}
                    <span className="relative">{category}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-white/30">{filteredProjects.length} shown</span>
                <div className="flex rounded-full border border-white/10 p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`rounded-full p-2 transition-colors duration-300 ${
                      viewMode === 'grid' ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`rounded-full p-2 transition-colors duration-300 ${
                      viewMode === 'list' ? 'bg-white text-black' : 'text-white/40 hover:text-white'
                    }`}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>
          </BlurReveal>

          {/* Gallery */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${viewMode}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} layout={viewMode} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="py-16 text-center">
              <h3 className="mb-4 text-2xl font-medium">No projects in this category</h3>
              <button
                onClick={() => setFilter('All')}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105"
              >
                Show all projects
              </button>
            </div>
          )}

          {/* CTA */}
          <BlurReveal delay={0.1}>
            <div className="mt-24 rounded-3xl border border-white/10 p-12 text-center">
              <h2 className="mb-4 text-3xl font-medium">
                Ready to add your project <span className="font-serif italic">here?</span>
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-white/45">
                With 150+ projects delivered, I have the experience to handle any web development challenge.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href={hero.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105"
                >
                  <MessageSquare size={16} /> Start a conversation
                </a>
                <a
                  href={`mailto:${hero.email}`}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Mail size={16} /> Send an email
                </a>
              </div>
            </div>
          </BlurReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App / routing                                                       */
/* ------------------------------------------------------------------ */

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/projects"
          element={
            <PageTransition>
              <ProjectsPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
