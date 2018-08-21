import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ComixService } from '../comix.service';
import { ComixEditModel } from '../../../models/comix-edit.model';

@Component({
  selector: 'app-comix-edit',
  templateUrl: './comix-edit.component.html',
  styleUrls: ['./comix-edit.component.css']
})
export class ComixEditComponent implements OnInit {

  public comix: ComixEditModel;

  constructor(
    private comixService: ComixService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
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

    let id = this.route.snapshot.params["id"];

    this.comixService.getComixById(id)
      .then((comix: ComixEditModel) => {
        this.comix = comix;
      });
  }

  updateComix() {

    if (this.validateModel()) {
      this.comixService.updateComix(this.comix)
        .then(() => {
          this.toastr.success("Comix updated sucessfully!", "Success!");
          this.router.navigate(['/comix/all'])
        }).catch(err => this.toastr.error(err.responseJSON.error, "Error!"));
    }
  }

}
