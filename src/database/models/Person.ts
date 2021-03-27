import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import School from './School';
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

  @ManyToOne(() => School, (school) => school.persons)
  @JoinColumn({ name: 'school_id' })
  school!: School;
}

export default Person;
