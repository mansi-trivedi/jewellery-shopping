const products = [
  {
    SKU: "P001",
    description: "Gold Necklace with Diamonds",
    stock: 15,
    price: 2500,
    categoryId: "D1B9E8A1-9B4A-4D8F-97F2-78A8A0C9B30E",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/necklace.jpg",
  },
  {
    SKU: "P002",
    description: "Silver Bracelet with Charms",
    stock: 30,
    price: 800,
    categoryId: "3F72D92D-736C-4F49-A167-F1776310E824",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/bracelet.jpg",
  },
  {
    SKU: "P003",
    description: "Platinum Ring with Sapphire",
    stock: 10,
    price: 3200,
    categoryId: "F17A9B76-442E-4F89-BF8D-5C51C7D3A4F7",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/ring.jpg",
  },
  {
    SKU: "P004",
    description: "Diamond Earrings in Rose Gold",
    stock: 20,
    price: 4200,
    categoryId: "D7E9C9F7-B317-4A53-973A-684D1A101327",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/earring.jpg",
  },
  {
    SKU: "P005",
    description: "Gold Pendant with Ruby",
    stock: 12,
    price: 3600,
    categoryId: "76E0F0A0-5B22-4D7C-9A49-5A38F56E77F2",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/pendant.jpg",
  },
  {
    SKU: "P006",
    description: "Luxury Silver Watch",
    stock: 25,
    price: 2000,
    categoryId: "92E4DA6F-C5F0-4C16-97DB-CF1E8E1DA0BB",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/watch.jpg",
  },
  {
    SKU: "P007",
    description: "Charm Anklet in Gold",
    stock: 18,
    price: 600,
    categoryId: "C2F9B7D6-6F77-4F25-9C0B-9A5F09C4D292",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/anklet.jpg",
  },
  {
    SKU: "P008",
    description: "Cufflinks with Onyx Stone",
    stock: 15,
    price: 1200,
    categoryId: "A6D1C7F8-8A75-4E8E-8A7F-8A9E35A68F9E",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/cufflink.jpg",
  },
  {
    SKU: "P009",
    description: "Women's Diamond Engagement Ring",
    stock: 8,
    price: 5000,
    categoryId: "72D1B4E6-8692-4E5C-B4D1-22D9F0806DB8",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/ring.jpg",
  },
  {
    SKU: "P010",
    description: "Men's Platinum Watch",
    stock: 10,
    price: 7500,
    categoryId: "E1B9D4C3-1A74-4571-9D9B-67A399B3F98A",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/menWatch.jpg",
  },
  {
    SKU: "P011",
    description: "Silver Necklace with Gemstones",
    stock: 22,
    price: 1200,
    categoryId: "D1B9E8A1-9B4A-4D8F-97F2-78A8A0C9B30E",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/necklace.jpg",
  },
  {
    SKU: "P012",
    description: "Rose Gold Bracelet with Pearls",
    stock: 25,
    price: 350,
    categoryId: "3F72D92D-736C-4F49-A167-F1776310E824",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/bracelet.jpg",
  },
  {
    SKU: "P013",
    description: "Gold Hoop Earrings",
    stock: 20,
    price: 800,
    categoryId: "D7E9C9F7-B317-4A53-973A-684D1A101327",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/earring.jpg",
  },
  {
    SKU: "P014",
    description: "Diamond Pendant on Gold Chain",
    stock: 18,
    price: 4500,
    categoryId: "76E0F0A0-5B22-4D7C-9A49-5A38F56E77F2",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/pendant.jpg",
  },
  {
    SKU: "P015",
    description: "Gold Plated Chain Necklace",
    stock: 22,
    price: 950,
    categoryId: "B1B8E7C9-B28C-4B72-A14B-5F0B589C4787",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/necklace.jpg",
  },
  {
    SKU: "P016",
    description: "Men's Black Leather Bracelet",
    stock: 50,
    price: 150,
    categoryId: "A6D1C7F8-8A75-4E8E-8A7F-8A9E35A68F9E",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/menBracelet.jpg",
  },
  {
    SKU: "P017",
    description: "Women's Sapphire Ring in White Gold",
    stock: 10,
    price: 3200,
    categoryId: "72D1B4E6-8692-4E5C-B4D1-22D9F0806DB8",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/ring.jpg",
  },
  {
    SKU: "P018",
    description: "Gold Ring with Diamond and Ruby",
    stock: 5,
    price: 5500,
    categoryId: "F17A9B76-442E-4F89-BF8D-5C51C7D3A4F7",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/ring.jpg",
  },
  {
    SKU: "P019",
    description: "Ruby Pendant Necklace",
    stock: 12,
    price: 2700,
    categoryId: "D1B9E8A1-9B4A-4D8F-97F2-78A8A0C9B30E",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/necklace.jpg",
  },
  {
    SKU: "P020",
    description: "Gold Stud Earrings",
    stock: 30,
    price: 500,
    categoryId: "D7E9C9F7-B317-4A53-973A-684D1A101327",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/earring.jpg",
  },
  {
    SKU: "P021",
    description: "Silver Charm Bracelet",
    stock: 25,
    price: 600,
    categoryId: "3F72D92D-736C-4F49-A167-F1776310E824",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/bracelet.jpg",
  },
  {
    SKU: "P022",
    description: "Men's Titanium Wedding Band",
    stock: 18,
    price: 900,
    categoryId: "72D1B4E6-8692-4E5C-B4D1-22D9F0806DB8",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/menBracelet.jpg",
  },
  {
    SKU: "P023",
    description: "Emerald Gold Ring",
    stock: 8,
    price: 4800,
    categoryId: "F17A9B76-442E-4F89-BF8D-5C51C7D3A4F7",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/ring.jpg",
  },
  {
    SKU: "P024",
    description: "Diamond Studded Gold Bracelet",
    stock: 20,
    price: 3200,
    categoryId: "76E0F0A0-5B22-4D7C-9A49-5A38F56E77F2",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/bracelet.jpg",
  },
  {
    SKU: "P025",
    description: "Gold Watch with Leather Strap",
    stock: 10,
    price: 4500,
    categoryId: "E1B9D4C3-1A74-4571-9D9B-67A399B3F98A",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/watch.jpg",
  },
  {
    SKU: "P026",
    description: "Rose Gold Necklace with Opal",
    stock: 7,
    price: 3500,
    categoryId: "D1B9E8A1-9B4A-4D8F-97F2-78A8A0C9B30E",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/necklace.jpg",
  },
  {
    SKU: "P027",
    description: "Silver Toe Ring Set",
    stock: 40,
    price: 200,
    categoryId: "A6D1C7F8-8A75-4E8E-8A7F-8A9E35A68F9E",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/ring.jpg",
  },
  {
    SKU: "P028",
    description: "Platinum Chain Necklace",
    stock: 14,
    price: 3700,
    categoryId: "F17A9B76-442E-4F89-BF8D-5C51C7D3A4F7",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/necklace.jpg",
  },
  {
    SKU: "P029",
    description: "Diamond Chandelier Earrings",
    stock: 10,
    price: 5200,
    categoryId: "D7E9C9F7-B317-4A53-973A-684D1A101327",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/earring.jpg",
  },
  {
    SKU: "P030",
    description: "Gold Ring with Engraved Patterns",
    stock: 22,
    price: 1200,
    categoryId: "72D1B4E6-8692-4E5C-B4D1-22D9F0806DB8",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/ring.jpg",
  },
  {
    SKU: "P031",
    description: "Multi-Gemstone Bracelet",
    stock: 12,
    price: 2100,
    categoryId: "3F72D92D-736C-4F49-A167-F1776310E824",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/necklace.jpg",
  },
  {
    SKU: "P032",
    description: "Diamond Watch with Gold Chain",
    stock: 5,
    price: 8500,
    categoryId: "E1B9D4C3-1A74-4571-9D9B-67A399B3F98A",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/watch.jpg",
  },
  {
    SKU: "P033",
    description: "Pearl Drop Earrings",
    stock: 18,
    price: 1200,
    categoryId: "D7E9C9F7-B317-4A53-973A-684D1A101327",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/earring.jpg",
  },
  {
    SKU: "P034",
    description: "Amethyst Gold Ring",
    stock: 9,
    price: 4400,
    categoryId: "F17A9B76-442E-4F89-BF8D-5C51C7D3A4F7",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/ring.jpg",
  },
  {
    SKU: "P035",
    description: "Men's Black Onyx Pendant",
    stock: 13,
    price: 1600,
    categoryId: "A6D1C7F8-8A75-4E8E-8A7F-8A9E35A68F9E",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/pendant.jpg",
  },
  {
    SKU: "P036",
    description: "Rose Gold Anklet with Beads",
    stock: 25,
    price: 700,
    categoryId: "3F72D92D-736C-4F49-A167-F1776310E824",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/anklet.jpg",
  },
  {
    SKU: "P037",
    description: "Silver Stud Earrings Set",
    stock: 50,
    price: 300,
    categoryId: "D7E9C9F7-B317-4A53-973A-684D1A101327",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/earring.jpg",
  },
  {
    SKU: "P038",
    description: "Gold Wedding Band",
    stock: 30,
    price: 2500,
    categoryId: "72D1B4E6-8692-4E5C-B4D1-22D9F0806DB8",
    image:
      "https://ejpxzaxvroeaeixwhfjb.supabase.co/storage/v1/object/public/jewellery/bracelet.jpg",
  },
];

export { products };
