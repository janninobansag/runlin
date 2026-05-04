require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  // Booster Packs (5)
  { name: 'Scarlet & Violet Booster Pack', price: 4.99, stock: 120, category: 'Booster Packs', description: 'Single booster from Scarlet & Violet base set. 10 cards with a chance to pull ex cards and full art trainers.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/products/611026-Product-2-I-638095639640763380_1120x_5f0a1b77-33cd-4790-91da-e6ed3f5042d5_1024x.jpg?v=1680231113' },
  { name: 'Obsidian Flames Booster Pack', price: 4.99, stock: 95, category: 'Booster Packs', description: 'Single booster from Obsidian Flames. Features Tera-type Pokémon including the iconic black Tera Charizard ex.', image: 'https://p16-oec-general-useast5.ttcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/cbcdfe4fd3c54d7396f499201ffc171e~tplv-fhlh96nyum-crop-webp:1024:1024.webp?dr=12190&t=555f072d&ps=933b5bde&shp=8dbd94bf&shcp=e1be8f53&idc=useast5&from=2378011839' },
  { name: 'Paradox Rift Booster Pack', price: 4.99, stock: 80, category: 'Booster Packs', description: 'Single booster from Paradox Rift. Ancient and Future Pokémon ex with stunning special illustration rares.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/files/dfdfb_1aa1db38-3d19-4d68-aa39-5b39e5099994_800x.jpg?v=1698976579' },
  { name: 'Temporal Forces Booster Pack', price: 4.99, stock: 110, category: 'Booster Packs', description: 'Single booster from Temporal Forces featuring the return of ACE SPEC cards and Walking Wake ex.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/files/b-gfdh-bngf_800x.jpg?v=1711101882' },
  { name: 'Twilight Masquerade Booster Pack', price: 4.99, stock: 90, category: 'Booster Packs', description: 'Single booster from Twilight Masquerade. Pull Ogerpon ex Tera and rare mask-themed illustration cards.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/files/b-gfdh-bngf_800x.jpg?v=1711101882' },

  // Booster Bundles (5)
  { name: 'Scarlet & Violet Booster Bundle', price: 24.99, stock: 50, category: 'Booster Bundles', description: '6 Scarlet & Violet booster packs. Great value for pulling ex cards and full art rares.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/products/81tgtAjvMJL._AC_SL1500_1024x.jpg?v=1680229829' },
  { name: 'Obsidian Flames Booster Bundle', price: 27.99, stock: 35, category: 'Booster Bundles', description: '6 Obsidian Flames packs. Six chances to pull the legendary black Tera Charizard ex.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/files/P8979_186-85387_01_1024x.jpg?v=1691720787' },
  { name: 'Paradox Rift Booster Bundle', price: 26.99, stock: 40, category: 'Booster Bundles', description: '6 Paradox Rift packs loaded with Ancient and Future Pokémon ex and special illustration rares.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/files/pku85412.jpg?v=1698975657' },
  { name: 'Temporal Forces Booster Bundle', price: 25.99, stock: 45, category: 'Booster Bundles', description: '6 Temporal Forces packs. Stack your odds on pulling ACE SPEC and Walking Wake ex.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/files/P9504_188-85655_01_1024x.png?v=1711071801' },
  { name: 'Twilight Masquerade Booster Bundle', price: 26.99, stock: 30, category: 'Booster Bundles', description: '6 Twilight Masquerade packs. Six shots at Ogerpon ex Tera and mask-themed illustration rares.', image: 'https://gameone.ph/media/catalog/product/mpiowebpcache/d378a0f20f83637cdb1392af8dc032a2/p/o/pokemon-tcg-s_v-twilight-masquerade-booster-bundle-cover_1.webp' },

  // Special Collections (5)
  { name: 'Charizard ex Special Collection', price: 39.99, stock: 20, category: 'Special Collections', description: 'Includes 1 Charizard ex promo card, 1 oversize card, 4 booster packs, and a VSTAR marker. A must-have for Charizard fans.', image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/trading-card-game/series/incrementals/2025/charizard-ex-special-collection/charizard-ex-special-collection-169-en.png' },
  { name: 'Pikachu ex Special Collection', price: 34.99, stock: 25, category: 'Special Collections', description: 'Features a shiny Pikachu ex promo, oversize card, 4 booster packs, and coin. Perfect starter or gift.', image: 'https://m.media-amazon.com/images/I/61Ab-ndzD5L._AC_UF894,1000_QL80_.jpg' },
  { name: 'Mewtwo ex Special Collection', price: 44.99, stock: 15, category: 'Special Collections', description: 'Exclusive Mewtwo ex promo, oversize card, 5 booster packs, and collectors tin. Rare and powerful.', image: 'https://tcgplayer-cdn.tcgplayer.com/product/625695_in_1000x1000.jpg' },
  { name: 'Eevee Evolutions Special Collection', price: 49.99, stock: 10, category: 'Special Collections', description: 'All 8 Eeveelution promo cards, 6 booster packs, and exclusive storage binder. The ultimate Eevee set.', image: 'https://m.media-amazon.com/images/I/8132wxtdTqL.jpg' },
  { name: 'Snorlax ex & Blissey ex Special Collection', price: 49.99, stock: 18, category: 'Special Collections', description: 'Exclusive Snorlax ex & Blissey ex promo card, oversize card, 8 booster packs, and a shiny coin. A legendary collectible.', image: 'https://images.stockx.com/images/Pokemon-Snorlax-Blissey-ex-Special-Collection-Box.jpg?fit=fill&bg=FFFFFF&w=480&h=320&q=60&dpr=1&trim=color&updated_at=1753161278' },

  // Limited Edition (5)
  { name: 'Pokémon 151 Ultra Premium Collection', price: 119.99, stock: 8, category: 'Limited Edition', description: '16 booster packs, 3 etched promo cards, premium coins, card sleeves, and a collector binder. The ultimate 151 set.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/files/dbf_c06349c3-1942-4429-b336-a04622a80002_800x.jpg?v=1697879088' },
  { name: 'Pokemon TCG Classic Collection Limited Edition', price: 150.99, stock: 12, category: 'Limited Edition', description: 'The Pokémon TCG: Classic Collection includes three 60-card decks starring Venusaur, Charizard, and Blastoise (180 cards total).', image: 'https://m.media-amazon.com/images/I/517wBISBt4L._AC_UF894,1000_QL80_.jpg' },
  { name: 'Pokemon TCG 1st Edition Box', price: 299.99, stock: 5, category: 'Limited Edition', description: '36 booster sets which, in turn, hold 11 cards each. The packs feature the first-edition set of Pokémon trading cards made up of 102 different cards, including one of the popular fire Pokémon - CharizardGold Pikachu VMAX promo, 8 booster packs, and a detailed Pikachu collector figure. Extremely limited.', image: 'https://assetsio.gnwcdn.com/pokemon-trading-card-booster-box.jpg?width=1200&height=630&fit=crop&enable=upscale&auto=webp' },
  { name: 'Shining Fates Premium Collection', price: 89.99, stock: 6, category: 'Limited Edition', description: 'Shiny Vault pulls await! 10 Shining Fates packs, shiny Eevee promo, and premium collector accessories.', image: 'https://i5.walmartimages.com/seo/Pok-mon-TCG-Shining-Fates-Premium-Collection-Shiny-Crobat-VMAX-Trading-Card-Game_33d5f92e-8ae1-4a60-b8c7-df6a42fee1f1.4eebcf4bcbc93a3f4564585cdc0c3387.jpeg' },
  { name: 'Celebrations 25th Anniversary Set', price: 99.99, stock: 4, category: 'Limited Edition', description: 'Commemorating 25 years of Pokémon. Classic card reprints, 10 Celebrations packs, and anniversary keepsake box.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/products/71Bs562BnoL._AC_SL1500_800x.jpg?v=1676849607' },

  // Trainer Boxes (5)
  { name: 'Scarlet & Violet Elite Trainer Box', price: 49.99, stock: 30, category: 'Trainer Boxes', description: '9 Scarlet & Violet packs, 65 card sleeves, 45 energy cards, coin, and a premium collector box with dividers.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/products/pok85341b-pokemon-scarlet-_-violet-1-miraidon-elite-trainer-box-01.jpg?v=1680232190' },
  { name: 'Obsidian Flames Elite Trainer Box', price: 49.99, stock: 22, category: 'Trainer Boxes', description: '9 Obsidian Flames packs, Charizard-themed sleeves, 45 energy cards, dice, and premium storage box.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/files/3etrdftrgersdfg.jpg?v=1691734568' },
  { name: 'Paradox Rift Elite Trainer Box', price: 49.99, stock: 28, category: 'Trainer Boxes', description: '9 Paradox Rift packs, themed sleeves, 45 energy cards, damage counters, and a heavy-duty collector box.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/files/81spfoy2YlL._AC_SL1500.jpg?v=1698974643' },
  { name: 'Temporal Forces Elite Trainer Box', price: 49.99, stock: 20, category: 'Trainer Boxes', description: '9 Temporal Forces packs, ACE SPEC-themed sleeves, energy cards, coin, and a full ETB storage solution.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/files/sdfbvsdbvs_800x.jpg?v=1711072981' },
  { name: 'Twilight Masquerade Elite Trainer Box', price: 49.99, stock: 18, category: 'Trainer Boxes', description: '9 Twilight Masquerade packs, Ogerpon-themed sleeves, 45 energy cards, counters, and premium collector box.', image: 'https://ecommerce.datablitz.com.ph/cdn/shop/files/P9505_189-85799_01_800x.jpg?v=1716512489' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');
    const inserted = await Product.insertMany(products);
    console.log(`🌱 Seeded ${inserted.length} Pokémon TCG products!\n`);
    inserted.forEach((p) => console.log(`   • [${p.category}] ${p.name} — $${p.price} (stock: ${p.stock})`));
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

seed();
