/**
 * CEN227 Internet Programming Midterm Project
 * Detay Sayfası Mantığı (detail.js - detail.html)
 */

document.addEventListener("DOMContentLoaded", () => {
  initDetailPage();
});

let currentCar = null;
let rentalDays = 3;

function initDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const carIdParam = urlParams.get("id");

  // ID parametresine göre aracı bul, yoksa ilk aracı varsayılan yap
  let carId = parseInt(carIdParam, 10);
  if (isNaN(carId) || !getCarById(carId)) {
    carId = 1;
  }

  currentCar = getCarById(carId);
  if (!currentCar) {
    document.getElementById("detail-content-area").innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <h2>Araç Bulunamadı</h2>
        <p>İstenen araç sistemde kayıtlı değil.</p>
        <a href="index.html" class="btn btn-primary" style="margin-top: 15px;">Araç Filosuna Dön</a>
      </div>
    `;
    return;
  }

  // Sayfa başlıkları ve breadcrumb
  document.title = `${currentCar.brand} ${currentCar.model} | Detay | CEN227 Rent a Car`;
  renderCarDetails(currentCar);
  initCarSelectorDropdown(currentCar.id);
  initPriceCalculator(currentCar);
}

/**
 * Hızlı araç değiştirme menüsü
 */
function initCarSelectorDropdown(selectedId) {
  const selector = document.getElementById("vehicle-quick-switch");
  if (!selector) return;

  const cars = getAllCars();
  selector.innerHTML = cars.map(c => `
    <option value="${c.id}" ${c.id === selectedId ? "selected" : ""}>
      ${c.brand} ${c.model} (${c.category} - ${formatPrice(c.dailyPrice)}/gün)
    </option>
  `).join("");

  selector.addEventListener("change", (e) => {
    const newId = e.target.value;
    window.location.href = `detail.html?id=${newId}`;
  });
}

/**
 * Araç detaylarını DOM elemanlarına basar
 */
function renderCarDetails(car) {
  // Breadcrumb
  const breadcrumbCar = document.getElementById("breadcrumb-car-name");
  if (breadcrumbCar) breadcrumbCar.textContent = `${car.brand} ${car.model}`;

  // Başlık & Kategori
  const nameEl = document.getElementById("detail-car-name");
  if (nameEl) nameEl.textContent = `${car.brand} ${car.model}`;

  const metaEl = document.getElementById("detail-car-meta");
  if (metaEl) {
    metaEl.innerHTML = `
      <span class="badge badge-primary">${car.category}</span>
      <span class="badge badge-accent">${car.badge}</span>
      <span style="font-size: 0.88rem; color: #64748b;">Model Yılı: <strong>${car.year}</strong></span>
      <span style="font-size: 0.88rem; color: #f59e0b; font-weight: 700;">★ ${car.rating.toFixed(1)} / 5.0 Müşteri Memnuniyeti</span>
    `;
  }

  // Görsel
  const imgEl = document.getElementById("detail-car-img");
  if (imgEl) {
    imgEl.src = car.image;
    imgEl.alt = `${car.brand} ${car.model}`;
  }

  // Açıklama
  const descEl = document.getElementById("detail-car-desc");
  if (descEl) descEl.textContent = car.description;

  // Teknik Özellikler Grid
  const specsContainer = document.getElementById("detail-specs-grid");
  if (specsContainer) {
    specsContainer.innerHTML = `
      <div class="spec-item">
        <div class="spec-item-label">⚙️ Şanzıman</div>
        <div class="spec-item-value">${car.transmission}</div>
      </div>
      <div class="spec-item">
        <div class="spec-item-label">⛽ Yakıt Türü</div>
        <div class="spec-item-value">${car.fuel}</div>
      </div>
      <div class="spec-item">
        <div class="spec-item-label">⚡ Motor & Güç</div>
        <div class="spec-item-value">${car.engine}</div>
      </div>
      <div class="spec-item">
        <div class="spec-item-label">👥 Yolcu Kapasitesi</div>
        <div class="spec-item-value">${car.seats} Kişilik</div>
      </div>
      <div class="spec-item">
        <div class="spec-item-label">🧳 Bagaj Hacmi</div>
        <div class="spec-item-value">${car.luggage}</div>
      </div>
      <div class="spec-item">
        <div class="spec-item-label">📉 Ortalama Tüketim</div>
        <div class="spec-item-value">${car.fuelConsumption}</div>
      </div>
      <div class="spec-item">
        <div class="spec-item-label">🛣️ Günlük KM Limiti</div>
        <div class="spec-item-value">${car.mileageLimit}</div>
      </div>
      <div class="spec-item">
        <div class="spec-item-label">💳 Güvence Depozitosu</div>
        <div class="spec-item-value">${formatPrice(car.deposit)}</div>
      </div>
    `;
  }

  // Donanım Özellikleri
  const featuresList = document.getElementById("detail-features-list");
  if (featuresList && car.features) {
    featuresList.innerHTML = car.features.map(f => `
      <li>
        <span class="check">✓</span>
        <span>${f}</span>
      </li>
    `).join("");
  }

  // Kiralama Koşulları
  const conditionsBox = document.getElementById("detail-conditions-box");
  if (conditionsBox) {
    conditionsBox.innerHTML = `
      <div class="condition-item">
        <div class="condition-icon">🎂</div>
        <div>
          <div style="font-weight: 700; font-size: 0.9rem;">Minimum Sürücü Yaşı</div>
          <div style="font-size: 0.8rem; color: #64748b;">Bu araç için en az <strong>${car.minAge} yaş</strong> şartı aranmaktadır.</div>
        </div>
      </div>
      <div class="condition-item">
        <div class="condition-icon">🪪</div>
        <div>
          <div style="font-weight: 700; font-size: 0.9rem;">Ehliyet Süresi</div>
          <div style="font-size: 0.8rem; color: #64748b;">En az <strong>${car.minLicenseYears} yıllık</strong> geçerli ehliyet gereklidir.</div>
        </div>
      </div>
      <div class="condition-item">
        <div class="condition-icon">💳</div>
        <div>
          <div style="font-weight: 700; font-size: 0.9rem;">Depozito & Ödeme</div>
          <div style="font-size: 0.8rem; color: #64748b;">Sürücü adına düzenlenmiş kredi kartından <strong>${formatPrice(car.deposit)}</strong> provizyon alınır.</div>
        </div>
      </div>
    `;
  }
}

/**
 * Detay sayfasındaki dinamik fiyat hesaplama motoru ve rezervasyon yönlendirmesi
 */
function initPriceCalculator(car) {
  const daysSlider = document.getElementById("detail-days-slider");
  const daysDisplay = document.getElementById("detail-days-display");
  const dailyPriceDisplay = document.getElementById("widget-daily-price");
  const subtotalDisplay = document.getElementById("widget-subtotal");
  const discountRow = document.getElementById("widget-discount-row");
  const discountDisplay = document.getElementById("widget-discount-amount");
  const totalDisplay = document.getElementById("widget-total-amount");
  const bookBtn = document.getElementById("btn-go-to-booking");

  if (dailyPriceDisplay) {
    dailyPriceDisplay.textContent = formatPrice(car.dailyPrice);
  }

  function recalculate() {
    rentalDays = parseInt(daysSlider.value, 10);
    if (daysDisplay) daysDisplay.textContent = `${rentalDays} Gün`;

    const grossTotal = car.dailyPrice * rentalDays;
    let discountAmount = 0;

    // 7 gün ve üzeri için haftalık indirim uygula
    if (rentalDays >= 7) {
      discountAmount = Math.round(grossTotal * (car.weeklyDiscountPercent / 100));
      if (discountRow) discountRow.style.display = "flex";
      if (discountDisplay) discountDisplay.textContent = `-${formatPrice(discountAmount)} (%${car.weeklyDiscountPercent})`;
    } else {
      if (discountRow) discountRow.style.display = "none";
    }

    const netTotal = grossTotal - discountAmount;

    if (subtotalDisplay) subtotalDisplay.textContent = formatPrice(grossTotal);
    if (totalDisplay) totalDisplay.textContent = formatPrice(netTotal);

    // Kiralama formuna veriyi taşı (car id & kiralanmak istenen gün sayısı)
    if (bookBtn) {
      bookBtn.href = `booking.html?id=${car.id}&days=${rentalDays}`;
    }
  }

  if (daysSlider) {
    daysSlider.addEventListener("input", recalculate);
    recalculate();
  }
}
