import React from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import { Base,styles } from './base';
import reqwest from 'reqwest';

export class Login extends Base {

  submit(){
    reqwest({
      url: '/users/sign_in.json',
      method: 'POST',
      data: {
        user:{
          email: this.state.email,
          password: this.state.password,
        }
      },
      headers:{
        'X-CSRF-Token': window.CursoFacilito.token
      }
    }).then(data=> {
      console.log(data);
      this.reload();
    }).catch(err =>this.handleError(err));
  }

  handleError(err){
    const errorMessage = JSON.parse(err.response).error;
    this.setState({
      error: errorMessage
    })
  }

  render(){ return (
    <MuiThemeProvider>
      <Formsy.Form onValid={()=>this.enableSubmitButton()}
                  onInvalid={()=>this.disableSubmitButton()}
                  onValidSubmit={()=> this.submit()} >
        <div>
          <div>{this.state.error}</div>
          <FormsyText
            onChange={(ev)=> this.syncField(ev,"email")}
            name="email"
            required
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.underlineStyle}
            validations="isEmail"
            validationError="Asegúrate de instroducir un correo electrónico válido"
            floatingLabelText="Correo electrónico" />
        </div>
        <div>
          <FormsyText
            onChange={(ev)=> this.syncField(ev,"password")}
            name="password"
            required
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.underlineStyle}
            type="password"
            floatingLabelText="Contraseña" />
        </div>
        <div>
          <RaisedButton
            style={styles.buttonTop}
            disabled={!this.state.canSubmit}
            backgroundColor={styles.red}
            labelColor='#ffffff'
            type="submit"
            label="Iniciar sesión" />
            <a href="#" onClick={this.props.toggle} style={styles.leftSpace}> Crear cuenta</a>
        </div>
      </Formsy.Form>
    </MuiThemeProvider>
  );
  }
}
