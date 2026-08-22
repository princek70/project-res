import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { restaurantInfoSchema, type RestaurantInfo } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface RestaurantEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurantInfo: RestaurantInfo | null;
  onSave: (info: RestaurantInfo) => Promise<void>;
  isLoading: boolean;
}

export function RestaurantEditModal({
  open,
  onOpenChange,
  restaurantInfo,
  onSave,
  isLoading,
}: RestaurantEditModalProps) {
  const form = useForm<RestaurantInfo>({
    resolver: zodResolver(restaurantInfoSchema),
    values: restaurantInfo ?? {
      name: "Delizioso",
      tagline: "Where Every Meal is a Masterpiece",
      description: "",
      heroImage: "",
      aboutImage: "",
    },
  });

  const handleSubmit = async (data: RestaurantInfo) => {
    await onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Edit Restaurant Info</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Delizioso"
                      data-testid="input-restaurant-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Tagline</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Where Every Meal is a Masterpiece"
                      data-testid="input-restaurant-tagline"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Us Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell your restaurant's story..."
                      className="min-h-[100px]"
                      data-testid="input-restaurant-description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="heroImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Background Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://..."
                      data-testid="input-restaurant-hero-image"
                      {...field}
                    />
                  </FormControl>
                  {field.value && (
                    <img
                      src={field.value}
                      alt="Hero preview"
                      className="w-full h-24 object-cover rounded-md mt-1"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aboutImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Section Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://..."
                      data-testid="input-restaurant-about-image"
                      {...field}
                    />
                  </FormControl>
                  {field.value && (
                    <img
                      src={field.value}
                      alt="About preview"
                      className="w-full h-24 object-cover rounded-md mt-1"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
                data-testid="button-cancel-restaurant"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isLoading}
                data-testid="button-save-restaurant"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
