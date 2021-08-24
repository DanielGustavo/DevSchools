import { MigrationInterface, QueryRunner } from 'typeorm';

export class replaceUsernameWithEmailInUsersTable1624704724138
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE users RENAME COLUMN username TO email'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE users RENAME COLUMN email TO username'
    );
  }
}
