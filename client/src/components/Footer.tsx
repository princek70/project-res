export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold mb-2">Delizioso</h3>
            <p className="text-background/70">Where Every Meal is a Masterpiece</p>
          </div>
          <div className="text-center md:text-right text-background/70 text-sm">
            <p>&copy; {new Date().getFullYear()} Delizioso. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
