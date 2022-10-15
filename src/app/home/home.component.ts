import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ProvinciaService } from '../services/provincia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
  }

}
