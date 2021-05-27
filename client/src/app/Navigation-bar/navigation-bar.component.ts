import { Component } from '@angular/core'; 
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
    
@Component({    
    selector:'app-navaiagation-bar',    
    templateUrl:'./navigation-bar.component.html',    
    styleUrls:['./navigation-bar.component.css']    
    }) 
    
export class NavigationBarComponent {    
    constructor(
        private route: ActivatedRoute,
      ) {}
/** 
    ngOnInit() {
        this.route.queryParams.subscribe(params => {
          this.name = params['name'];
        });
    } */
}   