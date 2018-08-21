import { Component, OnInit } from '@angular/core';
import { ComixService } from '../comix.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ComixEditModel } from '../../../models/comix-edit.model';

@Component({
  selector: 'app-comix-delete',
  templateUrl: './comix-delete.component.html',
  styleUrls: ['./comix-delete.component.css']
})
export class ComixDeleteComponent implements OnInit {


  public comix: ComixEditModel;

  constructor(
    private comixService: ComixService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  private validateModel() {

    if (this.comix.name === "") {
      this.toastr.error('Invalid name input!', "Error!")
      return false;
    }
    else if (this.comix.description === "") {
      this.toastr.error('Invalid description input!', "Error!")
      return false;
    }
    else if (this.comix.image === "") {
      this.toastr.error('Invalid image input!', "Error!")
      return false;
    }
    else if (this.comix.date === "") {
      this.toastr.error('Invalid date input!', "Error!")
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

  deleteComix() {
    this.comixService.deleteComix(this.comix._id)
      .then(() => {
        this.toastr.success("Comix deleted sucessfully!", "Success!");
        this.router.navigate(['/comix/all'])
      }).catch(err => this.toastr.error(err.responseJSON.error, "Error!"));
  }
}