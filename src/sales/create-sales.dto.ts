import { IsInt, Min } from 'class-validator';

export class CreateSalesDto {
  @IsInt()
  id_produk: number;

  @IsInt()
  @Min(1)
  jumlah: number;
}
