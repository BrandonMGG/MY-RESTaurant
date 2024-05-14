// microservicio de authenticacion

import express from 'express'
import fs from 'fs'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json()); // Middleware para parsear JSON
let USSERDATA = [];
// Función para leer la base de datos desde el archivo
const readUserDataBase = () => {
    try {
      const data = fs.readFileSync('./userDataBase.json', 'utf-8');
      USSERDATA = JSON.parse(data);
    } catch (error) {
      console.error('Error reading user database:', error);
      USSERDATA = [];
    }
  };

// Función para escribir la base de datos al archivo

  const writeUserDataBase = () => {
    try {
      fs.writeFileSync('./userDataBase.json', JSON.stringify(USSERDATA, null, 2));
    } catch (error) {
      console.error('Error writing user database:', error);
    }
  };


export const authServices = (req, res) => {
    if (req.method === 'POST') {
        if (req.url.startsWith('/login')) {
          const { email, password } = req.body;
          if (!email || !password) {
            return res.status(400).send('Faltan datos');
          }
    
          try {
            // Leer base de datos de usuarios
            readUserDataBase();
    
            // Verificar las credenciales del usuario
            const user = USSERDATA.find(user => user.email === email && user.password === password);
            if (!user) {
              return res.status(400).send('Credenciales inválidas');
            }
    
            res.status(200).send('Inicio de sesión exitoso');
          } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
          }
        }
    
    
        if (req.url.startsWith('/register')) {
            const { email, password, confirm } = req.body;
            if (!email || !password || !confirm) {
                console.log('faltan datos')
                return res.status(400).send('Faltan datos');

            }

            if (password !== confirm) {
                console.log('contraseña no coinciden')
                return res.status(400).send('Las contraseñas no coinciden');
            }

            try {
                // Leer base de datos de usuarios

                readUserDataBase();
                
                // Verificar si el usuario ya existe
                if (USSERDATA.find(user => user.email === email)) {
                    return res.status(400).send('El usuario ya existe');
                }

                //fs.writeFileSync('./userbase.json', JSON.stringify(userDataBase, null, 2));

                const newUser = { email, password }; // En un entorno real, asegúrate de hashear la contraseña
                USSERDATA.push(newUser);
                console.log('se creo un nuevo usuario')
        
                // Escribir la base de datos actualizada
                writeUserDataBase();

                res.status(201).send('Usuario registrado exitosamente');
            } catch (error) {
                console.error(error);
                res.status(500).send('Error interno del servidor');
            }
        }




    }


}


// Ruta para registrar un nuevo usuario
/*app.post('/register', authService, (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Correo electrónico y contraseña son requeridos' });
    }
    admin.auth().createUser({
        email,
        password
    }).then(user => {

        console.log('Success create new user', user.uid);
        res.status(201).send('user was created successfully');
    }).catch(error => {
        res.status(500).send('Error when it try creating user');
    })
})


app.post('/login', authService, (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'Correo electronico y contraseña son requeridos' })
    }

}
)
exports.app = functions.https.onRequest(app);*/