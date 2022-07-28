import { trackSchema } from './../../database/entities/track.entity';
import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([trackSchema])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
