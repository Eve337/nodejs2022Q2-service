import { Module } from '@nestjs/common';
import { AlbumsModule } from './modules/albums/albums.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { FavouritesModule } from './modules/favourites/favourites.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavouritesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
