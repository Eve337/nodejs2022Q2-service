import { artistSchema } from './../../database/entities/artist.entity';
import { trackSchema } from './../../database/entities/track.entity';
import { albumSchema } from './../../database/entities/album.entity';
import { favouriteSchema } from './../../database/entities/favourite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      favouriteSchema,
      albumSchema,
      trackSchema,
      artistSchema,
    ]),
  ],
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule {}
