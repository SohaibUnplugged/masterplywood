export const site = {
  name: "Master Plywood",
  legalName: "Master Hardware & Plywood",
  origin: "https://masterplywood.pk",
  owner: "Hafiz Rizwan Akram",
  founded: "August 2020",
  foundingDate: "2020-08",
  shopImage: "/images/master-plywood-shop.webp",
  ownerImage: "/images/hafiz-rizwan-akram.jpeg",
  area: "Wazirabad, Gujranwala, Pakistan",
  mapsUrl: "https://maps.app.goo.gl/ngGo5MHkxTk3YFC79",
  mapsEmbedUrl: "https://maps.google.com/maps?cid=4851245079993976709&z=17&output=embed",
  coordinates: { latitude: 32.440499, longitude: 74.1213595 },
  phone: "+923328302554",
  phoneDisplay: "+92 332 8302554",
  whatsapp: "+923328302554",
  whatsappUrl: "https://wa.me/923328302554",
  streetAddress: "Mohallah Haji Pura, Opposite High Class Bakers, Sialkot Road, Gujranwala Wazirabad",
  locality: "Wazirabad",
  region: "Punjab",
  openingHours: [] as string[],
};

export const brands = [
  { slug: "zrk", name: "ZRK", description: "Explore the textures, tones and designs in the ZRK catalogue.", pdf: "/catalogues/zrk.pdf" },
  { slug: "kmi", name: "KMI", description: "Find your next material inspiration in the KMI collection.", pdf: "/catalogues/kmi.pdf" },
  { slug: "mecata", name: "MECATA", description: "Take a closer look at the designs in the MECATA catalogue.", pdf: "/catalogues/mecata.pdf" },
] as const;
export type BrandSlug = (typeof brands)[number]["slug"];

export const faqs = [
  { question: "Who owns Master Plywood?", answer: `Master Plywood is owned by ${site.owner}, who started the business in August 2020. The registered business name is ${site.legalName}.` },
  { question: "How do I search for an article code?", answer: "Type the article code into the catalogue search. Codes appear in design titles, and you can search with or without spaces and hyphens, for example M-03 or M03." },
  { question: "Which brands can I explore?", answer: "Browse catalogue designs from ZRK, KMI and MECATA. You can filter by brand or open each brand’s own collection." },
  { question: "Can I buy through this website?", answer: "This website is a design catalogue. Visit Master Plywood to discuss your project, see materials in person and ask about your chosen design." },
  { question: "How can I find the shop?", answer: `Visit us at ${site.streetAddress}. Use our Google Maps link for directions to the shop.` },
];
export const browsingSteps = [
  { name: "Explore the collection", text: "Open the catalogue and filter by ZRK, KMI or MECATA. Search by a design name or code when available." },
  { name: "Look a little closer", text: "Open a design to see a larger image. Zoom in to examine its texture and note its brand and code." },
  { name: "Bring your ideas to the shop", text: "Save the design details and follow our Google Maps link to visit Master Plywood and discuss your project." },
];
