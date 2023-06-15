import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Socio } from 'src/app/models/socio';
import { SocioService } from 'src/app/services/socio.service';

@Component({
  selector: 'app-listar-socio',
  templateUrl: './listar-socio.component.html',
  styleUrls: ['./listar-socio.component.css']
})
export class ListarSocioComponent implements OnInit{
  listaSocios: Socio[] = [];
  enlace: String = "";

  constructor(private _socioService: SocioService,
        private toastr: ToastrService) {}

  ngOnInit(): void {
    this.obtenerSocios();
  }

  obtenerSocios(){
    this._socioService.getSocios().subscribe(data => {
      console.log(data);
      this.listaSocios = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarSocio(id: any){
    this._socioService.eliminarSocio(id).subscribe(data => {
      this.toastr.error('El socio ha sido eliminado con éxito' , 'Socio eliminado')
      this.obtenerSocios();
    }, error =>{
      console.log(error);
    })
  }

  ObtenerInforme() {
    this._socioService.getInformeSocios().subscribe(data => {
      const enlace = data.enlace; // Obtener la URL del enlace desde la propiedad "enlace"
      window.open(enlace, '_blank'); // Abrir el enlace en una nueva pestaña o ventana
    }, error => {
      console.log(error);
    });
  }
  

}
