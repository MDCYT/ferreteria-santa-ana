import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link';

function ContactSection() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contacto</h3>
      <p>Dirección: Mz. N1 Lt. 14 Urb. San Diego - San Martín de Porres - Lima</p>
      <p>Teléfono: <Link href="tel:+51922263021">+51 922 263 021</Link></p>
      <p>Email: <Link href="mailto:info@ferreteria-santaana.com.pe">info@ferreteria-santaana.com.pe</Link></p>
    </div>
  );
}

function QuickLinksSection() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
      <ul>
        <li><a href="/#" className="hover:underline">Sobre nosotros</a></li>
        <li><a href="/#" className="hover:underline">Política de privacidad</a></li>
        <li><a href="/#" className="hover:underline">Términos y condiciones</a></li>
        <li><a href="/#" className="hover:underline">Preguntas frecuentes</a></li>
      </ul>
    </div>
  );
}

function FollowUsSection() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
      <div className="flex space-x-4">
        <a href="/#" className="hover:text-secondary"><Facebook /></a>
        <a href="/#" className="hover:text-secondary"><Instagram /></a>
        <a href="/#" className="hover:text-secondary"><Twitter /></a>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary dark:text-white text-primary-foreground dark:text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContactSection />
          <QuickLinksSection />
          <FollowUsSection />
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Ferretería Santa Ana. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
