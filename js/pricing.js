/**
 * CEN227 Internet Programming Midterm Project
 * Fiyat Tablosu ve Çizelge Mantığı (pricing.js - pricing.html)
 */

document.addEventListener("DOMContentLoaded", () => {
  initPricingPage();
});

let tableCars = [...getAllCars()];
let tableSearchQuery = "";
let tableCategoryFilter = "all";
let sortColumn = "dailyPrice";
let sortDirection = "asc"; // 'asc' veya 'desc'

function initPricingPage() {
  calculateOverviewStats();
  renderComparisonChart();
  setupTableControls();
  renderPricingTable();
}

/**
 * Üst İstatistik Kartlarını Dinamik Hesaplar
 */
function calculateOverviewStats() {
  const all = getAllCars();
  const totalCount = all.length;

  const totalPrice = all.reduce((sum, c) => sum + c.dailyPrice, 0);
  const avgPrice = Math.round(totalPrice / totalCount);

  // En ucuz araç
  const cheapest = [...all].sort((a, b) => a.dailyPrice - b.dailyPrice)[0];

  // Hibrit ve Elektrikli araç sayısı
  const ecoCount = all.filter(c => c.fuel === "Hibrit" || c.fuel === "Elektrik").length;

  const totalEl = document.getElementById("stat-total-cars");
  const avgEl = document.getElementById("stat-avg-price");
  const cheapEl = document.getElementById("stat-cheapest-car");
  const ecoEl = document.getElementById("stat-eco-count");

  if (totalEl) totalEl.textContent = `${totalCount} Araç`;
  if (avgEl) avgEl.textContent = formatPrice(avgPrice);
  if (cheapEl) cheapEl.textContent = `${cheapest.brand} ${cheapest.model} (${formatPrice(cheapest.dailyPrice)})`;
  if (ecoEl) ecoEl.textContent = `${ecoCount} Araç (%${Math.round((ecoCount/totalCount)*100)})`;
}

/**
 * Segment Ortalama Fiyat Karşılaştırma Grafiği (Visual Chart)
 */
function renderComparisonChart() {
  const container = document.getElementById("price-chart-container");
  if (!container) return;

  const all = getAllCars();
  const segments = {};

  // Segmentlere göre fiyatları grupla
  all.forEach(car => {
    if (!segments[car.category]) {
      segments[car.category] = { total: 0, count: 0 };
    }
    segments[car.category].total += car.dailyPrice;
    segments[car.category].count += 1;
  });

  const segmentAverages = Object.keys(segments).map(seg => {
    return {
      name: seg,
      avg: Math.round(segments[seg].total / segments[seg].count)
    };
  }).sort((a, b) => a.avg - b.avg);

  const maxAvg = Math.max(...segmentAverages.map(s => s.avg));

  container.innerHTML = segmentAverages.map(item => {
    const percent = Math.round((item.avg / maxAvg) * 100);
    return `
      <div class="chart-bar-item">
        <div class="chart-label">${item.name}</div>
        <div class="chart-track">
          <div class="chart-fill" style="width: ${percent}%;"></div>
        </div>
        <div class="chart-val">${formatPrice(item.avg)} / gün</div>
      </div>
    `;
  }).join("");
}

/**
 * Tablo Kontrollerini (Arama, Filtre, Sıralama) Kurar
 */
function setupTableControls() {
  const searchInput = document.getElementById("table-search-input");
  const categorySelect = document.getElementById("table-category-select");
  const headers = document.querySelectorAll(".custom-table th[data-sort]");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      tableSearchQuery = e.target.value.toLowerCase().trim();
      filterAndRenderTable();
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", (e) => {
      tableCategoryFilter = e.target.value;
      filterAndRenderTable();
    });
  }

  // Sütun başlıklarına tıklama ile sıralama
  headers.forEach(th => {
    th.addEventListener("click", () => {
      const col = th.getAttribute("data-sort");
      if (sortColumn === col) {
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
      } else {
        sortColumn = col;
        sortDirection = "asc";
      }

      // Başlıklardaki ikonları güncelle
      headers.forEach(h => {
        const icon = h.querySelector(".sort-icon");
        if (icon) icon.textContent = "⇅";
      });
      const activeIcon = th.querySelector(".sort-icon");
      if (activeIcon) {
        activeIcon.textContent = sortDirection === "asc" ? "▲" : "▼";
      }

      filterAndRenderTable();
    });
  });
}

/**
 * Filtreleme ve Sıralama Sonrası Tabloyu Çizer
 */
function filterAndRenderTable() {
  let list = getAllCars();

  // Kategori Filtresi
  if (tableCategoryFilter !== "all") {
    list = list.filter(car => car.category.toLowerCase() === tableCategoryFilter.toLowerCase());
  }

  // Arama Filtresi
  if (tableSearchQuery) {
    list = list.filter(car => {
      const text = `${car.brand} ${car.model} ${car.category} ${car.fuel} ${car.transmission}`.toLowerCase();
      return text.includes(tableSearchQuery);
    });
  }

  // Sıralama
  list.sort((a, b) => {
    let valA, valB;

    if (sortColumn === "name") {
      valA = `${a.brand} ${a.model}`;
      valB = `${b.brand} ${b.model}`;
      return sortDirection === "asc" ? valA.localeCompare(valB, 'tr') : valB.localeCompare(valA, 'tr');
    } else if (sortColumn === "category") {
      valA = a.category;
      valB = b.category;
      return sortDirection === "asc" ? valA.localeCompare(valB, 'tr') : valB.localeCompare(valA, 'tr');
    } else if (sortColumn === "dailyPrice") {
      valA = a.dailyPrice;
      valB = b.dailyPrice;
    } else if (sortColumn === "weeklyPrice") {
      valA = getWeeklyPrice(a.dailyPrice, a.weeklyDiscountPercent);
      valB = getWeeklyPrice(b.dailyPrice, b.weeklyDiscountPercent);
    } else if (sortColumn === "deposit") {
      valA = a.deposit;
      valB = b.deposit;
    } else {
      valA = a.id;
      valB = b.id;
    }

    return sortDirection === "asc" ? valA - valB : valB - valA;
  });

  tableCars = list;
  renderPricingTable();
}

/**
 * Tablo gövdesini oluşturur
 */
function renderPricingTable() {
  const tbody = document.getElementById("pricing-table-body");
  const countSpan = document.getElementById("table-results-badge");

  if (countSpan) {
    countSpan.textContent = `${tableCars.length} araç listelendi`;
  }

  if (!tbody) return;

  if (tableCars.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 40px; color: #64748b;">
          Aramanızla eşleşen fiyat verisi bulunamadı.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = tableCars.map(car => {
    const weeklyTotal = getWeeklyPrice(car.dailyPrice, car.weeklyDiscountPercent);
    const weeklyPerDay = Math.round(weeklyTotal / 7);
    const monthlyEstimate = Math.round(car.dailyPrice * 30 * 0.72); // %28 aylık filo indirimi

    return `
      <tr>
        <td>
          <div class="table-car-cell">
            <img class="table-car-thumb" src="${car.image}" alt="${car.brand} ${car.model}" loading="lazy">
            <div class="table-car-names">
              <h5>${car.brand} ${car.model}</h5>
              <span>${car.year} Model • ${car.engine}</span>
            </div>
          </div>
        </td>
        <td>
          <span class="badge badge-primary">${car.category}</span>
        </td>
        <td>
          <div><strong>${car.transmission}</strong></div>
          <span style="font-size: 0.8rem; color: #64748b;">${car.fuel}</span>
        </td>
        <td>
          <div class="price-cell-daily">${formatPrice(car.dailyPrice)}</div>
          <span style="font-size: 0.75rem; color: #64748b;">/ gün</span>
        </td>
        <td>
          <div class="price-cell-weekly">
            ${formatPrice(weeklyTotal)}
            <span class="discount-badge-mini">-%${car.weeklyDiscountPercent}</span>
          </div>
          <div style="font-size: 0.75rem; color: #10b981;">(Günlük: ${formatPrice(weeklyPerDay)})</div>
        </td>
        <td>
          <div style="font-weight: 700; color: #0f172a;">${formatPrice(monthlyEstimate)}</div>
          <span style="font-size: 0.72rem; color: #64748b;">30 Günlük Tahmini</span>
        </td>
        <td>
          <div style="font-weight: 600; color: #475569;">${formatPrice(car.deposit)}</div>
          <span style="font-size: 0.72rem; color: #94a3b8;">Kredi Kartı Bloke</span>
        </td>
        <td style="white-space: nowrap;">
          <div style="font-size: 0.85rem; font-weight: 600;">Min. ${car.minAge} Yaş</div>
          <div style="font-size: 0.75rem; color: #64748b;">${car.minLicenseYears} Yıl Ehliyet</div>
        </td>
        <td>
          <div style="display: flex; gap: 8px;">
            <!-- PDF Flow Detay Bağlantısı -->
            <a href="detail.html?id=${car.id}" class="btn btn-outline btn-sm" title="Detayları İncele">
              Detay
            </a>
            <!-- PDF Flow Kiralama Formu Bağlantısı -->
            <a href="booking.html?id=${car.id}" class="btn btn-primary btn-sm" title="Hemen Kirala">
              Kirala
            </a>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}
