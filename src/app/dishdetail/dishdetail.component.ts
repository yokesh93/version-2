import { Component, OnInit , Input , ViewChild } from '@angular/core';
import { FormBuilder , FormGroup , Validators, FormGroupDirective} from '@angular/forms';
import { Dish } from '../shared/dish';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  commentForm: FormGroup;
  @ViewChild(FormGroupDirective) commentFormDirective;
  newComment: Comment;

  formErrors = {
    'name': '',
    'comment': ''
  };

  validationMessages = {
  'name': {
     'required': 'Author Name is Required.',
    'minlength': 'Author Name must be at least 2 characters long.',
    'maxlength': 'Author Name cannot be more than 25 characters long.'
  },
  'comment': {
     'required': 'Comment is Required.'
  }
};

   constructor(private _dishService: DishService,
               private _location: Location,
               private _activatedRoute: ActivatedRoute,
               private _formbuilder: FormBuilder
              ) {
                this.createForm();
              }

  createForm() {
    this.commentForm = this._formbuilder.group({
      name: ['', [Validators.required , Validators.minLength(2) , Validators.maxLength(25)]],
      comment:  ['', Validators.required ],
      rating: 5,
      date : ''
    });
    this.commentForm.valueChanges.subscribe( data => this.onValueChanged(data));
    this.onValueChanged();
  }

  ngOnInit() {
    /* let id = +this._activatedRoute.snapshot.params['id']; */
    this._dishService.getDishIds()
        .subscribe(dishIds => this.dishIds = dishIds );

    this._activatedRoute.params
        .switchMap((params: Params) => this._dishService.getDish(+params['id']))
        .subscribe(dish => {
          this.dish = dish;
          this.setPrevNext(dish.id);
        });
  }

  setPrevNext(dishId: number) {
       const index = this.dishIds.indexOf(dishId);
       this.prev = this.dishIds[( this.dishIds.length + index - 1) % this.dishIds.length];
       this.next = this.dishIds[( this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
      this._location.back();
  }

  onValueChanged(data?: any) {
      if (!this.commentForm) {
       return;
    }
    const form = this.commentForm;

    for (const field in this.formErrors) {
       this.formErrors[field] = '';
       const control = form.get(field);
       if (  control  && control.dirty && !control.valid) {
           const messages = this.validationMessages[field];
           for (const key in control.errors) {
               this.formErrors[field] += messages[key] + ' ';
           }
       }
    }
 }

 onSubmit() {
  this.newComment = this.commentForm.value;
  const submitdate = new Date().toISOString();
  this.newComment.date = submitdate;
  this.dish.comments.push(this.newComment);
  this.commentFormDirective.resetForm({
    name: '',
    comment:  '',
    rating: 5,
    date : ''
  });
  this.newComment = null;
 }

}
