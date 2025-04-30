import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity('tbl_penjualan')
export class Sales {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  tanggal: Date;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'id_produk' })
  produk: Product;

  @Column()
  jumlah: number;

  @Column()
  total_harga: number;
}
