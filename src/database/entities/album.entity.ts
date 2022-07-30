import { trackSchema } from 'src/database/entities/track.entity';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { artistSchema } from './artist.entity';

@Entity('albums')
export class albumSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => artistSchema, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
    // cascade: true,
  })
  @Exclude()
  artist: string;

  @OneToMany(() => trackSchema, (track) => track.album, { cascade: true })
  @Exclude()
  tracks: trackSchema[];

  @Column({
    nullable: true,
  })
  artistId: string;
}
