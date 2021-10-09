import { MigrationInterface, QueryRunner } from 'typeorm';

export class setOnDeleteInColumnCorrectAlternativeIdInTableQuestionsToSetNull1626897099595
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE questions DROP CONSTRAINT questions_correct_alternative_id_fk'
    );

    await queryRunner.query(
      'ALTER TABLE questions ADD CONSTRAINT questions_correct_alternative_id_fk FOREIGN KEY (correct_alternative_id) REFERENCES alternatives(id) ON DELETE SET NULL'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE questions DROP CONSTRAINT questions_correct_alternative_id_fk'
    );

    await queryRunner.query(
      'ALTER TABLE questions ADD CONSTRAINT questions_correct_alternative_id_fk FOREIGN KEY (correct_alternative_id) REFERENCES alternatives(id) ON DELETE CASCADE'
    );
  }
}
