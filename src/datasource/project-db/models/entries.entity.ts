import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Entries {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ generated: 'uuid', type: 'varchar' })
    uuid: string;

    @Column({ type: 'varchar', length: 200, default: '' })
    couponId: string;

    @Column({ type: 'smallint', default: null, nullable: true })
    couponPeriod: number;

    @Column({ type: 'varchar', length: 100, default: '' })
    coupon: string;

    @Column({ type: 'varchar', length: 50, default: '' })
    sender: string;

    @Column({ type: 'varchar', length: 100, default: '' })
    id_number: string;

    @Column({ type: 'varchar', length: 100, default: '' })
    name: string;

    @Column({ type: 'varchar', length: 100, default: '' })
    tglLahir: string;

    @Column({ type: 'varchar', length: 100, default: '' })
    hp: string;

    @Column({ type: 'varchar', length: 100, default: '' })
    city: string;

    @Column({ type: 'varchar', length: 100, default: '' })
    invalid_reason_admin: string;

    @Column({ type: 'text' })
    message: string;

    @Column({ type: 'varchar', length: 255, default: '' })
    redeem: string;

    @Column({ type: 'varchar', length: 255, default: '' })
    purchase_no: string;

    @Column({ type: 'varchar', length: 255, default: '' })
    approve_reason: string;

    @Column({ type: 'varchar', length: 255, default: '' })
    purchase_no_admin: string;

    @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
    purchase_amount: string;

    @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
    purchase_amount_admin: string;

    @Column({ type: 'smallint', default: 0 })
    is_valid: number;

    @Column({ type: 'smallint', default: null, nullable: true })
    is_valid_admin: number;

    @Column({ type: 'smallint', default: 0, comment: '1-> approved, 2-> rejected' })
    is_approved: number;

    @Column({ type: 'smallint', default: 0 })
    approvedById_admin: number;

    @Column({ type: 'varchar', length: 255, default: null, nullable: true })
    store_name_admin: number;

    @Column({ type: 'smallint', default: 0 })
    is_approved_admin: number;

    @Column({ type: 'int', default: 0 })
    totalCoupon: number;

    @Column({ type: 'int', default: 0 })
    totalRedeem: number;

    @Column({ type: 'int', default: 0 })
    totalPoint: number;

    @Column({ type: 'smallint', default: 1, comment: '0->in active,1-> active' })
    status: number;

    @Column({ type: 'datetime', nullable: true, default: null })
    purchase_date: string;

    @Column({ type: 'datetime', nullable: true, default: null })
    purchase_date_admin: string;

    @Column({ type: 'datetime', nullable: true, default: null })
    validation_date_store: string;

    @Column({ type: 'datetime', nullable: true, default: null })
    validation_date_admin: string;

    @Column({ type: 'datetime', nullable: true, default: null })
    approved_date: string;

    @Column({ type: 'datetime', nullable: true, default: null })
    rcvd_time: string;

    @Column({ type: 'smallint', default: 0 })
    is_deleted: number;

    @CreateDateColumn({ type: 'timestamp', default: null, nullable: true })
    deleted_at: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at: string;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated_at: string;
}
