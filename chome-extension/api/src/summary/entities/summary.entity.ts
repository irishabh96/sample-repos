import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { EntityHelper } from 'src/utils/entity-helper';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Summary extends EntityHelper {
  @ObjectIdColumn()
  id: string;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  summary: string;

  @ManyToOne(() => User, (user) => user.id)
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
