import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/shopify";
import { getLocalProductsByCollection } from "@/lib/products";

const titles = {
  nida: "Nida Hijabs",
  chiffon: "Chiffon Hijabs",
  jersey: "Jersey Hijabs",
  instant: "Instant Hijabs",
  namaji: "Namaji Hijabs",
  gola: "Gola Hijabs",
  iqra: "Iqra Hijabs",
};

function matchesCollection(product, type) {
  const haystack = [
    product.productType,
    product.title,
    product.handle,
    ...(product.tags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(type.toLowerCase());
}

export default async function CollectionPage({ params }) {
  const title = titles[params.type] || "Collection";
  let products = [];
  let error = null;

  try {
    const allProducts = await getAllProducts();
    products = allProducts.filter((product) => matchesCollection(product, params.type));
  } catch (caughtError) {
    error = caughtError;
    products = getLocalProductsByCollection(params.type);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-stone-500">
          EasyVail BD
        </p>
        <h1 className="font-display text-4xl text-stone-900">{title}</h1>
      </div>

      {error && products.length > 0 && (
        <p className="mb-8 text-center text-sm text-stone-500">
          Showing your curated product photos while Shopify is not connected.
        </p>
      )}

      {products.length === 0 ? (
        <div className="rounded-lg border border-stone-200 bg-white p-8 text-center text-stone-600">
          No products found in this collection yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
