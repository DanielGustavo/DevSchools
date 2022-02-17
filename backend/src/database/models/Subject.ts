import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

import School from './School';
import Classroom from './Classroom';
import Person from './Person';

@Entity('subjects')
class Subject {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title!: string;

  @Column('uuid')
  school_id!: string;

  @ManyToOne(() => School, (school) => school.subjects)
  @JoinColumn({ name: 'school_id' })
  school!: School;

  @ManyToMany(() => Classroom, (classroom) => classroom.subjects)
  classrooms!: Classroom[];

  @ManyToMany(() => Person, (person) => person.subjects)
  persons!: Person[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default Subject;
