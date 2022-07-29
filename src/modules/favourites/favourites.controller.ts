import {
  Controller,
  Get,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post('/track/:id')
  addTrack(@Param('id') id: string) {
    return this.favouritesService.addEntity('Tracks', id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    return this.favouritesService.removeEntity('Tracks', id);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    return this.favouritesService.addEntity('Artists', id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    return this.favouritesService.removeEntity('Artists', id);
  }

  @Post('/album/:id')
  addAlbum(@Param('id') id: string) {
    return this.favouritesService.addEntity('Albums', id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    return this.favouritesService.removeEntity('Albums', id);
  }

  @Get()
  findAll() {
    return this.favouritesService.findAll();
  }
}
