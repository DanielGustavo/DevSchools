import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsersTable1616198548377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isNullable: false,
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'is_a_school',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'avatar_filename',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'date',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'date',
            isNullable: false,
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp"');
  }
}
