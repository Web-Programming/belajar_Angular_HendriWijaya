import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  formError: string = "";

  // Inject Router dan service authentication
  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  submitRegister(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Form submitted:', formData);

      // Contoh pemanggilan service atau navigasi
      // this.authService.register(formData).subscribe(response => {
      //   this.router.navigate(['/login']);
      // }, error => {
      //   this.formError = 'Failed to register, please try again later.';
      // });

      // Untuk sementara, arahkan ke halaman sukses
      this.router.navigate(['/success']);
    } else {
      this.formError = 'All fields are required, please try again';
    }
  }
}
