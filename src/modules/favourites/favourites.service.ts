import { TracksService } from './../tracks/tracks.service';
import { AlbumsService } from './../albums/albums.service';
import { ArtistsService } from './../artists/artists.service';
import { FavouriteSchema } from './../../database/entities/favourite.entity';
import { checkUuid } from './../../utils/utils';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { albumSchema } from 'src/database/entities/album.entity';
import { artistSchema } from 'src/database/entities/artist.entity';
import { trackSchema } from 'src/database/entities/track.entity';
import { Repository } from 'typeorm';

export type favEntity = 'Artists' | 'Albums' | 'Tracks';
type serviceEntity = ArtistsService | AlbumsService | TracksService;
@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(artistSchema)
    private readonly artistsRepository: Repository<artistSchema>,
    @InjectRepository(trackSchema)
    private readonly tracksRepository: Repository<trackSchema>,
    @InjectRepository(albumSchema)
    private readonly albumsRepository: Repository<albumSchema>,
    @InjectRepository(FavouriteSchema)
    private readonly favouriteRepository: Repository<FavouriteSchema>,
  ) {}

  async findAll() {
    const favs = await this.favouriteRepository.findOne({
      where: {},
      relations: ['artists', 'albums', 'tracks'],
    });

    return favs || { artists: [], albums: [], tracks: [] };
  }

  async addEntity(typeOfEntity: favEntity, id: string) {
    const currentService: serviceEntity = this[`${typeOfEntity}Service`];

    try {
      const entity = await currentService.findOne(id);
      let favourite = await this.favouriteRepository.findOne({ where: {} });

      if (!favourite) {
        favourite = new FavouriteSchema();
      }
      if (!favourite[typeOfEntity]) {
        favourite[typeOfEntity] = [];
      }

      favourite[typeOfEntity].push(entity as any);
      await this.favouriteRepository.save(favourite);

      return id;
    } catch {
      throw new UnprocessableEntityException();
    }
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

  async removeEntity(typeOfEntity: favEntity, id: string) {
    const currentFavourites = await this.findAll();

    const findEntityByIndex = currentFavourites[typeOfEntity].findIndex(
      (entity) => entity.id === id,
    );

    if (findEntityByIndex === -1) {
      throw new NotFoundException();
    }

    delete currentFavourites[typeOfEntity][findEntityByIndex];
    await this.favouriteRepository.save(currentFavourites);

    return id;
  }
}
