import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { contactInfoSchema, type ContactInfo } from "@shared/schema";

interface ContactEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactInfo: ContactInfo | null;
  onSave: (info: ContactInfo) => Promise<void>;
  isLoading: boolean;
}

export function ContactEditModal({
  open,
  onOpenChange,
  contactInfo,
  onSave,
  isLoading,
}: ContactEditModalProps) {
  const form = useForm<ContactInfo>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      phone: "",
      email: "",
      address: "",
      instagram: "",
      facebook: "",
      twitter: "",
      mapEmbed: "",
    },
  });

  useEffect(() => {
    if (contactInfo) {
      form.reset(contactInfo);
    }
  }, [contactInfo, form]);

  const onSubmit = async (data: ContactInfo) => {
    await onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            Edit Contact Information
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="+1 (555) 123-4567"
                      data-testid="input-contact-edit-phone"
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="info@example.com"
                      data-testid="input-contact-edit-email"
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="123 Main St, City, State ZIP"
                      data-testid="input-contact-edit-address"
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://instagram.com/yourpage"
                      data-testid="input-contact-edit-instagram"
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://facebook.com/yourpage"
                      data-testid="input-contact-edit-facebook"
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://twitter.com/yourpage"
                      data-testid="input-contact-edit-twitter"
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mapEmbed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Maps Embed URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://www.google.com/maps/embed?..."
                      data-testid="input-contact-edit-map"
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                data-testid="button-contact-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                data-testid="button-contact-save"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
