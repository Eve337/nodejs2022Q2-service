import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumsModule } from './modules/albums/albums.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { FavouritesModule } from './modules/favourites/favourites.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { UsersModule } from './modules/users/users.module';
import { InMemoryDB } from './utils/InMemoryDB';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavouritesModule,
    ConfigModule.forRoot(),
    DatabaseModule,
  ],
  controllers: [],
  providers: [InMemoryDB],
})
export class AppModule {}
