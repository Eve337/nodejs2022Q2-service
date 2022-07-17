import { Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/utils/InMemoryDB';
import { getValidatedEntity, removeEntity } from 'src/utils/utils';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './model/artist';

@Injectable()
export class ArtistsService {
  db: typeof InMemoryDB;
  constructor() {
    this.db = InMemoryDB;
  }

  create(createArtistDto: CreateArtistDto) {
    const newArtist = {
      ...createArtistDto,
      id: uuidv4(),
    };

    this.db.artists.push(newArtist);
    return newArtist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string) {
    return getValidatedEntity(id, this.db.artists, 'Artist');
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const updatedArtist: Artist = getValidatedEntity(
      id,
      this.db.artists,
      'Artist',
    );
    updatedArtist.name = updateArtistDto.name;
    updatedArtist.grammy = updateArtistDto.grammy;
    return updatedArtist;
  }

  remove(id: string) {
    getValidatedEntity(id, this.db.artists, 'Artist');
    this.db.artists = removeEntity(id, this.db.artists);
  }
}
