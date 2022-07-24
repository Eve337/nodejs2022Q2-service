import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class trackSchema {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  artistId: string | null;

  @Column()
  albumId: string | null;

  @Column()
  duration: number;
}
