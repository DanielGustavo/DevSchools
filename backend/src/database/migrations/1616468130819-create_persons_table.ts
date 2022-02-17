import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createPersonsTable1616468130819 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'persons',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'uuid',
            default: 'uuid_generate_v4()',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'role',
            isNullable: false,
            type: 'enum',
            enum: ['student', 'teacher'],
          },
          {
            name: 'user_id',
            isNullable: false,
            type: 'uuid',
            isUnique: true,
          },
        ],
      })
    );

    const userIdForeignKey = new TableForeignKey({
      columnNames: ['user_id'],
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      name: 'persons_user_id_fk',
    });

    await queryRunner.createForeignKey('persons', userIdForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('persons', 'persons_user_id_fk');

    queryRunner.dropTable('persons');
  }
}
