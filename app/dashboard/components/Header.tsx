import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, LineChart, Package, Package2, PanelLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

interface HeaderProps {
  page?: string;
}

const Header = ({ page }: HeaderProps) => {
  page = page ?? "dashboard";
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Abrir Menú</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs bg-black">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Ferreteria Santa Ana</span>
            </Link>
            <Link
              href="/dashboard"
              className={
                page === "dashboard"
                  ? "flex items-center gap-4 px-2.5 text-foreground"
                  : "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              }
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/products"
              className={
                page === "products"
                  ? "flex items-center gap-4 px-2.5 text-foreground"
                  : "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              }
            >
              <Package className="h-5 w-5" />
              Productos
            </Link>
            <Link
              href="/dashboard/settings"
              className={
                page === "settings"
                  ? "flex items-center gap-4 px-2.5 text-foreground"
                  : "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              }
            >
              <LineChart className="h-5 w-5" />
              Configuraciones
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild></DropdownMenuTrigger>
      </DropdownMenu>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/products">Productos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Todos los productos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};

export default Header;
