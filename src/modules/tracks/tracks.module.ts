import { ArtistsService } from './../artists/artists.service';
import { FavouritesService } from './../favourites/favourites.service';
import { AlbumsService } from './../albums/albums.service';
import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';

@Module({
  controllers: [TracksController],
  providers: [TracksService, AlbumsService, FavouritesService, ArtistsService],
})
export class TracksModule {}
