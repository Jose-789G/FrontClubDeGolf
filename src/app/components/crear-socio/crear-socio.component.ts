import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Socio } from 'src/app/models/socio';
import { SocioService } from 'src/app/services/socio.service';

@Component({
  selector: 'app-crear-socio',
  templateUrl: './crear-socio.component.html',
  styleUrls: ['./crear-socio.component.css']
})


export class CrearSocioComponent implements OnInit{
  socioForm: FormGroup;
  titulo = 'Crear socio';
  id: string | null;
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _socioService: SocioService,
              private aRouter: ActivatedRoute) { 
    this.socioForm = this.fb.group({
      //En este caso solo haremos uso de validadores que indican que el campo es obligatorio
      id: ['', Validators.required],
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.esEditable();
  }

  agregarSocio(){

    const SOCIO: Socio = {
      idSocio: this.socioForm.get('id')?.value,
      dni: this.socioForm.get('dni')?.value,
      nombre: this.socioForm.get('nombre')?.value,
      apellidos: this.socioForm.get('apellidos')?.value
    }

    if(this.id !== null){
      //editamos producto

      this._socioService.editarSocio(this.id,SOCIO).subscribe(data => {
        this.toastr.info("¡El socio fue actualizado con éxito!",'Socio Actualizado')
        this.router.navigate(['/listar-socio'])
      }, error => {
        console.log(error);
        this.socioForm.reset();
      })


    }else{
      //agregamos producto
      //Prueba de generación del objeto
      console.log(SOCIO)
      //Método para guardar socios
      this._socioService.guardarSocio(SOCIO).subscribe(data => {
      //Mostramos una tostada sobre la acción acontecida y su estado
      this.toastr.success("¡El socio fue registrado con éxito!",'Socio Registrado')
      //Tras introducir un usuario navegaremos de nuevo al listado total de socios registrados
      this.router.navigate(['/listar-socio'])
      }, error => {
        console.log(error);
        this.socioForm.reset();
      })
    }
    
  
  }

  esEditable() {
    
    if(this.id !== null) {
      this.titulo = "Editar producto"
      this._socioService.obtenerSocio('/' + this.id).subscribe(data => {
        this.socioForm.setValue({
          id: data.idSocio,
          dni: data.dni,
          nombre: data.nombre,
          apellidos: data.apellidos,
        })
      })
    }
  }

}
