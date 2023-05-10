import { Column, Entity } from 'typeorm';

@Entity()
export class ProductCategoryImage {
  @Column('text')
  mobile: string;

  @Column('text')
  tablet: string;

  @Column('text')
  desktop: string;
}
