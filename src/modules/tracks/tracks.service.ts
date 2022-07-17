import { FavouritesService } from './../favourites/favourites.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryDB } from 'src/utils/InMemoryDB';
import {
  getValidatedEntity,
  removeEntity,
  removeEntityAFromEntityB,
} from 'src/utils/utils';

@Injectable()
export class TracksService {
  db: typeof InMemoryDB;
  constructor(
    @Inject(forwardRef(() => FavouritesService))
    private readonly favouriteService: FavouritesService,
  ) {
    this.db = InMemoryDB;
  }
  create(createTrackDto: CreateTrackDto) {
    const newTrack = {
      ...createTrackDto,
      id: uuidv4(),
    };

    this.db.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    return getValidatedEntity(id, this.db.tracks, 'Track');
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const updatedTrack: UpdateTrackDto = getValidatedEntity(
      id,
      this.db.tracks,
      'Track',
    );
    updatedTrack.name = updateTrackDto.name;
    updatedTrack.duration = updateTrackDto.duration;
    if (updateTrackDto.artistId) {
      updatedTrack.artistId = updateTrackDto.artistId;
    }
    if (updateTrackDto.albumId) {
      updatedTrack.albumId = updateTrackDto.albumId;
    }
  }

  remove(id: string) {
    getValidatedEntity(id, this.db.tracks, 'Track');
    this.db.artists = removeEntity(id, this.db.tracks);
    this.favouriteService.deleteTrackFromFav(id);
  }

  removeAlbumIdFromTrack(id: string) {
    removeEntityAFromEntityB(id, this.db.tracks, 'albumId');
  }
  removeArtistFromTrack(id: string) {
    removeEntityAFromEntityB(id, this.db.tracks, 'artistId');
  }
}
