import { IsString, IsInt, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  nama_produk: string;

  @IsInt()
  @IsPositive()
  harga: number;

  @IsInt()
  @IsPositive()
  stok: number;
}
