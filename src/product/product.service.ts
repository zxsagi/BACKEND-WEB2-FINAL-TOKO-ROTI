import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(data: CreateProductDto) {
    console.log("✅ DATA DITERIMA DI SERVICE:", data);

    const product = this.productRepository.create(data);

    try {
      const saved = await this.productRepository.save(product);
      console.log("✅ PRODUK TERSIMPAN:", saved);
      return saved;
    } catch (error) {
      console.error("❌ ERROR SAAT SIMPAN PRODUK:", error);
      throw error; // Penting supaya frontend tahu ada error
    }
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  update(id: number, data: UpdateProductDto) {
    return this.productRepository.update(id, data);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
