import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createPersonsSubjectsTable1620695745317
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'persons_subjects',
        columns: [
          {
            name: 'id',
            isNullable: false,
            isPrimary: true,
            type: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'person_id',
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

    const personIdForeignKey = new TableForeignKey({
      name: 'persons_subjects_person_id_fk',
      columnNames: ['person_id'],
      referencedTableName: 'persons',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    });

    const subjectIdForeignKey = new TableForeignKey({
      name: 'persons_subjects_subject_id_fk',
      referencedColumnNames: ['id'],
      referencedTableName: 'subjects',
      columnNames: ['subject_id'],
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKeys('persons_subjects', [
      subjectIdForeignKey,
      personIdForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'persons_subjects',
      'persons_subjects_person_id_fk'
    );

    await queryRunner.dropForeignKey(
      'persons_subjects',
      'persons_subjects_subject_id_fk'
    );

    await queryRunner.dropTable('persons_subjects');
  }
}
