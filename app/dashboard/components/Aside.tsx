import Link from "next/link";
import { Home, Package, Package2, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface AsideProps {
  page?: string;
}

const Aside = ({ page }: AsideProps) => {
  page = page ?? "dashboard";
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Ferreteria Santa Ana</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                {
                  "bg-accent text-accent-foreground": page === "dashboard",
                }
              )}
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/products"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                {
                  "bg-accent text-accent-foreground": page === "products",
                }
              )}
            >
              <Package className="h-5 w-5" />
              <span className="sr-only">Productos</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Productos</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/settings"
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                {
                  "bg-accent text-accent-foreground": page === "settings",
                }
              )}
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configuraciones</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Configuraciones</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default Aside;
