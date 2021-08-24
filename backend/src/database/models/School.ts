import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Classroom from './Classroom';
import Person from './Person';
import User from './User';
import Subject from './Subject';

@Entity('schools')
class School {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  name!: string;

  @Column('uuid')
  user_id!: string;

  @OneToOne(() => User, (user) => user.school)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => Person, (person) => person.school)
  persons!: Promise<Person[]>;

  @OneToMany(() => Classroom, (classroom) => classroom.school)
  classrooms!: Promise<Classroom[]>;

  @OneToMany(() => Subject, (subject) => subject.school)
  subjects!: Promise<Subject[]>;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default School;
