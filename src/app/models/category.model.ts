import { Product } from './product.model';

export class Category {
  public id: number;
  public code: string;
  public name: string;
  public description: string;
  public products: Product[];

  constructor() {
    this.id = 0;
    this.code = '';
    this.name = '';
    this.description = '';
    this.products = [];
  }
}
