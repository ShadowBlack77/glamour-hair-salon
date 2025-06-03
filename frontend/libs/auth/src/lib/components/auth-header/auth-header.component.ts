import { Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";
import { User } from "../../models/user.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'lib-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrl: './auth-header.component.css',
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class AuthHeaderComponent {

  private readonly _authService: AuthService = inject(AuthService);

  protected readonly user$: Observable<User | undefined> = this._authService.user$;

  logout(): void {
    this._authService.logout();
  }
}