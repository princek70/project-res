import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { MenuSection } from "@/components/MenuSection";
import { GallerySection } from "@/components/GallerySection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { LoginModal } from "@/components/LoginModal";
import { MenuItemFormModal } from "@/components/MenuItemFormModal";
import { ContactEditModal } from "@/components/ContactEditModal";
import { RestaurantEditModal } from "@/components/RestaurantEditModal";
import { AdminPanel } from "@/components/AdminPanel";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { MenuItem, ContactInfo, InsertMenuItem, RestaurantInfo } from "@shared/schema";

type Section = "home" | "about" | "menu" | "gallery" | "contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showMenuItemModal, setShowMenuItemModal] = useState(false);
  const [showContactEditModal, setShowContactEditModal] = useState(false);
  const [showRestaurantEditModal, setShowRestaurantEditModal] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const { toast } = useToast();

  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    menu: useRef<HTMLDivElement>(null),
    gallery: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: Section) => {
    setActiveSection(section);
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (const section of ["contact", "gallery", "menu", "about", "home"] as Section[]) {
        const ref = sectionRefs[section].current;
        if (ref && ref.offsetTop <= scrollPos) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: menuItems = [], isLoading: menuLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu"],
  });

  const { data: contactInfo, isLoading: contactLoading } = useQuery<ContactInfo>({
    queryKey: ["/api/contact"],
  });

  const { data: restaurantInfo } = useQuery<RestaurantInfo>({
    queryKey: ["/api/restaurant"],
  });

  const saveMenuItemMutation = useMutation({
    mutationFn: async ({ item, id }: { item: InsertMenuItem; id?: number }) => {
      if (id) return apiRequest("PUT", `/api/menu/${id}`, item);
      return apiRequest("POST", "/api/menu", item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu"] });
      toast({ title: "Success", description: "Menu item saved successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save menu item.", variant: "destructive" });
    },
  });

  const deleteMenuItemMutation = useMutation({
    mutationFn: async (id: number) => apiRequest("DELETE", `/api/menu/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/menu"] });
      toast({ title: "Deleted", description: "Menu item removed successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete menu item.", variant: "destructive" });
    },
  });

  const saveContactMutation = useMutation({
    mutationFn: async (info: ContactInfo) => apiRequest("PUT", "/api/contact", info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      toast({ title: "Success", description: "Contact information updated." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update contact information.", variant: "destructive" });
    },
  });

  const saveRestaurantMutation = useMutation({
    mutationFn: async (info: RestaurantInfo) => apiRequest("PUT", "/api/restaurant", info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/restaurant"] });
      toast({ title: "Success", description: "Restaurant info updated." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update restaurant info.", variant: "destructive" });
    },
  });

  const handleSaveMenuItem = async (item: InsertMenuItem, id?: number) => {
    await saveMenuItemMutation.mutateAsync({ item, id });
  };

  const handleDeleteMenuItem = (id: number) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      deleteMenuItemMutation.mutate(id);
    }
  };

  const handleEditMenuItem = (item: MenuItem) => {
    setEditingMenuItem(item);
    setShowMenuItemModal(true);
  };

  const handleAddMenuItem = () => {
    setEditingMenuItem(null);
    setShowMenuItemModal(true);
  };

  const handleSaveContact = async (info: ContactInfo) => {
    await saveContactMutation.mutateAsync(info);
  };

  const handleSaveRestaurant = async (info: RestaurantInfo) => {
    await saveRestaurantMutation.mutateAsync(info);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        activeSection={activeSection}
        onSectionChange={scrollToSection}
        onLoginClick={() => setShowLoginModal(true)}
        onAdminPanelClick={() => setShowAdminPanel(true)}
        restaurantName={restaurantInfo?.name}
      />

      <div ref={sectionRefs.home}>
        <HeroSection
          onExploreMenu={() => scrollToSection("menu")}
          restaurantInfo={restaurantInfo ?? null}
        />
      </div>

      <div ref={sectionRefs.about}>
        <AboutSection restaurantInfo={restaurantInfo ?? null} />
      </div>

      <div ref={sectionRefs.menu}>
        <MenuSection
          menuItems={menuItems}
          isLoading={menuLoading}
          onEditItem={handleEditMenuItem}
          onDeleteItem={handleDeleteMenuItem}
          onAddItem={handleAddMenuItem}
        />
      </div>

      <div ref={sectionRefs.gallery}>
        <GallerySection />
      </div>

      <div ref={sectionRefs.contact}>
        <ContactSection
          contactInfo={contactInfo ?? null}
          isLoading={contactLoading}
          onEditContact={() => setShowContactEditModal(true)}
        />
      </div>

      <Footer />

      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />

      <AdminPanel
        open={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
        onManageMenu={() => scrollToSection("menu")}
        onManageContact={() => setShowContactEditModal(true)}
        onManageRestaurant={() => setShowRestaurantEditModal(true)}
      />

      <MenuItemFormModal
        open={showMenuItemModal}
        onOpenChange={setShowMenuItemModal}
        editingItem={editingMenuItem}
        onSave={handleSaveMenuItem}
        isLoading={saveMenuItemMutation.isPending}
      />

      <ContactEditModal
        open={showContactEditModal}
        onOpenChange={setShowContactEditModal}
        contactInfo={contactInfo ?? null}
        onSave={handleSaveContact}
        isLoading={saveContactMutation.isPending}
      />

      <RestaurantEditModal
        open={showRestaurantEditModal}
        onOpenChange={setShowRestaurantEditModal}
        restaurantInfo={restaurantInfo ?? null}
        onSave={handleSaveRestaurant}
        isLoading={saveRestaurantMutation.isPending}
      />
    </div>
  );
}
