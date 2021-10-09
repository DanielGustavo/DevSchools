import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class setFieldDescriptionInTableHomeworksAsNullable1626314854362
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'homeworks',
      'description',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'homeworks',
      'description',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: false,
      })
    );
  }
}
