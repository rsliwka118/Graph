import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/services/graph.service';

@Component({
  selector: 'app-incidence-matrix',
  templateUrl: './incidence-matrix.component.html',
  styleUrls: ['./incidence-matrix.component.scss']
})
export class IncidenceMatrixComponent implements OnInit {

  constructor(public graphService: GraphService) { }

  ngOnInit(): void {
  }

}
