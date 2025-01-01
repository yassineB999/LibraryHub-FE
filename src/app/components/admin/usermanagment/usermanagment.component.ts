import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../../service/api/users.service';
import { User, UpdateUserDTO } from '../../../models/user.model';

@Component({
  selector: 'app-usermanagment',
  templateUrl: './usermanagment.component.html',
  styleUrls: ['./usermanagment.component.css']
})
export class UsermanagmentComponent implements OnInit {
  users: User[] = [];
  searchQuery: string = '';
  filteredUsers: User[] = [];
  updateDialogVisible: boolean = false;
  selectedUser: User | null = null;
  userTypes: any[] = [
    { label: 'STUDENT', value: 'STUDENT' },
    { label: 'TEACHER', value: 'TEACHER' },
    { label: 'ADMIN', value: 'ADMIN' }
  ];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.usersService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.filteredUsers = users;
      },
      (error) => console.error('Error fetching users:', error)
    );
  }

  openUpdateDialog(user: User): void {
    this.selectedUser = { ...user };
    this.updateDialogVisible = true;
  }

  updateUser(form: NgForm): void {
    if (form.valid && this.selectedUser) {
      const updateDto: UpdateUserDTO = {
        idUser: this.selectedUser._id,
        firstName: this.selectedUser.firstName,
        lastName: this.selectedUser.lastName,
        email: this.selectedUser.email,
        userType: this.selectedUser.userType
      };

      this.usersService.updateUser(updateDto).subscribe(
        () => {
          this.updateDialogVisible = false;
          this.fetchUsers(); // Refresh the user list
        },
        (error) => console.error('Error updating user:', error)
      );
    }
  }

  toggleUserStatus(user: User): void {
    if (user.isDeleted) {
      // TODO: Implement restore user logic
      console.log('Restore user:', user._id);
    } else {
      // TODO: Implement delete user logic
      console.log('Delete user:', user._id);
    }
  }

  searchUsers(): void {
    if (!this.searchQuery.trim()) {
      this.filteredUsers = this.users;
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.email.toLowerCase().includes(query) ||
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.userType.toLowerCase().includes(query)
    );
  }
}
