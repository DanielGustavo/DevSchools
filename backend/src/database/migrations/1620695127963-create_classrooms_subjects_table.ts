import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createClassroomsSubjectsTable1620695127963
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'classrooms_subjects',
        columns: [
          {
            name: 'id',
            isNullable: false,
            isPrimary: true,
            type: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'classroom_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'subject_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      })
    );

    const classroomIdForeignKey = new TableForeignKey({
      name: 'classrooms_subjects_classroom_id_fk',
      columnNames: ['classroom_id'],
      referencedTableName: 'classrooms',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    });

    const subjectIdForeignKey = new TableForeignKey({
      name: 'classrooms_subjects_subject_id_fk',
      referencedColumnNames: ['id'],
      referencedTableName: 'subjects',
      columnNames: ['subject_id'],
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKeys('classrooms_subjects', [
      subjectIdForeignKey,
      classroomIdForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'classrooms_subjects',
      'classrooms_subjects_classroom_id_fk'
    );

    await queryRunner.dropForeignKey(
      'classrooms_subjects',
      'classrooms_subjects_subject_id_fk'
    );

    await queryRunner.dropTable('classrooms_subjects');
  }
}
