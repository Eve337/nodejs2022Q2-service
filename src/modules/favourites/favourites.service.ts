import { artists, track } from './../../utils/InMemoryDB';
import { ArtistsService } from './../artists/artists.service';
import { findById, removeEntity, removeEntityFav } from 'src/utils/utils';
import { checkUuid, getValidatedEntity } from './../../utils/utils';
import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InMemoryDB } from 'src/utils/InMemoryDB';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavouritesService {
  db: typeof InMemoryDB;
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {
    this.db = InMemoryDB;
  }

  findAll() {
    const tracks = this.db.favourites.tracks.map((id) =>
      this.trackService.findOne(id),
    );
    const albums = this.db.favourites.albums.map((id) =>
      this.albumService.findOne(id),
    );
    const artists = this.db.favourites.artists.map((id) =>
      this.artistsService.findOne(id),
    );
    return {
      artists,
      albums,
      tracks,
    };
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

  deleteTrackFromFav(id: string, isDirectReq: boolean) {
    if (isDirectReq) checkUuid(id);
    this.db.favourites = {
      ...this.db.favourites,
      tracks: removeEntityFav(id, this.db.favourites.tracks),
    };
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

  deleteArtistFromFav(id: string, isDirectReq: boolean) {
    console.log(id);
    if (isDirectReq) checkUuid(id);
    this.db.favourites = {
      ...this.db.favourites,
      artists: removeEntityFav(id, this.db.favourites.artists),
    };
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

  deleteAlbumFromFav(id: string, isDirectReq: boolean) {
    if (isDirectReq) checkUuid(id);
    console.log(this.db.favourites);
    this.db.favourites = {
      ...this.db.favourites,
      albums: removeEntityFav(id, this.db.favourites.albums),
    };
    console.log(this.db.favourites);
  }
}
