import { LoaderService } from './../../services/loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading = false;
  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((res: boolean) => {
      this.loading = res;
    });
  }
  ngOnInit(): void {
  }
}
