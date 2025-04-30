import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';
import { Public } from '../auth/public.decorator'; // ⬅️ Tambahkan ini

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Public()
  @Post()
  create(@Body() body: CreateProductDto) {
    console.log('DATA DITERIMA:', body);
    return this.productService.create(body);
  }

  @Public()
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Public()
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateProductDto) {
    return this.productService.update(id, data);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
