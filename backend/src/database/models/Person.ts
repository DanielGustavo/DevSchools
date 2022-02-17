import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import School from './School';
import User from './User';
import Classroom from './Classroom';
import Subject from './Subject';

@Entity('persons')
class Person {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('enum', {
    nullable: false,
    enum: { STUDENT: 'student', TEACHER: 'teacher' },
  })
  role!: String;

  @Column('varchar')
  name!: String;

  @Column('uuid')
  school_id!: String;

  @Column('boolean', { default: false })
  setted_up!: Boolean;

  @Column('uuid')
  user_id!: String;

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

  @ManyToMany(() => Subject, (subject) => subject.persons)
  @JoinTable({
    name: 'persons_subjects',
    joinColumn: { name: 'person_id' },
    inverseJoinColumn: { name: 'subject_id' },
  })
  subjects!: Subject[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default Person;
