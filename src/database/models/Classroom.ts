import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Homework from './Homework';
import Person from './Person';
import School from './School';
import Subject from './Subject';

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

  @ManyToMany(() => Subject, (subject) => subject.classrooms)
  @JoinTable({
    name: 'classrooms_subjects',
    joinColumn: { name: 'classroom_id' },
    inverseJoinColumn: { name: 'subject_id' },
  })
  subjects!: Subject[];

  @OneToMany(() => Homework, (homework) => homework.classroom)
  homeworks!: Homework[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default Classroom;
