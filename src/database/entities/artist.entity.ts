import { trackSchema } from 'src/database/entities/track.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { albumSchema } from './album.entity';

@Entity('artists')
export class artistSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => albumSchema, (album) => album.artist, { cascade: true })
  @Exclude()
  albums: albumSchema[];

  @OneToMany(() => trackSchema, (track) => track.artist, { cascade: true })
  @Exclude()
  tracks: trackSchema[];
}
