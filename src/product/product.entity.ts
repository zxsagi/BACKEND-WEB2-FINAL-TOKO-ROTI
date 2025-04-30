import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_produk')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama_produk: string;

  @Column('int')
  harga: number;

  @Column('int')
  stok: number;
}
