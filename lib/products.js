export const localProducts = [
  {
    id: "namaji-floral-black",
    handle: "namaji-floral-black",
    title: "Namaji Floral Black Hijab",
    productType: "Namaji Hijab",
    collection: "namaji",
    material: "Premium Cotton",
    color: "Black floral",
    description:
      "A statement Namaji hijab with warm floral detailing, black lace accents, and a soft cotton finish for daily prayer and elegant everyday wear.",
    images: [
      { src: "/products/namaji-floral-black.png" },
      { src: "/products/namaji-floral-black-model.png" },
    ],
    tags: ["namaji", "cotton", "floral", "black", "prayer"],
    features: ["Premium cotton", "Breathable fabric", "Easy to wear", "Elegant lace trim"],
  },
  {
    id: "gola-white-lace",
    handle: "gola-white-lace",
    title: "Gola White Lace Hijab",
    productType: "Gola Hijab",
    collection: "gola",
    material: "Soft Lace",
    color: "White",
    description:
      "A delicate white lace Gola hijab with floral embroidery and a soft translucent finish for a graceful, refined look.",
    images: [
      { src: "/products/gola-white-lace.png" },
      { src: "/products/gola-white-lace-model.png" },
    ],
    tags: ["gola", "lace", "white", "occasion"],
    features: ["Soft lace fabric", "Lightweight", "Elegant floral embroidery", "Daily use"],
  },
  {
    id: "gola-teal-lace",
    handle: "gola-teal-lace",
    title: "Gola Teal Pattern Hijab",
    productType: "Gola Hijab",
    collection: "gola",
    material: "Premium Lace",
    color: "Teal",
    description:
      "A teal patterned Gola hijab with geometric lace texture, airy drape, and a polished finish for modest styling.",
    images: [
      { src: "/products/gola-teal-lace.png" },
      { src: "/products/gola-teal-lace-studio.png" },
      { src: "/products/gola-teal-lace-model.png" },
    ],
    tags: ["gola", "lace", "teal", "pattern"],
    features: ["Premium lace", "Breathable fabric", "Lightweight", "Elegant look"],
  },
  {
    id: "namaji-blue-cotton",
    handle: "namaji-blue-cotton",
    title: "Namaji Blue Cotton Hijab",
    productType: "Namaji Hijab",
    collection: "namaji",
    material: "Premium Cotton",
    color: "Blue",
    description:
      "A bright blue Namaji hijab with soft white lace borders, made for comfort, breathability, and everyday prayer.",
    images: [{ src: "/products/namaji-blue-cotton.png" }],
    tags: ["namaji", "cotton", "blue", "prayer"],
    features: ["Premium cotton", "Breathable fabric", "Soft lace finish", "Easy to wear"],
  },
  {
    id: "namaji-green-cotton",
    handle: "namaji-green-cotton",
    title: "Namaji Green Daisy Hijab",
    productType: "Namaji Hijab",
    collection: "namaji",
    material: "Soft Cotton",
    color: "Green",
    description:
      "A deep green floral Namaji hijab with comfortable cotton drape and a refined lace border for daily prayer.",
    images: [{ src: "/products/namaji-green-cotton.png" }],
    tags: ["namaji", "cotton", "green", "floral", "prayer"],
    features: ["Soft cotton", "Lightweight", "Comfortable drape", "Prayer ready"],
  },
  {
    id: "namaji-mosaic-cotton",
    handle: "namaji-mosaic-cotton",
    title: "Namaji Mosaic Cotton Hijab",
    productType: "Namaji Hijab",
    collection: "namaji",
    material: "Soft Cotton",
    color: "Multicolor",
    description:
      "A richly patterned Namaji hijab with warm mosaic details, gold lace trim, and a soft cotton feel.",
    images: [{ src: "/products/namaji-mosaic-cotton.png" }],
    tags: ["namaji", "cotton", "mosaic", "prayer"],
    features: ["Soft cotton", "Gold lace detail", "Lightweight", "Elegant look"],
  },
  {
    id: "iqra-black-georgette",
    handle: "iqra-black-georgette",
    title: "Iqra Black Georgette Hijab",
    productType: "Iqra Hijab",
    collection: "iqra",
    material: "Premium Georgette",
    color: "Black",
    description:
      "A flowing black Iqra hijab in premium georgette, designed for a modest silhouette with a lightweight finish.",
    images: [{ src: "/products/iqra-black-georgette.png" }],
    tags: ["iqra", "georgette", "black", "daily"],
    features: ["Premium georgette", "Lightweight and flowy", "Daily use", "Elegant look"],
  },
  {
    id: "gola-gold-lace",
    handle: "gola-gold-lace",
    title: "Gola Gold Lace Hijab",
    productType: "Gola Hijab",
    collection: "gola",
    material: "Premium Lace",
    color: "Gold",
    description:
      "A soft gold Gola hijab with delicate shimmer embroidery and an elegant lace finish.",
    images: [{ src: "/products/gola-gold-lace.png" }],
    tags: ["gola", "lace", "gold", "occasion"],
    features: ["Premium lace", "Lightweight", "Elegant shimmer", "Daily prayer"],
  },
  {
    id: "gola-blush-lace",
    handle: "gola-blush-lace",
    title: "Gola Blush Lace Hijab",
    productType: "Gola Hijab",
    collection: "gola",
    material: "Premium Lace",
    color: "Blush",
    description:
      "A blush-toned Gola hijab with floral lace texture and a soft layered look.",
    images: [{ src: "/products/gola-blush-lace.png" }],
    tags: ["gola", "lace", "blush", "daily"],
    features: ["Premium lace", "Lightweight", "Soft layered finish", "Comfortable"],
  },
];

export function getLocalProductByHandle(handle) {
  return localProducts.find((product) => product.handle === handle);
}

export function getLocalProductsByCollection(collection) {
  return localProducts.filter((product) => {
    const target = collection.toLowerCase();
    return product.collection === target || product.tags.includes(target);
  });
}
