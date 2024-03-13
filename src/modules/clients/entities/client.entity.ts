import { DecimalColumnTransformer } from "../../../shared/classes/decimal-column-transformer";
import { DefaultEntity } from "../../../shared/entities/default.entity";
import { Column, Entity } from "typeorm";

@Entity("clients")
export class Client extends DefaultEntity{
    @Column()
    name: string;
    
    @Column("varchar",{nullable: true})
    email: string|null;
    
    @Column("varchar",{nullable: true})
    phone: string|null;
    
    @Column("varchar",{nullable: true})
    address: string|null;
}
