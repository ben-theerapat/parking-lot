import { CarParkDto } from 'src/car/dto/car.dto';

export const carStub = (): CarParkDto => {
  return {
    plateNumber: 'abc-123',
    carSize: 'small',
  };
};
