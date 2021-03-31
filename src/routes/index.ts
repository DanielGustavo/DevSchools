import { Router } from 'express';

import schoolsRoutes from './schools.routes';
import personsRoutes from './persons.routes';
import authRoutes from './auth.routes';
import classroomsRoutes from './classrooms.routes';

const router = Router();

router.use(schoolsRoutes);
router.use(personsRoutes);
router.use(authRoutes);
router.use(classroomsRoutes);

export default router;
