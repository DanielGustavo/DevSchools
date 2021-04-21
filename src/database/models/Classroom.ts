import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Person from './Person';
import School from './School';

@Entity('classrooms')
class Classroom {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title!: string;

  @Column('uuid')
  school_id!: string;

  @ManyToOne(() => School, (school) => school.classrooms)
  @JoinColumn({ name: 'school_id' })
  school!: School;

  @ManyToMany(() => Person, (person) => person.classrooms)
  @JoinTable({
    name: 'persons_classrooms',
    joinColumn: { name: 'classroom_id' },
    inverseJoinColumn: { name: 'person_id' },
  })
  persons!: Person[];
}

export default Classroom;
