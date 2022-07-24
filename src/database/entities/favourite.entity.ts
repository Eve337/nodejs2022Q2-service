import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class favouriteSchema {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  artists: string[];

  @Column()
  albums: string[];

  @Column()
  tracks: string[];
}
