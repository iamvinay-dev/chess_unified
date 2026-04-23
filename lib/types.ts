export interface Tournament {
  id: string;
  title: string;
  date: string;
  venue: string;
  ageGroups: string;
  fee: string;
  bannerUrl: string;
  status: 'open' | 'closed';
  description: string;
  registrationLink?: string;
}

export interface SpecialCamp {
  title: string;
  date: string;
  description: string;
  bannerUrl: string;
}
export interface Student {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  joined: string;
  phone?: string;
  email?: string;
}

export interface Merchandise {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}

export interface SiteContent {
  logoUrl?: string;
  hero: {
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
    youtube: string;
    twitter?: string;
    locationImages?: string[];
  };
  sections: {
    about: boolean;
    programs: boolean;
    whyChess: boolean;
    trainers: boolean;
    gallery: boolean;
    tournaments: boolean;
    franchise: boolean;
    specialCamps: boolean;
    merchandise?: boolean;
    socialMediaSection?: boolean;
  };
  features?: string[];
  gallery: string[];
  specialCamps?: SpecialCamp[];
  merchandise?: Merchandise[];
  socialMediaSection?: {
    instagram: string;
    facebook: string;
    youtube: string;
    images: string[];
  };
}
