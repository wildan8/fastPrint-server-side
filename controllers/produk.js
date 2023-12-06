import kategori from "../models/kategori.js";
import status from "../models/status.js";
import Auth from "../auth.js";
import produk from "../models/produk.js";

export const getFromAPI = async (req, res) => {
  try {
    const { data } = await Auth();

    await handleCategories(data);
    await handleStatuses(data);

    const dataProduk = await Promise.all(data.map(processProduct));
   

    await saveToProdukTable(dataProduk);
    res.status(200).json({
      message: `data API berhasil disimpan`,
    });
  } catch (error) {
    console.error("Error get data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getProduk = async (req, res) => {
  try {
    let { nama_status } = req.query;
    let dbProduk;
    if (nama_status) {
      dbProduk = await produk.findAll({
        include: [
          {
            model: status,
            as: "status",
            where: { nama_status },
          },
        ],
      });
    } else {
      dbProduk = await produk.findAll();
      nama_status = "semua produk";
    }
    res.status(200).json({
      message: `data ${nama_status} sukses diambil`,
      dataProduk: dbProduk,
    });
  } catch (error) {
    console.error("gagal mengambil data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addProduk = async (req, res) => {
  try {
    const { nama_produk, harga, kategori_id, status_id } = req.body;
    if (!nama_produk) {
      return res.status(400).json({ error: "Nama Produk wajib diisi" });
    }
    if (!Number.isInteger(harga)) {
      return res.status(400).json({ error: "Harga harus berupa angka" });
    }
    const newDataProduk = {
      nama_produk: nama_produk,
      harga: harga,
      kategori_id: kategori_id,
      status_id: status_id,
    };
    produk.create(newDataProduk);
    res.status(201).json({
      message: "data produk berhasil di simpan",
      dataProduk: newDataProduk,
    });
  } catch (error) {
    console.error("gagal menyimpan data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProdukById = async (req, res) => {
  try {
    const { id } = req.params;
    const dbProduk = await produk.findAll({ where: { id } });
    res
      .status(200)
      .json({ message: "data Produk Berhasil diambil", dataProduk: dbProduk });
  } catch (error) {
    console.error("gagal mengambil data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateProduk = async (req, res) => {
  try {
    const id = req.params;
    const formData = req.body;
    // console.log(nama_produk, harga, kategori_id, status_id)
    if (!formData.nama_produk) {
      return res.status(400).json({ error: "Nama Produk wajib diisi" });
    }
    if (!Number.isInteger(formData.harga)) {
      return res.status(400).json({ error: "Harga harus berupa angka" });
    }
    const formatedProduk = {
      nama_produk: formData.nama_produk,
      harga: formData.harga,
      kategori_id: formData.kategori_id,
      status_id: formData.status_id,
    };

    const updatedProduk = await produk.update(formatedProduk, { where: id });
    if (!updatedProduk) {
      throw new Error("Gagal Update Data");
    } else {
      res
        .status(200)
        .json({ message: "Berhasil update data", dataProduk: updatedProduk });
    }
  } catch (error) {
    console.error("Gagal update data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduk = async (req, res) => {
  try {
    const id = req.params;
    const deletedProduk = await produk.destroy({ where: id });
    if (!deletedProduk) {
      throw new Error("Gagal Delete Data");
    } else {
      res
        .status(200)
        .json({ message: "berhasil hapus data", dataProduk: deletedProduk });
    }
  } catch (error) {
    console.error("Gagal menghapus data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// function
const handleCategories = async (data) => {
  const uniqueKategori = [...new Set(data.map((item) => item.kategori))];
  await Promise.all(
    uniqueKategori.map((nama_kategori) =>
      kategori.findOrCreate({ where: { nama_kategori } })
    )
  );
};

const handleStatuses = async (data) => {
  const uniqueStatus = [...new Set(data.map((item) => item.status))];
  await Promise.all(
    uniqueStatus.map((nama_status) =>
      status.findOrCreate({ where: { nama_status } })
    )
  );
};

const processProduct = async (item) => {
  try {
    const [findKategori] = await kategori.findOrCreate({
      where: { nama_kategori: item.kategori },
    });
    const [findStatus] = await status.findOrCreate({
      where: { nama_status: item.status },
    });

    return {
      id: item.id_produk,
      nama_produk: item.nama_produk,
      harga: item.harga,
      kategori_id: findKategori.id,
      status_id: findStatus.id,
    };
  } catch (error) {
    console.error("Error finding or creating kategori/status:", error.message);
  }
};

const saveToProdukTable = async (dataProduk) => {
  for (const item of dataProduk) {
    const existingProduk = await produk.findOne({ where: { id: item.id } });
    if (!existingProduk) {
      await produk.create(item);
    }
  }
};
