import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class setColumnCorrectAlternativeIdAsNullableInTableQuestions1626446883499
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'questions',
      'correct_alternative_id',
      new TableColumn({
        name: 'correct_alternative_id',
        type: 'uuid',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'questions',
      'correct_alternative_id',
      new TableColumn({
        name: 'correct_alternative_id',
        type: 'uuid',
        isNullable: false,
      })
    );
  }
}
