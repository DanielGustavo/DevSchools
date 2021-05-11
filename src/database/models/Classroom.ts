import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Person from './Person';
import School from './School';

@Entity('classrooms')
class Classroom {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title!: string;

  @Column('uuid')
  school_id!: string;

  @ManyToOne(() => School, (school) => school.classrooms)
  @JoinColumn({ name: 'school_id' })
  school!: School;

  @ManyToMany(() => Person, (person) => person.classrooms)
  persons!: Person[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default Classroom;
