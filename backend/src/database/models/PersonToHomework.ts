import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Homework from './Homework';
import Person from './Person';

@Entity('persons_homeworks')
class PersonToHomework {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Person, (person) => person.person_to_homeworks)
  @JoinColumn({ name: 'person_id' })
  person!: Person;

  @ManyToOne(() => Homework, (homework) => homework.person_to_homeworks)
  @JoinColumn({ name: 'homework_id' })
  homework!: Homework;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default PersonToHomework;
