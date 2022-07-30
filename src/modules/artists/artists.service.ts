import { checkUuid } from './../../utils/utils';
import { artistSchema } from './../../database/entities/artist.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { getValidatedEntity } from 'src/utils/utils';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(artistSchema)
    private readonly artistsRepository: Repository<artistSchema>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = this.artistsRepository.create(createArtistDto);
    return await this.artistsRepository.save(newArtist);
  }

  async findAll() {
    return await this.artistsRepository.find();
  }

  async findOne(id: string) {
    return await getValidatedEntity(id, this.artistsRepository, 'Artist');
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const updatedArtist: any = await getValidatedEntity(
      id,
      this.artistsRepository,
      'Artist',
    );
    updatedArtist.name = updateArtistDto.name;
    updatedArtist.grammy = updateArtistDto.grammy;
    console.log(updateArtistDto, updatedArtist);
    return await this.artistsRepository.save(updatedArtist);
  }

  async remove(id: string) {
    await getValidatedEntity(id, this.artistsRepository, 'Artist');
    await this.artistsRepository.delete(id);
  }
}
