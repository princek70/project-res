import { useState } from "react";
import { Menu, X, LogIn, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

type Section = "home" | "about" | "menu" | "gallery" | "contact";

interface NavigationProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  onLoginClick: () => void;
  onAdminPanelClick: () => void;
  restaurantName?: string;
}

const sections: Section[] = ["home", "about", "menu", "gallery", "contact"];

export function Navigation({
  activeSection,
  onSectionChange,
  onLoginClick,
  onAdminPanelClick,
  restaurantName,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin, logout } = useAuth();

  const handleNavClick = (section: Section) => {
    onSectionChange(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-full bg-background/95 backdrop-blur-sm shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center"
            data-testid="link-home-logo"
          >
            <h1 className="text-3xl font-serif font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              {restaurantName ?? "Delizioso"}
            </h1>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                data-testid={`link-nav-${section}`}
                className={`capitalize font-medium transition-colors relative py-1 ${
                  activeSection === section
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {section}
                {activeSection === section && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}

            {isAdmin ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={onAdminPanelClick}
                  data-testid="button-admin-panel"
                  className="gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Admin Panel
                </Button>
                <Button
                  variant="ghost"
                  onClick={logout}
                  data-testid="button-logout"
                  className="gap-2 text-destructive hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={onLoginClick}
                data-testid="button-admin-login"
                className="gap-2"
              >
                <LogIn className="w-4 h-4" />
                Admin Login
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="px-4 py-2 space-y-1">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                data-testid={`link-mobile-nav-${section}`}
                className={`block w-full text-left px-3 py-2 rounded-md capitalize font-medium transition-colors ${
                  activeSection === section
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
              >
                {section}
              </button>
            ))}
            <div className="pt-2 border-t">
              {isAdmin ? (
                <>
                  <button
                    onClick={() => {
                      onAdminPanelClick();
                      setMobileMenuOpen(false);
                    }}
                    data-testid="button-mobile-admin-panel"
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-muted"
                  >
                    <Settings className="w-4 h-4" />
                    Admin Panel
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    data-testid="button-mobile-logout"
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-destructive hover:bg-muted"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  data-testid="button-mobile-login"
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-md bg-primary text-primary-foreground"
                >
                  <LogIn className="w-4 h-4" />
                  Admin Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
