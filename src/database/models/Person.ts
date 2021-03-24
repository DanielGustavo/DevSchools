import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from './User';

@Entity('persons')
class Person {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('enum')
  role!: String;

  @Column()
  name!: String;

  @OneToOne(() => User, (user) => user.person)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}

export default Person;
