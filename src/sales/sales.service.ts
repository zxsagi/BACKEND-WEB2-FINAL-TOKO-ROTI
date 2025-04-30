import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sales } from './sales.entity';
import { Product } from '../product/product.entity';
import { CreateSalesDto } from './create-sales.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sales)
    private salesRepo: Repository<Sales>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(data: CreateSalesDto) {
    const produk = await this.productRepo.findOneBy({ id: data.id_produk });

    if (!produk) {
      throw new NotFoundException('Produk tidak ditemukan');
    }

    if (produk.stok < data.jumlah) {
      throw new BadRequestException('Stok tidak cukup');
    }

    produk.stok -= data.jumlah;
    await this.productRepo.save(produk);

    const total_harga = produk.harga * data.jumlah;

    const penjualan = this.salesRepo.create({
      tanggal: new Date(),
      produk,
      jumlah: data.jumlah,
      total_harga,
    });

    return this.salesRepo.save(penjualan);
  }

  findAll() {
    return this.salesRepo.find({
      relations: ['produk'],
      order: { tanggal: 'DESC' },
    });
  }

  async getTotalRevenue(): Promise<{ total: number }> {
    const result = await this.salesRepo
      .createQueryBuilder('sales')
      .select('SUM(sales.total_harga)', 'total')
      .getRawOne();

    return { total: Number(result.total) || 0 };
  }
}
