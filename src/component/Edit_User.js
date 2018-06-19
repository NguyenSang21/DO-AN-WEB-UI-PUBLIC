import React, { Component } from 'react';
var moment = require('moment');


class EditUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: true,
            hoTen: "",
            ngSinh: "",
            checkGioiTinh: true,
            gTinh: "",
            SDT: "",
            email: "",
            diaChiGiaoHang: "",
        }
     }

    componentDidMount(){
        this.setState({
            idNGDUNG: this.props.items.idNGDUNG,
            Username: this.props.items.Username,
            Pass: this.props.items.Pass,
            Loai: this.props.items.Loai,
            hoTen: this.props.items.hoTen,
            email: this.props.items.email,
            SDT: this.props.items.SDT,
            ngSinh: this.props.items.ngSinh,
            gTinh: this.props.items.gTinh,
            diaChiGiaoHang: this.props.items.diaChiGiaoHang,
            checkGioiTinh: this.props.items.gTinh === "Nam" ? true : false
        });
    }

editProfile(event)
{
    event.preventDefault();
    var login = JSON.parse(localStorage.getItem('login'));
	if(login)
	{
        const data = new FormData(event.target);
        var token = login.token;
        fetch('https://shopdtonline.herokuapp.com/api/user', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
              idNGDUNG: this.state.idNGDUNG,
              Username: this.state.Username,
              Pass: this.state.Pass,
              hoTen: this.state.hoTen,
              ngSinh: this.state.ngSinh,
              gTinh: this.state.gTinh,
              SDT: this.state.SDT,
              email: this.state.email,
              Loai: this.state.Loai,
              diaChiGiaoHang: this.state.diaChiGiaoHang,
              })
        })
        .then(res => res.json())
        .then(
            (result) => {
                alert('Sửa thành công.');
            },
            (error) => {
                alert('Sửa thất bại! Bạn không có quyền admin');
            }
        );
	}
}

updateHoTen(event) {
    this.setState({hoTen: event.target.value});
}

updateNgSinh(event) {
    this.setState({ngSinh: event.target.value});
}

updateGTinh(event) {
    console.log(event.target.value);
    this.setState({gTinh: event.target.value, checkGioiTinh: !this.state.checkGioiTinh});
}
  
updateSDT(event) {
    this.setState({SDT: event.target.value});
}

updateEmail(event) {
    this.setState({email: event.target.value});
}

updateDiaChiGiaoHang(event) {
    this.setState({diaChiGiaoHang: event.target.value});
}

  render() {
    return (
      <div>
          <form class="form-horizontal" onSubmit={this.editProfile.bind(this)}>
                                <div class="form-group">
                                  <label class="col-md-4 control-label" >Họ và tên</label>  
                                  <div class="col-md-4">
                                    <div class="input-group">
                                      <div class="input-group-addon">
                                        <i class="fa fa-user" style={{'font-size':15}}>
                                        </i>
                                      </div>
                                      <input required id="Name" name="Name" value={this.state.hoTen} onChange={this.updateHoTen.bind(this)} type="text" placeholder="Nhập vào tên" class="form-control input-md"/>
                                    </div>
                                  </div>
                                </div>

                                <div class="form-group">
                                  <label class="col-md-4 control-label" for="Temporary Address">Email</label>  
                                  <div class="col-md-4">
                                    <div class="input-group">
                                      <div class="input-group-addon">
                                        <i class="fa fa-home" style={{'font-size':15}}></i>
                                      </div>
                                      <input required id="Email" name="Email" type="text" onChange={this.updateEmail.bind(this)} value={this.state.email} placeholder="Nhập vào mail" class="form-control input-md"/>
                                    </div>
                                  </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-4 control-label" for="Phone number ">Phone number </label>  
                                    <div class="col-md-4">
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                          <i class="fa fa-phone"></i>
                                        </div>
                                        <input id="PhoneNumber" name="PhoneNumber " type="text" onChange={this.updateSDT.bind(this)} value={this.state.SDT} placeholder="0979... " class="form-control input-md"/>
                                    </div>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-md-4 control-label" for="Date Of Birth">Ngày Sinh</label>  
                                    <div class="col-md-4">

                                    <div class="input-group">
                                        <div class="input-group-addon">
                                        <i class="fa fa-clock-o"></i>
                                        </div>
                                        <input id="DateOfBirth" name="DateOfBirth" onChange={this.updateNgSinh.bind(this)} value={moment(this.state.ngSinh).format("YYYY-MM-DD")} type="date" placeholder="Date Of Birth" class="form-control input-md"/>
                                        </div>
                                    
                                    </div>
                                  </div>
                                  <div class="form-group">
                                  <label class="col-md-4 control-label" for="Gender">Giới tính</label>
                                    <div class="col-md-4"> 
                                        <label class="radio-inline" for="Gender-0">
                                        <input type="radio" onChange={this.updateGTinh.bind(this)} name="Gender" id="Gender-0" value="Nam" checked={this.state.checkGioiTinh}/>
                                        Nam
                                        </label> 
                                        <label class="radio-inline" for="Gender-1">
                                        <input type="radio" onChange={this.updateGTinh.bind(this)} name="Gender" id="Gender-1" value="Nữ" checked={!this.state.checkGioiTinh}/>
                                        Nữ
                                        </label>  
                                    </div>
                                </div>

                                <div class="form-group">
                                  <label class="col-md-4 control-label" for="Gender">Địa chỉ giao hàng</label>
                                  <div class="col-md-4"> 
                                  <div class="input-group">
                                    <div class="input-group-addon">
                                      <i class="fa fa-home" style={{'font-size':15}}></i>
                                    </div>
                                    <input id="DiaChiGiaoHang" name="DiaChiGiaoHang" onChange={this.updateDiaChiGiaoHang.bind(this)} value={this.state.diaChiGiaoHang} type="text" placeholder="Q1, TP.HCM" class="form-control input-md"/>
                                  </div>
                                  </div>
                                </div>
                                <button class="btn btn-success"><span class="glyphicon glyphicon-thumbs-up"></span> Submit</button>
            </form>
      </div>
    )
  }
};

export default EditUser;
