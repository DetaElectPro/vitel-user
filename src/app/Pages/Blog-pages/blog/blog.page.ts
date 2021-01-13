import {Component, OnInit, ViewChild} from '@angular/core';
import {BlogService} from '../../../Service/blog.service';
import {IonInfiniteScroll} from '@ionic/angular';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.page.html',
    styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {

    @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

    private result: any;
    blogData: any;
    private perPage: any;
    private totalPage: any;
    private totalData: any;
    private page: any;
    private dataNotFound: boolean;
    private requestsSearch: string;

    constructor(
        private requestService: BlogService,
    ) {
    }

    ngOnInit() {
        this.loadRequests();

    }

    loadRequests() {
        this.requestService.getBlogProvider().subscribe(
            res => {
                this.result = res;
                this.blogData = this.result.data;
                this.perPage = this.result.per_page;
                this.page = this.result.current_page;
                this.totalData = this.result.total;
                this.totalPage = this.result.total_pages;
                this.blogData = this.result.data;
            },
            err => {
                console.log(err);
            });
    }


    searchRequests() {
        this.requestService.searchBlogProvider(this.requestsSearch).subscribe(
            resp => {
                if (resp.count > 0) {
                    this.blogData = resp;
                    this.dataNotFound = false;
                } else {
                    this.blogData = [];
                    this.dataNotFound = true;
                }
                // console.log('Search Result', resp);
            },
            err => {
                console.log(err);
            }
        );
    }

    clearSearch() {
        this.loadRequests();
    }


    loadData(event) {
        this.page = this.page + 1;
        setTimeout(() => {
            this.requestService.getBlogPerPageProvider(this.page)
                .subscribe(
                    res => {
                        this.result = res;
                        // this.blogData = this.result.data;
                        this.perPage = this.result.per_page;
                        this.totalData = this.result.total;
                        this.totalPage = this.result.total_pages;
                        const length = this.result.data.length;
                        for (let i = 0; i < length; i++) {
                            this.blogData.push(this.result.data[i]);
                        }
                    }),
                event.target.complete();
            this.toggleInfiniteScroll();
        }, 1000);

    }

    doRefresh(event) {
        this.loadRequests();

        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }
}
