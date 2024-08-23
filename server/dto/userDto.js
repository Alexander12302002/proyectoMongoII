class UserDTO {
    constructor({ nombre, apellido, nick, email, rol, telefono, cedula, contrasena }) {
      this.n = nombre;
      this.a = apellido;
      this.ni = nick;
      this.e = email;
      this.r = rol;
      this.t = telefono;
      this.cc = cedula
      this.c = contrasena;
    }
  }
  
  module.exports = UserDTO;