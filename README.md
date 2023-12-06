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
- GET `"/produk/:id` (get data from database by ID)
- POST `"/produk` (Storing new data)
- PUT `"/produk` (Storing new data)





