import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../pokemon';
@Component({
  selector: 'app-stat-chart',
  templateUrl: './stat-chart.component.html',
  styleUrls: ['./stat-chart.component.css']
})
export class StatChartComponent implements OnInit {
  @Input() poke: Pokemon;// = {id:0,name:"",stats:[1,1,1,1,1,1,1,1],type:[]};
  radarChartLabels:string[] = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'];
  stats: number[];
  chartOptions = {
    
    responsive: true,
    legend: {
      display: false
    },
    scale: {
      ticks: {
        display: false,
        min: 0,
        max: 160
      }
    }
  }
  radarChartData:any;
  constructor() { }
  ngOnInit() {
    this.stats = this.poke.stats.slice();
    this.stats.shift();
    this.radarChartData = [
      {data: this.stats, label: 'Stats'}
    ];
  }
  ngOnChanges(){
    this.stats = this.poke.stats.slice();
    this.stats.shift();
    this.radarChartData = [
      {data: this.stats, label: 'Stats'}
    ];
  }

  radarChartType:string = 'radar';
 
  // events
  chartClicked(e:any):void {
    console.log(e);
  }
 
  chartHovered(e:any):void {
    console.log(e);
  }
}
