import { RecommendedMachine } from '../types/quiz';

export const recommendations: RecommendedMachine[] = [
  {
    name: 'Breville Bambino Plus',
    image: 'https://images.unsplash.com/photo-1587080413959-06b859fb107d?auto=format&fit=crop&w=800&q=80',
    price: '$499',
    description: 'Perfect for beginners, this compact machine delivers excellent espresso with automatic milk texturing.',
    features: ['Automatic milk texturing', 'Quick heat-up', 'Compact design', 'Easy to use'],
    skillLevel: 'beginner',
    spaceRequired: 'compact'
  },
  {
    name: 'Rancilio Silvia Pro X',
    image: 'https://images.unsplash.com/photo-1595434091143-b375ced5fe5c?auto=format&fit=crop&w=800&q=80',
    price: '$1690',
    description: 'Professional-grade machine with dual boilers and advanced temperature control.',
    features: ['Dual boilers', 'PID temperature control', 'Commercial-grade build', 'Pro-level steam power'],
    skillLevel: 'advanced',
    spaceRequired: 'medium'
  },
  {
    name: 'Gaggia Classic Pro',
    image: 'https://images.unsplash.com/photo-1606791405792-1004f1718d0c?auto=format&fit=crop&w=800&q=80',
    price: '$449',
    description: 'A classic semi-automatic machine perfect for learning the craft of espresso.',
    features: ['Commercial steam wand', 'Solenoid valve', 'Professional 58mm portafilter', 'Durable build'],
    skillLevel: 'intermediate',
    spaceRequired: 'compact'
  },
  {
    name: 'La Marzocco Linea Mini',
    image: 'https://images.unsplash.com/photo-1592318951566-70f6f0ac3c87?auto=format&fit=crop&w=800&q=80',
    price: '$5900',
    description: 'Commercial quality in a home-friendly size. The ultimate prosumer machine.',
    features: ['Dual boilers', 'PID temperature control', 'Pre-infusion', 'Commercial-grade components'],
    skillLevel: 'advanced',
    spaceRequired: 'large'
  },
  {
    name: 'Flair Pro 2',
    image: 'https://images.unsplash.com/photo-1606791405792-1004f1718d0c?auto=format&fit=crop&w=800&q=80',
    price: '$319',
    description: 'Manual lever machine for the hands-on enthusiast. Portable and capable of exceptional shots.',
    features: ['Full pressure control', 'No electricity needed', 'Portable', 'Temperature stability'],
    skillLevel: 'intermediate',
    spaceRequired: 'compact'
  }
];