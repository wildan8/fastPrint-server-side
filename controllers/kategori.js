import kategori from "../models/kategori.js";

export const getKategori = async (req, res) => {
  try {
    const dbKategori = await kategori.findAll();
    res.status(200).json({message: "data Kategori Berhasil diambil", dataKategori: dbKategori})
  } catch (error) {
    console.error("gagal mengambil data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
