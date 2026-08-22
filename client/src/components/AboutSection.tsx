import type { RestaurantInfo } from "@shared/schema";

interface AboutSectionProps {
  restaurantInfo: RestaurantInfo | null;
}

export function AboutSection({ restaurantInfo }: AboutSectionProps) {
  const aboutImage = restaurantInfo?.aboutImage ?? "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800";
  const description = restaurantInfo?.description ?? "Founded in 2010, Delizioso has been serving exquisite culinary experiences to food lovers from around the world. Our passion for fresh ingredients, innovative recipes, and warm hospitality has made us a beloved destination for memorable dining.";

  const stats = [
    { value: "13+", label: "Years", color: "text-primary" },
    { value: "50K+", label: "Customers", color: "text-chart-2" },
    { value: "25+", label: "Awards", color: "text-chart-3" },
  ];

  return (
    <section className="min-h-screen py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"
          data-testid="text-about-heading"
        >
          About Us
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src={aboutImage}
              alt="Restaurant interior"
              className="rounded-xl shadow-2xl w-full object-cover aspect-[4/3]"
              data-testid="img-about"
            />
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <h3
              className="text-2xl md:text-3xl font-serif font-bold text-foreground"
              data-testid="text-about-subtitle"
            >
              Our Story
            </h3>
            <p
              className="text-muted-foreground text-lg leading-relaxed"
              data-testid="text-about-description"
            >
              {description}
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every dish we create is a celebration of flavors, textures, and
              traditions passed down through generations. Our chefs bring
              together the finest local ingredients with culinary expertise to
              craft meals that delight all senses.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-8">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center"
                  data-testid={`stat-${stat.label.toLowerCase()}`}
                >
                  <div className={`text-4xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground text-sm mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
