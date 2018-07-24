import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RoutingConstants } from './../../../misc/app.routes.constants';

@Component({
  selector: 'forgot-newpwd',
  templateUrl: './forgotpwd.newpwd.component.html'
})

export class ForgotNewPwdComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }
}
