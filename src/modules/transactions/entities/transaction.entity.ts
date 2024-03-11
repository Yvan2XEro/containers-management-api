import { DefaultEntity } from "../../../shared/entities/default.entity";
import { Column, Entity } from "typeorm";

@Entity("transactions")
export class Transaction extends DefaultEntity{

    @Column("date", {name: "departure_date", nullable: true})
    departureDate: Date|null

    @Column("date", {name: "arrival_date", nullable: true})
    arrivalDate: Date|null

    @Column("enum", {enum:["charging", "in_transit", "arrived", "cancelled"], default: "charging"})
    status: "charging"| "in_transit"| "arrived"| "cancelled"

    @Column("varchar", {name: "tracking_number", unique: true})
    trackingNumber: string

    @Column({name: "departure_port_name"})
    departurePortName: string

    @Column({name: "arrival_port_name"})
    arrivalPortName: string
}
