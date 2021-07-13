import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createHomeworksTable1626217733833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'homeworks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'subject_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'classroom_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'deadline',
            type: 'timestamp',
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
          {
            name: 'person_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'sent_at',
            type: 'timestamp',
          },
        ],
      })
    );

    const personIdForeignKey = new TableForeignKey({
      name: 'homeworks_person_id_fk',
      columnNames: ['person_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'persons',
      onDelete: 'CASCADE',
    });

    const classroomIdForeignKey = new TableForeignKey({
      name: 'homeworks_classroom_id_fk',
      columnNames: ['classroom_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'classrooms',
      onDelete: 'CASCADE',
    });

    const subjectIdForeignKey = new TableForeignKey({
      name: 'homeworks_subject_id_fk',
      columnNames: ['subject_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'subjects',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKeys('homeworks', [
      classroomIdForeignKey,
      subjectIdForeignKey,
      personIdForeignKey,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('homeworks', 'homeworks_subject_id_fk');
    await queryRunner.dropForeignKey('homeworks', 'homeworks_classroom_id_fk');
    await queryRunner.dropForeignKey('homeworks', 'homeworks_person_id_fk');

    await queryRunner.dropTable('homeworks');
  }
}
