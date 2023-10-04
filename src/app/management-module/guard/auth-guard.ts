import { Injectable } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(private router: Router) { }

    canActivate: CanActivateFn = () => {
        const isAuthenticated = Boolean(localStorage.getItem('isAuthenticated'));

        if (isAuthenticated) {
            return true;
        }

        return new Promise<boolean>((resolve) => {
            console.log('User not authenticated. Navigating to signin page.');
            this.router.navigate(['/account/signin']);
            resolve(false);
        });
    }
}
