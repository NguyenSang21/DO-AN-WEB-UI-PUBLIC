import React, { Component } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Recaptcha  from 'react-recaptcha';


class Login extends Component {
	constructor(props) {
        super(props);
        this.state = {
            token: "",
			goHome: false,
			checkUsername: []
		};
		this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
	}
	
	// specifying your onload callback function
	callback() {
		console.log('Done!!!!');
  	}
  
  // specifying verify callback function
  	verifyCallback(response) {
		console.log(response);
  	};

	handleSubmitRegister(event)
    {
        event.preventDefault();
        var md5 = require('md5');
        const data = new FormData(event.target);
		var username = data.get('username');
		var email = data.get('email');
        var password = md5(data.get('password'));
		

		if(this.state.checkUsername.length === 0)
		{
			fetch('https://shopdtonline.herokuapp.com/api/user', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Authorization': 'whatever-you-want',
					'Content-Type': 'application/json'
					},
				body: JSON.stringify({
					Username: username,
					Pass: password,
					hoTen: "",
					ngSinh: "",
					gTinh: "",
					SDT: 0,
					email: email,
					Loai: "Thường",
				})
			})
			.then(res => res.json())
			.then(
				(result) => {
					alert('Đăng kí thành công !');

				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					alert('Đăng kí thất bại !');
				}
			);
		}
		else
		{
			alert('Username bị trùng!');
		}
	}
	
	onChange(value) {
		console.log("Captcha value:", value);
	}

    handleSubmitLogin(event)
    {
		event.preventDefault();

		var md5 = require('md5');
        var {dispatch} = this.props;
        
        const data = new FormData(event.target);
        var username = data.get('username');
        var password = md5(data.get('password'));


			fetch('https://shopdtonline.herokuapp.com/login', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Authorization': 'whatever-you-want',
					'Content-Type': 'application/json'
					},
				body: JSON.stringify({
					name: username,
					password: password,
				})
			})
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						token: result.token,
						goHome: true,
					});
					dispatch({type: 'TOKEN',token: this.state.token});
					dispatch({type: 'LOG_IN',username: username});

					localStorage.setItem('login', JSON.stringify({
						name: username,
						token: this.state.token,
					}));

					alert('Đăng nhập thành công!');
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					alert('Đăng nhập thất bại');
				}
			);
	}

	updateUsername(event)
	{
		let username = event.target.value;
		console.log(username);
		fetch('https://shopdtonline.herokuapp.com/api/user/username/'+username)
        .then(res => res.json())
        .then(
            (result) => {
				this.setState({
					checkUsername: result
				});
            }
        );
	}

	eventLogout () {
        var dispatch = this.props.dispatch;
        dispatch({type: 'LOG_OUT'});
        dispatch({type: 'TOKEN_OUT'});
        localStorage.clear();
	}
	
  render() {
	let login = JSON.parse(localStorage.getItem('login'));
	let name = this.props.username;
	console.log(login);
	console.log(name);
	let token = this.props.token;
	if(login)
	{
		name = login.name;
		token = login.token;
	}

	let checkNameLogin = name === null ? "Account" : name;
	let goHome = this.state.goHome === true ? <Redirect to='/'/> : null;
    return (
      <div>
        <header id="header">
		<div class="header_top">
			<div class="container">
				<div class="row">
					<div class="col-sm-6">
						<div class="contactinfo">
							<ul class="nav nav-pills">
								<li><a href=""><i class="fa fa-phone"></i> +2 95 01 88 821</a></li>
								<li><a href=""><i class="fa fa-envelope"></i> info@domain.com</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-6">
						<div class="social-icons pull-right">
							<ul class="nav navbar-nav">
								<li><a href=""><i class="fa fa-facebook"></i></a></li>
								<li><a href=""><i class="fa fa-twitter"></i></a></li>
								<li><a href=""><i class="fa fa-linkedin"></i></a></li>
								<li><a href=""><i class="fa fa-dribbble"></i></a></li>
								<li><a href=""><i class="fa fa-google-plus"></i></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="header-middle">
			<div class="container">
				<div class="row">
					<div class="col-sm-4">
						<div class="logo pull-left">
							<a href="index.html"><img src="images/home/logo.png" alt="" /></a>
						</div>
						<div class="btn-group pull-right">
							<div class="btn-group">
								<button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
									USA
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu">
									<li><a href="">Canada</a></li>
									<li><a href="">UK</a></li>
								</ul>
							</div>
							
							<div class="btn-group">
								<button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
									DOLLAR
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu">
									<li><a href="">Canadian Dollar</a></li>
									<li><a href="">Pound</a></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-sm-8">
						<div class="shop-menu pull-right">
							<ul class="nav navbar-nav">
								<li>
									<div class="dropdown">
										<li class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<i class="fa fa-user"></i> {checkNameLogin}
										</li>
										<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
											<li><Link class="dropdown-item" to={'/myprofile'} activeClassName="active">My Profile</Link></li>
											<li><a class="dropdown-item" onClick={this.eventLogout.bind(this)} href="#"> Logout</a></li>
										</div>
									</div>
								</li>
								<li><a href=""><i class="fa fa-star"></i> Wishlist</a></li>
								<li><Link to={'/checkout'} activeClassName="active"><i class="fa fa-crosshairs"></i> Checkout</Link></li>
								<li><Link to={'/cart'} activeClassName="active"><i class="fa fa-shopping-cart"></i> Cart</Link></li>
								<li><Link to={'/login'} activeClassName="active"><i class="fa fa-lock"></i>Login</Link></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	
		<div class="header-bottom">
			<div class="container">
				<div class="row">
					<div class="col-sm-9">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
						</div>
						<div class="mainmenu pull-left">
							<ul class="nav navbar-nav collapse navbar-collapse">
								<li><a href="index.html">Home</a></li>
								<li class="dropdown"><a href="#">Shop<i class="fa fa-angle-down"></i></a>
                                    <ul role="menu" class="sub-menu">
                                        <li><a href="shop.html">Products</a></li>
										<li><a href="product-details.html">Product Details</a></li> 
										<li><a href="checkout.html">Checkout</a></li> 
										<li><a href="cart.html">Cart</a></li> 
										<li><a href="login.html" class="active">Login</a></li> 
                                    </ul>
                                </li> 
								<li class="dropdown"><a href="#">Blog<i class="fa fa-angle-down"></i></a>
                                    <ul role="menu" class="sub-menu">
                                        <li><a href="blog.html">Blog List</a></li>
										<li><a href="blog-single.html">Blog Single</a></li>
                                    </ul>
                                </li> 
								<li><a href="404.html">404</a></li>
								<li><a href="contact-us.html">Contact</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="search_box pull-right">
							<input type="text" placeholder="Search"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
	
	<section id="form">
		<div class="container">
			<div class="row">
				<div class="col-sm-4 col-sm-offset-1">
					<div class="login-form">
						<h2>Login to your account</h2>
						<form action="#" onSubmit={this.handleSubmitLogin}>
							<input type="text" name="username" placeholder="Username" />
							<input type="password" name="password" placeholder="Password" />
							<span>
								<input type="checkbox" class="checkbox"/> 
								Keep me signed in
							</span>
							<button type="submit" class="btn btn-default">Login</button>
						</form>
					</div>
				</div>
				<div class="col-sm-1">
					<h2 class="or">OR</h2>
				</div>
				<div class="col-sm-4">
					<div class="signup-form">
						<h2>New User Signup!</h2>
						<form action="#" onSubmit={this.handleSubmitRegister}>
							<input type="text" name="username" placeholder="Username" onChange={this.updateUsername.bind(this)}/>
							<input type="email" name="email" placeholder="Email Address"/>
							<input type="password" name="password" placeholder="Password"/>
							<Recaptcha
    							sitekey="6LfyX10UAAAAAFLNAaMx_QSW-yQxu-Ns3B_pHDwa"
    							render="explicit"
    							verifyCallback={this.verifyCallback}
    							onloadCallback={this.callback}
  							/>
							<button type="submit" class="btn btn-default">Signup</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	
	<footer id="footer">
		<div class="footer-top">
			<div class="container">
				<div class="row">
					<div class="col-sm-2">
						<div class="companyinfo">
							<h2><span>e</span>-shopper</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor</p>
						</div>
					</div>
					<div class="col-sm-7">
						<div class="col-sm-3">
							<div class="video-gallery text-center">
								<a href="#">
									<div class="iframe-img">
										<img src="images/home/iframe1.png" alt="" />
									</div>
									<div class="overlay-icon">
										<i class="fa fa-play-circle-o"></i>
									</div>
								</a>
								<p>Circle of Hands</p>
								<h2>24 DEC 2014</h2>
							</div>
						</div>
						
						<div class="col-sm-3">
							<div class="video-gallery text-center">
								<a href="#">
									<div class="iframe-img">
										<img src="images/home/iframe2.png" alt="" />
									</div>
									<div class="overlay-icon">
										<i class="fa fa-play-circle-o"></i>
									</div>
								</a>
								<p>Circle of Hands</p>
								<h2>24 DEC 2014</h2>
							</div>
						</div>
						
						<div class="col-sm-3">
							<div class="video-gallery text-center">
								<a href="#">
									<div class="iframe-img">
										<img src="images/home/iframe3.png" alt="" />
									</div>
									<div class="overlay-icon">
										<i class="fa fa-play-circle-o"></i>
									</div>
								</a>
								<p>Circle of Hands</p>
								<h2>24 DEC 2014</h2>
							</div>
						</div>
						
						<div class="col-sm-3">
							<div class="video-gallery text-center">
								<a href="#">
									<div class="iframe-img">
										<img src="images/home/iframe4.png" alt="" />
									</div>
									<div class="overlay-icon">
										<i class="fa fa-play-circle-o"></i>
									</div>
								</a>
								<p>Circle of Hands</p>
								<h2>24 DEC 2014</h2>
							</div>
						</div>
					</div>
					<div class="col-sm-3">
						<div class="address">
							<img src="images/home/map.png" alt="" />
							<p>505 S Atlantic Ave Virginia Beach, VA(Virginia)</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="footer-widget">
			<div class="container">
				<div class="row">
					<div class="col-sm-2">
						<div class="single-widget">
							<h2>Service</h2>
							<ul class="nav nav-pills nav-stacked">
								<li><a href="">Online Help</a></li>
								<li><a href="">Contact Us</a></li>
								<li><a href="">Order Status</a></li>
								<li><a href="">Change Location</a></li>
								<li><a href="">FAQ’s</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-2">
						<div class="single-widget">
							<h2>Quock Shop</h2>
							<ul class="nav nav-pills nav-stacked">
								<li><a href="">T-Shirt</a></li>
								<li><a href="">Mens</a></li>
								<li><a href="">Womens</a></li>
								<li><a href="">Gift Cards</a></li>
								<li><a href="">Shoes</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-2">
						<div class="single-widget">
							<h2>Policies</h2>
							<ul class="nav nav-pills nav-stacked">
								<li><a href="">Terms of Use</a></li>
								<li><a href="">Privecy Policy</a></li>
								<li><a href="">Refund Policy</a></li>
								<li><a href="">Billing System</a></li>
								<li><a href="">Ticket System</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-2">
						<div class="single-widget">
							<h2>About Shopper</h2>
							<ul class="nav nav-pills nav-stacked">
								<li><a href="">Company Information</a></li>
								<li><a href="">Careers</a></li>
								<li><a href="">Store Location</a></li>
								<li><a href="">Affillate Program</a></li>
								<li><a href="">Copyright</a></li>
							</ul>
						</div>
					</div>
					<div class="col-sm-3 col-sm-offset-1">
						<div class="single-widget">
							<h2>About Shopper</h2>
							<form action="#" class="searchform">
								<input type="text" placeholder="Your email address" />
								<button type="submit" class="btn btn-default"><i class="fa fa-arrow-circle-o-right"></i></button>
								<p>Get the most recent updates from <br />our site and be updated your self...</p>
							</form>
						</div>
					</div>
					
				</div>
			</div>
		</div>
		
		<div class="footer-bottom">
			<div class="container">
				<div class="row">
					<p class="pull-left">Copyright © 2013 E-SHOPPER Inc. All rights reserved.</p>
					<p class="pull-right">Designed by <span><a target="_blank" href="http://www.themeum.com">Themeum</a></span></p>
				</div>
			</div>
		</div>
		
	</footer>
	{goHome}
      </div>
    )
  }
};


function mapStateToProps(state) {
    return {
        username: state.username,
        token: state.token
    };
}


export default connect(mapStateToProps) (Login);