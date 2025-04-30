import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from './sales.entity';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { Product } from '../product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sales, Product])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
