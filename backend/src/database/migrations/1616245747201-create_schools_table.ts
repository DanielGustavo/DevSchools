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
      name: 'schools_user_id_fk',
    });

    await queryRunner.createForeignKey('schools', userIdForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('schools', 'schools_user_id_fk');

    await queryRunner.dropTable('schools');
  }
}
