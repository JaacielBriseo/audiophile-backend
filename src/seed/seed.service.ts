import { Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { seedProducts } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productsService: ProductsService) {}
  async executeSeed() {
    await this.deleteAllProducts();
    await this.insertSeedProducts();
    return 'Seed executed';
  }

  private async insertSeedProducts() {
    const products = seedProducts;

    const insertPromises = [];

    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product));
    });

    await Promise.all(insertPromises);

    return true;
  }

  private async deleteAllProducts() {
    await this.productsService.removeAllProducts();
  }
}
