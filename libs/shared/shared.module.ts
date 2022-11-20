import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [DropdownComponent, InputComponent, ButtonComponent],
  imports: [CommonModule],
  exports: [DropdownComponent, InputComponent, ButtonComponent],
})
export class SharedModule {}
