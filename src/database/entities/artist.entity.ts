import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class artistSchema {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
