import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


 class CartItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            items: [],
            tongTien: 0,
            idNGDUNG: "",
            idHD: 0,
            diaChiGiaoHang: ""
        };
    }

    updateQuantity(event) {
        event.preventDefault();
        const index = event.currentTarget.dataset.id; //get id 
        const value = event.target.value;
        let array = this.state.items;              // lấy array items
        
        if(value <= array[index].result[0].slHienTai && value >= 0)
        {
            array[index].soLuong = value;
        }

        this.setState({
            items: array
        }); 
        this.tinhTien();
    }

    onUp(event)
    {
        event.preventDefault();
        const index = event.currentTarget.dataset.id; 
        let array = this.state.items;

        if(array[index].soLuong < array[index].result[0].slHienTai)
        {
            array[index].soLuong++;
        }
        
        this.setState({
            items: array
        }); 
        this.tinhTien();
    }

    onDown(event)
    {
        event.preventDefault();
        const index = event.currentTarget.dataset.id; 
        let array = this.state.items;

        if(array[index].soLuong > 0)
        {
            array[index].soLuong--;
        }
            
        this.setState({
            items: array
        }); 
        this.tinhTien();
    } 
    
    tinhTien()
    {
        let array = this.state.items;
        let tong = 0;
        for(let i=0; i<array.length; i++)
        {
            tong += (array[i].result[0].Gia * array[i].soLuong);
        }
        
        this.setState({
            tongTien: tong
        });
    }

    onDelete(e)
    {
        e.preventDefault();
        const index = e.currentTarget.dataset.id; 

        let shop = JSON.parse(localStorage.getItem('cart'));
        let cart = shop.cart;
        let array = this.state.items;
        
        array.splice(index, 1);
        cart.splice(index, 1);
        
        localStorage.setItem("cart", JSON.stringify({
            cart: cart
        }));


        this.setState({
            items: array
        });

        this.tinhTien();
    }
    
    setQuantityProduct(items, soLuong)
    {
        if(soLuong > items[0].slHienTai)
        {
            return items[0].slHienTai;
        }
        return soLuong;
    }

    checkOut(event)
    {
        event.preventDefault();
        if(this.props.name)
        {
            this.layThongTinNguoiDung();
        }
        else
        {
            alert("Bạn chưa login");
        }
    }

    addChiTietHoaDon(){
        let chitiethoadon= [];
        let arritem = this.state.items;
        for(let i=0; i<arritem.length; i++)
        {
            chitiethoadon.push({
                idCTHD: null,
                idHD: this.state.idHD,
                idM: arritem[i].result[0].idM,
                SoLuong: arritem[i].soLuong,
	            DonGia: arritem[i].result[0].Gia,
	            TongTien1SP: arritem[i].soLuong*arritem[i].result[0].Gia,
                TrangThai: "chua giao",
                tenSanPham: arritem[i].result[0].tenMay
            });
        }
        fetch('https://shopdtonline.herokuapp.com/api/detailorder', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Authorization': 'whatever-you-want',
					'Content-Type': 'application/json'
					},
				body: JSON.stringify(chitiethoadon)
			})
			.then(res => res.json())
			.then(
				(result) => {
					alert("Thanh toán thành công!!!!!");
				}
			);
    }

    layThongTinHoaDon(){
        let today = new Date();
        let NgayMua = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        fetch('https://shopdtonline.herokuapp.com/api/order', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Authorization': 'whatever-you-want',
					'Content-Type': 'application/json'
					},
				body: JSON.stringify({
					idNGDUNG: this.state.idNGDUNG,
                    tongTien: this.state.tongTien,
                    NgayMua: NgayMua,
                    tinhTrang: "chưa giao",
                    diaChi: this.state.diaChiGiaoHang,
                    soSanPham: this.state.items.length
				})
			})
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						idHD: result[0][0].id
                    });
                    this.addChiTietHoaDon();
				}
			);
    }

    layThongTinNguoiDung(){         
            fetch('https://shopdtonline.herokuapp.com/api/user/username/'+this.props.name)
                  .then(res => res.json())
                  .then(
                      (result) => {
                        this.setState({                   
                            idNGDUNG: result[0].idNGDUNG,
                            diaChiGiaoHang: result[0].diaChiGiaoHang,
                        });
                        this.layThongTinHoaDon();
                      }
                  );
    }

    componentDidMount(){
        let shop = JSON.parse(localStorage.getItem('cart'));
        if(shop)
        {
            let cart = shop.cart;
            cart.forEach(element => {
                console.log(element.id);
                fetch("https://shopdtonline.herokuapp.com/api/products/" + element.id)
                .then(res => res.json())
                .then(
                    (result) => {
                        let soLuong = element.soLuong;
                        let temp = this.state.items;
                        soLuong = this.setQuantityProduct(result, soLuong);
                        temp.push({ result, soLuong: soLuong, index: temp.length});
                        this.setState({
                            isLoaded: true,
                            update: false,
                            items: temp
                        });
                        this.tinhTien();
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            update: false,
                            error
                        });
                    }
                )
            });
        }
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
                <section id="cart_items">
                    <div class="container">
                        <div class="breadcrumbs">
                            <ol class="breadcrumb">
                            <li><a href="#">Home</a></li>
                            <li class="active">Shopping Cart</li>
                            </ol>
                        </div>
                        <div class="table-responsive cart_info">
                            <table class="table table-condensed">
                                <thead>
                                    <tr class="cart_menu">
                                        <td class="image">Item</td>
                                        <td class="description"></td>
                                        <td class="price">Price</td>
                                        <td class="quantity">Quantity</td>
                                        <td class="total">Total</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr>
                                            <td class="cart_product">
                                                <a href="#"><img style={{width:50,height:50}} src={item.result[0].linkAnh} alt=""/></a>
                                            </td>
                                            <td class="cart_description">
                                                <h4><a href="#">{item.result[0].tenMay}</a></h4>
                                                <p>Web ID: 1089772</p>
                                            </td>
                                            <td class="cart_price">
                                                <p><NumberFormat value={item.result[0].Gia} displayType={'text'} thousandSeparator={true} /> VNĐ</p>
                                            </td>
                                            <td class="cart_quantity">
                                                <div class="cart_quantity_button">
                                                    <a class="cart_quantity_up" data-id={item.index} onClick={this.onUp.bind(this)}> + </a>
                                                    <input min="0" max="100" class="cart_quantity_input" type="number" data-id={item.index} name="quantity" value={item.soLuong} onChange={this.updateQuantity.bind(this)} autocomplete="off" size="2"/>
                                                    <a class="cart_quantity_down" data-id={item.index} onClick={this.onDown.bind(this)}> - </a>
                                                </div>
                                            </td>
                                            <td class="cart_total">
                                                <p class="cart_total_price"><NumberFormat value={item.result[0].Gia * item.soLuong} displayType={'text'} thousandSeparator={true} /> VNĐ</p>
                                            </td>
                                            <td class="cart_delete">
                                                <a data-id={item.index} onClick={this.onDelete.bind(this)} class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section> 

                <section id="do_action">
                    <div class="container">
                        <div class="heading">
                            <h3>What would you like to do next?</h3>
                            <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="chose_area">
                                    <ul class="user_option">
                                        <li>
                                            <input type="checkbox"/>
                                            <label>Use Coupon Code</label>
                                        </li>
                                        <li>
                                            <input type="checkbox"/>
                                            <label>Use Gift Voucher</label>
                                        </li>
                                        <li>
                                            <input type="checkbox"/>
                                            <label>Estimate Shipping & Taxes</label>
                                        </li>
                                    </ul>
                                    <ul class="user_info">
                                        <li class="single_field">
                                            <label>Country:</label>
                                            <select>
                                                <option>United States</option>
                                                <option>Bangladesh</option>
                                                <option>UK</option>
                                                <option>India</option>
                                                <option>Pakistan</option>
                                                <option>Ucrane</option>
                                                <option>Canada</option>
                                                <option>Dubai</option>
                                            </select>
                                            
                                        </li>
                                        <li class="single_field">
                                            <label>Region / State:</label>
                                            <select>
                                                <option>Select</option>
                                                <option>Dhaka</option>
                                                <option>London</option>
                                                <option>Dillih</option>
                                                <option>Lahore</option>
                                                <option>Alaska</option>
                                                <option>Canada</option>
                                                <option>Dubai</option>
                                            </select>
                                        
                                        </li>
                                        <li class="single_field zip-field">
                                            <label>Zip Code:</label>
                                            <input type="text"/>
                                        </li>
                                    </ul>
                                    <a class="btn btn-default update" href="">Get Quotes</a>
                                    <a class="btn btn-default check_out" href="">Continue</a>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="total_area">
                                    <ul>
                                        <li>Cart Sub Total <span><NumberFormat suffix={" VNĐ"} value={this.state.tongTien} displayType={'text'} thousandSeparator={true}/></span></li>
                                        <li>Eco Tax <span>$2</span></li>
                                        <li>Shipping Cost <span>Free</span></li>
                                        <li>Total <span><NumberFormat suffix={" VNĐ"} value={this.state.tongTien} displayType={'text'} thousandSeparator={true} /></span></li>
                                    </ul>
                                        <a class="btn btn-default update" href="">Update</a>
                                        <Link to={"/cart"} onClick={this.checkOut.bind(this)} class="btn btn-default check_out">Check Out</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
  }
}
export default CartItems;