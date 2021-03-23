import { Router } from 'express';

import schoolsRoutes from './schools.routes';

const router = Router();

router.use(schoolsRoutes);

export default router;
