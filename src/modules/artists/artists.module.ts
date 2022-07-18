import { FavouritesService } from './../favourites/favourites.service';
import { AlbumsService } from './../albums/albums.service';
import { TracksService } from './../tracks/tracks.service';
import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, TracksService, AlbumsService, FavouritesService],
})
export class ArtistsModule {}
