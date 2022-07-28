import { albumSchema } from './../../database/entities/album.entity';
import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { getValidatedEntity } from 'src/utils/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(albumSchema)
    private readonly albumsRepository: Repository<albumSchema>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = this.albumsRepository.create(createAlbumDto);
    return await this.albumsRepository.save(newAlbum);
  }

  async findAll() {
    return await this.albumsRepository.find();
  }

  async findOne(id: string) {
    return await getValidatedEntity(id, this.albumsRepository, 'Album');
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum: any = await getValidatedEntity(
      id,
      this.albumsRepository,
      'Album',
    );
    updatedAlbum.name = updateAlbumDto.name;
    updatedAlbum.year = updateAlbumDto.year;
    if (updateAlbumDto.artistId)
      updatedAlbum.artistId = updateAlbumDto.artistId;
    return await this.albumsRepository.save(updateAlbumDto);
  }

  async remove(id: string) {
    getValidatedEntity(id, this.albumsRepository, 'Album');
    await this.albumsRepository.delete(id);
  }
}
