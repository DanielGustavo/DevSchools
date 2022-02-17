import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createClassroomsTable1617149058995 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'classrooms',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'uuid',
            default: 'uuid_generate_v4()',
            isNullable: false,
          },
          {
            name: 'title',
            isNullable: false,
            type: 'varchar',
          },
          {
            name: 'school_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      })
    );

    const schoolIdForeignKey = new TableForeignKey({
      columnNames: ['school_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'schools',
      onDelete: 'CASCADE',
      name: 'classrooms_school_id_fk',
    });

    await queryRunner.createForeignKey('classrooms', schoolIdForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('classrooms', 'classrooms_school_id_fk');
    await queryRunner.dropTable('classrooms');
  }
}
