import { Router } from 'express';

import schoolsRoutes from './schools.routes';
import personsRoutes from './persons.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use(schoolsRoutes);
router.use(personsRoutes);
router.use(authRoutes);

export default router;
