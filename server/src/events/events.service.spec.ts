import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import * as _ from 'lodash';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getData', () => {
    it('should be return 0', () => {
      const data: _.Dictionary<number> = {};
      data[0] = 1;
      data[1] = 0;
      data[2] = 4;
      data[3] = 3;
      data[4] = 2;
      expect(service.getData(data, 5)).toEqual(0);
    });

    it('should be return right number', () => {
      const num = 2;
      const data: _.Dictionary<number> = {};
      data[0] = 1;
      data[1] = 0;
      data[2] = 4;
      data[3] = num;
      data[4] = 2;
      expect(service.getData(data, 3)).toEqual(num);
    });
  });

  describe('receiveClick', () => {
    it('should be return data', () => {
      expect(service.receiveClick({ color: 'blue' })).toEqual({
        orange: 0,
        blue: 1,
      });
    });
    it('should be return data', () => {
      expect(service.receiveClick({ color: 'orange' })).toEqual({
        orange: 1,
        blue: 0,
      });
    });

    it('should be return data', () => {
      expect(service.receiveClick({ color: 'test' })).toEqual({
        orange: 0,
        blue: 0,
      });
    });
  });

  describe('handleChart', () => {
    it('should be return data', async () => {
      service.flag = true;
      service.responseData = {
        orange: [0, 0, 0, 1, 1, 2, 2, 3, 4],
        blue: [1, 2, 3, 4, 4],
      };
      expect(await service.handleChart()).toEqual([
        { name: '0', blue: 0, orange: 3 },
        { name: '1', blue: 1, orange: 2 },
        { name: '2', blue: 1, orange: 2 },
        { name: '3', blue: 1, orange: 1 },
        { name: '4', blue: 2, orange: 1 },
      ]);
    });

    it('should be return data witth blue []', async () => {
      service.flag = true;
      service.responseData = {
        orange: [0, 0, 0, 1, 1, 2, 2, 3, 4],
        blue: [],
      };
      expect(await service.handleChart()).toEqual([
        { name: '0', blue: 0, orange: 3 },
        { name: '1', blue: 0, orange: 2 },
        { name: '2', blue: 0, orange: 2 },
        { name: '3', blue: 0, orange: 1 },
        { name: '4', blue: 0, orange: 1 },
      ]);
    });

    it('should be return null witth flag false', async () => {
      service.flag = false;
      service.responseData = {
        orange: [0, 0, 0, 1, 1, 2, 2, 3, 4],
        blue: [],
      };
      expect(await service.handleChart()).toEqual(null);
    });
  });
});
