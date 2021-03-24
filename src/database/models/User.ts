import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToOne,
} from 'typeorm';

import Person from './Person';
import School from './School';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  is_a_school!: boolean;

  @Column()
  avatar_filename!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToOne(() => School, (school) => school.user)
  school!: School;

  @OneToOne(() => Person, (person) => person.user)
  person!: Person;
}

export default User;
