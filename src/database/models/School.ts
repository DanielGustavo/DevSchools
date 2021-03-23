import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}

export default School;
