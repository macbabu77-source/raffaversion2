(function () {
  const collections = {
    projects: [
      { id: 'horizon-residence', name: 'Horizon Residence', detail: 'Los Angeles, CA', image: '' },
      { id: 'aurora-office-tower', name: 'Aurora Office Tower', detail: 'New York, NY', image: '' },
      { id: 'edgewood-villa', name: 'Edgewood Villa', detail: 'Austin, TX', image: '' },
      { id: 'maple-street-residences', name: 'Maple Street Residences', detail: 'Seattle, WA', image: '' }
    ],
    apparel: [
      { id: 'celine-wrap-blazer', name: 'Celine Wrap Blazer', category: 'clothes', description: 'Structured drape in a soft neutral tone for everyday polish.', price: 189, rating: 4.9, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
      { id: 'luna-knit-set', name: 'Luna Knit Set', category: 'clothes', description: 'A cozy matching co-ord with a relaxed silhouette and refined finish.', price: 146, rating: 4.8, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
      { id: 'aster-leather-sneaker', name: 'Aster Leather Sneaker', category: 'shoes', description: 'Low-profile everyday leather sneakers with cushioned soles.', price: 132, rating: 4.7, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
      { id: 'sloane-slingback', name: 'Sloane Slingback', category: 'shoes', description: 'A classic heel with sculpted ease and a refined pointed toe.', price: 170, rating: 4.9, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
      { id: 'mila-structured-tote', name: 'Mila Structured Tote', category: 'handbags', description: 'A clean carry-all designed for work, travel and city errands.', price: 214, rating: 4.8, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
      { id: 'sera-mini-shoulder', name: 'Sera Mini Shoulder', category: 'handbags', description: 'Compact shape, polished hardware and everyday utility.', price: 168, rating: 4.7, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
      { id: 'noor-gold-hoop', name: 'Noor Gold Hoop', category: 'accessories', description: 'A lightweight statement finish for easy day-to-night styling.', price: 44, rating: 4.9, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
      { id: 'vale-silk-scarf', name: 'Vale Silk Scarf', category: 'accessories', description: 'Add movement, color and polish with a soft silk finish.', price: 52, rating: 4.8, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
      { id: 'ari-cotton-shirt', name: 'Ari Cotton Shirt', category: 'clothes', description: 'Soft structure and an oversized fit for effortless layering.', price: 96, rating: 4.8, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
      { id: 'nora-trench-coat', name: 'Nora Trench Coat', category: 'clothes', description: 'Minimal outerwear with a clean drape and weather-ready finish.', price: 228, rating: 5, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
      { id: 'harlow-slide', name: 'Harlow Slide', category: 'shoes', description: 'A quiet statement sandal for warm weather and easy movement.', price: 114, rating: 4.7, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
      { id: 'rhea-chain-bag', name: 'Rhea Chain Bag', category: 'handbags', description: 'Glossy polish and a streamlined silhouette in a functional shape.', price: 178, rating: 4.8, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' }
    ],
    desserts: [
      { id: 'chocolate-truffle', name: 'Chocolate Truffle', description: 'Layers of moist chocolate sponge, velvety ganache and a hint of cocoa, finished with handcrafted chocolate curls.' },
      { id: 'vanilla-bean', name: 'Vanilla Bean', description: 'Soft vanilla sponge layered with smooth vanilla cream and finished with delicate bean-speckled frosting.' },
      { id: 'strawberry-cloud', name: 'Strawberry Cloud', description: 'Tender sponge, fresh strawberry filling and a light cream finish make this a bright celebratory favorite.' },
      { id: 'red-velvet', name: 'Red Velvet', description: 'A tender cocoa sponge paired with tangy cream cheese frosting for a classic, balanced slice.' }
    ]
  };

  function getCollection(name) {
    if (!Object.prototype.hasOwnProperty.call(collections, name)) {
      throw new Error(`Unknown content collection: ${name}`);
    }
    const stored = localStorage.getItem(`rafa-admin-${name}`);
    if (stored === null) return collections[name].map((item) => ({ ...item }));
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) throw new Error(`Saved ${name} content must be a list.`);
    return parsed;
  }

  function saveCollection(name, items) {
    if (!Object.prototype.hasOwnProperty.call(collections, name)) {
      throw new Error(`Unknown content collection: ${name}`);
    }
    if (!Array.isArray(items)) throw new Error(`Cannot save ${name}: content must be a list.`);
    localStorage.setItem(`rafa-admin-${name}`, JSON.stringify(items));
  }

  window.RAFAContent = { getCollection, saveCollection };
})();
