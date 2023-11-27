import { BaseEntity } from './base-entity';
import { Customer } from './customer';

export interface CDVEvent extends BaseEntity {
  name: string;
  location: string;
  description: string;
  status: EventStatusEnum;
  type?: EventType[];
  logo?: CDVBlob;
  banner?: CDVBlob;
  customer?: Customer;
}

export enum EventStatusEnum {
  Draft = 'Draft',
  Pending = 'Pending',
  Approved = 'Approved',
}

export interface EventType {
  id: number;
  name: string;
}

interface CDVBlob extends BaseEntity {
  location: string;
}
