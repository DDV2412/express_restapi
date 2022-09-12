const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Kel 2 - Ecommerce Web API",
    description: "Ecommerce Web API",
  },
  host: "localhost:5000",
  schemes: ["http"],
  basePath: "/api",
  definitions: {
    Category: {
      id: "68a65438-c45b-4614-ad3f-1f49744e91b8",
      name: "Computer and Laptop",
    },
    SubCategory: {
      id: "f6cfcfc1-1119-4aec-a382-11918096b551",
      catId: "68a65438-c45b-4614-ad3f-1f49744e91b8",
      name: "Laptop",
      category: {
        $ref: "#/definitions/Category",
      },
    },
    Product: {
      catId: "68a65438-c45b-4614-ad3f-1f49744e91b8",
      subCatId: "f6cfcfc1-1119-4aec-a382-11918096b551",
      name: 'ASUS A416FA-FHD323 i3-10110U 4GB SSD 256GB+ Housing Win11+OHS 14" FHD - Slate Grey',
      description: `Kondisi: Baru
Berat Satuan: 3,5 kg
Kategori: Laptop Consumer
Etalase: Asus Laptop
Selamat datang di Lapak Terminal Laptop

Kami menyediakan produk Laptop yang sangat cocok menemani aktivitas harian dan kebutuhan anda Kami hadirkan produk :

Laptop ASUS A416FA-FHD323
Dengan spesifikasi sebagai berikut :
- Procc intel Core i3-1005G1
- Memory 4GB DDR4
- SSD 256GB PCI-E
- VGA intel Graphic
- NoN DVD
- BLACKLIGHT KEYBOARD
- Wifi + BT 4.0 + HDMI + WebCam HD IR
- Audio jack, USB Type-C, USB Type-A, USB 3.1, USB 2.0, Card Reader Micro SD
- MS Office HOME STUDENT 2021
- Windows 11 Home 64bit Original
- Layar 14 inc FULL HD
- Free Backpack ASUS
- Garansi Resmi 2 tahun ASUS
- Color : SILVER, SLATE GREY

AYOooo SEGARA KLIK “BELI” dan miliki produk berkualitas ini Segera… Persediaan terbatas…
Belanja di TERMINAL LAPTOP mempunyai banyak kelebihan.
- Melayani dan Menerima eceran dan Grosir
- Fast respon,Pelayanan Cepat,Pengiriman Tepat
- Harga dan Product kami 100% BARU dan BERGARANSI
- selalu mengutamakan quality control sebelum pengiriman
- Dapatkan Harga KHUSUS untuk pengambilan qty Grosir
- Pengiriman 100% AMAN`,
      stock: 60,
      price: "5.215.000",
      weight: "3",
      variation: [
        {
          color: "Slate Grey",
        },
        {
          color: "Trans Silver",
        },
      ],
      category: {
        $ref: "#/definitions/Category",
      },
      subcategory: {
        $ref: "#/definitions/Category",
      },
    },
    AddCategory: {
      $id: "68a65438-c45b-4614-ad3f-1f49744e91b8",
      $name: "Computer and Laptop",
    },
    AddSubCategory: {
      $id: "f6cfcfc1-1119-4aec-a382-11918096b551",
      $catId: "68a65438-c45b-4614-ad3f-1f49744e91b8",
      $name: "Laptop",
    },
    AddProduct: {
      $catId: "68a65438-c45b-4614-ad3f-1f49744e91b8",
      $subCatId: "f6cfcfc1-1119-4aec-a382-11918096b551",
      $name:
        'ASUS A416FA-FHD323 i3-10110U 4GB SSD 256GB+ Housing Win11+OHS 14" FHD - Slate Grey',
      $description: `Kondisi: Baru
Berat Satuan: 3,5 kg
Kategori: Laptop Consumer
Etalase: Asus Laptop
Selamat datang di Lapak Terminal Laptop

Kami menyediakan produk Laptop yang sangat cocok menemani aktivitas harian dan kebutuhan anda Kami hadirkan produk :

Laptop ASUS A416FA-FHD323
Dengan spesifikasi sebagai berikut :
- Procc intel Core i3-1005G1
- Memory 4GB DDR4
- SSD 256GB PCI-E
- VGA intel Graphic
- NoN DVD
- BLACKLIGHT KEYBOARD
- Wifi + BT 4.0 + HDMI + WebCam HD IR
- Audio jack, USB Type-C, USB Type-A, USB 3.1, USB 2.0, Card Reader Micro SD
- MS Office HOME STUDENT 2021
- Windows 11 Home 64bit Original
- Layar 14 inc FULL HD
- Free Backpack ASUS
- Garansi Resmi 2 tahun ASUS
- Color : SILVER, SLATE GREY

AYOooo SEGARA KLIK “BELI” dan miliki produk berkualitas ini Segera… Persediaan terbatas…
Belanja di TERMINAL LAPTOP mempunyai banyak kelebihan.
- Melayani dan Menerima eceran dan Grosir
- Fast respon,Pelayanan Cepat,Pengiriman Tepat
- Harga dan Product kami 100% BARU dan BERGARANSI
- selalu mengutamakan quality control sebelum pengiriman
- Dapatkan Harga KHUSUS untuk pengambilan qty Grosir
- Pengiriman 100% AMAN`,
      $stock: 60,
      $price: "5.215.000",
      $weight: "3",
      $variation: [
        {
          color: "Slate Grey",
        },
        {
          color: "Trans Silver",
        },
      ],
    },
  },
};

const outputFile = "./docs/api-docs.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
