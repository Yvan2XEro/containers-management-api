import { Column, Entity, OneToMany } from "typeorm";
import { DefaultEntity } from "../../../shared/entities/default.entity";
import { UserEntity } from "src/modules/users/entities/user.entity";

@Entity("offices")
export class Office extends DefaultEntity{
    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    description: string|null

    @OneToMany(() => UserEntity, (o) => o.office, { eager: false, nullable: true })
    users: UserEntity[] | null
}
