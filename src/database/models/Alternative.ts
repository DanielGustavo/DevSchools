import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Question from './Question';

@Entity('alternatives')
class Alternative {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  text!: string;

  @ManyToOne(() => Question, (question) => question.alternatives)
  @JoinColumn({ name: 'question_id' })
  question!: Question;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default Alternative;
