import { trackSchema } from './../../database/entities/track.entity';
import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { getValidatedEntity } from 'src/utils/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(trackSchema)
    private readonly tracksRepository: Repository<trackSchema>,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    const newTrack = this.tracksRepository.create(createTrackDto);
    return await this.tracksRepository.save(newTrack);
  }

  async findAll() {
    return await this.tracksRepository.find();
  }

  async findOne(id: string) {
    return await getValidatedEntity(id, this.tracksRepository, 'Track');
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const updatedTrack: any = await getValidatedEntity(
      id,
      this.tracksRepository,
      'Track',
    );
    updatedTrack.name = updateTrackDto.name;
    updatedTrack.duration = updateTrackDto.duration;
    if (updateTrackDto.artistId) {
      updatedTrack.artistId = updateTrackDto.artistId;
    }
    if (updateTrackDto.albumId) {
      updatedTrack.albumId = updateTrackDto.albumId;
    }
    return await this.tracksRepository.save(updatedTrack);
  }

  async remove(id: string) {
    await getValidatedEntity(id, this.tracksRepository, 'Track');
    await this.tracksRepository.delete(id);
  }
}
