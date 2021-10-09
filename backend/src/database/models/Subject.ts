import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import School from './School';
import Classroom from './Classroom';
import Person from './Person';
import Homework from './Homework';

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

  @OneToMany(() => Homework, (homework) => homework.subject)
  homeworks!: Homework[];

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
