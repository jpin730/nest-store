import { UUID } from 'crypto';

export class Product {
  id: UUID;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}
