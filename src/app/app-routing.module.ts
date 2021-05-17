import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'hero', loadChildren: () => import('./modules/hero/hero.module').then(m=>m.HeroModule) },
  { path: '**', redirectTo: 'hero', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
