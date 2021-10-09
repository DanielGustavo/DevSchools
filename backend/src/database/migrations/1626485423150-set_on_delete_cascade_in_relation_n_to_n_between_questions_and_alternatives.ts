import { MigrationInterface, QueryRunner } from 'typeorm';

export class setOnDeleteCascadeInRelationNToNBetweenQuestionsAndAlternatives1626485423150
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE alternatives DROP CONSTRAINT alternatives_question_id_fk'
    );

    await queryRunner.query(
      'ALTER TABLE alternatives ADD CONSTRAINT alternatives_question_id_fk FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE alternatives DROP CONSTRAINT alternatives_question_id_fk'
    );

    await queryRunner.query(
      'ALTER TABLE alternatives ADD CONSTRAINT alternatives_question_id_fk FOREIGN KEY (question_id) REFERENCES questions(id)'
    );
  }
}
