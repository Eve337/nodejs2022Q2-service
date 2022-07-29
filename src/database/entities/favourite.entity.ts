import { trackSchema } from 'src/database/entities/track.entity';
import { albumSchema } from 'src/database/entities/album.entity';
import { artistSchema } from 'src/database/entities/artist.entity';
import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('favorites')
export class FavouriteSchema {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToMany(() => artistSchema, { cascade: true })
  @JoinTable()
  artists: artistSchema[];

  @ManyToMany(() => albumSchema, { cascade: true })
  @JoinTable()
  albums: albumSchema[];

  @ManyToMany(() => trackSchema, { cascade: true })
  @JoinTable()
  tracks: trackSchema[];
}
