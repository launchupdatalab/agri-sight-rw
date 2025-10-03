import { Link, useLocation } from "react-router-dom";
import { Sprout, Home, Map, TrendingUp, CloudSun, BarChart3 } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/regions", label: "Regions", icon: Map },
    { path: "/market", label: "Market", icon: TrendingUp },
    { path: "/weather", label: "Weather", icon: CloudSun },
    { path: "/predictions", label: "Predictions", icon: BarChart3 },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:text-primary/90 transition-colors">
            <Sprout className="h-6 w-6" />
            AgriConnect Rwanda
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive(path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      
      <main className="container py-8">
        {children}
      </main>
      
      <footer className="border-t border-border mt-16">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 AgriConnect Rwanda. Powered by NISR Open Data.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
