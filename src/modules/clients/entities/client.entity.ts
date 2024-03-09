import { DecimalColumnTransformer } from "src/shared/classes/decimal-column-transformer";
import { DefaultEntity } from "src/shared/entities/default.entity";
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

    @Column("decimal", {
        precision: 10, scale: 2,
        transformer: new DecimalColumnTransformer(),
        default: 0
    })
    balance: number;
}
