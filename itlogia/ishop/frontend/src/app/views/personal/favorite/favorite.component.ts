import {Component, OnInit} from '@angular/core';
import {FavoriteService} from "../../../shared/services/favorite.service";
import {FavoriteType} from "../../../../types/favorite.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {environment} from "../../../../environments/environment";
import {CartService} from "../../../shared/services/cart.service";
import {CartType} from "../../../../types/cart.type";

@Component({
    selector: 'favorite',
    templateUrl: './favorite.component.html',
    styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

    products: FavoriteType[] = [];
    serverStaticPath = environment.serverStaticPath;
    cart: CartType | null = null;

    constructor(private favoriteService: FavoriteService,
                private cartService: CartService) {
    }

    ngOnInit(): void {
        this.favoriteService.getFavorites()
            .subscribe((data: FavoriteType[] | DefaultResponseType) => {
                if ((data as DefaultResponseType).error !== undefined) {
                    const error = (data as DefaultResponseType).message;
                    throw new Error(error);
                }

                this.products = data as FavoriteType[];

                this.cartService.getCart()
                    .subscribe((data: CartType | DefaultResponseType) => {
                        if ((data as DefaultResponseType).error != undefined) {
                            throw new Error((data as DefaultResponseType).message);
                        }
                        this.cart = data as CartType;

                        if (this.cart && this.cart.items.length > 0) {
                            this.products = this.products.map(product => {
                                if (this.cart) {
                                    const productInCart = this.cart.items.find(item => item.product.id === product.id)
                                    if (productInCart) {
                                        product.countInCart = productInCart.quantity;
                                    } else {
                                        product.countInCart = 0;
                                    }
                                }
                                return product;
                            })
                        }
                    });
            });
    }

    removeFromFavorites(id: string) {
        this.favoriteService.removeFavorite(id)
            .subscribe((data: DefaultResponseType) => {
                if (data.error) {
                    throw new Error(data.message);
                }

                this.products = this.products.filter(item => {
                    item.id !== id
                })
            });
    }

    updateCount(id: string, count: number) {

        this.products.map(item => {
            if(item.id === id) {
                item.countInCart = count;
            }
            return item;
        });

        if (this.cart) {
            this.cartService.updateCart(id, count)
                .subscribe((data: CartType | DefaultResponseType) => {
                    if ((data as DefaultResponseType).error != undefined) {
                        throw new Error((data as DefaultResponseType).message);
                    }
                    this.cart = data as CartType;
                });
        }
    }

}
