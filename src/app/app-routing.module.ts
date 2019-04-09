import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';

import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

const routes: Routes = [
  {path: 'auth', loadChildren: './modules/authorization/authorization.module#AuthorizationModule'},
  {path: 'chat', canActivate: [AuthGuard], loadChildren: './modules/chat/chat.module#ChatModule'},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
