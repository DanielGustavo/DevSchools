import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import School from './School';

@Entity('subjects')
class Subject {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title!: string;

  @Column('uuid')
  school_id!: string;

  @ManyToOne(() => School, (school) => school.subjects)
  @JoinColumn({ name: 'school_id' })
  school!: School;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default Subject;
