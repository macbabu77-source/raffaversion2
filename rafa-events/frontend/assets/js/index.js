const projectGrid = document.querySelector('.project-grid');
if (projectGrid && window.RAFAContent) {
	try {
		const projects = window.RAFAContent.getCollection('projects');
		projectGrid.replaceChildren();
		projects.forEach((project, index) => {
			const tile = document.createElement('a');
			tile.className = `project-tile p-tile-${(index % 4) + 1}`;
			tile.href = `mailto:hello@RAFA.com?subject=${encodeURIComponent(`${project.name} project inquiry`)}`;

			const photo = document.createElement('div');
			photo.className = `photo photo-${(index % 4) + 1}`;
			if (project.image) {
				try {
					const imageUrl = new URL(project.image);
					if (['http:', 'https:'].includes(imageUrl.protocol)) {
						photo.style.backgroundImage = `url("${imageUrl.href}")`;
					}
				} catch {
					console.error('Ignoring invalid project image URL.');
				}
			}

			const caption = document.createElement('div');
			caption.className = 'caption';
			const text = document.createElement('div');
			const name = document.createElement('h3');
			const location = document.createElement('span');
			name.textContent = project.name;
			location.textContent = project.detail;
			text.append(name, location);
			const arrow = document.createElement('span');
			arrow.className = 'tile-arrow';
			arrow.setAttribute('aria-hidden', 'true');
			arrow.textContent = '↗';
			caption.append(text, arrow);
			tile.append(photo, caption);
			projectGrid.append(tile);
		});
	} catch (error) {
		console.error('Unable to load Architecture projects:', error);
	}
}

const homeApparelGrid = document.getElementById('homeApparelGrid');
const homeApparelImages = [
	'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85',
	'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85',
	'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85'
];

if (homeApparelGrid && window.RAFAContent) {
	try {
		const products = window.RAFAContent.getCollection('apparel');
		let selectedCategory = 'all';

		const renderApparel = () => {
			const visibleProducts = products
				.filter((product) => selectedCategory === 'all' || product.category === selectedCategory)
				.slice(0, 3);

			homeApparelGrid.replaceChildren(...visibleProducts.map((product, index) => {
				const card = document.createElement('a');
				card.className = 'home-apparel-card';
				card.href = 'apparels.html#catalog';
				card.setAttribute('aria-label', `Explore ${product.name} in the Apparels collection`);

				const image = document.createElement('div');
				image.className = 'home-apparel-image';
				const imageUrl = homeApparelImages[index % homeApparelImages.length];
				image.style.backgroundImage = `linear-gradient(180deg, transparent 62%, rgba(15,13,11,.2)), url("${imageUrl}")`;
				image.setAttribute('aria-hidden', 'true');

				const meta = document.createElement('div');
				meta.className = 'home-apparel-meta';
				const category = document.createElement('span');
				category.textContent = product.category;
				const price = document.createElement('span');
				price.textContent = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
					maximumFractionDigits: 0
				}).format(Number(product.price));
				const name = document.createElement('h4');
				name.textContent = product.name;
				const description = document.createElement('p');
				description.textContent = product.description;
				const action = document.createElement('span');
				action.className = 'home-apparel-link';
				action.setAttribute('aria-hidden', 'true');
				action.textContent = 'View piece ↗';
				meta.append(category, price);
				card.append(image, meta, name, description, action);
				return card;
			}));

			if (!visibleProducts.length) {
				const empty = document.createElement('p');
				empty.className = 'home-feature-empty';
				empty.textContent = 'New pieces are on their way. Explore the full collection for more.';
				homeApparelGrid.replaceChildren(empty);
			}
		};

		document.querySelectorAll('[data-home-category]').forEach((button) => {
			button.addEventListener('click', () => {
				selectedCategory = button.dataset.homeCategory || 'all';
				document.querySelectorAll('[data-home-category]').forEach((filter) => {
					const selected = filter === button;
					filter.classList.toggle('active', selected);
					filter.setAttribute('aria-pressed', String(selected));
				});
				renderApparel();
			});
		});

		renderApparel();
	} catch (error) {
		console.error('Unable to load the homepage apparel feature:', error);
	}
}

const homeFlavorOptions = document.getElementById('homeFlavorOptions');
if (homeFlavorOptions && window.RAFAContent) {
	try {
		const flavors = window.RAFAContent.getCollection('desserts');
		const flavorStyles = [
			{ color: '#593525', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1100&q=85' },
			{ color: '#dbc59a', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=1100&q=85' },
			{ color: '#d87982', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1100&q=85' },
			{ color: '#852e38', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1100&q=85' }
		];
		const flavorName = document.getElementById('homeFlavorName');
		const flavorDescription = document.getElementById('homeFlavorDescription');
		const flavorSwatch = document.getElementById('homeFlavorSwatch');
		const dessertImage = document.getElementById('homeDessertImage');

		const selectHomeFlavor = (flavor, index) => {
			const style = flavorStyles[index % flavorStyles.length];
			flavorName.textContent = flavor.name;
			flavorDescription.textContent = flavor.description;
			flavorSwatch.style.backgroundColor = style.color;
			dessertImage.style.backgroundImage = `linear-gradient(180deg, rgba(31,20,16,.02), rgba(31,20,16,.1)), url("${style.image}")`;
			dessertImage.setAttribute('aria-label', `${flavor.name}, a featured handcrafted cake`);
			homeFlavorOptions.querySelectorAll('button').forEach((button, buttonIndex) => {
				const selected = buttonIndex === index;
				button.classList.toggle('active', selected);
				button.setAttribute('aria-pressed', String(selected));
			});
		};

		homeFlavorOptions.replaceChildren(...flavors.map((flavor, index) => {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'home-flavor-option';
			button.textContent = flavor.name;
			button.setAttribute('aria-pressed', String(index === 0));
			button.addEventListener('click', () => selectHomeFlavor(flavor, index));
			return button;
		}));

		if (flavors.length) selectHomeFlavor(flavors[0], 0);
	} catch (error) {
		console.error('Unable to load the homepage desserts feature:', error);
	}
}
