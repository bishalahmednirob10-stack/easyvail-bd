import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/shopify";
import { localProducts } from "@/lib/products";

export const revalidate = 3600;

export default async function HomePage() {
  let products = [];
  let usingLocalCatalog = false;

  try {
    products = await getAllProducts();
  } catch (caughtError) {
    usingLocalCatalog = true;
    products = localProducts;
  }

  if (products.length === 0) {
    usingLocalCatalog = true;
    products = localProducts;
  }

  return (
    <div>
      <section className="bg-[#f6efe6]">
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="max-w-xl">
            <p className="mb-4 text-xs uppercase tracking-[0.32em] text-rose-800">
              EasyVail BD Collection
            </p>
            <h1 className="font-display text-5xl font-semibold leading-tight text-stone-950 md:text-7xl">
              Modest hijabs, arranged with quiet elegance.
            </h1>
            <p className="mt-6 text-lg leading-8 text-stone-600">
              Explore Namaji, Gola, and Iqra styles curated from your product
              shoots, with soft cotton, lace, and georgette finishes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#shop"
                className="rounded-full bg-stone-950 px-7 py-3 text-sm font-medium text-white transition hover:bg-rose-800"
              >
                Shop Collection
              </a>
              <a
                href="/collections/gola"
                className="rounded-full border border-stone-300 px-7 py-3 text-sm font-medium text-stone-900 transition hover:border-stone-900"
              >
                View Gola
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="pt-12">
              <img
                src="/products/namaji-floral-black-model.png"
                alt="Namaji floral black hijab"
                className="aspect-[3/4] w-full rounded-lg object-cover shadow-xl"
              />
            </div>
            <div className="space-y-4">
              <img
                src="/products/gola-white-lace-model.png"
                alt="Gola white lace hijab"
                className="aspect-[3/4] w-full rounded-lg object-cover shadow-xl"
              />
              <img
                src="/products/gola-teal-lace-studio.png"
                alt="Gola teal lace hijab"
                className="aspect-[4/3] w-full rounded-lg object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-stone-500">
              {usingLocalCatalog ? "Curated Products" : "Shopify Products"}
            </p>
            <h2 className="font-display text-4xl text-stone-950">Our Collection</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <a href="/collections/namaji" className="rounded-full border border-stone-300 px-4 py-2 hover:border-stone-900">
              Namaji
            </a>
            <a href="/collections/gola" className="rounded-full border border-stone-300 px-4 py-2 hover:border-stone-900">
              Gola
            </a>
            <a href="/collections/iqra" className="rounded-full border border-stone-300 px-4 py-2 hover:border-stone-900">
              Iqra
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-rose-50 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 text-center sm:px-6 md:grid-cols-4 md:text-left lg:px-8">
          {["Premium fabric", "Breathable drape", "Prayer ready", "Elegant finish"].map(
            (item) => (
              <div key={item}>
                <p className="font-display text-2xl text-stone-900">{item}</p>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  Carefully presented for modest daily wear and graceful occasions.
                </p>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
