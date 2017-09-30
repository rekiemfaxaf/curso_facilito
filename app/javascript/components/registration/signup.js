import React from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import { Base,styles } from './base';

export class SignUp extends Base {

  render(){ return (
    <MuiThemeProvider>
      <Formsy.Form onValid={()=>this.enableSubmitButton()}
                  onInvalid={()=>this.disableSubmitButton()} >
        <div>
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
          <FormsyText
            onChange={(ev)=> this.syncField(ev,"passwordConfirmation")}
            name="password"
            required
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.underlineStyle}
            type="password"
            floatingLabelText="Confirmar Contraseña" />
        </div>
        <div>
          <RaisedButton
            style={styles.buttonTop}
            disabled={!this.state.canSubmit}
            backgroundColor={styles.red}
            labelColor='#ffffff'
            type="submit"
            label="Crear Cuenta" />
            <a href="#" onClick={this.props.toggle} style={styles.leftSpace}> Ya tengo cuenta</a>
        </div>
      </Formsy.Form>
    </MuiThemeProvider>
  );
  }
}
