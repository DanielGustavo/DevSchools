import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class setFieldSentAtInTableHomeworksAsNullable1626314551251
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'homeworks',
      'sent_at',
      new TableColumn({
        name: 'sent_at',
        type: 'timestamp',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'homeworks',
      'sent_at',
      new TableColumn({
        name: 'sent_at',
        type: 'timestamp',
        isNullable: false,
      })
    );
  }
}
