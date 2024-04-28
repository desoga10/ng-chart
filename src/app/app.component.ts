import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { ChartService } from './service/chart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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

      console.log(this.result);

      this.chart = new Chart('canvas', {
        type: 'bar',
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        },
        data: {
          labels: this.coinName,
          datasets: [
            {
              data: this.coinPrice,
              borderColor: 'yellow',
              label: 'Coin Price',
              backgroundColor: 'orange',
              borderWidth: 1,
            },
          ],
        },
      });
    });
  }
}
