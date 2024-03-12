import { DefaultEntity } from "../../../shared/entities/default.entity";
import { Column, Entity } from "typeorm";

@Entity("cubic_meters")
export class CubicMeter extends DefaultEntity{
    @Column({unique: true})
    label: string

    @Column({default: 0})
    value: number

    @Column("boolean",{default: true, name: "is_active"})
    isActive: boolean
}
