import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavouritesService } from './favourites.service';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post('/track/:id')
  addTrack(@Body() id: string) {
    return this.favouritesService.addTrackToFav(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Body() id: string) {
    return this.favouritesService.deleteTrackFromFav(id);
  }

  @Post('/artists/:id')
  addArtist(@Body() id: string) {
    return this.favouritesService.addArtistToFav(id);
  }

  @Delete('/artists/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Body() id: string) {
    return this.favouritesService.deleteArtistFromFav(id);
  }

  @Post('/track/:id')
  addAlbum(@Body() id: string) {
    return this.favouritesService.addAlbumToFav(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Body() id: string) {
    return this.favouritesService.deleteAlbumFromFav(id);
  }

  @Get()
  findAll() {
    return this.favouritesService.findAll();
  }
}
