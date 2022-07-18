import {
  Controller,
  Get,
  Post,
  Body,
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
    return this.favouritesService.addTrackToFav(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    return this.favouritesService.deleteTrackFromFav(id, true);
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    return this.favouritesService.addArtistToFav(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id') id: string) {
    return this.favouritesService.deleteArtistFromFav(id, true);
  }

  @Post('/album/:id')
  addAlbum(@Param('id') id: string) {
    return this.favouritesService.addAlbumToFav(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id') id: string) {
    return this.favouritesService.deleteAlbumFromFav(id, true);
  }

  @Get()
  findAll() {
    return this.favouritesService.findAll();
  }
}
