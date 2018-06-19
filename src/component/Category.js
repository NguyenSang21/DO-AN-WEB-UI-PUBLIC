import React, { Component } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';


class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            itemsLoai: [],
            itemsHSX: [],
            itemsGia: [],
            isLoaded: false,
            goHome: false
        };
    }
    
    componentDidMount() {
        fetch("https://shopdtonline.herokuapp.com/api/type")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        itemsLoai: result,
                        isLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        error,
                        isLoaded: true
                    });
                }
            )
        fetch("https://shopdtonline.herokuapp.com/api/hsx")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        itemsHSX: result,
                        isLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        error,
                        isLoaded: true
                    });
                }
            )  
        let array = [
            {"id":0, "Gia":"Dưới 1 triệu", "giabd":0, "giakt":1000000},
            {"id":1, "Gia":"Từ 1 - 3 triệu", "giabd":1000000, "giakt":3000000},
            {"id":2, "Gia":"Từ 3 - 5 triệu", "giabd":3000000, "giakt":5000000},
            {"id":3, "Gia":"Trên 5 triệu", "giabd":5000000, "giakt":100000000}]; 
        this.setState({
            itemsGia: array
        });
    }
    
    updateURLLoai (event) {
        event.preventDefault();
        const id = event.currentTarget.dataset.id; //get id 
        console.log(id);
        var dispatch = this.props.dispatch;
        dispatch({type: 'URL', url: "https://shopdtonline.herokuapp.com/api/products/type/"+id});
    }
    
    updateURLHSX (event) {
        event.preventDefault();
        const NSX = event.currentTarget.dataset.id; //get id 
        var dispatch = this.props.dispatch;
        dispatch({type: 'URL', url: "https://shopdtonline.herokuapp.com/api/products/hsx/"+NSX});
    }
    
    updateURLGia (event) {
        event.preventDefault();
        const index = event.currentTarget.dataset.id; //get id 
        let temp = this.state.itemsGia[index]; 
        var dispatch = this.props.dispatch;
        dispatch({type: 'URL', url: "https://shopdtonline.herokuapp.com/api/products/gia/"+temp.giabd+"/"+temp.giakt});
    }
    
  render() {
    const {error, isLoaded, itemsLoai, itemsHSX, itemsGia} = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="text-center"><h4>Loading...</h4></div>;
    } else {
    return (
      <div>
        <div class="panel-group category-products" id="accordian">
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title">
										<a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
											<span class="badge pull-right"><i class="fa fa-plus"></i></span>
											Loại sản phẩm
										</a>
									</h4>
								</div>
								<div id="sportswear" class="panel-collapse collapse">
									<div class="panel-body">
										<ul>
                                            {itemsLoai.map(item => (
											<li><Link to={"/"} activeClassName="active" data-id={item.idloai} onClick={this.updateURLLoai.bind(this)}>{item.tenloai} </Link></li>
                                            ))}
										</ul>
									</div>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title">
										<a data-toggle="collapse" data-parent="#accordian" href="#mens">
											<span class="badge pull-right"><i class="fa fa-plus"></i></span>
											Hãng sản xuất
										</a>
									</h4>
								</div>
								<div id="mens" class="panel-collapse collapse">
									<div class="panel-body">
										<ul>
                                            {itemsHSX.map(item => (
											<li><Link to={"/"} activeClassName="active" data-id={item.NSX} onClick={this.updateURLHSX.bind(this)}>{item.NSX} </Link></li>
                                            ))}
										</ul>
									</div>
								</div>
							</div>
							
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title">
										<a data-toggle="collapse" data-parent="#accordian" href="#womens">
											<span class="badge pull-right"><i class="fa fa-plus"></i></span>
											Mức giá
										</a>
									</h4>
								</div>
								<div id="womens" class="panel-collapse collapse">
									<div class="panel-body">
										<ul>
                                            {itemsGia.map(item => (
											<li><Link to={"/"} activeClassName="active" data-id={item.id} onClick={this.updateURLGia.bind(this)}>{item.Gia} </Link></li>
                                            ))}
										</ul>
									</div>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><a href="#">Kids</a></h4>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><a href="#">Fashion</a></h4>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><a href="#">Households</a></h4>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><a href="#">Interiors</a></h4>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><a href="#">Clothing</a></h4>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><a href="#">Bags</a></h4>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h4 class="panel-title"><a href="#">Shoes</a></h4>
								</div>
							</div>
						</div>
      </div>
    )
    }
  }
};

function mapStateToProps(state) {
    return {
        username: state.username,
        token: state.token,
        urlProduct: state.urlProduct
    };
}


export default connect(mapStateToProps) (Category);
