# CEN227 Internet Programming Midterm Project - Oto Kiralama Web Uygulaması

Bu proje, **CEN227 İnternet Programcılığı** dersi vize ödevi gereksinimlerine ve proje akışına %100 uyumlu olarak hazırlanmış, birbirine bağlı 4 sayfadan oluşan modern ve duyarlı (responsive) bir **Araç Kiralama (Rent a Car)** web sitesidir.

---

## 📌 Proje Yapısı ve PDF Uyumluluğu

Ödev kılavuzunda belirtilen 4 sayfalık yapı ve sayfa akışı şu şekildedir:

| Sıra | Ödev Sayfa Tipi | Dosya Adı | Açıklama ve Özellikler |
| :---: | :--- | :--- | :--- |
| **1** | **Liste Sayfası** *(2. Sütun)* | [`index.html`](index.html) | **Araç Filosu:** Tüm araçları dinamik kartlar halinde listeler. Marka/model arama, vites ve segment kategori filtreleri (Ekonomi, SUV, Lüks vb.), fiyata ve puana göre sıralama imkanı sunar. |
| **2** | **Detay Sayfası** *(3. Sütun)* | [`detail.html`](detail.html) | **Araç Detayı:** Listeden seçilen aracın URL parametresi (`?id=X`) ile tüm teknik özelliklerini (motor, şanzıman, yakıt tüketimi, bagaj, depozito), donanımlarını ve kiralama koşullarını gösterir. Dahili interaktif gün hesaplayıcısı bulunur. |
| **3** | **Form Sayfası** *(4. Sütun)* | [`booking.html`](booking.html) | **Kiralama Formu:** Seçilen aracı önceden seçili getirir. Kullanıcıdan alış/teslim lokasyonu, tarih, T.C. Kimlik, ad soyad, doğum tarihi (yaş şartı kontrolü), ehliyet yılı alır. Canlı JavaScript form doğrulaması, anlık dinamik fiyat hesaplaması ve rezervasyon onay fişi modalı sunar. |
| **4** | **Tablo Sayfası** *(5. Sütun)* | [`pricing.html`](pricing.html) | **Fiyat Tablosu & Çizelgesi:** Tüm filonun günlük, haftalık (indirimli) ve aylık tahmini fiyatlarını, depozitolarını ve sürücü koşullarını sıralanabilir ve filtrelenebilir bir tabloda sunar. Ayrıca araç segmentleri ortalama fiyat karşılaştırma grafiği (çizelge) içerir. |

---

## 🔄 Sayfalar Arası Veri Akışı (Data Flow)

Ödevde istenen **"Kullanıcı listede bir öğe seçer, detay sayfasında bilgilerini inceler, formu doldurarak işlem yapar, tablo sayfasında verileri toplu görür"** akışı eksiksiz uygulanmıştır:

1. **`index.html` → `detail.html?id=3`**: 
   - Kullanıcı filoda beğendiği aracın *"Detayları İncele"* butonuna tıkladığında URL parametresi ile araç ID'si detay sayfasına taşınır.
2. **`detail.html` → `booking.html?id=3&days=5`**: 
   - Kullanıcı detay sayfasındaki süreyi seçip *"Bu Aracı Rezerve Et"* butonuna tıkladığında hem araç ID'si hem de gün sayısı kiralama formuna taşınır ve formda otomatik seçilir.
3. **`booking.html` Rezervasyon Onayı ve LocalStorage**:
   - Form başarıyla doğrulandığında rezervasyon referans kodu (`REZ-2026-XXXX`) üretilir, tarayıcının `localStorage` alanına kaydedilir ve ekranda yazdırılabilir fiş modalı açılır.
4. **`pricing.html`**:
   - Tablo üzerinden herhangi bir araç için doğrudan *"Detay"* veya *"Kirala"* butonları ile ilgili sayfalara geçiş yapılabilir.

---

## 🛡️ JavaScript ile Form Doğrulama (Form Validation)

`booking.js` dosyasında aşağıdaki kapsamlı doğrulamalar uygulanmıştır:
- **Ad Soyad:** En az iki kelime ve minimum 5 karakter kontrolü.
- **T.C. Kimlik Numarası:** 11 haneli sayısal kontrol ve biçim doğrulaması.
- **E-posta Adresi:** Standart e-posta regex (`^[^\s@]+@[^\s@]+\.[^\s@]+$`) kontrolü.
- **Telefon Numarası:** Türkiye cep telefonu numarası biçim kontrolü.
- **Sürücü Yaşı ve Ehliyet Yılı Şartı:** Müşterinin doğum tarihinden yaşı hesaplanır. Seçilen aracın (özellikle SUV veya Lüks segment) minimum yaş şartını (örneğin BMW için 26 yaş) karşılamıyorsa kullanıcıya özel hata mesajı verilir.
- **Tarih Mantığı:** Alış tarihi geçmiş tarih olamaz. Teslim tarihi alış tarihinden sonraki bir tarih olmalıdır.
- **Canlı Geri Bildirim:** Hatalı alanlar kırmızı çerçeve ve açıklayıcı hata mesajı ile işaretlenir; düzeltildiğinde yeşil çerçeveye döner.

---

## 💰 Dinamik Fiyat ve Süre Hesaplayıcısı

- **7 Gün ve Üzeri Kiralamalar:** Araç modeline göre tanımlanmış %15 ile %22 arasındaki **haftalık süre indirimi** otomatik uygulanır ve yeşil indirim etiketiyle gösterilir.
- **Ekstra Hizmetler:** Bebek koltuğu (+₺150/gün), ek sürücü (+₺200/gün), tam kasko (+₺350/gün) ve HGS geçiş paketi (+₺100) seçimlerine göre sağ taraftaki yapışkan (sticky) özet kartında toplam tutar anlık olarak güncellenir.

---

## 📂 Dosya ve Dizin Yapısı

```text
cen227-araba-kiralama/
│
├── index.html            # 1. Sayfa: Araç Filosu (Liste Sayfası)
├── detail.html           # 2. Sayfa: Araç Detayı (Detay Sayfası)
├── booking.html          # 3. Sayfa: Kiralama Formu (Form Sayfası)
├── pricing.html          # 4. Sayfa: Fiyat Tablosu ve Çizelgesi (Tablo Sayfası)
│
├── css/
│   └── style.css         # Modern, responsive CSS stilleri ve renk değişkenleri
│
├── js/
│   ├── cars-data.js      # 10 farklı aracın veri havuzu ve hesaplama fonksiyonları
│   ├── main.js           # Mobil menü, navigasyon vurgulama ve toast bildirimleri
│   ├── fleet.js          # Liste sayfası arama, filtreleme ve dinamik kart render
│   ├── detail.js         # Detay sayfası URL parametresi okuma ve süre hesaplama
│   ├── booking.js        # Form doğrulama, dinamik fiyatlama ve rezervasyon modalı
│   └── pricing.js        # Fiyat tablosu, sütun sıralama ve karşılaştırma çizelgesi
│
└── README.md             # Proje açıklama ve GitHub teslim dokümantasyonu
```

---

## 🚀 Projeyi Çalıştırma

Bu proje herhangi bir harici kütüphane veya paket yüklemesi (npm/node) gerektirmez:
1. `index.html` dosyasına çift tıklayarak doğrudan Google Chrome, Edge, Safari veya Firefox tarayıcınızda açabilirsiniz.
2. Dilerseniz VS Code üzerinde **Live Server** eklentisi ile `index.html` üzerinde sağ tıklayıp *"Open with Live Server"* seçeneğini kullanabilirsiniz.

---

## 📤 GitHub Repository'sine Yükleme ve Teslim Adımları

Projeyi GitHub'a yüklemek için terminalde (veya PowerShell'de) proje klasörü içinde sırasıyla şu komutları çalıştırabilirsiniz:

```bash
# 1. Git deposu başlatın
git init

# 2. Tüm dosyaları ekleyin
git add .

# 3. İlk commit'inizi yapın
git commit -m "CEN227 Midterm Project: Araba Kiralama Web Sitesi"

# 4. GitHub'da oluşturduğunuz boş repo adresini bağlayın (kendi linkinizi yazın)
git remote add origin https://github.com/KULLANICI_ADINIZ/cen227-car-rental.git

# 5. Ana dala gönderin
git branch -M main
git push -u origin main
```
