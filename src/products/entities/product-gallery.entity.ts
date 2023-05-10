import { Column, Entity } from 'typeorm';
import { ProductCategoryImage } from './product-category-image.entity';

@Entity()
export class ProductGallery {
  
  @Column(() => ProductCategoryImage)
  first: ProductCategoryImage;

  @Column(() => ProductCategoryImage)
  second: ProductCategoryImage;

  @Column(() => ProductCategoryImage)
  third: ProductCategoryImage;
}
