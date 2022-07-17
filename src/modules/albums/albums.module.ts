import { FavouritesService } from './../favourites/favourites.service';
import { TracksService } from './../tracks/tracks.service';
import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, TracksService, FavouritesService],
})
export class AlbumsModule {}
