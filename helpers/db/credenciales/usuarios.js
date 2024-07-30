db.createUser(
    {
        user: "campus",
        pwd: "campus2023",
        roles: [
            { role: "dbAdmin", db: "cineCampus"},
            { role: "userAdmin", db: "cineCampus"},
            { role: "readWrite", db: "cineCampus"},
            { role: "userAdminAnyDatabase", db: "admin"},
            { role: "dbAdminAnyDatabase", db: "admin"},
        ]
    }
);

db.createUser(
    {
        user: "Aki1130",
        pwd: "98765432",
        roles: [
            { role: "usuarioEstandar", db: "cineCampus"},
            { role: "usuarioVip", db: "cineCampus"},
        ]
    }
)