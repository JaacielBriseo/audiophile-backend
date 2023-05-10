import {
  IsArray,
  IsBoolean,
  IsInt,
  IsObject,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

interface CategoryImage {
  mobile: string;
  tablet: string;
  desktop: string;
}
interface Gallery {
  first: CategoryImage;
  second: CategoryImage;
  third: CategoryImage;
}
interface Other {
  slug: string;
  name: string;
  image: CategoryImage;
}
export class CreateProductDto {
  @IsString()
  @MinLength(1)
  slug: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  category: string;

  @IsBoolean()
  new: boolean;

  @IsInt()
  @IsPositive()
  price: number;

  @IsString()
  @MinLength(1)
  description: string;

  @IsString()
  @MinLength(1)
  features: string;

  @IsObject()
  image: CategoryImage;

  @IsObject()
  categoryImage: CategoryImage;

  @IsArray()
  includes: {
    quantity: number;
    item: string;
  }[];

  @IsObject()
  gallery: Gallery;

  @IsArray()
  others: Other[];
}
