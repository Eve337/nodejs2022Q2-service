import { Album } from 'src/modules/albums/model/album';
import { Artist } from 'src/modules/artists/model/artist';
import { Favourites } from 'src/modules/favourites/model/favourtite';
import { Track } from 'src/modules/tracks/model/track';
import { User } from 'src/modules/users/model/user';
import { Injectable } from '@nestjs/common';

export const users: User[] = [];
export const artists: Artist[] = [];
export const track: Track[] = [];
export const albums: Album[] = [];
export const favs: Favourites = {
  artists: [],
  albums: [],
  tracks: [],
};

@Injectable()
export class InMemoryDB {
  static favourites: Favourites = {
    artists: [],
    albums: [],
    tracks: [],
  };
  static artists: Artist[] = [];
  static tracks: Track[] = [];
  static albums: Album[] = [];
  static users: User[] = [];
  private static instance;

  constructor() {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = this;
    }

    Object.assign(this, InMemoryDB.instance);
  }
}
