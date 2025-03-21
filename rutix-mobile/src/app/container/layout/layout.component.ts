import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import {library, playCircle, radio, search} from "ionicons/icons";
import { IonTabs } from '@ionic/angular/standalone';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent  implements OnInit {

  constructor() {
    addIcons({ library, playCircle, radio, search });
  }

  ngOnInit() {}

}
