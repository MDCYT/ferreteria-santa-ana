import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer({ primaryColor }: { primaryColor: string }) {
  return (
    <footer className="bg-primary text-primary-foreground" style={{ backgroundColor: primaryColor }}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p>Dirección: Av. Principal 123, Lima</p>
            <p>Teléfono: (01) 234-5678</p>
            <p>Email: info@ferreteriasantaana.com.pe</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul>
              <li><a href="/#" className="hover:underline">Sobre nosotros</a></li>
              <li><a href="/#" className="hover:underline">Política de privacidad</a></li>
              <li><a href="/#" className="hover:underline">Términos y condiciones</a></li>
              <li><a href="/#" className="hover:underline">Preguntas frecuentes</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="/#" className="hover:text-secondary"><Facebook /></a>
              <a href="/#" className="hover:text-secondary"><Instagram /></a>
              <a href="/#" className="hover:text-secondary"><Twitter /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Ferretería Santa Ana. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}