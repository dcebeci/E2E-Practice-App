# E2E Practice Shop (Playwright Learning Project)

This is a simple Angular application specifically designed and built for practicing End-to-End (E2E) testing with **Playwright**. It contains common UI patterns and flows that you will often encounter in real-world applications, making it an ideal sandbox for learning test automation.

## Features Included for Testing Practice

- **Login Flow**: Simulates an authentication process with artificial delay and loading states.
- **Product Dashboard**: A data table with sorting, searching (with debounce), and category filtering.
- **Modal Interactions**: Add new products and confirm deletions via modal dialogs.
- **Form Validation**: Client-side validation for the "Add Product" form.
- **Cart & Checkout**: Real-time state updates for adding items to a cart and a simulated checkout process.
- **Test IDs**: Almost all interactive elements are annotated with `data-testid` attributes (e.g., `data-testid="login-submit"`, `data-testid="add-to-cart-101"`) to make selecting elements easier and more robust.

All data is mocked and stored client-side (in memory), so you don't need to set up a real backend database.

## Installation & Running (English)

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000` (or the port specified by your terminal).
4. **Login Credentials:**
   - **Email:** `test@test.com`
   - **Password:** `123456`

---

# E2E Pratik Dükkanı (Playwright Öğrenme Projesi)

Bu proje, **Playwright** ile Uçtan Uca (E2E) test pratikleri yapmak amacıyla özel olarak tasarlanmış ve geliştirilmiş basit bir Angular uygulamasıdır. Gerçek dünya uygulamalarında sıklıkla karşılaşacağınız yaygın kullanıcı arayüzü (UI) kalıplarını ve akışlarını içerir; bu da onu test otomasyonu öğrenmek için ideal bir deneme alanı (sandbox) yapar.

## Test Pratiği İçin İçerdiği Özellikler

- **Giriş (Login) Akışı**: Yapay gecikme ve yükleme (loading) durumları ile bir kimlik doğrulama sürecini simüle eder.
- **Ürün Paneli (Dashboard)**: Sıralama, arama (debounce ile) ve kategori filtreleme özelliklerine sahip bir veri tablosu.
- **Modal Etkileşimleri**: Modal (açılır pencere) formlar aracılığıyla yeni ürün ekleme ve silme onayları.
- **Form Doğrulama (Validation)**: "Ürün Ekle" formu için zorunlu alanlar ve sayısal değer kontrolleri gibi istemci tarafı (client-side) doğrulama.
- **Sepet ve Ödeme (Checkout)**: Sepete ürün eklendiğinde anlık olarak güncellenen sepet sayacı ve simüle edilmiş bir ödeme sayfası.
- **Test ID'leri**: Tüm önemli ve etkileşimli HTML öğeleri, Playwright ile daha kolay ve hatasız seçilebilmesi için `data-testid` etiketleriyle donatılmıştır (örneğin: `data-testid="login-submit"`, `data-testid="add-to-cart-101"`).

Uygulamanın veritabanı bağlantısı yoktur; tüm veriler sahtedir (mock) ve sadece geçici olarak tarayıcı belleğinde (in-memory) tutulur. Gerçek bir backend kurmanıza gerek yoktur.

## Kurulum ve Çalıştırma (Türkçe)

1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```
2. **Uygulamayı başlatın:**
   ```bash
   npm start
   ```
3. Tarayıcınızı açın ve uygulamanın çalıştığı adrese gidin (genellikle `http://localhost:3000`).
4. **Giriş Bilgileri:**
   - **E-posta (Email):** `test@test.com`
   - **Şifre (Password):** `123456`
