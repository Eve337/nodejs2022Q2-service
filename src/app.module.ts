import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AlbumsModule } from './modules/albums/albums.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { FavouritesModule } from './modules/favourites/favourites.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { UsersModule } from './modules/users/users.module';
import { InMemoryDB } from './utils/InMemoryDB';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    /* 
    TracksModule,
    AlbumsModule,
    FavouritesModule, */
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'aurora-postgres'>('TYPEORM_CONNECTION'),
        host: config.get<'string'>('TYPEORM_HOST'),
        username: config.get<'string'>('TYPEORM_USERNAME'),
        password: config.get<'string'>('TYPEORM_PASSWORD'),
        port: config.get<'number'>('TYPEORM_PORT'),
        entities: [__dirname + config.get<'string'>('TYPEORM_ENTITIES')],
        database: config.get<'string'>('TYPEORM_DATABASE'),

        migrations: [__dirname + config.get<'string'>('TYPEORM_MIGRATIONS')],
        migrationsRun: config.get('TYPEORM_MIGRATIONS_RUN'),
        autoLoadEntities: true,
        synchronize: config.get('TYPEORM_SYNCHRONIZE'),
        logging: config.get('TYPEORM_LOGGING'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
