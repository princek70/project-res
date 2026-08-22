import { Button } from "@/components/ui/button";
import type { RestaurantInfo } from "@shared/schema";

interface HeroSectionProps {
  onExploreMenu: () => void;
  restaurantInfo: RestaurantInfo | null;
}

export function HeroSection({ onExploreMenu, restaurantInfo }: HeroSectionProps) {
  const heroImage = restaurantInfo?.heroImage ?? "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600";
  const name = restaurantInfo?.name ?? "Delizioso";
  const tagline = restaurantInfo?.tagline ?? "Where Every Meal is a Masterpiece";

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1
          className="text-6xl md:text-8xl font-serif font-bold mb-6 drop-shadow-lg"
          data-testid="text-hero-title"
        >
          {name}
        </h1>
        <p
          className="text-2xl md:text-3xl mb-10 font-light tracking-wide"
          data-testid="text-hero-subtitle"
        >
          {tagline}
        </p>
        <Button
          onClick={onExploreMenu}
          size="lg"
          data-testid="button-explore-menu"
          className="bg-gradient-to-r from-primary to-chart-2 border-primary text-white px-10 py-6 rounded-full text-lg font-semibold shadow-2xl transition-transform hover:scale-105"
        >
          Explore Menu
        </Button>
      </div>
    </section>
  );
}
