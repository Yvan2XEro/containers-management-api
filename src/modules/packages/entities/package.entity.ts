import { CubicMeter } from "../../../modules/cubic-meters/entities/cubic-meter.entity";
import { Charge } from "../../../modules/charges/entities/charge.entity";
import { Client } from "../../../modules/clients/entities/client.entity";
import { DecimalColumnTransformer } from "../../../shared/classes/decimal-column-transformer";
import { DefaultEntity } from "../../../shared/entities/default.entity";
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

    @Column({name: "manual_numbers", nullable: true})
    manualNumbers: string | null

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

    @ManyToOne(()=>CubicMeter, c=>c.id,{
        onDelete: "SET NULL",
        eager: true,
        nullable: true
    })
    @JoinColumn({name: "cubic_meter_id"})
    cubicMeter: CubicMeter

    @Column("decimal",{
        precision: 10, scale: 2,
        transformer: new DecimalColumnTransformer(),
        default: 0,
        name: "cubic_meters_count"
    })
    cubicMetersCount: number

    @Column("varchar", {nullable: true})
    label: string|null
}


