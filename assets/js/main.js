const accommodations = [
    {
        id: 1,
        name: 'Aurora Fjord Hotel',
        city: 'Осло',
        country: 'Норвегия',
        rating: 9.2,
        price: 198,
        type: 'hotel',
        tags: ['Утренний буфет', 'Близко к набережной'],
    },
    {
        id: 2,
        name: 'Lisbon Horizon Apartments',
        city: 'Лиссабон',
        country: 'Португалия',
        rating: 8.6,
        price: 118,
        type: 'apartment',
        tags: ['Апартаменты с кухней', 'Рядом метро Baixa-Chiado'],
    },
    {
        id: 3,
        name: 'Kyoto Botanical Ryokan',
        city: 'Киото',
        country: 'Япония',
        rating: 9.5,
        price: 245,
        type: 'boutique',
        tags: ['Традиционные завтраки', 'Сад с онсэном'],
    },
    {
        id: 4,
        name: 'Tbilisi Old Town Loft',
        city: 'Тбилиси',
        country: 'Грузия',
        rating: 8.1,
        price: 89,
        type: 'apartment',
        tags: ['Вид на Куру', 'Самостоятельное заселение'],
    },
    {
        id: 5,
        name: 'Patagonia View Lodge',
        city: 'Пуэрто-Наталес',
        country: 'Чили',
        rating: 9.0,
        price: 210,
        type: 'villa',
        tags: ['Вид на горы', 'Завтраки включены'],
    },
    {
        id: 6,
        name: 'Reykjavik Blue Lagoon Suites',
        city: 'Рейкьявик',
        country: 'Исландия',
        rating: 8.8,
        price: 176,
        type: 'hotel',
        tags: ['Спа-доступ', 'Трансфер в лагуну'],
    },
];

const priceMatcher = {
    budget: (price) => price < 120,
    mid: (price) => price >= 120 && price <= 220,
    premium: (price) => price > 220,
};

const filtersForm = document.querySelector('#accommodationFilters');
const resetFiltersButton = document.querySelector('#resetFilters');
const listContainer = document.querySelector('#accommodationList');

function populateCities() {
    const select = filtersForm.querySelector('select[name="city"]');
    const cities = Array.from(new Set(accommodations.map((item) => item.city))).sort((a, b) =>
        a.localeCompare(b, 'ru')
    );

    cities.forEach((city) => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        select.append(option);
    });
}

function createAccommodationCard(item) {
    const card = document.createElement('article');
    card.className = 'accommodation-card';
    card.innerHTML = `
        <div class="accommodation-card__image">${item.city}, ${item.country}</div>
        <div class="accommodation-card__body">
            <div class="accommodation-card__meta">
                <h3>${item.name}</h3>
                <span class="accommodation-card__rating">
                    <strong>${item.rating.toFixed(1)}</strong>
                    / 10
                </span>
            </div>
            <p class="accommodation-card__price">от €${item.price} / ночь</p>
            <div class="accommodation-card__tags">
                ${item.tags.map((tag) => `<span class="accommodation-card__tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    return card;
}

function renderAccommodations(items) {
    listContainer.innerHTML = '';

    if (items.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'accommodation-card accommodation-card--empty';
        emptyState.innerHTML = `
            <div class="accommodation-card__body">
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить фильтры или выбрать другие даты.</p>
            </div>
        `;
        listContainer.append(emptyState);
        return;
    }

    items.forEach((item) => listContainer.append(createAccommodationCard(item)));
}

function applyFilters() {
    const formData = new FormData(filtersForm);
    const city = formData.get('city');
    const type = formData.get('type');
    const price = formData.get('price');
    const rating = formData.get('rating');

    const filtered = accommodations.filter((item) => {
        const cityMatch = city ? item.city === city : true;
        const typeMatch = type ? item.type === type : true;
        const priceMatch = price ? priceMatcher[price](item.price) : true;
        const ratingMatch = rating ? item.rating >= Number(rating) : true;
        return cityMatch && typeMatch && priceMatch && ratingMatch;
    });

    renderAccommodations(filtered);
}

function initFilters() {
    populateCities();
    applyFilters();

    filtersForm.addEventListener('change', applyFilters);
    resetFiltersButton.addEventListener('click', () => {
        filtersForm.reset();
        applyFilters();
    });
}

if (filtersForm && listContainer) {
    initFilters();
}
