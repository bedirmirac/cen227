/**
 * CEN227 Internet Programming Midterm Project
 * Liste Sayfası Mantığı (fleet.js - index.html)
 */

document.addEventListener("DOMContentLoaded", () => {
  initFleetPage();
});

let currentCars = [...getAllCars()];
let selectedCategory = "all";
let selectedTransmission = "all";
let searchKeyword = "";
let sortBy = "default";

function initFleetPage() {
  const searchInput = document.getElementById("fleet-search");
  const transmissionSelect = document.getElementById("transmission-filter");
  const sortSelect = document.getElementById("sort-select");
  const clearBtn = document.getElementById("clear-filters-btn");
  const categoryPills = document.querySelectorAll(".pill-btn");

  // Arama girdisi dinleyicisi
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchKeyword = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  // Vites filtresi dinleyicisi
  if (transmissionSelect) {
    transmissionSelect.addEventListener("change", (e) => {
      selectedTransmission = e.target.value;
      applyFilters();
    });
  }

  // Sıralama dinleyicisi
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      sortBy = e.target.value;
      applyFilters();
    });
  }

  // Kategori butonları dinleyicisi
  if (categoryPills) {
    categoryPills.forEach(pill => {
      pill.addEventListener("click", () => {
        categoryPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        selectedCategory = pill.getAttribute("data-category");
        applyFilters();
      });
    });
  }

  // Filtreleri temizle butonu
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (transmissionSelect) transmissionSelect.value = "all";
      if (sortSelect) sortSelect.value = "default";
      if (categoryPills) {
        categoryPills.forEach(p => p.classList.remove("active"));
        const allPill = document.querySelector('.pill-btn[data-category="all"]');
        if (allPill) allPill.classList.add("active");
      }
      searchKeyword = "";
      selectedTransmission = "all";
      selectedCategory = "all";
      sortBy = "default";
      applyFilters();
    });
  }

  // İlk listeleme
  applyFilters();
}

/**
 * Filtreleri ve sıralamayı uygular, kartları yeniden çizer
 */
function applyFilters() {
  let list = getAllCars();

  // Kategori Filtresi
  if (selectedCategory !== "all") {
    list = list.filter(car => car.category.toLowerCase() === selectedCategory.toLowerCase());
  }

  // Vites Filtresi
  if (selectedTransmission !== "all") {
    list = list.filter(car => car.transmission.toLowerCase() === selectedTransmission.toLowerCase());
  }

  // Anahtar Kelime Arama (Marka, Model, Motor, Yakıt)
  if (searchKeyword) {
    list = list.filter(car => {
      const fullText = `${car.brand} ${car.model} ${car.category} ${car.fuel} ${car.description}`.toLowerCase();
      return fullText.includes(searchKeyword);
    });
  }

  // Sıralama
  if (sortBy === "price-asc") {
    list.sort((a, b) => a.dailyPrice - b.dailyPrice);
  } else if (sortBy === "price-desc") {
    list.sort((a, b) => b.dailyPrice - a.dailyPrice);
  } else if (sortBy === "rating-desc") {
    list.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "brand-asc") {
    list.sort((a, b) => a.brand.localeCompare(b.brand, 'tr'));
  }

  currentCars = list;
  renderCarCards(currentCars);
  updateResultsCount(currentCars.length);
}

/**
 * Araç kartlarını DOM'a basar
 */
function renderCarCards(cars) {
  const container = document.getElementById("fleet-grid-container");
  if (!container) return;

  if (cars.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 16px; border: 1px dashed #cbd5e1;">
        <div style="font-size: 3rem; margin-bottom: 12px;">🚗🔍</div>
        <h3 style="font-size: 1.3rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Aradığınız kriterlere uygun araç bulunamadı</h3>
        <p style="color: #64748b; margin-bottom: 20px;">Lütfen farklı bir kategori seçmeyi veya arama filtrenizi temizlemeyi deneyin.</p>
        <button class="btn btn-outline-primary" onclick="document.getElementById('clear-filters-btn').click();">Tüm Araçları Göster</button>
      </div>
    `;
    return;
  }

  container.innerHTML = cars.map(car => {
    const weeklyRate = getWeeklyPrice(car.dailyPrice, car.weeklyDiscountPercent);
    const weeklyDailyAverage = Math.round(weeklyRate / 7);

    return `
      <article class="car-card" data-id="${car.id}">
        <div class="car-image-box">
          <img src="${car.image}" alt="${car.brand} ${car.model}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80'">
          <div class="car-badge-top">
            <span class="badge badge-accent">${car.badge}</span>
          </div>
          <div class="car-rating-top">
            ★ ${car.rating.toFixed(1)}
          </div>
        </div>

        <div class="car-body">
          <div class="car-category-sub">${car.category} • ${car.year}</div>
          <h3 class="car-title">${car.brand} ${car.model}</h3>

          <div class="car-specs-chips">
            <div class="spec-chip">
              <span class="icon">⚙️</span>
              <span>${car.transmission}</span>
            </div>
            <div class="spec-chip">
              <span class="icon">⛽</span>
              <span>${car.fuel}</span>
            </div>
            <div class="spec-chip">
              <span class="icon">👥</span>
              <span>${car.seats} Koltuk</span>
            </div>
            <div class="spec-chip">
              <span class="icon">🧳</span>
              <span>${car.luggage.split('(')[0].trim()}</span>
            </div>
          </div>

          <div class="car-price-box">
            <div>
              <div class="price-meta">Günlük Fiyat</div>
              <div class="price-main">${formatPrice(car.dailyPrice)} <span>/ gün</span></div>
            </div>
            <div style="text-align: right;">
              <div class="weekly-tag">%${car.weeklyDiscountPercent} Haftalık İndirim</div>
              <div style="font-size: 0.78rem; color: #64748b; margin-top: 2px;">
                7+ gün: <strong>${formatPrice(weeklyDailyAverage)}/gün</strong>
              </div>
            </div>
          </div>

          <div class="car-actions">
            <!-- PDF Flow Adım 2: Detay Sayfasına Geçiş (data passing via URL param ?id=...) -->
            <a href="detail.html?id=${car.id}" class="btn btn-outline" title="Araç Detaylarını Gör">
              Detayları İncele
            </a>
            <!-- PDF Flow Adım 3: Doğrudan Kiralama Formuna Geçiş (?id=...) -->
            <a href="booking.html?id=${car.id}" class="btn btn-primary" title="Hemen Kirala">
              Hemen Kirala
            </a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/**
 * Bulunan araç adedini günceller
 */
function updateResultsCount(count) {
  const countEl = document.getElementById("fleet-result-count");
  if (countEl) {
    countEl.textContent = `${count} araç listeleniyor`;
  }
}
