import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}

export default School;
