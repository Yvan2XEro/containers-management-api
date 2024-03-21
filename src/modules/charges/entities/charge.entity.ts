import { Transaction } from "../../../modules/transactions/entities/transaction.entity";
import { DecimalColumnTransformer } from "../../../shared/classes/decimal-column-transformer";
import { DefaultEntity } from "../../../shared/entities/default.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("charges")
export class Charge extends DefaultEntity {

    @Column("decimal", {
        precision: 10, scale: 2,
        name: "extra_coast_amount",
        transformer: new DecimalColumnTransformer(),
        default: 0
    })
    extraCoastAmount: number

    @Column("text",{nullable: true})
    description: string|null

    @Column({unique: true})
    number: string

    @Column({nullable: true})
    type: string | null;
    
    @Column({default: 0, nullable: true})
    capacity: number | null;

    @Column("decimal", {
        precision: 10, scale: 2,
        transformer: new DecimalColumnTransformer(),
        default: 0,
        nullable: true
    })
    weigth: number | null;

    @Column("decimal", {
        precision: 10, scale: 2,
        transformer: new DecimalColumnTransformer(),
        default: 0,
        name: "max_weigth",
        nullable: true
    })
    maxWeigth: number | null;

    @ManyToOne(()=>Transaction, t=>t.id, {
        nullable: true,
        onDelete: "SET NULL",
    })
    @JoinColumn({name: "transaction_id",})
    transaction: Transaction|null
}
