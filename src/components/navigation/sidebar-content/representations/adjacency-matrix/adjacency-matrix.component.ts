import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/services/graph.service';

@Component({
    selector: 'app-adjacency-matrix',
    templateUrl: './adjacency-matrix.component.html',
    styleUrls: ['./adjacency-matrix.component.scss']
})
export class AdjacencyMatrixComponent implements OnInit {

    constructor(public graphService: GraphService) { }

  items = [
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:1, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:1, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:1, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:1, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:2, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] },
      {name:'Select', selected:1, options:[{ value:1 , name:'option 1' },{ value:2 , name:'option2' }] }

  ]

  ngOnInit(): void {
  }

}
