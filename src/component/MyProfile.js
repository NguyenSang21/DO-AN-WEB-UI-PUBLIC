import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import Order_History from './Order_History';
import Order_Status from './Order_Status';
import EditUser from './Edit_User';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';


class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        items: [],
        update: false,
        hoTen: "",
        email: "",
        SDT: "",
        ngSinh: "",
        gTinh: "",
        diaChiGiaoHang: "",
    };
}

// load lại khi có update
componentDidUpdate(prevProps, prevState) {
  if (this.state.update) {
      var login = JSON.parse(localStorage.getItem('login'));
      var name = this.props.username;
      var token = this.props.token;
      if(login)
      {
        name = login.name;
        token = login.token;
      }
    
      fetch('https://shopdtonline.herokuapp.com/api/user/username/'+name)
            .then(res => res.json())
            .then(
                (result) => {
                    let hoTen, email, SDT, gTinh, diaChiGiaoHang, ngSinh;
                if(result[0].hoTen === "")
                {
                    hoTen = "Null";
                }else{
                    hoTen = result[0].hoTen;
                }
                if(result[0].email === "")
                {
                    email = "Null";
                }else{
                    email = result[0].email;
                }
                if(result[0].SDT == "")
                {
                    SDT ="Null";
                }else{
                    SDT = result[0].SDT;
                }
                if(result[0].diaChiGiaoHang === null)
                {
                    diaChiGiaoHang = "Null";
                }else{
                    diaChiGiaoHang = result[0].diaChiGiaoHang;
                }
                if(result[0].gTinh === ""){
                    gTinh = "Null";
                }else{
                    gTinh = result[0].gTinh;
                }
                if(result[0].ngSinh === ""){
                    ngSinh = "Null";
                }else{
                    ngSinh = moment(result[0].ngSinh).format("DD/MM/YYYY");
                }
                this.setState({
                   
                  items: result[0],
                  isLoaded: true,
                  hoTen: hoTen,
                  email: email,
                  SDT: SDT,
                  ngSinh: ngSinh,
                  gTinh: gTinh,
                  diaChiGiaoHang: diaChiGiaoHang,
                  update: false
              });
                },
                (error) => {
                  this.setState({
                    error,
                    update: false
                });
                }
            );
  }
}

componentDidMount()
{
  var login = JSON.parse(localStorage.getItem('login'));
	var name = this.props.username;
	var token = this.props.token;
	if(login)
	{
		name = login.name;
        token = login.token;
        fetch('https://shopdtonline.herokuapp.com/api/user/username/'+name)
        .then(res => res.json())
        .then(
            (result) => {
                let hoTen, email, SDT, gTinh, diaChiGiaoHang, ngSinh;
                if(result[0].hoTen === "")
                {
                    hoTen = "Null";
                }else{
                    hoTen = result[0].hoTen;
                }
                if(result[0].email === "")
                {
                    email = "Null";
                }else{
                    email = result[0].email;
                }
                if(result[0].SDT == "")
                {
                    SDT ="Null";
                }else{
                    SDT = result[0].SDT;
                }
                if(result[0].diaChiGiaoHang === null)
                {
                    diaChiGiaoHang = "Null";
                }else{
                    diaChiGiaoHang = result[0].diaChiGiaoHang;
                }
                if(result[0].gTinh === ""){
                    gTinh = "Null";
                }else{
                    gTinh = result[0].gTinh;
                }
                if(result[0].ngSinh === ""){
                    ngSinh = "Null";
                }else{
                    ngSinh = moment(result[0].ngSinh).format("DD/MM/YYYY");
                }
                this.setState({
                   
                  items: result[0],
                  isLoaded: true,
                  hoTen: hoTen,
                  email: email,
                  SDT: SDT,
                  ngSinh: ngSinh,
                  gTinh: gTinh,
                  diaChiGiaoHang: diaChiGiaoHang,
              });
            },
            (error) => {
              this.setState({
                error
            });
            }   
        );
  }
}

openModalUpdate = () => {
  this.setState({update: true});
}

  render() {
    let login = JSON.parse(localStorage.getItem('login'));
    let name = "";
    let goHome = null;
	if(login)
	{
        name = login.name;
    }
    goHome = name === "" ? <Redirect to='/'/> : null;
    
    const {error, items, isLoaded} = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="text-center">{goHome}<h4>Chưa có thông tin ..........</h4></div>;
    } else {
    return (
        <div>
            {goHome}
            <div class="container bootstrap snippet">
        <div class="row">
              <div class="col-sm-10"><h1>Home Profile</h1></div>
            <div class="col-sm-2"></div>
        </div>
        <div class="row">
              <div class="col-sm-3">
                  
              <ul class="list-group">
                <li class="list-group-item text-muted">Thông tin cá nhân</li>
                <li class="list-group-item text-right"><span class="pull-left"><strong>Họ Tên</strong></span>{this.state.hoTen}</li>
                <li class="list-group-item text-right"><span class="pull-left"><strong>Email</strong></span>{this.state.email}</li>
                <li class="list-group-item text-right"><span class="pull-left"><strong>Số điện thoại</strong></span>{this.state.SDT}</li>
                <li class="list-group-item text-right"><span class="pull-left"><strong>Ngày sinh</strong></span>{this.state.ngSinh}</li>
                <li class="list-group-item text-right"><span class="pull-left"><strong>Giới tính</strong></span>{this.state.gTinh}</li>
                <li class="list-group-item text-right"><span class="pull-left"><strong>Địa chỉ giao hàng</strong></span>{this.state.diaChiGiaoHang}</li>
              </ul> 
              <ul class="list-group">
              <li class="list-group-item text-right"><span class="pull-left"></span> 
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#product_view">Chỉnh sửa</button>
              <div class="modal fade product_view" id="product_view">
                      <div class="modal-dialog">
                          <div class="modal-content">
                                  <div class="modal-body">
                                      <EditUser items={items}/>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" onClick={this.openModalUpdate.bind(this)} class="btn btn-secondary" data-dismiss="modal">Close</button>
                                  </div>
                              </div>
                      </div>
              </div>
                  <div class="expandable form-group text-center" data-count="1">
                  </div>
                  </li>
              </ul> 
  
            </div>
            <div class="col-sm-9">
              
              <ul class="nav nav-tabs" id="myTab">
                <li class="active"><a href="#home" data-toggle="tab">Lịch sử đơn hàng</a></li>
                <li><a href="#messages" data-toggle="tab">Tình trạng đơn hàng</a></li>
                <li><a href="#settings" data-toggle="tab">Modifica utente</a></li>
              </ul>
                  
              <div class="tab-content">
                <div class="tab-pane active" id="home">

                    <Order_History idNGDUNG={items.idNGDUNG}/>
                  
                  <div id="edit" class="modal fade" role="dialog">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h4 class="modal-title">Modifica dati per (servizio)</h4>
                      </div>
                      <div class="modal-body">
                          <input id="fn" type="text" class="form-control" name="fname" placeholder="Prodotti utilizzati"/>
                          <input id="ln" type="text" class="form-control" name="fname" placeholder="Colori Utilizzati"/>
                          <input id="mn" type="text" class="form-control" name="fname" placeholder="Note"/>
                      </div>
                      <div class="modal-footer">
                        <button type="button" id="up" class="btn btn-success" data-dismiss="modal">Aggiorna</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Chiudi</button>
                      </div>
                    </div>
                  </div>
                </div>
                  
                  <hr/>
                  
                 </div>
                 <div class="tab-pane" id="messages">
                   
                   <h2></h2>
                   
                  <Order_Status idNGDUNG={items.idNGDUNG}/>
                   
                 </div>
                 <div class="tab-pane" id="settings">
                        
                       
                      <hr/>
                      <form class="form" action="##" method="post" id="registrationForm">
                          <div class="form-group">
                              
                              <div class="col-xs-6">
                                  <label for="first_name"><h4>Nome</h4></label>
                                  <input type="text" class="form-control" name="first_name" id="first_name" placeholder="nome" title="Inserisci il nome"/>
                              </div>
                          </div>
                          <div class="form-group">
                              
                              <div class="col-xs-6">
                                <label for="last_name"><h4>Cognome</h4></label>
                                  <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Cognome" title="Inserisci il cognome"/>
                              </div>
                          </div>
              
                          
                          <div class="form-group">
                              <div class="col-xs-6">
                                 <label for="mobile"><h4>Telefono</h4></label>
                                  <input type="text" class="form-control" name="mobile" id="mobile" placeholder="inserisci il numero di telefono" title="inserisci il numero di telefono"/>
                              </div>
                          </div>
                          <div class="form-group">
                              
                              <div class="col-xs-6">
                                  <label for="email"><h4>Email</h4></label>
                                  <input type="email" class="form-control" name="email" id="email" placeholder="tua@email.it" title="Inserisci l'email"/>
                              </div>
                          </div>
                          
                          
                          <div class="form-group">
                               <div class="col-xs-12">
                                    <br/>
                                      <button class="btn btn-lg btn-success" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Salva</button>
                                       <button class="btn btn-lg" type="reset"><i class="glyphicon glyphicon-repeat"></i> Ripristina</button>
                                </div>
                          </div>
                      </form>
                  </div>
                   
                  </div>
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
      token: state.token
  };
}

export default connect(mapStateToProps) (MyProfile);
