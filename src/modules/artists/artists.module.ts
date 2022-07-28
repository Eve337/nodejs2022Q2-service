import { artistSchema } from './../../database/entities/artist.entity';
import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([artistSchema])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
