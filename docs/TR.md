<p align="center">
  Çeviriler ➜&nbsp;
  <a href="../README.md"><img src="https://flagcdn.com/256x192/us.png" width="48" alt="United States Flag"></a>
</p>

---

> [!NOTE]
> **Merhaba, yeni önlemler geldikten sonra bu botu geliştirmeye karar verdim ve yalnızca bir günde tamamlandı. Bu önlemler nedeniyle şu an için tamamen otomatik bir bot yapmak mümkün görünmüyor. Ancak mevcut bir açıktan yararlanarak tek bir doğrulama ile bir saniyede 12 hesaptan çizim yapabiliyoruz. Hesapların dolu olduğunu varsayarsak, 12 * 62 = <strong>744</strong> piksel/saniye gönderebiliyoruz. Hazırsanız, kullanım adımlarını aşağıda anlattım.**

---

<p align="center"><strong>WPlace UltraBOT</strong></p>

<p align="center">
  Birden fazla hesabınızla <a href="https://wplace.live" target="_blank">WPlace</a>'e istediğiniz pikselleri ekleyebilirsiniz.
</p>

---

<p align="center"><strong>🚀┃ Bot nasıl kurulur:</strong></p>

<p align="center">
  Botun kurulumu kolay, ustalaşması zordur. Şaka bir yana, ilk başta kullanımı zor görünebilir; fakat getirilen son önlemler nedeniyle bu şekilde çalışan başka bir bot yok. Bu nedenle harcadığınız emeğe değecektir.
</p>

<br>

### 🔧┃Kurulum (TR)

- **Gereksinimler**:
  - Node.js >= 18.18.0

- **Adımlar**:
  1. Bağımlılıkları yükleyin:
     
     ```bash
     npm install
     ```
  2. Uygulamayı başlatın:
     
     ```bash
     npm start
     ```
  3. Tarayıcıda `http://localhost:3000` adresini açın.

<details open>
  <summary><h2>📖┃Rehber</h2></summary>

---

![Bölüm 1](https://i.imgur.com/yS9093x.png)

`localhost:3000` adresine gittiğinizde bu şekilde bir sayfa görmelisiniz.<br>

---

![Bölüm 2](https://i.imgur.com/r02ndS6.png)

WPlace üzerinde çizim yapmak istediğiniz alanı açın.<br>
1 piksel yerleştirin.<br>
'F12' tuşuna basın.<br>
'Network' sekmesine gidip filtreye 'png' yazın.<br>
'F5' tuşuna basın (yenile).<br>
Resimdeki gibi png dosyalarını görmelisiniz, birine tıklayın.<br>

https://backend.wplace.live/files/s0/tiles/1188/767.png<br>

Bu bağlantıya ulaştık. Burada '1188' Dünya X değerini, '767' ise Dünya Y değerini temsil eder.<br>

---

![Bölüm 3](https://i.imgur.com/LniE1E8.png)

Dünya X ve Dünya Y koordinatlarını girip 'fetch' butonuna tıkladığınızda, görseldeki gibi bir harita görünmelidir.

---

![Bölüm 4](https://i.imgur.com/FlXoyc7.png)

Önceki sayfaya dönün ve arama çubuğuna 'me' yazın. Çıkan sonuca tıklayın. Açılan sayfada aşağı inip 'cf_clearance' değerini kopyalayın. Benzer şekilde 'j' yazan kısımdaki değeri de kopyalayın ve ikisini bir yerde saklayın.

---
![Bölüm 5](https://i.imgur.com/IvNN9EZ.png)

"Accounts" butonuna tıklayın, ardından "Settings" butonuna tıklayın. Kopyaladığınız değeri 'cf_clearance' alanına yapıştırın ve kaydedin.

---
![Bölüm 6](https://i.imgur.com/8sjhH1L.png)

![Bölüm 6](https://i.imgur.com/jf6W8NV.png)

Ardından, Hesaplar bölümüne yönlendirileceksiniz. "Add Account" butonuna tıklayın. Yukarıdaki sayfa açılacaktır.

Hesap adı kısmına istediğiniz bir isim girebilirsiniz. Alttaki "Account Token" alanına ise bir önceki adımda kopyaladığınız değeri yapıştırın. Son olarak "Add" butonuna tıklayın.

---
![Bölüm 8](https://i.imgur.com/DJUEywj.png)

İstediğiniz kadar hesap ekledikten sonra, sağ üstte tüm hesaplarınız için toplam piksel ve kullanılabilir piksel sayısını görebilirsiniz.

Yüklediğiniz görsel, sitede mevcut olan ücretsiz renk paletlerine otomatik olarak dönüştürülür ve bu şekilde yüklenir. Bu sistem ileride daha da geliştirilecektir.

"Upload Image" butonunu kullanarak bir görsel yüklediğinizde:

- Görselin sol üstünde, görsel için gereken piksel sayısı görüntülenir.
- Görselin sağ üstünde bir kilit butonu vardır. Kilitlediğinizde görseli hareket ettiremezsiniz. 'X' butonuna tıklamak görseli siler.
- Yüklediğiniz tüm görselleri soldaki çubukta görebilirsiniz. Sayfada bir görseli bulamazsanız, çubuktan üzerine tıklamanız yeterlidir; sizi doğrudan o görsele götürür.

---
![Bölüm 9](https://i.imgur.com/Dzt1p3o.png)

"Ready" butonuna tıklayın. Açılan pencerede aktif hesaplarınızı seçmek için "Select Account" butonuna tıklayın. İşiniz bittiğinde pencereyi kapatmak için tekrar "Select Account" butonuna tıklayın.

---
![Bölüm 10](https://i.imgur.com/QKJRVL9.png)

Görsele yaklaştığınızda, doldurduğunuz her şeffaf piksel, yüklediğiniz görselde karşılık gelen renkle boyanacaktır ve yalnızca görselin sınırları içinde piksel yerleştirebilirsiniz. Belirli bir renk seçerseniz, maksimum piksel kapasiteniz kadar istediğiniz her yeri boyayabilirsiniz.

---
![Bölüm 11](https://i.imgur.com/s3hIJFD.png)

WPlace sayfasına geri dönün ve arama çubuğuna Dünya Y değerini girin. Bir piksel doldurun, ardından sağda işaretlediğim alanı bulun; sağ tıklayıp "Block request URL" seçeneğini seçin.

---

![Bölüm 12](https://i.imgur.com/ZICIlpJ.png)

Sonra aynı noktada tekrar piksel doldurmayı deneyin. Bu kez hata vermelidir. Hata veren isteğe tıklayın, ardından 'Payload' sekmesine geçin. 'view source' (kaynağı görüntüle) derseniz benimkine benzer görünecektir. Sonrasında 't' değerini tamamen kopyalayın.

---

![Bölüm 13](https://i.imgur.com/wDp07pH.png)

Ardından, bizim sayfaya dönün, değeri 'token' alanına yapıştırın ve 'Start' butonuna tıklayın.

---

![Bölüm 14](https://i.imgur.com/iQTH5TR.png)

Her şeyi doğru yaptıysanız bu şekilde bir bildirim almanız ve haritada değişikliklerin uygulanmış olması gerekir. Hepsi bu kadar; bu adımları tekrarlayarak istediğiniz görseli oluşturabilirsiniz.

</details>

<br>

> [!IMPORTANT]
> <p><sub><strong>1.</strong> Hesaplar bölümünde 'Check Pixel' butonuna tıklarsanız, o hesap için kalan pikselleri manuel olarak kontrol edebilirsiniz. Normalde bu kontrol her 90 saniyede bir otomatik yapılır.</sub></p>
> <p><sub><strong>2.</strong> Hesap tokenları yaklaşık 4-5 saat geçerlidir. Otomatik hesap kontrolü sırasında bir token süresi dolmuşsa, hesap pasif hâle gelir. Düzenle bölümüne yeni tokenı girip 'Check Pixel' diyerek yeniden aktifleştirebilirsiniz.</sub></p>
> <p><sub><strong>3.</strong> Gönderim tokenı panelde göründüğünde hızlı olmanız gerekir. Çok yavaş kalırsanız token süresi dolar ve 403 yenileme hatası alırsınız.</sub></p>

<br>


Tüm proje 1 günde hazırlandığı için gördüğünüz eksiklikleri veya isteğiniz özellikleri bildirmeyi unutmayın.



---

<p align="center">
  <img src="https://i.imgur.com/msR5dM9.png" alt="AnaSayfa"/>
 </p>

---

### 📋┃Yapılacaklar

- [x] Çeviriler [TR/USA]
- [ ] Script hatalarının düzeltilmesi
- [x] Rehberler

---


