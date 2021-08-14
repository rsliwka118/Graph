import { Component, OnInit } from '@angular/core';
import { OptionsService } from 'src/app/core/services/options.service';

@Component({
    selector: 'app-representations',
    templateUrl: './representations.component.html'
})
export class RepresentationsComponent implements OnInit {

    constructor(public options: OptionsService) { }

    ngOnInit(): void {
    }

}
