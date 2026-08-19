import './globals.css';
import SmoothScroll from '../components/SmoothScroll';
import SoundProvider from '../components/SoundProvider';
import NoiseOverlay from '../components/NoiseOverlay';
import MasterCanvas from '../components/MasterCanvas';

export const metadata = {
  title: 'MNKDIGITAL — Web & App Developer',
  description: 'Architecting secure, resilient & high-performance systems.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#040406] text-white antialiased selection:bg-blue-600 selection:text-white">
        <SoundProvider>
          <SmoothScroll>
            <NoiseOverlay />
            <MasterCanvas />
            {children}
          </SmoothScroll>
        </SoundProvider>
      </body>
    </html>
  );
}
