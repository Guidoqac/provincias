import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(public provinciaService: ProvinciaService, private router: Router) {

    this.searchProvinciasForm.get('search')?.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap((v) => this.provinciaService.getProvincias(v))
    ).subscribe((v) => {
      this.provincias = v?.provincias
    })

  }

  ngOnInit(): void {
  }

  goToGuards() {
    this.router.navigate(["/guards"])
  }

}
