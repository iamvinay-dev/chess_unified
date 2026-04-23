import { readJSON } from './data-manager';
import { SiteContent, Tournament } from './types';

export async function getSiteContent(): Promise<SiteContent> {
  return await readJSON<SiteContent>('siteContent.json', {
    hero: {
      title: "Build Young Minds Through Chess",
      description: "Strategy. Focus. Confidence. We coach the next generation of champions from beginner to advanced — with certified FIDE trainers in Anantapur.",
      ctaPrimary: "Start Learning Now",
      ctaSecondary: "Franchise"
    },
    contact: {
      phone: "+91 98850 06568",
      email: "chessunified1@gmail.com",
      address: "Door No.1/696 Rudrampeta Bypass, Near Balaji School (Back Side), Anantapur, AP 515004",
      whatsapp: "919885006568",
      instagram: "https://instagram.com/chessunified",
      facebook: "#",
      youtube: "#"
    },
    sections: {
      about: true,
      programs: false,
      whyChess: true,
      trainers: false,
      gallery: true,
      youtube: false,
      tournaments: true,
      franchise: true,
      specialCamps: true
    },
    gallery: [],
    youtubeVideos: [],
    specialCamps: [
      {
        title: "Summer Grandmaster Camp",
        date: "May 15 - June 15",
        description: "An intensive 30-day program for aspiring champions. Master advanced openings and deep calculation with our FIDE certified trainers.",
        bannerUrl: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=800&auto=format&fit=crop"
      }
    ]
  });
}

export async function getTournaments(): Promise<Tournament[]> {
  return await readJSON<Tournament[]>('tournaments.json', []);
}
