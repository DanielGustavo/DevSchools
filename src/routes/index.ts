import { Router } from 'express';

import schoolsRoutes from './schools.routes';
import personsRoutes from './persons.routes';

const router = Router();

router.use(schoolsRoutes);
router.use(personsRoutes);

export default router;
