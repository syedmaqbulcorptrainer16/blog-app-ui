import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../services/post.service';
import { ToastService } from '../services/toast.service';
import { CategoryService } from '../services/category.service';
import { CreatePostModelComponent } from './create-post-model/create-post-model.component';

@Component({
  selector: 'app-post',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  post$?: Observable<any>;
  categories: any;
  posts$!: Observable<any>;
  constructor(
    private postService: PostService,
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getPosts();
    this.categoryService.getCategory().subscribe(res => {
      this.categories = res;
    });

  }

  getPosts() {
    console.log('Calling...');
    this.posts$ = this.postService.getPosts();
  }

  goToPost(post: any) {
    this.router.navigate(['post', post.id]);
  }

  openPostDialog(post?: any, edit?: boolean) {
    this.dialog
      .open(CreatePostModelComponent, {
        height: '70%',
        width: '45%',
        data: {
          title: edit ? 'Update' : 'Create',
          edit,
          post,
          categories: this.categories,
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          if (edit) {
            this.postService
              .updatePost(post.id, { ...post, ...data })
              .subscribe(() => {
                this.getPosts();
                this.toastService.success('Post Updated Successfully.')
              });
          } else {
            this.postService
              .addPost({ ...data, comments: [] })
              .subscribe(() => {
                this.getPosts();
                this.toastService.success('Post Created Successfully.')

              });
          }
        }
      });
  }

  deletePost(post: any) {
    this.postService.deletePost(post.id).subscribe(
      (res) => {
        console.log('Calling...', res);
        this.getPosts();
        this.toastService.success('Post Deleted Successfully');

      },
      (err) => {
        console.log(err);
        this.getPosts();
        this.toastService.success('Post Deleted Successfully');
      },
      () => {
        this.getPosts();
      }
    );
  }
}
