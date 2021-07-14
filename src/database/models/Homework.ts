import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Classroom from './Classroom';
import Person from './Person';
import Question from './Question';
import Subject from './Subject';

@Entity('homeworks')
class Homework {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title!: string;

  @Column('varchar', { nullable: true })
  description!: string;

  @Column('timestamp')
  deadline!: Date;

  @Column('timestamp', { nullable: true })
  sent_at!: Date;

  @ManyToOne(() => Subject, (subject) => subject.homeworks)
  @JoinColumn({ name: 'subject_id' })
  subject!: Subject;

  @ManyToOne(() => Classroom, (classroom) => classroom.homeworks)
  @JoinColumn({ name: 'classroom_id' })
  classroom!: Classroom;

  @ManyToOne(() => Person, (person) => person.homeworks)
  @JoinColumn({ name: 'person_id' })
  person!: Person;

  @OneToMany(() => Question, (question) => question.homework)
  questions!: Question[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default Homework;
