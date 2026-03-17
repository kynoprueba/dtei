/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  ChevronRight, 
  ChevronLeft,
  Mail,
  Twitter,
  Instagram,
  MapPin,
  Mic,
  Video,
  BookOpen,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---

type Page = 'home' | 'pedagogies' | 'podcasts' | 'videos' | 'territories';

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Inicio' },
    { id: 'territories', label: 'Territorios' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'videos', label: 'Videos' },
    { id: 'pedagogies', label: 'Pedagogías' },
  ] as const;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-earth-200 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setPage('home')}
        >
          <div className="w-10 h-10 bg-brand rounded-twelve flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-earth-800 hidden md:block">
            Diálogos Territoriales
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={cn(
                "hover:text-brand transition-colors text-sm uppercase tracking-wide",
                currentPage === link.id ? "text-brand font-bold border-b-2 border-brand" : "text-earth-600"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-brand text-earth-900 font-semibold px-6 py-2 rounded-twelve hover:brightness-110 transition-all shadow-md hidden sm:block">
            Unirse
          </button>
          <button 
            className="md:hidden text-earth-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-earth-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setPage(link.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "text-left py-2 text-lg font-medium",
                    currentPage === link.id ? "text-brand" : "text-earth-600"
                  )}
                >
                  {link.label}
                </button>
              ))}
              <button className="bg-brand text-earth-900 font-semibold px-6 py-3 rounded-twelve mt-4">
                Unirse
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <footer className="bg-earth-900 text-earth-100 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-brand rounded-twelve flex items-center justify-center">
              <span className="text-earth-900 font-bold">D</span>
            </div>
            <span className="font-bold text-white">Diálogos Territoriales</span>
          </div>
          <p className="text-sm text-earth-200">
            Transformando la educación a través del diálogo intercultural y la valoración de los territorios colombianos.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="w-10 h-10 bg-earth-800 flex items-center justify-center rounded-twelve hover:bg-brand hover:text-earth-900 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-earth-800 flex items-center justify-center rounded-twelve hover:bg-brand hover:text-earth-900 transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6">Explorar</h4>
          <ul className="space-y-4 text-sm">
            <li><button onClick={() => setPage('territories')} className="hover:text-brand">Territorios</button></li>
            <li><button onClick={() => setPage('podcasts')} className="hover:text-brand">Podcast</button></li>
            <li><button onClick={() => setPage('videos')} className="hover:text-brand">Videos</button></li>
            <li><button onClick={() => setPage('pedagogies')} className="hover:text-brand">Pedagogías</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6">Comunidad</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-brand">Voluntariado</a></li>
            <li><a href="#" className="hover:text-brand">Talleres</a></li>
            <li><a href="#" className="hover:text-brand">Eventos</a></li>
            <li><a href="#" className="hover:text-brand">Donaciones</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6">Suscribirse al Archivo</h4>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              className="bg-earth-800 border-none rounded-twelve flex-grow text-white px-4 py-2 focus:ring-2 focus:ring-brand"
            />
            <button className="bg-brand text-earth-900 px-4 py-2 rounded-twelve font-bold text-sm uppercase">OK</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-earth-800 text-center text-xs text-earth-400">
        <p>© 2023 Diálogos Territoriales Interculturales. Hecho con amor por la diversidad de Colombia.</p>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 hero-gradient z-10"></div>
        <img 
          src="https://picsum.photos/seed/colombia/1920/1080" 
          alt="Colombian Landscape" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-20 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">Saberes que habitan el territorio</h1>
          <p className="text-xl md:text-2xl mb-8 font-light opacity-90">Explorando la diversidad cultural colombiana a través de la educación no tradicional y el diálogo intercultural.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => setPage('pedagogies')}
              className="bg-white text-earth-900 px-8 py-3 rounded-twelve font-bold hover:bg-earth-100 transition-colors"
            >
              Nuestra Historia
            </button>
            <button 
              onClick={() => setPage('podcasts')}
              className="border-2 border-white text-white px-8 py-3 rounded-twelve font-bold hover:bg-white/10 transition-colors"
            >
              Escuchar Voces
            </button>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-brand font-bold tracking-widest uppercase text-sm">Nuestra Esencia</span>
            <h2 className="text-4xl font-bold mt-2 mb-6 text-earth-800">¿Quiénes somos?</h2>
            <p className="text-lg leading-relaxed text-earth-600 mb-6">
              Diálogos Territoriales Interculturales es un espacio de encuentro donde la pedagogía trasciende las aulas. Creemos en el aprendizaje que surge de la tierra, de los ancestros y de las comunidades que construyen país desde sus propios contextos.
            </p>
            <p className="text-lg leading-relaxed text-earth-600">
              Nuestra misión es visibilizar las narrativas locales de Colombia, integrando herramientas digitales para fortalecer el tejido social y el intercambio de conocimientos diversos.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/community/800/600" 
              alt="Comunidad" 
              className="rounded-twelve shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -left-6 bg-brand p-8 rounded-twelve hidden lg:block shadow-xl">
              <p className="text-earth-900 font-bold text-3xl">12+</p>
              <p className="text-earth-800 font-medium">Territorios Impactados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Podcasts Preview */}
      <section className="py-20 bg-earth-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-earth-800">Últimos Podcasts</h2>
              <p className="text-earth-600 mt-2">Voces que narran la realidad de nuestras regiones.</p>
            </div>
            <button 
              onClick={() => setPage('podcasts')}
              className="text-brand font-bold hover:underline flex items-center gap-1"
            >
              Ver todos <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-twelve shadow-sm hover:-translate-y-1 transition-transform cursor-pointer group">
                <img 
                  src={`https://picsum.photos/seed/podcast${i}/400/400`} 
                  alt="Podcast Cover" 
                  className="w-full aspect-square object-cover rounded-twelve mb-4"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs font-bold text-brand mb-2 block uppercase">Episodio 0{9-i}</span>
                <h3 className="text-xl font-bold text-earth-800 mb-2 group-hover:text-brand transition-colors">
                  {i === 1 ? "Semillas de Paz en el Putumayo" : i === 2 ? "Relatos de la Selva" : "Tejiendo el Cauca"}
                </h3>
                <p className="text-earth-600 text-sm mb-4 line-clamp-2">
                  {i === 1 ? "Conversamos con líderes comunitarios sobre la preservación de semillas nativas." : "La importancia de la oralidad en la transmisión del conocimiento ancestral."}
                </p>
                <button className="flex items-center gap-2 text-earth-800 font-bold hover:text-brand transition-colors">
                  <div className="w-10 h-10 border-2 border-earth-800 rounded-full flex items-center justify-center group-hover:border-brand">
                    <Play size={16} fill="currentColor" />
                  </div>
                  Escuchar ahora
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Preview */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-earth-800 mb-16">Nuestras Historias en Video</h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="relative rounded-twelve overflow-hidden shadow-xl group cursor-pointer">
            <img 
              src="https://picsum.photos/seed/video-main/1200/800" 
              alt="Featured Video" 
              className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-brand p-6 rounded-full">
                <Play size={32} fill="currentColor" className="text-earth-900" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white text-2xl font-bold">Documental: Territorios en Diálogo</h3>
              <p className="text-white/80 mt-2">Un recorrido por las 5 regiones naturales de Colombia.</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {[
              { title: "Cantos de Vaquería", desc: "Patrimonio cultural de los Llanos." },
              { title: "Medicina Ancestral", desc: "Conocimientos botánicos del Chocó." },
              { title: "Educación en la Montaña", desc: "Escuelas rurales y tecnología." }
            ].map((v, i) => (
              <div key={i} className="flex gap-4 items-center bg-white p-4 rounded-twelve shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <img 
                  src={`https://picsum.photos/seed/thumb${i}/200/150`} 
                  alt="Thumbnail" 
                  className="w-32 h-20 rounded-twelve object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-earth-800 group-hover:text-brand transition-colors">{v.title}</h4>
                  <p className="text-sm text-earth-600">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-brand py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-earth-900 mb-4">Suscríbete a nuestros Diálogos</h2>
          <p className="text-earth-800 mb-8">Recibe actualizaciones sobre nuevos contenidos, talleres y encuentros territoriales.</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="flex-grow px-6 py-4 rounded-twelve border-none focus:ring-2 focus:ring-earth-800"
              required 
            />
            <button className="bg-earth-900 text-white px-8 py-4 rounded-twelve font-bold hover:bg-earth-800 transition-colors shadow-lg">
              Suscribirme
            </button>
          </form>
        </div>
      </section>
    </motion.div>
  );
};

const PedagogiesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-slate-50 min-h-screen"
    >
      <section className="relative py-20 overflow-hidden bg-brand-light/30">
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-brand opacity-10 organic-shape translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-brand-dark uppercase bg-white border border-brand/20 rounded-full">
              Filosofía Educativa
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Pedagogías para el Encuentro y el <span className="text-brand-dark underline decoration-wavy decoration-brand/30">Territorio</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Creemos que el aprendizaje no ocurre entre cuatro paredes, sino en el diálogo constante con la tierra, la comunidad y los saberes ancestrales que habitan cada rincón.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-slate-900">Nuestra Visión No-Tradicional</h2>
              <p className="text-lg text-slate-600">
                Nuestra propuesta pedagógica se aleja del modelo bancario de educación para centrarse en la **Interculturalidad Crítica**. No buscamos solo transmitir información, sino co-crear conocimiento que sea relevante para la defensa de la vida y el territorio.
              </p>
              <blockquote className="relative p-8 bg-slate-50 border-l-4 border-brand rounded-twelve">
                <p className="text-2xl font-medium text-slate-800 italic relative z-10">
                  "La educación es el camino para reconocer que el otro no es un extraño, sino un espejo de mi propio territorio."
                </p>
              </blockquote>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: "🌱", title: "Aprendizaje Situado", desc: "El conocimiento nace de la realidad local." },
                { icon: "🗣️", title: "Diálogo de Saberes", desc: "Intercambio horizontal entre academia y empírico." },
                { icon: "🗺️", title: "Cartografía Social", desc: "Mapeo colectivo de dinámicas de poder." },
                { icon: "🎭", title: "Arte-Educación", desc: "Lenguajes expresivos para procesar memorias." }
              ].map((m, i) => (
                <div key={i} className="p-6 bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-twelve hover:-translate-y-1 transition-transform">
                  <div className="w-14 h-14 mb-4 bg-brand-light flex items-center justify-center rounded-2xl text-2xl">
                    {m.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{m.title}</h3>
                  <p className="text-slate-500 text-sm">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">El Equipo de Facilitadores</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Un grupo interdisciplinar de educadores, antropólogos y activistas territoriales comprometidos con la transformación social.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { name: "Dra. Elena Martínez", role: "Directora Pedagógica", quote: "Mi compromiso es con la recuperación de la palabra." },
              { name: "Mateo Quintero", role: "Coordinador de Territorios", quote: "Entiendo el mapa como un organismo vivo." },
              { name: "Sara Villalobos", role: "Mediadora Cultural", quote: "El arte es nuestra herramienta más poderosa." }
            ].map((t, i) => (
              <div key={i} className="text-center group">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-brand organic-shape scale-110 group-hover:rotate-12 transition-transform duration-500"></div>
                  <img 
                    src={`https://picsum.photos/seed/member${i}/300/300`} 
                    alt={t.name} 
                    className="relative z-10 w-48 h-48 object-cover organic-shape border-4 border-slate-900 shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-xl font-bold">{t.name}</h4>
                <p className="text-brand font-medium mb-3">{t.role}</p>
                <p className="text-slate-400 text-sm italic">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const PodcastsPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-32"
    >
      <header className="py-16 px-6 bg-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6">
          Escucha los <span className="text-brand-dark underline decoration-brand/30">Diálogos</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explorando las voces del territorio a través de saberes ancestrales y pedagogías modernas.
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {['Todos', 'Ancestral Wisdom', 'Modern Pedagogies', 'Territorial Stories'].map((cat, i) => (
            <button 
              key={cat}
              className={cn(
                "px-6 py-2 rounded-full font-semibold transition-all",
                i === 0 ? "bg-brand text-white shadow-lg shadow-brand/20" : "bg-white border border-brand/20 text-slate-600 hover:bg-brand/5"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <article key={i} className="bg-white rounded-twelve border border-brand/10 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/pod${i}/600/600`} 
                  alt="Podcast Cover" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center shadow-2xl"
                  >
                    {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}
                  </button>
                </div>
                <span className="absolute top-4 left-4 bg-brand/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {i % 2 === 0 ? "Modern Pedagogies" : "Ancestral Wisdom"}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-brand-dark transition-colors">
                  {i === 1 ? "Las Voces del Páramo" : i === 2 ? "Educación en Movimiento" : i === 3 ? "Semillas de Resistencia" : "Tejidos de la Tierra"}
                </h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                  Una conversación profunda con los guardianes del territorio sobre la memoria y sus rituales.
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>{40 + i} min</span>
                  <span>Hace {i} días</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Mini Player */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] p-4">
        <div className="max-w-4xl mx-auto bg-slate-800 text-white rounded-twelve shadow-2xl p-3 flex items-center gap-4 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded bg-brand flex-shrink-0 overflow-hidden">
              <img src="https://picsum.photos/seed/playing/100/100" alt="Now Playing" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">Las Voces del Páramo</p>
              <p className="text-xs text-slate-400 truncate">Capítulo 1 • Ancestral Wisdom</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-white"><SkipBack size={20} /></button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-brand text-slate-800 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-slate-400 hover:text-white"><SkipForward size={20} /></button>
          </div>
          <div className="hidden lg:flex items-center gap-3 w-1/4">
            <span className="text-[10px]">12:45</span>
            <div className="h-1 bg-slate-600 rounded-full flex-1 relative">
              <div className="absolute inset-0 bg-brand w-1/3 rounded-full"></div>
            </div>
            <span className="text-[10px]">45:00</span>
          </div>
          <button className="hidden md:block text-slate-400 hover:text-white"><Volume2 size={20} /></button>
        </div>
      </div>
    </motion.div>
  );
};

const VideosPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#fdfbf7] min-h-screen"
    >
      <header className="border-b border-slate-200 bg-white sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">
              Miradas en <span className="text-earth-600">Movimiento</span>
            </h1>
            <p className="text-sm text-slate-500 font-medium tracking-widest uppercase">Archivo cinematográfico de memorias vivas</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm italic text-slate-600 max-w-xs">Saberes compartidos a través de la imagen.</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <nav className="mb-12 flex flex-wrap items-center justify-center gap-4">
          {['Todos', 'Documentales', 'Talleres', 'Entrevistas'].map((f, i) => (
            <button 
              key={f}
              className={cn(
                "px-6 py-2 rounded-twelve border-2 font-medium transition-all",
                i === 0 ? "bg-earth-600 text-white border-earth-600" : "border-slate-200 hover:border-earth-600"
              )}
            >
              {f}
            </button>
          ))}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <article key={i} className="bg-white shadow-sm hover:shadow-xl transition-all rounded-twelve overflow-hidden group cursor-pointer">
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                <img 
                  src={`https://picsum.photos/seed/vid${i}/800/450`} 
                  alt="Video Thumbnail" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                  <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center shadow-lg">
                    <Play size={24} fill="currentColor" className="text-slate-900 ml-1" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">12:45</span>
              </div>
              <div className={cn(
                "p-5 border-t-4",
                i % 3 === 0 ? "border-slate-400" : i % 2 === 0 ? "border-brand" : "border-earth-600"
              )}>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">
                  {i % 3 === 0 ? "Entrevistas" : i % 2 === 0 ? "Talleres" : "Documentales"}
                </span>
                <h3 className="text-xl font-bold mt-1 group-hover:text-brand transition-colors">
                  {i === 1 ? "Las Voces del Páramo" : i === 2 ? "Tejido de Identidad" : "Relatos de Abuelos"}
                </h3>
                <p className="text-sm text-slate-600 mt-2 line-clamp-2">Exploración profunda sobre la relación mística entre comunidad y territorio.</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 flex justify-center items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-300 hover:border-brand transition-colors">
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium">1 de 5</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-300 hover:border-brand transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </main>
    </motion.div>
  );
};

const TerritoriesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen"
    >
      <section className="relative py-16 overflow-hidden bg-earth-50">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Explora el Territorio</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Descubre los saberes ancestrales y las pedagogías propias que florecen en las diversas regiones de Colombia.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Todos', 'Amazonía', 'Andina', 'Caribe', 'Pacífica', 'Orinoquía'].map((r, i) => (
              <button 
                key={r}
                className={cn(
                  "px-5 py-2 rounded-full font-semibold transition-all",
                  i === 0 ? "bg-brand text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:border-brand"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { region: 'Amazonía', title: 'Guardianes de la Selva', loc: 'Leticia, Amazonas', color: 'bg-brand' },
            { region: 'Caribe', title: 'El Arte del Tejido Wayuu', loc: 'Uribia, La Guajira', color: 'bg-orange-500' },
            { region: 'Pacífica', title: 'Cantos de Resistencia', loc: 'Timbiquí, Cauca', color: 'bg-blue-600' },
            { region: 'Andina', title: 'Escuela de Páramo', loc: 'Sumapaz, Cundinamarca', color: 'bg-purple-600' },
            { region: 'Orinoquía', title: 'Cantos de Vaquería', loc: 'Paz de Ariporo, Casanare', color: 'bg-red-600' },
            { region: 'Insular', title: 'La Lengua de la Sal', loc: 'Providencia, San Andrés', color: 'bg-cyan-600' }
          ].map((t, i) => (
            <article key={i} className="bg-white rounded-twelve overflow-hidden shadow-sm border border-slate-100 hover:-translate-y-1 transition-all cursor-pointer group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/territory${i}/800/600`} 
                  alt={t.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className={cn("absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider", t.color)}>
                  {t.region}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-brand transition-colors">{t.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">Procesos de enseñanza basados en la observación de los ciclos naturales y la medicina tradicional.</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm text-slate-400">
                    <MapPin size={14} className="mr-1" />
                    {t.loc}
                  </span>
                  <button className="text-brand font-bold text-sm hover:underline flex items-center gap-1">
                    Ver proceso <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={page} setPage={setPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {page === 'home' && <HomePage setPage={setPage} />}
          {page === 'pedagogies' && <PedagogiesPage />}
          {page === 'podcasts' && <PodcastsPage />}
          {page === 'videos' && <VideosPage />}
          {page === 'territories' && <TerritoriesPage />}
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} />
    </div>
  );
}
