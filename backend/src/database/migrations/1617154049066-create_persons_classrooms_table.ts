import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createPersonsClassroomsTable1617154049066
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'persons_classrooms',
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
            name: 'classroom_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      })
    );

    const classroomIdForeignKey = new TableForeignKey({
      columnNames: ['classroom_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'classrooms',
      onDelete: 'CASCADE',
      name: 'persons_classrooms_classroom_id_fk',
    });

    const personIdForeignKey = new TableForeignKey({
      columnNames: ['person_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'persons',
      onDelete: 'CASCADE',
      name: 'persons_classrooms_person_id_fk',
    });

    await queryRunner.createForeignKeys('persons_classrooms', [
      classroomIdForeignKey,
      personIdForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'persons_classrooms',
      'persons_classrooms_classroom_id_fk'
    );

    await queryRunner.dropForeignKey(
      'persons_classrooms',
      'persons_classrooms_person_id_fk'
    );

    await queryRunner.dropTable('persons_classrooms');
  }
}
