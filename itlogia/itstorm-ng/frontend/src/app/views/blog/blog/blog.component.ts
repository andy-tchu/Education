import {Component, OnInit} from '@angular/core';
import {ActiveParamsType} from "../../../types/active-params.type";
import {ArticleService} from "../../../shared/services/article.service";
import {ArticleCardType} from "../../../types/article-card.type";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryType} from "../../../types/category.type";
import {debounceTime} from "rxjs";
import {ActiveParamsUtils} from "../../../shared/utils/active-params.utils";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articles: ArticleCardType[] = [];
  categories: CategoryType[] = [];
  activeParams: ActiveParamsType = {categories: []};
  appliedFilters: CategoryType[] = [];
  filterOpen = false;
  pages: number[] = [];


  constructor(private articleService: ArticleService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.categories = data;

        this.activatedRoute.queryParams
          .pipe(
            debounceTime(1000)
          )
          .subscribe(params => {
            this.activeParams = ActiveParamsUtils.processParams(params);

            this.appliedFilters = [];
            this.activeParams.categories.forEach(url => {
              for (let i = 0; i < this.categories.length; i++) {
                if (url === this.categories[i].url) {
                  this.appliedFilters.push(this.categories[i]);
                }
              }
            });

            this.articleService.getArticles(this.activeParams)
              .subscribe(data => {
                this.pages = [];
                for (let i = 1; i <= data.pages; i++) {
                  this.pages.push(i);
                }
                this.articles = data.items;
              });
          });
      });
  }

  toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }

  clickedOutside(): void {
    this.filterOpen = false;
  }

  addCategoryToFilter(category: CategoryType) {
    this.activeParams.categories = [...this.activeParams.categories, category.url];

    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  removeCategoryFromFilter(category: CategoryType) {
    this.activeParams.categories = this.activeParams.categories.filter(item => item !== category.url);

    this.activeParams.page = 1;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/blog'], {
      queryParams: this.activeParams
    });
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/blog'], {
        queryParams: this.activeParams
      });
    }
  }
}
