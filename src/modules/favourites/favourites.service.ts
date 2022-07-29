import { favouriteSchema } from './../../database/entities/favourite.entity';
import { findById, removeEntityFav } from 'src/utils/utils';
import { checkUuid } from './../../utils/utils';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { albumSchema } from 'src/database/entities/album.entity';
import { artistSchema } from 'src/database/entities/artist.entity';
import { trackSchema } from 'src/database/entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(artistSchema)
    private readonly artistsRepository: Repository<artistSchema>,
    @InjectRepository(trackSchema)
    private readonly tracksRepository: Repository<trackSchema>,
    @InjectRepository(albumSchema)
    private readonly albumsRepository: Repository<albumSchema>,
    @InjectRepository(favouriteSchema)
    private readonly favouriteRepository: Repository<favouriteSchema>,
  ) {}

  async findAll() {
    const [fav] = await this.favouriteRepository.find({
      relations: ['artists', 'tracks', 'albums'],
    });
    return { albums: fav.albums, artists: fav.artists, tracks: fav.tracks };
  }

  async addTrackToFav(id: string) {
    checkUuid(id);
    const currentTrack = await this.tracksRepository.findOneBy({ id });
    if (!currentTrack) {
      throw new UnprocessableEntityException('id === trackId does not exist');
    }
    return currentTrack;
  }

  deleteTrackFromFav(id: string, isDirectReq: boolean) {
    if (isDirectReq) checkUuid(id);
  }

  async addArtistToFav(id: string) {
    checkUuid(id);
    const currentArtist = await this.artistsRepository.findOneBy({ id });
    if (!currentArtist) {
      throw new UnprocessableEntityException('id === artistId does not exist');
    }
    return currentArtist;
  }

  deleteArtistFromFav(id: string, isDirectReq: boolean) {
    if (isDirectReq) checkUuid(id);
  }

  async addAlbumToFav(id: string) {
    checkUuid(id);
    const currentAlbum = await this.albumsRepository.findOneBy({ id });
    if (!currentAlbum) {
      throw new UnprocessableEntityException('id === albumId does not exist');
    }
    return currentAlbum;
  }

  deleteAlbumFromFav(id: string, isDirectReq: boolean) {
    if (isDirectReq) checkUuid(id);
  }
}
