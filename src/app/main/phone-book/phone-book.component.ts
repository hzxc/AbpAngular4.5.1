import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./phone-book.component.css']
})
export class PhoneBookComponent extends AppComponentBase implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

}
