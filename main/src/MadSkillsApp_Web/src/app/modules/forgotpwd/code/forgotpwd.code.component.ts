import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RoutingConstants } from './../../../misc/app.routes.constants';

@Component({
  selector: 'forgot-code',
  templateUrl: './forgotpwd.code.component.html'
})

export class ForgotCodeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }
}
