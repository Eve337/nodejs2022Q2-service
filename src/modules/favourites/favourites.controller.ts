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
    return this.favouritesService.addEntity('tracks', id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    return this.favouritesService.removeEntity('tracks', id);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    return this.favouritesService.addEntity('artists', id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    return this.favouritesService.removeEntity('artists', id);
  }

  @Post('/album/:id')
  addAlbum(@Param('id') id: string) {
    return this.favouritesService.addEntity('albums', id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    return this.favouritesService.removeEntity('albums', id);
  }

  @Get()
  findAll() {
    return this.favouritesService.findAll();
  }
}
