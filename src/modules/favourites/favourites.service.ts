import { Injectable } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';

@Injectable()
export class FavouritesService {
  create(createFavouriteDto: CreateFavouriteDto) {
    return 'This action adds a new favourite';
  }

  findAll() {
    return `This action returns all favourites`;
  }

  findOne(id: string) {
    return `This action returns a #${id} favourite`;
  }

  update(id: string, updateFavouriteDto: UpdateFavouriteDto) {
    return `This action updates a #${id} favourite`;
  }

  remove(id: string) {
    return `This action removes a #${id} favourite`;
  }
}
