# FastPrint Test
This is repository for fastprint API server-side

# Database Structure
- **Produk:** [id, nama_produk, harga, kategori_id, dan status_id].
- **kategori:** [id, nama_kategori] (relasi dengan produk)
- **status:** [id, nama_status] (relasi dengan produk)

#Struktur API

1. Produk
- GET `"/"` (get data external API, manipulate, and store to database )
- GET `"/produk?nama_status="` (get data from database based on query)
- GET `"/produk/:id"` (get data from database by ID)
- POST `"/produk"` (Storing new data)
- PUT `"/produk/:id"` (Edit data)
- DELETE `"/produk/:id"` (Delete data)

2. Kategori
- GET `"/kategori"` (get data from database)
3. Status
- GET `"/status"` (get data from database)

# How to Use This Repo

1. clone repository ini ke local.
2. arahkan ke projek direktori : `cd <your project directory>`
3. instal depedensi `npm install`
4. aktifkan mySQL anda dan buat nama database baru
5. pada file projek, atur `.env`, seperti:
    ```
    MYSQL_HOST ='127.0.0.1'
    MYSQL_USER ='root'
    MYSQL_PASSWORD =''
    MYSQL_DATABASE = <your database name>
    ``` 
**(nb: atur value dari variable diatas sesuai dengan konfigurasi mySQL anda)**

6. jalankan program dengan terminal `npm run dev`







