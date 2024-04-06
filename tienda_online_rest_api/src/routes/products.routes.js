import { Router } from "express";
import { getProducts, getProduct, createProducts, updateProducts, deleteProducts } from '../controllers/products.controllers.js';

const router = Router()

router.get('/products', getProducts)

router.get('/products/:id', getProduct)

router.post('/products', createProducts)

router.patch('/products/:id', updateProducts)

router.delete('/products/:id', deleteProducts)

export default router