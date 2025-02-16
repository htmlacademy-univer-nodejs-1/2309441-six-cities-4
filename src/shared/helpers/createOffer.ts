import {City, Facilities, HouseType, Offer} from '../types';

export function createOffer(offerData: string): Offer {
  const [
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
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    postDate: new Date(postDate),
    city: City[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
    previewPath,
    imagePaths: imagePaths.split('; '),
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
    coordinates: coordinates.split('; ').map(Number) as [number, number]
  };
}
