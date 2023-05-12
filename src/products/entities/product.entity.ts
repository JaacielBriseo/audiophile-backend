import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategoryImage } from './product-category-image.entity';
import { ProductGallery } from './product-gallery.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text')
  category: string;

  @Column('boolean')
  new: boolean;

  @Column('float')
  price: number;

  @Column('text')
  description: string;

  @Column('text')
  features: string;

  @Column(() => ProductCategoryImage)
  image: ProductCategoryImage;

  @Column(() => ProductCategoryImage)
  categoryImage: ProductCategoryImage;

  @Column('json')
  includes: { quantity: number; item: string }[];

  @Column(() => ProductGallery)
  gallery: ProductGallery;

  @Column('json')
  others: {
    slug: string;
    name: string;
    imageMobile: string;
    imageTablet: string;
    imageDesktop: string;
  }[];
}
