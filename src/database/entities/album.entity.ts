import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { artistSchema } from './artist.entity';

@Entity()
export class albumSchema {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @OneToMany(() => artistSchema, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  artist: string;

  @Column()
  artistId: string;
}
