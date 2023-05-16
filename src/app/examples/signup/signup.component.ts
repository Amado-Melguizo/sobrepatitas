import { User } from '../user';
import { AuthService } from '../user-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    titulo: string = 'Por favor Sign In!';
    usuario: User;
    focus;
    focus1;
    constructor(private authService: AuthService, private router: Router) {
      this.usuario = new User();
    }
  
    ngOnInit() {
      if (this.authService.isAuthenticated()) {
        Swal.fire('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
        this.router.navigate(['/clientes']);
      }
    }
  
    login(): void {
      console.log(this.usuario);
      if (this.usuario.username == null || this.usuario.password == null) {
        Swal.fire('Error Login', 'Username o password vacías!', 'error');
        return;
      }
  
      this.authService.login(this.usuario).subscribe(response => {
        console.log(response);
  
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario = this.authService.usuario;
        this.router.navigate(['/clientes']);
        Swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
        this.router.navigate(['/']);
      }, err => {
        if (err.status == 400) {
          Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
        }
      }
      );
    }
  
  }
  