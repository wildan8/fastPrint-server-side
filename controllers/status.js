import status from "../models/status.js";

export const getStatus = async (req, res) => {
  try {
    const dbStatus = await status.findAll();
    res.status(200).json({message: "data Status Berhasil diambil", dataStatus: dbStatus})
  } catch (error) {
    console.error("gagal mengambil data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
