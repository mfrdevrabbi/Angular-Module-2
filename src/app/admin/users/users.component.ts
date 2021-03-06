import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {DataService} from "../../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ResetService} from "../../reset.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  users?: Array<User>;

  selectedUser?: User;
  userAction?:string;

  constructor(private data: DataService, private route: ActivatedRoute, private router: Router,private resetForm:ResetService) {
  }

  ngOnInit(): void {
    this.subscription = this.data.getUsers().subscribe(users => {
      this.users = users;
    })
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      this.userAction = params['action']
      if (id) {
        this.selectedUser = this.users?.find(user => user.id === +id);
      }
    })
  }

  setUser(id: number): void {
    this.router.navigate(['admin', 'users'], {queryParams: {id: id,action:'view'}})
  }

  addUser():void{
    this.selectedUser = new User();
    this.router.navigate(['admin', 'users'], {queryParams: {action:'add'}})
    this.resetForm.resetForm.emit(this.selectedUser)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
