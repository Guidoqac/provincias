import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProvinciaService } from './services/provincia.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'provincias';

  searchProvinciasForm: FormGroup = new FormGroup({
    search: new FormControl('')
  })

  public provincias: Array<any> = [];

  constructor(public provinciaService: ProvinciaService) {

    this.searchProvinciasForm.get('search')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((v) => this.provinciaService.getProvincias(v))
    ).subscribe((v) => {
      console.log(v?.provincias.id, "holi");

      this.provincias = v?.provincias
    })

  }

  ngOnInit(): void {
    // this.provinciaService.getProvincias();
  }
}
