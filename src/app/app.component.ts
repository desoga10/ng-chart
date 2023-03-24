import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from './service/chart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-chart';
  chart: any = [];
  result: any;
  coinPrice: any;
  coinName: any;

  constructor(private service: ChartService) {}

  ngOnInit() {
    this.service.cryptoData().subscribe((res) => {
      this.result = res;
      this.coinPrice = this.result.data.coins.map((coins: any) => coins.price);
      this.coinName = this.result.data.coins.map((coins: any) => coins.name);

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.coinName,
          datasets: [
            {
              data: this.coinPrice,
              borderColor: '#3e95cd',
              label: 'Coin Price',
              backgroundColor: 'rgba(93, 175, 89, 0.1)',
              borderWidth: 1,
            },
          ],
        },
      });
    });
  }
}
