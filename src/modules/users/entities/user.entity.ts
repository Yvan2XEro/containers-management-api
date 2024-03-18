import { DefaultEntity } from '../../../shared/entities/default.entity';
import * as bcrypt from 'bcrypt';
import { Office } from '../../../modules/offices/entities/office.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity extends DefaultEntity {
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({ unique: true })
  email: string;

  @Column({ select: false, nullable: true })
  password: string | null;

  @Column({ select: false, nullable: true, name: 'refresh_token' })
  refreshToken: string;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'photo',
    nullable: true,
  })
  photo: string;

  @Column({
    name: 'is_admin',
    default: false,
  })
  isAdmin: boolean;

  @Column({
    name: 'is_staff',
    default: false,
  })
  isStaff: boolean;

  @Column({
    nullable: true,
  })
  phone: string | null;

  @Column({
    nullable: true,
    default: 'local',
  })
  provider: string | null;

  @Column({
    nullable: true,
    unique: true,
    name: 'external_id',
  })
  externalId: string | null;

  @ManyToOne(() => Office, (o) => o.id, { eager: false, nullable: true })
  @JoinColumn({ name: 'office_id' })
  office: Office | null;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
