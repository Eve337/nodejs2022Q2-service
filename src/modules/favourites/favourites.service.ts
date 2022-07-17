import { findById, removeEntity } from 'src/utils/utils';
import { checkUuid, getValidatedEntity } from './../../utils/utils';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InMemoryDB } from 'src/utils/InMemoryDB';

@Injectable()
export class FavouritesService {
  db: typeof InMemoryDB;
  constructor() {
    this.db = InMemoryDB;
  }

  findAll() {
    return this.db.favourites;
  }

  addTrackToFav(id: string) {
    checkUuid(id);
    const currentTrack = findById(id, this.db.tracks);
    if (!currentTrack) {
      throw new UnprocessableEntityException('id === trackId does not exist');
    }
    this.db.favourites.tracks.push(id);
    return currentTrack;
  }

  deleteTrackFromFav(id: string) {
    getValidatedEntity(id, this.db.favourites.tracks, 'Track');
    removeEntity(id, this.db.favourites.tracks);
  }

  addArtistToFav(id: string) {
    checkUuid(id);
    const currentArtist = findById(id, this.db.artists);
    if (!currentArtist) {
      throw new UnprocessableEntityException('id === artistId does not exist');
    }
    this.db.favourites.artists.push(id);
    return currentArtist;
  }

  deleteArtistFromFav(id: string) {
    getValidatedEntity(id, this.db.favourites.artists, 'Artist');
    removeEntity(id, this.db.favourites.artists);
  }

  addAlbumToFav(id: string) {
    checkUuid(id);
    const currentAlbum = findById(id, this.db.albums);
    if (!currentAlbum) {
      throw new UnprocessableEntityException('id === albumId does not exist');
    }
    this.db.favourites.albums.push(id);
    return currentAlbum;
  }

  deleteAlbumFromFav(id: string) {
    getValidatedEntity(id, this.db.favourites.albums, 'Album');
    removeEntity(id, this.db.favourites.albums);
  }
}
