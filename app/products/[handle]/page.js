import { getProductByHandle } from "@/lib/shopify";
import { formatMoney } from "@/lib/money";
import { getLocalProductByHandle } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";

export default async function ProductPage({ params }) {
  let product = null;

  try {
    product = await getProductByHandle(params.handle);
  } catch {
    product = getLocalProductByHandle(params.handle);
  }

  if (!product) {
    return <div className="py-20 text-center">Product not found</div>;
  }

  const images = product.images?.length ? product.images : [{ src: "/placeholder.svg" }];
  const variants = product.variants || [];
  const options = product.options || [];
  const price = product.variants?.[0]?.price?.amount;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden rounded-lg bg-stone-100">
            <img
              src={images[0].src}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {images.slice(1).map((image) => (
                <div key={image.src} className="aspect-[4/5] overflow-hidden rounded-lg bg-stone-100">
                  <img
                    src={image.src}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs uppercase tracking-wider text-stone-500">
            {product.productType || "Hijab"}
          </p>
          <div>
            <h1 className="font-display text-4xl md:text-5xl">{product.title}</h1>
            <p className="mt-3 text-sm text-stone-500">
              {product.material || "Premium fabric"} {product.color ? `- ${product.color}` : ""}
            </p>
          </div>

          {price && <p className="text-2xl font-medium">{formatMoney(price)}</p>}

          <p className="leading-8 text-stone-600">{product.description}</p>

          {product.features?.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {product.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-lg border border-stone-200 bg-white p-3 text-sm text-stone-700"
                >
                  {feature}
                </div>
              ))}
            </div>
          )}

          {options.map((option) => (
            <div key={option.name}>
              <p className="mb-2 text-sm font-medium">{option.name}</p>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => (
                  <button
                    key={value}
                    className="rounded-md border border-stone-300 px-4 py-2 text-sm transition hover:border-stone-900"
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {variants.length > 0 ? (
            <AddToCartButton variants={variants} />
          ) : (
            <a
              href="tel:01572909366"
              className="block w-full rounded-lg bg-rose-700 py-4 text-center text-lg font-medium text-white transition hover:bg-rose-800"
            >
              Call to Order
            </a>
          )}

          <div className="rounded-lg bg-rose-50 p-4 text-sm leading-6 text-stone-600">
            For current price and stock, contact EasyVail BD at 01572-909366.
          </div>
        </div>
      </div>
    </div>
  );
}
