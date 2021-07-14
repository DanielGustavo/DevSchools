import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createPersonsHomeworksTable1626223291110
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'persons_homeworks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'person_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'homework_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      })
    );

    const personIdForeignKey = new TableForeignKey({
      name: 'persons_homeworks_person_id_fk',
      columnNames: ['person_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'persons',
      onDelete: 'CASCADE',
    });

    const homeworkIdForeignKey = new TableForeignKey({
      name: 'persons_homeworks_homework_id_fk',
      columnNames: ['homework_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'homeworks',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKeys('persons_homeworks', [
      personIdForeignKey,
      homeworkIdForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'persons_homeworks',
      'persons_homeworks_homework_id_fk'
    );

    await queryRunner.dropForeignKey(
      'persons_homeworks',
      'persons_homeworks_person_id_fk'
    );

    await queryRunner.dropTable('persons_homeworks');
  }
}
