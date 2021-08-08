import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/services/graph.service';

@Component({
  selector: 'app-adjacency-list',
  templateUrl: './adjacency-list.component.html',
  styleUrls: ['./adjacency-list.component.scss']
})
export class AdjacencyListComponent implements OnInit {

  constructor(public graphService: GraphService) { }

  ngOnInit(): void {
  }

}
