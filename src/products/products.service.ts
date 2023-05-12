import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create({
        ...createProductDto,
      });
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      console.log(error);
      return `${error}`;
    }
  }

  findAll() {
    try {
      return this.productRepository.find({});
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(term: string) {
    try {
      let product: Product;
      const queryBuilder = this.productRepository.createQueryBuilder();
      product = isUUID(term)
        ? await this.productRepository.findOneBy({ id: term })
        : await queryBuilder
            .where(`UPPER(name) =:name or slug =:slug`, {
              name: term.toUpperCase(),
              slug: term.toLowerCase(),
            })
            .getOne();
      if (!product) {
        throw new NotFoundException(`Product with ${term} not found`);
      }
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async removeAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');
    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    if (error.response.statusCode === 404)
      throw new NotFoundException(error.response.message);
    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
