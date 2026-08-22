import { X, UtensilsCrossed, MapPin, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
  onManageMenu: () => void;
  onManageContact: () => void;
  onManageRestaurant: () => void;
}

export function AdminPanel({
  open,
  onClose,
  onManageMenu,
  onManageContact,
  onManageRestaurant,
}: AdminPanelProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4">
          <CardTitle className="text-2xl font-serif">Admin Panel</CardTitle>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            data-testid="button-close-admin-panel"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full h-16 justify-start gap-4 text-left"
            onClick={() => { onManageRestaurant(); onClose(); }}
            data-testid="button-manage-restaurant"
          >
            <div className="w-10 h-10 rounded-full bg-chart-3/10 flex items-center justify-center flex-shrink-0">
              <Store className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <div className="font-semibold">Edit Restaurant Info</div>
              <div className="text-sm text-muted-foreground">
                Name, tagline, about text & images
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full h-16 justify-start gap-4 text-left"
            onClick={() => { onManageMenu(); onClose(); }}
            data-testid="button-manage-menu"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <UtensilsCrossed className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold">Manage Menu</div>
              <div className="text-sm text-muted-foreground">
                Add, edit, or remove menu items
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full h-16 justify-start gap-4 text-left"
            onClick={() => { onManageContact(); onClose(); }}
            data-testid="button-manage-contact"
          >
            <div className="w-10 h-10 rounded-full bg-chart-2/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <div className="font-semibold">Edit Contact Info</div>
              <div className="text-sm text-muted-foreground">
                Update phone, email, and social links
              </div>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
