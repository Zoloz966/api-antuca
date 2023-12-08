import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PrimaryGeneratedColumn } from 'typeorm';
import { CreateOrderItemDto } from './create-order-item.dto';

export class CreateOrderDto {
  @PrimaryGeneratedColumn()
  id_order: number;

  @IsNumber()
  @IsNotEmpty()
  customerIdCustomer: number;

  @IsNumber()
  @IsNotEmpty()
  clientIdClient: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  stateIdState: number;

  @IsNumber()
  @IsNotEmpty()
  total_amount: number;

  @IsNumber()
  @IsNotEmpty()
  paymentTypeIdPaymentType: number;

  @IsString()
  @IsOptional()
  notes: string;

  @IsNumber()
  @IsOptional()
  status: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @IsNotEmpty()
  items: CreateOrderItemDto[];
}
