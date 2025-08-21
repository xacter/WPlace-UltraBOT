<p align="center">
  Çeviriler ➜&nbsp;
  <a href="../README.md"><img src="https://flagcdn.com/256x192/us.png" width="48" alt="United States Flag"></a>
  <a href="DE.md"><img src="https://flagcdn.com/256x192/de.png" width="48" alt="Germany Flag"></a>
  <a href="ES.md"><img src="https://flagcdn.com/256x192/es.png" width="48" alt="Spain Flag"></a>
  <a href="FR.md"><img src="https://flagcdn.com/256x192/fr.png" width="48" alt="France Flag"></a>
  <a href="RU.md"><img src="https://flagcdn.com/256x192/ru.png" width="48" alt="Russia Flag"></a>
  <a href="JA.md"><img src="https://flagcdn.com/256x192/jp.png" width="48" alt="Japan Flag"></a>
  <a href="CN.md"><img src="https://flagcdn.com/256x192/cn.png" width="48" alt="China Flag"></a>
</p>

---

> [!NOTE]
> **Merhaba, yeni önlemler geldikten sonra bu botu geliştirmeye karar verdim ve yalnızca bir günde tamamlandı. Bu önlemler nedeniyle şu an için tamamen otomatik bir bot yapmak mümkün görünmüyor. ~~Ancak mevcut bir açıktan yararlanarak tek bir doğrulama ile bir saniyede 12 hesaptan çizim yapabiliyoruz. Hesapların dolu olduğunu varsayarsak, 12 * 62 = <strong>744</strong> piksel/saniye gönderebiliyoruz.~~ Güncellemeden sonra bu açık kapatıldı; bu yüzden her hesap gönderimi için yeniden bir token almanız gerekecek. Hazırsanız, kullanım adımlarını aşağıda anlattım.**

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

- Gereksinimler:
  - Node.js >= 18.18.0

- Adımlar:
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

![Bölüm 2](https://i.imgur.com/taF0I2T.png)

Yeni bir sekme açıp `chrome://extensions/` sayfasına gidin.<br>
Geliştirici modunu etkinleştirin.<br>

![](https://i.imgur.com/oe42A42.png)

"Load unpacked"e tıklayın.<br>

![](https://i.imgur.com/jPyzOr3.png)

`WPlace-Helper` klasörünü seçin.<br>

---

![Bölüm 3](https://i.imgur.com/YVyvw3a.png)

`wplace.live` sayfasına gidin.<br>
`F12` tuşuna basın.<br>
Açılan pencerede üstten 'Application' sekmesini seçin (bulamazsanız sarı ile gösterdiğim alana tıklayıp seçin).<br>
`cf_clearance` değerine tıklayın ve aşağıdan değerini kopyalayın.<br>

---

![Bölüm 4](https://i.imgur.com/sJvyiC6.png)

Bota geri dönün.<br>
"Accounts" butonuna, ardından "Settings" butonuna tıklayın. Kopyaladığınız `cf_clearance` değerini ilgili alana yapıştırıp kaydedin.<br>

---

![Bölüm 5](https://i.imgur.com/vJkPMx8.png)

`wplace.live`'a gidin ve üstteki uzantıya tıkladığınızda bu şekilde görünmelidir.<br>
"pixel token" bölümünün etkin olduğundan emin olduktan sonra, haritada normal şekilde bir piksel boyamayı deneyin.<br>

![Bölüm 5 - Hata](https://i.imgur.com/uZmJDad.png)

Ekranda bu hatayı alırsanız doğru yoldasınız demektir. Uzantıya tekrar tıklayın; boyamayı denediğiniz yer için "World X" ve "World Y" bilgileri görünecektir. Bunları kopyalayın.<br>

---

![Bölüm 6](https://i.imgur.com/LniE1E8.png)

"World X" ve "World Y" koordinatlarını girip 'fetch' butonuna tıkladığınızda görseldeki gibi bir harita görünmelidir.<br>

---

![Bölüm 7](https://i.imgur.com/vJkPMx8.png)

Önceki sayfaya dönün, uzantıya tıklayın ve "Account Token" kısmını kopyalayın.<br>

---

![Bölüm 8](https://i.imgur.com/8sjhH1L.png)

![Bölüm 8](https://i.imgur.com/jf6W8NV.png)

Ardından Hesaplar bölümüne yönlendirileceksiniz. "Add Account" butonuna tıklayın. Açılan sayfada:
- Hesap adı için istediğiniz bir isim girebilirsiniz.
- "Account Token" alanına önceki adımda kopyaladığınız değeri yapıştırın.
- "Add" butonuna tıklayın.<br>

---

![Bölüm 9](https://i.imgur.com/DJUEywj.png)

İstediğiniz kadar hesap ekledikten sonra, sağ üstte tüm hesaplarınız için toplam piksel ve kullanılabilir piksel sayısını görebilirsiniz.<br>
Yüklediğiniz görsel, sitede mevcut olan ücretsiz renk paletlerine otomatik olarak dönüştürülür ve bu şekilde yüklenir. Bu sistem ileride daha da geliştirilecektir.<br>

"Upload Image" butonunu kullanarak bir görsel yüklediğinizde:<br>
- Görselin sol üstünde, görsel için gereken piksel sayısı görüntülenir.<br>
- Görselin sağ üstünde bir kilit butonu vardır. Kilitlediğinizde görseli hareket ettiremezsiniz. 'X' butonuna tıklamak görseli siler.<br>
- Yüklediğiniz tüm görselleri soldaki çubukta görebilirsiniz. Sayfada bir görseli bulamazsanız çubuktan üzerine tıklamanız yeterlidir; sizi doğrudan o görsele götürür.<br>

---

![Bölüm 10](https://i.imgur.com/Dzt1p3o.png)

"Ready" butonuna tıklayın. Açılan pencerede aktif hesaplarınızı seçmek için "Select Account" butonuna tıklayın. İşiniz bittiğinde pencereyi kapatmak için tekrar "Select Account" butonuna tıklayın.<br>

---

![Bölüm 11](https://i.imgur.com/QKJRVL9.png)

Görsele yaklaştığınızda, doldurduğunuz her şeffaf piksel yüklediğiniz görselde karşılık gelen renkle boyanacaktır ve yalnızca görselin sınırları içinde piksel yerleştirebilirsiniz. Belirli bir rengi seçerseniz, maksimum piksel kapasiteniz kadar istediğiniz her yeri boyayabilirsiniz.<br>

---

![Bölüm 12](https://i.imgur.com/vJkPMx8.png)

WPlace sayfasına geri dönün ve önceki token artık geçersiz olduğu için yeni bir piksel göndermeyi deneyin; yeni "pixel token" değerini kopyalayın.<br>

---

![Bölüm 13](https://i.imgur.com/wDp07pH.png)

Sayfamıza dönün, değeri 'token' alanına yapıştırın ve 'Start' butonuna tıklayın.<br>

---

![Bölüm 14](https://i.imgur.com/iQTH5TR.png)

Her şeyi doğru yaptıysanız bu şekilde bir bildirim almanız ve haritada değişikliklerin uygulanmış olması gerekir. Hepsi bu kadar; bu adımları tekrarlayarak istediğiniz görseli oluşturabilirsiniz.<br>

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
  <img src="https://i.imgur.com/msR5dM9.png" alt="Ana Sayfa"/>
</p>

---

### 📋┃Yapılacaklar

- [x] Çeviriler [TR/USA]  
- [ ] Script hatalarının düzeltilmesi  
- [x] Rehberler

---

<p align="center">
  <a href="#"><img src="https://komarev.com/ghpvc/?username=xacter&repo=WPlace-UltraBOT&style=for-the-badge&label=Views:&color=gray"/></a>
</p>

