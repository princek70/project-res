import { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { MenuItem, Category } from "@shared/schema";
import { categories } from "@shared/schema";
import { useAuth } from "@/context/AuthContext";

interface MenuSectionProps {
  menuItems: MenuItem[];
  isLoading: boolean;
  onEditItem: (item: MenuItem) => void;
  onDeleteItem: (id: number) => void;
  onAddItem: () => void;
}

export function MenuSection({
  menuItems,
  isLoading,
  onEditItem,
  onDeleteItem,
  onAddItem,
}: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("Starters");
  const { isAdmin } = useAuth();

  const filteredItems = menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section className="min-h-screen py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-serif font-bold text-center mb-8 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"
          data-testid="text-menu-heading"
        >
          Our Menu
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "secondary"}
              onClick={() => setActiveCategory(category)}
              data-testid={`button-category-${category.toLowerCase().replace(" ", "-")}`}
              className="rounded-full px-6"
            >
              {category}
            </Button>
          ))}
        </div>

        {isAdmin && (
          <div className="flex justify-center mb-8">
            <Button
              onClick={onAddItem}
              data-testid="button-add-menu-item"
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Menu Item
            </Button>
          </div>
        )}

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full aspect-[4/3]" />
                <CardContent className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg" data-testid="text-menu-empty">
              No items in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden group transition-transform hover:scale-[1.02]"
                data-testid={`card-menu-item-${item.id}`}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-[4/3] object-cover"
                    data-testid={`img-menu-item-${item.id}`}
                  />
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => onEditItem(item)}
                        data-testid={`button-edit-item-${item.id}`}
                        className="bg-background/90 backdrop-blur-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => onDeleteItem(item.id)}
                        data-testid={`button-delete-item-${item.id}`}
                        className="bg-destructive/90 backdrop-blur-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3
                      className="text-xl font-semibold text-foreground"
                      data-testid={`text-menu-item-name-${item.id}`}
                    >
                      {item.name}
                    </h3>
                    <span
                      className="text-lg font-bold text-primary whitespace-nowrap"
                      data-testid={`text-menu-item-price-${item.id}`}
                    >
                      ₹{item.price.toFixed(0)}
                    </span>
                  </div>
                  <p
                    className="text-muted-foreground line-clamp-2"
                    data-testid={`text-menu-item-desc-${item.id}`}
                  >
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
