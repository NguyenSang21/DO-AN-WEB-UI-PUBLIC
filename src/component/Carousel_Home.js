import React, { Component } from 'react'

class Carousel_Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            itemActive: {}
        }
    }

    componentDidMount(){
        fetch("https://shopdtonline.herokuapp.com/api/products/page/1")
        .then(res => res.json())
        .then(
            (result) => {
                let itemActive = result[0];
                result.splice(0, 1);
                this.setState({
                    isLoaded: true,
                    items: result,
                    itemActive: itemActive
                });
                console.log(result);
            },
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
        );
    }

  render() {
    const {error, isLoaded, items, itemActive} = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="text-center"><h4>Loading...</h4></div>;
    } else {
        return (
            <div id="slider-carousel" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#slider-carousel" data-slide-to="0" class="active"></li>
                    <li data-target="#slider-carousel" data-slide-to="1"></li>
                    <li data-target="#slider-carousel" data-slide-to="2"></li>
                </ol>
                    <div class="carousel-inner">
                            <div class="item active">
								<div class="col-sm-6">
									<h1><span></span>{itemActive.tenMay}</h1>
									<h2>{itemActive.MoTa}</h2>
									<p>{itemActive.ghiChu}</p>
									<button type="button" class="btn btn-default get">Mua ngay</button>
								</div>
								<div class="col-sm-6">
									<img src={itemActive.linkAnh} class="girl img-responsive" alt="" />
									<img src="images/home/pricing.png"  class="pricing" alt="" />
								</div>
							</div>
                        {items.map(item => (
                            <div class="item">
                                <div class="col-sm-6">
                                    <h1><span></span>{item.tenMay}</h1>
                                    <h2>{item.MoTa}</h2>
                                    <p>{item.ghiChu}</p>
                                    <button type="button" class="btn btn-default get">Mua ngay</button>
                                </div>
                                <div class="col-sm-6">
                                    <img src={item.linkAnh} class="girl img-responsive" alt="" />
                                    <img src="images/home/pricing.png"  class="pricing" alt="" />
                                </div>
                            </div>
                        ))}
                    </div>
                <a href="#slider-carousel" class="left control-carousel hidden-xs" data-slide="prev">
                    <i class="fa fa-angle-left"></i>
                </a>
                <a href="#slider-carousel" class="right control-carousel hidden-xs" data-slide="next">
                    <i class="fa fa-angle-right"></i>
                </a>
            </div>
        )
    }
    }
}

export default Carousel_Home;