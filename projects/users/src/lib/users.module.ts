import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserNameByIdPipe } from './pipes/user-name-by-id.pipe';

@NgModule({
  declarations: [UserNameByIdPipe],
  imports: [CommonModule],
  exports: [UserNameByIdPipe],
})
export class UsersModule {}
