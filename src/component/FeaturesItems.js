import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

class FeaturesItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [], 
            update: false,
            idM: 1,
            currentURL: null,

            numberPage: 0,
			currentPage: 1,
			statePageStart: false,
			statePageFinish: true,
			itemsPage: []
        };
    }

    updatePage(currPage)
	{
        let curPage = Number(currPage);
		if(curPage >= 1 && curPage <= this.state.numberPage && this.state.numberPage != 0)
		{
			this.setState({
				currentPage: curPage
            });
            
            this.getPage(curPage);
            this.getDataBaseFromURLAndCurrentPage(curPage);

            if(curPage == 1)
            {
                this.setState({
                    statePageStart: false,
                    statePageFinish: true,
                });
            }

            if(curPage == this.state.numberPage)
            {
                this.setState({
                    statePageStart: true,
                    statePageFinish: false,
                });
            }
		}
        if(this.state.numberPage == 0)
        {
            this.setState({
				statePageStart: false,
                statePageFinish: false,
                itemsPage: []
			});
        }
    }
    
    getDataBaseFromURLAndCurrentPage(curPage)
    {
        if(this.state.currentURL)
            {
                fetch(this.state.currentURL+"/"+curPage)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            items: result
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                );
        } 
    }

	getPage(curPage)
	{
		let items = [];
		for(let i=2; i > 0; i--) // 2 trang trươc trang hien hanh 
		{
			if(Number(curPage)-i > 0)
			{
				let content={};
                content.page=Number(curPage)-i;
                content.class="page-item";
				items.push(content);
			}
		}
			//trang hien hanh
			let content={};
			content.page=Number(curPage);
			content.class="page-item active";
			items.push(content);

		for(let i=1; i <=2; i++) // 2 trang sau trang hien hanh 
		{
			if(Number(curPage)+i <= Number(this.state.numberPage))
			{
				let content={};
                content.page=Number(curPage)+i;
                content.class="page-item";
				items.push(content);
			}
		}
		this.setState({
			itemsPage: items
		});
	}

    eventAddCart (e) {
        e.preventDefault();
        // lấy id sản phẩm
        let id = e.currentTarget.dataset.id; 
        // get value cookie with key cart is object
        let shop = JSON.parse(localStorage.getItem('cart'));
        let cart = [];
        if(shop)
        {
            //lây danh sách da luu trong cookie
            cart = shop.cart;
        }
        

        if(cart)
        { 
            let kt = false;
            for(let i=0; i<cart.length; i++) // neu object da co thi tang so luong
            {
                if(cart[i].id === id)
                {
                    cart[i].soLuong++;
                    kt = true;
                    break;
                }
            }
            if(!kt) // neu object chua co thi them object vao
            {
                let content={};
                content.id=id;
                content.soLuong=1;
                cart.push(content);
            }
        }
        
        console.log(cart);
        // set value cooki with key = cart
        localStorage.setItem('cart', JSON.stringify({
            cart: cart
        }));
	}

    // load lại khi có update
    componentDidUpdate(prevProps, prevState) {
        if(this.props.urlProduct)
            {
                this.getNumberPageAndDataFromURL(this.props.urlProduct);

                this.setState({
                    currentPage: 1,
                    currentURL: this.props.urlProduct
                });

                var dispatch = this.props.dispatch;
                dispatch({type: 'URL_OUT'});
            }     
    }

    getNumberPageAndDataFromURL(url)
    {
        fetch(url+"/"+this.state.currentPage)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState({
                                isLoaded: true,
                                items: result,
                            });
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            });
                        }
                    );
        fetch(url)
                    .then(res => res.json())
                    .then(
                        (result) => {
                                this.setState({
                                    numberPage: result[0].kq,
                                    isLoaded: true,
                                });
                                this.updatePage(this.state.currentPage);
                            },
                            (error) => {
                                this.setState({
                                    error,
                                    isLoaded: true
                                });
                            }
                    );
    }
     
        componentDidMount() {
            if(this.state.currentURL === null)
            {
                let url = "https://shopdtonline.herokuapp.com/api/products/type/1";
                this.getNumberPageAndDataFromURL(url);
                this.setState({
                    currentURL: url
                });
            }
        }
        
    updateIDProductDetail(event)
    {
        // event.preventDefault();
        const id = event.currentTarget.dataset.id; //get id 
        localStorage.setItem("idProductDetail", JSON.stringify({id: id}));
    }

    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="text-center"><h4>Loading...</h4></div>;
        } else {
            return (
            <div>
                <div class="features_items">
						<h2 class="title text-center">Features Items</h2>
						{items.map(item => (
                        <div class="col-sm-4">
                        <div class="product-image-wrapper">
                            <div style={{height:363}} class="single-products">
                                    <div class="productinfo text-center">
                                        <img style={{width:150, height:150, marginTop:50}} src={item.linkAnh} alt="" />
                                        <h2><NumberFormat value={item.Gia} displayType={'text'} thousandSeparator={true} />Đ</h2>
                                        <p>{item.tenMay}</p>
                                        <a  class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                                    </div>
                                    <div class="product-overlay">
                                        <div class="overlay-content">
                                            <p>Nhà sản xuất: {item.NSX}</p>
                                            <p>Hệ điều hành: {item.HDH}</p>
                                            <p>CPU: {item.CPU}</p>
                                            <p>RAM: {item.RAM}</p>
                                            <p>PIN: {item.PIN}</p>
                                            <p>CAMERA: {item.CAMERA}</p>
                                            <h2><NumberFormat value={item.Gia} displayType={'text'} thousandSeparator={true} />Đ</h2>
                                            <p>{item.tenMay}</p>
                                            <a data-id ={item.idM} class="btn btn-default add-to-cart" onClick={this.eventAddCart.bind(this)}><i class="fa fa-shopping-cart"></i>Add to cart</a>
                                        </div>
                                    </div>
                            </div>
                            <div class="choose">
                                <ul class="nav nav-pills nav-justified">
                                    <li><Link to={`/product/${item.Key}`} data-id={item.idM}><i class="fa fa-plus-square"></i>Xem chi tiết</Link></li>
                                    <li><a href="#"><i class="fa fa-plus-square"></i>Add to compare</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    ))}
					</div>
					
					<div class="row text-center">
						<nav aria-label="Page navigation example">
							<ul class="pagination">
								{this.state.statePageStart ? <li class="page-item"><Link class="page-link" onClick={()=>this.updatePage(1)} to={"/"}>&lt;&lt;</Link></li> : null}
								{this.state.statePageStart ? <li class="page-item"><Link class="page-link" onClick={()=>this.updatePage(this.state.currentPage-1)} to={"/"}>&lt;</Link></li> : null}
								{this.state.itemsPage.map(item => (
								<li class={item.class}><Link class="page-link" onClick={()=>this.updatePage(item.page)} to={"/"}>{item.page}</Link></li>
								))}
								{this.state.statePageFinish ? <li class="page-item"><Link class="page-link" onClick={()=>this.updatePage(this.state.currentPage+1)} to={"/"}>&gt;</Link></li> : null}
								{this.state.statePageFinish ? <li class="page-item"><Link class="page-link" onClick={()=>this.updatePage(this.state.numberPage)} to={"/"}>&gt;&gt;</Link></li> : null}
							</ul>
						</nav>
					</div>
                </div>
            );
        }
    }
};


function mapStateToProps(state) {
    return {
        username: state.username,
        token: state.token,
        urlProduct: state.urlProduct,
        idProductDetail: state.idProductDetail
    };
}


export default connect(mapStateToProps) (FeaturesItems);