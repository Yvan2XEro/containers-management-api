import { Charge } from "src/modules/charges/entities/charge.entity";
import { Client } from "src/modules/clients/entities/client.entity";
import { DecimalColumnTransformer } from "src/shared/classes/decimal-column-transformer";
import { DefaultEntity } from "src/shared/entities/default.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("packages")
export class Package extends DefaultEntity {
    
    @ManyToOne(()=>Client, o=>o.id,{
        onDelete: "CASCADE",
        eager: true
    })
    @JoinColumn({name: "client_id",})
    client: Client

    @Column({name: "tracking_number", unique: true})
    trackingNumber: string

    @Column("decimal", {
        precision: 10, scale: 2,
        transformer: new DecimalColumnTransformer(),
        default: 0
    })
    weight: number

    @Column("decimal", {
        precision: 10, scale: 2,
        transformer: new DecimalColumnTransformer(),
        default: 0
    })
    volume: number

    @Column("decimal", {
        precision: 10, scale: 2,
        transformer: new DecimalColumnTransformer(),
        default: 0
    })
    value: number

    @Column("date", {name: "sending_date", nullable: true})
    sendingDate: Date|null

    @Column("date", {name: "receipt_date", nullable: true})
    receiptDate: Date|null

    @Column("enum", {enum: ["in_transit", "delivered", "damaged"], default: "in_transit"})
    status: "in_transit"| "delivered"| "damaged"


    @ManyToOne(()=>Charge, c=>c.id,{
        onDelete: "CASCADE",
        eager: true,
        nullable: true
    })
    @JoinColumn({name: "charge_id"})
    charge: Charge
}


