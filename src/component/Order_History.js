import React, { Component } from 'react'

 class Order_History extends Component {
     constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
     }

     componentDidMount(){
         // test order của user 1
         fetch("https://shopdtonline.herokuapp.com/api/order/"+this.props.idNGDUNG)
         .then(res => res.json())
         .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result,
                });
                console.log(result);
            },
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
         )
     }

  render() {
    const {error, isLoaded, items} = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="text-center"><h4>Loading...</h4></div>;
    } else {
        return (
            <div class="table-responsive">
                
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>Số sản phẩm</th>
                        <th>Ngày mua</th>
                        <th>Tình trạng</th>
                        <th>Tổng tiền</th>
                        <th>Địa chỉ</th>
                    </tr>
                    </thead>
                    <tbody id="items">
                    {items.map(item => (
                    <tr>
                        <td>{item.soSanPham}</td>
                        <td>{item.NgayMua}</td>
                        <td>{item.tinhTrang}</td>
                        <td>{item.tongTien}</td>
                        <td>{item.diaChi}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        )
    }
  }
}

export default Order_History;
