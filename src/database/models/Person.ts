import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import School from './School';
import User from './User';
import Classroom from './Classroom';

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

  @ManyToMany(() => Classroom, (classroom) => classroom.persons)
  @JoinTable({
    name: 'persons_classrooms',
    joinColumn: { name: 'person_id' },
    inverseJoinColumn: { name: 'classroom_id' },
  })
  classrooms!: Classroom[];
}

export default Person;
