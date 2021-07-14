import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Alternative from './Alternative';
import Homework from './Homework';
import PersonToQuestion from './PersonToQuestion';

@Entity('questions')
class Question {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  question!: string;

  @OneToOne(() => Alternative, (alternative) => alternative.question)
  @JoinColumn({ name: 'correct_alternative_id' })
  correct_alternative!: Alternative;

  @OneToMany(() => Alternative, (alternative) => alternative.question)
  alternatives!: Alternative[];

  @OneToMany(
    () => PersonToQuestion,
    (personToQuestion) => personToQuestion.question
  )
  person_to_questions!: PersonToQuestion[];

  @ManyToOne(() => Homework, (homework) => homework.questions)
  @JoinColumn({ name: 'homework_id' })
  homework!: Homework;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default Question;
