/**
 * CEN227 Internet Programming Midterm Project
 * Araç Veri Havuzu ve Yardımcı Fonksiyonlar (cars-data.js)
 */

const CARS_DATA = [
  {
    id: 1,
    brand: "Renault",
    model: "Clio 1.0 TCe Touch",
    category: "Ekonomi",
    year: 2024,
    dailyPrice: 1150,
    weeklyDiscountPercent: 15,
    deposit: 3500,
    minAge: 21,
    minLicenseYears: 1,
    transmission: "Otomatik",
    fuel: "Benzin",
    engine: "1.0 TCe 90 HP Turbo",
    seats: 5,
    doors: 5,
    luggage: "391 Litre (2 Valiz)",
    fuelConsumption: "5.1 lt / 100 km",
    mileageLimit: "300 km / Gün",
    badge: "Ekonomik & Pratik",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=900&q=80",
    description: "Şehir içi yolculukların en gözde tercihi Renault Clio, düşük yakıt tüketimi, modern dokunmatik multimedya ekranı ve kompakt yapısıyla kolay park imkanı sağlar.",
    features: [
      "Apple CarPlay & Android Auto",
      "Geri Görüş Kamerası & Arka Park Sensörü",
      "Yokuş Kalkış Destek Sistemi (Hill Holder)",
      "Hız Sabitleyici ve Sınırlayıcı",
      "Dokunmatik 7 inç Multimedya Ekranı",
      "LED Gündüz Farları"
    ]
  },
  {
    id: 2,
    brand: "Fiat",
    model: "Egea Sedan 1.3 MultiJet Easy",
    category: "Ekonomi",
    year: 2024,
    dailyPrice: 1250,
    weeklyDiscountPercent: 15,
    deposit: 3500,
    minAge: 21,
    minLicenseYears: 1,
    transmission: "Manuel",
    fuel: "Dizel",
    engine: "1.3 MultiJet 95 HP",
    seats: 5,
    doors: 4,
    luggage: "520 Litre (3 Büyük Valiz)",
    fuelConsumption: "4.4 lt / 100 km",
    mileageLimit: "300 km / Gün",
    badge: "Geniş Bagaj & Az Yakan",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80",
    description: "Geniş 520 litrelik bagaj kapasitesi ve efsaneleşmiş dizel yakıt tasarrufu ile hem uzun aile yolculukları hem de iş seyahatleri için en bütçe dostu sedan alternatifi.",
    features: [
      "Bluetooth & USB Bağlantısı",
      "Geniş 520L Bagaj Hacmi",
      "Yol Bilgisayarı & Eco Sürüş Modu",
      "Yokuş Kalkış Desteği",
      "Manuel Çift Kademeli Klima",
      "Elektrikli Isıtmalı Yan Aynalar"
    ]
  },
  {
    id: 3,
    brand: "Volkswagen",
    model: "Golf 1.5 eTSI Life",
    category: "Kompakt",
    year: 2024,
    dailyPrice: 1850,
    weeklyDiscountPercent: 18,
    deposit: 5000,
    minAge: 22,
    minLicenseYears: 2,
    transmission: "Otomatik",
    fuel: "Hibrit",
    engine: "1.5 eTSI 150 HP Mild-Hybrid",
    seats: 5,
    doors: 5,
    luggage: "381 Litre (2 Büyük Valiz)",
    fuelConsumption: "4.9 lt / 100 km",
    mileageLimit: "350 km / Gün",
    badge: "Premium Hatchback",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    description: "Alman mühendisliğinin simgesi Golf 8, 150 beygirlik mild-hybrid motoru, sessiz kabini ve üstün yol tutuşu ile hem dinamik hem son derece konforlu bir sürüş sunar.",
    features: [
      "Dijital Hayalet Gösterge (Digital Cockpit)",
      "Kablosuz Şarj & Apple CarPlay",
      "Şerit Takip Asistanı (Lane Assist)",
      "Ön ve Arka Park Asistanı",
      "3 Bölgeli Tam Otomatik Dijital Klima",
      "Ambiyans Aydınlatma (10 Renk)"
    ]
  },
  {
    id: 4,
    brand: "Toyota",
    model: "Corolla 1.8 Hybrid Dream",
    category: "Sedan",
    year: 2024,
    dailyPrice: 1950,
    weeklyDiscountPercent: 16,
    deposit: 5000,
    minAge: 22,
    minLicenseYears: 2,
    transmission: "Otomatik",
    fuel: "Hibrit",
    engine: "1.8 Hybrid 140 HP e-CVT",
    seats: 5,
    doors: 4,
    luggage: "471 Litre (3 Valiz)",
    fuelConsumption: "3.8 lt / 100 km",
    mileageLimit: "350 km / Gün",
    badge: "Çok Satan Hibrit",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80",
    description: "Kendi kendini şarj eden Toyota Hibrit teknolojisi, sessiz elektrikli kalkışlar, sınıfının lideri yakıt tasarrufu ve Toyota Safety Sense güvenlik paketiyle yollarda maksimum huzur.",
    features: [
      "Kendi Kendini Şarj Eden Hibrit Sistem",
      "Toyota Safety Sense 3 Kaza Önleme",
      "Adaptif Hız Sabitleyici (Full Speed)",
      "Geri Görüş Kamerası & Dinamik Çizgiler",
      "Kablosuz Akıllı Telefon Entegrasyonu",
      "Elektronik Park Freni & Brake Hold"
    ]
  },
  {
    id: 5,
    brand: "Peugeot",
    model: "3008 1.5 BlueHDi Allure",
    category: "SUV",
    year: 2024,
    dailyPrice: 2450,
    weeklyDiscountPercent: 20,
    deposit: 7000,
    minAge: 23,
    minLicenseYears: 2,
    transmission: "Otomatik",
    fuel: "Dizel",
    engine: "1.5 BlueHDi 130 HP EAT8",
    seats: 5,
    doors: 5,
    luggage: "520 Litre (4 Valiz)",
    fuelConsumption: "5.4 lt / 100 km",
    mileageLimit: "350 km / Gün",
    badge: "Geniş Aile SUV",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
    description: "Göz alıcı SUV tasarımı, panoramik cam tavan hissi, fütüristik i-Cockpit direksiyon ve ekran tasarımıyla ailenizle çıkacağınız tatillerde yüksek konfor ve güven vaat eder.",
    features: [
      "Peugeot i-Cockpit 3D Dijital Gösterge",
      "180° Geri Görüş ve Çevre Kamerası",
      "Kör Nokta Uyarı Sistemi",
      "Grip Control Çekiş Modları (Kar/Kum/Çamur)",
      "Otomatik Kararan Dikiz Aynası",
      "Elektrikli Katlanır Isıtmalı Aynalar"
    ]
  },
  {
    id: 6,
    brand: "Hyundai",
    model: "Tucson 1.6 T-GDI Prime Plus",
    category: "SUV",
    year: 2024,
    dailyPrice: 2600,
    weeklyDiscountPercent: 18,
    deposit: 7500,
    minAge: 23,
    minLicenseYears: 2,
    transmission: "Otomatik",
    fuel: "Benzin",
    engine: "1.6 T-GDI 180 HP 4x2 DCT",
    seats: 5,
    doors: 5,
    luggage: "598 Litre (4 Büyük Valiz)",
    fuelConsumption: "6.8 lt / 100 km",
    mileageLimit: "350 km / Gün",
    badge: "Ultra Geniş & Güçlü",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=900&q=80",
    description: "Parametrik gizli farları, 180 beygirlik seri turbo motoru ve devasa 598 litrelik bagaj hacmiyle sınıf standartlarının ötesinde bir sürüş zevki ve ferahlık.",
    features: [
      "10.25 inç Dokunmatik Navigasyon Ekranı",
      "Ön Çarpışma Önleme Asistanı (FCA)",
      "Kablosuz Akıllı Telefon Şarjı",
      "Akıllı Hız Sabitleyici (Smart Cruise)",
      "Geniş Panoramik Açılır Cam Tavan",
      "Sürüş Modu Seçenekleri (Eco / Normal / Sport)"
    ]
  },
  {
    id: 7,
    brand: "BMW",
    model: "320i Sedan M Sport",
    category: "Lüks",
    year: 2024,
    dailyPrice: 4300,
    weeklyDiscountPercent: 22,
    deposit: 15000,
    minAge: 26,
    minLicenseYears: 3,
    transmission: "Otomatik",
    fuel: "Benzin",
    engine: "2.0 TwinPower Turbo 170 HP",
    seats: 5,
    doors: 4,
    luggage: "480 Litre (3 Valiz)",
    fuelConsumption: "6.5 lt / 100 km",
    mileageLimit: "300 km / Gün",
    badge: "Sportif Prestij",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
    description: "BMW M Sport aerodinamik paketi, arkadan itiş sürüş keyfi, kavisli çift ekranı (BMW Curved Display) ve üst düzey kabin sessizliği ile prestijli iş ve özel seyahatler için kusursuz.",
    features: [
      "BMW Kavisli Ekran (14.9 inç Bilgi & 12.3 inç Gösterge)",
      "M Deri Direksiyon & M Spor Koltuklar",
      "Harman Kardon Surround Ses Sistemi",
      "Park Asistanı & Otomatik Geri Sürüş Desteği",
      "Akıllı Lazer Farlar & Adaptif Uzun Far",
      "Konfor Erişim (Anahtarsız Giriş & Bagaj Açma)"
    ]
  },
  {
    id: 8,
    brand: "Mercedes-Benz",
    model: "C200 4MATIC AMG Edition",
    category: "Lüks",
    year: 2024,
    dailyPrice: 4750,
    weeklyDiscountPercent: 22,
    deposit: 16000,
    minAge: 27,
    minLicenseYears: 3,
    transmission: "Otomatik",
    fuel: "Hibrit",
    engine: "1.5 EQ Boost 204+20 HP 4MATIC",
    seats: 5,
    doors: 4,
    luggage: "455 Litre (3 Valiz)",
    fuelConsumption: "6.6 lt / 100 km",
    mileageLimit: "300 km / Gün",
    badge: "Lüks & Dört Çeker",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
    description: "4MATIC dört tekerlekten çekiş güvencesi, dikey MBUX dev multimedya ekranı, birinci sınıf deri işçiliği ve 64 renkli aktif ambiyans aydınlatması ile lüksün zirvesi.",
    features: [
      "11.9 inç Dikey MBUX Yüksek Çözünürlüklü Ekran",
      "4MATIC Akıllı Dört Tekerlekten Çekiş",
      "Burmester 3D High-End Ses Sistemi",
      "Kör Nokta & Aktif Fren Asistanı",
      "Isıtmalı ve Hafızalı Ön Koltuklar",
      "64 Renkli Dinamik Ambiyans Işıklandırması"
    ]
  },
  {
    id: 9,
    brand: "Tesla",
    model: "Model Y Long Range AWD",
    category: "Elektrikli",
    year: 2024,
    dailyPrice: 3850,
    weeklyDiscountPercent: 20,
    deposit: 12000,
    minAge: 25,
    minLicenseYears: 3,
    transmission: "Otomatik",
    fuel: "Elektrik",
    engine: "Dual Motor AWD 450 HP (0-100: 5.0s)",
    seats: 5,
    doors: 5,
    luggage: "854 Litre + Ön Bagaj (Frunk)",
    fuelConsumption: "16.8 kWh / 100 km (~533 km Menzil)",
    mileageLimit: "350 km / Gün",
    badge: "%100 Elektrik & Süper Hızlı",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=80",
    description: "Sıfır emisyon, 533 km menzil, Tesla Supercharger hızlı şarj ağı erişimi, devasa cam tavanı ve otonom sürüş asistanları ile geleceğin teknolojisini bugünden yaşayın.",
    features: [
      "Tesla Autopilot Otonom Sürüş Desteği",
      "15 inç Merkezi Dokunmatik Ekran & Netflix/YouTube",
      "Ultra Geniş Ön ve Arka Bagaj Alanı (854L)",
      "Premium 13 Hoparlörlü Ses Sistemi + Subwoofer",
      "Supercharger 250 kW Hızlı Şarj Desteği (15 dk'da 240km)",
      "Sentry Mode (360° Güvenlik Nöbetçisi)"
    ]
  },
  {
    id: 10,
    brand: "Audi",
    model: "A3 Sedan 35 TFSI Advanced",
    category: "Sedan",
    year: 2024,
    dailyPrice: 2850,
    weeklyDiscountPercent: 18,
    deposit: 8000,
    minAge: 24,
    minLicenseYears: 2,
    transmission: "Otomatik",
    fuel: "Hibrit",
    engine: "1.5 TFSI Mild-Hybrid 150 HP S-Tronic",
    seats: 5,
    doors: 4,
    luggage: "425 Litre (3 Valiz)",
    fuelConsumption: "5.1 lt / 100 km",
    mileageLimit: "350 km / Gün",
    badge: "Zarif & Teknolojik",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
    description: "Audi'nin keskin hatları, sanal kokpiti (Audi Virtual Cockpit) ve 7 ileri çift kavramalı S-Tronic şanzımanı ile hem zarif hem de yüksek performanslı bir sürüş karakteri.",
    features: [
      "Audi Sanal Kokpit Plus (12.3 inç)",
      "MMI Dokunmatik Bilgi-Eğlence Sistemi",
      "LED Matrix Farlar & Dinamik Sinyaller",
      "Audi Pre Sense Front Güvenlik Sistemi",
      "Geri Görüş Kamerası ve Ön/Arka Sensörler",
      "Kablosuz Telefon Şarj Ünitesi"
    ]
  }
];

// Yardımcı Fonksiyonlar

/**
 * Tüm araçları döndürür
 */
function getAllCars() {
  return CARS_DATA;
}

/**
 * ID'ye göre tek bir araç nesnesi döndürür
 */
function getCarById(id) {
  const numericId = parseInt(id, 10);
  return CARS_DATA.find(car => car.id === numericId) || null;
}

/**
 * Fiyatı Türk Lirası formatında biçimlendirir (Ör: ₺1.450)
 */
function formatPrice(amount) {
  if (isNaN(amount)) return "₺0";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Haftalık toplam indirimli fiyatı hesaplar
 */
function getWeeklyPrice(dailyPrice, discountPercent) {
  const gross = dailyPrice * 7;
  const discounted = gross * (1 - (discountPercent / 100));
  return Math.round(discounted);
}

/**
 * Gün sayısına göre toplam kiralama bedeli hesaplar (7+ gün için haftalık indirim oranı uygulanır)
 */
function calculateRentalPrice(dailyPrice, days, discountPercent = 15) {
  if (days <= 0) return 0;
  if (days >= 7) {
    const rate = dailyPrice * (1 - (discountPercent / 100));
    return Math.round(rate * days);
  }
  return dailyPrice * days;
}
