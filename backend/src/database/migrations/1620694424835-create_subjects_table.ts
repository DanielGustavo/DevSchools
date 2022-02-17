import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createSubjectsTable1620694424835 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'subjects',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isNullable: false,
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'school_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            isNullable: false,
            default: 'now()',
            type: 'date',
          },
          {
            name: 'updated_at',
            isNullable: false,
            default: 'now()',
            type: 'date',
          },
        ],
      })
    );

    const schoolIdForeignKey = new TableForeignKey({
      name: 'subjects_school_id_fk',
      columnNames: ['school_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'schools',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKey('subjects', schoolIdForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('subjects', 'subjects_school_id_fk');
    await queryRunner.dropTable('subjects');
  }
}
