import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Alternative from './Alternative';
import Person from './Person';
import Question from './Question';

@Entity('persons_questions')
class PersonToQuestion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Person, (person) => person.person_to_questions)
  @JoinColumn({ name: 'person_id' })
  person!: Person;

  @ManyToOne(() => Question, (question) => question.person_to_questions)
  @JoinColumn({ name: 'question_id' })
  question!: Question;

  @OneToOne(() => Alternative)
  @JoinColumn({ name: 'alternative_id' })
  alternative!: Alternative;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}

export default PersonToQuestion;
