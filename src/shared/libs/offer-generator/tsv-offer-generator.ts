import dayjs from 'dayjs';

import {City, Facilities, HouseType, MockServerData} from '../../types';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../helpers';

import {OfferGenerator} from './offer-generator.interface';

const MIN_PRICE = 100;
const MAX_PRICE = 100_000;

const FIRST_WEE_DAY = 1;
const LAST_WEE_DAY = 7;

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.title);
    const description = getRandomItem(this.mockData.description);
    const postDate = dayjs().subtract(generateRandomValue(FIRST_WEE_DAY, LAST_WEE_DAY), 'day').toISOString();
    const city = getRandomItem(Object.values(City));
    const previewPath = getRandomItem(this.mockData.images);
    const imagePaths = getRandomItems(this.mockData.images).join('; ');
    const isPremium = generateRandomValue(0, 1) ? 'true' : 'false';
    const isFavorites = generateRandomValue(0, 1) ? 'true' : 'false';
    const rating = generateRandomValue(1, 5);
    const houseType = getRandomItem(Object.values(HouseType));
    const roomsCount = generateRandomValue(1, 8);
    const guestCount = generateRandomValue(1, 8);
    const rentalCost = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const facilities = getRandomItem(Object.values(Facilities));
    const user = getRandomItem(this.mockData.user);
    const commentsCount = 0;
    const coordinates = [
      generateRandomValue(0, 10, 3),
      generateRandomValue(0, 10, 3)
    ].join('; ');

    return [
      title, description, postDate, city,
      previewPath, imagePaths, isPremium, isFavorites,
      rating, houseType, roomsCount, guestCount,
      rentalCost, facilities, user, commentsCount, coordinates
    ].join('\t');
  }
}
