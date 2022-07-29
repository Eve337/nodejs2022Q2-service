import { artistSchema } from './../../database/entities/artist.entity';
import { trackSchema } from './../../database/entities/track.entity';
import { albumSchema } from './../../database/entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { FavouriteSchema } from 'src/database/entities/favourite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavouriteSchema,
      albumSchema,
      trackSchema,
      artistSchema,
    ]),
  ],
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule {}
