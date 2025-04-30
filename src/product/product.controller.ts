import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { Public } from '../auth/public.decorator'; // Jika kamu pakai AuthGuard

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Public() // opsional, hanya jika kamu pakai guard global
  create(@Body() body: CreateProductDto) {
    console.log('📥 DITERIMA DI CONTROLLER:', body);
    return this.productService.create(body);
  }

  @Get()
  @Public()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @Public()
  update(@Param('id') id: number, @Body() data: UpdateProductDto) {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
