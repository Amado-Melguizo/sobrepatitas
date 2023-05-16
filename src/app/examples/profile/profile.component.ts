import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user-service.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    constructor(public authService: AuthService) { }

    ngOnInit() {}

}
