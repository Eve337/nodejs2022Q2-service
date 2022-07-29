import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artists')
export class artistSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
