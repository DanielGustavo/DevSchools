import { Router } from 'express';

import schoolsRoutes from './schools.routes';
import personsRoutes from './persons.routes';
import authRoutes from './auth.routes';
import classroomsRoutes from './classrooms.routes';
import subjectsRoutes from './subjects.routes';
import teachersRoutes from './teachers.routes';
import studentsRoutes from './students.routes';
import homeworksRoutes from './homeworks.routes';

const router = Router();

router.use(schoolsRoutes);
router.use(personsRoutes);
router.use(authRoutes);
router.use(classroomsRoutes);
router.use(subjectsRoutes);
router.use(teachersRoutes);
router.use(studentsRoutes);
router.use(homeworksRoutes);

export default router;
