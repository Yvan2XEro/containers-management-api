import { Transaction } from "src/modules/transactions/entities/transaction.entity";
import { DecimalColumnTransformer } from "src/shared/classes/decimal-column-transformer";
import { DefaultEntity } from "src/shared/entities/default.entity";
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

    @Column()
    type: string
    
    @Column({default: 0})
    capacity: number

    @Column("decimal", {
        precision: 10, scale: 2,
        transformer: new DecimalColumnTransformer(),
        default: 0
    })
    weigth: number

    @Column("decimal", {
        precision: 10, scale: 2,
        transformer: new DecimalColumnTransformer(),
        default: 0,
        name: "max_weigth"
    })
    maxWeigth: number

    @ManyToOne(()=>Transaction, t=>t.id, {
        nullable: true,
        onDelete: "SET NULL",
    })
    @JoinColumn({name: "transaction_id",})
    transaction: Transaction|null
}
