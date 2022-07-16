import { Injectable } from '@nestjs/common';
import { Album } from 'src/modules/albums/entities/album.entity';
import { Artist } from 'src/modules/artists/entities/artist.entity';
import { Favourite } from 'src/modules/favourites/entities/favourite.entity';
import { Track } from 'src/modules/tracks/entities/track.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class InMemoryDB {
  favourites: Favourite = {
    artists: [],
    albums: [],
    tracks: [],
  };
  artists: Artist[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  users: User[] = [];
  private static instance;

  constructor() {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = this;
    }

    Object.assign(this, InMemoryDB.instance);
  }
}
