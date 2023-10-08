
# Sales-Tracking Management

[![GitHub Lisans](https://img.shields.io/github/license/mustafademirel34/sales-tracking-management)](https://github.com/mustafademirel34/sales-tracking-management/blob/main/LICENSE)
![Angular Version](https://img.shields.io/badge/Angular-v16.1.0-red)
![C# Core Version](https://img.shields.io/badge/C%23%20Core-6.0.22-orange)
![GitHub Dil Sayısı](https://img.shields.io/github/languages/count/mustafademirel34/sales-tracking-management)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mustafademirel34-blue)](https://www.linkedin.com/in/mustafademirel34/)

###### Explanation
Bu proje, müşterilere belirli eşyaları satma ve müşteriye eşyanın teslim edilmesini takip etme amacı güden bir uygulamadır. Veritabanı olarak Mssql, Backend olarak api servis tercih edilmiştir.

<div class="image-container">
   <img src="https://r.resimlink.com/jAL7_6.png" alt="Resim 1" style="width: 48%; float: left; margin-right: 2%;">
   <img src="https://r.resimlink.com/J7kSgXoC.png" alt="Resim 2" style="width: 48%;">
</div>

## Kullanım Bilgileri


Ana sayfada aşağıdaki özelliklere erişebilirsiniz:

- Tüm kayıtları görüntüleme
- Yeni kayıt oluşturma
- "Araç" kısmında işaretlendiği üzere yola çıkacak eşyaların listesini çıktı olarak alma
- Genel veri çıktısını alma
- Ayarlar ve çıkış butonları

#### Takvim Sayfası
Bu sayfa, aylara göre dağılmış, kayıtların aylara göre görüntülenebileceği bir alandır.

#### Stok
Stok, deneysel bir özelliktir ve şu an için hazır değildir.

- Takvim girişi
- Müşterinin telefon numarasına göre kayıtları arama seçeneği
- Yarın Aktar seçeneği: Gün sonunda tamamlanmamış ve yerine getirilmemiş görevleri yarına aktarır
- Araç yerleşimleri: Hangi araca çıkarılacağını ve hangi araç tarafından teslim edileceğini gösterir

Ana pencerede üstteki başlık, o esnada hangi içeriğin mevcut olduğunu gösterir. Ayrıca, seçenekler bulunur:

- "Bugünün kayıtlarını göster" butonu
- Takvimde ileri ve geri gitme butonları
- Görevlerin tamamlanma durumuna göre filtreleme (tamamlanmış, tamamlanmamış veya tümü)
- Aynı anda görüntülenecek kayıt sayısını belirleyen sayı listesi

### Kayıtların Görüntülenmesi

Kayıtlar, filtre ve seçeneklere göre görüntülenir. Bir görev, ek bilgilere sahiptir ve bu ek bilgilere görevin ayrıntılarına tıklanarak erişilebilir. Bir kayıt veya göreve tıkladığınızda, detay bilgilerini içeren sayfaya erişirsiniz. Bu sayfada müşteri, satış ve müdahale bilgilerini görebilirsiniz.

## Detay Sayfası

Bir kayıt veya göreve tıkladığınızda, detay bilgilerini içeren sayfaya erişirsiniz. Yeni kayıt oluşturduğunuzda bu bilgiler boş ve doldurulabilir olacaktır.

### Müşteri Bilgileri

Sol kısımda müşteri hakkında bilgileri doldurup kayıt açtığınızda müşteri, telefon numarası üzere kayıt altına alınacaktır.

- **Müşteri Ara:** Bu buton ile girdiğiniz telefon numarasına ait müşteri olup olmadığını kontrol edebilirsiniz.

### Satış Bilgileri

Orta kısımda, Satış için eşya bilgileri yer alacaktır. Ürün, cins bilgilerinizi girdiğinizde bir fiyat belirlemek için (Fiyat(x)Adet)-İskonto bilgisinden yararlanabilirsiniz.

- **Birden Fazla Kayıt:** Birden fazla kayıt ekleyebilir veya silebilirsiniz.
- **Ödeme Bilgisi:** Ödemenin bir kısmını alabilir ve geri kalan ödeme bilgisini görev teslimi sırasında "ücret alınacaktır" bilgisi ile bırakabilirsiniz.

### Görev Bilgileri

Sağ kısımda, görevin tamamlanma bilgisi, Güncelleme, fiş bilgisi çıktısı alma, görevi silme ve erteleme bilgisi yer alacaktır. Buradaki butonlar üzerinde bulunan bilgiler olduğu gibi yerine gelmelidir.

- **Sadece "Tamamlandı" İşaretlendiğinde:** Kayıt üzerinde sonradan bir değişiklik yapılamaz, ancak silinebilir.

- **Yeni Kayıt:** Yeni kayıt sırasında sadece "Yeni Ekle" butonu bulunacaktır.


#### Arka Plan Bilgileri

- Kullanıcı adı ve şifre seçeneği mevcuttur (varsayılan olarak kapalıdır).
- Websitesi, API'ya ulaşamazsa 500 hata bilgisi gösterir.
- Sayfa bulunamazsa 404 hatası gösterir.



