import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './containers/post-list/post-list.component';
import { PostComponent } from './containers/post/post.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', pathMatch: 'full', component: PostComponent },
  { path: 'post/:id', pathMatch: 'full', component: PostListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
