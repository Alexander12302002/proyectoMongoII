// Crear el rol de Administrador
db.createRole({
    role: "Administrador",
    privileges: [
      {
        resource: { db: "cineCampus", collection: "" },
        actions: ["find", "insert", "update", "remove"]
      }
    ],
    roles: []
  });
  
  // Crear el rol de Usuario Estándar
  db.createRole({
    role: "usuarioEstandar",
    privileges: [
      {
        resource: { db: "cineCampus", collection: "boleta" },
        actions: ["insert"]
      },
      {
        resource: { db: "cineCampus", collection: "reserva_asientos" },
        actions: ["insert"]
      }
    ],
    roles: []
  });
  
  // Crear el rol de Usuario VIP
  db.createRole({
    role: "usuarioVip",
    privileges: [
      {
        resource: { db: "cineCampus", collection: "boleta" },
        actions: ["find", "insert"]
      },
      {
        resource: { db: "cineCampus", collection: "reserva_asientos" },
        actions: ["find", "insert"]
      },
      {
        resource: { db: "cineCampus", collection: "tarjeta" },
        actions: ["find"]
      }
    ],
    roles: ["usuarioEstandar"]
  });