import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createSchoolsTable1616245747201 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'schools',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isNullable: false,
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
            default: 'uuid_generate_v4()',
            isUnique: true,
          },
        ],
      })
    );

    const userIdForeignKey = new TableForeignKey({
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      columnNames: ['user_id'],
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKey('schools', userIdForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const schoolsTable = await queryRunner.getTable('schools');
    const userIdForeignKey = schoolsTable?.foreignKeys.find(
      (foreignKey) => foreignKey.columnNames.indexOf('user_id') > -1
    );

    if (userIdForeignKey) {
      await queryRunner.dropForeignKey('schools', userIdForeignKey);
    }

    await queryRunner.dropTable('schools');
  }
}
