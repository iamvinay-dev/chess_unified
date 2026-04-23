import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getSiteContent } from '@/lib/site-data'; export default async function SiteLayout({ children,
}: { children: React.ReactNode;
}) { const content = await getSiteContent(); return ( <> <Header logoUrl={content.logoUrl} /> <main className="flex-grow">{children}</main> <Footer logoUrl={content.logoUrl} /> </> );
}
