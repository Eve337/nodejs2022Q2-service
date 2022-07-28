import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class albumSchema {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  artistId: string;
}
