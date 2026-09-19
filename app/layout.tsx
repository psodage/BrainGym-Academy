import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'BrainGym Academy | Mindful Learning & Confident Children',
 description: 'Explore child-friendly meditation, mindfulness, brain training, and confidence-building activities at BrainGym Academy. Enquire about a demo class.',
 icons: { icon: '/braingym-logo.jpeg', shortcut: '/braingym-logo.jpeg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className="antialiased">{children}</body></html>; }
