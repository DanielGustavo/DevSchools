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

  @Column('varchar')
  email!: string;

  @Column('varchar')
  password!: string;

  @Column('boolean')
  is_a_school!: boolean;

  @Column('varchar', { default: null })
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
