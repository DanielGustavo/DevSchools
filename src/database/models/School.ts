import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Classroom from './Classroom';
import Person from './Person';
import User from './User';

@Entity('schools')
class School {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @OneToOne(() => User, (user) => user.school)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToMany(() => Person, (person) => person.school)
  persons!: Promise<Person[]>;

  @OneToMany(() => Classroom, (classroom) => classroom.school)
  classrooms!: Promise<Classroom[]>;
}

export default School;
