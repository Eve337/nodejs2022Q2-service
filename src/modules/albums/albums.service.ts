import { FavouritesService } from './../favourites/favourites.service';
import { removeEntityAFromEntityB } from './../../utils/utils';
import { TracksService } from './../tracks/tracks.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/utils/InMemoryDB';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { getValidatedEntity, removeEntity } from 'src/utils/utils';
@Injectable()
export class AlbumsService {
  db: typeof InMemoryDB;
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
    @Inject(forwardRef(() => FavouritesService))
    private readonly favService: FavouritesService,
  ) {
    this.db = InMemoryDB;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      ...createAlbumDto,
      id: uuidv4(),
    };

    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    return `This action returns a #${id} album`;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum: UpdateAlbumDto = getValidatedEntity(
      id,
      this.db.albums,
      'Album',
    );
    updatedAlbum.name = updateAlbumDto.name;
    updatedAlbum.year = updateAlbumDto.year;
    if (updatedAlbum.artistId) updatedAlbum.artistId = updateAlbumDto.artistId;
    return updatedAlbum;
  }

  remove(id: string) {
    getValidatedEntity(id, this.db.albums, 'Album');
    this.db.users = removeEntity(id, this.db.albums);
    this.trackService.removeAlbumIdFromTrack(id);
    this.favService.deleteAlbumFromFav(id);
  }

  removeArtistFromAlbum(id: string) {
    removeEntityAFromEntityB(id, this.db.albums, 'artistId');
  }
}
