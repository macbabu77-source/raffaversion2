const defaultProducts = [
  {
    name: 'Celine Wrap Blazer',
    category: 'clothes',
    description: 'Structured drape in a soft neutral tone for everyday polish.',
    price: 189,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Luna Knit Set',
    category: 'clothes',
    description: 'A cozy matching co-ord with a relaxed silhouette and refined finish.',
    price: 146,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Aster Leather Sneaker',
    category: 'shoes',
    description: 'Low-profile everyday leather sneakers with cushioned soles.',
    price: 132,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Sloane Slingback',
    category: 'shoes',
    description: 'A classic heel with sculpted ease and a refined pointed toe.',
    price: 170,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Mila Structured Tote',
    category: 'handbags',
    description: 'A clean carry-all designed for work, travel and city errands.',
    price: 214,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Sera Mini Shoulder',
    category: 'handbags',
    description: 'Compact shape, polished hardware and everyday utility.',
    price: 168,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Noor Gold Hoop',
    category: 'accessories',
    description: 'A lightweight statement finish for easy day-to-night styling.',
    price: 44,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Vale Silk Scarf',
    category: 'accessories',
    description: 'Add movement, color and polish with a soft silk finish.',
    price: 52,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Ari Cotton Shirt',
    category: 'clothes',
    description: 'Soft structure and an oversized fit for effortless layering.',
    price: 96,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Nora Trench Coat',
    category: 'clothes',
    description: 'Minimal outerwear with a clean drape and weather-ready finish.',
    price: 228,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Harlow Slide',
    category: 'shoes',
    description: 'A quiet statement sandal for warm weather and easy movement.',
    price: 114,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Rhea Chain Bag',
    category: 'handbags',
    description: 'Glossy polish and a streamlined silhouette in a functional shape.',
    price: 178,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'
  }
];
const products = window.RAFAContent ? window.RAFAContent.getCollection('apparel') : defaultProducts;

const catalogGrid = document.getElementById('catalogGrid');
const categoryButtons = [...document.querySelectorAll('.category-card')];
categoryButtons.forEach((button) => {
  const count = button.querySelector('small');
  if (!count) return;
  const category = button.dataset.category;
  const total = category === 'all' ? products.length : products.filter((product) => product.category === category).length;
  count.textContent = `${total} ${total === 1 ? 'style' : 'styles'}`;
});

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

function renderProducts(filter = 'all') {
  if (!catalogGrid) return;

  const visibleProducts = filter === 'all'
    ? products
    : products.filter((product) => product.category === filter);

  catalogGrid.replaceChildren(...visibleProducts.map((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    const media = document.createElement('div');
    media.className = 'product-media';
    if (product.image) {
      try {
        const imageUrl = new URL(product.image);
        if (['http:', 'https:'].includes(imageUrl.protocol)) {
          media.style.backgroundImage = `linear-gradient(180deg, rgba(29,26,24,0.06), rgba(29,26,24,0.18)), url("${imageUrl.href}")`;
        } else {
          console.error(`Ignoring invalid product image URL for ${product.name}.`);
        }
      } catch {
        console.error(`Ignoring invalid product image URL for ${product.name}.`);
      }
    }

    const body = document.createElement('div');
    body.className = 'product-body';
    const top = document.createElement('div');
    top.className = 'product-top';
    const category = document.createElement('span');
    category.className = 'product-category';
    category.textContent = product.category;
    const rating = document.createElement('span');
    rating.className = 'product-rating';
    rating.textContent = `★ ${product.rating}`;
    top.append(category, rating);

    const name = document.createElement('h3');
    name.textContent = product.name;
    const description = document.createElement('p');
    description.textContent = product.description;
    const bottom = document.createElement('div');
    bottom.className = 'product-bottom';
    const price = document.createElement('span');
    price.className = 'product-price';
    price.textContent = formatPrice(product.price);
    const addButton = document.createElement('button');
    addButton.className = 'product-button';
    addButton.type = 'button';
    addButton.setAttribute('aria-label', `Add ${product.name} to bag`);
    addButton.textContent = '+';
    bottom.append(price, addButton);
    body.append(top, name, description, bottom);
    card.append(media, body);
    return card;
  }));
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    categoryButtons.forEach((item) => item.classList.toggle('active', item === button));
    renderProducts(button.dataset.category || 'all');
  });
});

renderProducts();

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (!input) return;
    input.value = '';
    input.placeholder = 'Thanks for signing up';
  });
}
