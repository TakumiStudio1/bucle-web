import { categories } from "@/data/products";

export function CategoryTabs() {
  return (
    <nav
      aria-label="Secciones de la carta"
      className="sticky top-16 z-20 -mx-4 overflow-x-auto border-b-2 border-cocoa/10 bg-cream/95 px-4 py-3 backdrop-blur-sm sm:mx-0 sm:rounded-full sm:border sm:px-2"
    >
      <ul className="flex w-max gap-1 sm:w-auto sm:justify-center">
        {categories.map((category) => (
          <li key={category.id}>
            <a
              href={`#${category.id}`}
              className="font-display block rounded-full px-4 py-2 text-sm whitespace-nowrap text-cocoa uppercase hover:bg-grape/10"
            >
              {category.shortLabel}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
