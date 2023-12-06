import express from "express";
const router = express.Router();

import { getFromAPI } from "../controllers/produk.js";
import kategoriRoute from './kategoriRoute.js'
import produkRoute from './produkRoute.js'
import statusRoute from './statusRoute.js'

router.get('/', getFromAPI);
router.use('/produk', produkRoute)
router.use('/kategori', kategoriRoute)
router.use('/status', statusRoute)

export default router;
