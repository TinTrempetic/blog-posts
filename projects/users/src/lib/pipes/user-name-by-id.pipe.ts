import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'projects/users';

@Pipe({
  name: 'userNameById',
})
export class UserNameByIdPipe implements PipeTransform {
  transform(value: any, users: User[]): string {
    if (!users.length) return value;

    const filteredUsers = users.filter((x) => x.id === value);

    if (!filteredUsers.length) return 'Unknown';

    return filteredUsers[0].name;
  }
}
