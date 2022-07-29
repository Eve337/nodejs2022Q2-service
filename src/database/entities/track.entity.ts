import { albumSchema } from './album.entity';
import { artistSchema } from './artist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class trackSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => artistSchema, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  artist: string;

  @Column()
  artistId: string | null;

  @OneToMany(() => albumSchema, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
    cascade: ['insert', 'update', 'remove'],
  })
  album: string;

  @Column()
  albumId: string | null;

  @Column()
  duration: number;
}
