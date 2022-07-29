import { trackSchema } from './track.entity';
import { albumSchema } from './album.entity';
import { artistSchema } from './artist.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favs')
export class favouriteSchema {
  @PrimaryGeneratedColumn('uuid')
  idUser: number;

  @ManyToMany(() => artistSchema, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'favourite_artists',
    joinColumn: { name: 'fav_id', referencedColumnName: 'idUser' },
    inverseJoinColumn: { name: 'artist_id', referencedColumnName: 'id' },
  })
  artists: artistSchema[];

  @ManyToMany(() => albumSchema, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'favourite_artists',
    joinColumn: { name: 'fav_id', referencedColumnName: 'idUser' },
    inverseJoinColumn: { name: 'album_id', referencedColumnName: 'id' },
  })
  albums: albumSchema[];

  @ManyToMany(() => trackSchema, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'favourite_artists',
    joinColumn: { name: 'fav_id', referencedColumnName: 'idUser' },
    inverseJoinColumn: { name: 'tracks_id', referencedColumnName: 'id' },
  })
  tracks: trackSchema[];
}
