import express from "express";
import { addProduk, deleteProduk,  getProduk, getProdukById, updateProduk } from "../controllers/produk.js";
const router = express.Router();

router.get('/', getProduk);
router.get('/:id', getProdukById);
router.post('/', addProduk);
router.put('/:id', updateProduk);
router.delete('/:id', deleteProduk);

export default router;