import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { WhyChess } from '@/components/sections/WhyChess';
import { Franchise } from '@/components/sections/Franchise';
import { SpecialCamps } from '@/components/sections/SpecialCamps';
import { Tournaments } from '@/components/sections/Tournaments';
import { Gallery } from '@/components/sections/Gallery';
import { Contact } from '@/components/sections/Contact';
import { Merchandise } from '@/components/sections/Merchandise';
import { SocialMedia } from '@/components/sections/SocialMedia';
import { getSiteContent, getTournaments } from '@/lib/site-data';

export default async function HomePage() {
  const [content, tournaments] = await Promise.all([
    getSiteContent(),
    getTournaments()
  ]);
  
  const { sections } = content;

  return (
    <>
      <Hero
        title={content.hero.title}
        description={content.hero.description}
        ctaPrimary={content.hero.ctaPrimary}
        ctaSecondary={content.hero.ctaSecondary}
        logoUrl={content.logoUrl}
      />
      {sections.about && <About highlights={content.features} />}
      {sections.gallery && <Gallery images={content.gallery} />}
      {sections.whyChess && <WhyChess />}
      {sections.merchandise && <Merchandise items={content.merchandise || []} />}
      {sections.specialCamps && <SpecialCamps camps={content.specialCamps} />}
      {sections.tournaments && <Tournaments tournaments={tournaments} />}
      {sections.franchise && <Franchise />}
      {sections.socialMediaSection && <SocialMedia data={content.socialMediaSection} />}
      <Contact info={content.contact} logoUrl={content.logoUrl} />
    </>
  );
}