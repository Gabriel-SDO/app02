import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Importar Firebase Guards
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Define redirecionadores
const toLogin = () => redirectUnauthorizedTo(['user/login']);   // Usuário  não logado
const isLogged = () => redirectLoggedInTo(['home/title/asc']);  // Usuário logado

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/title/asc',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'home/:sort/:order',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },
  {
    path: 'new',
    loadChildren: () => import('./pages/new/new.module').then(m => m.NewPageModule),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'delete/:id',
    loadChildren: () => import('./pages/delete/delete.module').then(m => m.DeletePageModule),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./pages/edit/edit.module').then(m => m.EditPageModule),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },
  {
    path: 'aboutview/:id',
    loadChildren: () => import('./pages/aboutview/aboutview.module').then(m => m.AboutviewPageModule)
  },
  {
    path: 'user/login',
    loadChildren: () => import('./user/login/login.module').then(m => m.LoginPageModule),
    // Somente se não está logado
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: isLogged }
  },
  {
    path: 'user/logout',
    loadChildren: () => import('./user/logout/logout.module').then(m => m.LogoutPageModule),
    // Somente para usuários logados
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: toLogin }
  },

  // SEMPRE A ÚLTIMA ROTA
  {
    path: '**',
    loadChildren: () => import('./pages/e404/e404.module').then(m => m.E404PageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
