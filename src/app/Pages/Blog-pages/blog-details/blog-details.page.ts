import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../../Service/blog.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-blog-details',
    templateUrl: './blog-details.page.html',
    styleUrls: ['./blog-details.page.scss'],
})
export class BlogDetailsPage implements OnInit {
    private blogId: number;
    blogData: any;

    constructor(private blogServ: BlogService,
                private route: ActivatedRoute,
    ) {
        this.route.params.subscribe(
            params => {
                this.blogId = params.id;
            }
        );
    }

    ngOnInit() {
        this.blogServ.getBlogByIdProvider(this.blogId)
            .subscribe(data =>
                this.blogData = data.data
    );
    }

}
