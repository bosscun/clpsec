import { Injectable } from '@nestjs/common';
import { DataChartDto } from './dto/data-chart.dto';
import { DataClickDto } from './dto/data-click.dto';
import { ReceiveClickDto } from './dto/receive-click.dto';
import { ResponseDataDto } from './dto/response-data.dto';
import * as _ from 'lodash';
const BLUE = 'blue';
const ORANGE = 'orange';

@Injectable()
export class EventsService {
  dataClick: DataClickDto = {
    orange: 0,
    blue: 0,
  };

  responseData: ResponseDataDto = {
    orange: [],
    blue: [],
  };

  startTime = 0;
  flag = false;

  receiveClick(receiveClickDto: ReceiveClickDto) {
    if (!this.flag) {
      this.flag = true;
      this.startTime = Math.round(Date.now() / 1000);
      this.responseData = { orange: [], blue: [] };
      this.dataClick = { orange: 0, blue: 0 };
    }
    if (receiveClickDto.color === BLUE) {
      this.dataClick.blue++;
      this.responseData.blue.push(
        Math.round(Date.now() / 1000) - this.startTime,
      );
    } else if (receiveClickDto.color === ORANGE) {
      this.dataClick.orange++;
      this.responseData.orange.push(
        Math.round(Date.now() / 1000) - this.startTime,
      );
    }
    return this.dataClick;
  }

  getData(data: _.Dictionary<number>, index: number) {
    const value = _.get(data, index);
    return value ? value : 0;
  }

  async handleChart() {
    const dataChart: Array<DataChartDto> = [];
    if (this.flag) {
      this.flag = false;
      const blue = _.countBy(this.responseData.blue);
      const orange = _.countBy(this.responseData.orange);
      for (let i = 0; i < 5; i++) {
        const blueValue = this.getData(blue, i);
        const orangeValue = this.getData(orange, i);
        dataChart.push({
          name: i.toString(),
          blue: blueValue,
          orange: orangeValue,
        });
      }
      return dataChart;
    }
    return null;
  }
}
