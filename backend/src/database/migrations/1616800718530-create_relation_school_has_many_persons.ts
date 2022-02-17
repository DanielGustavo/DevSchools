import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createRelationSchoolHasManyPersons1616800718530
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'persons',
      new TableColumn({
        name: 'school_id',
        type: 'uuid',
        isNullable: false,
      })
    );

    const schoolIdForeignKey = new TableForeignKey({
      name: 'persons_school_id_fk',
      columnNames: ['school_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'schools',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKey('persons', schoolIdForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('persons', 'persons_school_id_fk');
    await queryRunner.dropColumn('persons', 'school_id');
  }
}
