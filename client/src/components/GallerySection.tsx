import { galleryImages } from "@/lib/constants";

export function GallerySection() {
  return (
    <section className="min-h-screen py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"
          data-testid="text-gallery-heading"
        >
          Gallery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg group ${
                index === 0 ? "md:row-span-2" : ""
              }`}
              data-testid={`gallery-image-${index}`}
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
                  index === 0 ? "h-full min-h-[400px]" : "aspect-[4/3]"
                }`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
