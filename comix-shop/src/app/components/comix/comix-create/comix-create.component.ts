import { Component, OnInit } from '@angular/core';
import { ComixService } from '../comix.service';
import { ComixCreateModel } from '../../../models/comix-create.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comix-create',
  templateUrl: './comix-create.component.html',
  styleUrls: ['./comix-create.component.css']
})
export class ComixCreateComponent implements OnInit {

  public comix: ComixCreateModel;
  constructor(
    private comixService: ComixService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  private validateModel() {

    if (this.comix.name === null, this.comix.name === "", this.comix.name.trim() === "") {
      this.toastr.error('Invalid name input!', "Error!")
      return false;
    }
    else if (this.comix.description === null, this.comix.description === "", this.comix.description.trim() === "") {
      this.toastr.error('Invalid description input!', "Error!")
      return false;
    }
    else if (this.comix.image === null, this.comix.image === "", this.comix.image.trim() === "") {
      this.toastr.error('Invalid image input!', "Error!")
      return false;
    }
    else if (this.comix.date === null, this.comix.date === "", this.comix.date.trim() === "") {
      this.toastr.error('Invalid date input!', "Error!")
      return false;
    }
    else if (this.comix.price < 0) {
      this.toastr.error('Price must be greather than zero!', "Error!")
      return false;
    }
    else if (this.comix.stock < 0) {
      this.toastr.error('Stock must be greather than zero!', "Error!")
      return false;
    }

    return true;
  }

  ngOnInit() {
    this.comix = new ComixCreateModel("", "", "", 0, [], 0, "");
  }

  createComix() {

    if (this.validateModel()) {

      this.comix.comments = [];

      this.comixService.createComix(this.comix)
        .then(() => {
          this.toastr.success("Comix created sucessfully!", "Success!");
          this.router.navigate(['/comix/all'])
        }).catch(err => this.toastr.error(err.responseJSON.error, "Error!"));
    }
  }
}
