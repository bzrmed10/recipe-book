import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipeApp';
  navigation ='recipe';

  onNavigate(feature : string){
    this.navigation = feature;
  }
}
