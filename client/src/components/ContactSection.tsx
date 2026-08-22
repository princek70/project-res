import { useState } from "react";
import { Phone, Mail, MapPin, Edit2, Instagram, Facebook, Twitter, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { ContactInfo } from "@shared/schema";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/queryClient";

interface ContactSectionProps {
  contactInfo: ContactInfo | null;
  isLoading: boolean;
  onEditContact: () => void;
}

export function ContactSection({
  contactInfo,
  isLoading,
  onEditContact,
}: ContactSectionProps) {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendMessageMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) =>
      apiRequest("POST", "/api/contact/message", data),
    onSuccess: () => {
      toast({ title: "Message Sent!", description: "Thank you for reaching out. We'll get back to you soon." });
      setName("");
      setEmail("");
      setMessage("");
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: "Missing fields", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    sendMessageMutation.mutate({ name, email, message });
  };

  const socialLinks = contactInfo
    ? [
        { icon: Instagram, href: contactInfo.instagram, label: "Instagram" },
        { icon: Facebook, href: contactInfo.facebook, label: "Facebook" },
        { icon: Twitter, href: contactInfo.twitter, label: "Twitter" },
      ]
    : [];

  return (
    <section className="min-h-screen py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-16">
          <h2
            className="text-4xl md:text-5xl font-serif font-bold text-center bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"
            data-testid="text-contact-heading"
          >
            Contact Us
          </h2>
          {isAdmin && (
            <Button
              size="icon"
              variant="ghost"
              onClick={onEditContact}
              data-testid="button-edit-contact"
            >
              <Edit2 className="w-5 h-5" />
            </Button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-bold mb-6 text-foreground">
                Send us a Message
              </h3>
              <form className="space-y-6" data-testid="form-contact" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    data-testid="input-contact-name"
                    className="h-12"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={sendMessageMutation.isPending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    data-testid="input-contact-email"
                    className="h-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={sendMessageMutation.isPending}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message here..."
                    rows={4}
                    data-testid="input-contact-message"
                    className="resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={sendMessageMutation.isPending}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12"
                  data-testid="button-send-message"
                  disabled={sendMessageMutation.isPending}
                >
                  {sendMessageMutation.isPending ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {isLoading ? (
              <>
                <Skeleton className="w-full aspect-video rounded-lg" />
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
              </>
            ) : contactInfo ? (
              <>
                <div className="rounded-lg overflow-hidden shadow-lg aspect-video">
                  <iframe
                    src={contactInfo.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Restaurant Location"
                    data-testid="map-embed"
                  />
                </div>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p
                          className="font-medium text-foreground"
                          data-testid="text-contact-phone"
                        >
                          {contactInfo.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p
                          className="font-medium text-foreground"
                          data-testid="text-contact-email"
                        >
                          {contactInfo.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p
                          className="font-medium text-foreground"
                          data-testid="text-contact-address"
                        >
                          {contactInfo.address}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-3">
                        Follow Us
                      </p>
                      <div className="flex gap-3">
                        {socialLinks.map((social) => (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`link-social-${social.label.toLowerCase()}`}
                            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                          >
                            <social.icon className="w-5 h-5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
