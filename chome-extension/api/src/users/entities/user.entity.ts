import {
  Column,
  AfterLoad,
  CreateDateColumn,
  Entity,
  Index,
  ObjectIdColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { EntityHelper } from 'src/utils/entity-helper';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends EntityHelper {
  @ObjectIdColumn()
  id: string;

  @Column({ unique: true, nullable: true })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Index()
  @Column({ nullable: false })
  name: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
