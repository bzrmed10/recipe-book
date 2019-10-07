import { DataStorageService } from '../shared/data-storage.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private dataStorageServie : DataStorageService) { }

  ngOnInit() {
  }
  onSaveData(){
    this.dataStorageServie.saveData();
  }

  onfetchData(){
    this.dataStorageServie.fetchData().subscribe();
  }
}
