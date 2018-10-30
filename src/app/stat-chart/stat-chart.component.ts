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
    let stats: number[] = this.poke.stats;
    stats.shift();
    this.radarChartData = [
      {data: stats, label: 'Stats'}
    ];
  }
  ngOnChanges(){
    let stats: number[] = this.poke.stats;
    stats.shift();
    this.radarChartData = [
      {data: stats, label: 'Stats'}
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
