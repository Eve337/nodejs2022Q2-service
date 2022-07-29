import { albumSchema } from './../../database/entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

@Module({
  imports: [TypeOrmModule.forFeature([albumSchema])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
