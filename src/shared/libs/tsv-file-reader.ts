import {readFileSync} from 'node:fs';

import {FileReader} from './file-reader.interface';
import {Offer} from '../types/offer.type';
import {City} from '../types/city.enum';
import {HouseType} from '../types/house-type.enum';
import {Facilities} from '../types/facilities.type';

export class TsvFileReader implements FileReader{
  private rawData = '';

  constructor(private readonly filename: string) {
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): Offer[] {
    if(!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
        title,
        description,
        postDate,
        city,
        previewPath,
        imagePaths,
        isPremium,
        isFavorites,
        rating,
        houseType,
        roomsCount,
        guestCount,
        rentalCost,
        facilities,
        user,
        commentsCount,
        coordinates
      ]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city: City[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
        previewPath,
        imagePaths: imagePaths.split(';'),
        isPremium: isPremium === 'true',
        isFavorites: isFavorites === 'true',
        rating: Number(rating),
        houseType: HouseType[houseType as 'apartament' | 'house' | 'room' | 'hotel' ],
        roomsCount: Number(roomsCount),
        guestCount: Number(guestCount),
        rentalCost: Number(rentalCost),
        facilities: facilities as Facilities,
        user,
        commentsCount: Number(commentsCount),
        coordinates: coordinates.split(';').map(Number) as [number, number]
      }));
  }
}
