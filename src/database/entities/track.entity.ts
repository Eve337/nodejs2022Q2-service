import { albumSchema } from './album.entity';
import { artistSchema } from './artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Type, Exclude } from 'class-transformer';

@Entity('tracks')
export class trackSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: false })
  @Type(() => Number)
  duration: number;

  @Column({ nullable: true })
  albumId: string | null;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => albumSchema, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  album: albumSchema;

  @ManyToOne(() => artistSchema, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  artist: artistSchema;
}
