import express, { Router, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const router: Router = express.Router();
const prisma = new PrismaClient();

// Create a new product
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = await prisma.product.create({ data: req.body });
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// Read all products
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// Read a single product
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

// Update a product
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: req.body,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// Delete a product
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
export default router;