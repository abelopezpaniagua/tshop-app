import { Category } from './category.model';

export class Product {
  public id: number;
  public code: string;
  public name: string;
  public description: string;
  public price: number;
  public onDiscount: boolean;
  public discountPrice: number | null;
  public imageUrl: string | null;
  public categoryId: number;
  public category: Category;

  constructor() {
    this.id = 0;
    this.code = '';
    this.name = '';
    this.description = '';
    this.price = 0;
    this.onDiscount = false;
    this.discountPrice = null;
    this.imageUrl = null;
  }
}
