import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class States {
  @PrimaryGeneratedColumn()
  id_state: number;

  @Column({ type: 'varchar', length: undefined })
  name: string;

  @Column({ type: 'varchar', length: undefined })
  type: string;

  @Column({ type: 'int' })
  priority: number;

  @Column({ type: 'varchar', length: undefined })
  color: string;

  @Column({ type: 'tinyint', default: 1 })
  status: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
