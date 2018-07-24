import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RoutingConstants } from './../../../misc/app.routes.constants';

@Component({
  selector: 'forgot-main',
  templateUrl: './forgotpwd.main.component.html'
})

export class ForgotMainComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }
}
